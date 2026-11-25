// Agenda simulada del consultorio (V4.10.2): días, horarios, zonas horarias y validación del
// contacto. Funciones puras para probarlas sin navegador. Nada se guarda ni se envía.

export const TIPOS = [
  {
    id: "llamada",
    nombre: "Llamada previa",
    detalle: "15 minutos por teléfono, sin costo. No es terapia: sirve para resolver dudas.",
    precio: 0,
  },
  {
    id: "primera",
    nombre: "Primera sesión",
    detalle: "50 minutos, en el consultorio o en línea. 650 MXN.",
    precio: 650,
  },
]

// Desfase en horas respecto a la hora del consultorio (centro de México, UTC−6, sin horario de
// verano desde 2022). Los de fuera de México son aproximados: pueden variar una hora en verano.
export const ZONAS = [
  { id: "centro", nombre: "Centro de México (Xalapa, CDMX, Guadalajara)", desfase: 0 },
  { id: "pacifico", nombre: "Pacífico (Sinaloa, Sonora, Nayarit)", desfase: -1 },
  { id: "noroeste", nombre: "Noroeste (Baja California)", desfase: -2 },
  { id: "sureste", nombre: "Sureste (Quintana Roo)", desfase: 1 },
  { id: "bogota", nombre: "Bogotá, Lima o Nueva York (aproximado)", desfase: 1 },
  { id: "madrid", nombre: "Madrid (aproximado)", desfase: 7 },
]

const HORAS_SEMANA = [9, 11, 13, 16, 18]
const HORAS_SABADO = [9, 11]
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
]

function clave(fecha) {
  const m = String(fecha.getMonth() + 1).padStart(2, "0")
  const d = String(fecha.getDate()).padStart(2, "0")
  return `${fecha.getFullYear()}-${m}-${d}`
}

// Los próximos `n` días con consulta (sin domingos), a partir de mañana.
export function diasDisponibles(hoy = new Date(), n = 6) {
  const dias = []
  const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  while (dias.length < n) {
    fecha.setDate(fecha.getDate() + 1)
    if (fecha.getDay() === 0) continue
    dias.push({ id: clave(fecha), fecha: new Date(fecha), nombre: nombreDia(fecha) })
  }
  return dias
}

export function nombreDia(fecha) {
  return `${DIAS[fecha.getDay()]} ${fecha.getDate()} de ${MESES[fecha.getMonth()]}`
}

// Algunos horarios aparecen ocupados para que la agenda se sienta real; siempre es el mismo
// resultado para el mismo día y hora.
export function ocupado(diaId, hora) {
  let h = 0
  for (const c of `${diaId}-${hora}`) h = (h * 31 + c.charCodeAt(0)) % 997
  return h % 4 === 0
}

export function horarios(dia) {
  const horas = dia.fecha.getDay() === 6 ? HORAS_SABADO : HORAS_SEMANA
  return horas.map((hora) => ({ hora, libre: !ocupado(dia.id, hora) }))
}

// «16:00» en la zona del visitante, con aviso si cae en otro día.
export function horaEnZona(hora, zonaId = "centro") {
  const zona = ZONAS.find((z) => z.id === zonaId) ?? ZONAS[0]
  const total = hora + zona.desfase
  const local = ((total % 24) + 24) % 24
  const texto = `${local}:00`
  if (total >= 24) return `${texto} (día siguiente)`
  if (total < 0) return `${texto} (día anterior)`
  return texto
}

export const MEDIOS = [
  { id: "whatsapp", nombre: "WhatsApp", etiqueta: "Número de WhatsApp", tipo: "tel" },
  { id: "telefono", nombre: "Llamada", etiqueta: "Número de teléfono", tipo: "tel" },
  { id: "correo", nombre: "Correo", etiqueta: "Correo electrónico", tipo: "email" },
]

// Devuelve el mensaje de error o null si el dato sirve.
export function validarContacto(medio, valor) {
  const limpio = (valor ?? "").trim()
  if (!limpio) return "Escribe cómo contactarte."
  if (medio === "correo")
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio) ? null : "Revisa el correo: falta algo."
  const digitos = limpio.replace(/\D/g, "")
  return digitos.length === 10 || (digitos.length === 12 && digitos.startsWith("52"))
    ? null
    : "Escribe un número de 10 dígitos."
}

export function validarNombre(nombre) {
  return (nombre ?? "").trim().length >= 2 ? null : "Escribe tu nombre o cómo quieres que te llame."
}

// Mensaje del recordatorio simulado por WhatsApp, un día antes.
export function textoRecordatorio({ tipo, dia, hora, modalidad, zona }) {
  const que = tipo === "llamada" ? "nuestra llamada de 15 minutos" : "tu primera sesión"
  const donde =
    tipo === "llamada"
      ? "Te marco al número que dejaste."
      : modalidad === "linea"
        ? "Te mando el enlace de la videollamada una hora antes."
        : "Te espero en el consultorio; si llegas antes, hay sala de espera."
  return `Hola, soy Valeria. Te recuerdo ${que} mañana, ${dia}, a las ${horaEnZona(hora, zona)}. ${donde} Si necesitas cambiarla, respóndeme por aquí.`
}
