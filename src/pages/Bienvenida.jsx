import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
import { precargar } from "../rutasDemo"
import { Indice } from "./CvPiezas"
import { useSeccionActiva } from "./cvSecciones"
import "./cv.css"

// Página principal: CV web y portafolio (V4.8, ficha en docs/FICHA_CV.md).
// Escritorio: identidad a la izquierda, CV al centro y demos a la derecha, cada columna con su
// propio desplazamiento. Celular: una sola lectura con cabecera propia; la lista de demos existe
// una sola vez y en el celular se abre desde la cabecera (decisión de Ian, 21/11/2026).

function Foto() {
  // Foto provisional que Ian eligió (22/11/2026) mientras consigue una más profesional.
  return (
    <figure className="cv-foto">
      <img
        src="/cv/ian-640.webp"
        srcSet="/cv/ian-360.webp 360w, /cv/ian-640.webp 640w, /cv/ian-1024.webp 1024w"
        sizes="(max-width: 899px) 100vw, 260px"
        width="640"
        height="800"
        alt={`Retrato de ${PERSONA.nombre}`}
        fetchPriority="high"
        decoding="async"
      />
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
            className="cv-boton cv-boton-acento"
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

// Flecha de enlace externo: se desplaza en diagonal al pasar el cursor o enfocar.
function Flecha() {
  return (
    <svg className="cv-flecha" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" />
    </svg>
  )
}

// Entrada del CV: fecha a la izquierda y relato a la derecha. Si tiene enlace, toda la tarjeta
// responde al cursor (el enlace se extiende con ::after) y las hermanas se atenúan.
function Entrada({ periodo, titulo, lugar, puntos = [], stack, url }) {
  return (
    <li className="cv-item">
      <p className="cv-periodo">{periodo}</p>
      <div className="cv-item-texto">
        <h3>
          {url === "/" ? (
            <Link className="cv-item-enlace" to="/">
              {titulo}
              <Flecha />
            </Link>
          ) : url ? (
            <a className="cv-item-enlace" href={url} target="_blank" rel="noopener">
              {titulo}
              <Flecha />
              <span className="cv-oculto"> (se abre en otra pestaña)</span>
            </a>
          ) : (
            titulo
          )}
        </h3>
        {lugar && <p className="cv-lugar">{lugar}</p>}
        {puntos.length > 0 && (
          <ul className="cv-puntos">
            {puntos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        {stack && (
          <ul className="cv-etiquetas" aria-label="Tecnologías">
            {stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

function ListaDemos({ alElegir }) {
  return (
    <ul className="cv-demos">
      {DEMOS.map((d) => {
        const contenido = (
          <>
            <img
              className="cv-miniatura"
              src={`/cv/demos/${d.id}.webp`}
              alt=""
              width="480"
              height="270"
              loading="lazy"
              decoding="async"
              style={{ "--tono": d.color }}
            />
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
          </>
        )
        return (
          <li key={d.id}>
            {disponible(d) ? (
              <Link
                to={d.ruta}
                className="cv-demo"
                onClick={(e) => alElegir(e, d)}
                onPointerEnter={() => precargar(d.ruta)}
                onFocus={() => precargar(d.ruta)}
              >
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
  const [salida, setSalida] = useState(null)
  const boton = useRef(null)
  const centro = useRef(null)
  const navigate = useNavigate()
  const [activa, marcarSeccion] = useSeccionActiva(centro)

  // Transición de la demo: su miniatura se cubre con el color de la demo, que crece hasta llenar la pantalla y la demo entra
  // con un fundido (View Transitions). Sin soporte o con movimiento reducido, navega directo.
  const abrirDemo = (e, d) => {
    setAbierto(false)
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    const reducido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reducido || !document.startViewTransition) {
      navigate(d.ruta)
      return
    }
    const r = e.currentTarget.querySelector(".cv-miniatura").getBoundingClientRect()
    setSalida({
      color: d.color,
      t: r.top,
      r: innerWidth - r.right,
      b: innerHeight - r.bottom,
      l: r.left,
    })
    Promise.all([precargar(d.ruta), new Promise((ok) => setTimeout(ok, 300))]).then(() =>
      navigate(d.ruta, { viewTransition: true }),
    )
  }

  const irASeccion = (e, id) => {
    e.preventDefault()
    const destino = document.getElementById(id)
    marcarSeccion(id)
    centro.current?.scrollTo({
      top: destino.closest("section").offsetTop - 40,
      behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
    destino.focus({ preventScroll: true })
  }

  // Reflector cálido que sigue al cursor (solo con mouse; en celular no existe).
  const moverReflector = (e) => {
    if (e.pointerType !== "mouse") return
    e.currentTarget.style.setProperty("--px", `${e.clientX}px`)
    e.currentTarget.style.setProperty("--py", `${e.clientY}px`)
  }

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

  return (
    <div
      className="cv-root"
      data-demos={abierto ? "abierto" : undefined}
      onPointerMove={moverReflector}
    >
      <a className="cv-saltar" href="#contenido">
        Saltar al CV
      </a>
      <header className="cv-barra">
        <span className="cv-barra-nombre">Ian Aldana</span>
        <button
          ref={boton}
          type="button"
          className="cv-boton cv-barra-boton"
          aria-expanded={abierto}
          aria-controls="demos"
          onClick={() => setAbierto((v) => !v)}
        >
          Demos <span aria-hidden="true">{abierto ? "▴" : "▾"}</span>
        </button>
        <Link to="/cotizador" className="cv-boton cv-boton-acento cv-barra-boton">
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

        <Indice activa={activa} onIr={irASeccion} />

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
                <dt>Ciudad</dt>
                <dd>{PERSONA.ciudad}</dd>
              </div>
            </dl>
          </section>
          <section aria-labelledby="cv-idiomas">
            <h2 id="cv-idiomas">Idiomas</h2>
            <dl className="cv-tabla">
              {IDIOMAS.map((i) => (
                <div key={i.idioma}>
                  <dt>{i.idioma}</dt>
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

      <main id="contenido" ref={centro} tabIndex={-1} className="cv-centro">
        <section className="cv-seccion" style={{ "--i": 0 }} aria-labelledby="cv-resumen">
          <h2 id="cv-resumen" tabIndex={-1}>
            Resumen
          </h2>
          <p className="cv-resumen">{RESUMEN}</p>
        </section>
        <section className="cv-seccion" style={{ "--i": 1 }} aria-labelledby="cv-proyectos">
          <h2 id="cv-proyectos" tabIndex={-1}>
            Proyectos
          </h2>
          <ol className="cv-lista">
            {PROYECTOS.map((p) => (
              <Entrada
                key={p.id}
                periodo={p.periodo}
                titulo={p.puesto}
                lugar={p.lugar}
                puntos={p.puntos}
                stack={p.stack}
                url={p.url}
              />
            ))}
          </ol>
        </section>
        <section className="cv-seccion" style={{ "--i": 2 }} aria-labelledby="cv-experiencia">
          <h2 id="cv-experiencia" tabIndex={-1}>
            Experiencia
          </h2>
          <ol className="cv-lista">
            {EXPERIENCIA.map((e) => (
              <Entrada
                key={e.id}
                periodo={e.periodo}
                titulo={e.puesto}
                lugar={e.lugar}
                puntos={e.puntos}
                stack={e.stack}
                url={e.url}
              />
            ))}
          </ol>
        </section>
        <section className="cv-seccion" style={{ "--i": 3 }} aria-labelledby="cv-educacion">
          <h2 id="cv-educacion" tabIndex={-1}>
            Educación
          </h2>
          <ol className="cv-lista">
            {EDUCACION.map((e) => (
              <Entrada
                key={e.id}
                periodo={e.periodo}
                titulo={e.titulo}
                lugar={e.lugar}
                puntos={[e.nota]}
              />
            ))}
          </ol>
        </section>
        <section className="cv-seccion" style={{ "--i": 4 }} aria-labelledby="cv-certificaciones">
          <h2 id="cv-certificaciones" tabIndex={-1}>
            Certificaciones
          </h2>
          <ol className="cv-lista">
            {CERTIFICACIONES.map((c) => (
              <Entrada
                key={c.id}
                periodo={`${c.anio} · ${c.horas} h`}
                titulo={c.titulo}
                lugar={c.lugar}
                url={c.pdf}
              />
            ))}
          </ol>
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
        <ListaDemos alElegir={abrirDemo} />
        <div className="cv-cotizar">
          <p className="cv-cotizar-titulo">¿Quieres un sitio así?</p>
          <p>Parte de una demo y ajusta las funciones a tu negocio.</p>
          <Link to="/cotizador" className="cv-boton cv-boton-acento">
            Cotizar un sitio
            <Flecha />
          </Link>
        </div>
      </aside>
      {salida && (
        <div
          className="cv-salida"
          aria-hidden="true"
          style={{
            "--tono": salida.color,
            "--t": `${salida.t}px`,
            "--r": `${salida.r}px`,
            "--b": `${salida.b}px`,
            "--l": `${salida.l}px`,
          }}
        />
      )}
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
