import { useEffect, useState } from "react"

// Secciones del CV y la que se está leyendo (índice de la columna pino, V4.8.3).
export const SECCIONES = [
  ["cv-resumen", "Resumen"],
  ["cv-trayectoria", "Trayectoria"],
  ["cv-proyectos", "Proyectos"],
  ["cv-experiencia", "Experiencia"],
  ["cv-educacion", "Educación"],
  ["cv-certificaciones", "Certificaciones"],
]

// Marca la sección que se está leyendo en la columna central (la que cruza la franja superior).
export function useSeccionActiva(raiz) {
  const [activa, setActiva] = useState(SECCIONES[0][0])
  useEffect(() => {
    const zona = raiz.current
    if (!zona || typeof IntersectionObserver === "undefined") return
    const visibles = new Map()
    const idDe = new Map()
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) visibles.set(idDe.get(e.target), e.isIntersecting)
        const primera = SECCIONES.find(([id]) => visibles.get(id))
        if (primera) setActiva(primera[0])
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
    return () => observador.disconnect()
  }, [raiz])
  return activa
}
