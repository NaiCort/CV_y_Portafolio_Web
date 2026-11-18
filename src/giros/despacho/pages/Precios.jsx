import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { EXTRAS, REGIMENES, findRegimen } from "../data/despacho"
import AntesDeContratarnos from "../components/AntesDeContratarnos"
import { estimar, folioCotizacion, telefonoValido } from "../lib/cotizar"
import { precioTexto } from "../lib/formato"
import Cabeza from "../components/Cabeza"

const rango = (e) =>
  e.minimo === e.maximo
    ? precioTexto(e.minimo)
    : `${precioTexto(e.minimo)} a ${precioTexto(e.maximo)}`

function Campo({ id, etiqueta, error, ayuda, children }) {
  return (
    <div className="d-campo">
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {ayuda && (
        <span className="d-campo-ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </span>
      )}
      {error && (
        <span className="d-campo-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}
const describir = (id, error, ayuda) =>
  [error && `${id}-error`, ayuda && `${id}-ayuda`].filter(Boolean).join(" ") || undefined

const vacio = (regimen, atrasadas = false) => ({
  regimen,
  facturas: "",
  empleados: "",
  nombre: "",
  telefono: "",
  atrasadas,
  mensaje: "",
})

// Cotización: datos mínimos, estimación al momento y confirmación simulada con folio.
function Cotizar({ inicial, atrasadas }) {
  const [d, setD] = useState(() => vacio(inicial, atrasadas))
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState("formulario")
  const [hecha, setHecha] = useState(null)
  const timer = useRef(null)
  const resultado = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (estado === "hecha") resultado.current?.focus()
  }, [estado])
  const r = findRegimen(d.regimen)
  const mensual = r.unidad === "al mes"
  const e = estimar({
    regimen: d.regimen,
    facturas: Number(d.facturas) || 0,
    empleados: Number(d.empleados) || 0,
  })
  const cambiar = (campo, valor) => {
    setD((x) => ({ ...x, [campo]: valor }))
    setErrores((x) => ({ ...x, [campo]: undefined }))
  }
  const enviar = (ev) => {
    ev.preventDefault()
    if (estado === "procesando") return
    const err = {}
    if (!d.nombre.trim()) err.nombre = "Escribe tu nombre."
    if (!telefonoValido(d.telefono)) err.telefono = "Escribe un número de 10 dígitos."
    setErrores(err)
    const primero = Object.keys(err)[0]
    if (primero) {
      document.getElementById(`d-${primero}`)?.focus()
      return
    }
    setEstado("procesando")
    timer.current = setTimeout(() => {
      setHecha({ folio: folioCotizacion(new Date()), estimacion: e, ...d })
      setEstado("hecha")
    }, 900)
  }
  if (estado === "hecha")
    return (
      <div className="d-cot-hecha" ref={resultado} tabIndex={-1} aria-labelledby="d-cot-lista">
        <h3 id="d-cot-lista">Recibimos tu solicitud</h3>
        <p className="d-num">Folio {hecha.folio}</p>
        <dl className="d-resumen">
          <div>
            <dt>Situación</dt>
            <dd>{hecha.estimacion.regimen.nombre}</dd>
          </div>
          <div>
            <dt>Estimación</dt>
            <dd className="d-num">
              {rango(hecha.estimacion)} {hecha.estimacion.unidad}
            </dd>
          </div>
          {hecha.atrasadas && (
            <div>
              <dt>Además</dt>
              <dd>Revisaremos tus declaraciones atrasadas antes de cotizar la regularización.</dd>
            </div>
          )}
        </dl>
        <ul className="d-confianza">
          <li>Elena te escribe por WhatsApp en menos de 24 horas hábiles.</li>
          <li>Te mandamos la propuesta por escrito, con lo que incluye y lo que no.</li>
          <li>No pedimos tu e.firma ni tu contraseña del SAT para cotizar.</li>
        </ul>
        <p className="d-nota">Solicitud simulada: no se envió nada y nadie te va a escribir.</p>
        <div className="d-acciones">
          <button
            type="button"
            className="d-btn"
            onClick={() => {
              setD(vacio(d.regimen))
              setEstado("formulario")
            }}
          >
            Cotizar otro caso
          </button>
          <Link className="d-btn d-btn-p" to="/despacho">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  return (
    <form className="d-cotizar" onSubmit={enviar} noValidate>
      <div className="d-campos">
        <Campo id="d-regimen" etiqueta="Tu situación">
          <select
            id="d-regimen"
            value={d.regimen}
            onChange={(x) => cambiar("regimen", x.target.value)}
          >
            {REGIMENES.map((x) => (
              <option key={x.id} value={x.id}>
                {x.nombre}
              </option>
            ))}
          </select>
        </Campo>
        <Campo
          id="d-facturas"
          etiqueta="Facturas al mes (emitidas y recibidas)"
          ayuda={
            r.facturas === null
              ? "En esta situación no influye en el precio."
              : `Tu plan incluye ${r.facturas}.`
          }
        >
          <input
            id="d-facturas"
            inputMode="numeric"
            value={d.facturas}
            onChange={(x) => cambiar("facturas", x.target.value.replace(/\D/g, "").slice(0, 4))}
            aria-describedby={describir("d-facturas", null, true)}
            autoComplete="off"
          />
        </Campo>
        {mensual && (
          <Campo id="d-empleados" etiqueta="Empleados en nómina" ayuda="Cero si no tienes.">
            <input
              id="d-empleados"
              inputMode="numeric"
              value={d.empleados}
              onChange={(x) => cambiar("empleados", x.target.value.replace(/\D/g, "").slice(0, 3))}
              aria-describedby={describir("d-empleados", null, true)}
              autoComplete="off"
            />
          </Campo>
        )}
      </div>
      <div className="d-estimado" aria-live="polite">
        <span>Estimación</span>
        <b className="d-num">{rango(e)}</b>
        <span>
          {e.unidad}
          {e.nomina ? ", con nómina" : ""} · aproximado con IVA
        </span>
      </div>
      <label className="d-check">
        <input
          type="checkbox"
          checked={d.atrasadas}
          onChange={(x) => cambiar("atrasadas", x.target.checked)}
        />
        <span>Tengo declaraciones atrasadas o mi contador dejó de presentar</span>
      </label>
      <div className="d-campos">
        <Campo id="d-nombre" etiqueta="Nombre" error={errores.nombre}>
          <input
            id="d-nombre"
            value={d.nombre}
            onChange={(x) => cambiar("nombre", x.target.value)}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={describir("d-nombre", errores.nombre)}
            autoComplete="off"
          />
        </Campo>
        <Campo
          id="d-telefono"
          etiqueta="WhatsApp"
          error={errores.telefono}
          ayuda="La demo no envía mensajes: puedes usar un número inventado."
        >
          <input
            id="d-telefono"
            type="tel"
            inputMode="tel"
            value={d.telefono}
            onChange={(x) => cambiar("telefono", x.target.value)}
            aria-invalid={Boolean(errores.telefono)}
            aria-describedby={describir("d-telefono", errores.telefono, true)}
            autoComplete="off"
          />
        </Campo>
        <Campo id="d-mensaje" etiqueta="Algo más que debamos saber (opcional)">
          <textarea
            id="d-mensaje"
            rows={3}
            value={d.mensaje}
            onChange={(x) => cambiar("mensaje", x.target.value)}
          />
        </Campo>
      </div>
      <button type="submit" className="d-btn d-btn-p" disabled={estado === "procesando"}>
        {estado === "procesando" ? "Enviando…" : "Pedir cotización"}
      </button>
      <p className="d-oculto" role="status">
        {estado === "procesando" ? "Enviando tu solicitud…" : ""}
      </p>
    </form>
  )
}

export default function Precios() {
  const [params] = useSearchParams()
  const inicial = findRegimen(params.get("regimen")) ? params.get("regimen") : "resico"
  return (
    <section className="d-pagina" aria-labelledby="d-titulo">
      <Cabeza
        ruta={["Precios"]}
        titulo="Precios claros,"
        gris="antes de empezar."
        bajada="Precios aproximados con IVA. Cambian según cuántas facturas emites y recibes y si tienes empleados; el precio final te lo confirmamos por escrito antes de empezar."
      />
      <div className="d-wrap d-pagina-cuerpo">
        <h2>Por régimen</h2>
        <ul className="d-tabla-precios">
          {REGIMENES.map((r) => (
            <li key={r.id}>
              <div>
                <b>{r.nombre}</b>
                <span>{r.para}</span>
                <span>{r.incluye.join(" · ")}</span>
              </div>
              <span className="d-precio d-num">
                desde {precioTexto(r.precio)} <small>{r.unidad}</small>
              </span>
            </li>
          ))}
        </ul>

        <h2>Lo que se cobra aparte</h2>
        <ul className="d-tabla-precios">
          {EXTRAS.map(([nombre, detalle, precio, unidad]) => (
            <li key={nombre}>
              <div>
                <b>{nombre}</b>
                <span>{detalle}</span>
              </div>
              <span className="d-precio d-num">
                {unidad === "desde" ? "desde " : ""}
                {precioTexto(precio)} {unidad !== "desde" && <small>{unidad}</small>}
              </span>
            </li>
          ))}
        </ul>

        <AntesDeContratarnos />

        <section id="cotizar" className="d-cotizar-bloque" aria-labelledby="d-cot-titulo">
          <h2 id="d-cot-titulo">Cotiza tu caso</h2>
          <p className="d-nota">
            Te contestamos en menos de 24 horas hábiles. Primera llamada sin costo.
          </p>
          <Cotizar key={inicial} inicial={inicial} atrasadas={params.get("atrasadas") === "1"} />
        </section>
      </div>
    </section>
  )
}
