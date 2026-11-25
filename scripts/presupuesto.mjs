// Presupuesto de rendimiento (V4.10.3, regla GEN-011 del Digital Development Handbook).
// Mide, sobre la compilación de producción (dist/), lo que el navegador descarga para pintar la
// portada y cualquier otra ruta antes de su código propio: el JavaScript y el CSS que enlaza el
// HTML de entrada, comprimidos con gzip. Falla si se pasa del presupuesto de docs/RENDIMIENTO.md.
// Uso: npm run build && npm run audit:presupuesto
import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"

// Kilobytes comprimidos (gzip). Al cambiar una cifra, se actualiza docs/RENDIMIENTO.md.
const PRESUPUESTO = {
  "JavaScript inicial": 110,
  "CSS inicial": 12,
  "Ruta más pesada (sin el mapa)": 70,
}

const dist = path.resolve("dist")
const kb = (bytes) => bytes / 1024
const gzip = (archivo) =>
  zlib.gzipSync(fs.readFileSync(path.join(dist, archivo)), { level: 9 }).length

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error("Falta dist/index.html: ejecuta antes «npm run build».")
  process.exit(1)
}

// Recursos que enlaza un HTML: scripts de módulo, precargas de módulos y hojas de estilo.
function enlaces(html) {
  const js = new Set()
  const css = new Set()
  for (const [, src] of html.matchAll(/<script[^>]+type="module"[^>]+src="\/([^"]+)"/g)) js.add(src)
  for (const [, href] of html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="\/([^"]+)"/g))
    js.add(href)
  for (const [, href] of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/([^"]+)"/g))
    css.add(href)
  return { js: [...js], css: [...css] }
}

const medidas = {}
for (const entrada of ["index.html", "app.html"]) {
  const { js, css } = enlaces(fs.readFileSync(path.join(dist, entrada), "utf8"))
  const totalJs = kb(js.reduce((s, f) => s + gzip(f), 0))
  const totalCss = kb(css.reduce((s, f) => s + gzip(f), 0))
  medidas["JavaScript inicial"] = Math.max(medidas["JavaScript inicial"] ?? 0, totalJs)
  medidas["CSS inicial"] = Math.max(medidas["CSS inicial"] ?? 0, totalCss)
  console.log(
    `${entrada.padEnd(11)} JS ${totalJs.toFixed(1)} KB · CSS ${totalCss.toFixed(1)} KB (gzip)`,
  )
}

// Cada demo y el cotizador se cargan aparte (rutas perezosas). Se reporta el trozo propio más
// pesado; el motor del mapa (MapLibre) se excluye porque solo se descarga al acercarse al mapa.
const trozos = fs
  .readdirSync(path.join(dist, "assets"))
  .filter((f) => f.endsWith(".js") && !f.startsWith("index-") && !f.startsWith("maplibre"))
  .map((f) => ({ f, kb: kb(gzip(path.join("assets", f))) }))
  .sort((a, b) => b.kb - a.kb)
medidas["Ruta más pesada (sin el mapa)"] = trozos[0]?.kb ?? 0
console.log("\nTrozos más pesados (gzip):")
for (const t of trozos.slice(0, 6)) console.log(`  ${t.f.padEnd(40)} ${t.kb.toFixed(1)} KB`)

let falla = false
console.log("\nPresupuesto:")
for (const [nombre, limite] of Object.entries(PRESUPUESTO)) {
  const valor = medidas[nombre]
  const ok = valor <= limite
  if (!ok) falla = true
  console.log(
    `  ${ok ? "PASS" : "FAIL"}  ${nombre.padEnd(30)} ${valor.toFixed(1)} KB de ${limite} KB`,
  )
}
process.exit(falla ? 1 : 0)
