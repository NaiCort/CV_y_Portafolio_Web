import { useState } from "react"
import { Link } from "react-router-dom"
import SoloEn from "../components/SoloEn"
import { NIVELES_PARTIDA, findServicio } from "../data/talleres"
import { PASOS_USADOS, QUE_REVISAMOS, REPORTE_EJEMPLO } from "../data/usados"
import { precioTexto } from "../lib/formato"

const nombreCategoria = (id) => QUE_REVISAMOS.find((c) => id === c.id).nombre

function Reporte() {
  const r = REPORTE_EJEMPLO
  const [abierta, setAbierta] = useState("frenos")
  const reparar = r.categorias.reduce((n, c) => n + c.costo, 0)
  return (
    <figure className="t-reporte">
      <figcaption className="t-reporte-cab">
        <span>Reporte de ejemplo · {r.auto}</span>
        <span className="t-num">Piden {precioTexto(r.precioPedido)}</span>
      </figcaption>
      <p className="t-reporte-veredicto">{r.veredicto}</p>
      <p>{r.resumen}</p>
      <ul className="t-reporte-lista">
        {r.categorias.map((c) => {
          const on = abierta === c.id
          return (
            <li key={c.id} className={`t-nivel-${c.nivel}`}>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`t-rep-${c.id}`}
                onClick={() => setAbierta(on ? null : c.id)}
              >
                <i className="t-punto" aria-hidden="true" />
                <b>{nombreCategoria(c.id)}</b>
                <span>{NIVELES_PARTIDA[c.nivel]}</span>
                <span className="t-num">{c.costo ? precioTexto(c.costo) : "—"}</span>
              </button>
              <ul id={`t-rep-${c.id}`} hidden={!on}>
                {c.hallazgos.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
      <p className="t-reporte-total t-num">
        Ponerlo al día costaría unos {precioTexto(reparar)} en Mecánica Rosales.
      </p>
    </figure>
  )
}

// Revisión antes de comprar un usado (solo Rosales).
export default function Usados({ taller, onCambiar }) {
  if (taller.id !== "rosales")
    return (
      <SoloEn taller="rosales" titulo="Revisión antes de comprar un usado" onCambiar={onCambiar} />
    )
  const servicio = findServicio(taller, "usados")
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-usados-cab">
        <div>
          <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
            Revisión antes de comprar un usado
          </h1>
          <p className="t-bajada">
            Antes de pagar, revisamos el auto como si fuera nuestro y te decimos por escrito qué
            tiene y cuánto costaría arreglarlo. No vendemos autos ni cobramos comisión al vendedor.
          </p>
        </div>
        <div className="t-usados-precio">
          <span className="t-num">{precioTexto(servicio.precio)}</span>
          <span>precio fijo · unos 90 minutos</span>
          <Link className="t-btn t-btn-p" to="/taller/cita?servicio=usados">
            Agendar la revisión
          </Link>
        </div>
      </div>

      <section className="t-usados-seccion" aria-labelledby="t-como">
        <h2 id="t-como">Cómo funciona</h2>
        <ol className="t-usados-pasos">
          {PASOS_USADOS.map(([titulo, texto]) => (
            <li key={titulo}>
              <b>{titulo}</b>
              <span>{texto}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="t-usados-seccion t-dos">
        <section aria-labelledby="t-que">
          <h2 id="t-que">Qué revisamos</h2>
          <div className="t-revisamos">
            {QUE_REVISAMOS.map((c) => (
              <div key={c.id}>
                <h3>{c.nombre}</h3>
                <ul className="t-ficha-extras">
                  {c.puntos.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section aria-labelledby="t-rep">
          <h2 id="t-rep">Así se ve el reporte</h2>
          <Reporte />
        </section>
      </div>
    </section>
  )
}
