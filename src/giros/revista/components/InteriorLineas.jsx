import { useState } from "react"

const tomas = [
  {
    nombre: "La calle",
    vista: "0 0 1200 1800",
    nota: "Las juntas del pavimento llevan la mirada desde los zapatos hasta el fondo de la calle.",
  },
  {
    nombre: "El gesto",
    vista: "410 190 420 420",
    nota: "Al cerrar el plano aparecen las gafas y el giro de la cabeza. La calle queda reducida a unas líneas.",
  },
  {
    nombre: "La cámara",
    vista: "270 820 350 510",
    nota: "La correa cae casi paralela a la pierna. Ese pequeño intervalo separa la cámara del abrigo.",
  },
]
function Recorte({ d, i }) {
  return (
    <svg viewBox={tomas[i].vista} role="img" aria-label={tomas[i].nota}>
      <image href={d.foto} width="1200" height="1800" />
    </svg>
  )
}
export function InteriorLineas({ d }) {
  const [i, seleccionar] = useState(0)
  const [calle, gesto, corte] = d.capitulos
  return (
    <article className="el-interior">
      <section className="el-calle" id="el-espacio">
        <div>
          <h2>{calle.titulo}</h2>
          <p>{calle.texto}</p>
        </div>
        <figure>
          <Recorte d={d} i={0} />
          <figcaption>Plano general · La calle</figcaption>
        </figure>
      </section>
      <section className="el-gesto" id="distintas-lecturas">
        <header>
          <h2>{gesto.titulo}</h2>
          <p>{gesto.texto}</p>
        </header>
        <div className="el-estudio">
          <div role="group" aria-label="Encuadre del fotógrafo">
            {tomas.map((t, n) => (
              <button key={t.nombre} aria-pressed={i === n} onClick={() => seleccionar(n)}>
                {t.nombre}
              </button>
            ))}
          </div>
          <figure>
            <Recorte d={d} i={i} />
            <figcaption aria-live="polite">{tomas[i].nota}</figcaption>
          </figure>
        </div>
      </section>
      <section className="el-cierre" id="el-corte">
        <figure>
          <Recorte d={d} i={2} />
          <figcaption>Detalle de la toma original</figcaption>
        </figure>
        <div>
          <blockquote>{calle.cita}</blockquote>
          <h2>{corte.titulo}</h2>
          <p>{corte.texto}</p>
        </div>
      </section>
    </article>
  )
}
