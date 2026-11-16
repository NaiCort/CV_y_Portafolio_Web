import { Link } from "react-router-dom"
import SoloEn from "../components/SoloEn"
import {
  BATERIA_EJEMPLO,
  HIBRIDOS_ATENDEMOS,
  HIBRIDOS_PREGUNTAS,
  HIBRIDOS_SEGURIDAD,
} from "../data/vertice"
import { findServicio } from "../data/talleres"
import { precioTexto } from "../lib/formato"

function Bateria() {
  const b = BATERIA_EJEMPLO
  const max = 16
  const min = 13.5
  const alto = (v) => `${Math.round(((v - min) / (max - min)) * 100)}%`
  return (
    <figure className="t-bateria">
      <figcaption>Reporte de ejemplo · {b.auto}</figcaption>
      <div
        className="t-bateria-barras"
        role="img"
        aria-label={`Voltaje de ${b.bloques.length} bloques: ${b.bloques.filter((v) => v < b.minimo).length} bajo el mínimo de ${b.minimo} V`}
      >
        <span className="t-bateria-minimo" style={{ bottom: alto(b.minimo) }} aria-hidden="true">
          mínimo {b.minimo} V
        </span>
        {b.bloques.map((v, i) => (
          <i
            key={i}
            className={v < b.minimo ? "is-bajo" : undefined}
            style={{ height: alto(v) }}
            title={`Bloque ${i + 1}: ${v} V`}
          />
        ))}
      </div>
      <p>{b.conclusion}</p>
    </figure>
  )
}

// Híbridos y eléctricos (solo Vértice, sucursal Arco Sur).
export default function Hibridos({ taller, onCambiar }) {
  if (taller.id !== "vertice")
    return <SoloEn taller="vertice" titulo="Híbridos" onCambiar={onCambiar} />
  const servicio = findServicio(taller, "hibridos")
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-usados-cab">
        <div>
          <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
            Híbridos y eléctricos
          </h1>
          <p className="t-bajada">
            En la sucursal Arco Sur, con técnicos certificados y la bahía separada. Te decimos qué
            tiene la batería antes de que te vendan una nueva.
          </p>
        </div>
        <div className="t-usados-precio">
          <span className="t-num">{precioTexto(servicio.precio)}</span>
          <span>revisión completa · unas 2 horas</span>
          <Link className="t-btn t-btn-p" to="/taller/cita?servicio=hibridos">
            Agendar en Arco Sur
          </Link>
        </div>
      </div>
      <div className="t-usados-seccion t-dos">
        <section aria-labelledby="t-atendemos">
          <h2 id="t-atendemos">Qué atendemos</h2>
          <dl className="t-ficha-datos t-atendemos">
            {HIBRIDOS_ATENDEMOS.map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
          <h3 className="t-sub">Seguridad</h3>
          <ul className="t-ficha-extras">
            {HIBRIDOS_SEGURIDAD.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="t-bat">
          <h2 id="t-bat">Así revisamos la batería</h2>
          <Bateria />
        </section>
      </div>
      <section className="t-usados-seccion" aria-labelledby="t-preg">
        <h2 id="t-preg">Preguntas frecuentes</h2>
        <div className="t-preguntas">
          {HIBRIDOS_PREGUNTAS.map(([p, r]) => (
            <details key={p}>
              <summary>{p}</summary>
              <p>{r}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  )
}
