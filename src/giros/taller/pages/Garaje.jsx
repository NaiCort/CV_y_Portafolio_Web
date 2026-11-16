import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import SoloEn from "../components/SoloEn"
import { PERFIL_GARAJE } from "../data/vertice"
import { findServicio } from "../data/talleres"
import { ETAPAS } from "../lib/consulta"
import { cuandoTexto } from "../lib/citaTexto"
import { kmTexto } from "../lib/formato"
import {
  cargarGaraje,
  credencialesValidas,
  guardarGaraje,
  kmDe,
  siguienteServicio,
  validarKm,
} from "../lib/garaje"
import { cargarOrden } from "../lib/orden"

const storage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function Entrar({ onEntrar }) {
  const [correo, setCorreo] = useState("")
  const [clave, setClave] = useState("")
  const [error, setError] = useState(null)
  const [entrando, setEntrando] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const enviar = (e) => {
    e.preventDefault()
    if (entrando) return
    if (!credencialesValidas(correo, clave)) {
      setError("El correo o la contraseña no coinciden con el perfil de ejemplo.")
      return
    }
    setError(null)
    setEntrando(true)
    timer.current = setTimeout(onEntrar, 600)
  }
  return (
    <form className="t-entrar" onSubmit={enviar} noValidate>
      <h2>Entrar</h2>
      <p className="t-cita-aviso">
        Perfil de ejemplo: <span className="t-dato">{PERFIL_GARAJE.correo}</span> · contraseña{" "}
        <span className="t-dato">{PERFIL_GARAJE.clave}</span>. No hay cuentas reales.
      </p>
      <div className="t-campo">
        <label htmlFor="t-correo">Correo</label>
        <input
          id="t-correo"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "t-entrar-error" : undefined}
        />
      </div>
      <div className="t-campo">
        <label htmlFor="t-clave">Contraseña</label>
        <input
          id="t-clave"
          type="password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "t-entrar-error" : undefined}
        />
      </div>
      {error && (
        <p className="t-campo-error" id="t-entrar-error" role="alert">
          {error}
        </p>
      )}
      <div className="t-acciones">
        <button type="submit" className="t-btn t-btn-p" disabled={entrando}>
          {entrando ? "Entrando…" : "Entrar"}
        </button>
        <button
          type="button"
          className="t-btn t-btn-s"
          disabled={entrando}
          onClick={() => {
            setCorreo(PERFIL_GARAJE.correo)
            setClave(PERFIL_GARAJE.clave)
            setError(null)
          }}
        >
          Usar el perfil de ejemplo
        </button>
      </div>
    </form>
  )
}

