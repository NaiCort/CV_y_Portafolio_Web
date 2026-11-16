// Mi garaje (Vértice): sesión simulada con el perfil de ejemplo, kilometraje y recordatorios,
// guardados solo en este navegador.
import { PERFIL_GARAJE } from "../data/vertice"

export const GARAJE_KEY = "taller-garaje-v1"
export const MAX_SALTO_KM = 50000

export const garajeInicial = () => ({ sesion: false, km: {}, recordatorios: {} })

export const credencialesValidas = (correo, clave) =>
  correo.trim().toLowerCase() === PERFIL_GARAJE.correo && clave === PERFIL_GARAJE.clave

export const kmDe = (auto, estado) => estado.km[auto.id] ?? auto.km

// El kilometraje solo sube y no salta más de 50,000 km de golpe.
export function validarKm(auto, estado, texto) {
  const km = Number(String(texto).replace(/\D/g, ""))
  const actual = kmDe(auto, estado)
  if (!String(texto).trim() || !Number.isFinite(km)) return "Escribe el kilometraje."
  if (km < actual)
    return `No puede ser menor a lo registrado (${actual.toLocaleString("es-MX")} km).`
  if (km > actual + MAX_SALTO_KM) return "Revisa la cifra: es un salto muy grande."
  return null
}

// Cuánto falta para el siguiente servicio y si ya toca.
export function siguienteServicio(auto, km) {
  const faltan = auto.siguiente - km
  return {
    faltan,
    toca: faltan <= 500,
    avance: Math.min(1, (km - auto.ultimo) / (auto.siguiente - auto.ultimo)),
  }
}

export function cargarGaraje(storage) {
  try {
    const e = JSON.parse(storage?.getItem(GARAJE_KEY) ?? "null")
    if (!e || typeof e !== "object") return garajeInicial()
    return {
      sesion: e.sesion === true,
      km: e.km && typeof e.km === "object" ? e.km : {},
      recordatorios: e.recordatorios && typeof e.recordatorios === "object" ? e.recordatorios : {},
    }
  } catch {
    return garajeInicial()
  }
}
export function guardarGaraje(storage, estado) {
  try {
    storage?.setItem(GARAJE_KEY, JSON.stringify(estado))
  } catch {
    /* Sin almacenamiento, el garaje vive mientras la página esté abierta. */
  }
}
