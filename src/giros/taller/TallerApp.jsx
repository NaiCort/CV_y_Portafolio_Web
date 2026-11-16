import { useEffect, useState } from "react"
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import DemoBanner from "../../components/shared/DemoBanner"
import ComercialCTA from "../../components/shared/ComercialCTA"
import Modal from "../../components/shared/Modal"
import WhatsAppPreview from "../../components/shared/WhatsAppPreview"
import WaterMark from "../../components/WaterMark"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import Inicio from "./pages/Inicio"
import Creditos from "./pages/Creditos"
import SelectorTema from "./components/SelectorTema"
import { TALLERES } from "./data/talleres"
import { guardarTema, leerTema } from "./lib/tema"
import "./taller.css"

const SECCIONES = {
  rosales: [
    ["testigos", "Testigos del tablero"],
    ["presupuesto", "Presupuesto"],
    ["precios", "Precios"],
    ["consulta", "Consulta tu auto"],
  ],
  vertice: [
    ["testigos", "Testigos del tablero"],
    ["presupuesto", "Presupuesto"],
    ["precios", "Precios"],
    ["sucursales", "Sucursales"],
  ],
}
const TITULOS = { "/taller": "Inicio", "/taller/creditos": "Créditos" }
const MENSAJES = {
  rosales: [
    "Hola, ¿pueden revisar mi auto esta semana?",
    "Hola, quiero una revisión antes de comprar un usado",
    "Hola, ¿el mecánico a domicilio llega a mi calle?",
  ],
  vertice: [
    "Hola, quiero agendar el servicio de mi auto con recolección",
    "Hola, choqué y mi aseguradora me mandó con ustedes",
    "Hola, ¿revisan híbridos en la sucursal Arco Sur?",
  ],
}
const RESPUESTAS = {
  rosales:
    "¡Hola! Soy Lupita, de Mecánica Rosales. Te aparto un lugar mañana a las 9:00; trae tu auto y te damos el presupuesto por escrito antes de tocarlo. Esta respuesta es de ejemplo; no se envió ningún mensaje.",
  vertice:
    "¡Hola! Soy Paola, asesora de Vértice. Podemos pasar por tu auto mañana entre 8:00 y 10:00; te mandaremos fotos del diagnóstico por aquí. Esta respuesta es de ejemplo; no se envió ningún mensaje.",
}
const storage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function GuiaTaller() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
      <p>
        Esta demo tiene dos talleres ficticios en Xalapa, uno por tema: Mecánica Rosales, taller
        familiar de un solo local, y Vértice, servicio multimarca con cuatro sucursales. Se cambian
        en la esquina inferior derecha; la elección se guarda en este navegador.
      </p>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          «¿Qué luz se encendió?» explica seis testigos del tablero: qué pueden ser, qué tan urgente
          es y qué ofrece cada taller. Es orientación general, no un diagnóstico.
        </li>
        <li>
          La orden de servicio es un ejemplo de lo que pide la NOM-174-SCFI-2007: folio, inventario,
          presupuesto por partida y firma. Folios, placas y número de contrato son inventados.
        </li>
        <li>
          En Rosales, «Consulta tu auto» encuentra la orden de ejemplo con su folio y sus placas y
          muestra en qué etapa va. No hay otras órdenes ni servidor.
        </li>
        <li>
          En Vértice, «Mi garaje» muestra un perfil de ejemplo. Las sucursales usan avenidas reales
          como referencia; ahí no hay ningún taller.
        </li>
        <li>
          Llamar y WhatsApp abren una simulación: no se marca ni se envía nada. Precios, personas y
          horarios son de ejemplo.
        </li>
      </ul>
      <p>“Contactar” y “Hablemos” abren los canales reales de Ian para consultar un proyecto.</p>
    </div>
  )
}

function LlamadaSimulada({ taller, onCerrar }) {
  return (
    <Modal title={`Llamar a ${taller.nombre}`} onClose={onCerrar} className="t-modal" radius={14}>
      <p className="t-modal-texto">
        En un taller real, este botón marcaría al <span className="t-num">{taller.telefono}</span>.
        Es un número de ejemplo: la demo no hace llamadas.
      </p>
      <p className="t-modal-texto">{taller.horario}.</p>
      <button type="button" className="t-btn t-btn-p" onClick={onCerrar}>
        Volver a la demo
      </button>
    </Modal>
  )
}

