import { useState } from "react"
import { Link } from "react-router-dom"
import Modal from "../../../../components/shared/Modal"
import { buscar, nombresAutores } from "../../data/prisma"

// Búsqueda por título, área o autor (se abre con el botón o con Ctrl K).
export default function Buscar({ onCerrar }) {
  const [q, setQ] = useState("")
  const res = buscar(q)
  return (
    <Modal title="Buscar en Prisma" onClose={onCerrar} className="pr-modal" radius={14}>
      <label className="pr-buscar-et" htmlFor="pr-q">
        Título, área o autor
      </label>
      <input
        id="pr-q"
        className="pr-buscar-campo"
        type="text"
        enterKeyHint="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Por ejemplo: genética, Arrieta o cometa"
        autoComplete="off"
        autoFocus
      />
      <p className="pr-buscar-cuenta" role="status">
        {q.trim() ? `${res.length} ${res.length === 1 ? "resultado" : "resultados"}` : ""}
      </p>
      {q.trim() && res.length === 0 && (
        <p>No hay coincidencias. Prueba otro título, área o autor.</p>
      )}
      <ul className="pr-buscar-lista">
        {res.map((a) => (
          <li key={a.id}>
            <Link to={`/revista/prisma/articulo/${a.id}`} onClick={onCerrar}>
              <b>{a.titulo}</b>
              <span>
                N.º {a.n} · {a.areaNombre} · {nombresAutores(a).join(", ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
