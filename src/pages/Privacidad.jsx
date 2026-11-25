import { Link } from "react-router-dom"
import useRouteFocus from "../hooks/useRouteFocus"
import useFavicon from "../hooks/useFavicon"
import usePageMetadata from "../hooks/usePageMetadata"
import { CORREO } from "../lib/solicitud"
import "./cv.css"
import "./privacidad.css"

// Aviso de privacidad del sitio de Ian (V4.10.3, regla GEN-008 del Digital Development Handbook).
// Es lo único del sitio con datos reales: el CV y el cotizador. Las demos tienen su propio aviso de
// ejemplo. El texto solo afirma lo que hace el código; lo que falta confirmar está en
// docs/SEGURIDAD.md (domicilio completo y revisión legal antes de recibir solicitudes reales).
const ACTUALIZADO = "25 de noviembre de 2026"

export default function Privacidad() {
  useRouteFocus()
  useFavicon("/favicon.svg")
  usePageMetadata(
    "Aviso de privacidad · Ian Aldana Martínez",
    "Qué datos recibe Ian Habid Aldana Martínez cuando le escribes o le envías una cotización, para qué los usa y cómo ejercer tus derechos.",
  )
  return (
    <div className="priv-root">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="priv-cabecera">
        <Link to="/" className="priv-volver">
          Volver al CV y portafolio
        </Link>
      </header>
      <main id="contenido" tabIndex={-1} className="priv-main">
        <h1>Aviso de privacidad</h1>
        <p className="priv-fecha">Actualizado el {ACTUALIZADO}.</p>

        <section aria-labelledby="priv-responsable">
          <h2 id="priv-responsable">Quién es responsable</h2>
          <p>
            Ian Habid Aldana Martínez, desarrollador web en Xalapa, Veracruz, México. Para cualquier
            tema de privacidad escribe a <a href={`mailto:${CORREO}`}>{CORREO}</a>.
          </p>
        </section>

        <section aria-labelledby="priv-datos">
          <h2 id="priv-datos">Qué datos recibo</h2>
          <p>
            Este sitio no tiene cuentas ni formularios que envíen datos a un servidor. Solo recibo
            datos tuyos si tú decides escribirme:
          </p>
          <ul>
            <li>
              <strong>Desde el cotizador:</strong> el mensaje que se abre en tu WhatsApp o en tu
              correo lleva tu nombre, el nombre de tu negocio si lo escribes, si necesitas factura,
              tus comentarios y la configuración de tu cotización. Lo envías tú, desde tu propia
              cuenta; también llega tu número de WhatsApp o tu correo.
            </li>
            <li>
              <strong>Desde el CV:</strong> si me escribes por WhatsApp, correo o LinkedIn, recibo
              tu nombre, tu contacto y lo que me escribas.
            </li>
          </ul>
          <p>
            No te pido datos sensibles, como información de salud. Por favor no los incluyas en tus
            comentarios.
          </p>
        </section>

        <section aria-labelledby="priv-uso">
          <h2 id="priv-uso">Para qué los uso</h2>
          <ul>
            <li>Responder tu mensaje y aclarar lo que necesitas.</li>
            <li>Preparar y enviarte una propuesta confirmada.</li>
            <li>Si contratas, dar seguimiento al proyecto y emitir tu factura.</li>
          </ul>
          <p>No uso tus datos para publicidad ni los vendo.</p>
        </section>

        <section aria-labelledby="priv-terceros">
          <h2 id="priv-terceros">Con quién se comparten</h2>
          <p>
            No los comparto con nadie, salvo lo que exija la ley, por ejemplo para fines fiscales si
            te facturo. WhatsApp y tu proveedor de correo procesan los mensajes según sus propias
            condiciones.
          </p>
        </section>

        <section aria-labelledby="priv-tiempo">
          <h2 id="priv-tiempo">Cuánto tiempo los conservo</h2>
          <p>
            Solo el tiempo necesario para atender tu solicitud. Si contratas, durante el proyecto y
            lo que pidan las leyes fiscales.
          </p>
        </section>

        <section aria-labelledby="priv-derechos">
          <h2 id="priv-derechos">Tus derechos</h2>
          <p>
            Puedes pedir acceso a tus datos, corregirlos, cancelarlos u oponerte a su uso (derechos
            ARCO), y retirar tu consentimiento. Escribe a <a href={`mailto:${CORREO}`}>{CORREO}</a>{" "}
            con tu nombre, el derecho que quieres ejercer y los datos de que se trata. Te respondo
            en un máximo de 20 días hábiles.
          </p>
        </section>

        <section aria-labelledby="priv-navegador">
          <h2 id="priv-navegador">Lo que queda en tu navegador</h2>
          <p>
            Las demos guardan en el almacenamiento de tu navegador sus datos de ejemplo y tus
            preferencias, como el tema elegido o un pedido simulado. Esos datos no salen de tu
            navegador y puedes borrarlos desde cada demo o borrando los datos de este sitio.
          </p>
          <p>
            No uso cookies de seguimiento ni herramientas de analítica. Las tipografías, las fotos y
            la música se sirven desde este mismo sitio. Los mapas de las demos cargan sus imágenes
            de OpenFreeMap, y el alojamiento (Vercel) recibe los datos técnicos de cada visita, como
            la dirección IP, para poder mostrarte el sitio.
          </p>
        </section>

        <section aria-labelledby="priv-cambios">
          <h2 id="priv-cambios">Cambios a este aviso</h2>
          <p>Si este aviso cambia, lo publico en esta misma página con su nueva fecha.</p>
        </section>
      </main>
    </div>
  )
}
