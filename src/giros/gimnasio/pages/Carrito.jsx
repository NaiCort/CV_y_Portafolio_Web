import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Pictograma from "../components/Pictograma"
import { SUCURSALES, findSucursal } from "../data/sucursales"
import { SOCIO } from "../data/socio"
import { cuandoListo, pesos } from "../lib/formato"
import {
  MAXIMO_POR_LINEA,
  articulo,
  cuentas,
  existencias,
  listoPara,
  precioSocio,
} from "../lib/tienda"

function Linea({ linea, esSocio, dispatch }) {
  const a = articulo(linea)
  const unidad = esSocio ? precioSocio(a.precio) : a.precio
  const cambiar = (cantidad) => dispatch({ type: "cantidad", clave: linea.clave, cantidad })
  return (
    <li className="b-linea">
      <span className="b-producto-picto b-linea-picto">
        {linea.tipo === "producto" ? (
          <Pictograma id={linea.id} />
        ) : (
          <span className="b-linea-sesiones b-num" aria-hidden="true">
            ×{a.nombre.match(/\d+/)?.[0] ?? 1}
          </span>
        )}
      </span>
      <div className="b-linea-texto">
        {linea.tipo === "producto" ? (
          <Link to={`/gimnasio/tienda/${linea.id}`}>{a.nombre}</Link>
        ) : (
          <Link to="/gimnasio/coaches#paquetes">{a.nombre}</Link>
        )}
        <span>{a.detalle}</span>
        <span className="b-num">
          {pesos(unidad)} c/u{esSocio ? " (socio)" : ""}
        </span>
      </div>
      <div className="b-cantidad" role="group" aria-label={`Cantidad de ${a.nombre}`}>
        <button
          type="button"
          className="b-btn"
          aria-label={`Quitar una de ${a.nombre}`}
          onClick={() => cambiar(linea.cantidad - 1)}
        >
          −
        </button>
        <output className="b-num">{linea.cantidad}</output>
        <button
          type="button"
          className="b-btn"
          aria-label={`Agregar una de ${a.nombre}`}
          disabled={linea.cantidad >= MAXIMO_POR_LINEA}
          onClick={() => cambiar(linea.cantidad + 1)}
        >
          +
        </button>
      </div>
      <span className="b-num b-linea-total">{pesos(unidad * linea.cantidad)}</span>
      <button
        type="button"
        className="b-inline"
        onClick={() => dispatch({ type: "quitar", clave: linea.clave })}
      >
        Quitar <span className="b-oculto">{a.nombre}</span>
      </button>
    </li>
  )
}

