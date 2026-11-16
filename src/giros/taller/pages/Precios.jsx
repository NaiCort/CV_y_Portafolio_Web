import { useState } from "react"
import { Link } from "react-router-dom"
import { LISTAS, PAGOS, REGLAS } from "../data/precios"
import { CONTRATO_EJEMPLO } from "../data/talleres"
import { precioTexto } from "../lib/formato"

const clave = (categoria, nombre) => `${categoria}|${nombre}`

// Lista de precios completa (la que exige la NOM-174 a la vista), con una suma aproximada.
export default function Precios({ taller }) {
  const lista = LISTAS[taller.id]
  const [elegidos, setElegidos] = useState(() => new Set())
  const alternar = (k) =>
    setElegidos((s) => {
      const n = new Set(s)
      if (n.has(k)) n.delete(k)
      else n.add(k)
      return n
    })
  const total = lista
    .flatMap((c) => c.servicios.map(([nombre, , precio]) => [clave(c.categoria, nombre), precio]))
    .filter(([k]) => elegidos.has(k))
    .reduce((n, [, p]) => n + p, 0)
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-cita-cab">
        <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
          Lista de precios
        </h1>
        <p className="t-bajada">
          La misma que está a la vista en {taller.id === "rosales" ? "el taller" : "cada sucursal"}.
          Precios desde, con IVA incluido. Mano de obra: {precioTexto(taller.manoDeObra)} la hora.
          Garantía de {taller.garantia} en mano de obra.
        </p>
      </div>
      <div className="t-precios-pagina">
        <div className="t-precios-listas">
          {lista.map((c) => (
            <section key={c.categoria} aria-labelledby={`t-cat-${c.categoria}`}>
              <h2 id={`t-cat-${c.categoria}`}>{c.categoria}</h2>
              <ul className="t-lista-precios">
                {c.servicios.map(([nombre, detalle, precio]) => {
                  const k = clave(c.categoria, nombre)
                  return (
                    <li key={nombre}>
                      {precio > 0 ? (
                        <label className="t-precio-elegir">
                          <input
                            type="checkbox"
                            checked={elegidos.has(k)}
                            onChange={() => alternar(k)}
                          />
                          <span>
                            <b>{nombre}</b>
                            <span>{detalle}</span>
                          </span>
                        </label>
                      ) : (
                        <div className="t-precio-elegir">
                          <span aria-hidden="true" className="t-precio-hueco" />
                          <span>
                            <b>{nombre}</b>
                            <span>{detalle}</span>
                          </span>
                        </div>
                      )}
                      <span className="t-precio t-num">
                        {precio > 0 ? precioTexto(precio) : "Sin costo"}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
        <aside className="t-suma" aria-labelledby="t-suma-titulo">
          <h2 id="t-suma-titulo">Suma aproximada</h2>
          <p className="t-suma-total t-num" aria-live="polite">
            {elegidos.size ? precioTexto(total) : "$0"}
          </p>
          <p className="t-nota">
            {elegidos.size
              ? `${elegidos.size} ${elegidos.size === 1 ? "servicio" : "servicios"}, precios desde. El total real se confirma por escrito antes de trabajar.`
              : "Marca servicios de la lista para sumarlos."}
          </p>
          {elegidos.size > 0 && (
            <button type="button" className="t-inline" onClick={() => setElegidos(new Set())}>
              Limpiar la suma
            </button>
          )}
          <Link className="t-btn t-btn-p" to="/taller/cita">
            Agendar cita
          </Link>
        </aside>
      </div>
      <section className="t-reglas" aria-labelledby="t-reglas-titulo">
        <h2 id="t-reglas-titulo">Cómo cobramos</h2>
        <ul className="t-puntos">
          {REGLAS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>
          <b>Formas de pago:</b> {PAGOS[taller.id]}
        </p>
        <p className="t-nota">
          Contrato de adhesión registrado ante Profeco con el número {CONTRATO_EJEMPLO} (número de
          ejemplo).
        </p>
      </section>
    </section>
  )
}
