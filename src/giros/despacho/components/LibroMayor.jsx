import { useEffect, useRef } from "react"

// Libro mayor de la portada (V4.6.7): renglones de un libro contable que se van palomeando,
// la idea de «cotejar». Es decorativo; con movimiento reducido se dibuja completo de una vez.
const COLUMNAS = [0.08, 0.34, 0.52, 0.7, 0.86]
const RENGLON = 22

// Generador fijo: el dibujo es el mismo en cada visita.
function marcas(filas) {
  let s = 7
  const azar = () => (s = (s * 16807) % 2147483647) / 2147483647
  const lista = []
  for (let r = 0; r < filas; r++)
    for (let k = 0; k < COLUMNAS.length; k++) {
      if (azar() < 0.3) lista.push({ r, k, tipo: azar() < 0.12 ? "ojo" : "ok", dx: azar() })
      else if (azar() < 0.35) lista.push({ r, k, tipo: "linea", dx: azar() })
    }
  // Las palomas aparecen en orden de lectura, como quien revisa.
  return lista.sort((a, b) => a.r - b.r || a.k - b.k)
}

export default function LibroMayor() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext?.("2d")
    if (!ctx) return undefined
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    let cuadro = 0
    let lista = []
    let inicio = 0
    let ancho = 0
    let alto = 0

    const fondo = () => {
      ctx.clearRect(0, 0, ancho, alto)
      ctx.strokeStyle = "#d3dbda"
      ctx.lineWidth = 1
      const filas = Math.floor(alto / RENGLON)
      for (let r = 0; r <= filas; r++) {
        const y = Math.round(r * RENGLON) + 0.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(ancho, y)
        ctx.stroke()
      }
      for (const f of COLUMNAS) {
        const x = Math.round(ancho * f) + 0.5
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, filas * RENGLON)
        ctx.stroke()
      }
    }
    const marca = (m) => {
      const x = ancho * COLUMNAS[m.k] + 16 + m.dx * 40
      const y = m.r * RENGLON + RENGLON / 2
      if (m.tipo === "linea") {
        ctx.fillStyle = "#bcc7c5"
        ctx.fillRect(x, y - 1, 30 + m.dx * 70, 2)
        return
      }
      ctx.strokeStyle = m.tipo === "ojo" ? "#c98a0c" : "#0f5c6e"
      ctx.lineWidth = 1.6
      ctx.beginPath()
      ctx.moveTo(x - 4, y)
      ctx.lineTo(x - 1, y + 3.5)
      ctx.lineTo(x + 5, y - 4)
      ctx.stroke()
    }
    const dibujar = (t) => {
      fondo()
      const n = quieto ? lista.length : Math.floor((t - inicio) / 18)
      lista.slice(0, n).forEach(marca)
      if (n < lista.length) cuadro = requestAnimationFrame(dibujar)
    }
    const medir = () => {
      const caja = canvas.getBoundingClientRect()
      const ppp = Math.min(window.devicePixelRatio || 1, 2)
      // El observador avisa también al empezar: si el tamaño no cambió, no se reinicia.
      if (inicio && caja.width === ancho && caja.height === alto) return
      ancho = caja.width
      alto = caja.height
      canvas.width = Math.round(ancho * ppp)
      canvas.height = Math.round(alto * ppp)
      ctx.setTransform(ppp, 0, 0, ppp, 0, 0)
      lista = marcas(Math.floor(alto / RENGLON))
      cancelAnimationFrame(cuadro)
      inicio = performance.now() - (inicio ? 1e6 : 0)
      cuadro = requestAnimationFrame(dibujar)
    }
    medir()
    const obs = typeof ResizeObserver === "function" ? new ResizeObserver(medir) : null
    obs?.observe(canvas)
    return () => {
      cancelAnimationFrame(cuadro)
      obs?.disconnect()
    }
  }, [])
  return <canvas ref={ref} className="d-libro" aria-hidden="true" />
}
