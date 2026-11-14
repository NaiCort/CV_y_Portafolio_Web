import { HORARIO, findCategoria } from "../data/clases"
import { fechaDeClase, lugaresLibres } from "./horario"

// Reservas simuladas de Brío. Viven en este navegador; no se envían a ningún lado.
export const RESERVAS_KEY = "brio-reservas-v1"
// La lista de espera avanza sola para que la demo muestre el cambio: un lugar cada 12 s.
export const ESPERA_PASO_MS = 12_000
// Se cancela sin consecuencia hasta 2 h antes; después cuenta como clase tomada.
export const LIMITE_CANCELACION_MS = 2 * 60 * 60 * 1000

// Clases con lugar elegido; en Ritmo cada quien se acomoda donde quiera.
export const NOMBRE_LUGAR = {
  ciclo: "Bici",
  fuerza: "Rack",
  combate: "Costal",
  movilidad: "Tapete",
}

export function sesionPorId(id, fechaIso) {
  const clase = HORARIO.find((c) => c.id === id)
  if (!clase) return null
  const fecha = new Date(fechaIso)
  const exacta = fechaDeClase(clase, fecha, 0)
  return { ...clase, fecha: exacta }
}

// Lugares ocupados por otras personas: estables para la sesión y en número igual al cupo menos
// los lugares libres simulados.
export function lugaresOcupados(sesion) {
  const { cupo } = findCategoria(sesion.categoria)
  const ocupados = cupo - lugaresLibres(sesion)
  const numeros = Array.from({ length: cupo }, (_, i) => i + 1)
  let h = 17
  for (const letra of `${sesion.id}-${sesion.fecha.toDateString()}`)
    h = (h * 31 + letra.charCodeAt(0)) % 10007
  // Barajado determinista: el mismo orden para la misma sesión.
  for (let i = numeros.length - 1; i > 0; i--) {
    h = (h * 1103 + 12345) % 10007
    const j = h % (i + 1)
    ;[numeros[i], numeros[j]] = [numeros[j], numeros[i]]
  }
  return new Set(numeros.slice(0, ocupados))
}

export function cargar(storage) {
  try {
    const datos = JSON.parse(storage?.getItem(RESERVAS_KEY) || "null")
    return Array.isArray(datos?.reservas) ? datos.reservas : []
  } catch {
    return []
  }
}
export function guardar(storage, reservas) {
  try {
    storage?.setItem(RESERVAS_KEY, JSON.stringify({ reservas }))
  } catch {
    /* Sin almacenamiento, las reservas duran mientras la página esté abierta. */
  }
}

const codigo = (ahora) => `BR-${String(ahora).slice(-5)}`

export function reservar(reservas, { sesion, lugar, nombre, ahora, prueba = false }) {
  const activa = reservas.find(
    (r) =>
      r.sesionId === sesion.id &&
      r.fecha === sesion.fecha.toISOString() &&
      r.estado !== "cancelada",
  )
  if (activa) return reservas
  const espera = lugar === null && lugaresLibres(sesion) === 0
  return [
    ...reservas,
    {
      id: codigo(ahora),
      sesionId: sesion.id,
      fecha: sesion.fecha.toISOString(),
      categoria: sesion.categoria,
      sucursal: sesion.sucursal,
      coach: sesion.coach,
      lugar,
      nombre: nombre.trim().slice(0, 30),
      estado: espera ? "espera" : "confirmada",
      posicion: espera ? 2 : null,
      creada: ahora,
      prueba: Boolean(prueba),
    },
  ]
}

// Avance de la lista de espera según el tiempo transcurrido. Al llegar a la posición 0 se asigna
// el primer lugar que quedó libre.
export function avanzarEspera(reservas, ahora) {
  let cambio = false
  const nuevas = reservas.map((r) => {
    if (r.estado !== "espera") return r
    const pasos = Math.floor((ahora - r.creada) / ESPERA_PASO_MS)
    const posicion = Math.max(0, 2 - pasos)
    if (posicion === r.posicion) return r
    cambio = true
    if (posicion > 0) return { ...r, posicion }
    const sesion = sesionPorId(r.sesionId, r.fecha)
    const ocupados = lugaresOcupados(sesion)
    const { cupo } = findCategoria(r.categoria)
    const libre = NOMBRE_LUGAR[r.categoria]
      ? Array.from({ length: cupo }, (_, i) => i + 1).find((n) => ocupados.has(n)) || 1
      : null
    return { ...r, estado: "confirmada", posicion: null, lugar: libre, liberada: true }
  })
  return cambio ? nuevas : reservas
}

export function cancelacion(reserva, ahora) {
  const falta = new Date(reserva.fecha) - ahora
  if (falta <= 0) return "pasada"
  return falta > LIMITE_CANCELACION_MS ? "libre" : "tardia"
}

export function cancelar(reservas, id) {
  return reservas.map((r) => (r.id === id ? { ...r, estado: "cancelada" } : r))
}

// Resumen simulado de una clase terminada. Las calorías son una estimación con MET de referencia
// y un peso de 70 kg; no miden a nadie.
const MET = { fuerza: 5, ciclo: 8.5, combate: 9, movilidad: 3, ritmo: 6.5 }
const ZONAS = {
  fuerza: [30, 45, 20, 5],
  ciclo: [10, 30, 40, 20],
  combate: [10, 30, 35, 25],
  movilidad: [70, 25, 5, 0],
  ritmo: [15, 40, 35, 10],
}
export function resumenDeClase(reserva) {
  const { minutos } = findCategoria(reserva.categoria)
  const kcal = Math.round((MET[reserva.categoria] * 70 * minutos) / 60)
  // Reparto por residuo mayor: la suma de las zonas siempre da los minutos de la clase.
  const exactos = ZONAS[reserva.categoria].map((p) => (p / 100) * minutos)
  const zonas = exactos.map(Math.floor)
  const faltan = minutos - zonas.reduce((a, b) => a + b, 0)
  exactos
    .map((x, i) => [x - Math.floor(x), i])
    .sort((a, b) => b[0] - a[0])
    .slice(0, faltan)
    .forEach(([, i]) => zonas[i]++)
  return { minutos, kcal, zonas }
}

export function terminar(reservas, id) {
  return reservas.map((r) => (r.id === id ? { ...r, estado: "terminada" } : r))
}
export function calificar(reservas, id, campo, valor) {
  return reservas.map((r) => (r.id === id ? { ...r, [campo]: valor } : r))
}
