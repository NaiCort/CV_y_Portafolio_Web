import { useSyncExternalStore } from "react"

// Marcadores de las dos revistas, guardados solo en este navegador. Rubor guarda números
// (por su número) y Prisma investigaciones (por su id).
export const MARCADORES_KEY = "revista-marcadores-v1"
const vacio = () => ({ rubor: [], prisma: [] })
const oyentes = new Set()
let cache = null

const almacen = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function leerMarcadores(storage = almacen()) {
  try {
    const d = JSON.parse(storage?.getItem(MARCADORES_KEY) ?? "null")
    if (!d || typeof d !== "object") return vacio()
    return {
      rubor: Array.isArray(d.rubor) ? d.rubor.filter((x) => Number.isInteger(x)) : [],
      prisma: Array.isArray(d.prisma) ? d.prisma.filter((x) => typeof x === "string") : [],
    }
  } catch {
    return vacio()
  }
}

function escribir(d) {
  cache = d
  try {
    almacen()?.setItem(MARCADORES_KEY, JSON.stringify(d))
  } catch {
    /* Sin almacenamiento, los marcadores viven mientras la página esté abierta. */
  }
  oyentes.forEach((f) => f())
}

const instantanea = () => (cache ??= leerMarcadores())
const suscribir = (f) => {
  oyentes.add(f)
  return () => oyentes.delete(f)
}

// Alterna un marcador; los más recientes van primero.
export function alternar(sitio, valor) {
  const d = instantanea()
  const lista = d[sitio].includes(valor)
    ? d[sitio].filter((x) => x !== valor)
    : [valor, ...d[sitio]]
  escribir({ ...d, [sitio]: lista })
}

export function borrarMarcadores() {
  escribir(vacio())
}

// Para pruebas: vuelve a leer del almacenamiento.
export function reiniciarCache() {
  cache = null
}

export function useMarcadores(sitio) {
  const d = useSyncExternalStore(suscribir, instantanea, instantanea)
  return [d[sitio], (valor) => alternar(sitio, valor)]
}
