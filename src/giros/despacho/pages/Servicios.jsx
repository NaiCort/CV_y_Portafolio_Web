import { Link } from "react-router-dom"
import { SERVICIOS_DETALLE } from "../data/servicios"

export default function Servicios() {
  return (
    <section className="d-wrap d-sec d-pagina" aria-labelledby="d-titulo">
      <h1 id="d-titulo" tabIndex={-1}>
        Servicios
      </h1>
      <p className="d-bajada">
        Todo lo contable para personas físicas y empresas. Cada servicio dice qué incluye, qué te
        pedimos y cuánto cuesta, aproximado y con IVA.
      </p>
      <nav className="d-indice" aria-label="Ir a un servicio">
        {SERVICIOS_DETALLE.map((s) => (
          <Link key={s.id} to={`/despacho/servicios#${s.id}`}>
            {s.nombre}
          </Link>
        ))}
      </nav>
      <div className="d-serv-lista">
        {SERVICIOS_DETALLE.map((s) => (
          <section key={s.id} id={s.id} className="d-serv" aria-labelledby={`d-s-${s.id}`}>
            <div className="d-serv-cab">
              <h2 id={`d-s-${s.id}`}>{s.nombre}</h2>
              <span>{s.para}</span>
            </div>
            <div className="d-serv-cols">
              <div>
                <h3>Incluye</h3>
                <ul>
                  {s.incluye.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Te pedimos</h3>
                <ul>
                  {s.pedimos.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="d-serv-pie">
              <span className="d-num">{s.precio}</span>
              {s.id === "regularizacion" ? (
                <Link to="/despacho/regularizacion">¿Te dejaron de presentar?</Link>
              ) : (
                <Link to={`/despacho/precios?regimen=${s.regimen}#cotizar`}>
                  Cotizar<span className="d-oculto"> {s.nombre.toLowerCase()}</span>
                </Link>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
