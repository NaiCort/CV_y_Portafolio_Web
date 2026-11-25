// Tema elegido en la demo de Psicólogo (V4.10.2: Sala con luz, Neblina y Cuaderno). Un valor
// guardado por la versión anterior (cálido, minimalista, clínico, naturaleza) vuelve a Sala.
export const THEME_STORAGE_KEY = "demo-psicologo-theme"
export const THEME_NAMES = ["sala", "neblina", "cuaderno"]
export function readTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    return THEME_NAMES.includes(saved) ? saved : "sala"
  } catch {
    return "sala"
  }
}
export function saveTheme(theme) {
  if (!THEME_NAMES.includes(theme)) return
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* La preferencia es opcional. */
  }
}
