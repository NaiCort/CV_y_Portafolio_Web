// Aforo simulado: una curva típica de gimnasio (picos temprano y por la tarde) ajustada por
// sucursal. No mide nada real; cambia con la hora para que la demo se sienta viva.
const ENTRE_SEMANA = [
  6, 4, 3, 3, 4, 12, 34, 52, 58, 41, 29, 26, 30, 34, 29, 27, 34, 56, 76, 81, 69, 46, 24, 10,
]
const FIN_DE_SEMANA = [
  5, 3, 2, 2, 3, 6, 14, 30, 48, 62, 66, 60, 52, 42, 34, 30, 31, 34, 33, 28, 20, 12, 8, 6,
]

export function abierta(sucursal, fecha) {
  const finde = [0, 6].includes(fecha.getDay())
  const [abre, cierra] = finde ? sucursal.horario.finde : sucursal.horario.semana
  const ahora = fecha.getHours() + fecha.getMinutes() / 60
  return ahora >= abre && ahora < cierra
}

// Variación pequeña y estable por sucursal y día, para que no todas se muevan igual.
function variacion(id, fecha) {
  let h = fecha.getDate() * 31 + fecha.getMonth() * 7
  for (const letra of id) h = (h * 33 + letra.charCodeAt(0)) % 9973
  return ((h % 13) - 6) / 100
}

export function aforoEn(sucursal, fecha = new Date()) {
  if (!abierta(sucursal, fecha)) return null
  const curva = [0, 6].includes(fecha.getDay()) ? FIN_DE_SEMANA : ENTRE_SEMANA
  const h = fecha.getHours()
  const t = fecha.getMinutes() / 60
  const base = curva[h] * (1 - t) + curva[(h + 1) % 24] * t
  const valor = base * sucursal.ritmo * (1 + variacion(sucursal.id, fecha))
  return Math.max(2, Math.min(97, Math.round(valor)))
}

export function estadoAforo(porcentaje) {
  if (porcentaje === null) return "cerrada"
  if (porcentaje < 35) return "tranquilo"
  if (porcentaje < 60) return "normal"
  if (porcentaje < 80) return "lleno a medias"
  return "lleno"
}

// «abre a las 5:30» o «abre mañana a las 7:00», para una sucursal cerrada.
export function cuandoAbre(sucursal, fecha) {
  const hhmm = (h) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`
  const ahora = fecha.getHours() + fecha.getMinutes() / 60
  const finde = (d) => [0, 6].includes(d.getDay())
  const [abreHoy] = finde(fecha) ? sucursal.horario.finde : sucursal.horario.semana
  if (ahora < abreHoy) return `abre a las ${hhmm(abreHoy)}`
  const manana = new Date(fecha)
  manana.setDate(manana.getDate() + 1)
  const [abre] = finde(manana) ? sucursal.horario.finde : sucursal.horario.semana
  return `abre mañana a las ${hhmm(abre)}`
}

// Aforo de cada hora en punto en que la sucursal está abierta ese día.
export function aforoPorHora(sucursal, fecha) {
  const horas = []
  for (let h = 0; h < 24; h++) {
    const f = new Date(fecha)
    f.setHours(h, 0, 0, 0)
    const fin = new Date(f)
    fin.setMinutes(59)
    const pct = aforoEn(sucursal, f) ?? aforoEn(sucursal, fin)
    if (pct !== null) horas.push({ hora: h, pct })
  }
  return horas
}

// Tramos de dos horas o más con aforo «tranquilo» (menos de 35 %), entre las 6:00 y las 22:00.
export function horasTranquilas(sucursal, fecha) {
  const tramos = []
  let inicio = null
  let fin = null
  const cerrar = () => {
    if (inicio !== null && fin - inicio >= 2) tramos.push([inicio, fin])
    inicio = null
  }
  for (const { hora, pct } of aforoPorHora(sucursal, fecha)) {
    const tranquila = hora >= 6 && hora < 22 && pct < 35
    if (!tranquila || hora !== fin) cerrar()
    if (tranquila) {
      if (inicio === null) inicio = hora
      fin = hora + 1
    }
  }
  cerrar()
  return tramos
}
