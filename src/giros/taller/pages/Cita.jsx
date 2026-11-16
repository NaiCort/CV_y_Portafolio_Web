import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { findServicio } from "../data/talleres"
import { findTestigo } from "../data/testigos"
import { precioServicio } from "../lib/formato"
import {
  COLONIAS_DOMICILIO,
  OTRA_COLONIA,
  admiteDomicilio,
  desdeTestigo,
  diasDisponibles,
  folioCita,
  serviciosAgendables,
  soloDomicilio,
  sucursalesPara,
  telefonoValido,
} from "../lib/citas"
import { crearIcs, descargarIcs } from "../lib/calendario"
import { cuandoTexto, eventoDeCita, lugarTexto } from "../lib/citaTexto"

const PASOS = [
  ["servicio", "Qué necesitas"],
  ["auto", "Tu auto"],
  ["cuando", "Dónde y cuándo"],
  ["datos", "Tus datos"],
  ["revisar", "Revisa y confirma"],
]
const fechaLarga = new Intl.DateTimeFormat("es-MX", {
  weekday: "long",
  day: "numeric",
  month: "long",
})
const diaCorto = new Intl.DateTimeFormat("es-MX", { weekday: "short" })
const claveDia = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

function BotonCalendario({ taller, cita }) {
  const [hecho, setHecho] = useState(false)
  return (
    <>
      <button
        type="button"
        className="t-btn t-btn-s"
        onClick={() => setHecho(descargarIcs(cita.id, crearIcs(eventoDeCita(taller, cita))))}
      >
        Agregar a mi calendario
      </button>
      <span className="t-oculto" role="status">
        {hecho ? "Se descargó el archivo para tu calendario." : ""}
      </span>
    </>
  )
}

