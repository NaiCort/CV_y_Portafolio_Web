import { DOSSIERS } from "../data/umbral"
import { Link } from "react-router-dom"
import useFavicon from "../../../hooks/useFavicon"
import usePageMetadata from "../../../hooks/usePageMetadata"
import { ACTUAL, foto as fotoRubor } from "../data/rubor"
import { ARTICULOS, foto as fotoPrisma } from "../data/prisma"

// Entrada de la demo: tres revistas sobre la misma base, como los dos talleres.
export default function Entrada() {
  useFavicon("/favicons/revista.svg")
  usePageMetadata(
    "Revista digital — Rubor, Prisma y Umbral · Demo de Ian Aldana Martínez",
    "Tres revistas digitales ficticias: Rubor, de moda y celebridades, Prisma, de ciencia y tecnología en acceso abierto; y Umbral, de fotografía y diseño. Portafolio de Ian Aldana Martínez.",
  )
  return (
    <main className="rv-entrada">
      <h1 className="rv-oculto">Revista digital: elige una revista</h1>
      <Link to="/revista/rubor" className="rv-puerta rv-puerta-rubor">
        <img
          src={fotoRubor(ACTUAL.portada.recorte, 700)}
          alt=""
          width={ACTUAL.portada.ancho / 2}
          height={700}
        />
        <span className="rv-puerta-texto">
          <b>RUBOR</b>
          <span>Moda y celebridades · N.º {ACTUAL.n}</span>
          <em>Un número al mes, de un solo editor. La portada es siempre el más reciente.</em>
        </span>
      </Link>
      <Link to="/revista/prisma" className="rv-puerta rv-puerta-prisma">
        <img src={fotoPrisma(ARTICULOS[0].foto, 480)} alt="" width={480} height={640} />
        <span className="rv-puerta-texto">
          <b>Prisma</b>
          <span>Ciencia y tecnología · acceso abierto</span>
          <em>Investigaciones de varios autores, para leer en el sitio o en PDF.</em>
        </span>
      </Link>
      <Link to="/revista/umbral" className="rv-puerta rv-puerta-umbral">
        <img src={DOSSIERS[0].foto} alt="" width={1200} height={1600} />
        <span className="rv-puerta-texto">
          <b>Umbral</b>
          <span>Fotografía, diseño y cultura visual</span>
          <em>Historias para mirar dos veces. Dossiers, creadores y proceso creativo.</em>
        </span>
      </Link>
    </main>
  )
}
