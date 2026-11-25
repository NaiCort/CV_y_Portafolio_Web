import { Suspense } from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom"
import Bienvenida from "./pages/Bienvenida"
import { CONTACTO, EDUCACION, HABILIDADES, IDIOMAS, PERSONA } from "./data/cv"

// Prerenderizado de la portada (V4.8.6, Sitio Profesional, sección 11): al compilar, el CV se
// escribe como HTML para que los buscadores lo lean sin ejecutar JavaScript. Lo usa
// scripts/prerender.mjs; en el navegador, la aplicación reemplaza este HTML al cargar.
export const SITIO = "https://cv-y-portafolio-web.vercel.app"

export function render() {
  return renderToString(
    // Misma forma que en App.jsx: la ruta vive dentro de un Suspense; sin él, la hidratación no
    // coincide y React vuelve a dibujar todo.
    <StaticRouter location="/">
      <Suspense fallback={null}>
        <Bienvenida />
      </Suspense>
    </StaticRouter>,
  )
}

// Datos estructurados de persona (schema.org), con los mismos datos que muestra el CV.
export function personaJsonLd() {
  const url = (id) => CONTACTO.find((c) => c.id === id)?.url
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONA.nombre,
    jobTitle: PERSONA.titulo,
    url: `${SITIO}/`,
    image: `${SITIO}/cv/ian-640.webp`,
    email: url("correo"),
    telephone: "+52 228 162 8345",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Xalapa",
      addressRegion: "Veracruz",
      addressCountry: "MX",
    },
    sameAs: [url("linkedin"), url("github")],
    alumniOf: EDUCACION.filter((e) => e.id === "isc").map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.lugar.split(",")[0],
    })),
    knowsLanguage: IDIOMAS.map((i) => i.idioma),
    knowsAbout: HABILIDADES.flatMap((h) => h.items).slice(0, 24),
  }
}
