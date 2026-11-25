import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import fs from "node:fs"
import path from "node:path"

// Convierte un `source` de vercel.json («/(.*)», «/assets/(.*)») en una expresión regular: los
// grupos entre paréntesis se copian tal cual y el resto se toma como texto literal. Basta para los
// patrones que usa este proyecto; si se agregan nombres con «:», hay que ampliarlo.
function patronVercel(source) {
  let re = ""
  for (let i = 0; i < source.length; i++) {
    if (source[i] === "(") {
      const fin = source.indexOf(")", i)
      re += source.slice(i, fin + 1)
      i = fin
    } else re += source[i].replace(/[.*+?^${}|[\]\\/]/g, "\\$&")
  }
  return new RegExp(`^${re}$`)
}

const vercel = JSON.parse(fs.readFileSync(path.resolve("vercel.json"), "utf8"))
const encabezados = (vercel.headers ?? []).map((h) => ({
  patron: patronVercel(h.source),
  valores: h.headers,
}))

// En la vista previa, como en Vercel (vercel.json): la portada usa el HTML prerenderizado y las
// demás rutas el HTML vacío de la aplicación (dist/app.html, scripts/prerender.mjs), con los mismos
// encabezados de seguridad y caché (V4.10.3). Con CSP_ESTRICTA=1, la política de contenido que en
// producción va «solo en reporte» se aplica de verdad, para comprobar en las pruebas de navegador
// que no bloquea nada antes de activarla (docs/SEGURIDAD.md).
const rutasDeAplicacion = {
  name: "rutas-de-aplicacion",
  configurePreviewServer(server) {
    const estricta = process.env.CSP_ESTRICTA === "1"
    server.middlewares.use((req, res, next) => {
      const ruta = req.url.split("?")[0]
      const politicas = []
      for (const { patron, valores } of encabezados) {
        if (!patron.test(ruta)) continue
        for (const { key, value } of valores) {
          if (key === "Content-Security-Policy") politicas.unshift(value)
          else if (key === "Content-Security-Policy-Report-Only" && estricta) politicas.push(value)
          else res.setHeader(key, value)
        }
      }
      if (politicas.length) res.setHeader("Content-Security-Policy", politicas)
      const app = path.resolve(server.config.build.outDir, "app.html")
      if (ruta !== "/" && !path.extname(ruta) && fs.existsSync(app)) req.url = "/app.html"
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), rutasDeAplicacion],
})
