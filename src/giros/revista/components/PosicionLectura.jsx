import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Los artículos conservan su componente entre rutas: el foco no debe quedarse en el
// enlace «siguiente» al final de la nueva lectura. También admite enlaces a secciones.
export default function PosicionLectura() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const cuadro = requestAnimationFrame(() => {
      let destino
      try {
        destino = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
      } catch {
        /* Un fragmento inválido no bloquea la revista. */
      }
      const main = document.querySelector(".revista-root main")
      if (main) main.id = "rv-contenido"
      const nodo =
        destino ||
        document.querySelector(".revista-root main h1") ||
        document.querySelector(".revista-root main")
      if (!(nodo instanceof HTMLElement)) return
      nodo.setAttribute("tabindex", "-1")
      nodo.focus({ preventScroll: true })
      if (destino) nodo.scrollIntoView({ behavior: "instant", block: "start" })
    })
    return () => cancelAnimationFrame(cuadro)
  }, [pathname, hash])
  return null
}
