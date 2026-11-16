// «Consulta tu auto»: folio y placas de la orden. En la demo solo existe la orden de ejemplo
// de cada taller; nada se busca en un servidor.
export const ETAPAS = [
  { id: "recibido", nombre: "Recibido", detalle: "Inventario y fotos al llegar." },
  { id: "diagnostico", nombre: "En diagnóstico", detalle: "Revisión y presupuesto por partida." },
  {
    id: "visto-bueno",
    nombre: "Esperando tu visto bueno",
    detalle: "Nada se repara sin tu firma.",
  },
  { id: "reparacion", nombre: "En reparación", detalle: "Solo lo que autorizaste." },
  { id: "listo", nombre: "Listo para entregar", detalle: "Con tus piezas viejas y la garantía." },
]
export const ETAPA_EJEMPLO = "visto-bueno"

const limpiar = (texto) =>
  String(texto ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")

export function buscarOrden(orden, folio, placas) {
  if (!limpiar(folio) || !limpiar(placas)) return { estado: "incompleto" }
  if (limpiar(folio) === limpiar(orden.folio) && limpiar(placas) === limpiar(orden.placas))
    return { estado: "encontrada", etapa: ETAPA_EJEMPLO }
  return { estado: "no-encontrada" }
}
