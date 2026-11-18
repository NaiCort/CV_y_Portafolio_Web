import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { findRegimen } from "../data/despacho"
import { PREGUNTAS, diagnosticar } from "../lib/diagnostico"
import { estimar } from "../lib/cotizar"
import Cabeza from "../components/Cabeza"
import { precioTexto } from "../lib/formato"

const NIVEL = { ok: "Al día", ojo: "Atención", mal: "Urgente" }

// Diagnóstico gratuito: una pregunta a la vez, procesamiento simulado y resultado con plan.
export default function Diagnostico() {
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [estado, setEstado] = useState("preguntas")
  const timer = useRef(null)
  const foco = useRef(null)
  const primero = useRef(true)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (primero.current) {
      primero.current = false
      return
    }
    foco.current?.focus()
  }, [paso, estado])

  const pregunta = PREGUNTAS[paso]
  const elegida = respuestas[pregunta?.id]
  const siguiente = () => {
    if (!elegida) return
    if (paso < PREGUNTAS.length - 1) return setPaso((p) => p + 1)
    setEstado("procesando")
    timer.current = setTimeout(() => setEstado("resultado"), 800)
  }
  const reiniciar = () => {
    setRespuestas({})
    setPaso(0)
    setEstado("preguntas")
  }

  if (estado === "resultado") {
    const d = diagnosticar(respuestas)
    const r = findRegimen(d.regimen)
    const e = estimar({ regimen: d.regimen, empleados: d.empleados })
    return (
      <section className="d-pagina" aria-labelledby="d-titulo">
        <Cabeza
          ruta={[["/despacho#herramientas", "Herramientas"], "Diagnóstico"]}
          titulo="Diagnóstico"
          gris="en cinco preguntas."
          bajada="Para saber en qué régimen estás, qué riesgos tienes y qué plan te conviene. Sin registro."
        />
        <div className="d-wrap d-pagina-cuerpo">
          <div className="d-diag-resultado" ref={foco} tabIndex={-1} aria-labelledby="d-diag-r">
            <h2 id="d-diag-r">Tu régimen probable: {r.nombre}</h2>
            <p>{r.para}</p>
            <ul className="d-semaforo">
              {d.riesgos.map((x) => (
                <li key={x.texto} className={`d-nivel-${x.nivel}`}>
                  <i aria-hidden="true" />
                  <b>{NIVEL[x.nivel]}</b>
                  <span>{x.texto}</span>
                </li>
              ))}
            </ul>
            <p className="d-diag-plan d-num">
              Plan sugerido: desde <b>{precioTexto(e.minimo)}</b> {e.unidad}
              {e.nomina ? ", con nómina" : ""}
              {d.regularizar ? ", más la regularización" : ""}.
            </p>
            <p className="d-nota">
              Orientación general con lo que contestaste; no se guarda ni se envía. Un contador la
              confirma revisando tu constancia de situación fiscal.
            </p>
            <div className="d-acciones">
              <Link className="d-btn d-btn-p" to={`/despacho/precios?regimen=${d.regimen}#cotizar`}>
                Cotizar este plan
              </Link>
              <button type="button" className="d-btn" onClick={reiniciar}>
                Empezar de nuevo
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="d-pagina" aria-labelledby="d-titulo">
      <Cabeza
        ruta={[["/despacho#herramientas", "Herramientas"], "Diagnóstico"]}
        titulo="Diagnóstico"
        gris="en cinco preguntas."
        bajada="Para saber en qué régimen estás, qué riesgos tienes y qué plan te conviene. Sin registro."
      />
      <div className="d-wrap d-pagina-cuerpo">
        <form
          className="d-diag"
          onSubmit={(ev) => {
            ev.preventDefault()
            siguiente()
          }}
        >
          <h2 className="d-diag-avance">
            Pregunta {paso + 1} de {PREGUNTAS.length}
          </h2>
          <div className="d-diag-barra" aria-hidden="true">
            <i style={{ width: `${((paso + (elegida ? 1 : 0)) / PREGUNTAS.length) * 100}%` }} />
          </div>
          <fieldset className="d-opciones" ref={foco} tabIndex={-1}>
            <legend>{pregunta.texto}</legend>
            {pregunta.opciones.map(([id, texto]) => (
              <label key={id} className={elegida === id ? "is-on" : undefined}>
                <input
                  type="radio"
                  name={pregunta.id}
                  checked={elegida === id}
                  onChange={() => setRespuestas((x) => ({ ...x, [pregunta.id]: id }))}
                />
                {texto}
              </label>
            ))}
          </fieldset>
          <div className="d-acciones">
            {paso > 0 && (
              <button
                type="button"
                className="d-btn"
                onClick={() => setPaso((p) => p - 1)}
                disabled={estado === "procesando"}
              >
                Atrás
              </button>
            )}
            <button
              type="submit"
              className="d-btn d-btn-p"
              disabled={!elegida || estado === "procesando"}
            >
              {estado === "procesando"
                ? "Revisando tus respuestas…"
                : paso < PREGUNTAS.length - 1
                  ? "Siguiente"
                  : "Ver mi diagnóstico"}
            </button>
          </div>
          <p className="d-oculto" role="status">
            {estado === "procesando" ? "Revisando tus respuestas…" : ""}
          </p>
        </form>
      </div>
    </section>
  )
}
