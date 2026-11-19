import { useEffect, useState } from "react"
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import ComercialCTA from "../../components/shared/ComercialCTA"
import useFavicon from "../../hooks/useFavicon"
import usePageMetadata from "../../hooks/usePageMetadata"
import { findArticulo, findAutor, USUARIO } from "./data/prisma"
import { useMarcadores } from "./lib/marcadores"
import Buscar from "./components/prisma/Buscar"
import Inicio from "./pages/prisma/Inicio"
import Articulo from "./pages/prisma/Articulo"
import Autor from "./pages/prisma/Autor"
import MarcadoresPrisma from "./pages/prisma/Marcadores"
import "./prisma.css"

function titulo(pathname) {
  const art = pathname.match(/\/articulo\/([^/]+)/)
  if (art) return findArticulo(art[1])?.titulo ?? "Investigación"
  const aut = pathname.match(/\/autor\/([^/]+)/)
  if (aut) return findAutor(aut[1])?.nombre ?? "Autor"
  if (pathname.endsWith("/marcadores")) return "Marcadores"
  return "Inicio"
}

export default function PrismaSitio() {
  useFavicon("/favicons/prisma.svg")
  const { pathname } = useLocation()
  const [buscando, setBuscando] = useState(false)
  const [guardados] = useMarcadores("prisma")
  usePageMetadata(
    `${titulo(pathname)} — Prisma, ciencia y tecnología · Demo de Ian Aldana Martínez`,
    "Prisma, revista ficticia de ciencia y tecnología en acceso abierto: investigaciones de varios autores para leer en el sitio o en PDF. Portafolio de Ian Aldana Martínez.",
  )
  useEffect(() => {
    const tecla = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setBuscando(true)
      }
    }
    window.addEventListener("keydown", tecla)
    return () => window.removeEventListener("keydown", tecla)
  }, [])
  const inicio = pathname.replace(/\/+$/, "") === "/revista/prisma"
  return (
    <div className="pr-root">
      <header className="pr-cab">
        <div className="pr-w pr-cab-in">
          <Link className="pr-volver" to="/revista" aria-label="Volver a elegir revista">
            <span aria-hidden="true">←</span> Revistas
          </Link>
          <Link className="pr-marca" to="/revista/prisma" aria-label="Prisma, inicio">
            <svg viewBox="0 0 32 28" width="28" height="24" aria-hidden="true">
              <path d="M16 2 30 26H2Z" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <path d="M16 2v24M9 14h14" stroke="currentColor" strokeWidth="1.4" opacity=".6" />
            </svg>
            Prisma
          </Link>
          <nav className="pr-nav" aria-label="Prisma">
            <Link to="/revista/prisma" aria-current={inicio ? "page" : undefined}>
              Inicio
            </Link>
          </nav>
          <button type="button" className="pr-busca" onClick={() => setBuscando(true)}>
            <span aria-hidden="true">⌕</span> Buscar investigaciones, autores o áreas
            <kbd>Ctrl K</kbd>
          </button>
          <Link
            className="pr-b2"
            to="/revista/prisma/marcadores"
            aria-current={pathname.endsWith("/marcadores") ? "page" : undefined}
          >
            Marcadores{guardados.length ? ` (${guardados.length})` : ""}
          </Link>
          <Link
            className="pr-av"
            to="/revista/prisma/marcadores"
            aria-label={`Cuenta de ejemplo: ${USUARIO.nombre}`}
          >
            {USUARIO.iniciales}
          </Link>
        </div>
      </header>
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="articulo/:id" element={<Articulo />} />
        <Route path="autor/:id" element={<Autor />} />
        <Route path="marcadores" element={<MarcadoresPrisma />} />
        <Route path="*" element={<Navigate to="/revista/prisma" replace />} />
      </Routes>
      <ComercialCTA
        giro="revista digital"
        accentColor="#F2B33D"
        backgroundColor="#0A0C10"
        textColor="#ECEEF0"
        fontFamily="Prisma Texto, Arial, sans-serif"
        headingFontFamily="Prisma Titulo, Georgia, serif"
        radius={14}
      />
      <footer className="pr-pie">
        <div className="pr-w">
          <p>
            <b>Prisma</b> · Revista ficticia de ciencia y tecnología en acceso abierto. Autores,
            instituciones, DOI, ORCID, ISSN y cifras son de ejemplo.
          </p>
          <p>
            <Link to="/revista/rubor">Ir a Rubor, la otra revista de esta demo</Link> ·{" "}
            <Link to="/revista">Elegir revista</Link>
          </p>
        </div>
      </footer>
      {buscando && <Buscar onCerrar={() => setBuscando(false)} />}
    </div>
  )
}
