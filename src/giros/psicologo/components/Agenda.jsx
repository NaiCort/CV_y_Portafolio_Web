import { useEffect, useId, useRef, useState } from "react"
import Modal from "../../../components/shared/Modal"
import {
  diasDisponibles,
  horaEnZona,
  horarios,
  MEDIOS,
  textoRecordatorio,
  TIPOS,
  validarContacto,
  validarNombre,
  ZONAS,
} from "../lib/agenda"

// Agenda simulada (V4.10.2), con los cinco estados del principio rector: inicial (elegir qué
// agendar), selección (modalidad, horario y contacto), procesamiento, resultado (con recordatorio
// simulado por WhatsApp) y salida. No pide motivo de consulta ni datos de salud.
export default function Agenda({ tema, tipoInicial = null, onClose }) {
  const [paso, setPaso] = useState(tipoInicial ? "detalles" : "tipo")
  const [tipo, setTipo] = useState(tipoInicial)
  const [modalidad, setModalidad] = useState("consultorio")
  const [zona, setZona] = useState("centro")
  const [dias] = useState(() => diasDisponibles())
  const [dia, setDia] = useState(null)
  const [hora, setHora] = useState(null)
  const [nombre, setNombre] = useState("")
  const [medio, setMedio] = useState("whatsapp")
  const [valor, setValor] = useState("")
  const [acepta, setAcepta] = useState(false)
  const [errores, setErrores] = useState({})
  const [recordatorio, setRecordatorio] = useState(false)
  const temporizador = useRef(null)
  const resultado = useRef(null)
  const detalles = useRef(null)
  const base = useId()
  useEffect(() => () => clearTimeout(temporizador.current), [])
  useEffect(() => {
    if (paso === "resultado") resultado.current?.focus()
    if (paso === "detalles") detalles.current?.focus()
  }, [paso])

  const enLinea = tipo === "llamada" || modalidad === "linea"
  const diaElegido = dias.find((d) => d.id === dia)
  const medioElegido = MEDIOS.find((m) => m.id === medio)
  const tipoElegido = TIPOS.find((t) => t.id === tipo)

  const confirmar = (evento) => {
    evento.preventDefault()
    const nuevos = {}
    if (!dia || hora === null) nuevos.horario = "Elige un día y una hora."
    const n = validarNombre(nombre)
    if (n) nuevos.nombre = n
    const c = validarContacto(medio, valor)
    if (c) nuevos.contacto = c
    if (!acepta) nuevos.acepta = "Para apartar el horario, confirma que leíste el aviso."
    setErrores(nuevos)
    const primero = Object.keys(nuevos)[0]
    if (primero) {
      document.getElementById(`${base}-${primero}`)?.focus()
      return
    }
    setPaso("procesando")
    temporizador.current = setTimeout(() => setPaso("resultado"), 900)
  }

  const reiniciar = () => {
    setPaso("tipo")
    setTipo(null)
    setDia(null)
    setHora(null)
    setRecordatorio(false)
    setErrores({})
  }

  return (
    <Modal
      title={tipoElegido && paso !== "tipo" ? `Agenda: ${tipoElegido.nombre}` : "Agenda una cita"}
      onClose={onClose}
      className={`p-modal p-modal-${tema} p-agenda`}
      radius={tema === "cuaderno" ? 6 : 16}
    >
      {paso === "tipo" && (
        <div className="p-agenda-paso">
          <p className="p-modal-texto">¿Qué quieres agendar? Puedes empezar por la llamada.</p>
          <div className="p-opciones" role="group" aria-label="Qué agendar">
            {TIPOS.map((t) => (
              <button
                key={t.id}
                type="button"
                className="p-opcion"
                aria-pressed={tipo === t.id}
                onClick={() => setTipo(t.id)}
              >
                <span className="p-opcion-nombre">{t.nombre}</span>
                <span className="p-opcion-detalle">{t.detalle}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="p-btn p-btn-p"
            disabled={!tipo}
            onClick={() => setPaso("detalles")}
          >
            Continuar
          </button>
        </div>
      )}

      {paso === "detalles" && (
        <form className="p-agenda-paso" onSubmit={confirmar} noValidate>
          <p className="p-modal-texto" ref={detalles} tabIndex={-1}>
            {tipoElegido.detalle}
          </p>
          {tipo === "primera" && (
            <fieldset className="p-campo">
              <legend>¿Dónde?</legend>
              <div className="p-segmento">
                {[
                  ["consultorio", "En el consultorio"],
                  ["linea", "En línea"],
                ].map(([id, texto]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={modalidad === id}
                    onClick={() => setModalidad(id)}
                  >
                    {texto}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {enLinea && (
            <div className="p-campo">
              <label htmlFor={`${base}-zona`}>Tu zona horaria</label>
              <select id={`${base}-zona`} value={zona} onChange={(e) => setZona(e.target.value)}>
                {ZONAS.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
          <fieldset className="p-campo">
            <legend id={`${base}-horario`} tabIndex={-1}>
              Día y hora {enLinea && zona !== "centro" ? "(en tu zona)" : ""}
            </legend>
            <div className="p-dias">
              {dias.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={dia === d.id}
                  onClick={() => {
                    setDia(d.id)
                    setHora(null)
                  }}
                >
                  {d.nombre}
                </button>
              ))}
            </div>
            {diaElegido && (
              <div className="p-horas" role="group" aria-label={`Horas del ${diaElegido.nombre}`}>
                {horarios(diaElegido).map(({ hora: h, libre }) => (
                  <button
                    key={h}
                    type="button"
                    disabled={!libre}
                    aria-pressed={hora === h}
                    onClick={() => setHora(h)}
                  >
                    {horaEnZona(h, enLinea ? zona : "centro")}
                    {!libre && <span className="p-oculto"> (ocupado)</span>}
                  </button>
                ))}
              </div>
            )}
            {errores.horario && <p className="p-error">{errores.horario}</p>}
          </fieldset>
          <div className="p-campo">
            <label htmlFor={`${base}-nombre`}>Tu nombre</label>
            <input
              id={`${base}-nombre`}
              value={nombre}
              autoComplete="given-name"
              aria-invalid={!!errores.nombre}
              aria-describedby={errores.nombre ? `${base}-nombre-e` : undefined}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && (
              <p className="p-error" id={`${base}-nombre-e`}>
                {errores.nombre}
              </p>
            )}
          </div>
          <fieldset className="p-campo">
            <legend>¿Cómo te contacto?</legend>
            <div className="p-segmento">
              {MEDIOS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  aria-pressed={medio === m.id}
                  onClick={() => setMedio(m.id)}
                >
                  {m.nombre}
                </button>
              ))}
            </div>
            <label htmlFor={`${base}-contacto`} className="p-sub">
              {medioElegido.etiqueta}
            </label>
            <input
              id={`${base}-contacto`}
              type={medioElegido.tipo}
              inputMode={medioElegido.tipo === "tel" ? "tel" : "email"}
              autoComplete={medioElegido.tipo === "tel" ? "tel" : "email"}
              value={valor}
              aria-invalid={!!errores.contacto}
              aria-describedby={errores.contacto ? `${base}-contacto-e` : undefined}
              onChange={(e) => setValor(e.target.value)}
            />
            {errores.contacto && (
              <p className="p-error" id={`${base}-contacto-e`}>
                {errores.contacto}
              </p>
            )}
          </fieldset>
          <p className="p-nota">
            No te pido el motivo de consulta: eso lo hablamos en la llamada o en la sesión.
          </p>
          <details className="p-aviso-breve">
            <summary>Aviso de privacidad en breve</summary>
            <p>
              Uso tu nombre y tu contacto solo para confirmar la cita y recordártela. No los
              comparto. Los datos de salud se piden en consulta, con tu consentimiento por escrito.
              Puedes pedir que los borre cuando quieras.
            </p>
          </details>
          <label className="p-check" id={`${base}-acepta`} tabIndex={-1}>
            <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
            <span>Leí el aviso de privacidad.</span>
          </label>
          {errores.acepta && <p className="p-error">{errores.acepta}</p>}
          <div className="p-acciones">
            <button type="submit" className="p-btn p-btn-p">
              Apartar el horario
            </button>
            {!tipoInicial && (
              <button type="button" className="p-btn p-btn-s" onClick={() => setPaso("tipo")}>
                Cambiar lo que agendo
              </button>
            )}
          </div>
        </form>
      )}

      {paso === "procesando" && (
        <p className="p-modal-texto p-procesando" role="status">
          Apartando tu horario…
        </p>
      )}

      {paso === "resultado" && (
        <div className="p-agenda-paso">
          <p className="p-resultado" ref={resultado} tabIndex={-1} role="status">
            Listo, {nombre.trim()}: tu horario quedó apartado. Es una simulación; no se envió nada.
          </p>
          <dl className="p-resumen">
            <div>
              <dt>Qué</dt>
              <dd>{tipoElegido.nombre}</dd>
            </div>
            <div>
              <dt>Cuándo</dt>
              <dd>
                {diaElegido.nombre}, {horaEnZona(hora, enLinea ? zona : "centro")}
              </dd>
            </div>
            <div>
              <dt>Dónde</dt>
              <dd>
                {tipo === "llamada"
                  ? "Por teléfono"
                  : modalidad === "linea"
                    ? "En línea"
                    : "En el consultorio"}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            className="p-btn p-btn-s"
            aria-pressed={recordatorio}
            onClick={() => setRecordatorio((r) => !r)}
          >
            {recordatorio ? "Recordatorio activado" : "Recuérdamelo por WhatsApp un día antes"}
          </button>
          {recordatorio && (
            <figure className="p-wa">
              <figcaption>Así llegaría el recordatorio (simulado, no se envía):</figcaption>
              <p>
                {textoRecordatorio({
                  tipo,
                  dia: diaElegido.nombre,
                  hora,
                  modalidad,
                  zona: enLinea ? zona : "centro",
                })}
              </p>
            </figure>
          )}
          <div className="p-acciones">
            <button type="button" className="p-btn p-btn-p" onClick={onClose}>
              Volver a la página
            </button>
            <button type="button" className="p-btn p-btn-s" onClick={reiniciar}>
              Agendar otra
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
