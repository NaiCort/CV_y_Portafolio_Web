import { useState } from "react"
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import { DOSSIERS, findDossier } from "./data/umbral"
import { useMarcadores } from "./lib/marcadores"
import "./umbral.css"

function Guardar({ d }) {
  const [guardados, alternar] = useMarcadores("umbral")
  const si = guardados.includes(d.id)
  return (
    <button
      className="um-boton"
      type="button"
      aria-label={`${si ? "Quitar de guardados" : "Guardar dossier"}: ${d.titulo}`}
      aria-pressed={si}
      onClick={() => alternar(d.id)}
    >
      {si ? "Quitar de guardados" : "Guardar dossier"}
      <span className="rv-oculto">: {d.titulo}</span>
    </button>
  )
}
function Imagen({ src, alt, className = "", eager = false }) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      width="1200"
      height="1600"
    />
  )
}
function Indice({ guardados = false }) {
  const [disciplina, setDisciplina] = useState("Todas")
  const [ids] = useMarcadores("umbral")
  const lista = DOSSIERS.filter(
    (d) =>
      (!guardados || ids.includes(d.id)) && (disciplina === "Todas" || d.disciplina === disciplina),
  )
  return (
    <section className="um-indice" id="dossiers" aria-labelledby="um-indice-titulo">
      <div className="um-indice-cab">
        <h2 id="um-indice-titulo">{guardados ? "Tus guardados" : "Dossiers abiertos"}</h2>
        <label>
          Disciplina{" "}
          <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)}>
            <option>Todas</option>
            <option>Fotografía</option>
            <option>Diseño</option>
          </select>
        </label>
      </div>
      <p role="status">
        {lista.length} {lista.length === 1 ? "dossier" : "dossiers"}
      </p>
      {lista.length ? (
        <ul className="um-lista">
          {lista.map((d) => (
            <li key={d.id}>
              <Link to={`/revista/umbral/dossier/${d.id}`}>
                <Imagen src={d.mini} alt="Fotografía ilustrativa de este dossier" />
                <div>
                  <span>{d.disciplina}</span>
                  <h3>{d.titulo}</h3>
                  <p>{d.entradilla}</p>
                  <span>Leer dossier</span>
                </div>
              </Link>
              <Guardar d={d} />
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Aquí aparecerán los dossiers que guardes. <Link to="/revista/umbral">Explora Umbral</Link>
          .
        </p>
      )}
    </section>
  )
}
function Inicio() {
  const d = DOSSIERS[0]
  usePageMetadata(
    "Umbral — Fotografía, diseño y cultura visual · Demo de Ian Aldana Martínez",
    "Dos dossiers ficticios sobre fotografía y composición, con lectura, proceso creativo y guardados locales.",
  )
  return (
    <main id="um-contenido" className="um-main">
      <section className="um-portada" aria-labelledby="um-titulo">
        <h1 id="um-titulo" className="um-masthead">
          Umbral
        </h1>
        <div className="um-portada-imagen">
          <Imagen src={d.foto} alt="Retrato ilustrativo para el ensayo Entre líneas" eager />
          <span className="um-recorte" aria-hidden="true">
            Entre
            <br />
            líneas
          </span>
        </div>
        <div className="um-portada-texto">
          <p className="um-entrada">Historias que empiezan en la mirada.</p>
          <p>
            Una imagen puede abrir una conversación. Dos dossiers para descubrir cómo se construye
            un relato visual.
          </p>
          <Link className="um-boton um-principal" to={`/revista/umbral/dossier/${d.id}`}>
            Leer Entre líneas
          </Link>
          <p className="um-nota">
            Publicación ficticia. Relatos y creador de ejemplo; fotografías ilustrativas.
          </p>
        </div>
      </section>
      <Indice />
      <section className="um-estudio">
        <h2>Antes de la imagen final</h2>
        <p>
          Encuadres, decisiones y preguntas. En cada dossier puedes alternar entre el relato y el
          proceso creativo.
        </p>
        <Link to="/revista/umbral/creador/nicolas-vera">Conoce al creador de ejemplo</Link>
      </section>
    </main>
  )
}
function Dossier() {
  const { id } = useParams()
  const d = findDossier(id)
  const [proceso, setProceso] = useState(false)
  usePageMetadata(
    `${d?.titulo ?? "Dossier"} — Umbral · Demo de Ian Aldana Martínez`,
    d?.entradilla ?? "Historias visuales ficticias de Umbral.",
  )
  if (!d) return <Navigate to="/revista/umbral" replace />
  return (
    <main id="um-contenido" className="um-main" style={{ "--um-acento": d.color }}>
      <header className="um-apertura">
        <nav aria-label="Ruta">
          <Link to="/revista/umbral">Umbral</Link> / {d.disciplina}
        </nav>
        <h1>{d.titulo}</h1>
        <p className="um-entrada">{d.entradilla}</p>
        <p>
          Por <Link to="/revista/umbral/creador/nicolas-vera">{d.autor}</Link> · Relato ficticio
        </p>
        <Guardar d={d} />
      </header>
      <figure className="um-foto-abierta">
        <Imagen src={d.foto} alt="Fotografía ilustrativa del dossier, mostrada completa" eager />
        <figcaption>
          Fotografía ilustrativa de Unsplash; la persona no es el creador ni un protagonista real
          del relato. <Link to="/revista/umbral/creditos">Ver procedencia</Link>.
        </figcaption>
      </figure>
      <section className="um-lectura" aria-label="Lectura del dossier">
        <div className="um-modos" role="group" aria-label="Vista del dossier">
          <button type="button" aria-pressed={!proceso} onClick={() => setProceso(false)}>
            Leer historia
          </button>
          <button type="button" aria-pressed={proceso} onClick={() => setProceso(true)}>
            Ver proceso
          </button>
        </div>
        {proceso ? (
          <div className="um-proceso">
            <h2>Cómo se construye esta pieza</h2>
            <ol>
              {d.proceso.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p>
              Esta explicación es un ejercicio editorial ficticio; no documenta la producción de las
              fotografías originales.
            </p>
          </div>
        ) : (
          <article>
            {d.capitulos.map((s) => (
              <section key={s.titulo}>
                <h2>{s.titulo}</h2>
                <p>{s.texto}</p>
                {s.cita && <blockquote>{s.cita}</blockquote>}
              </section>
            ))}
          </article>
        )}
        <figure>
          <Imagen
            src={d.detalle}
            alt="Segunda fotografía ilustrativa para explorar otra composición"
          />
          <figcaption>
            Otra mirada. Imagen ilustrativa;{" "}
            <Link to="/revista/umbral/creditos">créditos de la fotografía</Link>.
          </figcaption>
        </figure>
        <p>
          <Link to={`/revista/umbral/dossier/${DOSSIERS.find((x) => x.id !== d.id).id}`}>
            Continuar con {DOSSIERS.find((x) => x.id !== d.id).titulo}
          </Link>
        </p>
      </section>
    </main>
  )
}
function Creador() {
  usePageMetadata(
    "Nicolás Vera — Umbral · Perfil de ejemplo",
    "Creador ficticio de los dossiers de Umbral.",
  )
  return (
    <main id="um-contenido" className="um-main">
      <header className="um-apertura">
        <h1>Nicolás Vera</h1>
        <p className="um-entrada">Mirar, recortar, volver a mirar.</p>
        <p>
          Creador ficticio de Umbral. Sus ensayos de ejemplo exploran la relación entre fotografía,
          espacio y tipografía. No es la persona de las fotografías.
        </p>
      </header>
      <Indice />
    </main>
  )
}
function Guardados() {
  usePageMetadata(
    "Guardados — Umbral · Demo de Ian Aldana Martínez",
    "Dossiers guardados solo en este navegador.",
  )
  return (
    <main id="um-contenido" className="um-main">
      <header className="um-apertura">
        <h1>Tu próxima mirada</h1>
        <p>Cuenta de ejemplo. Tus guardados permanecen en este navegador.</p>
      </header>
      <Indice guardados />
    </main>
  )
}
function DossierRuta() {
  const { id } = useParams()
  return <Dossier key={id} />
}
export default function UmbralSitio() {
  useFavicon("/favicons/revista.svg")
  const [guardados] = useMarcadores("umbral")
  return (
    <div className="um-root">
      <header className="um-cab">
        <Link to="/revista" aria-label="Volver a elegir revista">
          Revistas
        </Link>
        <Link className="um-marca" to="/revista/umbral">
          Umbral
        </Link>
        <nav aria-label="Umbral">
          <Link to="/revista/umbral#dossiers">Dossiers</Link>
          <Link to="/revista/umbral/creador/nicolas-vera">Creador</Link>
          <Link to="/revista/umbral/guardados">Guardados ({guardados.length})</Link>
        </nav>
      </header>
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="dossier/:id" element={<DossierRuta />} />
        <Route path="creador/nicolas-vera" element={<Creador />} />
        <Route path="guardados" element={<Guardados />} />
        <Route path="*" element={<Navigate to="/revista/umbral" replace />} />
      </Routes>
      <footer className="um-pie">
        <b>Umbral</b>
        <p>
          Fotografía, diseño y cultura visual. Publicación ficticia en acceso abierto, creada para
          el portafolio de Ian Aldana Martínez.
        </p>
        <Link to="/revista">Elegir otra revista</Link>
      </footer>
    </div>
  )
}
