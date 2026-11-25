import { useEffect, useId, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import useFavicon from "../hooks/useFavicon"
import usePageMetadata from "../hooks/usePageMetadata"
import useRouteFocus from "../hooks/useRouteFocus"
import Modal from "../components/shared/Modal"
import { DEMOS, demoPorId } from "../data/demos"
import {
  CATEGORIAS,
  FUNCIONES,
  GRUPOS,
  MANTENIMIENTO,
  MONEDAS,
  NUCLEO_GLOBAL,
  PARAMETROS,
  VERSIONES,
  categoriaPorId,
  funcionPorId,
} from "../data/catalogo"
import {
  aParametros,
  alternar,
  calcular,
  cambiarCategoria,
  configInicial,
  crearFolio,
  deParametros,
  disponible,
  fijarCantidad,
  monedaPorIdioma,
  motivoBloqueo,
  precioFuncion,
  rangoCategoria,
} from "../lib/cotizacion"
import { CORREO, FACTURA, enviarSolicitud, formatoDinero, textoSolicitud } from "../lib/solicitud"
import "./cv.css"
import "./cotizador.css"

// Cotizador (V4.9, ficha en docs/FICHA_COTIZADOR.md): «Elige tipo → Ajusta → Envía» en tres
// columnas, con la nota de la cotización a la derecha. Es también la página de servicios.

const PASOS = [
  ["tipo", "Elige tipo"],
  ["ajusta", "Ajusta"],
  ["envia", "Envía"],
]
const CLAVE_MONEDA = "cotizador-moneda"

function monedaGuardada() {
  try {
    return localStorage.getItem(CLAVE_MONEDA)
  } catch {
    return null
  }
}

const nombres = (ids) => {
  const n = ids.map((id) => `«${funcionPorId(id).nombre}»`)
  return n.length > 1 ? `${n.slice(0, -1).join(", ")} y ${n.at(-1)}` : n[0]
}

function textoCambio({ quitadas, agregadas }, accion) {
  const partes = []
  const [principal, ...resto] = accion === "quitar" ? quitadas : agregadas
  if (principal)
    partes.push(
      `${accion === "quitar" ? "Quitaste" : "Añadiste"} «${funcionPorId(principal).nombre}».`,
    )
  const otrasQuitadas = accion === "quitar" ? resto : quitadas
  const otrasAgregadas = accion === "quitar" ? agregadas : resto
  if (otrasAgregadas.length)
    partes.push(`También se añadió ${nombres(otrasAgregadas)}, que hace falta.`)
  if (otrasQuitadas.length)
    partes.push(`También se quitó ${nombres(otrasQuitadas)}, que dependía de ello.`)
  return partes.join(" ")
}

export default function Cotizador() {
  usePageMetadata(
    "Cotizar un sitio · Ian Habid Aldana Martínez",
    "Servicios de desarrollo web de Ian Habid Aldana Martínez: elige el tipo de sitio, añade o quita funciones y ve el precio y el plazo al momento.",
  )
  useFavicon("/favicon.svg")
  useRouteFocus()
  const [params, setParams] = useSearchParams()
  const monedaInicial =
    monedaGuardada() ??
    monedaPorIdioma(typeof navigator === "undefined" ? "es-MX" : navigator.language)
  const [config, setConfig] = useState(() => deParametros(params, monedaInicial))
  const [paso, setPaso] = useState(() =>
    PASOS.some(([id]) => id === params.get("paso"))
      ? params.get("paso")
      : config.demo || params.get("tipo")
        ? "ajusta"
        : "tipo",
  )
  const [folio] = useState(() => crearFolio())
  const [aviso, setAviso] = useState(null)
  const [tachadas, setTachadas] = useState([])
  const [confirmar, setConfirmar] = useState(null)
  const [notaAbierta, setNotaAbierta] = useState(false)
  const centro = useRef(null)
  const resultado = useMemo(() => calcular(config), [config])

  useEffect(() => {
    const p = aParametros(config)
    if (paso !== "tipo") p.set("paso", paso)
    setParams(p, { replace: true, preventScrollReset: true })
  }, [config, paso, setParams])

  const aplicar = (r, accion) => {
    if (r.bloqueo) {
      setAviso({ texto: `${r.bloqueo}: no se puede quitar.` })
      return
    }
    if (r.necesitaCategoria) return
    setAviso({ texto: textoCambio(r, accion), antes: config })
    setTachadas(r.quitadas)
    setConfig(r.config)
  }

  const alternarFuncion = (id) => {
    const accion = config.sel[id] ? "quitar" : "poner"
    const r = alternar(config, id)
    if (r.necesitaCategoria) {
      setConfirmar({ id, categoria: r.necesitaCategoria })
      return
    }
    aplicar(r, accion)
  }

  const elegirCategoria = (categoria, siguiente) => {
    if (categoria === config.categoria) {
      if (siguiente) irA(siguiente)
      return
    }
    const r = cambiarCategoria({ ...config, demo: null, version: null, variante: null }, categoria)
    const cat = categoriaPorId(categoria)
    const partes = [`Ahora es ${cat.nombre.toLowerCase()}.`]
    if (r.quitadas.length) partes.push(`Se quitó ${nombres(r.quitadas)}, que no cabe.`)
    if (r.agregadas.length) partes.push(`Se añadió ${nombres(r.agregadas)}.`)
    setAviso({ texto: partes.join(" "), antes: config })
    setTachadas(r.quitadas)
    setConfig(r.config)
    if (siguiente) irA(siguiente)
  }

  const deshacer = () => {
    setConfig(aviso.antes)
    setTachadas([])
    setAviso({ texto: "Se deshizo el cambio." })
  }

  const cambiarMoneda = (moneda) => {
    try {
      localStorage.setItem(CLAVE_MONEDA, moneda)
    } catch {
      /* Sin almacenamiento, la moneda se elige en cada visita. */
    }
    setConfig({ ...config, moneda })
  }

  const irA = (destino) => {
    setPaso(destino)
    setNotaAbierta(false)
    setTachadas([])
    requestAnimationFrame(() => {
      const titulo = document.getElementById("cot-titulo")
      titulo?.focus({ preventScroll: true })
      window.scrollTo({ top: 0 })
      centro.current?.scrollTo?.({ top: 0 })
    })
  }

  const partirDeDemo = (demo, version = "recomendada") => {
    setAviso(null)
    setTachadas([])
    setConfig(configInicial({ demo, version, moneda: config.moneda }))
    irA("ajusta")
  }

  const ordenPaso = PASOS.findIndex(([id]) => id === paso)

  return (
    <div className="cv-root cv-cotizador cot">
      <a className="cv-saltar" href="#contenido">
        Saltar al cotizador
      </a>
      <div className="cot-marco">
        <aside className="cot-izq" aria-label="Pasos y tipo de sitio">
          <Link className="cot-volver" to="/">
            Ian Aldana · CV y demos
          </Link>
          <nav aria-label="Pasos de la cotización">
            <ol className="cot-flujo">
              {PASOS.map(([id, nombre], i) => (
                <li key={id}>
                  <button
                    type="button"
                    aria-current={paso === id ? "step" : undefined}
                    disabled={i > ordenPaso + 1}
                    onClick={() => irA(id)}
                  >
                    {nombre}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          {paso !== "tipo" && <Categorias config={config} onElegir={elegirCategoria} />}
          {paso === "ajusta" && (
            <nav className="cot-indice" aria-label="Grupos de funciones">
              {GRUPOS.map((g) => (
                <a key={g.id} href={`#grupo-${g.id}`}>
                  {g.nombre}
                </a>
              ))}
            </nav>
          )}
        </aside>

        <main id="contenido" ref={centro} tabIndex={-1} className="cot-centro">
          {aviso && <Aviso aviso={aviso} onDeshacer={deshacer} onCerrar={() => setAviso(null)} />}
          {paso === "tipo" && (
            <PasoTipo config={config} onElegir={elegirCategoria} onDemo={partirDeDemo} />
          )}
          {paso === "ajusta" && (
            <PasoAjusta
              config={config}
              resultado={resultado}
              onAlternar={alternarFuncion}
              onCantidad={(id, n) => setConfig(fijarCantidad(config, id, n))}
              onVersion={(v) => partirDeDemo(config.demo, v)}
              onCambiar={(cambios) => setConfig({ ...config, ...cambios })}
            />
          )}
          {paso === "envia" && <PasoEnvia config={config} resultado={resultado} folio={folio} />}
        </main>

        <aside
          className={`cot-der${notaAbierta ? " abierta" : ""}`}
          aria-label="Tu cotización"
          onKeyDown={(e) => e.key === "Escape" && setNotaAbierta(false)}
        >
          <Nota
            config={config}
            resultado={resultado}
            folio={folio}
            tachadas={tachadas}
            paso={paso}
            onMoneda={cambiarMoneda}
            onSiguiente={() => irA(paso === "tipo" ? "ajusta" : "envia")}
            onCerrar={() => setNotaAbierta(false)}
          />
        </aside>
      </div>

      <p className="cv-oculto" aria-live="polite" aria-atomic="true">
        {`Total ${MONEDAS[config.moneda].iva ? "con IVA" : "sin impuestos"}: ${formatoDinero(resultado.total, config.moneda)}, de ${resultado.dias[0]} a ${resultado.dias[1]} días hábiles.`}
      </p>
      <div className="cot-barra" aria-hidden={notaAbierta}>
        <div>
          <p className="cot-mini">
            {MONEDAS[config.moneda].iva ? "Total con IVA" : "Total sin impuestos"} ·{" "}
            {resultado.dias[0]} a {resultado.dias[1]} días
          </p>
          <p className="cot-barra-total">{formatoDinero(resultado.total, config.moneda)}</p>
        </div>
        <button
          type="button"
          className="cv-boton cv-boton-acento"
          onClick={() => setNotaAbierta(true)}
        >
          Ver detalle
        </button>
      </div>

      {confirmar && (
        <Modal
          title={`Cambiar a ${categoriaPorId(confirmar.categoria)?.nombre.toLowerCase() ?? "personalizado"}`}
          onClose={() => setConfirmar(null)}
          className="cot-dialogo"
        >
          <p>
            «{funcionPorId(confirmar.id).nombre}» no cabe en{" "}
            {categoriaPorId(config.categoria).nombre.toLowerCase()}. Para añadirla, tu proyecto pasa
            a <b>{categoriaPorId(confirmar.categoria ?? "personalizado").nombre.toLowerCase()}</b>,
            y se conserva todo lo que sea compatible.
          </p>
          <div className="cot-acciones">
            <button
              type="button"
              className="cv-boton cv-boton-acento"
              onClick={() => {
                const destino = confirmar.categoria ?? "personalizado"
                const cambio = cambiarCategoria(
                  { ...config, demo: null, version: null, variante: null },
                  destino,
                )
                const r = alternar(cambio.config, confirmar.id)
                setConfirmar(null)
                if (r.config) {
                  setAviso({
                    texto: [
                      `Tu proyecto ahora es ${categoriaPorId(destino).nombre.toLowerCase()}.`,
                      cambio.quitadas.length
                        ? `Se quitó ${nombres(cambio.quitadas)}, que no cabe.`
                        : "",
                      textoCambio(r, "poner"),
                    ]
                      .filter(Boolean)
                      .join(" "),
                    antes: config,
                  })
                  setTachadas([...cambio.quitadas, ...r.quitadas])
                  setConfig(r.config)
                }
              }}
            >
              Cambiar y añadir
            </button>
            <button type="button" className="cv-boton" onClick={() => setConfirmar(null)}>
              Mejor no
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Aviso({ aviso, onDeshacer, onCerrar }) {
  return (
    <div className="cot-aviso" role="status">
      <p>{aviso.texto}</p>
      <div>
        {aviso.antes && (
          <button type="button" onClick={onDeshacer}>
            Deshacer
          </button>
        )}
        <button type="button" onClick={onCerrar} aria-label="Cerrar aviso">
          ×
        </button>
      </div>
    </div>
  )
}

function Categorias({ config, onElegir }) {
  const rangos = useMemo(
    () => Object.fromEntries(CATEGORIAS.map((c) => [c.id, rangoCategoria(c.id, config.moneda)])),
    [config.moneda],
  )
  return (
    <fieldset className="cot-cats">
      <legend className="cot-rot">Tipo de sitio</legend>
      <div className="cot-cats-lista">
        {CATEGORIAS.map((c) => (
          <label key={c.id} className={`cot-cat${config.categoria === c.id ? " on" : ""}`}>
            <input
              type="radio"
              name="categoria"
              value={c.id}
              checked={config.categoria === c.id}
              onChange={() => onElegir(c.id)}
            />
            <span className="cot-cat-nombre">{c.nombre}</span>
            <span className="cot-cat-para">{c.para}</span>
            <span className="cot-cat-precio">
              {c.id === "personalizado"
                ? `desde ${formatoDinero(rangos[c.id].desde, config.moneda)}`
                : `desde ${formatoDinero(rangos[c.id].desde, config.moneda)} · completo ${formatoDinero(rangos[c.id].completo, config.moneda)}`}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

function PasoTipo({ config, onElegir, onDemo }) {
  const disponibles = DEMOS.filter((d) => d.estado === "disponible")
  return (
    <>
      <header className="cot-cabeza">
        <h1 id="cot-titulo" tabIndex={-1}>
          Cotiza tu sitio
        </h1>
        <p className="cot-lead">
          Hago sitios web para negocios: desde una página para que te encuentren hasta tiendas y
          sistemas con cuentas de usuario. Elige un tipo de sitio o parte de una de mis demos; luego
          quita o añade funciones y ve el precio y el plazo al momento.
        </p>
      </header>

      <section aria-labelledby="cot-tipos" className="cot-bloque">
        <h2 id="cot-tipos" className="cot-rot">
          Tipos de sitio
        </h2>
        <div className="cot-tipos">
          {CATEGORIAS.map((c) => (
            <Tipo key={c.id} categoria={c} config={config} onElegir={onElegir} />
          ))}
        </div>
      </section>

      <section aria-labelledby="cot-demos" className="cot-bloque">
        <h2 id="cot-demos" className="cot-rot">
          O parte de una demo
        </h2>
        <ul className="cot-demos">
          {disponibles.map((d) => (
            <li key={d.id}>
              <button type="button" onClick={() => onDemo(d.id)}>
                <span className="cot-demo-nombre">{d.nombre}</span>
                <span className="cot-demo-giro">{d.giro}</span>
              </button>
              <Link to={d.ruta}>Ver la demo</Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cot-siempre" className="cot-bloque">
        <h2 id="cot-siempre" className="cot-rot">
          En todo proyecto, sin costo aparte
        </h2>
        <ul className="cot-lista">
          {NUCLEO_GLOBAL.map((x) => (
            <li key={x}>{x}</li>
          ))}
          <li>Revisiones ilimitadas sobre lo acordado, durante el desarrollo y 30 días después</li>
        </ul>
      </section>
    </>
  )
}

function Tipo({ categoria, config, onElegir }) {
  const ejemplo = categoria.ejemplo ? demoPorId(categoria.ejemplo) : null
  const incluye = FUNCIONES.filter((f) => ["N", "I"].includes(f.estados[categoria.id]))
  const rango = rangoCategoria(categoria.id, config.moneda)
  return (
    <article className={`cot-tipo${config.categoria === categoria.id ? " on" : ""}`}>
      <h3>{categoria.nombre}</h3>
      <p>{categoria.para}</p>
      <p className="cot-tipo-precio">
        desde <b>{formatoDinero(rango.desde, config.moneda)}</b>
        {categoria.id !== "personalizado" && (
          <>
            {" "}
            · completo <b>{formatoDinero(rango.completo, config.moneda)}</b>
          </>
        )}
      </p>
      <details>
        <summary>Qué incluye</summary>
        {incluye.length ? (
          <ul className="cot-lista">
            {incluye.map((f) => (
              <li key={f.id}>
                {f.nombre}
                {f.estados[categoria.id] === "N" ? " (siempre)" : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tú eliges todo, sobre el núcleo que va en cualquier proyecto.</p>
        )}
      </details>
      <div className="cot-tipo-acciones">
        <button
          type="button"
          className="cv-boton cv-boton-acento"
          onClick={() => onElegir(categoria.id, "ajusta")}
        >
          Continuar con {categoria.nombre.toLowerCase()}
        </button>
        {ejemplo && (
          <Link className="cot-enlace" to={ejemplo.ruta}>
            Ver un ejemplo
          </Link>
        )}
      </div>
    </article>
  )
}

function PasoAjusta({ config, resultado, onAlternar, onCantidad, onVersion, onCambiar }) {
  const demo = config.demo ? demoPorId(config.demo) : null
  const variante = demo?.variantes.find((v) => v.id === config.variante)
  const cat = categoriaPorId(config.categoria)
  return (
    <>
      <header className="cot-cabeza">
        <h1 id="cot-titulo" tabIndex={-1}>
          {demo
            ? `Un sitio como la demo ${demo.nombre}${variante ? ` (${variante.nombre})` : ""}`
            : `Tu ${cat.nombre.toLowerCase()}`}
        </h1>
        <p className="cot-lead">
          {demo
            ? `Parte de la versión ${config.version}. Quita lo que no necesites o añade lo que falte: el precio y el plazo cambian al momento.`
            : "Marca lo que quieres en tu sitio. Lo que dice «incluido» va siempre en este tipo de sitio."}
        </p>
        {demo && (
          <div className="cot-versiones" role="group" aria-label="Versión de partida">
            {VERSIONES.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={config.version === v.id}
                onClick={() => onVersion(v.id)}
              >
                {v.nombre}
              </button>
            ))}
          </div>
        )}
      </header>

      {GRUPOS.map((g) => {
        const funciones = FUNCIONES.filter((f) => f.grupo === g.id)
        return (
          <fieldset key={g.id} id={`grupo-${g.id}`} className="cot-grupo">
            <legend className="cot-rot">{g.nombre}</legend>
            {g.id === "ia" && (
              <p className="cot-nota-grupo">
                Se cotizan en la propuesta: dependen de tus datos y de la herramienta que ya uses.
              </p>
            )}
            {funciones.map((f) => (
              <Funcion
                key={f.id}
                funcion={f}
                config={config}
                moneda={resultado.moneda}
                onAlternar={onAlternar}
                onCantidad={onCantidad}
              />
            ))}
          </fieldset>
        )
      })}

      <fieldset className="cot-grupo">
        <legend className="cot-rot">Entrega</legend>
        {resultado.urgencias.map((u) => (
          <label key={u.id} className={`cot-opcion${u.disponible ? "" : " off"}`}>
            <input
              type="radio"
              name="urgencia"
              value={u.id}
              checked={resultado.urgencia.id === u.id}
              disabled={!u.disponible}
              onChange={() => onCambiar({ urgencia: u.id })}
            />
            <span>
              <b>{u.nombre}</b>
              {u.id === "normal"
                ? " · el plazo de la nota"
                : ` · alrededor de ${Math.round((1 - u.plazo) * 100)} % menos tiempo, +${Math.round(u.recargo * 100)} %`}
              {!u.disponible && " · solo para proyectos pequeños"}
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className="cot-grupo">
        <legend className="cot-rot">Mantenimiento al mes</legend>
        {MANTENIMIENTO.map((p) => (
          <label key={p.id} className="cot-opcion">
            <input
              type="radio"
              name="plan"
              value={p.id}
              checked={config.plan === p.id}
              onChange={() => onCambiar({ plan: p.id })}
            />
            <span>
              <b>{p.nombre}</b>
              {p.precio[config.moneda]
                ? ` · ${formatoDinero(p.precio[config.moneda], config.moneda)} + impuestos`
                : ""}
              <span className="cot-opcion-detalle">{p.detalle}</span>
            </span>
          </label>
        ))}
      </fieldset>
    </>
  )
}

function Funcion({ funcion: f, config, moneda, onAlternar, onCantidad }) {
  const id = useId()
  const marcada = Boolean(config.sel[f.id])
  const bloqueo = marcada ? motivoBloqueo(f.id, config) : null
  const cabe = disponible(f, config.categoria)
  const unidad = precioFuncion(f, moneda, 20)
  const precio = f.aparte
    ? "en la propuesta"
    : f.porcentaje
      ? `+${Math.round(f.porcentaje * 100)} %`
      : `${bloqueo ? "" : "+"}${formatoDinero(unidad, moneda)}${f.cantidad ? " c/u" : ""}`
  return (
    <div
      className={`cot-fun${marcada ? " si" : ""}${bloqueo ? " nucleo" : ""}${cabe ? "" : " fuera"}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={marcada}
        disabled={Boolean(bloqueo)}
        onChange={() => onAlternar(f.id)}
        aria-describedby={`${id}-d`}
      />
      <div>
        <label htmlFor={id}>{f.nombre}</label>
        <p id={`${id}-d`}>
          {f.detalle}
          {bloqueo && <span className="cot-fun-nota">{bloqueo}.</span>}
          {!cabe && (
            <span className="cot-fun-nota">
              No cabe en {categoriaPorId(config.categoria).nombre.toLowerCase()}: al marcarla te
              propongo cambiar de tipo.
            </span>
          )}
        </p>
        {marcada && f.cantidad && (
          <label className="cot-cantidad">
            Cantidad
            <input
              type="number"
              min="1"
              max={f.cantidad}
              value={config.sel[f.id]}
              onChange={(e) => onCantidad(f.id, Number(e.target.value))}
            />
          </label>
        )}
      </div>
      <p className="cot-fun-precio">
        {precio}
        {bloqueo && <small>incluido</small>}
      </p>
    </div>
  )
}

function Nota({ config, resultado: r, folio, tachadas, paso, onMoneda, onSiguiente, onCerrar }) {
  const m = r.moneda
  const conIva = MONEDAS[m].iva
  return (
    <div className="cot-nota">
      <div className="cot-nota-cabeza">
        <h2>Tu cotización</h2>
        <button type="button" className="cot-cerrar" onClick={onCerrar} aria-label="Cerrar detalle">
          ×
        </button>
      </div>
      <p className="cot-mini">
        Folio <span className="cot-num">{folio}</span> · {categoriaPorId(config.categoria).nombre}
      </p>
      <fieldset className="cot-moneda">
        <legend className="cv-oculto">Moneda</legend>
        {Object.keys(MONEDAS).map((id) => (
          <label key={id} className={config.moneda === id ? "on" : ""}>
            <input
              type="radio"
              name="moneda"
              value={id}
              checked={config.moneda === id}
              onChange={() => onMoneda(id)}
            />
            {id}
          </label>
        ))}
      </fieldset>
      <ul className="cot-renglones">
        {r.lineas.map((l) => (
          <li key={l.id}>
            <span>
              {funcionPorId(l.id).nombre}
              {l.cantidad > 1 && ` ×${l.cantidad}`}
            </span>
            <span className="cot-num">
              {l.precio == null
                ? "en la propuesta"
                : formatoDinero(l.precio, m).replace(` ${m}`, "")}
            </span>
          </li>
        ))}
        {tachadas
          .filter((id) => !config.sel[id])
          .map((id) => (
            <li key={`x-${id}`} className="tachada">
              <span>
                <s>{funcionPorId(id).nombre}</s>
                <span className="cv-oculto"> (quitada)</span>
              </span>
            </li>
          ))}
        <li>
          <span>Ficha de identidad y pasada de calidad</span>
          <span className="cot-num">{formatoDinero(r.calidad, m).replace(` ${m}`, "")}</span>
        </li>
        {r.minimo > 0 && (
          <li>
            <span>Ajuste al proyecto mínimo</span>
            <span className="cot-num">{formatoDinero(r.minimo, m).replace(` ${m}`, "")}</span>
          </li>
        )}
        {r.recargo > 0 && (
          <li>
            <span>Entrega {r.urgencia.nombre.toLowerCase()}</span>
            <span className="cot-num">{formatoDinero(r.recargo, m).replace(` ${m}`, "")}</span>
          </li>
        )}
        <li>
          <span>Precio de lanzamiento −{Math.round(PARAMETROS.lanzamiento * 100)} %</span>
          <span className="cot-num">{formatoDinero(r.lanzamiento, m).replace(` ${m}`, "")}</span>
        </li>
        {conIva && (
          <li>
            <span>IVA {Math.round(PARAMETROS.iva * 100)} %</span>
            <span className="cot-num">{formatoDinero(r.iva, m).replace(` ${m}`, "")}</span>
          </li>
        )}
      </ul>
      <div className="cot-total">
        <span className="cot-mini">{conIva ? "Total con IVA" : "Total sin impuestos"}</span>
        <span className="cot-total-cifra cot-num">{formatoDinero(r.total, m)}</span>
      </div>
      <p className="cot-mini">
        De {r.dias[0]} a {r.dias[1]} días hábiles ({r.horas[0]} a {r.horas[1]} h) desde el anticipo
        y tus materiales. Anticipo del {Math.round(PARAMETROS.anticipo * 100)} %:{" "}
        {formatoDinero(r.anticipo, m)}.
      </p>
      {r.aparte.length > 0 && <p className="cot-mini">Lo de IA se suma en la propuesta.</p>}
      {r.plan.id !== "ninguno" && (
        <p className="cot-mini">
          Mantenimiento {r.plan.nombre}: {formatoDinero(r.mensualidad, m)} al mes
          {conIva ? " con IVA" : ""}, aparte.
        </p>
      )}
      {!conIva && <p className="cot-mini">Precio sin impuestos; se confirman en la propuesta.</p>}
      {paso !== "envia" && (
        <button
          type="button"
          className="cv-boton cv-boton-acento cot-siguiente"
          onClick={onSiguiente}
        >
          {paso === "tipo" ? "Ajustar funciones" : "Revisar y enviar"}
        </button>
      )}
      <p className="cot-mini">
        Precio orientativo, vale {PARAMETROS.vigencia} días. Esto no genera ningún cobro.
      </p>
    </div>
  )
}

function PasoEnvia({ config, resultado, folio }) {
  const [cliente, setCliente] = useState({
    nombre: "",
    negocio: "",
    factura: "no",
    comentarios: "",
  })
  const [estado, setEstado] = useState("inicial")
  const [copiado, setCopiado] = useState(false)
  const [error, setError] = useState("")
  const solicitud = {
    folio,
    config,
    resultado,
    cliente,
    origen: typeof window === "undefined" ? "" : window.location.origin,
  }
  const campo = (k) => ({
    value: cliente[k],
    onChange: (e) => setCliente({ ...cliente, [k]: e.target.value }),
  })
  const enviar = (canal) => {
    if (!cliente.nombre.trim()) {
      setError("Escribe tu nombre para que sepa a quién responder.")
      document.getElementById("cot-nombre")?.focus()
      return
    }
    setError("")
    window.open(
      enviarSolicitud(solicitud, canal),
      canal === "correo" ? "_self" : "_blank",
      "noopener",
    )
    setEstado(canal)
  }
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoSolicitud(solicitud))
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }
  return (
    <>
      <header className="cot-cabeza">
        <h1 id="cot-titulo" tabIndex={-1}>
          Revisa y envía
        </h1>
        <p className="cot-lead">
          Tu cotización {folio} queda lista para enviármela por WhatsApp o por correo, desde tu
          propio teléfono o correo. Revisaré tu solicitud y te enviaré una propuesta confirmada.
        </p>
      </header>
      {estado === "inicial" ? (
        <form className="cot-form" onSubmit={(e) => e.preventDefault()} noValidate>
          <label>
            Tu nombre
            <input
              id="cot-nombre"
              autoComplete="name"
              required
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "cot-error" : undefined}
              {...campo("nombre")}
            />
          </label>
          {error && (
            <p id="cot-error" className="cot-error">
              {error}
            </p>
          )}
          <label>
            <span>
              Tu negocio <span className="cot-mini">(opcional)</span>
            </span>
            <input autoComplete="organization" {...campo("negocio")} />
          </label>
          <fieldset>
            <legend>¿Necesitas factura?</legend>
            {Object.entries(FACTURA).map(([id, texto]) => (
              <label key={id} className="cot-opcion">
                <input
                  type="radio"
                  name="factura"
                  value={id}
                  checked={cliente.factura === id}
                  onChange={() => setCliente({ ...cliente, factura: id })}
                />
                <span>{texto}</span>
              </label>
            ))}
            {cliente.factura === "empresa" && (
              <p className="cot-mini">
                Con empresas, la propuesta incluye las retenciones que correspondan, el contrato y
                las condiciones de pago.
              </p>
            )}
          </fieldset>
          <label>
            <span>
              Comentarios o cambios especiales <span className="cot-mini">(opcional)</span>
            </span>
            <textarea rows="4" {...campo("comentarios")} />
          </label>
          <p className="cot-mini">
            Tus datos solo viajan en el mensaje que tú envías; este sitio no los guarda.
          </p>
          <div className="cot-acciones">
            <button
              type="button"
              className="cv-boton cv-boton-acento"
              onClick={() => enviar("whatsapp")}
            >
              Enviar por WhatsApp
            </button>
            <button type="button" className="cv-boton" onClick={() => enviar("correo")}>
              Enviar por correo
            </button>
          </div>
          <p className="cot-mini">Esto no genera ningún cobro.</p>
        </form>
      ) : (
        <div className="cot-listo" role="status">
          <h2>
            Se abrió {estado === "correo" ? "tu correo" : "WhatsApp"} con tu cotización {folio}
          </h2>
          <p>
            Solo falta que lo envíes. Si no se abrió, copia el texto y mándalo a {CORREO} o por
            WhatsApp al +52 228 162 8345.
          </p>
          <div className="cot-acciones">
            <button type="button" className="cv-boton cv-boton-acento" onClick={copiar}>
              {copiado ? "Texto copiado" : "Copiar el texto"}
            </button>
            <button type="button" className="cv-boton" onClick={() => setEstado("inicial")}>
              Volver a la solicitud
            </button>
            <Link className="cot-enlace" to="/">
              Volver al CV y las demos
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
