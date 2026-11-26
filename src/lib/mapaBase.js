import { AttributionControl, Map, NavigationControl, setWorkerUrl } from "maplibre-gl"
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url"
import "maplibre-gl/dist/maplibre-gl.css"
import { completarImagenes, corregirEstilo } from "./estiloMapa"

// Mapa base compartido (V4.10.6, DEC-028). Reúne lo que repetía el motor de cada demo:
// - MapLibre con OpenFreeMap, sin clave;
// - controles y avisos en español, y gestos cooperativos (en el teléfono, dos dedos para moverlo);
// - atribución compacta;
// - el estilo corregido antes de aplicarse (src/lib/estiloMapa.js), para que la consola quede sin
//   advertencias;
// - el ajuste al tamaño del contenedor.
// Cada demo agrega encima sus marcas y capas. Se importa en diferido: MapLibre solo baja al
// acercarse a un mapa.
setWorkerUrl(workerUrl)

export const ESTILOS = {
  claro: "https://tiles.openfreemap.org/styles/positron",
  oscuro: "https://tiles.openfreemap.org/styles/dark",
  color: "https://tiles.openfreemap.org/styles/liberty",
}

const TEXTOS = {
  "NavigationControl.ZoomIn": "Acercar",
  "NavigationControl.ZoomOut": "Alejar",
  "NavigationControl.ResetBearing": "Orientar al norte",
  "AttributionControl.ToggleAttribution": "Mostrar atribución",
  "CooperativeGesturesHandler.WindowsHelpText": "Usa Ctrl y la rueda para acercar el mapa",
  "CooperativeGesturesHandler.MacHelpText": "Usa ⌘ y la rueda para acercar el mapa",
  "CooperativeGesturesHandler.MobileHelpText": "Usa dos dedos para mover el mapa",
}

// vista: lo que define la primera vista (center y zoom, o bounds y fitBoundsOptions).
export function crearMapaBase(
  contenedor,
  { estilo, etiqueta, atribucion = "bottom-right", ...vista },
) {
  const map = new Map({
    container: contenedor,
    ...vista,
    attributionControl: false,
    cooperativeGestures: true,
    locale: TEXTOS,
  })
  completarImagenes(map)
  map.setStyle(ESTILOS[estilo] ?? estilo, {
    transformStyle: (_previo, siguiente) => corregirEstilo(siguiente),
  })
  map.addControl(new NavigationControl({ showCompass: false }), "top-right")
  map.addControl(new AttributionControl({ compact: true }), atribucion)
  map.getCanvas().setAttribute("aria-label", etiqueta)
  const observador = new ResizeObserver(() => map.resize())
  observador.observe(contenedor)
  return {
    map,
    quitar() {
      observador.disconnect()
      map.remove()
    },
  }
}
