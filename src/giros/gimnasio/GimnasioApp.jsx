import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import DemoBanner from "../../components/shared/DemoBanner"
import ComercialCTA from "../../components/shared/ComercialCTA"
import WaterMark from "../../components/WaterMark"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import Inicio from "./pages/Inicio"
import Creditos from "./pages/Creditos"
import Clases from "./pages/Clases"
import SelectorTema from "./components/SelectorTema"
import { guardarTema, leerTema } from "./lib/tema"
import { VIDEOS_KEY, VideosPausados } from "./lib/videos"
import { findCategoria } from "./data/clases"
import {
  avanzarEspera,
  calificar,
  cancelar,
  cargar,
  guardar,
  reservar,
  terminar,
} from "./lib/reservas"
import "./gimnasio.css"

const SECCIONES = [
  ["/gimnasio#sucursales", "Sucursales"],
  ["/gimnasio/clases", "Clases"],
  ["/gimnasio#planes", "Planes"],
  ["/gimnasio#socio", "Socio"],
]
const TITULOS = {
  "/gimnasio": "Inicio",
  "/gimnasio/clases": "Clases",
  "/gimnasio/creditos": "Créditos",
}
const PENDIENTES = {
  socio: "El área de socio con el perfil de ejemplo llega en la siguiente entrega de la demo.",
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
        <li>Alta, área de socio, coaches y tienda vienen en las siguientes entregas.</li>
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
  const titulo = TITULOS[pathname.replace(/\/+$/, "")]
  usePageMetadata(
    `${titulo || "Página no encontrada"} — Brío, club de entrenamiento · Demo de Ian Aldana Martínez`,
    "Gimnasio ficticio con cinco sucursales: aforo en vivo, clases, planes sin letra chica y área de socio simulada. Portafolio de Ian Aldana Martínez.",
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
  const pendiente = (clave) => setAviso({ id: Date.now(), texto: PENDIENTES[clave] })
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
  // Botón global para pausar los videos; la preferencia se guarda.
  const [pausados, setPausados] = useState(() => {
    try {
      return window.localStorage.getItem(VIDEOS_KEY) === "1"
    } catch {
      return false
    }
  })
  const videos = useMemo(
    () => ({
      pausados,
      alternar: () =>
        setPausados((p) => {
          try {
            window.localStorage.setItem(VIDEOS_KEY, p ? "0" : "1")
          } catch {
            /* Opcional. */
          }
          return !p
        }),
    }),
    [pausados],
  )
  return (
    <VideosPausados.Provider value={videos}>
      <div className="brio-root" data-tema={tema}>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <DemoBanner guide={<GuiaBrio />} />
        <header className="b-header b-wrap">
          <Link className="b-logo" to="/gimnasio" aria-label="Brío, inicio">
            BRÍO
          </Link>
          <nav aria-label="Navegación de la demo">
            {SECCIONES.map(([to, nombre]) => (
              <Link key={to} to={to} aria-current={to === pathname ? "page" : undefined}>
                {nombre}
              </Link>
            ))}
          </nav>
          <div className="b-header-acciones">
            <button type="button" className="b-btn" onClick={() => pendiente("socio")}>
              Entrar
            </button>
            <Link className="b-btn b-btn-p" to="/gimnasio/clases">
              Reservar clase
            </Link>
          </div>
        </header>
        <main id="contenido" tabIndex={-1}>
          <Routes>
            <Route index element={<Inicio onPendiente={pendiente} />} />
            <Route
              path="clases"
              element={<Clases reservas={reservas} ahora={ahora} {...acciones} />}
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
          <Link to="/gimnasio/creditos">Créditos de fotos y tipografías</Link>
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
        <SelectorTema tema={tema} onCambiar={setTema} />
        <WaterMark />
      </div>
    </VideosPausados.Provider>
  )
}
