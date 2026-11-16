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
import Cita from "./pages/Cita"
import Consulta from "./pages/Consulta"
import Precios from "./pages/Precios"
import Usados from "./pages/Usados"
import Hojalateria from "./pages/Hojalateria"
import Hibridos from "./pages/Hibridos"
import Garaje from "./pages/Garaje"
import SelectorTema from "./components/SelectorTema"
import { TALLERES } from "./data/talleres"
import { TEMA_KEY, guardarTema, leerTema } from "./lib/tema"
import { CITAS_KEY, cargarCitas, guardarCitas } from "./lib/citas"
import { ORDEN_KEY } from "./lib/orden"
import { GARAJE_KEY } from "./lib/garaje"
import Privacidad from "./components/Privacidad"
import "./taller.css"

const SECCIONES = {
  rosales: [
    ["testigos", "Testigos del tablero"],
    ["/taller/precios", "Precios"],
    ["/taller/usados", "Revisión de usados"],
    ["/taller/consulta", "Consulta tu auto"],
    ["ubicacion", "Cómo llegar"],
  ],
  vertice: [
    ["/taller/precios", "Precios"],
    ["/taller/hojalateria", "Hojalatería y seguros"],
    ["/taller/hibridos", "Híbridos"],
    ["sucursales", "Sucursales"],
    ["/taller/garaje", "Mi garaje"],
  ],
}
// En el menú del teléfono van además estas páginas.
const EXTRA_MOVIL = {
  rosales: [["/taller/cita", "Agendar cita"]],
  vertice: [
    ["/taller/consulta", "Consulta tu auto"],
    ["/taller/cita", "Agendar cita"],
  ],
}
const TITULOS = {
  "/taller": "Inicio",
  "/taller/cita": "Agendar cita",
  "/taller/consulta": "Consulta tu auto",
  "/taller/precios": "Lista de precios",
  "/taller/usados": "Revisión antes de comprar un usado",
  "/taller/hojalateria": "Hojalatería y seguros",
  "/taller/hibridos": "Híbridos y eléctricos",
  "/taller/garaje": "Mi garaje",
  "/taller/creditos": "Créditos",
}
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
          «Consulta tu auto» abre la orden de ejemplo de cada taller con su folio y sus placas: el
          presupuesto por partida con la medida, el desglose y la decisión de autorizar o no; la
          firma; la reparación, con un hallazgo que pide autorización antes de seguir; y la entrega
          con comprobante, piezas cambiadas y garantía. Si no se autoriza nada, se paga solo el
          diagnóstico. No hay otras órdenes ni servidor; «Reiniciar» vuelve al principio.
        </li>
        <li>
          El mapa es real (OpenStreetMap, servido por OpenFreeMap). Rosales tiene un solo local en
          la colonia Revolución; Vértice, cuatro sucursales en otras zonas de la ciudad. Cada punto
          está junto a una calle o lugar real que sirve de referencia; ahí no hay ningún taller. El
          horario y el «abierto ahora» son de ejemplo.
        </li>
        <li>En Vértice, «Mi garaje» muestra un perfil de ejemplo.</li>
        <li>
          «Agendar cita» pide el servicio, el auto, dónde y cuándo, y tus datos. En Rosales el
          mecánico puede ir a domicilio dentro de la colonia; en Vértice se elige sucursal y se
          puede pedir recolección. Las horas tachadas son ocupaciones simuladas. Las citas se
          guardan solo en este navegador y se pueden cancelar o agregar al calendario.
        </li>
        <li>
          En Vértice, «Hojalatería y seguros» explica cómo se trabaja con o sin aseguradora y
          calcula si conviene usar el deducible; «Híbridos» muestra un reporte de batería de
          ejemplo; «Mi garaje» se abre con el perfil de ejemplo de Mariana (los datos para entrar se
          muestran en pantalla) y permite actualizar el kilometraje de sus dos autos.
        </li>
        <li>
          «Precios» tiene la lista completa de cada taller con una suma aproximada y las reglas de
          cobro del contrato tipo de Profeco. «Revisión de usados» es solo de Rosales: qué se revisa
          y un reporte de ejemplo de un auto inventado.
        </li>
        <li>
          Llamar y WhatsApp abren una simulación: no se marca ni se envía nada. Precios, personas y
          horarios son de ejemplo.
        </li>
      </ul>
      <p>
        El «Aviso de privacidad», al pie de cada página, dice qué se guarda y permite borrarlo todo.
      </p>
      <p>“Contactar” y “Hablemos” abren los canales reales de Ian para consultar un proyecto.</p>
    </div>
  )
}

