// Horarios por día de la semana (0 = domingo) en horas decimales; null = cerrado.
export function horaTexto(h) {
  const horas = Math.floor(h)
  const minutos = Math.round((h - horas) * 60)
  return `${horas}:${String(minutos).padStart(2, "0")}`
}

export function tramoTexto(tramo) {
  return tramo ? `${horaTexto(tramo[0])} a ${horaTexto(tramo[1])}` : "Cerrado"
}

const DIAS_CORTOS = [
  "el domingo",
  "el lunes",
  "el martes",
  "el miércoles",
  "el jueves",
  "el viernes",
  "el sábado",
]

// Estado ahora: abierto (y hasta qué hora) o cerrado (y cuándo abre).
export function estadoAhora(horario, fecha = new Date()) {
  const dia = fecha.getDay()
  const hora = fecha.getHours() + fecha.getMinutes() / 60
  const hoy = horario[dia]
  if (hoy && hora >= hoy[0] && hora < hoy[1])
    return { abierto: true, texto: `Abierto hasta las ${horaTexto(hoy[1])}` }
  if (hoy && hora < hoy[0]) return { abierto: false, texto: `Abre hoy a las ${horaTexto(hoy[0])}` }
  for (let i = 1; i <= 7; i++) {
    const tramo = horario[(dia + i) % 7]
    if (tramo)
      return {
        abierto: false,
        texto: `Abre ${i === 1 ? "mañana" : DIAS_CORTOS[(dia + i) % 7]} a las ${horaTexto(tramo[0])}`,
      }
  }
  return { abierto: false, texto: "Cerrado" }
}

// Agrupa días seguidos con el mismo horario: «Lunes a viernes · 8:30 a 18:30».
export function horarioAgrupado(horario, dias) {
  const orden = [1, 2, 3, 4, 5, 6, 0]
  const grupos = []
  for (const d of orden) {
    const texto = tramoTexto(horario[d])
    const ultimo = grupos.at(-1)
    if (ultimo && ultimo.texto === texto) ultimo.hasta = d
    else grupos.push({ desde: d, hasta: d, texto })
  }
  return grupos.map((g) => ({
    dias: g.desde === g.hasta ? dias[g.desde] : `${dias[g.desde]} a ${dias[g.hasta].toLowerCase()}`,
    texto: g.texto,
    incluye: (d) => {
      const i = orden.indexOf(d)
      return i >= orden.indexOf(g.desde) && i <= orden.indexOf(g.hasta)
    },
  }))
}
