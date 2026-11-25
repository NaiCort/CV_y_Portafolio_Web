import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { buildWhatsAppUrl } from "./contactInfo"
import { contrastingText, dialogAccent } from "../../utils/colors"

// Llamada comercial real (Parte III, Fase 2 del Documento Maestro): visualmente
// separada de las acciones ficticias del negocio simulado, obligatoria dentro del
// cuerpo de cada demo, distinta de la del banner superior (que es global y fija).
// Copy base tomado de Parte IV, sección 13.

export default function ComercialCTA({
  accentColor,
  backgroundColor,
  textColor = "#ffffff",
  fontFamily,
  headingFontFamily,
  radius = 12,
  giro = "psicólogo",
  // Identificador de la demo o de su tema para el cotizador (V4.10): agrega «Cotiza un sitio como
  // este», que abre el cotizador con esa demo como punto de partida.
  cotizar,
}) {
  const reduced = useReducedMotion()
  const accent = dialogAccent(accentColor)
  const whatsappUrl = buildWhatsAppUrl(
    `Hola Ian, vi tu demo de ${giro} y me interesa un sitio similar para mi negocio.`,
  )

  return (
    <section
      id="trabajemos-juntos"
      className="py-16 px-6"
      style={{ backgroundColor, scrollMarginTop: 140 }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={
          reduced ? { duration: 0, delay: 0, repeat: 0 } : { duration: 0.26, ease: "easeOut" }
        }
        className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end pt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.28)" }}
      >
        <div>
          <h2
            className="mb-3"
            style={{
              fontFamily: headingFontFamily || fontFamily,
              color: textColor,
              fontSize: "clamp(1.35rem, 2.6vw, 1.8rem)",
              lineHeight: 1.3,
              textWrap: "balance",
            }}
          >
            ¿Te gustaría un sitio así para tu negocio?
          </h2>
          <p
            style={{
              fontFamily,
              color: "rgba(255,255,255,0.85)",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: "60ch",
            }}
          >
            Esta demo es un ejemplo de lo que puedo construir. Adapto el estilo, el contenido y los
            flujos de contacto a tu {giro === "psicólogo" ? "consulta" : "negocio"}. Este botón sí
            es real: abre WhatsApp conmigo.
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 justify-self-start"
          style={{
            backgroundColor: accent,
            color: contrastingText(accent),
            fontFamily,
            borderRadius: radius > 20 ? 999 : radius,
            minHeight: 48,
          }}
        >
          Hablemos
          <ArrowRight size={16} aria-hidden="true" />
        </a>
        {cotizar && (
          <Link
            to={`/cotizador?demo=${encodeURIComponent(cotizar)}`}
            className="sm:col-start-2 justify-self-start text-sm underline underline-offset-4"
            style={{ color: textColor, fontFamily }}
          >
            Cotiza un sitio como este
          </Link>
        )}
      </motion.div>
    </section>
  )
}
