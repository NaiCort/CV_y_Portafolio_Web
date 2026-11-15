import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import Pictograma from "../components/Pictograma"
import { findProducto } from "../data/tienda"
import { SUCURSALES } from "../data/sucursales"
import { MAXIMO_POR_LINEA, existencias } from "../lib/tienda"
import { Precio } from "./Tienda"

const textoExistencias = (n) =>
  n === 0 ? "Sin piezas: llega en 2 días" : n <= 2 ? `Últimas ${n}` : `${n} piezas`

// Cada producto monta su propia ficha, para que la variante y la cantidad empiecen de cero.
export default function Producto(props) {
  const { id } = useParams()
  const producto = findProducto(id)
  if (!producto) return <Navigate to="/gimnasio/tienda" replace />
  return <Ficha key={producto.id} producto={producto} {...props} />
}

function Ficha({ producto, esSocio, dispatch }) {
  const [variante, setVariante] = useState(producto.variantes?.opciones[0] ?? null)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(null)
  const agregar = (e) => {
    e.preventDefault()
    dispatch({ type: "agregar", tipo: "producto", id: producto.id, variante, cantidad })
    setAgregado({ cantidad, variante })
  }
  return (
    <section className="b-wrap b-ficha-producto" aria-labelledby="b-titulo">
      <p className="b-migas">
        <Link to="/gimnasio/tienda">Tienda</Link> <span aria-hidden="true">/</span>{" "}
        {producto.nombre}
      </p>
      <div className="b-ficha-rejilla">
        <div className="b-producto-picto b-producto-picto-grande">
          <Pictograma id={producto.id} />
        </div>
        <div className="b-ficha-texto">
          <h1 id="b-titulo" tabIndex={-1} className="b-d b-media">
            {producto.nombre}
          </h1>
          <p className="b-producto-detalle">{producto.detalle}</p>
          <Precio precio={producto.precio} esSocio={esSocio} />
          <p>{producto.descripcion}</p>
          <ul className="b-puntos">
            {producto.puntos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <form className="b-agregar" onSubmit={agregar}>
            {producto.variantes && (
              <fieldset className="b-chips">
                <legend>{producto.variantes.nombre}</legend>
                {producto.variantes.opciones.map((o) => (
                  <label key={o} className="b-chip">
                    <input
                      type="radio"
                      name="variante"
                      checked={variante === o}
                      onChange={() => {
                        setVariante(o)
                        setAgregado(null)
                      }}
                    />
                    <span>{o}</span>
                  </label>
                ))}
              </fieldset>
            )}
            <div className="b-cantidad" role="group" aria-labelledby="b-cantidad-etiqueta">
              <span id="b-cantidad-etiqueta">Cantidad</span>
              <button
                type="button"
                className="b-btn"
                aria-label="Quitar una pieza"
                disabled={cantidad <= 1}
                onClick={() => setCantidad((c) => c - 1)}
              >
                −
              </button>
              <output className="b-num" aria-live="polite">
                {cantidad}
              </output>
              <button
                type="button"
                className="b-btn"
                aria-label="Agregar una pieza"
                disabled={cantidad >= MAXIMO_POR_LINEA}
                onClick={() => setCantidad((c) => c + 1)}
              >
                +
              </button>
            </div>
            <button type="submit" className="b-btn b-btn-p">
              Agregar al carrito
            </button>
            <div role="status">
              {agregado && (
                <p className="b-agregado">
                  Agregaste {agregado.cantidad} {agregado.cantidad === 1 ? "pieza" : "piezas"}
                  {agregado.variante ? ` (${agregado.variante})` : ""}.{" "}
                  <Link to="/gimnasio/carrito">Ver el carrito</Link>
                </p>
              )}
            </div>
          </form>
          <h2 className="b-ficha-sub">Piezas en cada sucursal</h2>
          <ul className="b-existencias">
            {SUCURSALES.map((s) => {
              const n = existencias(producto.id, s.id)
              return (
                <li key={s.id} className={n === 0 ? "is-agotado" : undefined}>
                  <span>{s.nombre}</span>
                  <span className="b-num">{textoExistencias(n)}</span>
                </li>
              )
            })}
          </ul>
          <p className="b-ficcion">Existencias de ejemplo. Pagas al recoger; esta demo no cobra.</p>
        </div>
      </div>
    </section>
  )
}
