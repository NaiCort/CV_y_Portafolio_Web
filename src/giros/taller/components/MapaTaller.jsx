import { useEffect, useRef, useState } from "react"

// Mapa real de Xalapa. MapLibre pesa, así que se carga cuando la sección se acerca a la pantalla.
// Si falla (sin red, sin WebGL o más de 15 s), la ficha o la lista siguen sirviendo.
export default function MapaTaller({ puntos, elegida, onElegir, estilo, etiqueta }) {
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
          puntos,
          elegida: elegidaRef.current,
          estilo,
          etiqueta,
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
  }, [intento, puntos, estilo, etiqueta])
  const reintentar = () => {
    setEstado("cargando")
    setIntento((n) => n + 1)
  }
  return (
    <div
      className="t-mapa"
      aria-busy={estado === "cargando" || (intento > 0 && estado === "espera")}
    >
      <div ref={contenedor} className="t-mapa-lienzo" />
      {estado !== "listo" && (
        <div className="t-mapa-estado">
          {estado === "error" ? (
            <>
              <p>No se pudo cargar el mapa. Los datos de ubicación siguen aquí al lado.</p>
              <button type="button" className="t-btn t-btn-s" onClick={reintentar}>
                Reintentar
              </button>
            </>
          ) : intento ? (
            <p>Cargando el mapa de Xalapa…</p>
          ) : (
            <button type="button" className="t-btn t-btn-s" onClick={reintentar}>
              Ver el mapa de Xalapa
            </button>
          )}
        </div>
      )}
    </div>
  )
}
