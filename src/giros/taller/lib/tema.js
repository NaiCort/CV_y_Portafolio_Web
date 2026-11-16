// Cada tema es otro taller sobre la misma estructura (docs/FICHA_TALLER.md).
export const TEMA_KEY = "taller-tema-v1"
export const TEMAS = [
  { id: "rosales", nombre: "Mecánica Rosales", detalle: "Taller familiar", color: "#B3261E" },
  { id: "vertice", nombre: "Vértice", detalle: "Multimarca", color: "#FFB000" },
]
const ids = TEMAS.map((t) => t.id)

export function leerTema(storage) {
  try {
    const guardado = storage?.getItem(TEMA_KEY)
    return ids.includes(guardado) ? guardado : "rosales"
  } catch {
    return "rosales"
  }
}
export function guardarTema(storage, tema) {
  if (!ids.includes(tema)) return
  try {
    storage?.setItem(TEMA_KEY, tema)
  } catch {
    /* La preferencia es opcional. */
  }
}
