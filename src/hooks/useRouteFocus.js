import { useEffect } from "react"

// La primera página que abre el navegador no mueve el foco: el teclado y el lector de pantalla
// empiezan arriba, en «Saltar al contenido» (V4.8.7; antes el foco caía en el contenido y se
// saltaba todo lo anterior, como el PDF, el índice y el contacto del CV). React Router guarda
// una clave en el historial con cada navegación; en la página de entrada todavía no existe. Al
// navegar dentro del sitio sí lleva el foco al contenido, para que no se quede en el enlace que se
// acaba de usar. Se ejecuta al entrar a una página, no al cambiar de tema.
export default function useRouteFocus() {
  useEffect(() => {
    if (window.history.state?.key)
      document.getElementById("contenido")?.focus({ preventScroll: true })
    if (window.location.hash) {
      try {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
        target?.scrollIntoView({ behavior: "instant" })
      } catch {
        /* Un fragmento mal formado no debe impedir explorar la página. */
      }
    }
  }, [])
}
