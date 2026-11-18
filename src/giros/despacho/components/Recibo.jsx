import { useState } from "react"
import { Link } from "react-router-dom"
import { REGIMENES, findRegimen } from "../data/despacho"
import { precioTexto } from "../lib/formato"

// «Elige tu régimen y ve el precio» (V4.6.8): los regímenes son renglones de libro mayor con su
// precio y, al lado, el recibo de papel cambia con el elegido.
export default function Recibo() {
  const [elegido, setElegido] = useState("resico")
  const r = findRegimen(elegido)
  return (
    <div className="d-selector">
      <fieldset className="d-regimenes">
        <legend className="d-oculto">¿Cuál es tu situación?</legend>
        {REGIMENES.map((x) => (
          <label key={x.id} className={x.id === elegido ? "is-on" : undefined}>
            <input
              type="radio"
              name="regimen"
              checked={x.id === elegido}
              onChange={() => setElegido(x.id)}
            />
            <span className="d-reg-nombre">
              <b>{x.nombre}</b>
              <span>{x.para}</span>
            </span>
            <span className="d-reg-precio d-num">
              {precioTexto(x.precio)}
              <small>{x.unidad}</small>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="d-recibo" aria-live="polite" key={elegido}>
        <p className="d-recibo-tipo">Recibo aproximado</p>
        <p className="d-recibo-nombre">{r.nombre}</p>
        <p className="d-recibo-precio">
          <span className="d-oculto">{r.nombre}: </span>
          desde <b className="d-num">{precioTexto(r.precio)}</b> <small>{r.unidad}</small>
        </p>
        <ul>
          {r.incluye.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <p className="d-nota">
          Aproximado, con IVA. Depende de cuántas facturas emites y recibes y de si tienes
          empleados.
        </p>
        <Link className="d-btn d-btn-p" to={`/despacho/precios?regimen=${r.id}#cotizar`}>
          Cotizar mi caso
        </Link>
      </div>
    </div>
  )
}
