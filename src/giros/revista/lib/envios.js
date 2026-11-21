import { AREAS } from "../data/prisma"
export const PREFIJO_ENVIO = "revista-prisma-envio:"
export const ESTADOS = ["Enviado", "En revisión", "Preimpresión publicada"]
export function leerEnvios() {
  const lista = []
  for (const clave of Object.keys(localStorage).filter((k) => k.startsWith(PREFIJO_ENVIO))) {
    try {
      const e = JSON.parse(localStorage.getItem(clave))
      if (
        e &&
        clave === PREFIJO_ENVIO + e.id &&
        Object.hasOwn(AREAS, e.area) &&
        Number.isInteger(e.paso) &&
        ESTADOS[e.paso] &&
        ["id", "titulo", "autores", "resumen", "archivo", "fecha"].every(
          (k) => typeof e[k] === "string",
        )
      )
        lista.push(e)
    } catch {
      /* Un registro dañado no oculta los demás. */
    }
  }
  return lista.sort((a, b) => b.fecha.localeCompare(a.fecha))
}
export function guardarEnvio(e) {
  localStorage.setItem(PREFIJO_ENVIO + e.id, JSON.stringify(e))
}
