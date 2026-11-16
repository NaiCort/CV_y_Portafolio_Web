import { useState } from "react"
import { crearIcs, descargarIcs } from "../lib/calendario"

// «Agregar a mi calendario»: descarga un .ics con aviso una hora antes.
export default function BotonCalendario({ evento, nombre }) {
  const [hecho, setHecho] = useState(false)
  return (
    <>
      <button
        type="button"
        className="b-btn"
        onClick={() => setHecho(descargarIcs(nombre, crearIcs(evento)))}
      >
        Agregar a mi calendario
      </button>
      <span className="b-oculto" role="status">
        {hecho ? "Se descargó el archivo para tu calendario." : ""}
      </span>
    </>
  )
}
