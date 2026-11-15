// Formatos compartidos de la tienda y de Coaches.
export const pesos = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`

const hhmm = (f) => `${f.getHours()}:${String(f.getMinutes()).padStart(2, "0")}`

// «hoy desde las 13:30», «mañana desde las 9:00» o «el jueves 19 de noviembre desde las 9:00».
export function cuandoListo(iso, ahora) {
  const f = new Date(iso)
  const hoy = new Date(ahora)
  const manana = new Date(hoy)
  manana.setDate(hoy.getDate() + 1)
  if (f.toDateString() === hoy.toDateString()) return `hoy desde las ${hhmm(f)}`
  if (f.toDateString() === manana.toDateString()) return `mañana desde las ${hhmm(f)}`
  const dia = f
    .toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })
    .replace(",", "")
  return `el ${dia} desde las ${hhmm(f)}`
}

// «hoy a las 18:00», «mañana a las 7:00» o «el jueves 19 de noviembre a las 7:00».
export const cuandoCita = (iso, ahora) => cuandoListo(iso, ahora).replace(" desde las ", " a las ")
