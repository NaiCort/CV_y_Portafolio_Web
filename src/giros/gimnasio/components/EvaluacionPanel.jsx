import { useEffect, useMemo, useRef, useState } from "react"
import Modal from "../../../components/shared/Modal"
import BotonCalendario from "./BotonCalendario"
import { eventoDeEvaluacion } from "../lib/calendario"
import { COACHES, OBJETIVOS, findCoach } from "../data/coaches"
import { findSucursal } from "../data/sucursales"
import { cuandoCita } from "../lib/formato"
import { diasDeEvaluacion, horasLibres, sucursalesDe } from "../lib/evaluacion"

const DIA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

// Evaluación gratuita: coach, sucursal, día y hora, objetivo y nombre. Procesamiento corto y
// resultado con código. No pide datos de salud.
export default function EvaluacionPanel({ coachInicial, previa, ahora, onConfirmar, onCerrar }) {
  const [coach, setCoach] = useState(coachInicial || "mara")
  const sucursales = sucursalesDe(coach)
  const [sucursal, setSucursal] = useState(sucursales[0])
  const dias = useMemo(() => diasDeEvaluacion(ahora), [ahora])
  const [dia, setDia] = useState(0)
  const [hora, setHora] = useState(null)
  const [objetivo, setObjetivo] = useState(null)
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [hecha, setHecha] = useState(null)
  const timer = useRef(null)
  const nombreRef = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const horas = horasLibres(coach, sucursal, dias[dia], ahora)
  const elegida = horas.find((h) => h.hora === hora && h.libre)
  const confirmar = (e) => {
    e.preventDefault()
    if (!elegida) {
      setError("Elige una hora libre.")
      return
    }
    if (!nombre.trim()) {
      setError("Escribe tu nombre para que el coach sepa a quién espera.")
      nombreRef.current?.focus()
      return
    }
    setError("")
    setEnviando(true)
    timer.current = setTimeout(() => {
      const momento = Date.now()
      const evaluacion = {
        id: `EVA-${String(momento).slice(-5)}`,
        coach,
        sucursal,
        fecha: elegida.fecha.toISOString(),
        objetivo,
        nombre: nombre.trim().slice(0, 40),
      }
      onConfirmar(evaluacion)
      setHecha(evaluacion)
      setEnviando(false)
    }, 800)
  }
  const c = findCoach(hecha?.coach || coach)
  return (
    <Modal
      title={hecha ? "Evaluación agendada" : "Evaluación gratuita"}
      onClose={onCerrar}
      className="b-modal"
      radius={22}
    >
      {hecha ? (
        <div className="b-reserva-hecha" role="status">
          <p className="b-reserva-codigo b-num">{hecha.id}</p>
          <p>
            {hecha.nombre}, te espera {c.nombre} {cuandoCita(hecha.fecha, ahora)} en{" "}
            {findSucursal(hecha.sucursal).nombre}. Son 45 minutos: platican tu objetivo, prueban
            algunos movimientos y sales con un plan para las primeras cuatro semanas.
          </p>
          <p>Trae ropa cómoda, agua y toalla, y llega diez minutos antes.</p>
          <p className="b-ficcion">
            Cita simulada: no se envió a ningún lugar. En el club te pediríamos llenar el
            cuestionario de salud antes de empezar; esta demo no lo pide.
          </p>
          <div className="b-acciones">
            <BotonCalendario evento={eventoDeEvaluacion(hecha)} nombre={`brio-${hecha.id}`} />
            <button type="button" className="b-btn b-btn-p" onClick={onCerrar}>
              Listo
            </button>
          </div>
        </div>
      ) : (
        <form className="b-evaluar" onSubmit={confirmar} noValidate>
          <fieldset disabled={enviando} className="b-alta-campos">
            {previa && (
              <p className="b-nota">
                Ya tienes una evaluación con {findCoach(previa.coach).nombre}. Si confirmas esta,
                reemplaza la anterior: es una por persona.
              </p>
            )}
            <div className="b-evaluar-fila">
              <div className="b-campo-alta">
                <label htmlFor="b-eva-coach">Coach</label>
                <select
                  id="b-eva-coach"
                  value={coach}
                  onChange={(e) => {
                    setCoach(e.target.value)
                    setSucursal(sucursalesDe(e.target.value)[0])
                    setHora(null)
                  }}
                >
                  {COACHES.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.nombre} · {x.especialidad}
                    </option>
                  ))}
                </select>
              </div>
              <div className="b-campo-alta">
                <label htmlFor="b-eva-sucursal">Sucursal</label>
                <select
                  id="b-eva-sucursal"
                  value={sucursal}
                  onChange={(e) => {
                    setSucursal(e.target.value)
                    setHora(null)
                  }}
                >
                  {sucursales.map((s) => (
                    <option key={s} value={s}>
                      {findSucursal(s).nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <fieldset className="b-chips">
              <legend>Día</legend>
              {dias.map((d, i) => (
                <label key={d.toDateString()} className="b-chip">
                  <input
                    type="radio"
                    name="eva-dia"
                    checked={dia === i}
                    onChange={() => {
                      setDia(i)
                      setHora(null)
                    }}
                  />
                  <span>
                    {i === 0 && d.getDate() === ahora.getDate() ? "Hoy" : DIA[d.getDay()]}{" "}
                    <span className="b-num">{d.getDate()}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <fieldset className="b-chips">
              <legend>Hora</legend>
              {horas.map((h) => (
                <label key={h.hora} className="b-chip">
                  <input
                    type="radio"
                    name="eva-hora"
                    disabled={!h.libre}
                    checked={hora === h.hora && h.libre}
                    onChange={() => {
                      setHora(h.hora)
                      setError("")
                    }}
                  />
                  <span className="b-num">
                    {h.hora}
                    {!h.libre && <span className="b-oculto"> (no disponible)</span>}
                  </span>
                </label>
              ))}
            </fieldset>
            {horas.every((h) => !h.libre) && (
              <p className="b-nota">No quedan horas este día; prueba con otro.</p>
            )}
            <fieldset className="b-chips">
              <legend>Tu objetivo (opcional)</legend>
              {OBJETIVOS.map((o) => (
                <label key={o.id} className="b-chip">
                  <input
                    type="radio"
                    name="eva-objetivo"
                    checked={objetivo === o.id}
                    onChange={() => setObjetivo(o.id)}
                  />
                  <span>{o.nombre}</span>
                </label>
              ))}
            </fieldset>
            <div className="b-campo-alta">
              <label htmlFor="b-eva-nombre">Tu nombre</label>
              <input
                id="b-eva-nombre"
                name="nombre"
                ref={nombreRef}
                value={nombre}
                maxLength={40}
                autoComplete="given-name"
                onChange={(e) => setNombre(e.target.value)}
                aria-invalid={Boolean(error) && !nombre.trim()}
                aria-describedby={error ? "b-eva-error" : undefined}
              />
            </div>
            {error && (
              <p id="b-eva-error" className="b-error" role="alert">
                {error}
              </p>
            )}
            <p className="b-nota">Gratis y sin compromiso; no necesitas ser socio.</p>
            <div className="b-acciones">
              <button type="submit" className="b-btn b-btn-p">
                {enviando ? "Agendando…" : "Agendar evaluación"}
              </button>
              <button type="button" className="b-btn" onClick={onCerrar}>
                Cancelar
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </Modal>
  )
}
