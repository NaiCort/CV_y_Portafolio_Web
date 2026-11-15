import { HORARIO, findCategoria } from "../data/clases"
import { HORAS_EVALUACION } from "../data/coaches"

// Evaluación gratuita con un coach: una por persona, guardada en este navegador.
export const EVALUACION_KEY = "brio-evaluacion-v1"

export function cargarEvaluacion(storage) {
  try {
    const d = JSON.parse(storage?.getItem(EVALUACION_KEY) || "null")
    return d && typeof d.id === "string" && typeof d.fecha === "string" ? d : null
  } catch {
    return null
  }
}
export function guardarEvaluacion(storage, evaluacion) {
  try {
    if (evaluacion) storage?.setItem(EVALUACION_KEY, JSON.stringify(evaluacion))
    else storage?.removeItem(EVALUACION_KEY)
  } catch {
    /* Opcional. */
  }
}

// Sucursales donde da clase cada coach, de la más frecuente a la menos.
export function sucursalesDe(coachId) {
  const cuenta = {}
  for (const c of HORARIO)
    if (c.coach === coachId) cuenta[c.sucursal] = (cuenta[c.sucursal] || 0) + 1
  return Object.keys(cuenta).sort((a, b) => cuenta[b] - cuenta[a])
}
export const clasesPorSemana = (coachId) => HORARIO.filter((c) => c.coach === coachId).length
export const categoriasDe = (coachId) => [
  ...new Set(HORARIO.filter((c) => c.coach === coachId).map((c) => c.categoria)),
]

// Próximos seis días con horario de evaluación (de lunes a sábado), empezando hoy.
export function diasDeEvaluacion(ahora) {
  const dias = []
  const f = new Date(ahora)
  f.setHours(0, 0, 0, 0)
  while (dias.length < 6) {
    if (f.getDay() !== 0) dias.push(new Date(f))
    f.setDate(f.getDate() + 1)
  }
  return dias
}

// Horas libres de un coach en una sucursal y un día: algunas ya están ocupadas (fijas para
// cada combinación) y las que ya pasaron no se ofrecen.
export function horasLibres(coachId, sucursalId, dia, ahora) {
  return HORAS_EVALUACION.map((hora) => {
    const [h, m] = hora.split(":").map(Number)
    const fecha = new Date(dia)
    fecha.setHours(h, m, 0, 0)
    let x = 3
    for (const c of `${coachId}|${sucursalId}|${dia.getDate()}|${hora}`)
      x = (x * 33 + c.charCodeAt(0)) % 997
    // La evaluación dura 45 min; se deja media hora para moverse entre sucursales.
    const inicio = h * 60 + m
    const enClase = HORARIO.some((c) => {
      if (c.coach !== coachId || c.dia !== dia.getDay()) return false
      const [ch, cm] = c.hora.split(":").map(Number)
      const desde = ch * 60 + cm
      return inicio < desde + findCategoria(c.categoria).minutos + 30 && desde < inicio + 45 + 30
    })
    return {
      hora,
      fecha,
      libre: !enClase && x % 3 !== 0 && fecha.getTime() > ahora.getTime() + 3600000,
    }
  })
}
