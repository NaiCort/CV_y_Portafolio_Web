import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import ConsultaAuto from "../components/ConsultaAuto"
import { CONTRATO_EJEMPLO, NIVELES_PARTIDA, findServicio } from "../data/talleres"
import { ETAPAS, buscarOrden } from "../lib/consulta"
import { precioTexto } from "../lib/formato"
import {
  aumentoHallazgo,
  autorizables,
  avanzarReparacion,
  cargarOrden,
  decidirHallazgo,
  entregaTexto,
  enviarVistoBueno,
  estadoInicial,
  garantiaHasta,
  guardarOrden,
  piezasCambiadas,
  totales,
} from "../lib/orden"

const fecha = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric" })
const storage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function Etapas({ etapa }) {
  const actual = ETAPAS.findIndex((e) => e.id === etapa)
  return (
    <ol className="t-etapas t-etapas-fila" aria-label="Etapas de la orden">
      {ETAPAS.map((e, i) => (
        <li
          key={e.id}
          className={i < actual ? "is-hecha" : i === actual ? "is-actual" : undefined}
          aria-current={i === actual ? "step" : undefined}
        >
          <b>{e.nombre}</b>
          <span>{e.detalle}</span>
        </li>
      ))}
    </ol>
  )
}

function Medida({ medida }) {
  return (
    <div className="t-medida">
      <span>
        {medida.etiqueta}: <b className="t-num">{medida.valor}</b> ({medida.referencia})
      </span>
      <span className="t-medida-barra" aria-hidden="true">
        <i style={{ width: `${Math.round(medida.nivel * 100)}%` }} />
      </span>
    </div>
  )
}

function Desglose({ partida }) {
  return (
    <p className="t-desglose t-num">
      Refacción {precioTexto(partida.refaccion)} · Mano de obra {precioTexto(partida.manoObra)}
    </p>
  )
}

function Decision({ nombre, valor, onCambiar, disabled, etiquetaSi = "Autorizar" }) {
  return (
    <fieldset className="t-decision" disabled={disabled}>
      <legend className="t-oculto">{nombre}</legend>
      <label className={valor === "si" ? "is-on" : undefined}>
        <input
          type="radio"
          name={nombre}
          checked={valor === "si"}
          onChange={() => onCambiar("si")}
        />
        {etiquetaSi}
      </label>
      <label className={valor === "no" ? "is-on" : undefined}>
        <input
          type="radio"
          name={nombre}
          checked={valor === "no"}
          onChange={() => onCambiar("no")}
        />
        No por ahora
      </label>
    </fieldset>
  )
}

