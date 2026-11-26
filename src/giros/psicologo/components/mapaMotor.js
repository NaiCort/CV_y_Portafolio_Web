import { LngLatBounds, Marker } from "maplibre-gl"
import { crearMapaBase } from "../../../lib/mapaBase"

// Motor del mapa del consultorio, sobre el mapa base compartido (src/lib/mapaBase.js, desde
// V4.10.6): OpenFreeMap sin clave y estilo corregido para que la consola quede sin advertencias.
// Se importa en diferido desde Mapa.jsx. Aquí van solo las marcas de las sucursales.
export function crearMapa(
  contenedor,
  { puntos, elegida, estilo, etiqueta, onElegir, onListo, onError },
) {
  const ancho = contenedor.clientWidth >= 560
  const uno = puntos.length === 1
  const limites = new LngLatBounds()
  puntos.forEach((p) => limites.extend(p.coordenadas))
  const { map, quitar } = crearMapaBase(contenedor, {
    estilo,
    etiqueta,
    atribucion: "bottom-left",
    ...(uno
      ? { center: puntos[0].coordenadas, zoom: 15 }
      : {
          bounds: limites,
          fitBoundsOptions: {
            padding: ancho
              ? { top: 60, bottom: 60, left: 50, right: 150 }
              : { top: 50, bottom: 50, left: 30, right: 120 },
          },
        }),
  })
  const marcas = puntos.map((p) => {
    const boton = document.createElement("button")
    boton.type = "button"
    boton.className = "p-pin"
    boton.innerHTML = '<span class="p-pin-punto" aria-hidden="true"></span>'
    const nombre = document.createElement("span")
    nombre.className = "p-pin-nombre"
    nombre.textContent = p.nombre
    boton.append(nombre)
    boton.setAttribute("aria-label", uno ? p.nombre : `Mostrar la sucursal ${p.nombre}`)
    boton.addEventListener("click", () => onElegir(p.id))
    new Marker({ element: boton, anchor: "left", offset: [-9, 0] })
      .setLngLat(p.coordenadas)
      .addTo(map)
    return { id: p.id, boton }
  })
  const marcar = (id) =>
    marcas.forEach((m) => {
      m.boton.classList.toggle("is-on", m.id === id)
      if (!uno) m.boton.setAttribute("aria-pressed", String(m.id === id))
    })
  marcar(elegida)
  map.once("load", () => {
    if (!ancho)
      contenedor
        .querySelector(".maplibregl-compact-show")
        ?.classList.remove("maplibregl-compact-show")
    onListo()
  })
  map.on("error", (evento) => {
    if (!map.isStyleLoaded() && !evento?.tile) onError()
  })
  return {
    elegir(id) {
      marcar(id)
      const p = puntos.find((item) => item.id === id)
      if (!p || uno) return
      const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      map.easeTo({
        center: p.coordenadas,
        zoom: Math.max(map.getZoom(), 13.5),
        duration: quieto ? 0 : 400,
      })
    },
    destruir: quitar,
  }
}
