import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import DemoBanner from "../../components/shared/DemoBanner"
import WaterMark from "../../components/WaterMark"
import Musica from "./components/Musica"
import Entrada from "./pages/Entrada"
import UmbralSitio from "./UmbralSitio"
import PosicionLectura from "./components/PosicionLectura"
import PrivacidadRevista from "./components/PrivacidadRevista"
import { reiniciarCache } from "./lib/marcadores"
import RuborSitio from "./RuborSitio"
import PrismaSitio from "./PrismaSitio"
import "./revista.css"

function Guia() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
      <p>
        Revista digital: tres revistas ficticias sobre la misma base. Rubor (moda y celebridades)
        tiene un solo editor y su portada es siempre el número más reciente; Prisma (ciencia y
        tecnología) es de acceso abierto y publica investigaciones de varios autores. Umbral explora
        fotografía, diseño y cultura visual con dos dossiers y un creador de ejemplo.
      </p>
      <ul className="list-disc pl-5 space-y-3">
        <li>
          Rubor: baja para hojear el número. «Números» abre el archivo por fecha; cada número tiene
          su propia paleta. Solo el N.º 24 y el N.º 23 están completos.
        </li>
        <li>
          Prisma: elige un número en el estante para ver su resumen y sus autores. «Buscar» (o Ctrl
          K) busca por título, área o autor.
        </li>
        <li>
          Los marcadores y los comentarios se guardan solo en este navegador. Las personas, marcas,
          autores, cifras, DOI e ISSN son inventados; las fotos son de Unsplash y cada una lo dice.
        </li>
      </ul>
      <p>“Contactar” y “Hablemos” abren los canales reales de Ian para consultar un proyecto.</p>
    </div>
  )
}

export default function RevistaApp() {
  const { pathname } = useLocation()
  const sitio = ["rubor", "prisma", "umbral"].find((s) => pathname.startsWith(`/revista/${s}`))
  const [sesion, setSesion] = useState(0)
  useEffect(() => {
    const cambio = (e) => {
      if ((e.key === "revista-reset" && e.newValue) || e.key === null) {
        reiniciarCache()
        setSesion((s) => s + 1)
      }
    }
    window.addEventListener("storage", cambio)
    return () => window.removeEventListener("storage", cambio)
  }, [])
  return (
    <div className="revista-root">
      <DemoBanner guide={<Guia />} />
      <a className="rv-saltar" href="#rv-contenido">
        Saltar al contenido de la revista
      </a>
      <PosicionLectura />
      {sitio && <Musica key={`${sitio}-${sesion}`} sitio={sitio} />}
      <Routes key={sesion}>
        <Route index element={<Entrada />} />
        <Route path="umbral/*" element={<UmbralSitio />} />
        <Route path="rubor/*" element={<RuborSitio />} />
        <Route path="prisma/*" element={<PrismaSitio />} />
        <Route path="*" element={<Navigate to="/revista" replace />} />
      </Routes>
      <PrivacidadRevista onBorrar={() => setSesion((s) => s + 1)} />
      <WaterMark />
    </div>
  )
}
