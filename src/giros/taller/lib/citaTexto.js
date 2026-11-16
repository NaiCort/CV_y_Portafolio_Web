import { findServicio } from "../data/talleres"

// Textos de una cita: cuándo, dónde y su evento de calendario.
const fechaLarga = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
})
const horaCorta = new Intl.DateTimeFormat("es-MX", { hour: "numeric", minute: "2-digit" })

export const cuandoTexto = (fecha) => {
  const d = new Date(fecha)
  return `${fechaLarga.format(d)}, ${horaCorta.format(d)}`
}

export function lugarTexto(taller, c) {
  if (taller.id === "rosales")
    return c.modo === "domicilio"
      ? `Mecánico a domicilio: ${c.calle}, colonia ${c.colonia}`
      : `En el taller, ${taller.local.direccion.toLowerCase()}`
  const s = taller.sucursales.find((x) => x.id === c.sucursal)
  return c.recoleccion
    ? `Recolección en ${c.direccion}; se atiende en Vértice ${s.nombre}`
    : `Vértice ${s.nombre}, ${s.direccion.toLowerCase()}`
}

export function eventoDeCita(taller, c) {
  const servicio = findServicio(taller, c.servicio)
  return {
    id: c.id,
    titulo: `${servicio.nombre} · ${taller.nombre}`,
    inicio: c.fecha,
    minutos: 60,
    lugar: `${lugarTexto(taller, c)}, Xalapa (taller ficticio)`,
    descripcion: `Cita ${c.id} para ${c.auto}, simulada en una demo de portafolio.`,
  }
}
