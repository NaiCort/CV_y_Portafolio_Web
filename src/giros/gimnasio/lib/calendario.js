import { findCategoria } from "../data/clases"
import { findCoach } from "../data/coaches"
import { findSucursal } from "../data/sucursales"

// Archivo de calendario (.ics, RFC 5545) para una clase o una evaluación. Se genera en el
// navegador y se descarga; no se envía a ningún lado.
const utc = (fecha) =>
  new Date(fecha)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "")
// Comas, punto y coma y saltos de línea se escapan, como pide el formato.
const texto = (s) =>
  String(s)
    .replace(/[\\,;]/g, (c) => `\\${c}`)
    .replace(/\n/g, "\\n")

// Las líneas largas se parten (máximo 75 bytes) y siguen con un espacio, como pide el formato.
function plegar(linea) {
  const partes = []
  let actual = ""
  for (const c of linea) {
    if (new TextEncoder().encode(actual + c).length > (partes.length ? 74 : 75)) {
      partes.push(actual)
      actual = ""
    }
    actual += c
  }
  partes.push(actual)
  return partes.join("\r\n ")
}

export function crearIcs({ id, titulo, inicio, minutos, lugar, descripcion, ahora = new Date() }) {
  const fin = new Date(new Date(inicio).getTime() + minutos * 60000)
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Brio demo//Multiples Demos//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${id}@brio.demo`,
    `DTSTAMP:${utc(ahora)}`,
    `DTSTART:${utc(inicio)}`,
    `DTEND:${utc(fin)}`,
    `SUMMARY:${texto(titulo)}`,
    `LOCATION:${texto(lugar)}`,
    `DESCRIPTION:${texto(descripcion)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${texto(titulo)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .map(plegar)
    .join("\r\n")
    .concat("\r\n")
}

export function descargarIcs(nombre, contenido) {
  if (typeof URL === "undefined" || !URL.createObjectURL) return false
  const url = URL.createObjectURL(new Blob([contenido], { type: "text/calendar;charset=utf-8" }))
  const enlace = document.createElement("a")
  enlace.href = url
  enlace.download = `${nombre}.ics`
  document.body.append(enlace)
  enlace.click()
  enlace.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return true
}

// Evento de una reserva de clase guardada.
export function eventoDeReserva(r) {
  const cat = findCategoria(r.categoria)
  const sucursal = findSucursal(r.sucursal)
  return {
    id: r.id,
    titulo: `${cat.nombre} en Brío ${sucursal.nombre}`,
    inicio: r.fecha,
    minutos: cat.minutos,
    lugar: `Brío ${sucursal.nombre}, ${sucursal.direccion}, Xalapa (club ficticio)`,
    descripcion: `Coach ${findCoach(r.coach).nombre}. Qué traer: ${cat.traer} Reserva ${r.id}, simulada en una demo de portafolio.`,
  }
}

// Evento de la evaluación gratuita.
export function eventoDeEvaluacion(e) {
  const sucursal = findSucursal(e.sucursal)
  return {
    id: e.id,
    titulo: `Evaluación gratuita con ${findCoach(e.coach).nombre} en Brío`,
    inicio: e.fecha,
    minutos: 45,
    lugar: `Brío ${sucursal.nombre}, ${sucursal.direccion}, Xalapa (club ficticio)`,
    descripcion: `Trae ropa cómoda, agua y toalla; llega diez minutos antes. Cita ${e.id}, simulada en una demo de portafolio.`,
  }
}
