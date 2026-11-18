import { useState } from "react"

const ESTADOS = {
  ok: "Al día",
  ojo: "Requiere atención",
  mal: "Urgente",
}

// Expediente de ejemplo de la portada: semáforo de cumplimiento con un previo que se aprueba.
export default function Expediente() {
  const [aprobado, setAprobado] = useState(false)
  const filas = [
    ["ok", "Declaraciones de octubre", "Presentadas el 14 de noviembre"],
    ["ok", "Opinión de cumplimiento", "Positiva, vigente al 10 de diciembre"],
    aprobado
      ? ["ok", "Previo de noviembre", "Aprobado: lo presentamos antes del 17"]
      : ["ojo", "Previo de noviembre", "$1,284 · espera tu visto bueno"],
    ["mal", "Buzón tributario", "Confirma tu correo: el SAT lo pide"],
  ]
  return (
    <figure className="d-exp" aria-labelledby="d-exp-titulo">
      <figcaption className="d-exp-cab">
        <b id="d-exp-titulo">Tu expediente</b>
        <span>Mariana Solís · RESICO · ejemplo</span>
      </figcaption>
      <ul className="d-semaforo">
        {filas.map(([nivel, nombre, detalle]) => (
          <li key={nombre} className={`d-nivel-${nivel}`}>
            <i aria-hidden="true" />
            <b>{nombre}</b>
            <span>
              <span className="d-oculto">{ESTADOS[nivel]}: </span>
              {detalle}
            </span>
          </li>
        ))}
      </ul>
      <div className="d-pide">
        <b>Te pedimos:</b> estado de cuenta de octubre, antes del jueves 13.
      </div>
      <div className="d-exp-acciones" aria-live="polite">
        {aprobado ? (
          <>
            <span>Previo aprobado. Así de corto es darnos tu visto bueno.</span>
            <button type="button" className="d-inline" onClick={() => setAprobado(false)}>
              Deshacer
            </button>
          </>
        ) : (
          <button type="button" className="d-btn d-btn-p" onClick={() => setAprobado(true)}>
            Aprobar el previo de ejemplo
          </button>
        )}
      </div>
    </figure>
  )
}
