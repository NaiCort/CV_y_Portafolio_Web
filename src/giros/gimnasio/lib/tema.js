export const TEMA_KEY = "brio-tema-v1"
export const TEMAS = [
  { id: "cobalto", nombre: "Cobalto", color: "#1F47C9" },
  { id: "distrito", nombre: "Distrito", color: "#B8431F" },
]
const ids = TEMAS.map((tema) => tema.id)

export function leerTema(storage) {
  try {
    const guardado = storage?.getItem(TEMA_KEY)
    return ids.includes(guardado) ? guardado : "cobalto"
  } catch {
    return "cobalto"
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
