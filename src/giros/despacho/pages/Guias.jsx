import { Link } from "react-router-dom"
import { GUIAS } from "../data/confianza"

// Guías cortas: contenido que muestra lo que sabe el despacho sin pedir nada a cambio.
export default function Guias() {
  return (
    <section className="d-wrap d-sec d-pagina" aria-labelledby="d-titulo">
      <h1 id="d-titulo" tabIndex={-1}>
        Guías cortas
      </h1>
      <p className="d-bajada">
        Lo que más nos preguntan, explicado en pocos minutos. Son orientativas, con cifras de 2026;
        tu caso puede tener detalles que cambien la respuesta.
      </p>
      <nav className="d-indice" aria-label="Guías">
        {GUIAS.map((g) => (
          <Link key={g.id} to={`/despacho/guias#${g.id}`}>
            {g.titulo}
          </Link>
        ))}
      </nav>
      {GUIAS.map((g) => (
        <article key={g.id} id={g.id} className="d-guia" aria-labelledby={`d-g-${g.id}`}>
          <h2 id={`d-g-${g.id}`}>{g.titulo}</h2>
          <p className="d-guia-meta">
            {g.resumen} Lectura de {g.lectura}.
          </p>
          {g.secciones.map((s) => (
            <div key={s.titulo} className="d-guia-parte">
              <h3>{s.titulo}</h3>
              {s.texto.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          ))}
          <Link className="d-btn" to={g.herramienta[0]}>
            {g.herramienta[1]}
          </Link>
        </article>
      ))}
      <p className="d-nota">
        Guías escritas para esta demo con las reglas vigentes en 2026 (Ley del ISR, Código Fiscal de
        la Federación y UMA de $117.31 diarios). Un despacho real las revisaría cada año.
      </p>
    </section>
  )
}
