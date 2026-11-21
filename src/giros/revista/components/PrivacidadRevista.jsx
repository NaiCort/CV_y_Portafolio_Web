import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Modal from "../../../components/shared/Modal"
import { borrarDatosRevista } from "../lib/privacidad"

export default function PrivacidadRevista({ onBorrar }) {
  const [abierto, setAbierto] = useState(false)
  const [aviso, setAviso] = useState("")
  const { pathname } = useLocation()
  const sitio = ["rubor", "prisma", "umbral"].find((s) => pathname.startsWith(`/revista/${s}`))
  return (
    <div className="rv-utilidades">
      <button type="button" onClick={() => setAbierto(true)}>
        Privacidad y datos de Revista
      </button>
      {sitio && <Link to={`/revista/${sitio}/creditos`}>Créditos y procedencia</Link>}
      <p role="status">{aviso}</p>
      {abierto && (
        <Modal title="Privacidad de Revista" onClose={() => setAbierto(false)}>
          <div className="rv-privacidad">
            <p>
              Rubor, Prisma y Umbral son publicaciones ficticias. Utiliza datos inventados. No hay
              cuentas reales ni pagos y tus acciones no se publican en un servidor.
            </p>
            <p>
              Los marcadores y comentarios propios se guardan en este navegador hasta que los
              borres. Las preferencias y funciones futuras de Revista usarán este mismo ámbito de
              borrado. En un dispositivo compartido, otra persona podría ver lo guardado.
            </p>
            <p>
              Las imágenes y tipografías se sirven desde este sitio. El alojamiento recibe las
              solicitudes necesarias para cargarlo. Los enlaces de contacto de Ian y las fuentes de
              los créditos abren servicios externos.
            </p>
            <p>
              El botón siguiente borra los datos de las tres revistas y reinicia su estado visible.
              No borra datos de las otras demos. También borra la suscripción simulada de Rubor
              guardada en este navegador.
            </p>
            <button
              type="button"
              className="rv-borrar"
              onClick={() => {
                const si = borrarDatosRevista()
                onBorrar()
                setAbierto(false)
                setAviso(
                  si
                    ? "Se borraron los datos de Rubor, Prisma y Umbral en este navegador."
                    : "Se reinició la sesión visible. El navegador no permitió borrar su almacenamiento; revisa sus ajustes de datos del sitio.",
                )
              }}
            >
              Borrar los datos de Revista
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
