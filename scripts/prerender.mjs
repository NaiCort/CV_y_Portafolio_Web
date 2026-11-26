// Prerenderizado de la portada después de `vite build` (V4.8.6).
// 1. Compila src/entry-server.jsx para Node (vite build --ssr) en una carpeta temporal.
// 2. Guarda el HTML vacío de la aplicación como dist/app.html: lo usan todas las rutas que no son
//    la portada (vercel.json y el servidor de vista previa), para que las demos no muestren el CV
//    un instante antes de cargar.
// 3. Escribe dist/index.html con el CV ya renderizado, URL canónica, imagen para redes y datos
//    estructurados de persona.
// 4. Desde V4.10.6 el CV se carga aparte (src/rutasDemo.js): la portada precarga su código y enlaza
//    su CSS, que se lee del manifiesto de la compilación (dist/.vite/manifest.json). El manifiesto
//    se borra al terminar: no se publica.
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
  build: {
    ssr: "src/entry-server.jsx",
    outDir: temporal,
    emptyOutDir: true,
    // Aquí el CV se importa directo para escribirlo como HTML; que no se separe en otro trozo es lo
    // esperado, así que se calla ese aviso (en la compilación del navegador sí se separa).
    rolldownOptions: { checks: { ineffectiveDynamicImport: false } },
  },
})
const { render, personaJsonLd, SITIO } = await import(
  pathToFileURL(path.join(temporal, "entry-server.js")).href
)

const plantilla = await fs.readFile(path.join(dist, "index.html"), "utf8")
await fs.writeFile(path.join(dist, "app.html"), plantilla)

// Código y CSS del CV, con los trozos que importa (sin la entrada, que ya enlaza el HTML).
const manifiesto = JSON.parse(await fs.readFile(path.join(dist, ".vite", "manifest.json"), "utf8"))
function recursosDe(clave, js = new Set(), css = new Set()) {
  const trozo = manifiesto[clave]
  if (!trozo || trozo.isEntry || js.has(trozo.file)) return { js, css }
  js.add(trozo.file)
  for (const hoja of trozo.css ?? []) css.add(hoja)
  for (const importado of trozo.imports ?? []) recursosDe(importado, js, css)
  return { js, css }
}
const cv = recursosDe("src/pages/Bienvenida.jsx")
if (!cv.js.size || !cv.css.size) throw new Error("El manifiesto no tiene el código o el CSS del CV")

const cabeza = [
  `<link rel="canonical" href="${SITIO}/" />`,
  `<meta property="og:url" content="${SITIO}/" />`,
  `<meta property="og:image" content="${SITIO}/cv/ian-1024.webp" />`,
  `<meta property="og:image:alt" content="Retrato de Ian Habid Aldana Martínez" />`,
  `<script type="application/ld+json">${JSON.stringify(personaJsonLd()).replace(/</g, "\\u003c")}</script>`,
  ...[...cv.css].map((hoja) => `<link rel="stylesheet" crossorigin href="/${hoja}" />`),
  ...[...cv.js]
    .filter((trozo) => !plantilla.includes(`/${trozo}"`))
    .map((trozo) => `<link rel="modulepreload" crossorigin href="/${trozo}" />`),
].join("\n    ")

// React 19 antepone al HTML las precargas de recursos con prioridad alta (la foto). Van al
// principio de la cabecera, justo después del viewport: el navegador pide la foto antes que el
// código y el CSS del CV. Al final de la cabecera, con esas precargas delante, la foto llegaba
// 0.2 s más tarde (V4.10.6, docs/RENDIMIENTO.md).
let cuerpo = render()
const precargas = cuerpo.match(/^(<link [^>]*>)+/)?.[0] ?? ""
cuerpo = cuerpo.slice(precargas.length)
const viewport = plantilla.match(/<meta name="viewport"[^>]*>/)?.[0]
if (!viewport) throw new Error("La plantilla no tiene la etiqueta viewport")
const html = plantilla
  .replace(viewport, `${viewport}\n    ${precargas}`)
  .replace("</head>", `    ${cabeza}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${cuerpo}</div>`)
if (!html.includes("Ian Habid Aldana Martínez</h1>"))
  throw new Error("El prerenderizado no produjo el CV")
await fs.writeFile(path.join(dist, "index.html"), html)
await fs.rm(temporal, { recursive: true, force: true })
await fs.rm(path.join(dist, ".vite"), { recursive: true, force: true })
console.log("Portada prerenderizada en dist/index.html (las demás rutas usan dist/app.html).")
