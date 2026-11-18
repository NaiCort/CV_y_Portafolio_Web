import { useState } from "react"
import Modal from "../../../components/shared/Modal"

// Aviso de privacidad de Cotejo, redactado con la Ley Federal de Protección de Datos Personales
// en Posesión de los Particulares de 2025. Permite borrar lo guardado en este navegador.
export default function Privacidad({ onCerrar, onBorrar }) {
  const [confirmar, setConfirmar] = useState(false)
  return (
    <Modal title="Aviso de privacidad" onClose={onCerrar} className="d-modal" radius={14}>
      <div className="d-privacidad">
        <p>
          Cotejo es un despacho ficticio. Esta demo no tiene servidor: no envía, no vende y no
          comparte ningún dato.
        </p>
        <h3>Lo que guarda en este navegador</h3>
        <ul>
          <li>
            El expediente de ejemplo: lo que aprobaste, tu duda, el nombre de los archivos y los
            avisos por WhatsApp que elegiste.
          </li>
        </ul>
        <p>
          Las cotizaciones, el diagnóstico y las calculadoras no se guardan: se borran al salir de
          la página.
        </p>
        <h3>Lo que pediría un despacho real</h3>
        <p>
          Nombre, RFC, contacto, datos fiscales y bancarios, y los de tus empleados si llevamos tu
          nómina; nunca tu e.firma. Se usarían para cumplir tus obligaciones fiscales y, con tu
          consentimiento aparte, para avisos de fechas. Quedan bajo secreto profesional. Podrías
          acceder a tus datos, corregirlos, cancelarlos u oponerte a su uso; la autoridad que vigila
          la ley desde 2025 es la Secretaría Anticorrupción y Buen Gobierno.
        </p>
        {confirmar ? (
          <div className="d-privacidad-acciones" role="group" aria-label="Confirmar borrado">
            <p>Se borra el expediente de ejemplo.</p>
            <button type="button" className="d-btn d-btn-p" onClick={onBorrar}>
              Sí, borrar todo
            </button>
            <button type="button" className="d-btn" onClick={() => setConfirmar(false)}>
              No borrar
            </button>
          </div>
        ) : (
          <div className="d-privacidad-acciones">
            <button type="button" className="d-btn" onClick={() => setConfirmar(true)}>
              Borrar mis datos de esta demo
            </button>
            <button type="button" className="d-btn d-btn-p" onClick={onCerrar}>
              Entendido
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
