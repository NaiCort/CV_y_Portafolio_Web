import { useState } from "react"
import { Link } from "react-router-dom"
import { precioTexto } from "../lib/formato"
import { COSTO_MES_ATRASADO, MULTA } from "../lib/regularizacion"
import Cabeza from "../components/Cabeza"

const REVISAR = [
  [
    "Tus acuses",
    "En el portal del SAT, en «Declaraciones», consulta las presentadas: si un mes no tiene acuse, no se presentó.",
  ],
  [
    "Tu opinión de cumplimiento",
    "Si sale negativa, dice qué falta. Es gratis y se saca cuantas veces quieras.",
  ],
  ["Tu buzón tributario", "Ahí llegan los requerimientos. Si nadie lo revisaba, revísalo hoy."],
]

// «¿Te dejaron de presentar?»: qué revisar, por qué conviene actuar antes que el SAT y cuánto
// costaría ponerse al día con Cotejo.
export default function Regularizacion() {
  const [meses, setMeses] = useState("3")
  const n = Math.min(60, Number(meses) || 0)
  return (
    <section className="d-pagina" aria-labelledby="d-titulo">
      <Cabeza
        ruta={["Regularización"]}
        titulo="¿Te dejaron"
        gris="de presentar?"
        bajada="Es la queja más común contra los contadores. Si tu contador dejó de presentar tus declaraciones, todavía estás a tiempo de corregirlo sin multa."
      />
      <div className="d-wrap d-pagina-cuerpo">
        <h2>Primero, revisa</h2>
        <dl className="d-ficha-lista">
          {REVISAR.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>

        <h2>Corrige antes de que el SAT te lo pida</h2>
        <div className="d-comparar">
          <div className="d-nivel-ok">
            <h3>Si las presentas por tu cuenta</h3>
            <p>
              No hay multa: solo pagas el impuesto con actualización y recargos. Es la corrección
              espontánea del artículo 73 del Código Fiscal.
            </p>
          </div>
          <div className="d-nivel-mal">
            <h3>Si el SAT te las requiere</h3>
            <p className="d-num">
              Además de recargos, una multa de {precioTexto(MULTA[0])} a {precioTexto(MULTA[1])} por
              cada declaración, y tu opinión de cumplimiento sale negativa.
            </p>
          </div>
        </div>

        <h2>Cuánto costaría ponerte al día con nosotros</h2>
        <form
          className="d-calc"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Costo de regularizar"
        >
          <div className="d-campo">
            <label htmlFor="d-meses">¿Cuántos meses te faltan?</label>
            <input
              id="d-meses"
              inputMode="numeric"
              value={meses}
              onChange={(e) => setMeses(e.target.value.replace(/\D/g, "").slice(0, 2))}
              aria-describedby="d-meses-ayuda"
              autoComplete="off"
            />
            <span className="d-campo-ayuda" id="d-meses-ayuda">
              Hasta 60 meses (cinco años, el plazo que tiene el SAT para revisarte).
            </span>
          </div>
          <dl className="d-calc-resultado" aria-live="polite">
            <div className="d-calc-total">
              <dt>Honorarios de Cotejo</dt>
              <dd className="d-num">{precioTexto(n * COSTO_MES_ATRASADO)}</dd>
            </div>
          </dl>
          <p className="d-nota">
            {precioTexto(COSTO_MES_ATRASADO)} por mes atrasado, con IVA. El impuesto, la
            actualización y los recargos se pagan al SAT y te los calculamos antes de presentar.
          </p>
        </form>

        <h2>Lo que no debes hacer</h2>
        <ul className="d-confianza">
          <li>Entregar tu e.firma a nadie: equivale a tu firma y no se presta.</li>
          <li>Presentar declaraciones en ceros si sí tuviste ingresos.</li>
          <li>Esperar a que llegue el requerimiento.</li>
        </ul>
        <p className="d-nota">
          Si tu contador anterior era miembro de un colegio de contadores, puedes presentar una
          queja ahí; para recuperar lo que pagaste en multas, la vía es una demanda civil.
        </p>
        <div className="d-acciones">
          <Link className="d-btn d-btn-p" to="/despacho/precios?atrasadas=1#cotizar">
            Cotizar mi regularización
          </Link>
          <Link className="d-btn" to="/despacho/diagnostico">
            Hacer el diagnóstico
          </Link>
        </div>
      </div>
    </section>
  )
}
