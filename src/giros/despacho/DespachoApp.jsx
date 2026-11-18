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
import Precios from "./pages/Precios"
import Diagnostico from "./pages/Diagnostico"
import Calendario from "./pages/Calendario"
import Calculadoras from "./pages/Calculadoras"
import ExpedientePagina from "./pages/ExpedientePagina"
import Guias from "./pages/Guias"
import Servicios from "./pages/Servicios"
import Regularizacion from "./pages/Regularizacion"
import Privacidad from "./components/Privacidad"
import { EXPEDIENTE_KEY } from "./lib/expediente"
import { DESPACHO } from "./data/despacho"
import "./despacho.css"

const SECCIONES = [
  ["/despacho/precios", "Precios"],
  ["/despacho/diagnostico", "Diagnóstico"],
  ["/despacho/calendario", "Calendario"],
  ["/despacho/calculadoras", "Calculadoras"],
  ["/despacho/servicios", "Servicios"],
]
// En el menú del teléfono van además estas secciones.
const EXTRA_MOVIL = [
  ["/despacho/expediente", "Tu expediente"],
  ["/despacho/regularizacion", "¿Te dejaron de presentar?"],
  ["/despacho/guias", "Guías cortas"],
  ["como", "Cómo trabajamos"],
  ["equipo", "Quiénes somos"],
]
const TITULOS = {
  "/despacho": "Inicio",
  "/despacho/precios": "Precios y cotización",
  "/despacho/diagnostico": "Diagnóstico gratuito",
  "/despacho/calendario": "Calendario fiscal",
  "/despacho/calculadoras": "Calculadoras",
  "/despacho/expediente": "Tu expediente",
  "/despacho/servicios": "Servicios",
  "/despacho/regularizacion": "¿Te dejaron de presentar?",
  "/despacho/guias": "Guías cortas",
  "/despacho/creditos": "Créditos",
}
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
          Al elegir un régimen, el recibo muestra el precio aproximado y lo que incluye. «Precios»
          tiene la lista completa, lo que se cobra aparte y una cotización con estimación al
          momento; la solicitud es simulada y no se guarda.
        </li>
        <li>
          Diagnóstico, calendario y calculadoras son orientativos: el diagnóstico sugiere régimen y
          riesgos con cinco respuestas, el calendario marca las fechas del mes por régimen y las
          calculadoras usan las tablas y la UMA de 2026. Nada se guarda.
        </li>
        <li>
          «Tu expediente» abre sin contraseña el perfil de ejemplo de Mariana (RESICO): semáforo,
          previo del mes para aprobar o preguntar, documentos que el despacho pide (el archivo no
          sale del navegador: solo se anota su nombre), documentos para consultar y un recordatorio
          por WhatsApp que se activa sin enviar nada. Se guarda en este navegador.
        </li>
        <li>
          Servicios dice qué incluye cada uno, qué se pide y cuánto cuesta. «¿Te dejaron de
          presentar?» explica cómo revisar y corregir declaraciones atrasadas antes de que el SAT
          las pida.
        </li>
        <li>
          Las guías cortas son orientativas, con reglas de 2026. Las opiniones de clientes son
          inventadas, y las fotos de la contadora y de la sala son ilustrativas, de un banco de
          imágenes de uso libre: la persona no es Elena.
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

function EnlaceSeccion({ id, nombre, ruta }) {
  const to = id.startsWith("/") ? id : `/despacho#${id}`
  return (
    <Link to={to} aria-current={to === ruta ? "page" : undefined}>
      {nombre}
    </Link>
  )
}

export default function DespachoApp() {
  useFavicon("/favicons/despacho.svg")
  const { pathname, hash } = useLocation()
  const ruta = pathname.replace(/\/+$/, "")
  const [chat, setChat] = useState(null)
  const [llamada, setLlamada] = useState(false)
  const [privacidad, setPrivacidad] = useState(false)
  // Al borrar los datos, las páginas se vuelven a montar para leer el almacenamiento vacío.
  const [reinicio, setReinicio] = useState(0)
  const [aviso, setAviso] = useState(null)
  useEffect(() => {
    if (!aviso) return undefined
    const t = setTimeout(() => setAviso(null), 6000)
    return () => clearTimeout(t)
  }, [aviso])
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
              <EnlaceSeccion key={id} id={id} nombre={nombre} ruta={ruta} />
            ))}
          </nav>
          <button type="button" className="d-tel d-num" onClick={() => setLlamada(true)}>
            <span className="d-oculto">Llamar al </span>
            {DESPACHO.telefono}
          </button>
          <Link
            className="d-btn d-cab-cta"
            to="/despacho/expediente"
            aria-current={ruta === "/despacho/expediente" ? "page" : undefined}
          >
            Tu expediente
          </Link>
          <Link className="d-btn d-btn-p d-cab-cta" to="/despacho/precios#cotizar">
            Cotizar
          </Link>
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
          {[...SECCIONES, ...EXTRA_MOVIL].map(([id, nombre]) => (
            <EnlaceSeccion key={id} id={id} nombre={nombre} ruta={ruta} />
          ))}
        </nav>
      </header>
      <main id="contenido" tabIndex={-1} key={reinicio}>
        <Routes>
          <Route index element={<Inicio onWhatsApp={whatsapp} />} />
          <Route path="precios" element={<Precios />} />
          <Route path="diagnostico" element={<Diagnostico />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="calculadoras" element={<Calculadoras />} />
          <Route path="expediente" element={<ExpedientePagina onWhatsApp={whatsapp} />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="regularizacion" element={<Regularizacion />} />
          <Route path="guias" element={<Guias />} />
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
          <p>
            Despacho ficticio creado para una demostración; el expediente de ejemplo se guarda solo
            en tu navegador y se borra desde el aviso de privacidad.
          </p>
        </div>
        <div className="d-pie-enlaces">
          <Link to="/despacho/regularizacion">¿Te dejaron de presentar?</Link>
          <Link to="/despacho/guias">Guías cortas</Link>
          <Link to="/despacho/creditos">Créditos</Link>
          <button type="button" className="d-inline" onClick={() => setPrivacidad(true)}>
            Aviso de privacidad
          </button>
        </div>
      </footer>
      <nav className="d-barra-movil" aria-label="Contacto rápido">
        <button type="button" onClick={() => setLlamada(true)}>
          Llamar
        </button>
        <button type="button" onClick={whatsapp}>
          WhatsApp
        </button>
        <Link to="/despacho/precios#cotizar">Cotizar</Link>
      </nav>
      {llamada && <Llamada onCerrar={() => setLlamada(false)} />}
      {privacidad && (
        <Privacidad
          onCerrar={() => setPrivacidad(false)}
          onBorrar={() => {
            try {
              window.localStorage.removeItem(EXPEDIENTE_KEY)
            } catch {
              /* Nada que borrar. */
            }
            setReinicio((n) => n + 1)
            setPrivacidad(false)
            setAviso("Se borró el expediente de ejemplo.")
          }}
        />
      )}
      <div className="d-aviso-region" role="status" aria-live="polite">
        {aviso && (
          <div className="d-aviso">
            <span>{aviso}</span>
            <button type="button" className="d-inline" onClick={() => setAviso(null)}>
              Cerrar aviso
            </button>
          </div>
        )}
      </div>
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
