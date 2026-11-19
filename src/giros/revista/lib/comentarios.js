// Comentarios propios de la cuenta de ejemplo, guardados solo en este navegador. Los demás
// comentarios son de ejemplo y vienen de los datos.
export const COMENTARIOS_KEY = "revista-comentarios-v1"
export const MAX_COMENTARIO = 600

export function leerComentarios(storage) {
  try {
    const d = JSON.parse(storage?.getItem(COMENTARIOS_KEY) ?? "null")
    if (!d || typeof d !== "object") return {}
    const limpio = {}
    for (const [clave, lista] of Object.entries(d)) {
      if (!Array.isArray(lista)) continue
      limpio[clave] = lista.filter(
        (c) => c && typeof c.id === "string" && typeof c.texto === "string" && c.texto.trim(),
      )
    }
    return limpio
  } catch {
    return {}
  }
}

export function guardarComentarios(storage, d) {
  try {
    storage?.setItem(COMENTARIOS_KEY, JSON.stringify(d))
  } catch {
    /* Sin almacenamiento, los comentarios viven mientras la página esté abierta. */
  }
}

export function agregar(d, clave, texto, ahora = Date.now()) {
  const limpio = texto.trim().slice(0, MAX_COMENTARIO)
  if (!limpio) return d
  return { ...d, [clave]: [...(d[clave] ?? []), { id: `c${ahora}`, texto: limpio, fecha: ahora }] }
}

export function quitar(d, clave, id) {
  return { ...d, [clave]: (d[clave] ?? []).filter((c) => c.id !== id) }
}
