import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AREAS, ARTICULOS, USUARIO } from "../../data/prisma"
import { ESTADOS, PREFIJO_ENVIO, guardarEnvio, leerEnvios } from "../../lib/envios"

// Páginas editoriales de Prisma: publicar, mis envíos, preimpresión, áreas y sostenimiento.
// Todo es simulado y se guarda solo en este navegador.
const raiz = "/revista/prisma"
const SIMBOLO = {
  astronomia: "As",
  genetica: "Gn",
  ia: "IA",
  biologia: "Bc",
  espacio: "Es",
  fisica: "Fs",
  electronica: "El",
  neuro: "Nc",
  medicina: "Md",
  abierta: "Ca",
  matematicas: "Mt",
  quimica: "Qm",
  datos: "Cd",
  sociedad: "Cs",
}
const fechaCorta = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" })
const miles = new Intl.NumberFormat("es-MX")

function useEnvios() {
  const snapshot = () => {
    try {
      return { lista: leerEnvios(), error: "" }
    } catch {
      return { lista: [], error: "No se puede acceder al almacenamiento de este navegador." }
    }
  }
  const [datos, setDatos] = useState(snapshot)
  useEffect(() => {
    const evento = (e) => {
      if (e.key === null || e.key.startsWith(PREFIJO_ENVIO)) setDatos(snapshot())
    }
    window.addEventListener("storage", evento)
    return () => window.removeEventListener("storage", evento)
  }, [])
  return { ...datos, actualizar: () => setDatos(snapshot()) }
}

function Cabeza({ sobre, titulo, children }) {
  return (
    <header className="pr-ed-cab">
      <p className="pr-meta">{sobre}</p>
      <h1>{titulo}</h1>
      {children && <p className="pr-ed-bajada">{children}</p>}
    </header>
  )
}

const ANTES = [
  ["Tu manuscrito", "Un PDF con título, autores, resumen, métodos y referencias."],
  ["Datos abiertos", "Indica dónde estarán tus datos y tu código, aunque sea un repositorio."],
  ["Licencia", "Todo lo que publica Prisma va con CC BY 4.0: cualquiera puede leerlo y citarlo."],
  ["Preimpresión primero", "Se publica como preimpresión mientras dura la revisión por pares."],
]

