import { Link, useSearchParams } from "react-router-dom"
import useFavicon from "../hooks/useFavicon"
import usePageMetadata from "../hooks/usePageMetadata"
import useRouteFocus from "../hooks/useRouteFocus"
import { demoPorId } from "../data/demos"
import { buildWhatsAppUrl } from "../components/shared/contactInfo"
import "./cv.css"

// Cotizador: página provisional (V4.8). Ya acepta ?demo=<id> para que las demos puedan enlazarla
// desde ahora; la configuración precargada llega con la primera versión del cotizador.
export default function Cotizador() {
  usePageMetadata(
    "Cotizar un sitio · Ian Habid Aldana Martínez",
    "El cotizador parte de una demo o de cero y deja añadir o quitar funciones. Mientras se construye, la cotización se pide directamente a Ian.",
  )
  useFavicon("/favicon.svg")
  useRouteFocus()
  const [params] = useSearchParams()
  const demo = demoPorId(params.get("demo") ?? "")
  const variante = demo?.variantes.find((v) => v.id === params.get("demo"))
  const base = demo ? `${demo.nombre}${variante ? ` (${variante.nombre})` : ""}` : null
  const mensaje = base
    ? `Hola Ian, quiero cotizar un sitio como tu demo ${base} (${params.get("demo")}).`
    : "Hola Ian, quiero cotizar un sitio para mi negocio."

  return (
    <div className="cv-root cv-cotizador">
      <main id="contenido" tabIndex={-1} className="cv-centro">
        <section className="cv-seccion" aria-labelledby="cot-titulo">
          <h1 id="cot-titulo" className="cv-cot-titulo">
            Cotizar un sitio
          </h1>
          {base && (
            <p className="cv-cot-base">
              Partirías de la demo <b>{base}</b>.
            </p>
          )}
          <p className="cv-resumen">
            El cotizador está en construcción. Va a partir de la demo que elijas, con sus funciones
            ya marcadas, y te dejará quitar o añadir lo que necesites viendo el precio y el tiempo
            de entrega. Mientras tanto, escríbeme y te preparo la cotización a mano.
          </p>
          <div className="cv-docs">
            <a
              className="cv-boton cv-boton-lleno"
              href={buildWhatsAppUrl(mensaje)}
              target="_blank"
              rel="noopener"
            >
              Escribirme por WhatsApp
            </a>
            <a className="cv-boton" href="mailto:ian.martinez2610@gmail.com">
              ian.martinez2610@gmail.com
            </a>
          </div>
          <p>
            <Link className="cv-enlace" to="/">
              Volver al CV y las demos
            </Link>
          </p>
        </section>
      </main>
    </div>
  )
}
