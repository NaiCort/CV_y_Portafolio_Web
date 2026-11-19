import { Link } from "react-router-dom"
import Portada from "../../components/prisma/Portada"
import { USUARIO, findArticulo } from "../../data/prisma"
import { useMarcadores } from "../../lib/marcadores"

// Cuenta de ejemplo con sus marcadores.
export default function Marcadores() {
  const [guardados, alternar] = useMarcadores("prisma")
  const lista = guardados.map(findArticulo).filter(Boolean)
  return (
    <main className="pr-w pr-cuenta">
      <section className="pr-perfil pr-perfil-c">
        <span className="pr-av-g" aria-hidden="true">
          {USUARIO.iniciales}
        </span>
        <div>
          <h1>{USUARIO.nombre}</h1>
          <p className="pr-meta">Cuenta de ejemplo · Se guarda solo en este navegador</p>
        </div>
      </section>
      <h2 className="pr-h2">Marcadores ({lista.length})</h2>
      {lista.length === 0 ? (
        <div className="pr-vacio">
          <p>Todavía no guardas ninguna investigación. Usa «Guardar» en cualquier número.</p>
          <Link className="pr-bt pr-bt-p" to="/revista/prisma">
            Ver los números
          </Link>
        </div>
      ) : (
        <ul className="pr-rej">
          {lista.map((a) => (
            <li key={a.id}>
              <Link to={`/revista/prisma/articulo/${a.id}`}>
                <Portada articulo={a} sizes="220px" />
                <b>{a.titulo}</b>
              </Link>
              <button type="button" className="pr-quitar" onClick={() => alternar(a.id)}>
                Quitar<span className="rv-oculto"> «{a.titulo}» de marcadores</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
