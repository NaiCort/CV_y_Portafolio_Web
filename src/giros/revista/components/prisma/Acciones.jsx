import { useState } from "react"
import { Link } from "react-router-dom"
import { useMarcadores } from "../../lib/marcadores"

// Los tres botones de un número: guardar, leer en el sitio y descargar el PDF.
export default function Acciones({ articulo: a, leer = true }) {
  const [guardados, alternar] = useMarcadores("prisma")
  const [aviso, setAviso] = useState("")
  const si = guardados.includes(a.id)
  return (
    <div className="pr-acciones-caja">
      <div className="pr-bots">
        <button
          type="button"
          className="pr-bt pr-bt-s"
          aria-pressed={si}
          onClick={() => {
            alternar(a.id)
            setAviso(si ? "Quitado de tus marcadores." : "Guardado en tus marcadores.")
          }}
        >
          {si ? "★ Guardado" : "☆ Guardar"}
        </button>
        {leer && (
          <Link className="pr-bt pr-bt-p" to={`/revista/prisma/articulo/${a.id}`}>
            Leer en el sitio
          </Link>
        )}
        {a.completo ? (
          <a
            className="pr-bt pr-bt-s"
            href={`/revista/prisma/pdf/prisma-${a.n}-${a.id}.pdf`}
            download
            onClick={() => setAviso("Descargando el PDF del N.º " + a.n + ".")}
          >
            ↓ Descargar PDF
          </a>
        ) : (
          <button
            type="button"
            className="pr-bt pr-bt-s"
            onClick={() =>
              setAviso("Solo los números 24 y 23 tienen texto completo y PDF en esta demo.")
            }
          >
            ↓ Descargar PDF
          </button>
        )}
      </div>
      <p className="pr-aviso" role="status">
        {aviso}
      </p>
    </div>
  )
}
