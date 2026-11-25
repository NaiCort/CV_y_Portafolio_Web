// Solicitud del cotizador (V4.9). Es el único punto de salida: hoy arma un mensaje para WhatsApp o
// correo que el cliente envía desde su propio teléfono o correo, así que este sitio no guarda
// ningún dato. Cuando exista el servidor (Sitio Profesional, sección 24), `enviarSolicitud` lo
// llamará con la misma solicitud y el servidor recalculará el precio con `calcular`.

import { categoriaPorId, funcionPorId, MONEDAS } from "../data/catalogo"
import { demoPorId } from "../data/demos"
import { buildWhatsAppUrl } from "../components/shared/contactInfo"
import { aParametros, textoPlazo } from "./cotizacion"

export const CORREO = "ian.martinez2610@gmail.com"

export const FACTURA = {
  no: "No necesito factura",
  fisica: "Factura a persona física",
  empresa: "Factura a empresa (persona moral)",
}

export function formatoDinero(valor, moneda) {
  const n = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(Math.abs(valor))
  return `${valor < 0 ? "−" : ""}${n} ${moneda}`
}

export function textoSolicitud({ folio, config, resultado, cliente, origen }) {
  const m = resultado.moneda
  const cat = categoriaPorId(config.categoria)
  const demo = config.demo ? demoPorId(config.demo) : null
  const url = `${origen}/cotizador?${aParametros(config).toString()}`
  const lineas = resultado.lineas.map((l) => {
    const f = funcionPorId(l.id)
    const nombre = l.cantidad > 1 ? `${f.nombre} ×${l.cantidad}` : f.nombre
    return `• ${nombre}: ${l.precio == null ? "en la propuesta" : formatoDinero(l.precio, m)}`
  })
  const partes = [
    `Hola Ian, te envío mi cotización ${folio}.`,
    "",
    `Tipo de sitio: ${cat.nombre}${demo ? ` (a partir de la demo ${demo.nombre}, versión ${config.version})` : ""}`,
    ...lineas,
    `• Ficha de identidad y pasada de calidad: ${formatoDinero(resultado.calidad, m)}`,
  ]
  if (resultado.minimo)
    partes.push(`• Ajuste al proyecto mínimo: ${formatoDinero(resultado.minimo, m)}`)
  if (resultado.recargo)
    partes.push(
      `• Entrega ${resultado.urgencia.nombre.toLowerCase()}: ${formatoDinero(resultado.recargo, m)}`,
    )
  partes.push(`• Precio de lanzamiento: ${formatoDinero(resultado.lanzamiento, m)}`)
  if (resultado.primerMes)
    partes.push(
      `• Mantenimiento ${resultado.plan.nombre}, primer mes: ${formatoDinero(resultado.primerMes, m)}`,
    )
  if (resultado.iva) partes.push(`• IVA: ${formatoDinero(resultado.iva, m)}`)
  partes.push(
    `Total${MONEDAS[m].iva ? " con IVA" : " sin impuestos"}: ${formatoDinero(resultado.total, m)}`,
    `Plazo: ${textoPlazo(resultado.dias)}`,
  )
  if (resultado.plan.id !== "ninguno")
    partes.push(
      `Después, mantenimiento ${resultado.plan.nombre}: ${formatoDinero(resultado.mensualidad, m)} al mes`,
    )
  partes.push("", `Nombre: ${cliente.nombre.trim()}`)
  if (cliente.negocio.trim()) partes.push(`Negocio: ${cliente.negocio.trim()}`)
  partes.push(FACTURA[cliente.factura])
  if (cliente.comentarios.trim()) partes.push(`Comentarios: ${cliente.comentarios.trim()}`)
  partes.push("", `Configuración: ${url}`)
  return partes.join("\n")
}

// Devuelve la dirección que abre el canal elegido con la solicitud ya escrita.
export function enviarSolicitud(solicitud, canal) {
  const texto = textoSolicitud(solicitud)
  if (canal === "correo")
    return `mailto:${CORREO}?subject=${encodeURIComponent(`Cotización ${solicitud.folio}`)}&body=${encodeURIComponent(texto)}`
  return buildWhatsAppUrl(texto)
}
