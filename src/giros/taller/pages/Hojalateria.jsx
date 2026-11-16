import { useState } from "react"
import { Link } from "react-router-dom"
import SoloEn from "../components/SoloEn"
import {
  CASOS,
  CON_SEGURO,
  PORCENTAJES_DEDUCIBLE,
  SIN_SEGURO,
  decidirSeguro,
} from "../data/vertice"
import { precioTexto } from "../lib/formato"

const numero = (texto) => Number(String(texto).replace(/\D/g, "")) || 0

function Deducible() {
  const [valor, setValor] = useState("280000")
  const [porcentaje, setPorcentaje] = useState(5)
  const [reparacion, setReparacion] = useState("9000")
  const v = numero(valor)
  const r = numero(reparacion)
  const listo = v > 0 && r > 0
  const d = decidirSeguro(v, porcentaje, r)
  return (
    <form className="t-deducible" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="t-campos">
        <div className="t-campo">
          <label htmlFor="t-valor">Valor comercial de tu auto</label>
          <input
            id="t-valor"
            inputMode="numeric"
            value={valor}
            onChange={(e) => setValor(e.target.value.replace(/\D/g, "").slice(0, 8))}
            autoComplete="off"
          />
        </div>
        <div className="t-campo">
          <label htmlFor="t-reparacion">Costo de la reparación (presupuesto)</label>
          <input
            id="t-reparacion"
            inputMode="numeric"
            value={reparacion}
            onChange={(e) => setReparacion(e.target.value.replace(/\D/g, "").slice(0, 7))}
            autoComplete="off"
          />
        </div>
      </div>
      <fieldset className="t-decision">
        <legend>Deducible de tu póliza por daños materiales</legend>
        {PORCENTAJES_DEDUCIBLE.map((p) => (
          <label key={p} className={porcentaje === p ? "is-on" : undefined}>
            <input
              type="radio"
              name="porcentaje"
              checked={porcentaje === p}
              onChange={() => setPorcentaje(p)}
            />
            {p} %
          </label>
        ))}
      </fieldset>
      <div className="t-deducible-resultado" aria-live="polite">
        {listo ? (
          <>
            <p className="t-num">
              Tu deducible: <b>{precioTexto(d.deducible)}</b>
            </p>
            <p>
              {d.conviene === "seguro"
                ? `Conviene usar el seguro: pagas ${precioTexto(d.deducible)} en lugar de ${precioTexto(r)}.`
                : `Conviene pagarla directo: la reparación (${precioTexto(r)}) cuesta menos que tu deducible y no usas tu póliza.`}
            </p>
          </>
        ) : (
          <p>Escribe el valor del auto y el costo de la reparación.</p>
        )}
      </div>
      <p className="t-nota">
        Cálculo orientativo. Revisa tu póliza: algunas tienen deducible fijo o diferente para
        cristales y robo.
      </p>
    </form>
  )
}

// Hojalatería y pintura con o sin aseguradora (solo Vértice, sucursal Ánimas).
export default function Hojalateria({ taller, onCambiar }) {
  if (taller.id !== "vertice")
    return <SoloEn taller="vertice" titulo="Hojalatería y seguros" onCambiar={onCambiar} />
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-cita-cab">
        <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
          Hojalatería y seguros
        </h1>
        <p className="t-bajada">
          En la sucursal Ánimas, con cabina de pintura propia. Trabajamos con seis aseguradoras o
          directo contigo, y te mostramos cada pieza antes de repararla.
        </p>
      </div>
      <div className="t-usados-seccion t-dos">
        <section aria-labelledby="t-con">
          <h2 id="t-con">Con seguro</h2>
          <ol className="t-usados-pasos t-pasos-columna">
            {CON_SEGURO.map(([titulo, texto]) => (
              <li key={titulo}>
                <b>{titulo}</b>
                <span>{texto}</span>
              </li>
            ))}
          </ol>
        </section>
        <section aria-labelledby="t-sin">
          <h2 id="t-sin">Sin seguro</h2>
          <ul className="t-puntos">
            {SIN_SEGURO.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="t-acciones">
            <Link className="t-btn t-btn-p" to="/taller/cita?servicio=hojalateria">
              Agendar valoración
            </Link>
          </div>
        </section>
      </div>
      <section className="t-usados-seccion" aria-labelledby="t-ded">
        <h2 id="t-ded">¿Uso el seguro o pago directo?</h2>
        <Deducible />
      </section>
      <section className="t-usados-seccion" aria-labelledby="t-casos">
        <h2 id="t-casos">Trabajos recientes (de ejemplo)</h2>
        <ul className="t-casos">
          {CASOS.map((c) => (
            <li key={c.auto}>
              <div>
                <b>{c.auto}</b>
                <span>{c.dano}</span>
              </div>
              <p>{c.trabajo}</p>
              <p className="t-nota">
                {c.dias} días · {c.via}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
