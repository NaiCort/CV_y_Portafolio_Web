import { Link } from "react-router-dom"
import { GUIAS } from "../data/confianza"
import Cabeza from "../components/Cabeza"

// Guías cortas: contenido que muestra lo que sabe el despacho sin pedir nada a cambio.
export default function Guias() {
  return (
    <section className="d-pagina" aria-labelledby="d-titulo">
      <Cabeza
        ruta={["Guías cortas"]}
        titulo="Lo que más"
        gris="nos preguntan."
        bajada="Explicado en pocos minutos. Son orientativas, con cifras de 2026; tu caso puede tener detalles que cambien la respuesta."
      />
      <div className="d-wrap d-pagina-cuerpo">
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
          Guías escritas para esta demo con las reglas vigentes en 2026 (Ley del ISR, Código Fiscal
          de la Federación y UMA de $117.31 diarios). Un despacho real las revisaría cada año.
        </p>
      </div>
    </section>
  )
}
