import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { LECTORA, findNumero, foto, fotoSrcSet } from "../../data/rubor"
import { CLAVE_PLAN, precios } from "../../lib/suscripcion"

// Cuenta de ejemplo de Rubor como pliego de revista: a la izquierda, la foto y lo que incluye;
// a la derecha, el cupón de suscripción recortable (sin plan) o el carnet de lectora (con plan).
// Todo es simulado: no hay cobros ni datos bancarios.
const PLANES = {
  mensual: {
    nombre: "Mensual",
    monto: 79,
    periodo: "cada mes",
    detalle: "Cancela cuando quieras.",
  },
  anual: {
    nombre: "Anual",
    monto: 790,
    periodo: "cada año",
    detalle: "Equivale a 65.83 MXN al mes: ahorras 158 MXN.",
  },
}
const pesos = new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 })
const fechaLarga = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
})
const HOY = new Date(2026, 10, 21)
const siguiente = (plan) => {
  const d = new Date(HOY)
  if (plan === "anual") d.setFullYear(d.getFullYear() + 1)
  else d.setMonth(d.getMonth() + 1)
  return fechaLarga.format(d)
}

function Tijeras() {
  return (
    <svg className="rb-tijeras" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.1 8.1 20 20M8.1 15.9 20 4" />
    </svg>
  )
}

function Cupon({ onConfirmar }) {
  const [elegido, elegir] = useState("mensual")
  const [estado, setEstado] = useState("listo") // listo · enviando
  const reloj = useRef(null)
  useEffect(() => () => clearTimeout(reloj.current), [])
  const p = PLANES[elegido]
  return (
    <form
      className="rb-cupon"
      data-estado={estado}
      onSubmit={(e) => {
        e.preventDefault()
        if (estado === "enviando") return
        setEstado("enviando")
        reloj.current = setTimeout(() => onConfirmar(elegido), 900)
      }}
    >
      <p className="rb-cupon-corte" aria-hidden="true">
        <Tijeras /> Recorta por la línea
      </p>
      <div className="rb-cupon-cuerpo">
        <p className="rb-cupon-cab">
          <b>Cupón de suscripción</b>
          <span>Rubor · N.º 24</span>
        </p>
        <p className="rb-cupon-nombre">
          <span>Nombre</span>
          <b>{LECTORA.nombre}</b>
          <small>Cuenta de ejemplo</small>
        </p>
        <fieldset>
          <legend>Elige tu plan</legend>
          {Object.entries(PLANES).map(([clave, x]) => (
            <label
              key={clave}
              className="rb-plan"
              data-elegido={clave === elegido ? "" : undefined}
            >
              <input
                type="radio"
                name="plan"
                checked={clave === elegido}
                onChange={() => elegir(clave)}
              />
              <span className="rb-plan-caja" aria-hidden="true" />
              <span className="rb-plan-texto">
                Plan {clave} · {precios[clave]}
                <small>{x.detalle}</small>
              </span>
              <b className="rb-plan-precio" aria-hidden="true">
                ${x.monto}
              </b>
            </label>
          ))}
        </fieldset>
        <dl className="rb-cupon-cargo">
          <div>
            <dt>Hoy pagas (simulado)</dt>
            <dd>{pesos.format(p.monto)} MXN</dd>
          </div>
          <div>
            <dt>Siguiente cargo</dt>
            <dd>
              {pesos.format(p.monto)} MXN el {siguiente(elegido)}
            </dd>
          </div>
        </dl>
        <p className="rb-cupon-letra">
          Renovación simulada de {precios[elegido]} hasta que canceles desde esta cuenta, en un solo
          paso. No se pide tarjeta: es una demo.
        </p>
        <button className="rb-boton rb-boton-on" type="submit" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Procesando el cupón…" : "Confirmar suscripción simulada"}
        </button>
      </div>
    </form>
  )
}

function Carnet({ plan, numero, onCancelar }) {
  const x = PLANES[plan]
  return (
    <div className="rb-carnet-pagina">
      <div className="rb-carnet" aria-label={`Carnet de lectora de ${LECTORA.nombre}`} role="group">
        <span className="rb-sello" aria-hidden="true">
          Activa
        </span>
        <p className="rb-carnet-marca" aria-hidden="true">
          RUBOR
        </p>
        <p className="rb-carnet-nombre">{LECTORA.nombre}</p>
        <dl>
          <div>
            <dt>Lectora n.º</dt>
            <dd>RB-024-0117</dd>
          </div>
          <div>
            <dt>Plan</dt>
            <dd>
              {x.nombre} · {precios[plan]}
            </dd>
          </div>
          <div>
            <dt>Siguiente cargo</dt>
            <dd>{siguiente(plan)}</dd>
          </div>
        </dl>
      </div>
      <h2 className="rb-cuenta-sub">Historial de cargos</h2>
      <table className="rb-cargos">
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Concepto</th>
            <th scope="col">Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fechaLarga.format(HOY)}</td>
            <td>Plan {plan} (simulado)</td>
            <td>{pesos.format(x.monto)} MXN</td>
          </tr>
        </tbody>
      </table>
      <div className="rb-acciones">
        <Link className="rb-boton rb-boton-on" to={"/revista/rubor/numero/" + numero.n}>
          Leer el N.º {numero.n}
        </Link>
        <button className="rb-boton" type="button" onClick={onCancelar}>
          Cancelar suscripción
        </button>
      </div>
      <p className="rb-cupon-letra">
        Cancelar es un solo paso y no se cobra nada más. En esta demo el acceso termina de
        inmediato.
      </p>
    </div>
  )
}

export default function Cuenta({ plan, actualizar }) {
  const [aviso, avisar] = useState("")
  const [params] = useSearchParams()
  const numero = findNumero(params.get("numero")) ?? findNumero(22)
  function cambiar(valor) {
    try {
      if (valor) localStorage.setItem(CLAVE_PLAN, valor)
      else localStorage.removeItem(CLAVE_PLAN)
      actualizar(valor)
      avisar(valor ? "Suscripción simulada activa." : "Suscripción cancelada.")
    } catch {
      avisar("El navegador impidió guardar el cambio. Revisa el permiso de almacenamiento.")
    }
  }
  return (
    <main className="rb-pliego rb-cuenta">
      <section className="rb-pagina rb-cuenta-foto rb-tinte" aria-labelledby="rb-cuenta-titulo">
        <img
          src={foto("777550")}
          srcSet={fotoSrcSet("777550")}
          sizes="(max-width: 900px) 100vw, 50vw"
          alt=""
          fetchPriority="high"
        />
        <div className="rb-cuenta-portada">
          <p className="rb-sobre">Suscripción · Cuenta de ejemplo</p>
          <h1 id="rb-cuenta-titulo">
            Todo el <span>archivo</span>, cada mes
          </h1>
          <ul>
            <li>Los 22 números de archivo con sus notas de la editora.</li>
            <li>El número del mes, completo, el día que sale.</li>
            <li>Sin publicidad entre páginas, salvo la de la revista impresa.</li>
          </ul>
        </div>
        <span className="rb-folio rb-folio-i" aria-hidden="true">
          Rubor · Suscripción · 102
        </span>
      </section>
      <section className="rb-pagina rb-cuenta-papel" aria-label="Tu suscripción">
        {plan ? (
          <Carnet plan={plan} numero={numero} onCancelar={() => cambiar("")} />
        ) : (
          <Cupon onConfirmar={cambiar} />
        )}
        <p className="rv-oculto" role="status">
          {aviso}
        </p>
        <span className="rb-folio rb-folio-d" aria-hidden="true">
          103
        </span>
      </section>
    </main>
  )
}