function EnlaceSeccion({ id, nombre, ruta }) {
  const to = id.startsWith("/") ? id : `/taller#${id}`
  return (
    <Link to={to} aria-current={to === ruta ? "page" : undefined}>
      {nombre}
    </Link>
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
  const [privacidad, setPrivacidad] = useState(false)
  // Al borrar los datos, las páginas se vuelven a montar para leer el almacenamiento vacío.
  const [reinicio, setReinicio] = useState(0)
  const [aviso, setAviso] = useState(null)
  useEffect(() => {
    if (!aviso) return undefined
    const timer = setTimeout(() => setAviso(null), 6000)
    return () => clearTimeout(timer)
  }, [aviso])
  useEffect(() => {
    guardarTema(storage(), tema)
    // Los diálogos se montan fuera de .taller-root; el tema les llega por <html>.
    document.documentElement.dataset.tallerTema = tema
    return () => delete document.documentElement.dataset.tallerTema
  }, [tema])
  const ruta = pathname.replace(/\/+$/, "")
  // Menú del teléfono: se cierra solo al cambiar de página o de sección.
  const [menuEn, setMenuEn] = useState(null)
  const menuAbierto = menuEn === pathname + hash
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

  // Citas simuladas, guardadas en este navegador.
  const [citas, setCitas] = useState(() => cargarCitas(storage()))
  useEffect(() => guardarCitas(storage(), citas), [citas])
  const agregarCita = (cita) => setCitas((c) => [...c, cita])
  const cancelarCita = (id) =>
    setCitas((c) => c.map((x) => (x.id === id ? { ...x, estado: "cancelada" } : x)))
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
              <EnlaceSeccion key={id} id={id} nombre={nombre} ruta={ruta} />
            ))}
          </nav>
          <button type="button" className="t-tel t-num" onClick={() => setLlamada(true)}>
            <span className="t-oculto">Llamar al </span>
            {taller.telefono}
          </button>
          <Link
            className="t-btn t-btn-p t-cab-cita"
            to="/taller/cita"
            aria-current={pathname.replace(/\/+$/, "") === "/taller/cita" ? "page" : undefined}
          >
            Agendar cita
          </Link>
          <button
            type="button"
            className="t-btn t-btn-s t-menu-boton"
            aria-expanded={menuAbierto}
            aria-controls="t-menu-movil"
            onClick={() => setMenuEn(menuAbierto ? null : pathname + hash)}
          >
            <Menu aria-hidden="true" size={18} strokeWidth={2.25} />
            Menú
          </button>
        </div>
        <nav
          id="t-menu-movil"
          className="t-menu-movil t-wrap"
          aria-label="Menú del taller"
          hidden={!menuAbierto}
          onClick={(e) => e.target.closest("a") && setMenuEn(null)}
        >
          {[...SECCIONES[tema], ...EXTRA_MOVIL[tema]].map(([id, nombre]) => (
            <EnlaceSeccion key={id} id={id} nombre={nombre} ruta={ruta} />
          ))}
        </nav>
      </header>
      <main id="contenido" tabIndex={-1} key={reinicio}>
        <Routes>
          <Route
            index
            element={
              <Inicio taller={taller} onWhatsApp={whatsapp} onLlamar={() => setLlamada(true)} />
            }
          />
          <Route
            path="cita"
            element={
              <Cita
                key={tema}
                taller={taller}
                citas={citas}
                onAgendar={agregarCita}
                onCancelar={cancelarCita}
              />
            }
          />
          <Route path="consulta" element={<Consulta key={tema} taller={taller} />} />
          <Route path="precios" element={<Precios key={tema} taller={taller} />} />
          <Route path="usados" element={<Usados taller={taller} onCambiar={setTema} />} />
          <Route path="hojalateria" element={<Hojalateria taller={taller} onCambiar={setTema} />} />
          <Route path="hibridos" element={<Hibridos taller={taller} onCambiar={setTema} />} />
          <Route
            path="garaje"
            element={<Garaje taller={taller} onCambiar={setTema} citas={citas} />}
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
            demostración; lo que guarda se queda en tu navegador.
          </p>
        </div>
        <div className="t-pie-enlaces">
          <Link to="/taller/creditos">Créditos de fotos y tipografías</Link>
          <button type="button" className="t-inline" onClick={() => setPrivacidad(true)}>
            Aviso de privacidad
          </button>
        </div>
      </footer>
      <nav className="t-barra-movil" aria-label="Contacto rápido">
        <button type="button" onClick={() => setLlamada(true)}>
          Llamar
        </button>
        <button type="button" onClick={whatsapp}>
          WhatsApp
        </button>
        <Link to="/taller/cita">Agendar</Link>
      </nav>
      {llamada && <LlamadaSimulada taller={taller} onCerrar={() => setLlamada(false)} />}
      {privacidad && (
        <Privacidad
          onCerrar={() => setPrivacidad(false)}
          onBorrar={() => {
            for (const clave of [TEMA_KEY, CITAS_KEY, ORDEN_KEY, GARAJE_KEY]) {
              try {
                window.localStorage.removeItem(clave)
              } catch {
                /* Nada que borrar. */
              }
            }
            setCitas([])
            setTema("rosales")
            setReinicio((n) => n + 1)
            setPrivacidad(false)
            setAviso("Se borraron las citas, el presupuesto, Mi garaje y el taller elegido.")
          }}
        />
      )}
      <div className="t-aviso-region" role="status" aria-live="polite">
        {aviso && (
          <div className="t-aviso">
            <span>{aviso}</span>
            <button type="button" className="t-inline" onClick={() => setAviso(null)}>
              Cerrar aviso
            </button>
          </div>
        )}
      </div>
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
