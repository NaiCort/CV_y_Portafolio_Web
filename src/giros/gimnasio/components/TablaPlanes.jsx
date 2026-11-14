import { Link } from "react-router-dom"
import { FILAS, PLANES } from "../data/planes"

const pesos = (n) => `$${n.toLocaleString("en-US")}`

// Comparador de membresías: tabla en pantallas anchas y una tarjeta por plan en el teléfono.
export default function TablaPlanes({ tituloId }) {
  return (
    <>
      <div className="b-tabla-marco" tabIndex={0} role="region" aria-labelledby={tituloId}>
        <table>
          <caption className="b-oculto">Comparación de membresías, al mes con IVA</caption>
          <thead>
            <tr>
              <td />
              {PLANES.map((p) => (
                <th key={p.id} scope="col" className={p.destacado ? "is-on" : ""}>
                  <span>{p.nombre}</span>
                  <small>{p.lema}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Al mes, IVA incluido</th>
              {PLANES.map((p) => (
                <td key={p.id} className={`b-precio b-num${p.destacado ? " is-on" : ""}`}>
                  {pesos(p.precio)} <small>MXN</small>
                </td>
              ))}
            </tr>
            {FILAS.map((fila) => (
              <tr key={fila.concepto}>
                <th scope="row">{fila.concepto}</th>
                {PLANES.map((p) => (
                  <td
                    key={p.id}
                    className={[p.destacado && "is-on", !fila[p.id] && "is-no"]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {fila[p.id] || "No incluido"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              {PLANES.map((p) => (
                <td key={p.id} className={p.destacado ? "is-on" : ""}>
                  <Link
                    className={p.destacado ? "b-btn b-btn-p" : "b-btn"}
                    to={`/gimnasio/alta?plan=${p.id}`}
                  >
                    Elegir {p.nombre}
                  </Link>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <ol className="b-planes-movil" aria-label="Membresías, al mes con IVA">
        {PLANES.map((p) => (
          <li key={p.id} className={p.destacado ? "is-on" : ""}>
            <div className="b-plan-cabeza">
              <h3>{p.nombre}</h3>
              <p className="b-num">
                {pesos(p.precio)} <small>MXN al mes</small>
              </p>
            </div>
            <p className="b-plan-lema">{p.lema}</p>
            <dl>
              {FILAS.map((fila) => (
                <div key={fila.concepto} className={fila[p.id] ? "" : "is-no"}>
                  <dt>{fila.concepto}</dt>
                  <dd>{fila[p.id] || "No incluido"}</dd>
                </div>
              ))}
            </dl>
            <Link
              className={p.destacado ? "b-btn b-btn-plan-on" : "b-btn b-btn-p"}
              to={`/gimnasio/alta?plan=${p.id}`}
            >
              Elegir {p.nombre}
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
