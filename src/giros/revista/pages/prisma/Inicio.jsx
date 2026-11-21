import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import Portada from "../../components/prisma/Portada"
import Acciones from "../../components/prisma/Acciones"
import Autores from "../../components/prisma/Autores"
import { ARTICULOS, EDITOR, findArticulo, foto, nombresAutores, populares } from "../../data/prisma"

const miles = new Intl.NumberFormat("es-MX")
const PERIODOS = [
  ["semana", "Semana"],
  ["mes", "Mes"],
  ["siempre", "Siempre"],
]

function Estado({ a }) {
  return a.revisado ? (
    <span className="pr-chip pr-chip-ok">Revisado por pares</span>
  ) : (
    <span className="pr-chip pr-chip-pre">Preimpresión · sin revisión por pares</span>
  )
}

export default function Inicio() {
  const [elegido, setElegido] = useState(ARTICULOS[0].id)
  const [periodo, setPeriodo] = useState("semana")
  const fila = useRef(null)
  const a = findArticulo(elegido)
  const tendencia = [...ARTICULOS]
    .sort((x, y) => y.calificacion - x.calificacion || y.n - x.n)
    .slice(0, 6)
  const ultimas = ARTICULOS.slice(0, 6)
  const editor = findArticulo(EDITOR)
  const mover = (dir) => fila.current?.scrollBy({ left: dir * 480, behavior: "smooth" })

  return (
    <main>
      <h1 className="rv-oculto">Prisma: ciencia y tecnología en acceso abierto</h1>
      <section className="pr-w pr-estante" aria-labelledby="pr-num-titulo">
        <div className="pr-sc">
          <h2 id="pr-num-titulo">Números</h2>
          <span className="pr-meta">Elige uno para ver de qué trata</span>
          <div className="pr-flechas">
            <button
              type="button"
              aria-label="Desplazar los números a la izquierda"
              onClick={() => mover(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Desplazar los números a la derecha"
              onClick={() => mover(1)}
            >
              ›
            </button>
          </div>
        </div>
        <ul className="pr-fila" ref={fila}>
          {ARTICULOS.map((x) => (
            <li key={x.id}>
              <button
                type="button"
                className="pr-num"
                aria-pressed={x.id === elegido}
                aria-label={`N.º ${x.n}: ${x.titulo}`}
                onClick={() => setElegido(x.id)}
              >
                <Portada articulo={x} carga={x.n > 16 ? "eager" : "lazy"} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="pr-selbg" style={{ "--c": a.color }} aria-hidden="true">
        {/* Fondo desvanecido: es lo más grande de la pantalla (el elemento de la carga). En
            celular basta la versión de 480 px, porque se ve tenue y difuminado. */}
        <img
          src={foto(a.foto)}
          srcSet={`${foto(a.foto, 480)} 480w, ${foto(a.foto, 1000)} 1000w`}
          sizes="(max-width: 900px) 160px, 60vw"
          alt=""
          key={a.id}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <section className="pr-w pr-sel" aria-labelledby="pr-sel-titulo" aria-live="polite">
        <Portada articulo={a} grande sizes="(max-width: 900px) 240px, 330px" carga="eager" />
        <div className="pr-sel-txt" key={a.id}>
          <p className="pr-meta">
            Vol. 4 · N.º {a.n} · {a.fecha}
          </p>
          <h2 id="pr-sel-titulo">{a.titulo}</h2>
          <div className="pr-chips">
            <Estado a={a} />
            <span className="pr-chip pr-chip-az">{a.areaNombre}</span>
            <span className="pr-chip">Acceso abierto · CC BY 4.0</span>
          </div>
          <p className="pr-desc">{a.resumen}</p>
          <Autores ids={a.autores} />
          <Acciones articulo={a} />
          <p className="pr-meta">
            {miles.format(a.cifras.lecturas)} lecturas · {miles.format(a.cifras.descargas)}{" "}
            descargas · {a.cifras.citas} citas · {a.cifras.comentarios} comentarios · cifras de
            ejemplo
          </p>
        </div>
      </section>

      <div className="pr-w pr-dos">
        <div>
          <section className="pr-caja" aria-labelledby="pr-tend-titulo">
            <div className="pr-sc">
              <h2 id="pr-tend-titulo">En tendencia</h2>
            </div>
            <ul className="pr-tend">
              {tendencia.map((x) => (
                <li key={x.id}>
                  <Link to={`/revista/prisma/articulo/${x.id}`}>
                    <Portada articulo={x} sizes="140px" />
                    <b>{x.titulo}</b>
                  </Link>
                  <span>{nombresAutores(x).join(" y ")}</span>
                  <em>★ {x.calificacion}</em>
                </li>
              ))}
            </ul>
          </section>
          <section className="pr-caja" aria-labelledby="pr-ult-titulo">
            <div className="pr-sc">
              <h2 id="pr-ult-titulo">Últimas publicaciones</h2>
            </div>
            <ul className="pr-ult">
              {ultimas.map((x) => (
                <li key={x.id}>
                  <img src={foto(x.foto, 480)} alt="" loading="lazy" width={76} height={100} />
                  <div>
                    <Link to={`/revista/prisma/articulo/${x.id}`}>{x.titulo}</Link>
                    <p>
                      <span className="pr-v">Versión {x.version}</span>
                      <span>{x.fecha}</span>
                    </p>
                    <p>
                      <span className={x.revisado ? "pr-ok" : "pr-pre"}>
                        {x.revisado ? "Revisado por pares" : "Preimpresión"}
                      </span>
                      <span>{nombresAutores(x)[0]}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="pr-lado">
          <section className="pr-caja pr-pop" aria-labelledby="pr-pop-titulo">
            <div className="pr-sc">
              <h2 id="pr-pop-titulo">Populares</h2>
              <div className="pr-tabs" role="group" aria-label="Periodo">
                {PERIODOS.map(([id, n]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={periodo === id}
                    onClick={() => setPeriodo(id)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <ol>
              {populares(periodo).map((x, k) => (
                <li key={x.id}>
                  <span className="pr-rk" aria-hidden="true">
                    {k + 1}
                  </span>
                  <img src={foto(x.foto, 480)} alt="" loading="lazy" width={56} height={74} />
                  <div>
                    <Link to={`/revista/prisma/articulo/${x.id}`}>{x.titulo}</Link>
                    <span className="pr-ar">{x.areaNombre}</span>
                    <em>★ {x.calificacion}</em>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <Link className="pr-editor" to={`/revista/prisma/articulo/${editor.id}`}>
            <img src={foto(editor.foto)} alt="" loading="lazy" />
            <span>
              <small>Selección del editor</small>
              <b>{editor.titulo}</b>
            </span>
          </Link>
        </aside>
      </div>
    </main>
  )
}
