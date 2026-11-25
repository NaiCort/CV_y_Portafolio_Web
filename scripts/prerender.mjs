// Prerenderizado de la portada después de `vite build` (V4.8.6).
// 1. Compila src/entry-server.jsx para Node (vite build --ssr) en una carpeta temporal.
// 2. Guarda el HTML vacío de la aplicación como dist/app.html: lo usan todas las rutas que no son
//    la portada (vercel.json y el servidor de vista previa), para que las demos no muestren el CV
//    un instante antes de cargar.
// 3. Escribe dist/index.html con el CV ya renderizado, URL canónica, imagen para redes y datos
//    estructurados de persona.
import { build } from "vite"
import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

const raiz = path.resolve(import.meta.dirname, "..")
const dist = path.join(raiz, "dist")
const temporal = path.join(raiz, "node_modules", ".prerender")

await build({
  root: raiz,
  logLevel: "warn",
  build: { ssr: "src/entry-server.jsx", outDir: temporal, emptyOutDir: true },
})
const { render, personaJsonLd, SITIO } = await import(
  pathToFileURL(path.join(temporal, "entry-server.js")).href
)

const plantilla = await fs.readFile(path.join(dist, "index.html"), "utf8")
await fs.writeFile(path.join(dist, "app.html"), plantilla)

const cabeza = [
  `<link rel="canonical" href="${SITIO}/" />`,
  `<meta property="og:url" content="${SITIO}/" />`,
  `<meta property="og:image" content="${SITIO}/cv/ian-1024.webp" />`,
  `<meta property="og:image:alt" content="Retrato de Ian Habid Aldana Martínez" />`,
  `<script type="application/ld+json">${JSON.stringify(personaJsonLd()).replace(/</g, "\\u003c")}</script>`,
].join("\n    ")

// React 19 antepone al HTML las precargas de recursos con prioridad alta (la foto). Van en la
// cabecera: ahí aceleran la foto y no estorban la hidratación del CV.
let cuerpo = render()
const precargas = cuerpo.match(/^(<link [^>]*>)+/)?.[0] ?? ""
cuerpo = cuerpo.slice(precargas.length)
const html = plantilla
  .replace("</head>", `    ${cabeza}\n    ${precargas}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`)
if (!html.includes("Ian Habid Aldana Martínez</h1>"))
  throw new Error("El prerenderizado no produjo el CV")
await fs.writeFile(path.join(dist, "index.html"), html)
await fs.rm(temporal, { recursive: true, force: true })
console.log("Portada prerenderizada en dist/index.html (las demás rutas usan dist/app.html).")
