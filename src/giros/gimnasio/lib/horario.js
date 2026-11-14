import { HORARIO, findCategoria } from "../data/clases"

const minutos = (hora) => {
  const [h, m] = hora.split(":").map(Number)
  return h * 60 + m
}

// Fecha y hora concretas de una clase del horario, a partir de un día de referencia.
export function fechaDeClase(clase, desde, diasDespues) {
  const fecha = new Date(desde)
  fecha.setDate(fecha.getDate() + diasDespues)
  fecha.setHours(0, minutos(clase.hora), 0, 0)
  return fecha
}

// Próximas sesiones a partir de ahora, ordenadas, hasta siete días adelante.
export function proximasClases(ahora = new Date(), filtro = () => true) {
  const sesiones = []
  for (let d = 0; d < 7; d++) {
    const dia = (ahora.getDay() + d) % 7
    for (const clase of HORARIO) {
      if (clase.dia !== dia || !filtro(clase)) continue
      const fecha = fechaDeClase(clase, ahora, d)
      if (fecha > ahora) sesiones.push({ ...clase, fecha })
    }
  }
  return sesiones.sort((a, b) => a.fecha - b.fecha)
}

// Lugares libres simulados: estables para una misma sesión, distintos entre sesiones.
export function lugaresLibres(sesion) {
  const { cupo } = findCategoria(sesion.categoria)
  const clave = `${sesion.id}-${sesion.fecha.toDateString()}`
  let h = 7
  for (const letra of clave) h = (h * 31 + letra.charCodeAt(0)) % 10007
  const ocupados = Math.round(cupo * (0.55 + (h % 50) / 100))
  return Math.max(0, cupo - ocupados)
}

export function cuandoTexto(fecha, ahora = new Date()) {
  const dias = Math.round(
    (new Date(fecha).setHours(0, 0, 0, 0) - new Date(ahora).setHours(0, 0, 0, 0)) / 86400000,
  )
  const hora = `${fecha.getHours()}:${String(fecha.getMinutes()).padStart(2, "0")}`
  if (dias === 0) return `hoy ${hora}`
  if (dias === 1) return `mañana ${hora}`
  const nombre = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
  return `${nombre[fecha.getDay()]} ${hora}`
}
