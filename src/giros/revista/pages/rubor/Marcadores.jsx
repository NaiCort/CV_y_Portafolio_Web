import { Link } from "react-router-dom"
import { ACTUAL, LECTORA, fechaNumero, findNumero, foto } from "../../data/rubor"
import { useMarcadores } from "../../lib/marcadores"

// Cuenta de ejemplo con sus marcadores: los números guardados para verlos después.
export default function Marcadores() {
  const [guardados, alternar] = useMarcadores("rubor")
  const lista = guardados.map(findNumero).filter(Boolean)
  return (
    <main className="rb-cuenta">
      <section className="rb-perfil" aria-labelledby="rb-perfil-nombre">
        <span className="rb-av-grande" aria-hidden="true">
          {LECTORA.iniciales}
        </span>
        <div>
          <h1 id="rb-perfil-nombre">{LECTORA.nombre}</h1>
          <p>Cuenta de ejemplo · Lectora de Rubor · Se guarda solo en este navegador</p>
        </div>
      </section>
      <section aria-labelledby="rb-marc-titulo">
        <h2 id="rb-marc-titulo" className="rb-cuenta-h2">
          Marcadores
        </h2>
        {lista.length === 0 ? (
          <div className="rb-vacio">
            <p>Todavía no guardas ningún número. Usa «Guardar número» mientras hojeas.</p>
            <Link className="rb-boton rb-boton-on" to="/revista/rubor">
              Ir al número actual
            </Link>
          </div>
        ) : (
          <ul className="rb-rejilla-num">
            {lista.map((x) => (
              <li key={x.n}>
                <Link to={x.n === ACTUAL.n ? "/revista/rubor" : `/revista/rubor/numero/${x.n}`}>
                  <img src={foto(x.foto, 600)} alt="" loading="lazy" width={300} height={400} />
                  <b>N.º {x.n}</b>
                  <span>{fechaNumero(x)}</span>
                  <em>«{x.tema}»</em>
                </Link>
                <button type="button" className="rb-quitar" onClick={() => alternar(x.n)}>
                  Quitar<span className="rv-oculto"> el N.º {x.n} de marcadores</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
