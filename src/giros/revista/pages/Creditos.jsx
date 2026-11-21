import { Link, Navigate, useParams } from "react-router-dom"
import usePageMetadata from "../../../hooks/usePageMetadata"
import { FOTOGRAFIAS } from "../data/creditos"
import { DOSSIERS } from "../data/umbral"

export default function Creditos() {
  const { sitio } = useParams()
  const nombre = { rubor: "Rubor", prisma: "Prisma", umbral: "Umbral" }[sitio]
  usePageMetadata(
    `Créditos — ${nombre ?? "Revista"} · Demo de Ian Aldana Martínez`,
    "Procedencia de las fotografías y licencias de las fuentes de Revista.",
  )
  if (!nombre) return <Navigate to="/revista" replace />
  return (
    <main className="rv-creditos">
      <Link to={`/revista/${sitio}`}>Volver a {nombre}</Link>
      <h1>Créditos de {nombre}</h1>
      <p>
        Los nombres, historias y creadores son ficticios. Las personas fotografiadas no son los
        personajes descritos. Los recursos se sirven desde el sitio; sus originales se enlazan a
        continuación.
      </p>
      {sitio === "umbral" && (
        <section>
          <h2>Imágenes de los dossiers</h2>
          <ul>
            {DOSSIERS.map((d) => (
              <li key={d.id}>
                <b>{d.titulo}</b>: <a href={d.foto}>fotografía principal alojada</a> y{" "}
                <a href={d.detalle}>segunda fotografía alojada</a>. Procedencia en el registro
                enlazado debajo.
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h2>Tipografías locales</h2>
        <p>
          Rubor: Bodoni Moda y Archivo. Prisma: Newsreader y Space Grotesk. Umbral: Archivo y
          Newsreader.
        </p>
        <ul>
          {["archivo", "bodoni-moda", "newsreader", "space-grotesk"].map((f) => (
            <li key={f}>
              <a href={`/revista/fuentes/LICENSE-${f}.txt`}>Licencia OFL de {f}</a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Registro de fotografías</h2>
        <p>
          Este registro reúne los originales de las imágenes reutilizadas por las publicaciones. Los
          autores que no pudieron verificarse se identifican como tales; no se atribuyen a los
          personajes de la demo.
        </p>
        <a href="/revista/medios-origen.json">Ver registro completo, archivos y transformaciones</a>
        <ul>
          {FOTOGRAFIAS.map((f) => (
            <li key={f.pagina}>
              <a href={f.pagina}>{f.titulo}</a>
              <p>
                {f.autor}. {f.licencia}.
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Música</h2>
        <p>
          «Lectura» es una pieza ambiental sintetizada para Revista, sin muestras externas.
          <a href="/revista/audio/lectura.mp3"> Escuchar el archivo local</a> ·{" "}
          <a href="/revista/audio/LICENCIA.txt">Licencia CC0 1.0</a>.
        </p>
      </section>
    </main>
  )
}
