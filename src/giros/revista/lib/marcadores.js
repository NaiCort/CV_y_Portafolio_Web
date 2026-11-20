import { useSyncExternalStore } from "react"

export const MARCADORES_KEY = "revista-marcadores-v1"
export const MARCADOR_PREFIJO = "revista-marcador-v2:"
const vacio = () => ({ rubor: [], prisma: [], umbral: [] })
const sitios = Object.keys(vacio())
const oyentes = new Set()
let cache = null
let escuchando = false
let memoria = false
let reloj = 0

const almacen = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}
const valido = (sitio, valor) =>
  sitio === "rubor"
    ? Number.isInteger(valor) && valor > 0
    : typeof valor === "string" && valor.length > 0 && valor.length <= 100
const claveDe = (sitio, valor) => `${MARCADOR_PREFIJO}${sitio}:${encodeURIComponent(valor)}`

// Se conserva el formato anterior para migrar sin perder los marcadores existentes. Cada
// elemento nuevo tiene su propia clave: dos pestañas no sobrescriben listas completas.
export function leerMarcadores(storage = almacen()) {
  const d = vacio()
  try {
    let anterior = null
    try {
      anterior = JSON.parse(storage?.getItem(MARCADORES_KEY) ?? "null")
    } catch {
      /* Se siguen leyendo las claves v2. */
    }
    const listas = Object.fromEntries(
      sitios.map((s) => [
        s,
        new Map(
          (Array.isArray(anterior?.[s]) ? anterior[s] : [])
            .filter((v) => valido(s, v))
            .map((v, i) => [v, -i]),
        ),
      ]),
    )
    for (let i = 0; i < (storage?.length ?? 0); i++) {
      const clave = storage.key(i)
      if (!clave?.startsWith(MARCADOR_PREFIJO)) continue
      const [sitio, codificado] = clave.slice(MARCADOR_PREFIJO.length).split(":")
      if (!sitios.includes(sitio)) continue
      try {
        const texto = decodeURIComponent(codificado)
        const valor = sitio === "rubor" ? Number(texto) : texto
        const entrada = JSON.parse(storage.getItem(clave))
        if (
          !valido(sitio, valor) ||
          typeof entrada?.on !== "boolean" ||
          !Number.isFinite(entrada.at)
        )
          continue
        reloj = Math.max(reloj, entrada.at)
        if (entrada.on) listas[sitio].set(valor, entrada.at)
        else listas[sitio].delete(valor)
      } catch {
        /* Un elemento dañado no invalida los demás. */
      }
    }
    for (const s of sitios) d[s] = [...listas[s]].sort((a, b) => b[1] - a[1]).map(([v]) => v)
  } catch {
    /* Sin almacenamiento, se usa la sesión en memoria. */
  }
  return d
}

const emitir = () => oyentes.forEach((f) => f())
const instantanea = () => (cache ??= leerMarcadores())
const suscribir = (f) => {
  oyentes.add(f)
  if (!escuchando && typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === null || e.key === MARCADORES_KEY || e.key.startsWith(MARCADOR_PREFIJO)) {
        cache = leerMarcadores()
        emitir()
      }
    })
    escuchando = true
  }
  return () => oyentes.delete(f)
}

export function alternar(sitio, valor) {
  if (!sitios.includes(sitio) || !valido(sitio, valor)) return
  const storage = almacen()
  let d = instantanea()
  try {
    // Incluso si el evento storage todavía no llegó, se lee el último estado persistido.
    if (storage && !memoria) {
      storage.getItem(MARCADORES_KEY)
      d = leerMarcadores(storage)
    }
    const on = !d[sitio].includes(valor)
    const nuevo = { ...d, [sitio]: on ? [valor, ...d[sitio]] : d[sitio].filter((x) => x !== valor) }
    cache = nuevo
    storage?.setItem(
      claveDe(sitio, valor),
      JSON.stringify({ on, at: (reloj = Math.max(Date.now(), reloj + 1)) }),
    )
  } catch {
    memoria = true
    // cache ya contiene la acción; seguirá disponible durante esta visita.
    if (cache === d)
      cache = {
        ...d,
        [sitio]: d[sitio].includes(valor)
          ? d[sitio].filter((x) => x !== valor)
          : [valor, ...d[sitio]],
      }
  }
  emitir()
}

export function borrarMarcadores() {
  const storage = almacen()
  const d = leerMarcadores(storage)
  try {
    // Las bajas por elemento también se comunican a otras pestañas.
    for (const s of sitios)
      for (const v of d[s])
        storage?.setItem(claveDe(s, v), JSON.stringify({ on: false, at: Date.now() }))
    storage?.removeItem(MARCADORES_KEY)
  } catch {
    /* El estado visible siempre se restablece. */
  }
  cache = vacio()
  emitir()
}
export function reiniciarCache() {
  memoria = false
  cache = null
}
export function useMarcadores(sitio) {
  const d = useSyncExternalStore(suscribir, instantanea, instantanea)
  return [d[sitio], (valor) => alternar(sitio, valor)]
}
