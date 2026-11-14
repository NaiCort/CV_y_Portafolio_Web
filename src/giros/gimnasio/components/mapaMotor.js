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

// Motor del mapa de Brío: MapLibre con el estilo oscuro de OpenFreeMap (sin clave), como el
// mapa de Patio 12 (docs/MAPA_RESTAURANTE.md). Se importa en diferido desde MapaXalapa.
setWorkerUrl(workerUrl)

export function crearMapa(contenedor, { sucursales, elegida, onElegir, onListo, onError }) {
  const limites = new LngLatBounds()
  sucursales.forEach((s) => limites.extend(s.coordenadas))
  // En pantallas anchas la ficha flota abajo a la derecha: se deja espacio para no tapar marcas.
  const ancho = contenedor.clientWidth >= 560
  const map = new Map({
    container: contenedor,
    style: "https://tiles.openfreemap.org/styles/dark",
    bounds: limites,
    fitBoundsOptions: {
      padding: ancho
        ? { top: 60, bottom: 250, left: 50, right: 130 }
        : { top: 50, bottom: 50, left: 30, right: 110 },
    },
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
  // Controles arriba a la derecha y atribución abajo a la izquierda: la ficha de la sucursal
  // flota abajo a la derecha en pantallas anchas.
  map.addControl(new NavigationControl({ showCompass: false }), "top-right")
  map.addControl(new AttributionControl({ compact: true }), "bottom-left")
  // El mapa se redimensiona con su caja, no solo con la ventana.
  const observador = new ResizeObserver(() => map.resize())
  observador.observe(contenedor)
  map
    .getCanvas()
    .setAttribute(
      "aria-label",
      "Mapa de Xalapa con las cinco sucursales ficticias de Brío junto a parques de referencia",
    )
  const marcas = sucursales.map((s) => {
    const boton = document.createElement("button")
    boton.type = "button"
    boton.className = "b-marca"
    boton.innerHTML = '<span class="b-marca-punto" aria-hidden="true"></span>'
    const nombre = document.createElement("span")
    nombre.className = "b-marca-nombre"
    nombre.textContent = s.nombre
    boton.append(nombre)
    boton.setAttribute("aria-label", `Mostrar la sucursal ${s.nombre}`)
    boton.addEventListener("click", () => onElegir(s.id))
    new Marker({ element: boton, anchor: "left", offset: [-9, 0] })
      .setLngLat(s.coordenadas)
      .addTo(map)
    return { id: s.id, boton }
  })
  const marcar = (id) =>
    marcas.forEach((m) => {
      m.boton.classList.toggle("is-on", m.id === id)
      m.boton.setAttribute("aria-pressed", String(m.id === id))
    })
  marcar(elegida)
  map.once("load", () => {
    // En pantallas angostas la atribución empieza plegada; el botón «i» la despliega.
    if (!ancho)
      contenedor
        .querySelector(".maplibregl-compact-show")
        ?.classList.remove("maplibregl-compact-show")
    onListo()
  })
  map.on("error", (evento) => {
    // Un mosaico suelto que falla no tumba el mapa; solo el estilo o el motor.
    if (!map.isStyleLoaded() && !evento?.tile) onError()
  })
  return {
    elegir(id) {
      marcar(id)
      const s = sucursales.find((item) => item.id === id)
      if (s && !map.getBounds().contains(s.coordenadas))
        map.easeTo({ center: s.coordenadas, duration: 300 })
    },
    destruir: () => {
      observador.disconnect()
      map.remove()
    },
  }
}