function Auto({ auto, estado, setEstado, citas }) {
  const km = kmDe(auto, estado)
  const sig = siguienteServicio(auto, km)
  const [nuevoKm, setNuevoKm] = useState("")
  const [error, setError] = useState(null)
  const [guardado, setGuardado] = useState(false)
  const orden = auto.orden ? cargarOrden(storage(), "vertice") : null
  const etapa = orden && ETAPAS.find((e) => e.id === orden.etapa)
  const servicio = auto.id === "prius" ? "hibridos" : "kilometraje"
  const guardarKm = (e) => {
    e.preventDefault()
    const err = validarKm(auto, estado, nuevoKm)
    setError(err)
    setGuardado(false)
    if (err) return
    setEstado((x) => ({ ...x, km: { ...x.km, [auto.id]: Number(nuevoKm.replace(/\D/g, "")) } }))
    setNuevoKm("")
    setGuardado(true)
  }
  return (
    <div className="t-garaje-auto">
      <div className="t-garaje t-garaje-grande">
        <div className="t-garaje-cab">
          <span>
            {auto.nombre} · <span className="t-dato">{auto.placas}</span>
          </span>
          <span>{sig.toca ? "Ya toca servicio" : `Faltan ${kmTexto(sig.faltan)}`}</span>
        </div>
        <p className="t-garaje-km t-num">{kmTexto(km)}</p>
        <div
          className="t-garaje-barra"
          role="meter"
          aria-label="Avance hacia el siguiente servicio"
          aria-valuemin={auto.ultimo}
          aria-valuemax={auto.siguiente}
          aria-valuenow={Math.min(km, auto.siguiente)}
          aria-valuetext={`${kmTexto(km)} de ${kmTexto(auto.siguiente)}`}
        >
          <i style={{ width: `${Math.round(sig.avance * 100)}%` }} />
        </div>
        <div className="t-garaje-pie t-num">
          <span>Último servicio: {kmTexto(auto.ultimo)}</span>
          <span>Siguiente: {kmTexto(auto.siguiente)}</span>
        </div>
      </div>

      <div className="t-garaje-acciones">
        {etapa && (
          <p className="t-garaje-orden">
            Orden abierta <span className="t-dato">VX-CEN-1182</span>: {etapa.nombre.toLowerCase()}.{" "}
            <Link
              to={`/taller/consulta?${new URLSearchParams({ folio: "VX-CEN-1182", placas: auto.placas })}`}
            >
              Ver la orden
            </Link>
          </p>
        )}
        <form className="t-km" onSubmit={guardarKm} noValidate>
          <div className="t-campo">
            <label htmlFor={`t-km-${auto.id}`}>Actualizar kilometraje</label>
            <input
              id={`t-km-${auto.id}`}
              inputMode="numeric"
              value={nuevoKm}
              onChange={(e) => {
                setNuevoKm(e.target.value.replace(/[^\d,]/g, "").slice(0, 9))
                setGuardado(false)
              }}
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `t-km-error-${auto.id}` : undefined}
            />
          </div>
          <button type="submit" className="t-btn t-btn-s">
            Guardar
          </button>
          <p
            className={error ? "t-campo-error" : "t-nota"}
            id={`t-km-error-${auto.id}`}
            role="status"
          >
            {error ?? (guardado ? "Kilometraje actualizado." : "")}
          </p>
        </form>
        <label className="t-check">
          <input
            type="checkbox"
            checked={Boolean(estado.recordatorios[auto.id])}
            onChange={(e) =>
              setEstado((x) => ({
                ...x,
                recordatorios: { ...x.recordatorios, [auto.id]: e.target.checked },
              }))
            }
          />
          <span>
            Avísame por WhatsApp 500 km antes del servicio
            <small>Simulado: no se envía ningún mensaje.</small>
          </span>
        </label>
        <Link className="t-btn t-btn-p" to={`/taller/cita?servicio=${servicio}`}>
          Agendar{" "}
          {servicio === "hibridos"
            ? "revisión de híbridos"
            : `el servicio de ${kmTexto(auto.siguiente)}`}
        </Link>
      </div>

      <section className="t-historial" aria-labelledby={`t-hist-${auto.id}`}>
        <h3 id={`t-hist-${auto.id}`}>Historial</h3>
        <ul>
          {citas.map((c) => (
            <li key={c.id}>
              <span>{cuandoTexto(c.fecha)}</span>
              <b>Cita: {c.servicioNombre}</b>
              <span>Agendada en esta demo</span>
            </li>
          ))}
          {auto.historial.map(([fecha, que, donde]) => (
            <li key={fecha + que}>
              <span>{fecha}</span>
              <b>{que}</b>
              <span>Vértice {donde}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

// Mi garaje (solo Vértice): perfil de ejemplo con dos autos.
export default function Garaje({ taller, onCambiar, citas }) {
  const [estado, setEstado] = useState(() => cargarGaraje(storage()))
  const [elegido, setElegido] = useState(PERFIL_GARAJE.autos[0].id)
  const cabeza = useRef(null)
  const primero = useRef(true)
  useEffect(() => guardarGaraje(storage(), estado), [estado])
  useEffect(() => {
    if (primero.current) {
      primero.current = false
      return
    }
    cabeza.current?.focus()
  }, [estado.sesion])
  if (taller.id !== "vertice")
    return <SoloEn taller="vertice" titulo="Mi garaje" onCambiar={onCambiar} />
  const auto = PERFIL_GARAJE.autos.find((a) => a.id === elegido)
  const misCitas = citas
    .filter((c) => c.taller === "vertice" && c.estado !== "cancelada")
    .map((c) => ({ ...c, servicioNombre: findServicio(taller, c.servicio)?.nombre }))
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-cita-cab">
        <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
          Mi garaje
        </h1>
        <p className="t-bajada">
          Tus autos, su historial en las cuatro sucursales y el siguiente servicio, en un solo
          lugar.
        </p>
      </div>
      {!estado.sesion ? (
        <Entrar onEntrar={() => setEstado((e) => ({ ...e, sesion: true }))} />
      ) : (
        <div className="t-garaje-panel">
          <div className="t-garaje-hola">
            <h2 ref={cabeza} tabIndex={-1}>
              Hola, {PERFIL_GARAJE.nombre.split(" ")[0]}
            </h2>
            <button
              type="button"
              className="t-inline"
              onClick={() => setEstado((e) => ({ ...e, sesion: false }))}
            >
              Salir
            </button>
          </div>
          <div className="t-garaje-autos" role="group" aria-label="Tus autos">
            {PERFIL_GARAJE.autos.map((a) => (
              <button
                key={a.id}
                type="button"
                className="t-btn t-btn-s"
                aria-pressed={a.id === elegido}
                onClick={() => setElegido(a.id)}
              >
                {a.nombre}
              </button>
            ))}
          </div>
          <Auto
            key={auto.id}
            auto={auto}
            estado={estado}
            setEstado={setEstado}
            citas={auto.id === "mazda" ? misCitas : []}
          />
          <p className="t-nota">
            Perfil de ejemplo: Mariana, sus autos y su historial son inventados. Lo que cambies se
            guarda solo en este navegador.
          </p>
        </div>
      )}
    </section>
  )
}
