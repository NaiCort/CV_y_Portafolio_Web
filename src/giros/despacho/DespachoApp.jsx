import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
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
import { DESPACHO } from "./data/despacho"
import "./despacho.css"

const SECCIONES = [
  ["precios", "Precios"],
  ["como", "Cómo trabajamos"],
  ["servicios", "Servicios"],
  ["herramientas", "Herramientas"],
  ["equipo", "Quiénes somos"],
]
const TITULOS = { "/despacho": "Inicio", "/despacho/creditos": "Créditos" }
const MENSAJES = [
  "Hola, quiero una cotización para mi negocio",
  "Hola, mi contador dejó de presentar mis declaraciones",
  "Hola, ¿me ayudan con mi declaración anual?",
]
const RESPUESTA =
  "¡Hola! Soy Elena, de Cotejo. Para cotizarte necesito tu régimen, cuántas facturas emites al mes y si tienes empleados; te mando la propuesta en menos de 24 horas. Esta respuesta es de ejemplo; no se envió ningún mensaje."

function Guia() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
      <p>
        Cotejo es un despacho contable ficticio en Xalapa para personas físicas y empresas. La
        contadora, los clientes, la cédula, los precios y las cifras son de ejemplo.
      </p>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          El expediente de la portada es un ejemplo de cómo un cliente vería su situación ante el
          SAT. «Aprobar el previo» cambia el semáforo; no se envía nada.
        </li>
        <li>
          Al elegir un régimen, el recibo muestra el precio aproximado y lo que incluye. «Cotizar»
          abre una conversación de WhatsApp simulada.
        </li>
        <li>Llamar y WhatsApp son simulaciones: no se marca ni se envía nada.</li>
      </ul>
      <p>“Contactar” y “Hablemos” abren los canales reales de Ian para consultar un proyecto.</p>
    </div>
  )
}

function Llamada({ onCerrar }) {
  return (
    <Modal title="Llamar a Cotejo" onClose={onCerrar} className="d-modal" radius={14}>
      <p className="d-modal-texto">
        En un despacho real, este botón marcaría al{" "}
        <span className="d-num">{DESPACHO.telefono}</span>. Es un número de ejemplo: la demo no hace
        llamadas.
      </p>
      <p className="d-modal-texto">{DESPACHO.horario}.</p>
      <button type="button" className="d-btn d-btn-p" onClick={onCerrar}>
        Volver a la demo
      </button>
    </Modal>
  )
}

function EnlaceSeccion({ id, nombre }) {
  return <Link to={`/despacho#${id}`}>{nombre}</Link>
}

export default function DespachoApp() {
  useFavicon("/favicons/despacho.svg")
  const { pathname, hash } = useLocation()
  const ruta = pathname.replace(/\/+$/, "")
  const [chat, setChat] = useState(null)
  const [llamada, setLlamada] = useState(false)
  const [menuEn, setMenuEn] = useState(null)
  const menuAbierto = menuEn === pathname + hash
  usePageMetadata(
    `${TITULOS[ruta] || "Página no encontrada"} — Cotejo, despacho contable en Xalapa · Demo de Ian Aldana Martínez`,
    "Despacho contable ficticio para personas físicas y empresas: expediente con semáforo de cumplimiento, precios aproximados por régimen y cotización. Portafolio de Ian Aldana Martínez.",
  )
  useEffect(() => {
    const destino = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (destino) {
      destino.scrollIntoView({ block: "start" })
      const h = destino.querySelector("h2")
      h?.setAttribute("tabindex", "-1")
      h?.focus({ preventScroll: true })
    } else document.querySelector("#contenido h1")?.focus({ preventScroll: true })
  }, [pathname, hash])

  const whatsapp = () => setChat({ mensajes: MENSAJES })
  const cotizar = (regimen) =>
    setChat({
      mensajes: regimen
        ? [`Hola, quiero cotizar: ${regimen.nombre.toLowerCase()}`, ...MENSAJES.slice(1)]
        : MENSAJES,
    })

  return (
    <div className="despacho-root">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBanner guide={<Guia />} />
      <header className="d-cab-borde">
        <div className="d-wrap d-cab">
          <Link className="d-marca" to="/despacho" aria-label="Cotejo, inicio">
            Cotejo
          </Link>
          <nav className="d-nav" aria-label="Secciones del despacho">
            {SECCIONES.map(([id, nombre]) => (
              <EnlaceSeccion key={id} id={id} nombre={nombre} />
            ))}
          </nav>
          <button type="button" className="d-tel d-num" onClick={() => setLlamada(true)}>
            <span className="d-oculto">Llamar al </span>
            {DESPACHO.telefono}
          </button>
          <button type="button" className="d-btn d-btn-p d-cab-cta" onClick={() => cotizar()}>
            Cotizar
          </button>
          <button
            type="button"
            className="d-btn d-menu-boton"
            aria-expanded={menuAbierto}
            aria-controls="d-menu-movil"
            onClick={() => setMenuEn(menuAbierto ? null : pathname + hash)}
          >
            <Menu aria-hidden="true" size={18} strokeWidth={2.25} />
            Menú
          </button>
        </div>
        <nav
          id="d-menu-movil"
          className="d-menu-movil d-wrap"
          aria-label="Menú del despacho"
          hidden={!menuAbierto}
          onClick={(e) => e.target.closest("a") && setMenuEn(null)}
        >
          {SECCIONES.map(([id, nombre]) => (
            <EnlaceSeccion key={id} id={id} nombre={nombre} />
          ))}
        </nav>
      </header>
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route index element={<Inicio onWhatsApp={whatsapp} onCotizar={cotizar} />} />
          <Route path="creditos" element={<Creditos />} />
          <Route path="*" element={<Navigate to="/despacho" replace />} />
        </Routes>
      </main>
      <ComercialCTA
        giro="despacho contable"
        accentColor="#7FC3D3"
        backgroundColor="#10232A"
        textColor="#EEF1F0"
        fontFamily="Cotejo Texto, system-ui, sans-serif"
        headingFontFamily="Cotejo Titulo, Georgia, serif"
        radius={18}
      />
      <footer className="d-wrap d-pie">
        <div>
          <p>
            <b>{DESPACHO.completo}</b> · {DESPACHO.direccion}
          </p>
          <p>{DESPACHO.horario}</p>
          <p>Despacho ficticio creado para una demostración; esta página no guarda datos.</p>
        </div>
        <Link to="/despacho/creditos">Créditos</Link>
      </footer>
      <nav className="d-barra-movil" aria-label="Contacto rápido">
        <button type="button" onClick={() => setLlamada(true)}>
          Llamar
        </button>
        <button type="button" onClick={whatsapp}>
          WhatsApp
        </button>
        <button type="button" onClick={() => cotizar()}>
          Cotizar
        </button>
      </nav>
      {llamada && <Llamada onCerrar={() => setLlamada(false)} />}
      <WhatsAppPreview
        isOpen={Boolean(chat)}
        onClose={() => setChat(null)}
        businessName="Cotejo"
        fontFamily="Cotejo Texto, system-ui, sans-serif"
        radius={14}
        messages={chat?.mensajes}
        autoReply={RESPUESTA}
      />
      <WaterMark />
    </div>
  )
}
