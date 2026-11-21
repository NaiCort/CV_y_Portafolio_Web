import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import useFavicon from "../hooks/useFavicon"
import usePageMetadata from "../hooks/usePageMetadata"
import useRouteFocus from "../hooks/useRouteFocus"
import { DEMOS, ESTADOS, disponible } from "../data/demos"
import {
  CERTIFICACIONES,
  CONTACTO,
  CV_VERSION,
  DOCUMENTOS,
  EDUCACION,
  EXPERIENCIA,
  HABILIDADES,
  IDIOMAS,
  PERSONA,
  PROYECTOS,
  RESUMEN,
} from "../data/cv"
import "./cv.css"

// Página principal: CV web y portafolio (V4.8, ficha en docs/FICHA_CV.md).
// Escritorio: identidad a la izquierda, CV al centro y demos a la derecha, cada columna con su
// propio desplazamiento. Celular: una sola lectura con cabecera propia; la lista de demos existe
// una sola vez y en el celular se abre desde la cabecera (decisión de Ian, 21/11/2026).

function Foto() {
  // Provisional hasta que Ian entregue su fotografía.
  return (
    <figure className="cv-foto">
      <svg viewBox="0 0 120 120" role="img" aria-label="Espacio para la fotografía de Ian">
        <rect width="120" height="120" fill="currentColor" opacity=".14" />
        <circle cx="60" cy="48" r="21" fill="currentColor" opacity=".32" />
        <path d="M18 120c5-27 22-40 42-40s37 13 42 40z" fill="currentColor" opacity=".32" />
      </svg>
      <figcaption>Foto provisional</figcaption>
    </figure>
  )
}

function Documentos() {
  return (
    <div className="cv-docs">
      {DOCUMENTOS.map((d) =>
        d.disponible ? (
          <a
            key={d.id}
            className="cv-boton cv-boton-lleno"
            href={d.url}
            target="_blank"
            rel="noopener"
          >
            {d.etiqueta}
          </a>
        ) : (
          <span key={d.id} className="cv-boton cv-boton-pronto" aria-disabled="true">
            {d.etiqueta.replace(" (PDF)", "")} · pronto
          </span>
        ),
      )}
    </div>
  )
}

