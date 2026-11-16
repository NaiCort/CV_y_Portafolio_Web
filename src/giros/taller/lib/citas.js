// Citas simuladas del taller, guardadas solo en este navegador. Los lugares ocupados se calculan
// con una regla fija para que el ejemplo se vea real sin servidor.
import { findTestigo } from "../data/testigos"
import { horaTexto } from "./horario"

export const CITAS_KEY = "taller-citas-v1"
const ANTICIPACION_H = 2
export const DIAS_A_MOSTRAR = 10

// Colonias que alcanza el mecánico a domicilio de Rosales (hasta 3 km del taller).
export const COLONIAS_DOMICILIO = [
  "Revolución",
  "21 de Marzo",
  "Colonia del Periodista",
  "Lucas Martín",
  "Progreso Macuiltépetl",
]
export const OTRA_COLONIA = "Otra colonia"

// Servicios que se pueden agendar. «Recolección» no es un servicio sino una forma de llegar.
export const serviciosAgendables = (taller) =>
  taller.servicios.filter((s) => s.id !== "recoleccion")

// Rosales: el mecánico va a domicilio solo para diagnóstico y para su servicio a domicilio.
export const admiteDomicilio = (servicio) => ["domicilio", "diagnostico"].includes(servicio)
export const soloDomicilio = (servicio) => servicio === "domicilio"

// Vértice: los servicios de especialidad se agendan en su sucursal; los demás, en cualquiera.
const ESPECIALIDAD = { hojalateria: "animas", hibridos: "arco-sur", alineacion: "cardenas" }
export const sucursalesPara = (taller, servicio) =>
  ESPECIALIDAD[servicio]
    ? taller.sucursales.filter((s) => s.id === ESPECIALIDAD[servicio])
    : taller.sucursales

// Lo que llega desde un testigo del tablero: servicio, nota y si conviene no manejar.
export function desdeTestigo(taller, id) {
  const testigo = findTestigo(id)
  if (!testigo) return null
  const oferta = testigo.taller[taller.id]
  return {
    servicio:
      oferta.servicio && oferta.servicio !== "recoleccion" ? oferta.servicio : "diagnostico",
    nota: `Se encendió el testigo de ${testigo.nombre.toLowerCase()}.`,
    noManejar: testigo.urgencia === "ya",
    testigo: testigo.titulo,
  }
}

const inicioDelDia = (fecha) => new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())

// Regla fija de ocupación: cerca de un tercio de los lugares aparecen tomados.
function ocupado(lugar, fecha, hora) {
  const clave = `${lugar}|${fecha.getMonth()}-${fecha.getDate()}|${hora}`
  let h = 0
  for (const c of clave) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h % 3 === 0
}

// Horas de entrega de un día: cada hora desde que abre hasta una antes de cerrar.
export function horasDelDia(horario, lugar, dia, ahora) {
  const tramo = horario[dia.getDay()]
  if (!tramo) return []
  const limite = ahora.getTime() + ANTICIPACION_H * 3600_000
  const horas = []
  for (let h = tramo[0]; h <= tramo[1] - 1; h += 1) {
    const inicio = new Date(dia)
    inicio.setHours(Math.floor(h), Math.round((h % 1) * 60), 0, 0)
    horas.push({
      hora: h,
      texto: horaTexto(h),
      inicio,
      libre: inicio.getTime() > limite && !ocupado(lugar, dia, h),
    })
  }
  return horas
}

// Próximos días con al menos una hora libre.
export function diasDisponibles(horario, lugar, ahora, cuantos = DIAS_A_MOSTRAR) {
  const dias = []
  const hoy = inicioDelDia(ahora)
  for (let i = 0; i < 21 && dias.length < cuantos; i++) {
    const dia = new Date(hoy)
    dia.setDate(hoy.getDate() + i)
    const horas = horasDelDia(horario, lugar, dia, ahora)
    if (horas.some((h) => h.libre)) dias.push({ dia, horas })
  }
  return dias
}

export const telefonoValido = (t) => String(t).replace(/\D/g, "").length === 10

export function folioCita(taller, ahora = new Date()) {
  const base = ahora.getTime().toString(36).toUpperCase().slice(-5)
  return `${taller.id === "rosales" ? "RC" : "VC"}-${base}`
}

export function cargarCitas(storage) {
  try {
    const datos = JSON.parse(storage?.getItem(CITAS_KEY) ?? "[]")
    return Array.isArray(datos) ? datos.filter((c) => c && c.id && c.taller && c.fecha) : []
  } catch {
    return []
  }
}
export function guardarCitas(storage, citas) {
  try {
    storage?.setItem(CITAS_KEY, JSON.stringify(citas))
  } catch {
    /* Sin almacenamiento, las citas viven mientras la página esté abierta. */
  }
}
