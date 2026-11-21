import { useState } from "react"
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom"
import ComercialCTA from "../../components/shared/ComercialCTA"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import Cartel from "./components/umbral/Cartel"
import { Barras, Caligrafia, Registro } from "./components/umbral/Adornos"
import {
  ARCHIVO,
  CREADOR,
  DOSSIERS,
  FOTOS_UMBRAL,
  findArchivo,
  findDossier,
  fotoUmbral,
  srcSetUmbral,
} from "./data/umbral"
import { useMarcadores } from "./lib/marcadores"
import "./umbral.css"

const MES = "Noviembre 2026"

// Cabecera corrida y folio: lo que hace que cada pantalla se lea como una página de revista.
function Corrida({ izquierda, derecha }) {
  return (
    <p className="um-corrida">
      <span>{izquierda}</span>
      <span>{derecha}</span>
    </p>
  )
}
function Folio({ n, lado = "i" }) {
  return (
    <span className={`um-folio um-folio-${lado}`} aria-hidden="true">
      {lado === "i" ? `${n} · Umbral · ${MES}` : `Umbral · ${MES} · ${n}`}
    </span>
  )
}

function Guardar({ d, claro = false }) {
  const [guardados, alternar] = useMarcadores("umbral")
  const si = guardados.includes(d.id)
  return (
    <button
      className={claro ? "um-boton um-boton-claro" : "um-boton"}
      type="button"
      aria-pressed={si}
      onClick={() => alternar(d.id)}
    >
      {si ? `Quitar de guardados: ${d.titulo}` : `Guardar dossier: ${d.titulo}`}
    </button>
  )
}

