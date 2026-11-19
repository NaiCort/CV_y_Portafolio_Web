import { Navigate, Link, useParams } from "react-router-dom"
import Portada from "../../components/prisma/Portada"
import { articulosDe, findAutor } from "../../data/prisma"

const miles = new Intl.NumberFormat("es-MX")

// Perfil de autor: datos, cifras de ejemplo y sus publicaciones en Prisma.
export default function Autor() {
  const { id } = useParams()
  const autor = findAutor(id)
  if (!autor) return <Navigate to="/revista/prisma" replace />
  const lista = articulosDe(id)
  const lecturas = lista.reduce((n, a) => n + a.cifras.lecturas, 0)
  const citas = lista.reduce((n, a) => n + a.cifras.citas, 0)
  return (
    <main className="pr-w pr-autor">
      <section className="pr-perfil">
        <span className="pr-av-g" aria-hidden="true">
          {autor.iniciales}
        </span>
        <div>
          <h1>{autor.nombre}</h1>
          <p className="pr-meta">
            {autor.oficio} · {autor.institucion} · ORCID {autor.orcid} (de ejemplo)
          </p>
        </div>
        <dl className="pr-mt">
          <div>
            <dt>Publicaciones</dt>
            <dd>{lista.length}</dd>
          </div>
          <div>
            <dt>Citas</dt>
            <dd>{citas}</dd>
          </div>
          <div>
            <dt>Lecturas</dt>
            <dd>{miles.format(lecturas)}</dd>
          </div>
        </dl>
      </section>
      <h2 className="pr-h2">Publicaciones en Prisma</h2>
      <ul className="pr-lista">
        {lista.map((a) => (
          <li key={a.id}>
            <Link to={`/revista/prisma/articulo/${a.id}`}>
              <Portada articulo={a} sizes="90px" />
              <span>
                <span className="pr-meta">
                  Vol. 4 · N.º {a.n} · {a.areaNombre}
                </span>
                <b>{a.titulo}</b>
                <span className="pr-meta">
                  {a.revisado ? "Revisado por pares" : "Preimpresión"} ·{" "}
                  {miles.format(a.cifras.lecturas)} lecturas
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="pr-meta pr-ficticio">
        Perfil y cifras de ejemplo: {autor.nombre} es un personaje ficticio.
      </p>
    </main>
  )
}
