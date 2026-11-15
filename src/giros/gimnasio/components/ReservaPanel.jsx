import { useEffect, useMemo, useRef, useState } from "react"
import Modal from "../../../components/shared/Modal"
import { findCategoria } from "../data/clases"
import { findCoach } from "../data/coaches"
import { findSucursal } from "../data/sucursales"
import { cuandoTexto, lugaresLibres } from "../lib/horario"
import { ESPERA_PASO_MS, NOMBRE_LUGAR, lugaresOcupados } from "../lib/reservas"

// Reserva simulada: elegir lugar (o lista de espera), nombre, confirmar, resultado.
export default function ReservaPanel({
  sesion,
  ahora,
  nombrePrevio,
  prueba = false,
  onReservar,
  onCerrar,
}) {
  const cat = findCategoria(sesion.categoria)
  const etiqueta = NOMBRE_LUGAR[sesion.categoria]
  const libres = lugaresLibres(sesion)
  const llena = libres === 0
  const ocupados = useMemo(() => lugaresOcupados(sesion), [sesion])
  const [lugar, setLugar] = useState(null)
  const [nombre, setNombre] = useState(nombrePrevio)
  const [error, setError] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [hecha, setHecha] = useState(null)
  const timer = useRef(null)
  const nombreRef = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  const titulo = `${prueba ? "Clase de prueba: " : ""}${cat.nombre} · ${cuandoTexto(sesion.fecha, ahora)}`
  const confirmar = (event) => {
    event.preventDefault()
    if (!llena && etiqueta && !lugar) {
      setError(`Elige ${etiqueta === "Bici" ? "una bici" : `un ${etiqueta.toLowerCase()}`}.`)
      return
    }
    if (!nombre.trim()) {
      setError("Escribe el nombre con el que te registras en recepción.")
      nombreRef.current?.focus()
      return
    }
    setError("")
    setEnviando(true)
    timer.current = setTimeout(() => {
      setHecha(onReservar({ sesion, lugar: llena ? null : lugar, nombre, prueba }))
      setEnviando(false)
    }, 800)
  }
  return (
    <Modal title={hecha ? "Listo" : titulo} onClose={onCerrar} className="b-modal" radius={22}>
      {hecha ? (
        <div className="b-reserva-hecha" role="status">
          <p className="b-reserva-codigo b-num">{hecha.id}</p>
          {hecha.estado === "espera" ? (
            <p>
              Estás en el lugar <b>{hecha.posicion}</b> de la lista de espera de {cat.nombre},{" "}
              {cuandoTexto(sesion.fecha, ahora)}. Si alguien cancela, te damos su lugar y te
              avisamos aquí. En esta demo la lista avanza un lugar cada {ESPERA_PASO_MS / 1000}{" "}
              segundos.
            </p>
          ) : (
            <p>
              Reservaste {cat.nombre}, {cuandoTexto(sesion.fecha, ahora)}, en{" "}
              {findSucursal(sesion.sucursal).nombre} con {findCoach(sesion.coach).nombre}
              {hecha.lugar ? `, ${etiqueta.toLowerCase()} ${hecha.lugar}` : ""}.
            </p>
          )}
          {prueba && <p>Es tu clase de prueba: no cuesta nada y no necesitas membresía.</p>}
          <p className="b-ficcion">Reserva simulada: no se envió a ningún lugar.</p>
          <div className="b-acciones">
            <a className="b-btn b-btn-p" href="#mis-reservas" onClick={onCerrar}>
              Ver mis reservas
            </a>
            <button type="button" className="b-btn" onClick={onCerrar}>
              Cerrar
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={confirmar} noValidate>
          <p className="b-reserva-meta">
            {findSucursal(sesion.sucursal).nombre} · Coach {findCoach(sesion.coach).nombre} ·{" "}
            {cat.minutos} min
          </p>
          <fieldset disabled={enviando} className="b-reserva-campos">
            {prueba && (
              <p className="b-aviso-lleno">Clase de prueba gratis: no necesitas membresía.</p>
            )}
            {llena ? (
              <p className="b-aviso-lleno">
                Esta clase está llena. Puedes unirte a la lista de espera: si alguien cancela, el
                lugar es tuyo.
              </p>
            ) : etiqueta ? (
              <fieldset className="b-lugares">
                <legend>
                  Elige {etiqueta === "Bici" ? "tu bici" : `tu ${etiqueta.toLowerCase()}`}{" "}
                  <span className="b-num">({libres} libres)</span>
                </legend>
                <div className="b-lugares-rejilla">
                  {Array.from({ length: cat.cupo }, (_, i) => i + 1).map((n) => {
                    const ocupado = ocupados.has(n)
                    return (
                      <label key={n} className={ocupado ? "is-ocupado" : ""}>
                        <input
                          type="radio"
                          name="lugar"
                          value={n}
                          disabled={ocupado}
                          checked={lugar === n}
                          onChange={() => {
                            setLugar(n)
                            setError("")
                          }}
                          aria-label={`${etiqueta} ${n}${ocupado ? ", ocupado" : ""}`}
                        />
                        <span className="b-num" aria-hidden="true">
                          {n}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>
            ) : (
              <p>
                En {cat.nombre} no hay lugares asignados. Quedan{" "}
                <span className="b-num">{libres}</span> lugares.
              </p>
            )}
            <label className="b-campo">
              Nombre para la recepción
              <input
                ref={nombreRef}
                name="nombre"
                value={nombre}
                maxLength={30}
                name="nombre"
                autoComplete="given-name"
                onChange={(e) => {
                  setNombre(e.target.value)
                  if (e.target.value.trim()) setError("")
                }}
                aria-invalid={Boolean(error) && !nombre.trim()}
                aria-describedby={error ? "b-reserva-error" : undefined}
              />
            </label>
            <p className="b-regla">
              Cancelas sin consecuencia hasta 2 horas antes. Después cuenta como clase tomada.
            </p>
            {error && (
              <p id="b-reserva-error" className="b-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="b-btn b-btn-p">
              {enviando
                ? "Reservando…"
                : llena
                  ? "Unirme a la lista de espera"
                  : lugar
                    ? `Reservar ${etiqueta.toLowerCase()} ${lugar}`
                    : "Reservar"}
            </button>
          </fieldset>
        </form>
      )}
    </Modal>
  )
}
