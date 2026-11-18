import { useEffect, useReducer, useRef, useState } from "react"
import Modal from "../../../components/shared/Modal"
import { precioTexto } from "../lib/formato"
import {
  DOCUMENTOS,
  PERFIL,
  PREVIO,
  SOLICITUDES,
  cargar,
  guardar,
  reducir,
  semaforo,
  totalIsr,
  totalIva,
  totalPrevio,
} from "../lib/expediente"

const NIVEL = { ok: "Al día", ojo: "Atención", mal: "Urgente" }
const storage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}
const firma = (n) => (n < 0 ? `−${precioTexto(-n)}` : precioTexto(n))
const peso = (b) =>
  b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} kB` : `${(b / 1048576).toFixed(1)} MB`

function Entrar({ onEntrar }) {
  const [abriendo, setAbriendo] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <div className="d-entrar">
      <h2>Se abre con un enlace, sin contraseña</h2>
      <p>
        Cada mes te mandamos por WhatsApp un enlace a tu expediente. No tienes que recordar otra
        contraseña y nunca te pedimos tu e.firma ni tu contraseña del SAT.
      </p>
      <p className="d-nota">
        En esta demo abres el expediente de ejemplo de Mariana, una clienta inventada. Lo que hagas
        se guarda solo en este navegador.
      </p>
      <button
        type="button"
        className="d-btn d-btn-p"
        disabled={abriendo}
        onClick={() => {
          setAbriendo(true)
          timer.current = setTimeout(onEntrar, 600)
        }}
      >
        {abriendo ? "Abriendo…" : "Abrir el expediente de ejemplo"}
      </button>
    </div>
  )
}

function Previo({ e, dispatch }) {
  const [escribiendo, setEscribiendo] = useState(false)
  const [texto, setTexto] = useState("")
  const [presentando, setPresentando] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const filas = (lista) =>
    lista.map(([n, v]) => (
      <div key={n}>
        <dt>{n}</dt>
        <dd className="d-num">{firma(v)}</dd>
      </div>
    ))
  return (
    <section className="d-previo" aria-labelledby="d-previo-titulo">
      <div className="d-previo-cab">
        <h2 id="d-previo-titulo">Previo de {PREVIO.mes}</h2>
        <span>Vence el {PREVIO.vence}</span>
      </div>
      <dl className="d-calc-resultado">
        {filas(PREVIO.isr)}
        <div className="d-calc-total">
          <dt>ISR a pagar</dt>
          <dd className="d-num">{precioTexto(totalIsr)}</dd>
        </div>
        {filas(PREVIO.iva)}
        <div className="d-calc-total">
          <dt>IVA a pagar</dt>
          <dd className="d-num">{precioTexto(totalIva)}</dd>
        </div>
        <div className="d-calc-total d-previo-total">
          <dt>Total a pagar</dt>
          <dd className="d-num">{precioTexto(totalPrevio)}</dd>
        </div>
      </dl>
      <div className="d-previo-acciones" aria-live="polite">
        {e.previo === "pendiente" && !escribiendo && (
          <>
            <button
              type="button"
              className="d-btn d-btn-p"
              onClick={() => dispatch({ type: "aprobar" })}
            >
              Aprobar el previo
            </button>
            <button type="button" className="d-btn" onClick={() => setEscribiendo(true)}>
              Tengo una duda
            </button>
          </>
        )}
        {e.previo === "pendiente" && escribiendo && (
          <form
            className="d-duda"
            onSubmit={(ev) => {
              ev.preventDefault()
              if (!texto.trim()) return
              dispatch({ type: "duda", texto })
              setEscribiendo(false)
            }}
          >
            <div className="d-campo">
              <label htmlFor="d-duda">¿Qué no te cuadra?</label>
              <textarea
                id="d-duda"
                rows={3}
                value={texto}
                onChange={(x) => setTexto(x.target.value)}
              />
            </div>
            <div className="d-acciones">
              <button type="submit" className="d-btn d-btn-p" disabled={!texto.trim()}>
                Enviar a Elena
              </button>
              <button type="button" className="d-btn" onClick={() => setEscribiendo(false)}>
                Cancelar
              </button>
            </div>
          </form>
        )}
        {e.previo === "duda" && (
          <div className="d-respuesta">
            <p>
              <b>Tú:</b> {e.duda}
            </p>
            <p>
              <b>Elena:</b> El IVA es bajo porque este mes compraste equipo con factura; ese IVA se
              resta del que cobraste. Si te parece bien, apruébalo y lo presentamos.
            </p>
            <p className="d-nota">Respuesta de ejemplo; no se envió ningún mensaje.</p>
            <button
              type="button"
              className="d-btn d-btn-p"
              onClick={() => dispatch({ type: "aprobar" })}
            >
              Aprobar el previo
            </button>
          </div>
        )}
        {e.previo === "aprobado" && (
          <>
            <p>Aprobado. Lo presentamos antes del 17 y te dejamos el acuse aquí.</p>
            <button
              type="button"
              className="d-btn"
              disabled={presentando}
              onClick={() => {
                setPresentando(true)
                timer.current = setTimeout(() => dispatch({ type: "presentar" }), 800)
              }}
            >
              {presentando ? "Presentando…" : "Simular la presentación"}
            </button>
          </>
        )}
        {e.previo === "presentado" && (
          <p>
            Presentada. Línea de captura de ejemplo:{" "}
            <span className="d-num">0426 1117 8830 2214</span>. El acuse ya está en tus documentos.
          </p>
        )}
      </div>
    </section>
  )
}

function Solicitudes({ e, dispatch }) {
  return (
    <section className="d-solicitudes" aria-labelledby="d-sol-titulo">
      <h2 id="d-sol-titulo">Te pedimos</h2>
      <ul>
        {SOLICITUDES.map((s) => {
          const r = e.solicitudes[s.id]
          return (
            <li key={s.id} className={r ? "is-lista" : undefined}>
              <div>
                <b>{s.nombre}</b>
                <span>{s.porque}</span>
                <span className="d-limite">Antes del {s.limite}</span>
              </div>
              {r ? (
                <div className="d-sol-hecha" aria-live="polite">
                  <span>
                    {r.estado === "recibido"
                      ? `Recibido: ${r.archivo.nombre} (${r.archivo.peso})`
                      : "Le avisamos a Elena que no lo tienes."}
                  </span>
                  <button
                    type="button"
                    className="d-inline"
                    onClick={() => dispatch({ type: "deshacer-solicitud", id: s.id })}
                  >
                    Cambiar
                  </button>
                </div>
              ) : (
                <div className="d-sol-acciones">
                  <label className="d-btn d-btn-p d-subir">
                    Subir archivo
                    <input
                      type="file"
                      className="d-oculto"
                      onChange={(ev) => {
                        const f = ev.target.files?.[0]
                        if (f)
                          dispatch({
                            type: "subir",
                            id: s.id,
                            archivo: { nombre: f.name, peso: peso(f.size) },
                          })
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="d-inline"
                    onClick={() => dispatch({ type: "no-tengo", id: s.id })}
                  >
                    No lo tengo
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      <p className="d-nota">
        El archivo no sale de tu navegador: la demo solo anota su nombre y su tamaño.
      </p>
    </section>
  )
}

function Documentos({ e }) {
  const [abierto, setAbierto] = useState(null)
  const docs =
    e.previo === "presentado"
      ? [
          {
            id: "acuse-noviembre",
            nombre: "Acuse de la declaración de noviembre",
            fecha: "hoy",
            detalle: `ISR ${precioTexto(totalIsr)} e IVA ${precioTexto(totalIva)}. Línea de captura de ejemplo.`,
          },
          ...DOCUMENTOS,
        ]
      : DOCUMENTOS
  return (
    <section className="d-documentos" aria-labelledby="d-docs-titulo">
      <h2 id="d-docs-titulo">Tus documentos</h2>
      <ul>
        {docs.map((d) => (
          <li key={d.id}>
            <div>
              <b>{d.nombre}</b>
              <span>{d.fecha}</span>
            </div>
            <button type="button" className="d-inline" onClick={() => setAbierto(d)}>
              Ver<span className="d-oculto"> {d.nombre}</span>
            </button>
          </li>
        ))}
      </ul>
      {abierto && (
        <Modal
          title={abierto.nombre}
          onClose={() => setAbierto(null)}
          className="d-modal"
          radius={14}
        >
          <p className="d-modal-texto">{abierto.detalle}</p>
          <p className="d-modal-texto">
            Documento de ejemplo de {PERFIL.nombre}: en un despacho real verías el PDF del SAT.
          </p>
          <button type="button" className="d-btn d-btn-p" onClick={() => setAbierto(null)}>
            Cerrar
          </button>
        </Modal>
      )}
    </section>
  )
}

// Tu expediente: semáforo, previo para aprobar, lo que el despacho pide y documentos.
export default function ExpedientePagina({ onWhatsApp }) {
  const [e, dispatch] = useReducer(reducir, undefined, () => cargar(storage()))
  const cabeza = useRef(null)
  const primero = useRef(true)
  useEffect(() => guardar(storage(), e), [e])
  useEffect(() => {
    if (primero.current) {
      primero.current = false
      return
    }
    cabeza.current?.focus()
  }, [e.sesion])
  return (
    <section className="d-wrap d-sec d-pagina" aria-labelledby="d-titulo">
      <h1 id="d-titulo" tabIndex={-1}>
        Tu expediente
      </h1>
      <p className="d-bajada">
        Cómo vas con el SAT, el previo del mes para aprobar y lo que te pedimos, en un solo lugar.
        Para todo lo demás, WhatsApp.
      </p>
      {!e.sesion ? (
        <Entrar onEntrar={() => dispatch({ type: "entrar" })} />
      ) : (
        <div className="d-panel">
          <div className="d-panel-cab">
            <h2 ref={cabeza} tabIndex={-1}>
              Hola, {PERFIL.nombre.split(" ")[0]}
            </h2>
            <span>
              {PERFIL.regimen} · {PERFIL.actividad}
            </span>
          </div>
          <ul className="d-semaforo d-semaforo-panel" aria-label="Tu situación">
            {semaforo(e).map(([nivel, nombre, detalle]) => (
              <li key={nombre} className={`d-nivel-${nivel}`}>
                <i aria-hidden="true" />
                <b>{nombre}</b>
                <span>
                  <span className="d-oculto">{NIVEL[nivel]}: </span>
                  {detalle}
                </span>
              </li>
            ))}
          </ul>
          {!e.buzon && (
            <div className="d-pide d-buzon">
              <p>
                <b>Buzón tributario:</b> el SAT te mandó un código a tu correo. Confírmalo en el
                portal del SAT; sin eso, tu opinión de cumplimiento sale negativa.
              </p>
              <button type="button" className="d-btn" onClick={() => dispatch({ type: "buzon" })}>
                Ya lo confirmé
              </button>
            </div>
          )}
          <div className="d-panel-grid">
            <Previo e={e} dispatch={dispatch} />
            <div className="d-panel-col">
              <Solicitudes e={e} dispatch={dispatch} />
              <Documentos e={e} />
            </div>
          </div>
          <div className="d-acciones">
            <button type="button" className="d-btn" onClick={onWhatsApp}>
              Escribir a Elena por WhatsApp
            </button>
            <button
              type="button"
              className="d-inline"
              onClick={() => dispatch({ type: "reiniciar" })}
            >
              Reiniciar el ejemplo
            </button>
            <button type="button" className="d-inline" onClick={() => dispatch({ type: "salir" })}>
              Salir
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
