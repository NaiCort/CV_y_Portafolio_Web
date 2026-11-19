import { Navigate, useParams, Link } from "react-router-dom"
import Acciones from "../../components/prisma/Acciones"
import Autores from "../../components/prisma/Autores"
import { findArticulo, foto } from "../../data/prisma"

// Ficha de una investigación. El texto completo de los números 24 y 23 llega en la siguiente
// entrega; los demás son entradas de archivo con su resumen.
export default function Articulo() {
  const { id } = useParams()
  const a = findArticulo(id)
  if (!a) return <Navigate to="/revista/prisma" replace />
  return (
    <main className="pr-art" style={{ "--c": a.color }}>
      <div className="pr-artbg" aria-hidden="true">
        <img src={foto(a.foto)} alt="" />
      </div>
      <div className="pr-w pr-art-in">
        <p className="pr-meta">
          PRISMA · Vol. 4 · N.º {a.n} · {a.areaNombre} · {a.fecha} · Versión {a.version}
        </p>
        <h1>{a.titulo}</h1>
        <Autores ids={a.autores} />
        <div className="pr-chips">
          {a.revisado ? (
            <span className="pr-chip pr-chip-ok">Revisado por pares</span>
          ) : (
            <span className="pr-chip pr-chip-pre">Preimpresión · sin revisión por pares</span>
          )}
          <span className="pr-chip">
            DOI 10.0000/prisma.2026.{String(a.n).padStart(3, "0")} (de ejemplo)
          </span>
          <span className="pr-chip">CC BY 4.0</span>
        </div>
        <section className="pr-resumen" aria-labelledby="pr-res-titulo">
          <h2 id="pr-res-titulo">Resumen</h2>
          <p>{a.resumen}</p>
        </section>
        <Acciones articulo={a} leer={false} />
        <p className="pr-nota">
          {a.completo
            ? "La lectura completa de este número (índice, figuras, referencias y comentarios) llega en la siguiente entrega de esta demo."
            : "Entrada de archivo: en esta demo solo los números 24 y 23 tienen texto completo."}{" "}
          <Link to="/revista/prisma">Volver a los números</Link>
        </p>
      </div>
    </main>
  )
}