function Comprobante({ taller, estado }) {
  const t = totales(taller, estado)
  return (
    <table className="t-comprobante">
      <caption>Comprobante de ejemplo · desglose con IVA incluido</caption>
      <thead>
        <tr>
          <th scope="col">Concepto</th>
          <th scope="col">Refacción</th>
          <th scope="col">Mano de obra</th>
          <th scope="col">Importe</th>
        </tr>
      </thead>
      <tbody>
        {t.soloDiagnostico ? (
          <tr>
            <th scope="row">{findServicio(taller, "diagnostico").nombre}</th>
            <td className="t-num">—</td>
            <td className="t-num">{precioTexto(t.diagnostico)}</td>
            <td className="t-num">{precioTexto(t.diagnostico)}</td>
          </tr>
        ) : (
          t.partidas.map((p) => (
            <tr key={p.id}>
              <th scope="row">{p.texto}</th>
              <td className="t-num">{precioTexto(p.refaccion)}</td>
              <td className="t-num">{precioTexto(p.manoObra)}</td>
              <td className="t-num">{precioTexto(p.precio)}</td>
            </tr>
          ))
        )}
      </tbody>
      <tfoot>
        {!t.soloDiagnostico && (
          <tr>
            <th scope="row">Diagnóstico</th>
            <td colSpan={3} className="t-num">
              Descontado al hacer la reparación
            </td>
          </tr>
        )}
        <tr>
          <th scope="row">IVA incluido</th>
          <td colSpan={3} className="t-num">
            {precioTexto(t.iva)}
          </td>
        </tr>
        <tr className="t-comprobante-total">
          <th scope="row">Total</th>
          <td colSpan={3} className="t-num">
            {precioTexto(t.total)}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

function Orden({ taller }) {
  const orden = taller.orden
  const [estado, setEstado] = useState(() => cargarOrden(storage(), taller.id))
  const [procesando, setProcesando] = useState(false)
  const [faltan, setFaltan] = useState(null)
  const timer = useRef(null)
  const panel = useRef(null)
  const primero = useRef(true)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => guardarOrden(storage(), taller.id, estado), [estado, taller.id])
  useEffect(() => {
    if (primero.current) {
      primero.current = false
      return
    }
    panel.current?.focus()
  }, [estado.etapa, estado.avance])

  const decidir = (id, valor) => {
    setFaltan(null)
    setEstado((e) => ({ ...e, decisiones: { ...e.decisiones, [id]: valor } }))
  }
  const enviar = (ev) => {
    ev.preventDefault()
    if (procesando) return
    const sinDecidir = autorizables(orden).filter((p) => !estado.decisiones[p.id])
    if (sinDecidir.length || !estado.firma.trim()) {
      setFaltan(
        sinDecidir.length
          ? `Falta decidir: ${sinDecidir.map((p) => p.texto.toLowerCase()).join(" y ")}.`
          : "Escribe tu nombre como firma.",
      )
      return
    }
    setProcesando(true)
    timer.current = setTimeout(() => {
      setProcesando(false)
      setEstado((e) => enviarVistoBueno(orden, e))
    }, 800)
  }
  const reiniciar = () => {
    setFaltan(null)
    setEstado(estadoInicial())
  }
  const t = totales(taller, estado)
  const diagnostico = findServicio(taller, "diagnostico")
  const enVistoBueno = estado.etapa === "visto-bueno"

  return (
    <>
      <div className="t-orden-cabecera">
        <p>
          Folio <span className="t-dato">{orden.folio}</span> · {orden.vehiculo} · Placas{" "}
          <span className="t-dato">{orden.placas}</span>
        </p>
        <p>
          Recibido: {orden.recibido} · {orden.responsable}
        </p>
      </div>
      <Etapas etapa={estado.etapa} />

      <section className="t-presu" aria-labelledby="t-presu-titulo">
        <h2 id="t-presu-titulo">Lo que encontramos</h2>
        <ul className="t-presu-lista">
          {orden.partidas.map((p) => (
            <li key={p.id} className={`t-presu-partida t-nivel-${p.nivel}`}>
              <div className="t-presu-cab">
                <i className="t-punto" aria-hidden="true" />
                <h3>{p.texto}</h3>
                <span className="t-presu-nivel">{NIVELES_PARTIDA[p.nivel]}</span>
                {p.precio ? <b className="t-num">{precioTexto(p.precio)}</b> : null}
              </div>
              <p>{p.porQue}</p>
              {p.medida && <Medida medida={p.medida} />}
              {p.precio ? (
                <>
                  <Desglose partida={p} />
                  <Decision
                    nombre={`Decisión sobre ${p.texto.toLowerCase()}`}
                    valor={estado.decisiones[p.id]}
                    onCambiar={(v) => decidir(p.id, v)}
                    disabled={!enVistoBueno || procesando}
                  />
                </>
              ) : (
                <p className="t-nota">Sin costo: solo se revisó.</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="t-presu-panel" ref={panel} tabIndex={-1} aria-live="polite">
        {enVistoBueno && (
          <form className="t-firma" onSubmit={enviar} noValidate>
            <h2>Tu visto bueno</h2>
            <dl className="t-resumen">
              <div>
                <dt>Autorizado hasta ahora</dt>
                <dd className="t-num">
                  {t.soloDiagnostico
                    ? `Nada: pagarías solo el diagnóstico, ${precioTexto(t.diagnostico)}`
                    : `${precioTexto(t.total)} (IVA incluido; el diagnóstico de ${precioTexto(diagnostico.precio)} se descuenta)`}
                </dd>
              </div>
              {!t.soloDiagnostico && (
                <div>
                  <dt>Entrega estimada</dt>
                  <dd>{entregaTexto(orden, estado)}</dd>
                </div>
              )}
            </dl>
            <div className="t-campo">
              <label htmlFor="t-firma">Escribe tu nombre como firma</label>
              <input
                id="t-firma"
                value={estado.firma}
                onChange={(e) => {
                  setFaltan(null)
                  setEstado((x) => ({ ...x, firma: e.target.value }))
                }}
                autoComplete="off"
                aria-describedby="t-firma-ayuda"
              />
              <span className="t-campo-ayuda" id="t-firma-ayuda">
                Firma simulada: no se guarda en ningún servidor. Refacciones nuevas; si algo más
                aparece durante el trabajo, te preguntamos antes.
              </span>
            </div>
            {faltan && (
              <p className="t-campo-error" role="alert">
                {faltan}
              </p>
            )}
            <button type="submit" className="t-btn t-btn-p" disabled={procesando}>
              {procesando ? "Enviando tu visto bueno…" : "Enviar mi visto bueno"}
            </button>
          </form>
        )}

        {estado.etapa === "reparacion" && (
          <div className="t-reparacion">
            <h2>En reparación</h2>
            <p>
              Trabajando solo en lo que autorizaste:{" "}
              {t.partidas.map((p) => p.texto.toLowerCase()).join(", ")}. Entrega estimada:{" "}
              {entregaTexto(orden, estado)}.
            </p>
            {estado.avance === 0 && (
              <button
                type="button"
                className="t-btn t-btn-p"
                onClick={() => setEstado(avanzarReparacion)}
              >
                Avanzar la simulación
              </button>
            )}
            {estado.avance === 1 && (
              <div className="t-hallazgo">
                <h3>Encontramos algo más: {orden.hallazgo.texto.toLowerCase()}</h3>
                <p>{orden.hallazgo.porQue}</p>
                <p className="t-num">
                  {precioTexto(orden.hallazgo.precio)} · sube el total{" "}
                  {Math.round(aumentoHallazgo(orden, estado) * 100)} %.
                </p>
                <Desglose partida={orden.hallazgo} />
                <p className="t-nota">
                  No lo hacemos sin tu autorización. La ley la pide por escrito cuando el total sube
                  más de 20 %; nosotros la pedimos siempre.
                </p>
                <Decision
                  nombre="Decisión sobre el hallazgo"
                  valor={estado.hallazgo}
                  onCambiar={(v) => setEstado((e) => decidirHallazgo(e, v))}
                />
                <button
                  type="button"
                  className="t-btn t-btn-p"
                  disabled={!estado.hallazgo}
                  onClick={() => setEstado(avanzarReparacion)}
                >
                  Terminar la reparación
                </button>
              </div>
            )}
          </div>
        )}

        {estado.etapa === "listo" && (
          <div className="t-entrega">
            <h2>{t.soloDiagnostico ? "Listo para recoger" : "Listo para entregar"}</h2>
            {t.soloDiagnostico ? (
              <p>
                No autorizaste reparaciones: pagas solo el diagnóstico y el auto sale como llegó. Te
                damos el diagnóstico por escrito por si quieres repararlo después.
              </p>
            ) : (
              <p>
                Se hizo solo lo que autorizaste. Prueba de manejo hecha por{" "}
                {orden.responsable.split(",")[0]}.
              </p>
            )}
            <Comprobante taller={taller} estado={estado} />
            {!t.soloDiagnostico && (
              <>
                <h3>Piezas cambiadas</h3>
                <ul className="t-ficha-extras">
                  {piezasCambiadas(orden, estado).map((p) => (
                    <li key={p.pieza}>
                      <b>{p.pieza}.</b> {p.nota}
                    </li>
                  ))}
                </ul>
                <p>
                  <b>Garantía:</b> {taller.garantia} en mano de obra, hasta el{" "}
                  {fecha.format(garantiaHasta(taller.id))}; las refacciones llevan la garantía de su
                  fabricante.
                </p>
              </>
            )}
            <p className="t-nota">
              Recógelo dentro de 48 horas; después se cobra depósito, como dice el contrato
              registrado ante Profeco ({CONTRATO_EJEMPLO}, de ejemplo).
            </p>
          </div>
        )}
      </div>

      <div className="t-acciones t-consulta-salida">
        <button type="button" className="t-btn t-btn-s" onClick={reiniciar}>
          Reiniciar la orden de ejemplo
        </button>
        <Link className="t-btn t-btn-s" to="/taller">
          Volver al inicio
        </Link>
      </div>
    </>
  )
}

// Consulta tu auto: folio y placas abren la orden con su presupuesto por partida.
export default function Consulta({ taller }) {
  const [params, setParams] = useSearchParams()
  const acceso = buscarOrden(taller.orden, params.get("folio"), params.get("placas"))
  const abierta = acceso.estado === "encontrada"
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-cita-cab">
        <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
          Consulta tu auto
        </h1>
        <p className="t-bajada">
          {taller.id === "rosales"
            ? "Con el folio de tu orden y tus placas ves en qué va y das tu visto bueno a cada partida, sin cuenta."
            : "Ve el diagnóstico de tu auto y autoriza cada partida desde tu teléfono."}
        </p>
      </div>
      {abierta ? (
        <Orden taller={taller} />
      ) : (
        <div className="t-consulta-bloque">
          <h2 className="t-consulta-h2">Escribe el folio y las placas</h2>
          <ConsultaAuto
            orden={taller.orden}
            onEncontrada={({ folio, placas }) => setParams({ folio, placas })}
          />
        </div>
      )}
    </section>
  )
}