function Entrada({ periodo, titulo, lugar, puntos = [], stack, url, actual }) {
  return (
    <article className="cv-entrada" data-actual={actual ? "" : undefined}>
      <p className="cv-periodo">{periodo}</p>
      <div className="cv-entrada-texto">
        <h3>{titulo}</h3>
        {lugar && <p className="cv-lugar">{lugar}</p>}
        {puntos.length > 0 && (
          <ul>
            {puntos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        {stack && <p className="cv-stack">{stack.join(" · ")}</p>}
        {url && (
          <a className="cv-enlace" href={url} target="_blank" rel="noopener">
            {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            <span aria-hidden="true"> ↗</span>
          </a>
        )}
      </div>
    </article>
  )
}

function ListaDemos({ alElegir }) {
  return (
    <ul className="cv-demos">
      {DEMOS.map((d) => {
        const contenido = (
          <>
            <span className="cv-tono" style={{ "--tono": d.color }} aria-hidden="true" />
            <span className="cv-demo-cabeza">
              <b>{d.nombre}</b>
              <span className="cv-estado" data-estado={d.estado}>
                {ESTADOS[d.estado]}
              </span>
            </span>
            <span className="cv-demo-giro">
              {d.giro}. {d.resumen}
            </span>
            {d.variantes.length > 0 && (
              <span className="cv-demo-variantes">
                {d.variantes.length} {d.id === "revista" ? "sitios" : "temas"}:{" "}
                {d.variantes.map((v) => v.nombre).join(", ")}
              </span>
            )}
            <code className="cv-demo-id">id: {d.id}</code>
          </>
        )
        return (
          <li key={d.id}>
            {disponible(d) ? (
              <Link to={d.ruta} className="cv-demo" onClick={alElegir}>
                {contenido}
              </Link>
            ) : (
              <div className="cv-demo" aria-disabled="true">
                {contenido}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function Bienvenida() {
  usePageMetadata(
    `${PERSONA.nombre} · CV y portafolio`,
    "Ingeniero en Sistemas Computacionales en Xalapa: SQL, PostgreSQL y backend. CV, proyectos y siete demos interactivas por giro de negocio.",
  )
  useFavicon("/favicon.svg")
  useRouteFocus()
  const [abierto, setAbierto] = useState(false)
  const boton = useRef(null)

  useEffect(() => {
    if (!abierto) return
    const cerrar = (e) => {
      if (e.key === "Escape") {
        setAbierto(false)
        boton.current?.focus()
      }
    }
    document.addEventListener("keydown", cerrar)
    return () => document.removeEventListener("keydown", cerrar)
  }, [abierto])

  const verDemos = (e) => {
    // En celular la lista vive en el desplegable; en escritorio basta con el ancla.
    if (window.matchMedia?.("(max-width: 899px)").matches) {
      e.preventDefault()
      setAbierto(true)
    }
  }

  return (
    <div className="cv-root" data-demos={abierto ? "abierto" : undefined}>
      <header className="cv-barra">
        <span className="cv-barra-nombre">Ian Aldana</span>
        <button
          ref={boton}
          type="button"
          className="cv-barra-boton"
          aria-expanded={abierto}
          aria-controls="demos"
          onClick={() => setAbierto((v) => !v)}
        >
          Demos <span aria-hidden="true">{abierto ? "▴" : "▾"}</span>
        </button>
        <Link to="/cotizador" className="cv-barra-boton cv-barra-cotizar">
          Cotizar
        </Link>
      </header>

      <aside className="cv-izq" aria-label="Identidad y contacto">
        <div className="cv-identidad">
          <Foto />
          <div className="cv-nombre-bloque">
            <h1 className="cv-nombre">{PERSONA.nombre}</h1>
            <p className="cv-titulo">{PERSONA.titulo}</p>
            <ul className="cv-enfoque" aria-label="Enfoque">
              {PERSONA.enfoque.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <Documentos />
        </div>

        <div className="cv-datos">
          <section aria-labelledby="cv-contacto">
            <h2 id="cv-contacto">Contacto</h2>
            <dl className="cv-tabla">
              {CONTACTO.map((c) => (
                <div key={c.id}>
                  <dt>{c.campo}</dt>
                  <dd>
                    <a href={c.url} target="_blank" rel="noopener">
                      {c.texto}
                    </a>
                  </dd>
                </div>
              ))}
              <div>
                <dt>ciudad</dt>
                <dd>{PERSONA.ciudad}</dd>
              </div>
            </dl>
          </section>
          <section aria-labelledby="cv-idiomas">
            <h2 id="cv-idiomas">Idiomas</h2>
            <dl className="cv-tabla">
              {IDIOMAS.map((i) => (
                <div key={i.idioma}>
                  <dt>{i.idioma.toLowerCase()}</dt>
                  <dd>{i.nivel}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section aria-labelledby="cv-habilidades" className="cv-habilidades">
            <h2 id="cv-habilidades">Habilidades</h2>
            {HABILIDADES.map((h) => (
              <div key={h.grupo}>
                <h3>{h.grupo}</h3>
                <ul>
                  {h.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </aside>

      <main id="contenido" tabIndex={-1} className="cv-centro">
        <section className="cv-seccion" style={{ "--i": 0 }} aria-labelledby="cv-resumen">
          <h2 id="cv-resumen">Resumen</h2>
          <p className="cv-resumen">{RESUMEN}</p>
        </section>
        <section className="cv-seccion" style={{ "--i": 1 }} aria-labelledby="cv-proyectos">
          <h2 id="cv-proyectos">Proyectos</h2>
          {PROYECTOS.map((p, i) => (
            <div key={p.id} className="cv-proyecto">
              <Entrada
                periodo={p.periodo}
                titulo={p.nombre}
                lugar={p.tipo}
                puntos={p.puntos}
                stack={p.stack}
                url={p.url}
                actual={i === 0}
              />
              {p.enlaceInterno && (
                <a className="cv-enlace cv-ver-demos" href={p.enlaceInterno} onClick={verDemos}>
                  Ver las {DEMOS.length} demos
                </a>
              )}
            </div>
          ))}
        </section>
        <section className="cv-seccion" style={{ "--i": 2 }} aria-labelledby="cv-experiencia">
          <h2 id="cv-experiencia">Experiencia</h2>
          {EXPERIENCIA.map((e) => (
            <Entrada
              key={e.id}
              periodo={e.periodo}
              titulo={e.puesto}
              lugar={`${e.lugar} · ${e.ciudad}`}
              puntos={e.puntos}
            />
          ))}
        </section>
        <section className="cv-seccion" style={{ "--i": 3 }} aria-labelledby="cv-educacion">
          <h2 id="cv-educacion">Educación</h2>
          {EDUCACION.map((e) => (
            <Entrada
              key={e.id}
              periodo={e.periodo}
              titulo={e.titulo}
              lugar={e.lugar}
              puntos={[e.nota]}
              actual={e.id === "maestria"}
            />
          ))}
        </section>
        <section className="cv-seccion" style={{ "--i": 4 }} aria-labelledby="cv-certificaciones">
          <h2 id="cv-certificaciones">Certificaciones</h2>
          {CERTIFICACIONES.map((c) => (
            <Entrada
              key={c.id}
              periodo={`${c.anio} · ${c.horas} h`}
              titulo={c.titulo}
              lugar={c.lugar}
            />
          ))}
        </section>
        <p className="cv-pie">
          CV actualizado en {CV_VERSION.etiqueta.toLowerCase()}. Los datos coinciden con el PDF y
          con LinkedIn.
        </p>
      </main>

      <aside id="demos" className="cv-der" aria-labelledby="cv-demos-titulo">
        <h2 id="cv-demos-titulo">Demos</h2>
        <p className="cv-der-nota">
          Sitios de ejemplo, uno por giro de negocio. Los negocios son ficticios; todo lo que se
          puede tocar funciona.
        </p>
        <ListaDemos alElegir={() => setAbierto(false)} />
        <div className="cv-cotizar">
          <p className="cv-cotizar-titulo">¿Quieres un sitio así?</p>
          <p>Parte de una demo y ajusta las funciones a tu negocio.</p>
          <Link to="/cotizador" className="cv-boton cv-boton-lleno">
            Cotizar un sitio
          </Link>
        </div>
      </aside>
      {abierto && (
        <button
          type="button"
          className="cv-velo"
          aria-label="Cerrar la lista de demos"
          onClick={() => setAbierto(false)}
        />
      )}
    </div>
  )
}
