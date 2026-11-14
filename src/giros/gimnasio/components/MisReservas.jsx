import { useState } from "react"
import { findCategoria } from "../data/clases"
import { findCoach } from "../data/coaches"
import { findSucursal } from "../data/sucursales"
import { cuandoTexto } from "../lib/horario"
import { NOMBRE_LUGAR, cancelacion, resumenDeClase } from "../lib/reservas"

const ZONAS = ["Suave", "Moderada", "Intensa", "Máxima"]

function Estrellas({ etiqueta, valor, onCambiar }) {
  return (
    <fieldset className="b-estrellas">
      <legend>{etiqueta}</legend>
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n}>
          <input
            type="radio"
            name={etiqueta}
            checked={valor === n}
            onChange={() => onCambiar(n)}
            aria-label={`${n} de 5`}
          />
          <span aria-hidden="true" className={valor >= n ? "is-on" : ""}>
            ★
          </span>
        </label>
      ))}
    </fieldset>
  )
}

function Resumen({ reserva, onCalificar }) {
  const r = resumenDeClase(reserva)
  const total = r.zonas.reduce((a, b) => a + b, 0)
  return (
    <div className="b-resumen">
      <dl className="b-resumen-cifras">
        <div>
          <dt>Minutos</dt>
          <dd className="b-num">{r.minutos}</dd>
        </div>
        <div>
          <dt>Calorías estimadas</dt>
          <dd className="b-num">{r.kcal}</dd>
        </div>
      </dl>
      <p className="b-resumen-zonas-titulo">Minutos por zona de esfuerzo</p>
      <div
        className="b-zonas"
        role="img"
        aria-label={ZONAS.map((z, i) => `${z}: ${r.zonas[i]} minutos`).join(", ")}
      >
        {r.zonas.map((m, i) =>
          m ? <i key={ZONAS[i]} className={`b-zona-${i}`} style={{ flexGrow: m / total }} /> : null,
        )}
      </div>
      <ul className="b-zonas-leyenda">
        {ZONAS.map((z, i) => (
          <li key={z}>
            <i className={`b-zona-${i}`} aria-hidden="true" /> {z}{" "}
            <span className="b-num">{r.zonas[i]} min</span>
          </li>
        ))}
      </ul>
      <p className="b-ficcion">
        Ejemplo simulado. Las calorías se estiman con un peso de referencia de 70 kg; en un club
        real vendrían de tu banda o reloj.
      </p>
      <div className="b-calificar">
        <Estrellas
          etiqueta="Califica la clase"
          valor={reserva.califClase}
          onCambiar={(v) => onCalificar(reserva.id, "califClase", v)}
        />
        <Estrellas
          etiqueta={`Califica a ${findCoach(reserva.coach).nombre}`}
          valor={reserva.califCoach}
          onCambiar={(v) => onCalificar(reserva.id, "califCoach", v)}
        />
      </div>
    </div>
  )
}

export default function MisReservas({ reservas, ahora, onCancelar, onTerminar, onCalificar }) {
  const [confirmando, setConfirmando] = useState(null)
  const visibles = reservas
    .filter((r) => r.estado !== "cancelada")
    .slice()
    .reverse()
  return (
    <section id="mis-reservas" className="b-wrap b-mis-reservas" aria-labelledby="b-mis-titulo">
      <h2 id="b-mis-titulo" className="b-d b-angosta">
        Mis reservas
      </h2>
      {visibles.length === 0 ? (
        <p className="b-lead">
          Todavía no reservas ninguna clase. Elige una del horario; se guarda en este navegador.
        </p>
      ) : (
        <ul className="b-reservas">
          {visibles.map((r) => {
            const cat = findCategoria(r.categoria)
            const fecha = new Date(r.fecha)
            const regla = cancelacion(r, ahora)
            return (
              <li key={r.id} className={`is-${r.estado}`}>
                <div className="b-reserva-cabeza">
                  <div>
                    <strong>{cat.nombre}</strong>
                    <small className="b-num">
                      {cuandoTexto(fecha, ahora)} · {findSucursal(r.sucursal).nombre} · Coach{" "}
                      {findCoach(r.coach).nombre}
                      {r.lugar ? ` · ${NOMBRE_LUGAR[r.categoria]} ${r.lugar}` : ""}
                    </small>
                  </div>
                  <span className="b-estado" role="status">
                    {r.estado === "espera"
                      ? `Lista de espera · lugar ${r.posicion}`
                      : r.estado === "terminada"
                        ? "Terminada"
                        : r.liberada
                          ? "Se liberó un lugar: confirmada"
                          : "Confirmada"}
                  </span>
                </div>
                {r.estado === "terminada" ? (
                  <Resumen reserva={r} onCalificar={onCalificar} />
                ) : confirmando === r.id ? (
                  <div className="b-confirmar" role="group" aria-label="Confirmar cancelación">
                    <p>
                      {regla === "tardia"
                        ? "Faltan menos de 2 horas: si cancelas ahora, cuenta como clase tomada."
                        : "¿Cancelar esta reserva? Liberas tu lugar para alguien más."}
                    </p>
                    <div className="b-acciones">
                      <button
                        type="button"
                        className="b-btn b-btn-p"
                        onClick={() => {
                          onCancelar(r.id)
                          setConfirmando(null)
                        }}
                      >
                        Sí, cancelar
                      </button>
                      <button type="button" className="b-btn" onClick={() => setConfirmando(null)}>
                        Mantener
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="b-acciones">
                    {regla !== "pasada" && (
                      <button type="button" className="b-btn" onClick={() => setConfirmando(r.id)}>
                        {r.estado === "espera" ? "Salir de la lista" : "Cancelar reserva"}
                      </button>
                    )}
                    {r.estado === "confirmada" && (
                      <button type="button" className="b-btn" onClick={() => onTerminar(r.id)}>
                        Simular que ya terminó
                      </button>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
