import { Link } from "react-router-dom"
import usePageMetadata from "../../../hooks/usePageMetadata"
import { FOTOGRAFIAS } from "../data/creditos"
import { foto as fotoRubor } from "../data/rubor"
import { ARTICULOS, foto as fotoPrisma } from "../data/prisma"
import { FOTOS_UMBRAL, fotoUmbral } from "../data/umbral"
import { PISTAS } from "../data/musica"

// Créditos y colofón de cada revista, dentro de su propio sitio (con su cabecera, sus colores y
// su música). Hoja de contactos con la procedencia de cada foto, muestras de las tipografías y
// la pista de fondo.
const NOMBRE = { rubor: "Rubor", prisma: "Prisma", umbral: "Umbral" }
const TIPOS = {
  rubor: [
    ["bodoni-moda", "Bodoni Moda", "Rubor Titulo", "Titulares y portada"],
    ["archivo", "Archivo", "Rubor Texto", "Textos, etiquetas y botones"],
  ],
  prisma: [
    ["newsreader", "Newsreader", "Prisma Titulo", "Títulos y lectura larga"],
    ["space-grotesk", "Space Grotesk", "Prisma Texto", "Interfaz, datos y etiquetas"],
  ],
  umbral: [
    ["archivo", "Archivo", "Umbral Titulo", "Palabras de cartel y anotaciones"],
    ["bodoni-moda", "Bodoni Moda", "Umbral Serif", "«Crear» y citas"],
    ["newsreader", "Newsreader", "Umbral Texto", "Lectura de los dossiers"],
    ["mrs-saint-delafield", "Mrs Saint Delafield", "Umbral Firma", "Una palabra a mano por pliego"],
  ],
}

const claveDe = (url) => url.match(/photo-(\d+)-/)?.[1].slice(-6)
const CLAVES_PRISMA = new Set(ARTICULOS.map((a) => a.foto))

function fotosDe(sitio) {
  if (sitio === "umbral")
    return FOTOS_UMBRAL.map(([clave, id, descripcion]) => ({
      src: fotoUmbral(clave, 800),
      titulo: descripcion,
      autor: "Pexels",
      licencia: "Licencia de Pexels (uso libre)",
      pagina: `https://www.pexels.com/photo/${id}/`,
      local: fotoUmbral(clave),
    }))
  return FOTOGRAFIAS.map((f) => ({ ...f, clave: claveDe(f.pagina) }))
    .filter((f) => (sitio === "rubor" ? !CLAVES_PRISMA.has(f.clave) : CLAVES_PRISMA.has(f.clave)))
    .map((f) => ({
      ...f,
      src: sitio === "rubor" ? fotoRubor(f.clave, 600) : fotoPrisma(f.clave, 480),
      titulo: `Unsplash · ${f.clave}`,
      autor: "Autor no verificado",
      local: sitio === "rubor" ? fotoRubor(f.clave) : fotoPrisma(f.clave),
    }))
}

export default function Creditos({ sitio }) {
  const nombre = NOMBRE[sitio]
  usePageMetadata(
    `Créditos — ${nombre} · Demo de Ian Aldana Martínez`,
    "Procedencia de las fotografías, tipografías y música de la revista.",
  )
  const fotos = fotosDe(sitio)
  const pista = PISTAS[sitio]
  return (
    <main className={`rv-creditos rv-creditos-${sitio}`}>
      <header className="rv-cred-cab">
        <p className="rv-cred-sobre">Colofón · {nombre}</p>
        <h1>Créditos de {nombre}</h1>
        <p>
          Los nombres, historias, autores y creadores son ficticios. Las personas fotografiadas no
          son los personajes descritos. Fotos, tipografías y música se sirven desde este sitio; sus
          originales se enlazan aquí.
        </p>
      </header>

      <section className="rv-cred-bloque" aria-labelledby="rv-cred-fotos">
        <h2 id="rv-cred-fotos">
          Fotografías <small>{fotos.length}</small>
        </h2>
        <ul className="rv-cred-hoja">
          {fotos.map((f, i) => (
            <li key={f.pagina} style={{ "--i": Math.min(i, 20) }}>
              <a href={f.pagina}>
                <img src={f.src} alt="" loading="lazy" width="300" height="400" />
                <span>{f.titulo}</span>
              </a>
              <small>
                {f.autor} · {f.licencia} · <a href={f.local}>archivo local</a>
              </small>
            </li>
          ))}
        </ul>
        <p className="rv-cred-nota">
          Autores de Unsplash sin verificar: el sitio no permite consultas automáticas desde el
          entorno donde se hizo esta demo, y su licencia no exige atribución.{" "}
          <a href="/revista/medios-origen.json">Registro completo con huellas y transformaciones</a>
          .
        </p>
      </section>

      <div className="rv-cred-dos">
        <section className="rv-cred-bloque" aria-labelledby="rv-cred-tipos">
          <h2 id="rv-cred-tipos">Tipografías</h2>
          <ul className="rv-cred-tipos">
            {TIPOS[sitio].map(([archivo, n, familia, uso]) => (
              <li key={archivo}>
                <span className="rv-cred-muestra" style={{ fontFamily: `"${familia}"` }}>
                  {n}
                </span>
                <small>
                  {uso} · <a href={`/revista/fuentes/LICENSE-${archivo}.txt`}>Licencia OFL</a>
                </small>
              </li>
            ))}
          </ul>
        </section>
        <section className="rv-cred-bloque" aria-labelledby="rv-cred-musica">
          <h2 id="rv-cred-musica">Música</h2>
          <p className="rv-cred-pista">«{pista.titulo}»</p>
          <p>
            {pista.autor} (incompetech.com). {pista.porque}
          </p>
          <p>
            <a href={pista.src}>Escuchar el archivo local</a> ·{" "}
            <a href={pista.origen}>Original en Wikimedia Commons</a> ·{" "}
            <a href="/revista/audio/LICENCIA.txt">Licencia {pista.licencia} y créditos</a>
          </p>
          <p className="rv-cred-nota">
            Suena solo si tocas la bocina de abajo a la derecha; al llegar, la revista está en
            silencio.
          </p>
        </section>
      </div>

      <p className="rv-cred-volver">
        <Link to={`/revista/${sitio}`}>Volver a {nombre}</Link>
      </p>
    </main>
  )
}
