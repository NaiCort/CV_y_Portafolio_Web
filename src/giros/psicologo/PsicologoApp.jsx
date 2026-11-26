import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import useRouteFocus from "../../hooks/useRouteFocus"
import ThemeSwitcher from "../../components/ThemeSwitcher"
import WaterMark from "../../components/WaterMark"
import DemoBanner from "../../components/shared/DemoBanner"
import ComercialCTA from "../../components/shared/ComercialCTA"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import { readTheme, saveTheme, THEME_NAMES } from "../../utils/themeStorage"
import { TEMAS } from "./data/consultorio"
import Agenda from "./components/Agenda"
import { AvisoPrivacidad } from "./components/piezas"
import Sala from "./temas/Sala"
import Neblina from "./temas/Neblina"
import Cuaderno from "./temas/Cuaderno"
import "./psicologo.css"

// Demo de Psicólogo reconstruida desde cero en V4.10.2: una landing para una psicóloga ficticia en
// Xalapa con tres temas intercambiables («Sala con luz», «Neblina» y «Cuaderno») que comparten el
// contenido de data/consultorio.js. Ficha: docs/FICHA_PSICOLOGO.md.
const COMPONENTES = { sala: Sala, neblina: Neblina, cuaderno: Cuaderno }
const CTA = {
  sala: { fondo: "#2E3A2C", acento: "#E7B49A", radio: 999 },
  neblina: { fondo: "#1C2A36", acento: "#BFD9E0", radio: 999 },
  cuaderno: { fondo: "#2F2F33", acento: "#D9A441", radio: 6 },
}

function Guia() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
      <p>
        Valeria Romero es una psicóloga ficticia en Xalapa. Su cédula, su aviso de publicidad, su
        dirección y su teléfono son de ejemplo. Las fotos son ilustrativas: nadie en ellas es
        Valeria.
      </p>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          Hay tres temas con el mismo contenido: Sala con luz, Neblina y Cuaderno. Se cambian con
          los círculos de abajo a la derecha, y cada uno acomoda la página a su manera.
        </li>
        <li>
          «Agenda una llamada» abre una agenda simulada: llamada previa o primera sesión, modalidad,
          zona horaria, horario y contacto, con un recordatorio por WhatsApp de ejemplo. No se
          guarda ni se envía nada, y no se piden datos de salud.
        </li>
        <li>
          «Respira conmigo» es un ejercicio de un minuto que tú inicias y detienes. No hay
          autoevaluaciones ni testimonios: en su lugar, formación, supervisión y el enlace a
          opiniones públicas.
        </li>
        <li>
          Los teléfonos de ayuda en crisis son reales (911, Línea de la Vida y Consejo Ciudadano).
          El enlace para verificar la cédula abre el buscador real de la SEP.
        </li>
      </ul>
      <p>“Contactar”, “Hablemos” y “Cotiza un sitio como este” son reales: llevan con Ian.</p>
    </div>
  )
}

// Entradas de cada sección al aparecer en pantalla: fundido desde escala 0.95 (o el gesto propio
// de cada tema). Sin IntersectionObserver, todo se ve de inmediato.
function useEntradas(tema) {
  useEffect(() => {
    const raiz = document.querySelector(".psi-raiz")
    const nodos = document.querySelectorAll(".psi [data-entra]")
    if (!raiz || typeof IntersectionObserver === "undefined") return undefined
    const observador = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("p-visto")
            observador.unobserve(e.target)
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    )
    nodos.forEach((n) => observador.observe(n))
    raiz.classList.add("p-entradas")
    return () => {
      observador.disconnect()
      raiz.classList.remove("p-entradas")
    }
  }, [tema])
}

