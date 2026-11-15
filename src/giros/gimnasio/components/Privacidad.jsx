import { useState } from "react"
import Modal from "../../../components/shared/Modal"

// Aviso de privacidad propio de Brío (LFPDPPP). Describe lo que guarda esta demo y lo que pediría
// un club real; permite borrar todo lo guardado en el navegador.
export default function Privacidad({ onCerrar, onBorrar }) {
  const [confirmar, setConfirmar] = useState(false)
  return (
    <Modal
      title="Aviso de privacidad"
      onClose={onCerrar}
      className="b-modal b-privacidad"
      radius={22}
    >
      <div className="b-reserva-hecha">
        <p>
          Brío es un negocio ficticio. Esta demo no tiene servidor: no envía, no vende y no comparte
          ningún dato.
        </p>
        <h3>Lo que guarda en este navegador</h3>
        <ul className="b-reglamento">
          <li>El tema de color elegido.</li>
          <li>Tus reservas de clase, con el nombre que escribiste para la recepción.</li>
          <li>
            Si entraste con el perfil de ejemplo y lo que cambiaste en él: membresía, invitados,
            reloj y entradas simuladas.
          </li>
        </ul>
        <p>
          Lo que escribes en el alta (nombre, correo, teléfono y firma) no se guarda: se borra al
          salir de la página.
        </p>
        <h3>Lo que pediría un club real</h3>
        <p>
          Datos de identificación y contacto para tu membresía, y, solo con tu consentimiento
          expreso y por escrito, datos de salud como el cuestionario de preparación física o tus
          mediciones de composición corporal, que la ley considera sensibles. Podrías acceder a tus
          datos, corregirlos, cancelarlos u oponerte a su uso. Esta demo no pide datos de salud.
        </p>
        {confirmar ? (
          <div className="b-confirmar" role="group" aria-label="Confirmar borrado">
            <p>Se borran las reservas, la sesión del perfil de ejemplo y tus preferencias.</p>
            <div className="b-acciones">
              <button type="button" className="b-btn b-btn-p" onClick={onBorrar}>
                Sí, borrar todo
              </button>
              <button type="button" className="b-btn" onClick={() => setConfirmar(false)}>
                No borrar
              </button>
            </div>
          </div>
        ) : (
          <div className="b-acciones">
            <button type="button" className="b-btn" onClick={() => setConfirmar(true)}>
              Borrar mis datos de esta demo
            </button>
            <button type="button" className="b-btn b-btn-p" onClick={onCerrar}>
              Entendido
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
