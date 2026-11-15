import { useState } from "react"
import { Link } from "react-router-dom"
import Pictograma from "../components/Pictograma"
import { CATEGORIAS_TIENDA, PRODUCTOS } from "../data/tienda"
import { findSucursal } from "../data/sucursales"
import { precioSocio } from "../lib/tienda"
import { cuandoListo, pesos } from "../lib/formato"

export function Precio({ precio, esSocio }) {
  return (
    <p className="b-precio-tienda">
      {esSocio ? (
        <>
          <span className="b-num b-precio-actual">{pesos(precioSocio(precio))}</span>
          <s className="b-num">{pesos(precio)}</s>
          <span>precio de socio</span>
        </>
      ) : (
        <>
          <span className="b-num b-precio-actual">{pesos(precio)}</span>
          <span>
            Socios: <span className="b-num">{pesos(precioSocio(precio))}</span>
          </span>
        </>
      )}
    </p>
  )
}

function Pedidos({ pedidos, ahora, dispatch }) {
  const [cancelando, setCancelando] = useState(null)
  const vigentes = [...pedidos].reverse()
  if (!vigentes.length) return null
  return (
    <section className="b-wrap b-pedidos" aria-labelledby="b-pedidos-titulo">
      <h2 id="b-pedidos-titulo" className="b-d b-media">
        Tus pedidos
      </h2>
      <ul>
        {vigentes.map((p) => (
          <li key={p.id} className={p.estado === "cancelado" ? "is-cancelado" : undefined}>
            <div>
              <strong className="b-num">{p.id}</strong>
              <span>{p.lineas.map((l) => `${l.cantidad} × ${l.nombre}`).join(", ")}</span>
              <span>
                {p.estado === "cancelado"
                  ? "Cancelado"
                  : p.soloPaquetes
                    ? `Pagas en la recepción de ${findSucursal(p.sucursal).nombre}`
                    : `Listo ${cuandoListo(p.listo, ahora)} en ${findSucursal(p.sucursal).nombre}`}{" "}
                · <span className="b-num">{pesos(p.total)}</span>
              </span>
            </div>
            {p.estado !== "cancelado" &&
              (cancelando === p.id ? (
                <div className="b-acciones" role="group" aria-label={`Cancelar ${p.id}`}>
                  <button
                    type="button"
                    className="b-btn b-btn-p"
                    onClick={() => {
                      dispatch({ type: "cancelarPedido", id: p.id })
                      setCancelando(null)
                    }}
                  >
                    Sí, cancelar
                  </button>
                  <button type="button" className="b-btn" onClick={() => setCancelando(null)}>
                    Mantener
                  </button>
                </div>
              ) : (
                <button type="button" className="b-btn" onClick={() => setCancelando(p.id)}>
                  Cancelar pedido
                </button>
              ))}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Tienda({ tienda, esSocio, ahora, dispatch }) {
  const [categoria, setCategoria] = useState("todo")
  const lista = PRODUCTOS.filter((p) => categoria === "todo" || p.categoria === categoria)
  return (
    <>
      <section className="b-wrap b-tienda-cabeza" aria-labelledby="b-titulo">
        <h1 id="b-titulo" tabIndex={-1} className="b-d b-angosta">
          Tienda
        </h1>
        <p className="b-lead">
          Lo que usamos en clase. Apartas en línea y pagas al recoger en tu sucursal; los socios
          pagan 10 % menos. Productos y precios de ejemplo: esta demo no cobra.
        </p>
        {esSocio ? (
          <p className="b-tienda-socio">Entraste como socia: ya ves tu precio.</p>
        ) : (
          <p className="b-tienda-socio">
            ¿Eres socio? <Link to="/gimnasio/socio">Entra</Link> para ver tu precio en el carrito.
          </p>
        )}
      </section>
      <section className="b-wrap b-tienda" aria-label="Productos">
        <fieldset className="b-chips">
          <legend>Mostrar</legend>
          {[{ id: "todo", nombre: "Todo" }, ...CATEGORIAS_TIENDA].map((c) => (
            <label key={c.id} className="b-chip">
              <input
                type="radio"
                name="categoria-tienda"
                checked={categoria === c.id}
                onChange={() => setCategoria(c.id)}
              />
              <span>{c.nombre}</span>
            </label>
          ))}
        </fieldset>
        <ul className="b-productos">
          {lista.map((p) => (
            <li key={p.id}>
              <Link to={`/gimnasio/tienda/${p.id}`} className="b-producto">
                <span className="b-producto-picto">
                  <Pictograma id={p.id} />
                </span>
                <span className="b-producto-nombre">{p.nombre}</span>
                <span className="b-producto-detalle">{p.detalle}</span>
                <Precio precio={p.precio} esSocio={esSocio} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Pedidos pedidos={tienda.pedidos} ahora={ahora} dispatch={dispatch} />
    </>
  )
}