export default function TallerApp() {
  useFavicon("/favicons/taller.svg")
  const { pathname, hash } = useLocation()
  const [tema, setTema] = useState(() => leerTema(storage()))
  const taller = TALLERES[tema]
  const [chat, setChat] = useState(null)
  const [llamada, setLlamada] = useState(false)
  useEffect(() => {
    guardarTema(storage(), tema)
    // Los diálogos se montan fuera de .taller-root; el tema les llega por <html>.
    document.documentElement.dataset.tallerTema = tema
    return () => delete document.documentElement.dataset.tallerTema
  }, [tema])
  const ruta = pathname.replace(/\/+$/, "")
  usePageMetadata(
    `${TITULOS[ruta] || "Página no encontrada"} — ${taller.nombre}, ${taller.descripcion} · Demo de Ian Aldana Martínez`,
    "Taller mecánico ficticio con dos temas: un taller familiar de colonia y un servicio multimarca con sucursales. Testigos del tablero, presupuesto por partida y precios a la vista. Portafolio de Ian Aldana Martínez.",
  )
  useEffect(() => {
    const destino = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (destino) {
      destino.scrollIntoView({ block: "start" })
      const h = destino.querySelector("h2, h3")
      h?.setAttribute("tabindex", "-1")
      h?.focus({ preventScroll: true })
    } else document.querySelector("#contenido h1")?.focus({ preventScroll: true })
  }, [pathname, hash])

  const agendar = (mensaje) =>
    setChat({
      mensajes: mensaje ? [mensaje, ...MENSAJES[tema].slice(0, 2)] : MENSAJES[tema],
    })
  const whatsapp = () => setChat({ mensajes: MENSAJES[tema] })

  return (
    <div className="taller-root" data-tema={tema}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBanner guide={<GuiaTaller />} />
      <header className="t-cab-borde">
        <div className="t-wrap t-cab">
          <Link className="t-marca" to="/taller" aria-label={`${taller.nombre}, inicio`}>
            {taller.nombre}
          </Link>
          <nav className="t-nav" aria-label="Secciones del taller">
            {SECCIONES[tema].map(([id, nombre]) => (
              <Link key={id} to={`/taller#${id}`}>
                {nombre}
              </Link>
            ))}
          </nav>
          <button type="button" className="t-tel t-num" onClick={() => setLlamada(true)}>
            <span className="t-oculto">Llamar al </span>
            {taller.telefono}
          </button>
        </div>
      </header>
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route
            index
            element={<Inicio taller={taller} onAgendar={agendar} onWhatsApp={whatsapp} />}
          />
          <Route path="creditos" element={<Creditos />} />
          <Route path="*" element={<Navigate to="/taller" replace />} />
        </Routes>
      </main>
      <ComercialCTA
        giro="taller mecánico"
        accentColor={tema === "vertice" ? "#FFB000" : "#E2574C"}
        backgroundColor={tema === "vertice" ? "#171A1F" : "#1D222B"}
        textColor="#ECEEF1"
        fontFamily="Taller Texto, system-ui, sans-serif"
        headingFontFamily="Taller Titulo, system-ui, sans-serif"
        radius={14}
      />
      <footer className="t-wrap t-pie">
        <div>
          <p>
            <b>{taller.nombre}</b> · {taller.direccion}
          </p>
          <p>{taller.horario}</p>
          <p>
            Garantía de {taller.garantia} en mano de obra. Negocio ficticio creado para una
            demostración; solo guarda en tu navegador el taller elegido.
          </p>
        </div>
        <Link to="/taller/creditos">Créditos de fotos y tipografías</Link>
      </footer>
      <nav className="t-barra-movil" aria-label="Contacto rápido">
        <button type="button" onClick={() => setLlamada(true)}>
          Llamar
        </button>
        <button type="button" onClick={whatsapp}>
          WhatsApp
        </button>
        <button type="button" onClick={() => agendar()}>
          Agendar
        </button>
      </nav>
      {llamada && <LlamadaSimulada taller={taller} onCerrar={() => setLlamada(false)} />}
      <WhatsAppPreview
        isOpen={Boolean(chat)}
        onClose={() => setChat(null)}
        businessName={taller.nombre}
        fontFamily="Taller Texto, system-ui, sans-serif"
        radius={14}
        messages={chat?.mensajes}
        autoReply={RESPUESTAS[tema]}
      />
      <SelectorTema tema={tema} onCambiar={setTema} />
      <WaterMark />
    </div>
  )
}
