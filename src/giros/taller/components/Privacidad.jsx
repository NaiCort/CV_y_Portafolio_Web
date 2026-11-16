import { useState } from "react"
import Modal from "../../../components/shared/Modal"

// Aviso de privacidad del taller (LFPDPPP). Dice lo que guarda la demo y lo que pediría un taller
// real, y permite borrar todo lo guardado en este navegador.
export default function Privacidad({ onCerrar, onBorrar }) {
  const [confirmar, setConfirmar] = useState(false)
  return (
    <Modal title="Aviso de privacidad" onClose={onCerrar} className="t-modal" radius={14}>
      <div className="t-privacidad">
        <p>
          Mecánica Rosales y Vértice son negocios ficticios. Esta demo no tiene servidor: no envía,
          no vende y no comparte ningún dato.
        </p>
        <h3>Lo que guarda en este navegador</h3>
        <ul>
          <li>El taller elegido.</li>
          <li>Tus citas de ejemplo, con el nombre, el auto y la dirección que escribiste.</li>
          <li>Las decisiones y la firma del presupuesto de ejemplo.</li>
          <li>La sesión de Mi garaje, el kilometraje y los recordatorios del perfil de ejemplo.</li>
        </ul>
        <h3>Lo que pediría un taller real</h3>
        <p>
          Nombre, teléfono, datos del auto (placas y número de serie) y, si hay recolección, tu
          dirección; con una aseguradora, el número de siniestro. Se usarían para darte el servicio,
          la garantía y los avisos de mantenimiento que aceptes. Podrías acceder a tus datos,
          corregirlos, cancelarlos u oponerte a su uso.
        </p>
        {confirmar ? (
          <div className="t-privacidad-acciones" role="group" aria-label="Confirmar borrado">
            <p>Se borran las citas, el presupuesto, Mi garaje y el taller elegido.</p>
            <button type="button" className="t-btn t-btn-p" onClick={onBorrar}>
              Sí, borrar todo
            </button>
            <button type="button" className="t-btn t-btn-s" onClick={() => setConfirmar(false)}>
              No borrar
            </button>
          </div>
        ) : (
          <div className="t-privacidad-acciones">
            <button type="button" className="t-btn t-btn-s" onClick={() => setConfirmar(true)}>
              Borrar mis datos de esta demo
            </button>
            <button type="button" className="t-btn t-btn-p" onClick={onCerrar}>
              Entendido
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
