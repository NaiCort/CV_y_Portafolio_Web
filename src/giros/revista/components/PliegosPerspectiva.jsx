import { useState } from "react"
import { Link } from "react-router-dom"
import "./pliegos-perspectiva.css"

const pruebas = [
  {
    nombre: "Toma completa",
    marco: "0 0 1200 1799",
    nota: "La trenza prolonga el retrato hasta el borde inferior. El hombro y la mano equilibran el peso del rostro.",
  },
  {
    nombre: "Con aire",
    marco: "480 180 720 720",
    nota: "El margen claro delante de la nariz conserva la dirección de la mirada. Éste es el corte elegido para abrir la secuencia.",
  },
  {
    nombre: "Al límite",
    marco: "565 281 450 450",
    nota: "El borde se acerca al perfil. A la misma altura de los ojos, el gesto resulta más tenso.",
  },
]
function Toma({ d, i, mini = false }) {
  const p = pruebas[i]
  return (
    <svg
      viewBox={p.marco}
      role="img"
      aria-label={p.nombre + " · retrato de perfil en luz verde y magenta"}
    >
      <image href={mini ? d.mini : d.foto} width="1200" height="1799" />
    </svg>
  )
}
export function Escena({ d, children }) {
  return (
    <header className="op-escena">
      <div className="op-cuerpo">
        <Link to="/revista/umbral">Umbral / Diseño</Link>
        <h1>
          Otra <em>perspectiva</em>
        </h1>
        <h2>{d.capitulos[0].titulo}</h2>
        <p>{d.entradilla}</p>
        <p>
          Por <Link to="/revista/umbral/creador/nicolas-vera">{d.autor}</Link>
        </p>
        {children}
      </div>
      <figure>
        <Toma d={d} i={0} />
        <figcaption>
          Retrato ilustrativo · <Link to="/revista/umbral/creditos">Procedencia</Link>
        </figcaption>
      </figure>
    </header>
  )
}
export function InteriorPerspectiva({ d }) {
  const [corte, elegir] = useState(1),
    [prueba, ampliar] = useState(1)
  return (
    <div className="op-interior">
      <section id="forma-y-significado" className="op-corte">
        <header>
          <h2>{d.capitulos[1].titulo}</h2>
          <p>
            Observa el espacio entre la nariz y el borde derecho. Al acercar el corte, el fondo deja
            de conducir la mirada.
          </p>
        </header>
        <div className="op-selector" role="group" aria-label="Encuadre">
          {[1, 2].map((i) => (
            <button key={i} aria-pressed={corte === i} onClick={() => elegir(i)}>
              {pruebas[i].nombre}
            </button>
          ))}
        </div>
        <div className="op-diptico">
          {[1, 2].map((i) => (
            <figure key={i} data-activo={i === corte}>
              <Toma d={d} i={i} />
              <figcaption>{pruebas[i].nombre}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section id="hoja-de-contactos" className="op-pruebas">
        <header>
          <h2>Hoja de contactos</h2>
          <p>Una toma, tres decisiones. Selecciona una prueba para examinarla.</p>
        </header>
        <div className="op-mesa">
          <div className="op-contactos" role="group" aria-label="Prueba ampliada">
            {pruebas.map((p, i) => (
              <button key={p.nombre} onClick={() => ampliar(i)} aria-pressed={prueba === i}>
                <Toma d={d} i={i} mini />
                <span>{p.nombre}</span>
              </button>
            ))}
          </div>
          <figure>
            <Toma d={d} i={prueba} />
            <figcaption aria-live="polite">{pruebas[prueba].nota}</figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}