function Campo({ id, etiqueta, error, ayuda, children }) {
  return (
    <div className="t-campo">
      <label htmlFor={id}>{etiqueta}</label>
      {children}
      {ayuda && (
        <span className="t-campo-ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </span>
      )}
      {error && (
        <span className="t-campo-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  )
}
const describir = (id, error, ayuda) =>
  [error && `${id}-error`, ayuda && `${id}-ayuda`].filter(Boolean).join(" ") || undefined

function TusCitas({ taller, citas, onCancelar }) {
  const [cancelando, setCancelando] = useState(null)
  if (!citas.length) return null
  return (
    <section className="t-tus-citas" aria-labelledby="t-tus-citas">
      <h2 id="t-tus-citas">Tus citas en {taller.corto}</h2>
      <ul>
        {citas.map((c) => (
          <li key={c.id} className={c.estado === "cancelada" ? "is-cancelada" : undefined}>
            <div>
              <b>{findServicio(taller, c.servicio)?.nombre}</b>
              <span>
                {cuandoTexto(c.fecha)} · {c.auto}
              </span>
              <span>{lugarTexto(taller, c)}</span>
              <span className="t-dato">
                {c.id}
                {c.estado === "cancelada" ? " · cancelada" : ""}
              </span>
            </div>
            {c.estado !== "cancelada" &&
              (cancelando === c.id ? (
                <div
                  className="t-tus-citas-acciones"
                  role="group"
                  aria-label="Confirmar cancelación"
                >
                  <span>¿Cancelar esta cita?</span>
                  <button
                    type="button"
                    className="t-btn t-btn-p"
                    onClick={() => {
                      onCancelar(c.id)
                      setCancelando(null)
                    }}
                  >
                    Sí, cancelar
                  </button>
                  <button
                    type="button"
                    className="t-btn t-btn-s"
                    onClick={() => setCancelando(null)}
                  >
                    No
                  </button>
                </div>
              ) : (
                <div className="t-tus-citas-acciones">
                  <BotonCalendario taller={taller} cita={c} />
                  <button type="button" className="t-inline" onClick={() => setCancelando(c.id)}>
                    Cancelar cita
                  </button>
                </div>
              ))}
          </li>
        ))}
      </ul>
    </section>
  )
}

function inicial(taller, params) {
  const sugerido = desdeTestigo(taller, params.get("testigo"))
  const pedido = params.get("servicio")
  const servicio =
    sugerido?.servicio || (serviciosAgendables(taller).some((s) => s.id === pedido) ? pedido : null)
  const sucursal =
    taller.id === "vertice" && taller.sucursales.some((s) => s.id === params.get("sucursal"))
      ? params.get("sucursal")
      : null
  const domicilio =
    taller.id === "rosales" &&
    servicio &&
    (soloDomicilio(servicio) || (sugerido?.noManejar && admiteDomicilio(servicio)))
  return {
    servicio,
    nota: sugerido?.nota ?? "",
    testigo: params.get("testigo"),
    marca: "",
    modelo: "",
    anio: "",
    placas: "",
    modo: domicilio ? "domicilio" : "taller",
    colonia: "",
    calle: "",
    sucursal,
    recoleccion: Boolean(taller.id === "vertice" && sugerido?.noManejar),
    direccion: "",
    dia: null,
    hora: null,
    nombre: "",
    telefono: "",
  }
}

// Agendar cita: cinco pasos en la misma página, procesamiento simulado y confirmación con folio.
export default function Cita({ taller, citas, onAgendar, onCancelar }) {
  const [params] = useSearchParams()
  const [ahora] = useState(() => new Date())
  const [datos, setDatos] = useState(() => inicial(taller, params))
  const [paso, setPaso] = useState(0)
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState("formulario")
  const [hecha, setHecha] = useState(null)
  const timer = useRef(null)
  const cabeza = useRef(null)
  const primerRender = useRef(true)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false
      return
    }
    cabeza.current?.focus()
  }, [paso, estado])

  const esRosales = taller.id === "rosales"
  const testigo = findTestigo(datos.testigo)
  const servicios = serviciosAgendables(taller)
  const servicio = findServicio(taller, datos.servicio)
  const opcionesSucursal = datos.servicio ? sucursalesPara(taller, datos.servicio) : []
  const sucursal = esRosales
    ? null
    : opcionesSucursal.find((s) => s.id === datos.sucursal) ||
      (opcionesSucursal.length === 1 ? opcionesSucursal[0] : null)
  const horario = esRosales ? taller.local.horario : sucursal?.horario
  const lugar = esRosales ? `rosales-${datos.modo}` : sucursal?.id
  const dias = horario ? diasDisponibles(horario, lugar, ahora) : []
  const diaElegido = dias.find((d) => claveDia(d.dia) === datos.dia)
  const horaElegida = diaElegido?.horas.find((h) => h.libre && h.texto === datos.hora)
  const misCitas = citas
    .filter((c) => c.taller === taller.id)
    .slice()
    .reverse()

  const cambiar = (campo, valor) => {
    setDatos((d) => {
      const n = { ...d, [campo]: valor }
      if (campo === "servicio") {
        if (esRosales)
          n.modo = soloDomicilio(valor) ? "domicilio" : admiteDomicilio(valor) ? d.modo : "taller"
        else if (!sucursalesPara(taller, valor).some((s) => s.id === d.sucursal)) n.sucursal = null
      }
      if (["servicio", "modo", "sucursal"].includes(campo)) {
        n.dia = null
        n.hora = null
      }
      if (campo === "dia") n.hora = null
      return n
    })
    setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  const validar = (id) => {
    const e = {}
    if (id === "servicio" && !datos.servicio) e.servicio = "Elige qué necesitas."
    if (id === "auto") {
      if (!datos.marca.trim()) e.marca = "Escribe la marca."
      if (!datos.modelo.trim()) e.modelo = "Escribe el modelo."
      const anio = Number(datos.anio)
      if (datos.anio && (!Number.isInteger(anio) || anio < 1960 || anio > ahora.getFullYear() + 1))
        e.anio = `Escribe un año entre 1960 y ${ahora.getFullYear() + 1}.`
    }
    if (id === "cuando") {
      if (esRosales && datos.modo === "domicilio") {
        if (!datos.colonia) e.colonia = "Elige tu colonia."
        else if (datos.colonia === OTRA_COLONIA)
          e.colonia = "El mecánico llega hasta 3 km del taller. Elige llevar el auto al taller."
        if (!datos.calle.trim()) e.calle = "Escribe la calle y el número."
      }
      if (!esRosales) {
        if (!sucursal) e.sucursal = "Elige una sucursal."
        if (datos.recoleccion && !datos.direccion.trim())
          e.direccion = "Escribe dónde pasamos por el auto."
      }
      if (!diaElegido) e.dia = "Elige un día."
      else if (!horaElegida) e.hora = "Elige una hora libre."
    }
    if (id === "datos") {
      if (!datos.nombre.trim()) e.nombre = "Escribe tu nombre."
      if (!telefonoValido(datos.telefono)) e.telefono = "Escribe un número de 10 dígitos."
    }
    return e
  }

  const continuar = (ev) => {
    ev.preventDefault()
    const e = validar(PASOS[paso][0])
    setErrores(e)
    const primero = Object.keys(e)[0]
    if (primero) {
      document.querySelector(`[data-campo="${primero}"]`)?.focus()
      return
    }
    setPaso((p) => p + 1)
  }

  const confirmar = () => {
    if (estado !== "formulario") return
    setEstado("procesando")
    const fecha = horaElegida.inicio.toISOString()
    timer.current = setTimeout(() => {
      const cita = {
        id: folioCita(taller, new Date()),
        taller: taller.id,
        servicio: datos.servicio,
        nota: datos.nota.trim(),
        auto: [datos.marca.trim(), datos.modelo.trim(), datos.anio].filter(Boolean).join(" "),
        placas: datos.placas.trim().toUpperCase(),
        modo: esRosales ? datos.modo : "sucursal",
        colonia: datos.colonia,
        calle: datos.calle.trim(),
        sucursal: sucursal?.id ?? null,
        recoleccion: !esRosales && datos.recoleccion,
        direccion: datos.direccion.trim(),
        fecha,
        nombre: datos.nombre.trim(),
        estado: "confirmada",
        creada: new Date().toISOString(),
      }
      onAgendar(cita)
      setHecha(cita)
      setEstado("hecha")
    }, 900)
  }

  const otra = () => {
    setDatos(inicial(taller, new URLSearchParams()))
    setErrores({})
    setPaso(0)
    setHecha(null)
    setEstado("formulario")
  }

  if (estado === "hecha" && hecha) {
    return (
      <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
        <h1 id="t-titulo" className="t-cita-h1">
          Agendar cita
        </h1>
        <div className="t-cita-hecha" ref={cabeza} tabIndex={-1} aria-labelledby="t-cita-lista">
          <h2 id="t-cita-lista">Tu cita está apartada</h2>
          <p className="t-dato t-cita-folio">Folio {hecha.id}</p>
          <dl className="t-resumen">
            <div>
              <dt>Servicio</dt>
              <dd>
                {findServicio(taller, hecha.servicio).nombre} ·{" "}
                {precioServicio(findServicio(taller, hecha.servicio))}
              </dd>
            </div>
            <div>
              <dt>Cuándo</dt>
              <dd>{cuandoTexto(hecha.fecha)}</dd>
            </div>
            <div>
              <dt>Dónde</dt>
              <dd>{lugarTexto(taller, hecha)}</dd>
            </div>
            <div>
              <dt>Auto</dt>
              <dd>
                {hecha.auto}
                {hecha.placas && ` · ${hecha.placas}`}
              </dd>
            </div>
          </dl>
          <h3>Qué sigue</h3>
          <ul className="t-puntos">
            {esRosales ? (
              <>
                <li>Lupita te confirma por WhatsApp el día anterior.</li>
                <li>
                  Te damos el presupuesto por escrito antes de tocar el auto. Si no lo aceptas,
                  pagas solo el diagnóstico ({precioServicio(findServicio(taller, "diagnostico"))}).
                </li>
                <li>Trae la tarjeta de circulación; las piezas que cambiemos te las regresamos.</li>
              </>
            ) : (
              <>
                <li>Paola, tu asesora, te confirma por WhatsApp el día anterior.</li>
                <li>
                  Te mandamos fotos y video del diagnóstico; autorizas cada partida por separado.
                </li>
                <li>
                  {hecha.recoleccion
                    ? "Pasamos por el auto en la hora elegida y te lo regresamos lavado."
                    : "Trae la tarjeta de circulación y la póliza si es por seguro."}
                </li>
              </>
            )}
          </ul>
          <p className="t-nota">
            Cita simulada: no se envió nada y nadie te va a escribir. Se guarda solo en este
            navegador.
          </p>
          <div className="t-acciones">
            <BotonCalendario taller={taller} cita={hecha} />
            <button type="button" className="t-btn t-btn-s" onClick={otra}>
              Agendar otra cita
            </button>
            <Link className="t-btn t-btn-p" to="/taller">
              Volver al inicio
            </Link>
          </div>
        </div>
        <TusCitas taller={taller} citas={misCitas} onCancelar={onCancelar} />
      </section>
    )
  }

  const [idPaso, nombrePaso] = PASOS[paso]
  const final = idPaso === "revisar"
  return (
    <section className="t-wrap t-seccion t-cita" aria-labelledby="t-titulo">
      <div className="t-cita-cab">
        <h1 id="t-titulo" className="t-cita-h1" tabIndex={-1}>
          Agendar cita en {taller.corto}
        </h1>
        <p className="t-bajada">
          {esRosales
            ? "Elige el servicio, cuéntanos de tu auto y aparta la hora. Si no puedes moverlo, vamos a tu casa en la colonia."
            : "Elige el servicio y la sucursal; si prefieres, pasamos por tu auto a cualquier punto de Xalapa."}
        </p>
      </div>
      <ol className="t-pasos" aria-label="Pasos para agendar">
        {PASOS.map(([id, nombre], i) => (
          <li
            key={id}
            className={i < paso ? "is-hecho" : i === paso ? "is-actual" : undefined}
            aria-current={i === paso ? "step" : undefined}
          >
            {nombre}
          </li>
        ))}
      </ol>
      <form
        className="t-cita-form"
        onSubmit={final ? (e) => e.preventDefault() : continuar}
        noValidate
      >
        <h2 ref={cabeza} tabIndex={-1}>
          <span className="t-oculto">
            Paso {paso + 1} de {PASOS.length}:{" "}
          </span>
          {nombrePaso}
        </h2>

        {testigo && paso < 3 && (
          <p className="t-cita-aviso">
            <b>{testigo.titulo}.</b> {testigo.hacer}
          </p>
        )}

        {idPaso === "servicio" && (
          <fieldset className="t-opciones" data-campo="servicio" tabIndex={-1}>
            <legend>Servicio</legend>
            {servicios.map((s) => (
              <label key={s.id} className="t-opcion">
                <input
                  type="radio"
                  name="servicio"
                  value={s.id}
                  checked={datos.servicio === s.id}
                  onChange={() => cambiar("servicio", s.id)}
                />
                <span>
                  <b>{s.nombre}</b>
                  <small>{s.detalle}</small>
                </span>
                <span className="t-num t-opcion-precio">{precioServicio(s)}</span>
              </label>
            ))}
            {errores.servicio && <p className="t-campo-error">{errores.servicio}</p>}
            <p className="t-nota">¿No sabes qué tiene? Elige el diagnóstico.</p>
          </fieldset>
        )}

        {idPaso === "auto" && (
          <div className="t-campos">
            <Campo id="t-marca" etiqueta="Marca" error={errores.marca}>
              <input
                id="t-marca"
                data-campo="marca"
                value={datos.marca}
                onChange={(e) => cambiar("marca", e.target.value)}
                autoComplete="off"
                aria-invalid={Boolean(errores.marca)}
                aria-describedby={describir("t-marca", errores.marca)}
              />
            </Campo>
            <Campo id="t-modelo" etiqueta="Modelo" error={errores.modelo}>
              <input
                id="t-modelo"
                data-campo="modelo"
                value={datos.modelo}
                onChange={(e) => cambiar("modelo", e.target.value)}
                autoComplete="off"
                aria-invalid={Boolean(errores.modelo)}
                aria-describedby={describir("t-modelo", errores.modelo)}
              />
            </Campo>
            <Campo id="t-anio" etiqueta="Año (opcional)" error={errores.anio}>
              <input
                id="t-anio"
                data-campo="anio"
                inputMode="numeric"
                value={datos.anio}
                onChange={(e) => cambiar("anio", e.target.value.replace(/\D/g, "").slice(0, 4))}
                autoComplete="off"
                aria-invalid={Boolean(errores.anio)}
                aria-describedby={describir("t-anio", errores.anio)}
              />
            </Campo>
            <Campo id="t-placas" etiqueta="Placas (opcional)">
              <input
                id="t-placas"
                className="t-dato"
                value={datos.placas}
                onChange={(e) => cambiar("placas", e.target.value)}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
              />
            </Campo>
            <Campo
              id="t-nota"
              etiqueta="Qué notas (opcional)"
              ayuda="Ruidos, luces encendidas, desde cuándo pasa."
            >
              <textarea
                id="t-nota"
                rows={3}
                value={datos.nota}
                onChange={(e) => cambiar("nota", e.target.value)}
                aria-describedby="t-nota-ayuda"
              />
            </Campo>
          </div>
        )}

        {idPaso === "cuando" && (
          <div className="t-cuando">
            {esRosales && admiteDomicilio(datos.servicio) && (
              <fieldset className="t-opciones t-opciones-fila">
                <legend>Dónde</legend>
                {!soloDomicilio(datos.servicio) && (
                  <label className="t-opcion">
                    <input
                      type="radio"
                      name="modo"
                      checked={datos.modo === "taller"}
                      onChange={() => cambiar("modo", "taller")}
                    />
                    <span>
                      <b>Lo llevo al taller</b>
                      <small>Colonia Revolución</small>
                    </span>
                  </label>
                )}
                <label className="t-opcion">
                  <input
                    type="radio"
                    name="modo"
                    checked={datos.modo === "domicilio"}
                    onChange={() => cambiar("modo", "domicilio")}
                  />
                  <span>
                    <b>Que vaya el mecánico</b>
                    <small>
                      Hasta 3 km del taller · {precioServicio(findServicio(taller, "domicilio"))} la
                      visita
                    </small>
                  </span>
                </label>
              </fieldset>
            )}
            {esRosales && datos.modo === "domicilio" && (
              <div className="t-campos">
                <Campo id="t-colonia" etiqueta="Colonia" error={errores.colonia}>
                  <select
                    id="t-colonia"
                    data-campo="colonia"
                    value={datos.colonia}
                    onChange={(e) => cambiar("colonia", e.target.value)}
                    aria-invalid={Boolean(errores.colonia)}
                    aria-describedby={describir("t-colonia", errores.colonia)}
                  >
                    <option value="">Elige tu colonia</option>
                    {COLONIAS_DOMICILIO.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                    <option>{OTRA_COLONIA}</option>
                  </select>
                </Campo>
                <Campo id="t-calle" etiqueta="Calle y número" error={errores.calle}>
                  <input
                    id="t-calle"
                    data-campo="calle"
                    value={datos.calle}
                    onChange={(e) => cambiar("calle", e.target.value)}
                    autoComplete="off"
                    aria-invalid={Boolean(errores.calle)}
                    aria-describedby={describir("t-calle", errores.calle)}
                  />
                </Campo>
              </div>
            )}
            {!esRosales && (
              <fieldset className="t-opciones" data-campo="sucursal" tabIndex={-1}>
                <legend>Sucursal</legend>
                {opcionesSucursal.map((s) => (
                  <label key={s.id} className="t-opcion">
                    <input
                      type="radio"
                      name="sucursal"
                      checked={sucursal?.id === s.id}
                      onChange={() => cambiar("sucursal", s.id)}
                    />
                    <span>
                      <b>{s.nombre}</b>
                      <small>
                        {s.especialidad} · {s.direccion}
                      </small>
                    </span>
                  </label>
                ))}
                {opcionesSucursal.length === 1 && (
                  <p className="t-nota">
                    {servicio.nombre} se atiende solo en la sucursal {opcionesSucursal[0].nombre}.
                  </p>
                )}
                {errores.sucursal && <p className="t-campo-error">{errores.sucursal}</p>}
              </fieldset>
            )}
            {!esRosales && (
              <div className="t-campos">
                <label className="t-check">
                  <input
                    type="checkbox"
                    checked={datos.recoleccion}
                    onChange={(e) => cambiar("recoleccion", e.target.checked)}
                  />
                  <span>
                    Pasen por mi auto <small>Sin costo con tu servicio, en toda Xalapa</small>
                  </span>
                </label>
                {datos.recoleccion && (
                  <Campo id="t-direccion" etiqueta="Dónde pasamos por él" error={errores.direccion}>
                    <input
                      id="t-direccion"
                      data-campo="direccion"
                      value={datos.direccion}
                      onChange={(e) => cambiar("direccion", e.target.value)}
                      autoComplete="off"
                      aria-invalid={Boolean(errores.direccion)}
                      aria-describedby={describir("t-direccion", errores.direccion)}
                    />
                  </Campo>
                )}
              </div>
            )}
            {horario ? (
              <>
                <fieldset className="t-dias" data-campo="dia" tabIndex={-1}>
                  <legend>Día</legend>
                  <div className="t-chips">
                    {dias.map(({ dia }) => {
                      const k = claveDia(dia)
                      return (
                        <label key={k} className="t-chip">
                          <input
                            type="radio"
                            name="dia"
                            checked={datos.dia === k}
                            onChange={() => cambiar("dia", k)}
                          />
                          <span>
                            <small>{diaCorto.format(dia)}</small>
                            <b className="t-num">{dia.getDate()}</b>
                          </span>
                        </label>
                      )
                    })}
                  </div>
                  {errores.dia && <p className="t-campo-error">{errores.dia}</p>}
                </fieldset>
                {diaElegido && (
                  <fieldset className="t-horas" data-campo="hora" tabIndex={-1}>
                    <legend>
                      {datos.recoleccion
                        ? "Hora en que pasamos"
                        : datos.modo === "domicilio"
                          ? "Hora de la visita"
                          : "Hora de entrega"}{" "}
                      · {fechaLarga.format(diaElegido.dia)}
                    </legend>
                    <div className="t-chips">
                      {diaElegido.horas.map((h) => (
                        <label key={h.texto} className={`t-chip ${h.libre ? "" : "is-ocupada"}`}>
                          <input
                            type="radio"
                            name="hora"
                            disabled={!h.libre}
                            checked={datos.hora === h.texto}
                            onChange={() => cambiar("hora", h.texto)}
                          />
                          <span className="t-num">
                            {h.texto}
                            {!h.libre && <span className="t-oculto"> (ocupada)</span>}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errores.hora && <p className="t-campo-error">{errores.hora}</p>}
                    <p className="t-nota">Las horas tachadas ya están apartadas (simulado).</p>
                  </fieldset>
                )}
              </>
            ) : (
              <p className="t-nota">Elige una sucursal para ver los días y las horas.</p>
            )}
          </div>
        )}

        {idPaso === "datos" && (
          <div className="t-campos">
            <Campo id="t-nombre" etiqueta="Nombre" error={errores.nombre}>
              <input
                id="t-nombre"
                data-campo="nombre"
                value={datos.nombre}
                onChange={(e) => cambiar("nombre", e.target.value)}
                autoComplete="off"
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={describir("t-nombre", errores.nombre)}
              />
            </Campo>
            <Campo
              id="t-telefono"
              etiqueta="WhatsApp"
              error={errores.telefono}
              ayuda="Diez dígitos. La demo no envía mensajes: puedes usar un número inventado."
            >
              <input
                id="t-telefono"
                data-campo="telefono"
                type="tel"
                inputMode="tel"
                value={datos.telefono}
                onChange={(e) => cambiar("telefono", e.target.value)}
                autoComplete="off"
                aria-invalid={Boolean(errores.telefono)}
                aria-describedby={describir("t-telefono", errores.telefono, true)}
              />
            </Campo>
          </div>
        )}

        {final && (
          <dl className="t-resumen">
            <div>
              <dt>Servicio</dt>
              <dd>
                {servicio.nombre} · {precioServicio(servicio)}
              </dd>
            </div>
            <div>
              <dt>Auto</dt>
              <dd>
                {[datos.marca, datos.modelo, datos.anio].filter(Boolean).join(" ")}
                {datos.placas && ` · ${datos.placas.toUpperCase()}`}
              </dd>
            </div>
            <div>
              <dt>Cuándo</dt>
              <dd>{cuandoTexto(horaElegida.inicio)}</dd>
            </div>
            <div>
              <dt>Dónde</dt>
              <dd>
                {lugarTexto(taller, {
                  ...datos,
                  sucursal: sucursal?.id,
                  recoleccion: !esRosales && datos.recoleccion,
                })}
              </dd>
            </div>
            <div>
              <dt>A nombre de</dt>
              <dd>
                {datos.nombre} · <span className="t-num">{datos.telefono}</span>
              </dd>
            </div>
            {datos.nota.trim() && (
              <div>
                <dt>Qué notas</dt>
                <dd>{datos.nota}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="t-cita-acciones">
          {paso > 0 && (
            <button
              type="button"
              className="t-btn t-btn-s"
              onClick={() => setPaso((p) => p - 1)}
              disabled={estado === "procesando"}
            >
              Atrás
            </button>
          )}
          {final ? (
            <button
              type="button"
              className="t-btn t-btn-p"
              onClick={confirmar}
              disabled={estado === "procesando"}
            >
              {estado === "procesando" ? "Apartando tu lugar…" : "Confirmar cita"}
            </button>
          ) : (
            <button type="submit" className="t-btn t-btn-p">
              Continuar
            </button>
          )}
        </div>
        <p className="t-oculto" role="status">
          {estado === "procesando" ? "Apartando tu lugar…" : ""}
        </p>
      </form>
      <TusCitas taller={taller} citas={misCitas} onCancelar={onCancelar} />
    </section>
  )
}
