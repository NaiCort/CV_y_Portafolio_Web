import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Menu, ShoppingBag } from "lucide-react"
import DemoBanner from "../../components/shared/DemoBanner"
import ComercialCTA from "../../components/shared/ComercialCTA"
import WaterMark from "../../components/WaterMark"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import Inicio from "./pages/Inicio"
import Creditos from "./pages/Creditos"
import Clases from "./pages/Clases"
import Planes from "./pages/Planes"
import Alta from "./pages/Alta"
import Socio from "./pages/Socio"
import Coaches from "./pages/Coaches"
import Tienda from "./pages/Tienda"
import Producto from "./pages/Producto"
import Carrito from "./pages/Carrito"
import { findProducto } from "./data/tienda"
import { nombrePaquete } from "./data/coaches"
import { TIENDA_KEY, cargarTienda, cuentas, guardarTienda, tiendaReducer } from "./lib/tienda"
import { EVALUACION_KEY, cargarEvaluacion, guardarEvaluacion } from "./lib/evaluacion"
import Privacidad from "./components/Privacidad"
import { SOCIO_KEY, cargarSocio, guardarSocio, socioReducer } from "./lib/socio"
import SelectorTema from "./components/SelectorTema"
import { TEMA_KEY, guardarTema, leerTema } from "./lib/tema"
import { findCategoria } from "./data/clases"
import {
  avanzarEspera,
  calificar,
  cancelar,
  RESERVAS_KEY,
  cargar,
  guardar,
  reservar,
  terminar,
} from "./lib/reservas"
import "./gimnasio.css"

const SECCIONES = [
  ["/gimnasio#sucursales", "Sucursales"],
  ["/gimnasio/clases", "Clases"],
  ["/gimnasio/planes", "Planes"],
  ["/gimnasio/coaches", "Coaches"],
  ["/gimnasio/tienda", "Tienda"],
  ["/gimnasio/socio", "Socio"],
]
const TITULOS = {
  "/gimnasio": "Inicio",
  "/gimnasio/clases": "Clases",
  "/gimnasio/planes": "Planes",
  "/gimnasio/alta": "Hazte socio",
  "/gimnasio/socio": "Área de socio",
  "/gimnasio/coaches": "Coaches",
  "/gimnasio/tienda": "Tienda",
  "/gimnasio/carrito": "Carrito",
  "/gimnasio/creditos": "Créditos",
}
const storage = () => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function GuiaBrio() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
      <p>
        Brío es un club de entrenamiento ficticio con cinco sucursales en Xalapa. Sucursales,
        coaches, socios, precios y horarios son de ejemplo.
      </p>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          El aforo cambia con la hora del día siguiendo una curva típica de gimnasio. No mide a
          nadie.
        </li>
        <li>
          El mapa es real (OpenStreetMap, servido por OpenFreeMap). Cada sucursal está junto a un
          parque o paseo público que sirve de referencia; ahí no hay ningún gimnasio.
        </li>
        <li>
          Las próximas clases salen de un horario semanal de ejemplo; los lugares libres son
          simulados.
        </li>
        <li>
          El teléfono muestra el área de socio con un perfil inventado. El código QR cambia cada 30
          segundos y no abre ningún torniquete.
        </li>
        <li>
          Hay dos temas de color, Cobalto y Distrito, en la esquina inferior derecha. La elección se
          guarda en este navegador.
        </li>
        <li>
          Clases tiene el horario de la semana con filtros y reservas con lugar elegido. Si la clase
          está llena, la lista de espera avanza un lugar cada 12 segundos para mostrar el cambio.
          Las reservas se guardan en este navegador; el resumen después de clase es un ejemplo.
        </li>
        <li>
          Planes compara las tres membresías y lleva al alta en cinco pasos: plan, cuenta, salud,
          reglamento con firma y pago. El paso de salud solo explica el cuestionario: la demo no
          pide datos de salud. Nada del alta se guarda ni se envía.
        </li>
        <li>La clase de prueba gratis se aparta desde Planes; es una por persona.</li>
        <li>
          El área de socio se abre con el perfil de ejemplo de Andrea (los datos para entrar se
          muestran en pantalla). Ahí están el pase, la semana, la composición corporal, el reloj
          simulado, los pases de invitado y la membresía: congelar, cancelar en un paso y el aviso
          antes de renovar.
        </li>
        <li>
          Coaches presenta a seis coaches inventados (sin fotos: nadie de los videos es coach de
          Brío). La evaluación gratuita se agenda con coach, sucursal, día y hora; es una por
          persona y no pide datos de salud.
        </li>
        <li>
          La tienda tiene diez productos de ejemplo. Se apartan en línea y se pagan al recoger en la
          sucursal; si entras con el perfil de ejemplo ves el precio de socio. Las existencias por
          sucursal son de ejemplo. Nada se cobra ni se envía.
        </li>
      </ul>
      <p>“Contactar” y “Hablemos” abren los canales reales de Ian para consultar un proyecto.</p>
    </div>
  )
}