// Cambio de tema (V4.10.5, pedido de Ian): los tres temas tienen estructura distinta, así que al
// cambiar, un velo con el color y el nombre del tema nuevo cubre la página, la página vuelve arriba
// y el tema nuevo aparece desde el inicio. Así no se disparan solas las animaciones de más abajo.
// Cada paso dura menos de 300 ms. Con movimiento reducido no hay velo: el tema cambia y la página
// vuelve arriba de inmediato. (En Brío solo cambia la paleta y no hace falta.)
const CUBRE = 260
const DESCUBRE = 300

function useCambioDeTema(tema, setTema) {
  const reducido = useReducedMotion()
  const [velo, setVelo] = useState(null)
  const relojes = useRef([])
  useEffect(() => () => relojes.current.forEach(clearTimeout), [])
  const subir = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  const cambiar = useCallback(
    (nuevo) => {
      if (!THEME_NAMES.includes(nuevo) || nuevo === tema || velo) return
      if (reducido) {
        setTema(nuevo)
        subir()
        return
      }
      setVelo({ a: nuevo, fase: "cubre" })
      relojes.current = [
        setTimeout(() => {
          subir()
          setTema(nuevo)
          setVelo({ a: nuevo, fase: "descubre" })
        }, CUBRE),
        setTimeout(() => setVelo(null), CUBRE + DESCUBRE),
      ]
    },
    [tema, setTema, velo, reducido],
  )
  return [velo, cambiar]
}

export default function PsicologoApp() {
  useRouteFocus()
  useFavicon("/favicons/psicologo.svg")
  usePageMetadata(
    "Valeria Romero, psicóloga en Xalapa · Demo de Ian Aldana Martínez",
    "Landing de una psicóloga ficticia en Xalapa, en tres estilos: agenda simulada, honorarios claros, ayuda en crisis y «Respira conmigo». Portafolio de Ian Aldana Martínez.",
  )
  const [tema, setTema] = useState(readTheme)
  const [agenda, setAgenda] = useState(null)
  const [privacidad, setPrivacidad] = useState(false)
  const [temaContacto, setTemaContacto] = useState(null)
  useEffect(() => saveTheme(tema), [tema])
  useEntradas(tema)
  const [velo, cambiarTema] = useCambioDeTema(tema, setTema)

  const agendar = useCallback((tipo = null) => setAgenda({ tipo }), [])
  const pedirInfo = useCallback(() => {
    setTemaContacto({ valor: "Escuela, empresa o colega", vez: Date.now() })
    const destino = document.getElementById("contacto")
    destino?.scrollIntoView({ block: "start" })
    const titulo = destino?.querySelector("h2")
    titulo?.setAttribute("tabindex", "-1")
    titulo?.focus({ preventScroll: true })
  }, [])

  const Tema = COMPONENTES[tema]
  const cta = CTA[tema]
  const variante = TEMAS.find((t) => t.id === tema).variante
  return (
    <div className="psi-raiz" data-tema={tema}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBanner guide={<Guia />} />
      <Tema
        key={tema}
        onAgendar={agendar}
        onPrivacidad={() => setPrivacidad(true)}
        onPedirInfo={pedirInfo}
        temaContacto={temaContacto}
      />
      <ComercialCTA
        accentColor={cta.acento}
        backgroundColor={cta.fondo}
        radius={cta.radio}
        giro="psicólogo"
        cotizar={variante}
      />
      {velo && (
        <div className={`psi-velo psi-velo-${velo.a}`} data-fase={velo.fase} aria-hidden="true">
          <span className="psi-velo-nombre">{TEMAS.find((t) => t.id === velo.a).nombre}</span>
        </div>
      )}
      <ThemeSwitcher themes={TEMAS} activeTheme={velo?.a ?? tema} onThemeChange={cambiarTema} />
      <WaterMark />
      {agenda && <Agenda tema={tema} tipoInicial={agenda.tipo} onClose={() => setAgenda(null)} />}
      {privacidad && <AvisoPrivacidad tema={tema} onClose={() => setPrivacidad(false)} />}
    </div>
  )
}
