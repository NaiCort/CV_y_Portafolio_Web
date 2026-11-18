import { useState } from "react"
import { REGIMENES, findRegimen } from "../data/despacho"
import { precioTexto } from "../lib/formato"

// «Elige tu régimen y ve el precio»: el recibo cambia con el régimen elegido.
export default function Recibo({ onCotizar }) {
  const [elegido, setElegido] = useState("resico")
  const r = findRegimen(elegido)
  return (
    <div className="d-selector">
      <div>
        <fieldset className="d-regimenes">
          <legend>¿Cuál es tu situación?</legend>
          {REGIMENES.map((x) => (
            <label key={x.id} className={x.id === elegido ? "is-on" : undefined}>
              <input
                type="radio"
                name="regimen"
                checked={x.id === elegido}
                onChange={() => setElegido(x.id)}
              />
              {x.nombre}
            </label>
          ))}
        </fieldset>
        <p className="d-para">{r.para}</p>
      </div>
      <div className="d-recibo" aria-live="polite" key={elegido}>
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
        <button type="button" className="d-btn d-btn-p" onClick={() => onCotizar(r)}>
          Cotizar mi caso
        </button>
      </div>
    </div>
  )
}