function Indice({ guardados = false, filtro = true }) {
  const [disciplina, setDisciplina] = useState("Todas")
  const [ids] = useMarcadores("umbral")
  const lista = DOSSIERS.filter(
    (d) =>
      (!guardados || ids.includes(d.id)) && (disciplina === "Todas" || d.disciplina === disciplina),
  )
  return (
    <section className="um-indice" aria-labelledby="um-indice-titulo">
      <div className="um-indice-cab">
        <h2 id="um-indice-titulo">{guardados ? "Guardados" : "En este número"}</h2>
        {filtro && (
          <label>
            Disciplina
            <select value={disciplina} onChange={(e) => setDisciplina(e.target.value)}>
              <option>Todas</option>
              <option>Fotografía</option>
              <option>Diseño</option>
            </select>
          </label>
        )}
      </div>
      <p className="rv-oculto" role="status">
        {lista.length} {lista.length === 1 ? "dossier" : "dossiers"}
      </p>
      {lista.length ? (
        <ul className="um-lista">
          {lista.map((d) => (
            <li key={d.id}>
              <span className="um-lista-pag" aria-hidden="true">
                {d.pagina}
              </span>
              <img
                src={fotoUmbral(d.foto, 800)}
                alt=""
                width="800"
                height="1066"
                loading="lazy"
                className={`um-lista-mini um-tono-${d.tono}`}
              />
              <div>
                <p className="um-sobre">{d.disciplina}</p>
                <h3>
                  <Link to={`/revista/umbral/dossier/${d.id}`}>{d.titulo}</Link>
                </h3>
                <p>{d.entradilla}</p>
                <Guardar d={d} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="um-vacio">
          Aquí aparecerán los dossiers que guardes. <Link to="/revista/umbral">Ve al sumario</Link>{" "}
          y guarda uno para leerlo después.
        </p>
      )}
    </section>
  )
}

function Inicio() {
  const portada = DOSSIERS[0]
  usePageMetadata(
    "Umbral, N.º 07 — Fotografía, diseño y cultura visual · Demo de Ian Aldana Martínez",
    "Revista ficticia de carteles: dossiers de fotografía y diseño que se desarman capa por capa.",
  )
  return (
    <main className="um-main">
      <section className="um-pliego" aria-labelledby="um-titulo">
        <div className="um-pagina um-pagina-cartel um-tono-noche">
          <Link to={`/revista/umbral/dossier/${portada.id}`} className="um-cartel-enlace">
            <Cartel d={portada} eager />
            <span className="rv-oculto">Leer el dossier «{portada.titulo}»</span>
          </Link>
        </div>
        <div className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida izquierda="Umbral" derecha={`N.º 07 · ${MES}`} />
          <h1 id="um-titulo" className="um-cabecera-revista">
            Umbral
          </h1>
          <p className="um-lema">
            Fotografía, diseño y cultura visual. Una revista de carteles: cada dossier empieza en
            una sola imagen y la desarma frente a ti.
          </p>
          <Indice />
          <Folio n={3} lado="d" />
        </div>
      </section>

      <section className="um-pliego" aria-labelledby="um-archivo-titulo">
        <h2 id="um-archivo-titulo" className="um-pliego-titulo">
          Del archivo
        </h2>
        {ARCHIVO.slice(0, 2).map((n) => (
          <figure key={n.id} className={`um-pagina um-pagina-cartel um-tono-${n.tono}`}>
            <Link to={`/revista/umbral/lamina/${n.id}`} className="um-cartel-enlace">
              <Cartel d={n} />
            </Link>
            <figcaption className="um-pie-lamina">
              <b>N.º {String(n.numero).padStart(2, "0")}</b> · {n.mes} ·{" "}
              <Link to={`/revista/umbral/lamina/${n.id}`}>{n.titulo}: ver la lámina</Link>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="um-pliego um-pliego-colofon" aria-labelledby="um-colofon-titulo">
        <div className="um-pagina um-pagina-texto um-tono-noche">
          <Corrida izquierda="Archivo" derecha="Números anteriores" />
          <h2 className="um-titulo-pagina">Números anteriores</h2>
          <ul className="um-anteriores">
            {ARCHIVO.map((n) => (
              <li key={n.id}>
                <Link to={`/revista/umbral/lamina/${n.id}`}>
                  <img
                    src={fotoUmbral(n.foto, 800)}
                    srcSet={srcSetUmbral(n.foto)}
                    sizes="160px"
                    alt=""
                    loading="lazy"
                  />
                  <span>
                    <b>N.º {String(n.numero).padStart(2, "0")}</b> {n.titulo}
                    <small>{n.mes}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Folio n={6} />
        </div>
        <div className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida izquierda="Colofón" derecha={`N.º 07 · ${MES}`} />
          <h2 id="um-colofon-titulo" className="um-titulo-pagina">
            Colofón
          </h2>
          <dl className="um-colofon">
            <div>
              <dt>Edición, fotografía y diseño</dt>
              <dd>
                <Link to={`/revista/umbral/creador/${CREADOR.id}`}>{CREADOR.nombre}</Link>{" "}
                (personaje ficticio)
              </dd>
            </div>
            <div>
              <dt>Tipografías</dt>
              <dd>
                Archivo, Bodoni Moda, Newsreader y Mrs Saint Delafield, servidas desde el sitio
              </dd>
            </div>
            <div>
              <dt>Fotografías</dt>
              <dd>
                Pexels; las personas no son el creador ni personajes reales.{" "}
                <Link to="/revista/umbral/creditos">Créditos y procedencia</Link>
              </dd>
            </div>
            <div>
              <dt>Música</dt>
              <dd>«Dreamer», de Kevin MacLeod (incompetech.com), CC BY 3.0</dd>
            </div>
          </dl>
          <Caligrafia palabra="despacio" className="um-colofon-firma" />
          <Barras texto="UMBRAL-07" etiqueta="Umbral · N.º 07" className="um-colofon-barras" />
          <Folio n={7} lado="d" />
        </div>
      </section>
    </main>
  )
}

function Despiece({ d }) {
  const [ocultas, setOcultas] = useState([])
  const [separado, setSeparado] = useState(true)
  const alterna = (capa) =>
    setOcultas((o) => (o.includes(capa) ? o.filter((x) => x !== capa) : [...o, capa]))
  return (
    <section className="um-pliego um-proceso" aria-labelledby="um-proceso-titulo">
      <div className={`um-pagina um-pagina-cartel um-tono-${d.tono}`}>
        <Cartel d={d} despiece={separado} ocultas={ocultas} className="um-cartel-despiece" />
        <button
          type="button"
          className="um-boton um-boton-claro um-despiece-boton"
          aria-pressed={separado}
          onClick={() => setSeparado((x) => !x)}
        >
          {separado ? "Juntar las capas" : "Separar las capas"}
        </button>
      </div>
      <div className="um-pagina um-pagina-texto um-tono-papel">
        <Corrida izquierda="Proceso" derecha={d.titulo} />
        <h2 id="um-proceso-titulo" className="um-titulo-pagina">
          Cómo se construye esta pieza
        </h2>
        <p className="um-lema">
          El cartel está hecho de capas, como en un archivo de diseño. Apaga y enciende cada una
          para ver qué aporta.
        </p>
        <ol className="um-pasos">
          {d.proceso.map(([capa, titulo, texto]) => (
            <li key={capa}>
              <div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </div>
              <button
                type="button"
                className="um-interruptor"
                aria-pressed={!ocultas.includes(capa)}
                onClick={() => alterna(capa)}
              >
                <span className="rv-oculto">Capa «{titulo}»: </span>
                {ocultas.includes(capa) ? "Apagada" : "Encendida"}
              </button>
            </li>
          ))}
        </ol>
        <p className="um-nota-pagina">
          Ejercicio editorial ficticio: no documenta la producción de las fotografías originales.
        </p>
      </div>
    </section>
  )
}

function Historia({ d }) {
  const [c1, c2, c3] = d.capitulos
  return (
    <div className="um-lectura">
      <section className="um-pliego" aria-labelledby="um-c1">
        <article className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida izquierda={d.disciplina} derecha={d.titulo} />
          <h2 id="um-c1" className="um-titulo-pagina">
            {c1.titulo}
          </h2>
          <div className="um-columnas um-capitular">
            {c1.texto.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <Folio n={d.pagina + 2} />
        </article>
        <figure className="um-pagina um-pagina-foto">
          <img
            src={fotoUmbral(d.foto)}
            srcSet={srcSetUmbral(d.foto)}
            sizes="(max-width: 900px) 100vw, 50vw"
            alt={d.alt}
            loading="lazy"
          />
          <figcaption>La toma completa, sin recortes. Fotografía ilustrativa (Pexels).</figcaption>
        </figure>
      </section>

      <section className="um-pliego" aria-labelledby="um-c2">
        <article className="um-pagina um-pagina-texto um-tono-papel um-pagina-silueta">
          <Corrida izquierda={d.titulo} derecha={c2.titulo} />
          <img
            className="um-silueta"
            src={fotoUmbral(`${d.recorte}-recorte`, 800)}
            alt=""
            loading="lazy"
            style={{ shapeOutside: `url(${fotoUmbral(`${d.recorte}-recorte`, 800)})` }}
          />
          <h2 id="um-c2" className="um-titulo-pagina">
            {c2.titulo}
          </h2>
          {c2.texto.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <Folio n={d.pagina + 4} />
        </article>
        <div className="um-pagina um-pagina-cita um-tono-noche">
          <blockquote>
            <p>{c2.cita ?? c1.cita}</p>
            <footer>{d.autor}</footer>
          </blockquote>
          <Folio n={d.pagina + 5} lado="d" />
        </div>
      </section>

      <section className="um-pliego um-pliego-triple" aria-labelledby="um-c3">
        <div className="um-triple" aria-hidden="true">
          {d.recortes.map(([nombre, clave, pos, zoom]) => (
            <figure key={nombre}>
              <span>
                <img
                  src={fotoUmbral(clave)}
                  srcSet={srcSetUmbral(clave)}
                  sizes="(max-width: 900px) 100vw, 33vw"
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: pos, transformOrigin: pos, scale: String(zoom) }}
                />
              </span>
              <figcaption>{nombre}</figcaption>
            </figure>
          ))}
        </div>
        <article className="um-pagina um-pagina-texto um-tono-papel um-pagina-ancha">
          <h2 id="um-c3" className="um-titulo-pagina">
            {c3.titulo}
          </h2>
          <div className="um-columnas">
            {c3.texto.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          <Folio n={d.pagina + 6} />
        </article>
      </section>
    </div>
  )
}

function Dossier() {
  const { id } = useParams()
  const d = findDossier(id)
  const [proceso, setProceso] = useState(false)
  usePageMetadata(
    `${d?.titulo ?? "Dossier"} — Umbral · Demo de Ian Aldana Martínez`,
    d?.entradilla ?? "Dossier ficticio de Umbral.",
  )
  if (!d) return <Navigate to="/revista/umbral" replace />
  const otro = DOSSIERS.find((x) => x.id !== d.id)
  const credito = FOTOS_UMBRAL.find(([k]) => k === d.foto)
  return (
    <main className="um-main">
      <section className="um-pliego um-apertura" aria-labelledby="um-dossier-titulo">
        <div className={`um-pagina um-pagina-cartel um-tono-${d.tono}`}>
          <Cartel d={d} eager />
        </div>
        <div className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida
            izquierda={<Link to="/revista/umbral">Umbral</Link>}
            derecha={`N.º 07 · ${d.disciplina} · p. ${d.pagina}`}
          />
          <p className="um-sobre">{d.disciplina}</p>
          <h1 id="um-dossier-titulo" className="um-titulo-dossier">
            {d.titulo}
          </h1>
          <p className="um-entradilla">{d.entradilla}</p>
          <p className="um-firma">
            Por <Link to={`/revista/umbral/creador/${CREADOR.id}`}>{d.autor}</Link> · Relato
            ficticio
          </p>
          <div className="um-acciones">
            <Guardar d={d} />
            <div className="um-modos" role="group" aria-label="Vista del dossier">
              <button type="button" aria-pressed={!proceso} onClick={() => setProceso(false)}>
                Leer historia
              </button>
              <button type="button" aria-pressed={proceso} onClick={() => setProceso(true)}>
                Ver proceso
              </button>
            </div>
          </div>
          <p className="um-credito">
            Fotografía de portada: Pexels ({credito?.[2]}).{" "}
            <Link to="/revista/umbral/creditos">Procedencia</Link>.
          </p>
          <Folio n={d.pagina + 1} lado="d" />
        </div>
      </section>

      {proceso ? <Despiece d={d} /> : <Historia d={d} />}

      <section className="um-pliego um-cierre" aria-labelledby="um-sigue">
        <div className={`um-pagina um-pagina-cartel um-tono-${otro.tono}`}>
          <Link to={`/revista/umbral/dossier/${otro.id}`} className="um-cartel-enlace">
            <Cartel d={otro} />
          </Link>
        </div>
        <div className="um-pagina um-pagina-texto um-tono-noche">
          <Corrida izquierda="Sigue leyendo" derecha={`p. ${otro.pagina}`} />
          <h2 id="um-sigue" className="um-titulo-pagina">
            Continuar con <Link to={`/revista/umbral/dossier/${otro.id}`}>{otro.titulo}</Link>
          </h2>
          <p className="um-entradilla">{otro.entradilla}</p>
          <Registro className="um-cierre-reg" />
          <Folio n={d.pagina + 8} lado="d" />
        </div>
      </section>
    </main>
  )
}

function Lamina() {
  const { id } = useParams()
  const n = findArchivo(id)
  const [separado, setSeparado] = useState(false)
  usePageMetadata(
    `${n?.titulo ?? "Lámina"} — Archivo de Umbral · Demo de Ian Aldana Martínez`,
    "Lámina de portada de un número de archivo de Umbral.",
  )
  if (!n) return <Navigate to="/revista/umbral" replace />
  const credito = FOTOS_UMBRAL.find(([k]) => k === n.foto)
  return (
    <main className="um-main">
      <section className="um-pliego" aria-labelledby="um-lamina-titulo">
        <div className={`um-pagina um-pagina-cartel um-tono-${n.tono}`}>
          <Cartel d={n} eager despiece={separado} />
          <button
            type="button"
            className="um-boton um-boton-claro um-despiece-boton"
            aria-pressed={separado}
            onClick={() => setSeparado((x) => !x)}
          >
            {separado ? "Juntar las capas" : "Separar las capas"}
          </button>
        </div>
        <div className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida
            izquierda={<Link to="/revista/umbral">Umbral · Archivo</Link>}
            derecha={`N.º ${String(n.numero).padStart(2, "0")} · ${n.mes}`}
          />
          <p className="um-sobre">{n.disciplina}</p>
          <h1 id="um-lamina-titulo" className="um-titulo-dossier">
            {n.titulo}
          </h1>
          <p className="um-entradilla">{n.lema}</p>
          <p className="um-lema">
            Número de archivo. En esta demo se conserva la lámina de portada; los dossiers completos
            son los del N.º 07.
          </p>
          <p>
            <Link className="um-boton" to="/revista/umbral">
              Volver al N.º 07
            </Link>
          </p>
          <p className="um-credito">
            Fotografía: Pexels ({credito?.[2]}).{" "}
            <Link to="/revista/umbral/creditos">Procedencia</Link>.
          </p>
        </div>
      </section>
    </main>
  )
}

function Creador() {
  usePageMetadata(
    `${CREADOR.nombre} — Umbral · Perfil de ejemplo`,
    "Creador ficticio de los dossiers de Umbral.",
  )
  return (
    <main className="um-main">
      <section className="um-pliego" aria-labelledby="um-creador">
        <div className="um-pagina um-pagina-nombre um-tono-noche" aria-hidden="true">
          <p>
            {CREADOR.nombre.split(" ").map((p) => (
              <span key={p}>{p}</span>
            ))}
          </p>
          <Caligrafia palabra="despacio" className="um-nombre-firma" />
        </div>
        <div className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida izquierda="Perfil" derecha="Creador de ejemplo" />
          <h1 id="um-creador" className="um-titulo-dossier">
            {CREADOR.nombre}
          </h1>
          <p className="um-entradilla">{CREADOR.lema}</p>
          <p className="um-sobre">{CREADOR.oficio} · personaje ficticio</p>
          {CREADOR.bio.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <Indice filtro={false} />
        </div>
      </section>
    </main>
  )
}

function Guardados() {
  usePageMetadata(
    "Guardados — Umbral · Demo de Ian Aldana Martínez",
    "Dossiers guardados solo en este navegador.",
  )
  return (
    <main className="um-main">
      <section className="um-pliego" aria-labelledby="um-guardados">
        <div className="um-pagina um-pagina-nombre um-tono-noche">
          <h1 id="um-guardados">
            <span>Tu</span> <span>próxima</span> <span>mirada</span>
          </h1>
        </div>
        <div className="um-pagina um-pagina-texto um-tono-papel">
          <Corrida izquierda="Cuenta de ejemplo" derecha="Guardados en este navegador" />
          <Indice guardados filtro={false} />
        </div>
      </section>
    </main>
  )
}

function DossierRuta() {
  const { id } = useParams()
  return <Dossier key={id} />
}

export default function UmbralSitio() {
  useFavicon("/favicons/umbral.svg")
  const [guardados] = useMarcadores("umbral")
  const { pathname } = useLocation()
  const actual = (ruta) => (pathname === ruta ? "page" : undefined)
  return (
    <div className="um-root">
      <header className="um-cab">
        <Link className="um-volver" to="/revista" aria-label="Volver a elegir revista">
          <span aria-hidden="true">←</span> Revistas
        </Link>
        <Link className="um-marca" to="/revista/umbral" aria-label="Umbral, número actual">
          Umbral
        </Link>
        <nav aria-label="Umbral">
          <Link to="/revista/umbral" aria-current={actual("/revista/umbral")}>
            N.º 07
          </Link>
          <Link
            to={`/revista/umbral/creador/${CREADOR.id}`}
            aria-current={actual(`/revista/umbral/creador/${CREADOR.id}`)}
          >
            Creador
          </Link>
          <Link to="/revista/umbral/guardados" aria-current={actual("/revista/umbral/guardados")}>
            Guardados ({guardados.length})
          </Link>
        </nav>
      </header>
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="dossier/:id" element={<DossierRuta />} />
        <Route path="lamina/:id" element={<Lamina />} />
        <Route path={`creador/${CREADOR.id}`} element={<Creador />} />
        <Route path="guardados" element={<Guardados />} />
        <Route path="*" element={<Navigate to="/revista/umbral" replace />} />
      </Routes>
      <ComercialCTA
        giro="revista digital"
        accentColor="#D9A35B"
        backgroundColor="#0D0D0E"
        textColor="#EFEBE3"
        fontFamily="Umbral Texto, Georgia, serif"
        headingFontFamily="Umbral Titulo, Arial, sans-serif"
        radius={0}
      />
      <footer className="um-pie">
        <b>Umbral</b>
        <p>
          Revista ficticia de fotografía y diseño, creada para el portafolio de Ian Aldana Martínez.
          Creador, relatos y números son de ejemplo.
        </p>
        <Link to="/revista">Elegir otra revista</Link>
      </footer>
    </div>
  )
}
