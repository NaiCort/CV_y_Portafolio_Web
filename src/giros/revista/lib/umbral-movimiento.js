import { useEffect, useRef, useState } from "react"

const quieto = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

// Se activa una vez al entrar en pantalla (para escribir la caligráfica o encender capas).
export function useEnVista(umbral = 0.35) {
  const ref = useRef(null)
  // Sin IntersectionObserver (navegadores viejos, pruebas) se muestra de inmediato.
  const [visto, setVisto] = useState(() => typeof IntersectionObserver === "undefined")
  useEffect(() => {
    const el = ref.current
    if (!el || visto) return undefined
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisto(true), {
      threshold: umbral,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [visto, umbral])
  return [ref, visto]
}

// 2.5D: escribe --px y --py (de -1 a 1) en el elemento según el puntero o la inclinación del
// teléfono, suavizado con requestAnimationFrame. Con movimiento reducido no hace nada.
export function useProfundidad() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || quieto()) return undefined
    let meta = [0, 0]
    let actual = [0, 0]
    let cuadro = 0
    const pinta = () => {
      actual = actual.map((v, i) => v + (meta[i] - v) * 0.08)
      el.style.setProperty("--px", actual[0].toFixed(3))
      el.style.setProperty("--py", actual[1].toFixed(3))
      cuadro =
        Math.abs(actual[0] - meta[0]) + Math.abs(actual[1] - meta[1]) > 0.002
          ? requestAnimationFrame(pinta)
          : 0
    }
    const mueve = (x, y) => {
      meta = [Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y))]
      if (!cuadro) cuadro = requestAnimationFrame(pinta)
    }
    const puntero = (e) => {
      const r = el.getBoundingClientRect()
      mueve(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const sale = () => mueve(0, 0)
    const inclina = (e) => {
      if (e.gamma == null) return
      mueve(e.gamma / 30, (e.beta - 45) / 30)
    }
    el.addEventListener("pointermove", puntero)
    el.addEventListener("pointerleave", sale)
    window.addEventListener("deviceorientation", inclina)
    return () => {
      cancelAnimationFrame(cuadro)
      el.removeEventListener("pointermove", puntero)
      el.removeEventListener("pointerleave", sale)
      window.removeEventListener("deviceorientation", inclina)
    }
  }, [])
  return ref
}
