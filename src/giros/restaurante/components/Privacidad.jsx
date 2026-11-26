import { useState } from "react"
import Modal from "../../../components/shared/Modal"

// Aviso de privacidad de Patio 12 (V4.10.6), con la forma del de Taller: lo que guarda la demo, lo
// que pediría un restaurante real (LFPDPPP) y cómo borrar lo guardado en este navegador.
export default function Privacidad({ onCerrar, onBorrar }) {
  const [confirmar, setConfirmar] = useState(false)
  return (
    <Modal title="Aviso de privacidad" onClose={onCerrar} className="restaurant-modal" radius={4}>
      <div className="r-privacy">
        <p>
          Patio 12 es un restaurante ficticio. Esta demo no tiene servidor: no envía, no vende y no
          comparte ningún dato, y no pide tarjetas, contraseñas ni datos fiscales.
        </p>
        <h3>Lo que guarda en este navegador</h3>
        <ul>
          <li>El local elegido y la posición del contador.</li>
          <li>La visita, el carrito y el pedido en curso, hasta seis horas después de empezar.</li>
          <li>El perfil de ejemplo, si lo activas, con hasta diez recibos.</li>
        </ul>
        <p>
          La reserva para otra fecha y el WhatsApp de ejemplo no se guardan: se borran al cerrar su
          ventana. Los códigos QR solo llevan el local y, si se elige, la mesa.
        </p>
        <h3>Mapa y ubicación</h3>
        <p>
          El mapa se pide a OpenFreeMap solo al pulsar «Mostrar mapa interactivo»; ese servicio
          recibe las solicitudes del mapa. «Usar mi ubicación» pide permiso al navegador, y la
          posición no se guarda ni se envía.
        </p>
        <h3>Lo que pediría un restaurante real</h3>
        <p>
          Para reservar, tu nombre y un teléfono; para la entrega a domicilio, la dirección y sus
          referencias; para facturar, tus datos fiscales; para un programa de visitas, un correo. Se
          usarían para darte el servicio y, solo si lo aceptas, para avisos y promociones. Podrías
          acceder a tus datos, corregirlos, cancelarlos u oponerte a su uso.
        </p>
        <p>
          «Contactar» y «Hablemos» llevan a los canales reales de Ian; si los usas, aplican las
          condiciones de ese servicio.
        </p>
      </div>
      {confirmar ? (
        <div className="r-privacy-actions" role="group" aria-label="Confirmar borrado">
          <p>Se borran la visita, el pedido, el perfil de ejemplo y el local elegido.</p>
          <button type="button" className="r-button" onClick={onBorrar}>
            Sí, borrar todo
          </button>
          <button type="button" className="r-secondary-button" onClick={() => setConfirmar(false)}>
            No borrar
          </button>
        </div>
      ) : (
        <div className="r-privacy-actions">
          <button type="button" className="r-secondary-button" onClick={() => setConfirmar(true)}>
            Borrar mis datos de esta demo
          </button>
          <button type="button" className="r-button" onClick={onCerrar}>
            Entendido
          </button>
        </div>
      )}
    </Modal>
  )
}
