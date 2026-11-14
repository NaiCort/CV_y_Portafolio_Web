import { useEffect, useRef, useState } from "react"
import { SUCURSALES } from "../data/sucursales"

// Mapa real de Xalapa. MapLibre pesa, así que se carga cuando la sección se acerca a la pantalla.
// Si falla (sin red, sin WebGL o más de 15 s), la lista de sucursales sigue sirviendo.
export default function MapaXalapa({ elegida, onElegir }) {
  const contenedor = useRef(null)
  const motor = useRef(null)
  const elegirRef = useRef(onElegir)
  const elegidaRef = useRef(elegida)
  const [intento, setIntento] = useState(0)
  const [estado, setEstado] = useState("espera")
  useEffect(() => {
    elegirRef.current = onElegir
  }, [onElegir])
  useEffect(() => {
    elegidaRef.current = elegida
    motor.current?.elegir(elegida)
  }, [elegida])
  // Arranca solo cuando el mapa está por entrar en pantalla.
  useEffect(() => {
    if (intento > 0 || typeof IntersectionObserver === "undefined") return undefined
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          observador.disconnect()
          setIntento(1)
        }
      },
      { rootMargin: "400px 0px" },
    )
    observador.observe(contenedor.current)
    return () => observador.disconnect()
  }, [intento])
  useEffect(() => {
    if (!intento) return undefined
    let terminado = false
    let instancia = null
    const fallar = () => {
      if (terminado) return
      terminado = true
      clearTimeout(limite)
      setEstado("error")
      queueMicrotask(() => {
        instancia?.destruir()
        instancia = null
        motor.current = null
      })
    }
    const limite = setTimeout(fallar, 15_000)
    import("./mapaMotor")
      .then(({ crearMapa }) => {
        if (terminado) return
        instancia = crearMapa(contenedor.current, {
          sucursales: SUCURSALES,
          elegida: elegidaRef.current,
          onElegir: (id) => elegirRef.current(id),
          onListo: () => {
            if (terminado) return
            clearTimeout(limite)
            setEstado("listo")
          },
          onError: fallar,
        })
        motor.current = instancia
      })
      .catch(fallar)
    return () => {
      terminado = true
      clearTimeout(limite)
      instancia?.destruir()
      motor.current = null
    }
  }, [intento])
  const reintentar = () => {
    setEstado("cargando")
    setIntento((n) => n + 1)
  }
  return (
    <div
      className="b-mapa"
      aria-busy={estado === "cargando" || (intento > 0 && estado === "espera")}
    >
      <div ref={contenedor} className="b-mapa-lienzo" />
      {estado !== "listo" && (
        <div className="b-mapa-estado">
          {estado === "error" ? (
            <>
              <p>No se pudo cargar el mapa. La lista de sucursales sigue disponible.</p>
              <button type="button" className="b-btn" onClick={reintentar}>
                Reintentar
              </button>
            </>
          ) : intento ? (
            <p>Cargando el mapa de Xalapa…</p>
          ) : (
            <button type="button" className="b-btn" onClick={reintentar}>
              Ver el mapa de Xalapa
            </button>
          )}
        </div>
      )}
    </div>
  )
}
