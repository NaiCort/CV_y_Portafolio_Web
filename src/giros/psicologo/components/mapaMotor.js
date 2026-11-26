import {
  AttributionControl,
  LngLatBounds,
  Map,
  Marker,
  NavigationControl,
  setWorkerUrl,
} from "maplibre-gl"
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url"
import "maplibre-gl/dist/maplibre-gl.css"
import { completarImagenes, corregirEstilo } from "../../../lib/estiloMapa"

// Motor del mapa del consultorio: MapLibre con OpenFreeMap (sin clave), igual que en Taller, Brío y
// Patio 12. Se importa en diferido desde Mapa.jsx. Desde V4.10.5, el estilo se corrige antes de
// aplicarse (src/lib/estiloMapa.js) para que la consola quede sin advertencias.
setWorkerUrl(workerUrl)

const ESTILOS = {
  claro: "https://tiles.openfreemap.org/styles/positron",
  oscuro: "https://tiles.openfreemap.org/styles/dark",
}

export function crearMapa(
  contenedor,
  { puntos, elegida, estilo, etiqueta, onElegir, onListo, onError },
) {
  const ancho = contenedor.clientWidth >= 560
  const uno = puntos.length === 1
  const limites = new LngLatBounds()
  puntos.forEach((p) => limites.extend(p.coordenadas))
  const map = new Map({
    container: contenedor,
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
    attributionControl: false,
    cooperativeGestures: true,
    locale: {
      "NavigationControl.ZoomIn": "Acercar",
      "NavigationControl.ZoomOut": "Alejar",
      "NavigationControl.ResetBearing": "Orientar al norte",
      "AttributionControl.ToggleAttribution": "Mostrar atribución",
      "CooperativeGesturesHandler.WindowsHelpText": "Usa Ctrl y la rueda para acercar el mapa",
      "CooperativeGesturesHandler.MacHelpText": "Usa ⌘ y la rueda para acercar el mapa",
      "CooperativeGesturesHandler.MobileHelpText": "Usa dos dedos para mover el mapa",
    },
  })
  completarImagenes(map)
  map.setStyle(ESTILOS[estilo], {
    transformStyle: (_previo, siguiente) => corregirEstilo(siguiente),
  })
  map.addControl(new NavigationControl({ showCompass: false }), "top-right")
  map.addControl(new AttributionControl({ compact: true }), "bottom-left")
  const observador = new ResizeObserver(() => map.resize())
  observador.observe(contenedor)
  map.getCanvas().setAttribute("aria-label", etiqueta)
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
    destruir: () => {
      observador.disconnect()
      map.remove()
    },
  }
}
