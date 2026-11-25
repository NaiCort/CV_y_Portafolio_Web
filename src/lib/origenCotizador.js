// Marca de «llegué a esta demo desde el cotizador» (V4.9.1). Vive en sessionStorage: la ponen
// los enlaces del cotizador a sus demos y la lee el botón flotante «Vuelve al cotizador».

export const CLAVE_ORIGEN = "volver-cotizador"

export function leerSesion(clave) {
  try {
    return JSON.parse(sessionStorage.getItem(clave) ?? "null")
  } catch {
    return null
  }
}

export function guardarSesion(clave, valor) {
  try {
    if (valor == null) sessionStorage.removeItem(clave)
    else sessionStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    /* Sin almacenamiento no hay botón de regreso; la demo funciona igual. */
  }
}

// Lo llama el cotizador al abrir una demo: recuerda a qué cotizador y a qué altura volver.
export function marcarOrigenCotizador(ruta) {
  guardarSesion(CLAVE_ORIGEN, {
    url: `${window.location.pathname}${window.location.search}`,
    ruta,
    y: Math.round(window.scrollY),
  })
}

// Un enlace directo (o escribir la dirección) carga el documento desde cero: ahí la marca no vale.
if (typeof window !== "undefined") {
  const nav = performance.getEntriesByType?.("navigation")?.[0]
  if (nav?.type === "navigate") guardarSesion(CLAVE_ORIGEN, null)
}
