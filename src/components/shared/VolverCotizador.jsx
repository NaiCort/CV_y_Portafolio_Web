import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CLAVE_ORIGEN, guardarSesion, leerSesion } from "../../lib/origenCotizador"
import "./volverCotizador.css"

// Botón flotante «Vuelve al cotizador» (V4.9.1, pedido de Ian): solo aparece en una demo a la que
// se llegó desde el cotizador («Ver un ejemplo» o «Ver la demo»). Si se entra a la misma demo desde
// el CV o con un enlace directo, no existe. En escritorio dice «Vuelve al cotizador»; en el celular
// es un círculo pequeño que, al tocarlo, pregunta «¿Volver al cotizador?»: tocar la pregunta
// regresa y tocar fuera la cierra. Se puede arrastrar si estorba, y recuerda dónde se dejó.

const CLAVE_LUGAR = "volver-cotizador-lugar"

const dentro = (x, y, w, h) => ({
  x: Math.min(Math.max(8, x), window.innerWidth - w - 8),
  y: Math.min(Math.max(52, y), window.innerHeight - h - 8),
})

export default function VolverCotizador() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // La pregunta abierta pertenece a la página donde se abrió.
  const [abiertoEn, setAbiertoEn] = useState(null)
  const abierto = abiertoEn === pathname
  const setAbierto = (si) => setAbiertoEn(si ? pathname : null)
  const [lugar, setLugar] = useState(() => leerSesion(CLAVE_LUGAR))
  const caja = useRef(null)
  const arrastre = useRef(null)
  const enCvOCotizador = pathname === "/" || pathname === "/cotizador"
  const origen = enCvOCotizador ? null : leerSesion(CLAVE_ORIGEN)

  // En el CV o de vuelta en el cotizador, la marca se borra.
  useEffect(() => {
    if (enCvOCotizador) guardarSesion(CLAVE_ORIGEN, null)
  }, [enCvOCotizador])

  // Tocar fuera cierra la pregunta.
  useEffect(() => {
    if (!abierto) return
    const fuera = (e) => {
      if (!caja.current?.contains(e.target)) setAbiertoEn(null)
    }
    const escape = (e) => e.key === "Escape" && setAbiertoEn(null)
    document.addEventListener("pointerdown", fuera)
    document.addEventListener("keydown", escape)
    return () => {
      document.removeEventListener("pointerdown", fuera)
      document.removeEventListener("keydown", escape)
    }
  }, [abierto])

  // Si cambia el tamaño de la ventana, el botón sigue a la vista.
  useEffect(() => {
    if (!lugar) return
    const ajustar = () => {
      const r = caja.current?.getBoundingClientRect()
      if (r) setLugar((l) => l && dentro(l.x, l.y, r.width, r.height))
    }
    window.addEventListener("resize", ajustar)
    return () => window.removeEventListener("resize", ajustar)
  }, [lugar])

  if (!origen || !pathname.startsWith(origen.ruta)) return null

  const volver = () => {
    guardarSesion(CLAVE_ORIGEN, null)
    navigate(origen.url, { state: { volverY: origen.y } })
  }

  const mover = (x, y) => {
    const r = caja.current.getBoundingClientRect()
    const nuevo = dentro(x, y, r.width, r.height)
    setLugar(nuevo)
    guardarSesion(CLAVE_LUGAR, nuevo)
  }

  const alPresionar = (e) => {
    if (e.button !== 0) return
    const r = caja.current.getBoundingClientRect()
    arrastre.current = {
      dx: e.clientX - r.left,
      dy: e.clientY - r.top,
      x0: e.clientX,
      y0: e.clientY,
      movio: false,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const alMover = (e) => {
    const a = arrastre.current
    if (!a) return
    if (!a.movio && Math.hypot(e.clientX - a.x0, e.clientY - a.y0) < 6) return
    a.movio = true
    mover(e.clientX - a.dx, e.clientY - a.dy)
  }
  const alSoltar = (e) => {
    const a = arrastre.current
    arrastre.current = null
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    // Un arrastre no cuenta como toque.
    if (a?.movio) e.currentTarget.dataset.arrastrado = "si"
  }
  const alTocar = (e) => {
    if (e.currentTarget.dataset.arrastrado === "si") {
      delete e.currentTarget.dataset.arrastrado
      return
    }
    // En el celular, el primer toque pregunta; el segundo (sobre la pregunta) regresa.
    if (window.matchMedia("(max-width: 639px)").matches && !abierto) setAbierto(true)
    else volver()
  }
  // Con el teclado: Enter o espacio regresa; las flechas mueven el botón.
  const alTeclear = (e) => {
    const paso = {
      ArrowLeft: [-16, 0],
      ArrowRight: [16, 0],
      ArrowUp: [0, -16],
      ArrowDown: [0, 16],
    }[e.key]
    if (!paso) return
    e.preventDefault()
    const r = caja.current.getBoundingClientRect()
    mover(r.left + paso[0], r.top + paso[1])
  }

  return (
    <div
      ref={caja}
      className={`volver-cot${abierto ? " abierto" : ""}${lugar ? " movido" : ""}`}
      style={lugar ? { left: lugar.x, top: lugar.y } : undefined}
    >
      <button
        type="button"
        aria-label={abierto ? "¿Volver al cotizador? Toca para volver" : "Vuelve al cotizador"}
        title="Vuelve al cotizador. Puedes arrastrarlo; con el teclado, muévelo con las flechas."
        onPointerDown={alPresionar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onClick={alTocar}
        onKeyDown={alTeclear}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="volver-cot-texto">Vuelve al cotizador</span>
        <span className="volver-cot-pregunta" aria-hidden={!abierto}>
          ¿Volver al cotizador?
        </span>
      </button>
    </div>
  )
}
