import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AREAS, ARTICULOS, USUARIO } from "../../data/prisma"
import { ESTADOS, PREFIJO_ENVIO, guardarEnvio, leerEnvios } from "../../lib/envios"
const raiz = "/revista/prisma"
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
export function Publicar() {
  const navegar = useNavigate()
  const [error, setError] = useState("")
  function enviar(ev) {
    ev.preventDefault()
    const datos = new FormData(ev.currentTarget)
    const texto = (k) => String(datos.get(k) ?? "").trim()
    if (!["titulo", "resumen", "autores"].every((k) => texto(k)))
      return setError("Completa los campos con texto.")
    const archivo = datos.get("archivo")
    if (!archivo?.name.toLowerCase().endsWith(".pdf")) return setError("Selecciona un archivo PDF.")
    try {
      guardarEnvio({
        id: crypto.randomUUID(),
        titulo: texto("titulo"),
        autores: texto("autores"),
        resumen: texto("resumen"),
        area: texto("area"),
        archivo: archivo.name,
        fecha: new Date().toISOString(),
        paso: 0,
      })
      navegar(raiz + "/perfil")
    } catch {
      setError(
        "No se pudo guardar el envío. Conserva el formulario y revisa el almacenamiento del navegador.",
      )
    }
  }
  return (
    <main className="pr-editorial pr-w">
      <h1>Publicar una investigación</h1>
      <p>
        Envío simulado de {USUARIO.nombre}. Usa datos ficticios. Solo se conserva el nombre del PDF
        en este navegador.
      </p>
      <form onSubmit={enviar}>
        <label>
          Título
          <input required maxLength={180} name="titulo" />
        </label>
        <label>
          Área
          <select aria-label="Área" name="area" required defaultValue="">
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
          Resumen
          <textarea required maxLength={5000} rows={6} name="resumen" />
        </label>
        <label>
          Autores
          <input required name="autores" maxLength={300} defaultValue={USUARIO.nombre} />
        </label>
        <label>
          Archivo PDF
          <input required type="file" accept=".pdf,application/pdf" name="archivo" />
        </label>
        <p role="alert">{error}</p>
        <button>Enviar investigación</button>
      </form>
    </main>
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
  return (
    <main className="pr-editorial pr-w">
      <h1>Perfil de {USUARIO.nombre}</h1>
      <Link to={raiz + "/publicar"}>Publicar una investigación</Link>
      <h2>Mis envíos</h2>
      <p>
        Avanza cada envío para explorar la revisión editorial simulada. Una preimpresión todavía no
        tiene revisión por pares.
      </p>
      <p role="status">{error || aviso}</p>
      {!lista.length && !error && <p>Todavía no tienes envíos.</p>}
      <ul>
        {lista.map((e) => (
          <li key={e.id}>
            <h3>{e.titulo}</h3>
            <p>
              {AREAS[e.area][0]} · {e.archivo}
            </p>
            <p>{ESTADOS[e.paso]}</p>
            {e.paso < 2 ? (
              <button onClick={() => avanzar(e)}>
                {e.paso === 0 ? "Simular inicio de revisión" : "Publicar preimpresión"}
              </button>
            ) : (
              <Link to={raiz + "/preimpresion/" + e.id}>Leer preimpresión</Link>
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
    <main className="pr-editorial pr-w">
      <h1>{e?.titulo ?? "Preimpresión no disponible"}</h1>
      {e ? (
        <>
          <p>Preimpresión simulada · {AREAS[e.area][0]}</p>
          <p>{e.autores}</p>
          <h2>Resumen</h2>
          <p>{e.resumen}</p>
        </>
      ) : (
        <p>{error || "Esta publicación solo está disponible en el navegador donde se creó."}</p>
      )}
      <Link to={raiz + "/areas"}>Explorar por área</Link>
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
  const items = [
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
    .filter(
      (a) => (!area || a.area === area) && (!estado || a.revisado === (estado === "revisado")),
    )
    .sort((a, b) =>
      orden === "lecturas" ? b.lecturas - a.lecturas : b.fecha.localeCompare(a.fecha),
    )
  return (
    <main className="pr-editorial pr-w">
      <h1>Explorar por área</h1>
      <div className="pr-disciplinas" role="group" aria-label="Área">
        <button aria-pressed={!area} onClick={() => cambiar("area", "")}>
          Todas
        </button>
        {Object.entries(AREAS).map(([k, [n, color]]) => (
          <button
            key={k}
            style={{ borderLeft: "5px solid " + color }}
            aria-pressed={area === k}
            onClick={() => cambiar("area", k)}
          >
            {n}
          </button>
        ))}
      </div>
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
        <select aria-label="Orden" value={orden} onChange={(e) => cambiar("orden", e.target.value)}>
          <option value="fecha">Más reciente</option>
          <option value="lecturas">Más leído</option>
        </select>
      </label>
      <p role="status">
        {items.length} resultados. {error}
      </p>
      <ul>
        {items.map((a) => (
          <li key={a.ruta}>
            <Link to={raiz + "/" + a.ruta}>{a.titulo}</Link>
            <p>
              {AREAS[a.area][0]} · {a.revisado ? "Revisado" : "Preimpresión"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
export function Sostenimiento() {
  return (
    <main className="pr-editorial pr-w">
      <h1>Cómo se sostiene Prisma</h1>
      <p>
        Leer y descargar las investigaciones de Prisma es gratis. En este modelo ficticio, las
        instituciones colaboradoras y los donativos ayudan a cubrir la edición, el alojamiento y el
        acceso al archivo.
      </p>
      <h2>Publicar con exención</h2>
      <p>
        La revista contempla una cuota editorial con exención para autores sin financiación. La
        decisión editorial es independiente del pago. En esta demo el envío es gratuito y simulado.
      </p>
      <Link to={raiz + "/publicar"}>Publicar una investigación</Link>
    </main>
  )
}
