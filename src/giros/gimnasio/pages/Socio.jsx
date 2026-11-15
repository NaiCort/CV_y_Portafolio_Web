import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Modal from "../../../components/shared/Modal"
import PaseQR from "../components/PaseQR"
import MisReservas from "../components/MisReservas"
import { CREDENCIALES, SOCIO } from "../data/socio"
import { PLANES } from "../data/planes"
import { SUCURSALES, findSucursal } from "../data/sucursales"
import { INVITADOS_POR_PLAN, invitadosDelMes, renovacionDe } from "../lib/socio"

const pesos = (n) => `$${n.toLocaleString("en-US")}`
const fecha = (f, opciones = { day: "numeric", month: "long" }) =>
  new Date(f).toLocaleDateString("es-MX", opciones)
const DIAS = ["L", "M", "M", "J", "V", "S", "D"]

function Entrar({ onEntrar, onPrivacidad }) {
  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const enviar = (e) => {
    e.preventDefault()
    if (correo.trim().toLowerCase() !== CREDENCIALES.correo || clave !== CREDENCIALES.clave) {
      setError("En esta demo solo existe el perfil de ejemplo. Usa los datos de abajo.")
      return
    }
    setError("")
    setEnviando(true)
    timer.current = setTimeout(onEntrar, 700)
  }
  return (
    <section className="b-wrap b-entrar" aria-labelledby="b-titulo">
      <h1 id="b-titulo" tabIndex={-1} className="b-d b-media">
        Área de socio
      </h1>
      <p className="b-lead">
        Entra con el perfil de ejemplo para ver lo que ve un socio de Brío. Sus datos son
        inventados.
      </p>
      <form className="b-entrar-form" onSubmit={enviar} noValidate>
        <fieldset disabled={enviando} className="b-alta-campos">
          <div className="b-campo-alta">
            <label htmlFor="b-entrar-correo">Correo</label>
            <input
              id="b-entrar-correo"
              name="correo"
              type="email"
              autoComplete="username"
              spellCheck={false}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "b-entrar-error" : undefined}
            />
          </div>
          <div className="b-campo-alta">
            <label htmlFor="b-entrar-clave">Contraseña</label>
            <input
              id="b-entrar-clave"
              name="clave"
              type="password"
              autoComplete="current-password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "b-entrar-error" : undefined}
            />
          </div>
          {error && (
            <p id="b-entrar-error" className="b-error" role="alert">
              {error}
            </p>
          )}
          <div className="b-acciones">
            <button type="submit" className="b-btn b-btn-p">
              {enviando ? "Entrando…" : "Entrar"}
            </button>
            <button
              type="button"
              className="b-btn"
              onClick={() => {
                setCorreo(CREDENCIALES.correo)
                setClave(CREDENCIALES.clave)
                setError("")
              }}
            >
              Usar el perfil de ejemplo
            </button>
          </div>
        </fieldset>
      </form>
      <p className="b-nota">
        Perfil de ejemplo: {CREDENCIALES.correo} · contraseña {CREDENCIALES.clave}. No es una cuenta
        real. La sesión se guarda en este navegador.{" "}
        <button type="button" className="b-inline" onClick={onPrivacidad}>
          Aviso de privacidad
        </button>
      </p>
    </section>
  )
}

