// «Tu expediente» (perfil de ejemplo de Mariana, RESICO). Sin contraseña y sin servidor: el
// estado se guarda solo en este navegador. Cifras inventadas pero coherentes con la tabla de
// RESICO (tasa de 1.5 % para ingresos de hasta $83,333.33 al mes).
import { precioTexto } from "./formato"

export const EXPEDIENTE_KEY = "cotejo-expediente-v1"

export const PERFIL = {
  nombre: "Mariana Solís",
  regimen: "RESICO persona física",
  actividad: "Diseño gráfico por honorarios",
}

export const PREVIO = {
  mes: "noviembre",
  vence: "lunes 17 de noviembre",
  isr: [
    ["Ingresos cobrados del mes (sin IVA)", 64200],
    ["ISR a la tasa de 1.5 %", 963],
    ["Menos lo que te retuvieron personas morales", -250],
  ],
  iva: [
    ["IVA que cobraste", 10272],
    ["Menos el IVA de tus gastos con factura", -9701],
  ],
}
export const totalIsr = PREVIO.isr.slice(1).reduce((n, [, v]) => n + v, 0)
export const totalIva = PREVIO.iva.reduce((n, [, v]) => n + v, 0)
export const totalPrevio = totalIsr + totalIva

export const SOLICITUDES = [
  {
    id: "estado-cuenta",
    nombre: "Estado de cuenta de octubre",
    porque: "Para cuadrar lo que cobraste con tus facturas.",
    limite: "jueves 13 de noviembre",
  },
  {
    id: "renta",
    nombre: "Factura de la renta de tu estudio",
    porque: "Es un gasto que no aparece en el SAT; sin ella no la podemos considerar.",
    limite: "viernes 14 de noviembre",
  },
]

export const DOCUMENTOS = [
  {
    id: "acuse-octubre",
    nombre: "Acuse de la declaración de octubre",
    fecha: "14 de noviembre",
    detalle: "ISR $642 e IVA $418, pagados el 14 de noviembre.",
  },
  {
    id: "opinion",
    nombre: "Opinión de cumplimiento",
    fecha: "10 de noviembre",
    detalle: "Positiva. Vigente 30 días.",
  },
  {
    id: "constancia",
    nombre: "Constancia de situación fiscal",
    fecha: "2 de octubre",
    detalle: "Régimen Simplificado de Confianza; obligaciones al día.",
  },
]

export const inicial = () => ({
  sesion: false,
  previo: "pendiente", // pendiente · duda · aprobado · presentado
  duda: "",
  solicitudes: {}, // id → { estado: "recibido" | "no-tengo", archivo? }
  buzon: false,
  avisos: null, // null (apagado) o { previo: bool, fechas: bool }
})

const ESTADOS_PREVIO = ["pendiente", "duda", "aprobado", "presentado"]

const avisosValidos = (v) =>
  v && typeof v === "object" && (v.previo === true || v.fechas === true)
    ? { previo: v.previo === true, fechas: v.fechas === true }
    : null

// Mensajes que llegarían por WhatsApp con el recordatorio activo (simulados).
export function mensajesAviso(avisos) {
  if (!avisos) return []
  const nombre = PERFIL.nombre.split(" ")[0]
  return [
    avisos.previo &&
      `Hola, ${nombre}. Tu previo de ${PREVIO.mes} está listo para revisar: ${precioTexto(totalPrevio)} a pagar. Apruébalo antes del ${PREVIO.vence} desde tu expediente.`,
    avisos.fechas &&
      `Hola, ${nombre}. Faltan tres días para la fecha límite de «${SOLICITUDES[1].nombre}» (${SOLICITUDES[1].limite}). Puedes subirla desde tu expediente o mandarla por aquí.`,
  ].filter(Boolean)
}

export function reducir(e, a) {
  switch (a.type) {
    case "entrar":
      return { ...e, sesion: true }
    case "salir":
      return { ...e, sesion: false }
    case "aprobar":
      return e.previo === "pendiente" || e.previo === "duda" ? { ...e, previo: "aprobado" } : e
    case "duda":
      return e.previo === "pendiente" && a.texto?.trim()
        ? { ...e, previo: "duda", duda: a.texto.trim() }
        : e
    case "presentar":
      return e.previo === "aprobado" ? { ...e, previo: "presentado" } : e
    case "subir":
      return {
        ...e,
        solicitudes: { ...e.solicitudes, [a.id]: { estado: "recibido", archivo: a.archivo } },
      }
    case "no-tengo":
      return { ...e, solicitudes: { ...e.solicitudes, [a.id]: { estado: "no-tengo" } } }
    case "deshacer-solicitud": {
      const s = { ...e.solicitudes }
      delete s[a.id]
      return { ...e, solicitudes: s }
    }
    case "buzon":
      return { ...e, buzon: true }
    case "avisos":
      return {
        ...e,
        avisos: avisosValidos(a.valor),
      }
    case "reiniciar":
      return { ...inicial(), sesion: true }
    default:
      return e
  }
}

// Semáforo del expediente: cuatro renglones derivados del estado.
export function semaforo(e) {
  const pendientes = SOLICITUDES.filter((s) => !e.solicitudes[s.id]).length
  return [
    ["ok", "Declaraciones de octubre", "Presentadas el 14 de noviembre"],
    ["ok", "Opinión de cumplimiento", "Positiva, vigente al 10 de diciembre"],
    {
      pendiente: ["ojo", "Previo de noviembre", "Espera tu visto bueno"],
      duda: ["ojo", "Previo de noviembre", "Elena revisa tu duda"],
      aprobado: ["ok", "Previo de noviembre", "Aprobado: lo presentamos antes del 17"],
      presentado: ["ok", "Declaración de noviembre", "Presentada; el acuse está en tus documentos"],
    }[e.previo],
    e.buzon
      ? ["ok", "Buzón tributario", "Correo confirmado"]
      : ["mal", "Buzón tributario", "Confirma tu correo: el SAT lo pide"],
    pendientes
      ? [
          "ojo",
          "Lo que te pedimos",
          `${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"}`,
        ]
      : ["ok", "Lo que te pedimos", "Todo recibido"],
  ]
}

export function cargar(storage) {
  try {
    const e = JSON.parse(storage?.getItem(EXPEDIENTE_KEY) ?? "null")
    if (!e || typeof e !== "object" || !ESTADOS_PREVIO.includes(e.previo)) return inicial()
    return {
      ...inicial(),
      sesion: e.sesion === true,
      previo: e.previo,
      duda: typeof e.duda === "string" ? e.duda : "",
      solicitudes: e.solicitudes && typeof e.solicitudes === "object" ? e.solicitudes : {},
      buzon: e.buzon === true,
      avisos: avisosValidos(e.avisos),
    }
  } catch {
    return inicial()
  }
}
export function guardar(storage, e) {
  try {
    storage?.setItem(EXPEDIENTE_KEY, JSON.stringify(e))
  } catch {
    /* Sin almacenamiento, el expediente vive mientras la página esté abierta. */
  }
}
