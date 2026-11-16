// Presupuesto por partida de la orden de ejemplo: visto bueno, reparación con un hallazgo que
// pide autorización y entrega con comprobante. Todo simulado y guardado solo en este navegador.
import { findServicio } from "../data/talleres"

export const ORDEN_KEY = "taller-orden-v1"
export const IVA = 0.16
const GARANTIA_DIAS = { rosales: 90, vertice: 182 }

export const autorizables = (orden) => orden.partidas.filter((p) => p.precio)

export const estadoInicial = () => ({
  etapa: "visto-bueno",
  decisiones: {},
  firma: "",
  hallazgo: null,
  avance: 0,
})

// Partidas que el cliente autorizó, incluido el hallazgo si también lo autorizó.
export function partidasAutorizadas(orden, estado) {
  const lista = autorizables(orden).filter((p) => estado.decisiones[p.id] === "si")
  if (estado.hallazgo === "si") lista.push(orden.hallazgo)
  return lista
}

// Totales con IVA incluido. Si no se autoriza nada, se paga solo el diagnóstico.
export function totales(taller, estado) {
  const partidas = partidasAutorizadas(taller.orden, estado)
  const diagnostico = findServicio(taller, "diagnostico").precio
  if (!partidas.length)
    return {
      partidas,
      refacciones: 0,
      manoObra: 0,
      diagnostico,
      total: diagnostico,
      iva: Math.round((diagnostico * IVA) / (1 + IVA)),
      soloDiagnostico: true,
    }
  const refacciones = partidas.reduce((n, p) => n + p.refaccion, 0)
  const manoObra = partidas.reduce((n, p) => n + p.manoObra, 0)
  const total = refacciones + manoObra
  return {
    partidas,
    refacciones,
    manoObra,
    diagnostico: 0,
    total,
    iva: Math.round((total * IVA) / (1 + IVA)),
    soloDiagnostico: false,
  }
}

// Cuánto sube el total con el hallazgo; la ley pide autorización por escrito si pasa de 20 %.
export function aumentoHallazgo(orden, estado) {
  const base = partidasAutorizadas(orden, { ...estado, hallazgo: null }).reduce(
    (n, p) => n + p.precio,
    0,
  )
  return base ? orden.hallazgo.precio / base : 0
}

export const horasDeTrabajo = (orden, estado) =>
  partidasAutorizadas(orden, estado).reduce((n, p) => n + p.horas, 0)

export function entregaTexto(orden, estado) {
  return horasDeTrabajo(orden, estado) <= 2 ? orden.entrega.pocas : orden.entrega.muchas
}

export function garantiaHasta(tallerId, desde = new Date()) {
  const fecha = new Date(desde)
  fecha.setDate(fecha.getDate() + GARANTIA_DIAS[tallerId])
  return fecha
}

// Piezas que se devuelven al entregar (salvo residuos o reciclaje, que se explican).
export function piezasCambiadas(orden, estado) {
  return partidasAutorizadas(orden, estado).map((p) => ({
    pieza: p.pieza,
    nota: p.noSeDevuelve ?? "Te la entregamos en una bolsa con tu folio.",
  }))
}

// Transiciones permitidas; cualquier otra deja el estado igual.
export function enviarVistoBueno(orden, estado) {
  const decididas = autorizables(orden).every((p) => ["si", "no"].includes(estado.decisiones[p.id]))
  if (estado.etapa !== "visto-bueno" || !decididas || !estado.firma.trim()) return estado
  const alguna = autorizables(orden).some((p) => estado.decisiones[p.id] === "si")
  return { ...estado, etapa: alguna ? "reparacion" : "listo", avance: 0 }
}
export function avanzarReparacion(estado) {
  if (estado.etapa !== "reparacion") return estado
  if (estado.avance === 0) return { ...estado, avance: 1 }
  if (estado.avance === 1 && estado.hallazgo) return { ...estado, etapa: "listo" }
  return estado
}
export function decidirHallazgo(estado, decision) {
  if (estado.etapa !== "reparacion" || estado.avance !== 1 || !["si", "no"].includes(decision))
    return estado
  return { ...estado, hallazgo: decision }
}

export function cargarOrden(storage, tallerId) {
  try {
    const todo = JSON.parse(storage?.getItem(ORDEN_KEY) ?? "{}")
    const e = todo?.[tallerId]
    if (!e || !["visto-bueno", "reparacion", "listo"].includes(e.etapa)) return estadoInicial()
    return { ...estadoInicial(), ...e }
  } catch {
    return estadoInicial()
  }
}
export function guardarOrden(storage, tallerId, estado) {
  try {
    const todo = JSON.parse(storage?.getItem(ORDEN_KEY) ?? "{}") || {}
    todo[tallerId] = estado
    storage?.setItem(ORDEN_KEY, JSON.stringify(todo))
  } catch {
    /* Sin almacenamiento, la orden vive mientras la página esté abierta. */
  }
}