function Composicion() {
  const m = SOCIO.mediciones
  const W = 560
  const H = 200
  const x = (i) => 40 + (i * (W - 80)) / (m.length - 1)
  const escala = (v, min, max) => H - 30 - ((v - min) / (max - min)) * (H - 60)
  const linea = (campo, min, max) =>
    m.map((p, i) => `${i ? "L" : "M"}${x(i)} ${escala(p[campo], min, max)}`).join("")
  const primera = m[0]
  const ultima = m.at(-1)
  return (
    <section className="b-socio-tarjeta b-composicion" aria-labelledby="b-comp-titulo">
      <h2 id="b-comp-titulo">Composición corporal</h2>
      <p className="b-nota">
        Mediciones de ejemplo con la báscula del club, cada 8 semanas. Desde mayo: músculo{" "}
        <b className="b-num">+{(ultima.musculo - primera.musculo).toFixed(1)} kg</b>, grasa{" "}
        <b className="b-num">{(ultima.grasa - primera.grasa).toFixed(1)} %</b>.
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="b-grafica"
        role="img"
        aria-label={`Músculo de ${primera.musculo} a ${ultima.musculo} kilos; grasa de ${primera.grasa} a ${ultima.grasa} por ciento, de mayo a octubre.`}
      >
        <path d={linea("musculo", 23.5, 26)} className="b-linea-musculo" />
        <path d={linea("grasa", 26.5, 32)} className="b-linea-grasa" />
        {m.map((p, i) => (
          <g key={p.fecha}>
            <circle cx={x(i)} cy={escala(p.musculo, 23.5, 26)} r="5" className="b-punto-musculo" />
            <circle cx={x(i)} cy={escala(p.grasa, 26.5, 32)} r="5" className="b-punto-grasa" />
            <text x={x(i)} y={H - 6} textAnchor="middle" className="b-grafica-eje">
              {fecha(p.fecha, { month: "short" })}
            </text>
          </g>
        ))}
      </svg>
      <ul className="b-leyenda">
        <li>
          <i className="b-punto-musculo" aria-hidden="true" /> Músculo, kg
        </li>
        <li>
          <i className="b-punto-grasa" aria-hidden="true" /> Grasa, %
        </li>
      </ul>
      <table className="b-tabla-mediciones">
        <caption className="b-oculto">Mediciones de composición corporal</caption>
        <thead>
          <tr>
            <th scope="col">Fecha</th>
            <th scope="col">Peso</th>
            <th scope="col">Músculo</th>
            <th scope="col">Grasa</th>
            <th scope="col">Visceral</th>
          </tr>
        </thead>
        <tbody>
          {[...m].reverse().map((p) => (
            <tr key={p.fecha}>
              <th scope="row">{fecha(p.fecha, { day: "numeric", month: "short" })}</th>
              <td className="b-num">{p.peso.toFixed(1)} kg</td>
              <td className="b-num">{p.musculo.toFixed(1)} kg</td>
              <td className="b-num">{p.grasa.toFixed(1)} %</td>
              <td className="b-num">{p.visceral}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function Reloj({ conectado, onCambiar }) {
  const [abierto, setAbierto] = useState(false)
  const titulo = useRef(null)
  const primera = useRef(true)
  // Al conectar o desconectar, el botón usado desaparece: el foco va al título de la tarjeta.
  useEffect(() => {
    if (primera.current) {
      primera.current = false
      return
    }
    titulo.current?.focus({ preventScroll: true })
  }, [conectado])
  const r = SOCIO.reloj
  return (
    <section className="b-socio-tarjeta" aria-labelledby="b-reloj-titulo">
      <h2 id="b-reloj-titulo" tabIndex={-1} ref={titulo}>
        Tu reloj
      </h2>
      {conectado ? (
        <>
          <dl className="b-reloj-datos">
            <div>
              <dt>Pasos hoy</dt>
              <dd className="b-num">{r.pasos.toLocaleString("en-US")}</dd>
            </div>
            <div>
              <dt>Calorías activas</dt>
              <dd className="b-num">{r.kcalActivas}</dd>
            </div>
            <div>
              <dt>Pulso en reposo</dt>
              <dd className="b-num">{r.fcReposo} lpm</dd>
            </div>
          </dl>
          <div
            className="b-barra is-alta"
            role="meter"
            aria-label="Pasos de hoy contra la meta"
            aria-valuemin={0}
            aria-valuemax={r.metaPasos}
            aria-valuenow={r.pasos}
          >
            <i style={{ width: `${Math.min(100, (r.pasos / r.metaPasos) * 100)}%` }} />
          </div>
          <p className="b-nota">
            Meta: {r.metaPasos.toLocaleString("en-US")} pasos. Datos de ejemplo: no se leyó ningún
            reloj.
          </p>
          <button type="button" className="b-btn" onClick={() => onCambiar(false)}>
            Desconectar
          </button>
        </>
      ) : (
        <>
          <p>Conecta Apple Salud o Health Connect para ver aquí tus pasos y tu pulso.</p>
          <button type="button" className="b-btn b-btn-p" onClick={() => setAbierto(true)}>
            Conectar reloj
          </button>
        </>
      )}
      {abierto && (
        <Modal
          title="Conectar tu reloj"
          onClose={() => setAbierto(false)}
          className="b-modal"
          radius={22}
        >
          <div className="b-reserva-hecha">
            <p>Brío pediría permiso para leer, nunca para escribir:</p>
            <ul className="b-reglamento">
              <li>Pasos y distancia</li>
              <li>Calorías activas</li>
              <li>Ritmo cardiaco y pulso en reposo</li>
            </ul>
            <p>
              Tú eliges cada permiso en tu teléfono y puedes quitarlos cuando quieras. Los datos se
              quedan en tu teléfono y en tu perfil; no se comparten con nadie.
            </p>
            <p className="b-ficcion">
              Simulación: un sitio web no puede leer tu reloj. Al conectar verás datos de ejemplo.
            </p>
            <div className="b-acciones">
              <button
                type="button"
                className="b-btn b-btn-p"
                onClick={() => {
                  onCambiar(true)
                  setAbierto(false)
                }}
              >
                Conectar (simulado)
              </button>
              <button type="button" className="b-btn" onClick={() => setAbierto(false)}>
                Ahora no
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  )
}

function Invitados({ invitados, ahora, plan, onInvitar }) {
  const limite = INVITADOS_POR_PLAN[plan.id]
  const usados = invitadosDelMes(invitados, ahora)
  const quedan = Math.max(0, limite - usados)
  const [nombre, setNombre] = useState("")
  const [sucursal, setSucursal] = useState(SOCIO.base)
  const [error, setError] = useState("")
  const enviar = (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError("Escribe el nombre de tu invitado.")
      return
    }
    setError("")
    onInvitar({ nombre, sucursal })
    setNombre("")
  }
  return (
    <section className="b-socio-tarjeta" aria-labelledby="b-inv-titulo">
      <h2 id="b-inv-titulo">Pases de invitado</h2>
      <p>
        Tu plan {plan.nombre} incluye{" "}
        {limite > 10 ? "un invitado en cada visita" : `${limite} al mes`}. Te quedan{" "}
        <b className="b-num">{limite > 10 ? "ilimitados" : quedan}</b> este mes.
      </p>
      {quedan > 0 ? (
        <form className="b-invitar" onSubmit={enviar} noValidate>
          <div className="b-campo-alta">
            <label htmlFor="b-inv-nombre">Nombre de tu invitado</label>
            <input
              id="b-inv-nombre"
              name="invitado"
              value={nombre}
              maxLength={40}
              autoComplete="off"
              onChange={(e) => {
                setNombre(e.target.value)
                if (e.target.value.trim()) setError("")
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "b-inv-error" : undefined}
            />
            {error && (
              <p id="b-inv-error" className="b-error">
                {error}
              </p>
            )}
          </div>
          <div className="b-campo-alta">
            <label htmlFor="b-inv-sucursal">Sucursal</label>
            <select
              id="b-inv-sucursal"
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
          <button type="submit" className="b-btn b-btn-p">
            Generar pase
          </button>
        </form>
      ) : (
        <p className="b-nota">Ya usaste los pases de este mes. Se renuevan el día 1.</p>
      )}
      {invitados.length > 0 && (
        <ul className="b-invitados">
          {[...invitados].reverse().map((i) => (
            <li key={i.id}>
              <strong className="b-num">{i.id}</strong> · {i.nombre} ·{" "}
              {findSucursal(i.sucursal).nombre}
              <small>
                Mensaje para compartir: «{SOCIO.nombre} te invita a entrenar en Brío{" "}
                {findSucursal(i.sucursal).nombre}. Presenta el código {i.id} en recepción.» No se
                envió nada.
              </small>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Membresia({ socio, plan, ahora, dispatch, onAviso }) {
  const [accion, setAccion] = useState(null)
  const [meses, setMeses] = useState(1)
  const [motivo, setMotivo] = useState("viaje")
  const renueva = renovacionDe(ahora)
  const titulo = useRef(null)
  const primera = useRef(true)
  useEffect(() => {
    if (primera.current) {
      primera.current = false
      return
    }
    titulo.current?.focus({ preventScroll: true })
  }, [socio.membresia])
  return (
    <section id="membresia" className="b-socio-tarjeta b-membresia" aria-labelledby="b-mem-titulo">
      <h2 id="b-mem-titulo" tabIndex={-1} ref={titulo}>
        Tu membresía
      </h2>
      <dl className="b-alta-resumen">
        <div>
          <dt>Plan</dt>
          <dd>
            {plan.nombre} · <span className="b-num">{pesos(plan.precio)}</span> al mes
          </dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>
            {socio.membresia === "activa"
              ? "Activa"
              : socio.membresia === "congelada"
                ? `Congelada hasta el ${fecha(socio.congelada.hasta)} (${socio.congelada.motivo})`
                : "Cancelada"}
          </dd>
        </div>
        {socio.membresia === "activa" && (
          <div>
            <dt>Siguiente cargo</dt>
            <dd className="b-num">{fecha(renueva)}</dd>
          </div>
        )}
      </dl>
      {socio.membresia === "activa" && accion === null && (
        <div className="b-acciones">
          <button type="button" className="b-btn" onClick={() => setAccion("congelar")}>
            Congelar
          </button>
          <button type="button" className="b-btn" onClick={() => setAccion("cancelar")}>
            Cancelar membresía
          </button>
        </div>
      )}
      {accion === "congelar" && (
        <form
          className="b-confirmar"
          onSubmit={(e) => {
            e.preventDefault()
            dispatch({ type: "congelar", meses, motivo, ahora: ahora.getTime() })
            setAccion(null)
            onAviso("Membresía congelada. No se te cobra mientras está congelada.")
          }}
        >
          <fieldset className="b-chips">
            <legend>Por cuánto tiempo</legend>
            {[1, 2].map((n) => (
              <label key={n} className="b-chip">
                <input
                  type="radio"
                  name="meses"
                  checked={meses === n}
                  onChange={() => setMeses(n)}
                />
                <span>
                  {n} {n === 1 ? "mes" : "meses"}
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset className="b-chips">
            <legend>Motivo</legend>
            {["viaje", "salud"].map((m) => (
              <label key={m} className="b-chip">
                <input
                  type="radio"
                  name="motivo"
                  checked={motivo === m}
                  onChange={() => setMotivo(m)}
                />
                <span>{m === "viaje" ? "Viaje" : "Salud"}</span>
              </label>
            ))}
          </fieldset>
          <div className="b-acciones">
            <button type="submit" className="b-btn b-btn-p">
              Congelar {meses} {meses === 1 ? "mes" : "meses"}
            </button>
            <button type="button" className="b-btn" onClick={() => setAccion(null)}>
              Volver
            </button>
          </div>
        </form>
      )}
      {accion === "cancelar" && (
        <div className="b-confirmar" role="group" aria-label="Confirmar cancelación">
          <p>
            Si cancelas, no habrá más cargos. Puedes entrenar hasta el {fecha(renueva)}, que es
            cuando termina el mes ya pagado. Sin penalización.
          </p>
          <div className="b-acciones">
            <button
              type="button"
              className="b-btn b-btn-p"
              onClick={() => {
                dispatch({ type: "cancelar" })
                setAccion(null)
                onAviso(
                  "Membresía cancelada. Te enviaríamos el comprobante por correo; esta demo no envía nada.",
                )
              }}
            >
              Sí, cancelar
            </button>
            <button type="button" className="b-btn" onClick={() => setAccion(null)}>
              Mantener mi plan
            </button>
          </div>
        </div>
      )}
      {socio.membresia !== "activa" && (
        <button
          type="button"
          className="b-btn b-btn-p"
          onClick={() => {
            dispatch({ type: "reactivar" })
            onAviso("Membresía activa otra vez.")
          }}
        >
          {socio.membresia === "congelada" ? "Reactivar ahora" : "Volver a activar mi plan"}
        </button>
      )}
    </section>
  )
}

export default function Socio({
  socio,
  dispatch,
  reservas,
  acciones,
  ahora,
  onAviso,
  onPrivacidad,
}) {
  const titulo = useRef(null)
  const [sucursalEntrada, setSucursalEntrada] = useState(SOCIO.base)
  useEffect(() => {
    if (socio.sesion) titulo.current?.focus({ preventScroll: true })
  }, [socio.sesion])
  if (!socio.sesion)
    return (
      <Entrar
        onPrivacidad={onPrivacidad}
        onEntrar={() => {
          dispatch({ type: "entrar" })
          onAviso(`Entraste como ${SOCIO.nombre}, el perfil de ejemplo.`)
        }}
      />
    )
  const plan = PLANES.find((p) => p.id === SOCIO.plan)
  const base = findSucursal(SOCIO.base)
  const renueva = renovacionDe(ahora)
  const hoy = (ahora.getDay() + 6) % 7
  const entradasHoy = socio.entradas.filter(
    (e) => new Date(e.fecha).toDateString() === ahora.toDateString(),
  ).length
  const semana = SOCIO.semana.map((m, i) => (i === hoy && entradasHoy ? Math.max(m, 45) : m))
  const visitas = semana.filter(Boolean).length
  const total = semana.reduce((a, b) => a + b, 0)
  const max = Math.max(...semana, 1)
  const activa = socio.membresia === "activa"
  return (
    <div className="b-wrap b-area">
      <section className="b-area-cabeza" aria-labelledby="b-titulo">
        <div>
          <h1 id="b-titulo" tabIndex={-1} ref={titulo} className="b-d b-media">
            Hola, {SOCIO.nombre}
          </h1>
          <p className="b-lead">
            Plan {plan.nombre} · Sucursal base {base.nombre} · Socia desde{" "}
            {fecha(SOCIO.desde, { month: "long", year: "numeric" })}
          </p>
        </div>
        <button type="button" className="b-btn" onClick={() => dispatch({ type: "salir" })}>
          Salir
        </button>
      </section>

      {activa && (
        <p className="b-renovacion" role="note">
          Tu plan {plan.nombre} se renueva el {fecha(renueva)} por{" "}
          <span className="b-num">{pesos(plan.precio)}</span>. Te avisamos con cinco días de
          anticipación. <a href="#membresia">Ver o cancelar</a>
        </p>
      )}

      <div className="b-area-grid">
        <section className="b-socio-tarjeta" aria-labelledby="b-pase-titulo">
          <h2 id="b-pase-titulo">Pase de entrada</h2>
          {socio.membresia === "cancelada" ? (
            <p>Tu membresía está cancelada; el pase se desactiva al terminar el mes pagado.</p>
          ) : socio.membresia === "congelada" ? (
            <p>Tu membresía está congelada: el pase se reactiva cuando vuelvas.</p>
          ) : (
            <>
              <PaseQR base={SOCIO.codigo} />
              <div className="b-entrada">
                <label htmlFor="b-entrada-sucursal">Sucursal</label>
                <select
                  id="b-entrada-sucursal"
                  value={sucursalEntrada}
                  onChange={(e) => setSucursalEntrada(e.target.value)}
                >
                  {SUCURSALES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="b-btn b-btn-p"
                  onClick={() => {
                    dispatch({
                      type: "entrada",
                      registro: { fecha: ahora.toISOString(), sucursal: sucursalEntrada },
                    })
                    onAviso(
                      `Entrada registrada en ${findSucursal(sucursalEntrada).nombre}. Simulación: no hay torniquete.`,
                    )
                  }}
                >
                  Simular entrada
                </button>
              </div>
            </>
          )}
        </section>

        <section className="b-socio-tarjeta" aria-labelledby="b-semana-titulo">
          <h2 id="b-semana-titulo">Esta semana</h2>
          <p className="b-num b-semana-total">
            {total} min · {visitas} {visitas === 1 ? "visita" : "visitas"}
          </p>
          <div className="b-barras" role="img" aria-label={`Minutos por día: ${semana.join(", ")}`}>
            {semana.map((m, i) => (
              <i
                key={i}
                className={m ? "is-on" : ""}
                style={{ height: `${m ? Math.max(14, (m / max) * 100) : 8}%` }}
              />
            ))}
          </div>
          <div className="b-dias" aria-hidden="true">
            {DIAS.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <p className="b-nota">
            Meta: {SOCIO.meta} visitas por semana · Racha de {SOCIO.racha} semanas.
            {entradasHoy > 0 && " Hoy ya cuenta tu entrada."}
          </p>
        </section>

        <Reloj
          conectado={socio.reloj}
          onCambiar={(v) => dispatch({ type: "reloj", conectado: v })}
        />
        <Invitados
          invitados={socio.invitados}
          ahora={ahora}
          plan={plan}
          onInvitar={(d) => {
            dispatch({ type: "invitar", ...d, ahora: Date.now(), fecha: ahora.toISOString() })
            onAviso(`Pase de invitado listo para ${d.nombre.trim()}.`)
          }}
        />
      </div>

      <Composicion />

      <div className="b-area-reservas">
        <MisReservas reservas={reservas} ahora={ahora} {...acciones} />
        <Link className="b-btn" to="/gimnasio/clases">
          Reservar otra clase
        </Link>
      </div>

      <Membresia socio={socio} plan={plan} ahora={ahora} dispatch={dispatch} onAviso={onAviso} />
      <p className="b-nota b-area-pie">
        Perfil de ejemplo. Todo lo que cambias aquí vive en este navegador.{" "}
        <button type="button" className="b-inline" onClick={onPrivacidad}>
          Aviso de privacidad y borrar datos
        </button>
      </p>
    </div>
  )
}