export function Publicar() {
  const navegar = useNavigate()
  const [error, setError] = useState("")
  const [archivo, setArchivo] = useState("")
  const [area, setArea] = useState("")
  const [enviando, setEnviando] = useState(false)
  const reloj = useRef(null)
  useEffect(() => () => clearTimeout(reloj.current), [])
  function enviar(ev) {
    ev.preventDefault()
    if (enviando) return
    const datos = new FormData(ev.currentTarget)
    const texto = (k) => String(datos.get(k) ?? "").trim()
    if (!["titulo", "resumen", "autores"].every((k) => texto(k)))
      return setError("Completa los campos con texto.")
    const pdf = datos.get("archivo")
    if (!pdf?.name.toLowerCase().endsWith(".pdf")) return setError("Selecciona un archivo PDF.")
    setError("")
    setEnviando(true)
    reloj.current = setTimeout(() => {
      try {
        guardarEnvio({
          id: crypto.randomUUID(),
          titulo: texto("titulo"),
          autores: texto("autores"),
          resumen: texto("resumen"),
          area: texto("area"),
          archivo: pdf.name,
          fecha: new Date().toISOString(),
          paso: 0,
        })
        navegar(raiz + "/perfil")
      } catch {
        setEnviando(false)
        setError(
          "No se pudo guardar el envío. Conserva el formulario y revisa el almacenamiento del navegador.",
        )
      }
    }, 900)
  }
  const color = area ? AREAS[area][1] : "#3d8bff"
  return (
    <main className="pr-w pr-editorial pr-publicar" style={{ "--c": color }}>
      <Cabeza sobre="Publicación abierta · Envío simulado" titulo="Publicar una investigación">
        Envío simulado de {USUARIO.nombre}. Usa datos ficticios: solo se conserva el nombre del PDF
        en este navegador.
      </Cabeza>
      <div className="pr-pub">
        <aside className="pr-pub-antes" aria-labelledby="pr-antes">
          <h2 id="pr-antes">Antes de enviar</h2>
          <ul>
            {ANTES.map(([t, d]) => (
              <li key={t}>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p>
            Sin cuota para autores sin financiación.{" "}
            <Link to={raiz + "/sostenimiento"}>Cómo se sostiene Prisma</Link>.
          </p>
        </aside>
        <form className="pr-manuscrito" onSubmit={enviar} aria-busy={enviando}>
          <p className="pr-manuscrito-cab" aria-hidden="true">
            <span>Prisma · Manuscrito</span>
            <span>{area ? SIMBOLO[area] : "··"}</span>
          </p>
          <label>
            <span>Título</span>
            <input required maxLength={180} name="titulo" placeholder="Un título claro y breve" />
          </label>
          <label>
            <span>Área</span>
            <select
              aria-label="Área"
              name="area"
              required
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="" disabled>
                Elige un área
              </option>
              {Object.entries(AREAS).map(([k, [n]]) => (
                <option value={k} key={k}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Resumen</span>
            <textarea
              required
              maxLength={5000}
              rows={6}
              name="resumen"
              placeholder="Qué preguntaste, cómo lo mediste y qué encontraste."
            />
          </label>
          <label>
            <span>Autores</span>
            <input required name="autores" maxLength={300} defaultValue={USUARIO.nombre} />
          </label>
          <label className="pr-soltar" data-lleno={archivo ? "" : undefined}>
            <span>Archivo PDF</span>
            <input
              required
              type="file"
              accept=".pdf,application/pdf"
              name="archivo"
              onChange={(e) => setArchivo(e.target.files?.[0]?.name ?? "")}
            />
            <b aria-hidden="true">{archivo || "Arrastra tu PDF aquí o elige un archivo"}</b>
          </label>
          <p role="alert" className="pr-error">
            {error}
          </p>
          <div className="pr-envio">
            <button className="pr-bt pr-bt-p" disabled={enviando}>
              {enviando ? "Subiendo manuscrito…" : "Enviar investigación"}
            </button>
            {enviando && <span className="pr-barra" aria-hidden="true" />}
          </div>
        </form>
      </div>
    </main>
  )
}

function Pista({ paso }) {
  return (
    <ol className="pr-pista" style={{ "--paso": paso }} aria-hidden="true">
      {ESTADOS.map((s, i) => (
        <li key={s} data-hecho={i <= paso ? "" : undefined}>
          {s}
        </li>
      ))}
    </ol>
  )
}

export function Perfil() {
  const { lista, error, actualizar } = useEnvios()
  const [aviso, avisar] = useState("")
  function avanzar(e) {
    try {
      const actual = leerEnvios().find((x) => x.id === e.id)
      if (actual?.paso === e.paso && actual.paso < 2)
        guardarEnvio({ ...actual, paso: actual.paso + 1 })
      actualizar()
      avisar("")
    } catch {
      avisar("No se pudo guardar el cambio de estado.")
    }
  }
  const cuenta = (p) => lista.filter((e) => e.paso === p).length
  return (
    <main className="pr-w pr-editorial pr-perfil-envios">
      <section className="pr-perfil">
        <span className="pr-av-g" aria-hidden="true">
          {USUARIO.iniciales}
        </span>
        <div>
          <h1>Perfil de {USUARIO.nombre}</h1>
          <p className="pr-meta">Cuenta de ejemplo · Investigador invitado (ficticio)</p>
        </div>
        <dl className="pr-mt">
          <div>
            <dt>Enviados</dt>
            <dd>{lista.length}</dd>
          </div>
          <div>
            <dt>En revisión</dt>
            <dd>{cuenta(1)}</dd>
          </div>
          <div>
            <dt>Publicados</dt>
            <dd>{cuenta(2)}</dd>
          </div>
        </dl>
      </section>
      <div className="pr-envios-cab">
        <h2>Mis envíos</h2>
        <Link className="pr-bt pr-bt-p" to={raiz + "/publicar"}>
          Publicar una investigación
        </Link>
      </div>
      <p className="pr-ed-bajada">
        Avanza cada envío para explorar la revisión editorial simulada. Una preimpresión todavía no
        tiene revisión por pares.
      </p>
      <p role="status">{error || aviso}</p>
      {!lista.length && !error && (
        <div className="pr-vacio">
          <svg viewBox="0 0 64 56" aria-hidden="true">
            <path d="M32 4 60 52H4Z" />
            <path d="M32 4v48M18 28h28" />
          </svg>
          <p>Todavía no tienes envíos. Tu primera investigación aparecerá aquí con su recorrido.</p>
        </div>
      )}
      <ul className="pr-envios">
        {lista.map((e) => (
          <li key={e.id} style={{ "--c": AREAS[e.area][1] }}>
            <span className="pr-sim" aria-hidden="true">
              {SIMBOLO[e.area]}
            </span>
            <div className="pr-envio-txt">
              <h3>{e.titulo}</h3>
              <p className="pr-meta">
                {AREAS[e.area][0]} · {e.archivo} · {fechaCorta.format(new Date(e.fecha))}
              </p>
              <Pista paso={e.paso} />
              <p className="pr-estado">{ESTADOS[e.paso]}</p>
            </div>
            {e.paso < 2 ? (
              <button className="pr-bt pr-bt-s" type="button" onClick={() => avanzar(e)}>
                {e.paso === 0 ? "Simular inicio de revisión" : "Publicar preimpresión"}
              </button>
            ) : (
              <Link className="pr-bt pr-bt-s" to={raiz + "/preimpresion/" + e.id}>
                Leer preimpresión
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}

export function Preimpresion() {
  const { id } = useParams()
  const { lista, error } = useEnvios()
  const e = lista.find((x) => x.id === id && x.paso === 2)
  return (
    <main className="pr-art" style={{ "--c": e ? AREAS[e.area][1] : "#3d8bff" }}>
      <div className="pr-w pr-art-in">
        <p className="pr-meta">
          PRISMA · Preimpresión{e ? ` · ${AREAS[e.area][0]}` : ""} · Versión 1
        </p>
        <h1>{e?.titulo ?? "Preimpresión no disponible"}</h1>
        {e ? (
          <>
            <p className="pr-autores">Por {e.autores}</p>
            <div className="pr-chips">
              <span className="pr-chip pr-chip-pre">Preimpresión · sin revisión por pares</span>
              <span className="pr-chip">CC BY 4.0</span>
              <span className="pr-chip">{e.archivo}</span>
            </div>
            <section className="pr-resumen" aria-labelledby="pr-res-pre">
              <h2 id="pr-res-pre">Resumen</h2>
              <p>{e.resumen}</p>
            </section>
          </>
        ) : (
          <p className="pr-nota">
            {error || "Esta publicación solo está disponible en el navegador donde se creó."}
          </p>
        )}
        <p className="pr-nota">
          <Link to={raiz + "/areas"}>Explorar por área</Link>
        </p>
      </div>
    </main>
  )
}

export function Areas() {
  const { lista, error } = useEnvios()
  const [params, set] = useSearchParams()
  const area = params.get("area") || "",
    estado = params.get("estado") || "",
    orden = params.get("orden") || "fecha"
  function cambiar(k, v) {
    const p = new URLSearchParams(params)
    if (v) p.set(k, v)
    else p.delete(k)
    set(p)
  }
  const todos = [
    ...ARTICULOS.map((a) => ({
      ...a,
      ruta: "articulo/" + a.id,
      fecha: a.fechaIso,
      lecturas: a.cifras.lecturas,
    })),
    ...lista
      .filter((e) => e.paso === 2)
      .map((e) => ({ ...e, ruta: "preimpresion/" + e.id, revisado: false, lecturas: 0 })),
  ]
  const items = todos
    .filter(
      (a) => (!area || a.area === area) && (!estado || a.revisado === (estado === "revisado")),
    )
    .sort((a, b) =>
      orden === "lecturas" ? b.lecturas - a.lecturas : b.fecha.localeCompare(a.fecha),
    )
  return (
    <main className="pr-w pr-editorial pr-areas">
      <Cabeza sobre="Catálogo" titulo="Explorar por área">
        Catorce áreas, como una tabla periódica: cada una con su color, el mismo de sus portadas.
      </Cabeza>
      <div className="pr-tabla-areas" role="group" aria-label="Área">
        <button
          type="button"
          className="pr-elem pr-elem-todas"
          aria-pressed={!area}
          onClick={() => cambiar("area", "")}
        >
          <b>∗</b>
          <span>Todas</span>
          <small>{todos.length}</small>
        </button>
        {Object.entries(AREAS).map(([k, [n, color]], i) => (
          <button
            key={k}
            type="button"
            className="pr-elem"
            style={{ "--c": color, "--i": i }}
            aria-pressed={area === k}
            aria-label={n}
            onClick={() => cambiar("area", k)}
          >
            <small className="pr-elem-n" aria-hidden="true">
              {i + 1}
            </small>
            <b aria-hidden="true">{SIMBOLO[k]}</b>
            <span aria-hidden="true">{n}</span>
            <small aria-hidden="true">{todos.filter((a) => a.area === k).length}</small>
          </button>
        ))}
      </div>
      <div className="pr-filtros">
        <label>
          Estado
          <select
            aria-label="Estado"
            value={estado}
            onChange={(e) => cambiar("estado", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="revisado">Revisado</option>
            <option value="preimpresion">Preimpresión</option>
          </select>
        </label>
        <label>
          Orden
          <select
            aria-label="Orden"
            value={orden}
            onChange={(e) => cambiar("orden", e.target.value)}
          >
            <option value="fecha">Más reciente</option>
            <option value="lecturas">Más leído</option>
          </select>
        </label>
        <p role="status">
          {items.length} resultados{area ? ` en ${AREAS[area][0]}` : ""}. {error}
        </p>
      </div>
      <ul className="pr-catalogo" key={area + estado + orden}>
        {items.map((a, i) => (
          <li key={a.ruta} style={{ "--c": AREAS[a.area][1], "--i": Math.min(i, 12) }}>
            <span className="pr-sim" aria-hidden="true">
              {SIMBOLO[a.area]}
            </span>
            <div>
              <Link to={raiz + "/" + a.ruta}>{a.titulo}</Link>
              <p className="pr-meta">
                {AREAS[a.area][0]} ·{" "}
                <span className={a.revisado ? "pr-ok" : "pr-pre"}>
                  {a.revisado ? "Revisado" : "Preimpresión"}
                </span>
              </p>
            </div>
            <span className="pr-lect">{a.lecturas ? miles.format(a.lecturas) : "Nueva"}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}

const GASTOS = [
  ["Edición y corrección", 38, "#f2b33d"],
  ["Revisión por pares", 24, "#3d8bff"],
  ["Alojamiento y PDF", 16, "#8fd19e"],
  ["Archivo y preservación", 12, "#c0466a"],
  ["Accesibilidad", 10, "#a7aeb6"],
]
const FUENTES = [
  ["Consorcio de bibliotecas universitarias", "Aporte anual fijo (ficticio)"],
  ["Fondo Regional de Ciencia Básica", "Beca de infraestructura (ficticia)"],
  ["Lectores y lectoras", "Donativos voluntarios, sin muro de pago"],
]

export function Sostenimiento() {
  return (
    <main className="pr-w pr-editorial pr-sost">
      <Cabeza sobre="Transparencia" titulo="Cómo se sostiene Prisma">
        Leer y descargar las investigaciones de Prisma es gratis. En este modelo ficticio, las
        instituciones colaboradoras y los donativos ayudan a cubrir la edición, el alojamiento y el
        acceso al archivo.
      </Cabeza>
      <section className="pr-caja pr-gastos" aria-labelledby="pr-gastos-t">
        <h2 id="pr-gastos-t">A dónde va cada peso</h2>
        <p className="pr-barra-gastos" aria-hidden="true">
          {GASTOS.map(([n, v, c]) => (
            <span key={n} style={{ "--v": v, "--c": c }} />
          ))}
        </p>
        <table>
          <caption className="rv-oculto">Reparto del gasto anual (ficticio)</caption>
          <tbody>
            {GASTOS.map(([n, v, c]) => (
              <tr key={n}>
                <th scope="row">
                  <span className="pr-punto" style={{ "--c": c }} aria-hidden="true" />
                  {n}
                </th>
                <td>{v} %</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="pr-nota">Cifras de ejemplo para la demo.</p>
      </section>
      <div className="pr-dos-col">
        <section aria-labelledby="pr-fuentes-t">
          <h2 id="pr-fuentes-t">Quién la paga</h2>
          <ul className="pr-fuentes">
            {FUENTES.map(([n, d]) => (
              <li key={n}>
                <b>{n}</b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="pr-exencion-t">
          <h2 id="pr-exencion-t">Publicar con exención</h2>
          <p>
            La revista contempla una cuota editorial con exención para autores sin financiación. La
            decisión editorial es independiente del pago. En esta demo el envío es gratuito y
            simulado.
          </p>
          <Link className="pr-bt pr-bt-p" to={raiz + "/publicar"}>
            Publicar una investigación
          </Link>
        </section>
      </div>
      <section aria-labelledby="pr-preg-t" className="pr-preguntas">
        <h2 id="pr-preg-t">Preguntas frecuentes</h2>
        {[
          [
            "¿Por qué no hay muro de pago?",
            "Porque la ciencia financiada con dinero público debería poder leerla cualquiera.",
          ],
          [
            "¿Quién decide qué se publica?",
            "Un comité editorial y al menos dos revisores anónimos; el pago nunca influye.",
          ],
          [
            "¿Qué pasa si Prisma cierra?",
            "El archivo se deposita en dos repositorios públicos para que nada se pierda.",
          ],
        ].map(([p, r]) => (
          <details key={p}>
            <summary>{p}</summary>
            <p>{r}</p>
          </details>
        ))}
      </section>
    </main>
  )
}
