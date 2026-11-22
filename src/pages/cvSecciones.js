import { useCallback, useEffect, useRef, useState } from "react"

// Secciones del CV y la que se está leyendo (índice de la columna pino, V4.8.3).
export const SECCIONES = [
  ["cv-resumen", "Resumen"],
  ["cv-proyectos", "Proyectos"],
  ["cv-experiencia", "Experiencia"],
  ["cv-educacion", "Educación"],
  ["cv-certificaciones", "Certificaciones"],
]

// Marca la sección que se está leyendo en la columna central (la que cruza la franja superior).
export function useSeccionActiva(raiz) {
  const [activa, setActiva] = useState(SECCIONES[0][0])
  // La sección elegida en el índice manda mientras dura su desplazamiento.
  const elegida = useRef({ id: null, hasta: 0 })
  const marcar = useCallback((id) => {
    elegida.current = { id, hasta: Date.now() + 1200 }
    setActiva(id)
  }, [])
  useEffect(() => {
    const zona = raiz.current
    if (!zona || typeof IntersectionObserver === "undefined") return
    const visibles = new Map()
    const idDe = new Map()
    // La última sección no llega a la franja superior porque la columna termina antes: al tocar
    // el final de la columna, se marca ella (corrección del 22/11/2026).
    const alFinal = () =>
      zona.scrollHeight > zona.clientHeight &&
      zona.scrollTop + zona.clientHeight >= zona.scrollHeight - 4
    const elegir = () => {
      if (Date.now() < elegida.current.hasta) return setActiva(elegida.current.id)
      if (alFinal()) return setActiva(SECCIONES.at(-1)[0])
      const primera = SECCIONES.find(([id]) => visibles.get(id))
      if (primera) setActiva(primera[0])
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) visibles.set(idDe.get(e.target), e.isIntersecting)
        elegir()
      },
      { root: zona, rootMargin: "0px 0px -65% 0px" },
    )
    for (const [id] of SECCIONES) {
      const seccion = document.getElementById(id)?.closest("section")
      if (seccion) {
        idDe.set(seccion, id)
        observador.observe(seccion)
      }
    }
    zona.addEventListener("scroll", elegir, { passive: true })
    return () => {
      observador.disconnect()
      zona.removeEventListener("scroll", elegir)
    }
  }, [raiz])
  return [activa, marcar]
}
