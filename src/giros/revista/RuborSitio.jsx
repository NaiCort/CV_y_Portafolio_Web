import { useEffect, useRef, useState } from "react"
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom"
import ComercialCTA from "../../components/shared/ComercialCTA"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import { ACTUAL, LECTORA, NUMEROS, PALETAS, fechaNumero, findNumero, foto } from "./data/rubor"
import Cuenta from "./pages/rubor/Cuenta"
import { CLAVE_PLAN, leerPlan } from "./lib/suscripcion"
import { Secciones, Sesion } from "./pages/rubor/Secciones"
import Numero from "./pages/rubor/Numero"
import MarcadoresRubor from "./pages/rubor/Marcadores"
import { useMarcadores } from "./lib/marcadores"
import "./rubor.css"

// El número que se está viendo decide la paleta de todo el sitio.
function numeroDeRuta(pathname) {
  const m = pathname.match(/\/numero\/(\d+)/)
  return (m && findNumero(m[1])) || ACTUAL
}

function MenuNumeros({ actual }) {
  const [abierto, setAbierto] = useState(false)
  const caja = useRef(null)
  const boton = useRef(null)
  const { pathname } = useLocation()
  const [ruta, setRuta] = useState(pathname)
  if (ruta !== pathname) {
    setRuta(pathname)
    setAbierto(false)
  }
  useEffect(() => {
    if (!abierto) return undefined
    const fuera = (e) => !caja.current?.contains(e.target) && setAbierto(false)
    const tecla = (e) => {
      if (e.key === "Escape") {
        setAbierto(false)
        boton.current?.focus()
      }
    }
    document.addEventListener("pointerdown", fuera)
    document.addEventListener("keydown", tecla)
    return () => {
      document.removeEventListener("pointerdown", fuera)
      document.removeEventListener("keydown", tecla)
    }
  }, [abierto])
  return (
    <div className="rb-menu" ref={caja}>
      <button
        ref={boton}
        type="button"
        className="rb-cab-boton"
        aria-expanded={abierto}
        aria-controls="rb-numeros"
        onClick={() => setAbierto((x) => !x)}
      >
        Números <span aria-hidden="true">▾</span>
      </button>
      {abierto && (
        <div id="rb-numeros" className="rb-numeros">
          <p>Del más reciente al primero</p>
          <ul>
            {NUMEROS.map((x) => (
              <li key={x.n}>
                <Link
                  to={x.n === ACTUAL.n ? "/revista/rubor" : `/revista/rubor/numero/${x.n}`}
                  aria-current={x.n === actual.n ? "page" : undefined}
                  style={{ "--muestra": PALETAS[x.paleta].acento }}
                >
                  <img src={foto(x.foto, 600)} alt="" width={46} height={60} loading="lazy" />
                  <span>
                    <b>N.º {x.n}</b>
                    {fechaNumero(x)} · «{x.tema}»{x.completo ? "" : " · archivo"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function RuborSitio() {
  useFavicon("/favicons/rubor.svg")
  const { pathname } = useLocation()
  const [plan, actualizar] = useState(leerPlan)
  useEffect(() => {
    const cambio = (e) => {
      if (e.key === CLAVE_PLAN || e.key === null) actualizar(leerPlan())
    }
    window.addEventListener("storage", cambio)
    return () => window.removeEventListener("storage", cambio)
  }, [])
  const numero = numeroDeRuta(pathname)
  const pal = PALETAS[numero.paleta]
  const [guardados] = useMarcadores("rubor")
  const enMarcadores = pathname.endsWith("/marcadores")
  const tituloPagina = {
    cuenta: "Cuenta de ejemplo",
    secciones: "Secciones",
    sesion: "Detrás de cámaras",
    marcadores: "Marcadores",
  }[pathname.split("/").pop()]
  usePageMetadata(
    `${tituloPagina ?? `N.º ${numero.n}, ${fechaNumero(numero).toLowerCase()}`} — Rubor, revista de moda · Demo de Ian Aldana Martínez`,
    "Rubor, revista ficticia de moda y celebridades: el número del mes completo para hojear, archivo de números y marcadores. Portafolio de Ian Aldana Martínez.",
  )
  const estilo = {
    "--rb-noche": pal.noche,
    "--rb-fondo1": pal.fondo1,
    "--rb-fondo2": pal.fondo2,
    "--rb-hoja": pal.hoja,
    "--rb-linea": pal.linea,
    "--rb-acento": pal.acento,
    "--rb-acento-texto": pal.acentoTexto,
    "--rb-sobre-acento": pal.sobreAcento,
    "--rb-humo": pal.humo,
    "--rb-brillo": pal.brillo,
  }
  return (
    <div className="rb-root" style={estilo}>
      <header className="rb-cab">
        <Link className="rb-volver" to="/revista" aria-label="Volver a elegir revista">
          <span aria-hidden="true">←</span> Revistas
        </Link>
        <Link className="rb-marca" to="/revista/rubor" aria-label="Rubor, número actual">
          RUBOR
        </Link>
        <nav className="rb-nav" aria-label="Rubor">
          <MenuNumeros actual={numero} />
          {!enMarcadores &&
            !["cuenta", "secciones", "sesion"].includes(pathname.split("/").pop()) && (
              <a className="rb-solo-ancho" href="#sumario">
                En este número
              </a>
            )}
        </nav>
        <div className="rb-cab-der">
          <Link to="/revista/rubor/marcadores" aria-current={enMarcadores ? "page" : undefined}>
            Marcadores{guardados.length ? ` (${guardados.length})` : ""}
          </Link>
          <Link
            className="rb-av"
            to="/revista/rubor/cuenta"
            aria-label={`Cuenta de ejemplo: ${LECTORA.nombre}`}
          >
            {LECTORA.iniciales}
          </Link>
        </div>
      </header>
      <Routes>
        <Route index element={<Numero numero={ACTUAL} />} />
        <Route path="numero/:n" element={<NumeroRuta plan={plan} />} />
        <Route path="secciones" element={<Secciones />} />
        <Route path="sesion" element={<Sesion />} />
        <Route path="cuenta" element={<Cuenta plan={plan} actualizar={actualizar} />} />
        <Route path="marcadores" element={<MarcadoresRubor />} />
        <Route path="*" element={<Navigate to="/revista/rubor" replace />} />
      </Routes>
      <ComercialCTA
        giro="revista digital"
        accentColor={pal.acentoTexto}
        backgroundColor={pal.noche}
        textColor="#F4E7E2"
        fontFamily="Rubor Texto, Arial, sans-serif"
        headingFontFamily="Rubor Titulo, Georgia, serif"
        radius={2}
      />
      <footer className="rb-legal">
        <div>
          <b>RUBOR</b>
          Revista mensual ficticia de moda y celebridades. Editora: Andrea Roldán (personaje
          ficticio). Un solo editor; las personas fotografiadas no son las personas que nombramos.
        </div>
        <div>
          <Link to="/revista/rubor/secciones">Secciones de Rubor</Link> ·{" "}
          <Link to="/revista/rubor/sesion">Detrás de cámaras</Link> ·{" "}
          <Link to="/revista/rubor/cuenta">Mi suscripción</Link>
          <br />
          Reserva de derechos al uso exclusivo e ISSN: de ejemplo, no tramitados.
          <br />
          <Link to="/revista/prisma">Ir a Prisma, la otra revista de esta demo</Link> ·{" "}
          <Link to="/revista">Elegir revista</Link>
        </div>
      </footer>
    </div>
  )
}

function NumeroRuta({ plan }) {
  const { n } = useParams()
  const numero = findNumero(n)
  if (!numero || numero.n === ACTUAL.n) return <Navigate to="/revista/rubor" replace />
  return <Numero key={numero.n} numero={numero} plan={plan} />
}
