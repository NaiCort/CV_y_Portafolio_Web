import { Link, Navigate, useParams } from "react-router-dom"
import usePageMetadata from "../../../hooks/usePageMetadata"
import { FOTOGRAFIAS } from "../data/creditos"
import { FOTOS_UMBRAL, fotoUmbral } from "../data/umbral"
import { PISTAS } from "../data/musica"

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
          <h2>Fotografías de Umbral</h2>
          <p>
            Fotografías de Pexels con su licencia (uso libre, sin atribución obligatoria; se
            acreditan igual). Los recortes de las personas se hicieron para esta demo.
          </p>
          <ul>
            {FOTOS_UMBRAL.map(([clave, id, descripcion]) => (
              <li key={clave}>
                <a href={`https://www.pexels.com/photo/${id}/`}>{descripcion}</a> (Pexels, n.º {id})
                · <a href={fotoUmbral(clave)}>archivo local</a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section>
        <h2>Tipografías locales</h2>
        <p>
          Rubor: Bodoni Moda y Archivo. Prisma: Newsreader y Space Grotesk. Umbral: Archivo, Bodoni
          Moda, Newsreader y Mrs Saint Delafield.
        </p>
        <ul>
          {["archivo", "bodoni-moda", "newsreader", "space-grotesk", "mrs-saint-delafield"].map(
            (f) => (
              <li key={f}>
                <a href={`/revista/fuentes/LICENSE-${f}.txt`}>Licencia OFL de {f}</a>
              </li>
            ),
          )}
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
          «{PISTAS[sitio].titulo}», de {PISTAS[sitio].autor} (incompetech.com).{" "}
          {PISTAS[sitio].porque} <a href={PISTAS[sitio].src}>Escuchar el archivo local</a> ·{" "}
          <a href={PISTAS[sitio].origen}>Original en Wikimedia Commons</a> ·{" "}
          <a href="/revista/audio/LICENCIA.txt">Licencia {PISTAS[sitio].licencia} y créditos</a>.
        </p>
      </section>
    </main>
  )
}