function Hecho({ pedido, ahora }) {
  const titulo = useRef(null)
  useEffect(() => titulo.current?.focus(), [])
  const sucursal = findSucursal(pedido.sucursal)
  return (
    <section className="b-wrap b-carrito" aria-labelledby="b-hecho-titulo">
      <h1 id="b-hecho-titulo" tabIndex={-1} ref={titulo} className="b-d b-media">
        Pedido apartado
      </h1>
      <div className="b-pedido-hecho" role="status">
        <p className="b-reserva-codigo b-num">{pedido.id}</p>
        {pedido.soloPaquetes ? (
          <p>
            Tus sesiones quedan apartadas a nombre de {pedido.nombre}. Pagas en la recepción de{" "}
            {sucursal.nombre} y agendas cada sesión con tu coach.
          </p>
        ) : (
          <p>
            Tu pedido estará listo <b>{cuandoListo(pedido.listo, ahora)}</b> en la sucursal{" "}
            {sucursal.nombre}. Lo recoges en recepción a nombre de {pedido.nombre} con el código{" "}
            {pedido.id} y pagas ahí, con tarjeta o en efectivo.
          </p>
        )}
        <p>
          Total: <b className="b-num">{pesos(pedido.total)}</b>, IVA incluido
          {pedido.descuento ? `, con ${pesos(pedido.descuento)} de descuento de socio` : ""}.
        </p>
        <p className="b-ficcion">Pedido simulado: no se cobró ni se envió nada.</p>
        <div className="b-acciones">
          <Link className="b-btn b-btn-p" to="/gimnasio/tienda">
            Volver a la tienda
          </Link>
          <Link className="b-btn" to="/gimnasio">
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Carrito({ tienda, esSocio, ahora, dispatch }) {
  const { carrito, pedidos } = tienda
  const [sucursal, setSucursal] = useState(esSocio ? SOCIO.base : "centro")
  const [nombre, setNombre] = useState(esSocio ? `${SOCIO.nombre} ${SOCIO.apellido}` : "")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [hecho, setHecho] = useState(null)
  const timer = useRef(null)
  const nombreRef = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  if (hecho)
    return <Hecho pedido={pedidos.find((p) => p.id === hecho) || pedidos.at(-1)} ahora={ahora} />
  const c = cuentas(carrito, esSocio)
  const productos = carrito.filter((l) => l.tipo === "producto")
  const faltan = productos.filter((l) => existencias(l.id, sucursal) < l.cantidad)
  const listo = listoPara(ahora, faltan.length > 0)
  const apartar = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError("Escribe el nombre con el que recoges en recepción.")
      nombreRef.current?.focus()
      return
    }
    setError("")
    setEnviando(true)
    timer.current = setTimeout(() => {
      const momento = Date.now()
      dispatch({ type: "apartar", sucursal, nombre, ahora: momento, esSocio })
      setHecho(`PED-${String(momento).slice(-5)}`)
    }, 900)
  }
  return (
    <section className="b-wrap b-carrito" aria-labelledby="b-titulo">
      <h1 id="b-titulo" tabIndex={-1} className="b-d b-media">
        Carrito
      </h1>
      {carrito.length === 0 ? (
        <div className="b-carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <div className="b-acciones">
            <Link className="b-btn b-btn-p" to="/gimnasio/tienda">
              Ver la tienda
            </Link>
            <Link className="b-btn" to="/gimnasio/coaches#paquetes">
              Paquetes de sesiones
            </Link>
          </div>
        </div>
      ) : (
        <div className="b-carrito-rejilla">
          <ul className="b-lineas" aria-label="Artículos">
            {carrito.map((l) => (
              <Linea key={l.clave} linea={l} esSocio={esSocio} dispatch={dispatch} />
            ))}
          </ul>
          <form className="b-socio-tarjeta b-pagar" onSubmit={apartar} noValidate>
            <h2>Resumen</h2>
            <dl className="b-cuentas">
              <div>
                <dt>
                  Subtotal ({c.piezas} {c.piezas === 1 ? "artículo" : "artículos"})
                </dt>
                <dd className="b-num">{pesos(c.subtotal)}</dd>
              </div>
              {esSocio && (
                <div>
                  <dt>Precio de socio (10 %)</dt>
                  <dd className="b-num">−{pesos(c.descuento)}</dd>
                </div>
              )}
              <div className="b-cuentas-total">
                <dt>Total</dt>
                <dd className="b-num">{pesos(c.total)}</dd>
              </div>
              <div>
                <dt>IVA incluido en el total</dt>
                <dd className="b-num">{pesos(c.iva)}</dd>
              </div>
            </dl>
            {!esSocio && (
              <p className="b-nota">
                Si eres socio, <Link to="/gimnasio/socio">entra</Link> y pagas{" "}
                <span className="b-num">{pesos(cuentas(carrito, true).total)}</span>.
              </p>
            )}
            <fieldset disabled={enviando} className="b-alta-campos">
              <div className="b-campo-alta">
                <label htmlFor="b-carrito-sucursal">
                  {productos.length ? "Recoger en" : "Pagar en la recepción de"}
                </label>
                <select
                  id="b-carrito-sucursal"
                  value={sucursal}
                  onChange={(e) => setSucursal(e.target.value)}
                >
                  {SUCURSALES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {productos.length > 0 && (
                <p className="b-listo" aria-live="polite">
                  {faltan.length
                    ? `En ${findSucursal(sucursal).nombre} faltan piezas de ${faltan.map((l) => articulo(l).nombre.toLowerCase()).join(", ")}: llegan ${cuandoListo(listo, ahora).replace("desde las", "a las")}.`
                    : `Listo ${cuandoListo(listo, ahora)}.`}
                </p>
              )}
              <div className="b-campo-alta">
                <label htmlFor="b-carrito-nombre">Nombre para recoger</label>
                <input
                  id="b-carrito-nombre"
                  name="nombre"
                  ref={nombreRef}
                  value={nombre}
                  maxLength={40}
                  autoComplete="name"
                  onChange={(e) => {
                    setNombre(e.target.value)
                    if (e.target.value.trim()) setError("")
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "b-carrito-error" : undefined}
                />
                {error && (
                  <p id="b-carrito-error" className="b-error">
                    {error}
                  </p>
                )}
              </div>
              <p className="b-nota">
                La recepción entrega pedidos de 9:00 a 20:00. Pagas ahí, con tarjeta o en efectivo;
                sin cargos de envío ni de servicio.
              </p>
              <button type="submit" className="b-btn b-btn-p">
                {enviando ? "Apartando…" : `Apartar pedido · ${pesos(c.total)}`}
              </button>
            </fieldset>
            <p className="b-ficcion">Esta demo no cobra ni envía nada.</p>
          </form>
        </div>
      )}
    </section>
  )
}
