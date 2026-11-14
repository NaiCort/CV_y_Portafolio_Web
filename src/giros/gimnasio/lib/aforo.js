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