export default function GimnasioApp() {
  useFavicon("/favicons/gimnasio.svg")
  const { pathname, hash } = useLocation()
  const [tema, setTema] = useState(() => leerTema(storage()))
  const [aviso, setAviso] = useState(null)
  useEffect(() => {
    guardarTema(storage(), tema)
    // Los diálogos se montan fuera de .brio-root; el tema les llega por <html>.
    document.documentElement.dataset.brioTema = tema
    return () => delete document.documentElement.dataset.brioTema
  }, [tema])
  useEffect(() => {
    if (!aviso) return undefined
    const timer = setTimeout(() => setAviso(null), 6000)
    return () => clearTimeout(timer)
  }, [aviso])
  const ruta = pathname.replace(/\/+$/, "")
  const titulo =
    TITULOS[ruta] || (ruta.startsWith("/gimnasio/tienda/") && findProducto(ruta.slice(17))?.nombre)
  usePageMetadata(
    `${titulo || "Página no encontrada"} — Brío, club de entrenamiento · Demo de Ian Aldana Martínez`,
    "Gimnasio ficticio con cinco sucursales: aforo en vivo, clases, tres niveles de membresía y área de socio simulada. Portafolio de Ian Aldana Martínez.",
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
  const avisar = (texto) => setAviso({ id: Date.now(), texto })
  // Área de socio simulada: solo el perfil de ejemplo.
  const [socio, dispatchSocio] = useReducer(socioReducer, undefined, () => cargarSocio(storage()))
  useEffect(() => guardarSocio(storage(), socio), [socio])
  const [privacidad, setPrivacidad] = useState(false)
  const esSocio = socio.sesion && socio.membresia !== "cancelada"
  // Tienda: carrito y pedidos simulados, guardados en este navegador.
  const [tienda, dispatchTienda] = useReducer(tiendaReducer, undefined, () =>
    cargarTienda(storage()),
  )
  useEffect(() => guardarTienda(storage(), tienda), [tienda])
  const piezas = cuentas(tienda.carrito, false).piezas
  // Evaluación gratuita con un coach: una por persona.
  const [evaluacion, setEvaluacion] = useState(() => cargarEvaluacion(storage()))
  useEffect(() => guardarEvaluacion(storage(), evaluacion), [evaluacion])
  // Menú del teléfono: se cierra solo al cambiar de página.
  const [menuEn, setMenuEn] = useState(null)
  const menuAbierto = menuEn === pathname + hash
  // Reservas simuladas, guardadas en este navegador.
  const [reservas, setReservas] = useState(() => cargar(storage()))
  const reservasRef = useRef(reservas)
  useEffect(() => {
    reservasRef.current = reservas
    guardar(storage(), reservas)
  }, [reservas])
  const hayEspera = reservas.some((r) => r.estado === "espera")
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setAhora(new Date()), hayEspera ? 1000 : 30000)
    return () => clearInterval(timer)
  }, [hayEspera])
  useEffect(() => {
    const actuales = reservasRef.current
    const nuevas = avanzarEspera(actuales, ahora.getTime())
    if (nuevas === actuales) return
    const liberada = nuevas.find(
      (r, i) => r.liberada && actuales[i].estado === "espera" && r.estado === "confirmada",
    )
    setReservas(nuevas)
    if (liberada)
      setAviso({
        id: Date.now(),
        texto: `Se liberó un lugar en ${findCategoria(liberada.categoria).nombre}: tu reserva quedó confirmada.`,
      })
  }, [ahora])
  const onReservar = useCallback((datos) => {
    const nuevas = reservar(reservasRef.current, { ...datos, ahora: Date.now() })
    setReservas(nuevas)
    return nuevas.at(-1)
  }, [])
  const acciones = {
    onReservar,
    onCancelar: (id) => setReservas((r) => cancelar(r, id)),
    onTerminar: (id) => setReservas((r) => terminar(r, id)),
    onCalificar: (id, campo, valor) => setReservas((r) => calificar(r, id, campo, valor)),
  }
  return (
    <>
      <div className="brio-root" data-tema={tema}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <DemoBanner guide={<GuiaBrio />} />
        <header className="b-header b-wrap">
          <Link className="b-logo" to="/gimnasio" aria-label="Brío, inicio" translate="no">
            BRÍO
          </Link>
          <nav className="b-nav" aria-label="Navegación de la demo">
            {SECCIONES.map(([to, nombre]) => (
              <Link key={to} to={to} aria-current={to === pathname ? "page" : undefined}>
                {nombre}
              </Link>
            ))}
          </nav>
          <div className="b-header-acciones">
            {piezas > 0 && (
              <Link
                className="b-btn b-btn-carrito"
                to="/gimnasio/carrito"
                aria-current={pathname === "/gimnasio/carrito" ? "page" : undefined}
              >
                <ShoppingBag aria-hidden="true" size={18} strokeWidth={2.25} />
                <span className="b-carrito-texto">Carrito</span>
                <span className="b-num b-cuenta">{piezas}</span>
                <span className="b-oculto">{piezas === 1 ? " artículo" : " artículos"}</span>
              </Link>
            )}
            <Link className="b-btn" to="/gimnasio/socio">
              {socio.sesion ? "Mi perfil" : "Entrar"}
            </Link>
            <Link className="b-btn b-btn-p b-btn-reservar" to="/gimnasio/clases">
              Reservar clase
            </Link>
            <button
              type="button"
              className="b-btn b-btn-menu"
              aria-expanded={menuAbierto}
              aria-controls="b-menu-movil"
              onClick={() => setMenuEn(menuAbierto ? null : pathname + hash)}
            >
              <Menu aria-hidden="true" size={18} strokeWidth={2.25} />
              <span className="b-menu-texto">Menú</span>
            </button>
          </div>
        </header>
        <nav
          id="b-menu-movil"
          className="b-menu-movil b-wrap"
          aria-label="Menú de la demo"
          hidden={!menuAbierto}
          onClick={(e) => e.target.closest("a") && setMenuEn(null)}
        >
          {SECCIONES.map(([to, nombre]) => (
            <Link key={to} to={to} aria-current={to === pathname ? "page" : undefined}>
              {nombre}
            </Link>
          ))}
          <Link to="/gimnasio/clases">Reservar clase</Link>
        </nav>
        <main id="contenido" tabIndex={-1}>
          <Routes>
            <Route index element={<Inicio />} />
            <Route
              path="clases"
              element={<Clases reservas={reservas} ahora={ahora} {...acciones} />}
            />
            <Route path="planes" element={<Planes />} />
            <Route path="alta" element={<Alta />} />
            <Route
              path="socio"
              element={
                <Socio
                  socio={socio}
                  dispatch={dispatchSocio}
                  reservas={reservas}
                  acciones={acciones}
                  ahora={ahora}
                  onAviso={avisar}
                  onPrivacidad={() => setPrivacidad(true)}
                />
              }
            />
            <Route
              path="coaches"
              element={
                <Coaches
                  evaluacion={evaluacion}
                  esSocio={esSocio}
                  ahora={ahora}
                  onEvaluacion={(e) => {
                    setEvaluacion(e)
                    if (!e) avisar("Evaluación cancelada.")
                  }}
                  onAgregar={(p) => {
                    dispatchTienda({ type: "agregar", tipo: "paquete", id: p.id, cantidad: 1 })
                    avisar(`Agregaste al carrito: ${nombrePaquete(p)}.`)
                  }}
                />
              }
            />
            <Route
              path="tienda"
              element={
                <Tienda tienda={tienda} esSocio={esSocio} ahora={ahora} dispatch={dispatchTienda} />
              }
            />
            <Route
              path="tienda/:id"
              element={<Producto esSocio={esSocio} dispatch={dispatchTienda} />}
            />
            <Route
              path="carrito"
              element={
                <Carrito
                  tienda={tienda}
                  esSocio={esSocio}
                  ahora={ahora}
                  dispatch={dispatchTienda}
                />
              }
            />
            <Route path="creditos" element={<Creditos />} />
            <Route path="*" element={<Navigate to="/gimnasio" replace />} />
          </Routes>
        </main>
        <ComercialCTA
          giro="gimnasio"
          accentColor={tema === "distrito" ? "#E0683F" : "#6A8CFF"}
          backgroundColor={tema === "distrito" ? "#1C1A18" : "#141518"}
          textColor="#EEEDEA"
          fontFamily="Brio Texto, system-ui, sans-serif"
          headingFontFamily="Brio Titulo, system-ui, sans-serif"
          radius={18}
        />
        <footer className="b-footer b-wrap">
          <p>Brío · club de entrenamiento. Negocio ficticio creado para una demostración.</p>
          <div className="b-footer-enlaces">
            <Link to="/gimnasio/creditos">Créditos de fotos, video y tipografías</Link>
            <button type="button" className="b-inline" onClick={() => setPrivacidad(true)}>
              Aviso de privacidad
            </button>
          </div>
        </footer>
        <div className="b-aviso-region" role="status" aria-live="polite">
          {aviso && (
            <div key={aviso.id} className="b-aviso">
              <span>{aviso.texto}</span>
              <button type="button" onClick={() => setAviso(null)}>
                Cerrar aviso
              </button>
            </div>
          )}
        </div>
        {privacidad && (
          <Privacidad
            onCerrar={() => setPrivacidad(false)}
            onBorrar={() => {
              for (const clave of [RESERVAS_KEY, SOCIO_KEY, TIENDA_KEY, EVALUACION_KEY, TEMA_KEY]) {
                try {
                  window.localStorage.removeItem(clave)
                } catch {
                  /* Nada que borrar. */
                }
              }
              setReservas([])
              dispatchSocio({ type: "borrar" })
              dispatchTienda({ type: "borrar" })
              setEvaluacion(null)
              setTema("cobalto")
              setPrivacidad(false)
              avisar(
                "Se borraron las reservas, el perfil, el carrito, los pedidos y tus preferencias.",
              )
            }}
          />
        )}
        <SelectorTema tema={tema} onCambiar={setTema} />
        <WaterMark />
      </div>
    </>
  )
}
