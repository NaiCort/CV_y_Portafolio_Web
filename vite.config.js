import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import fs from "node:fs"
import path from "node:path"

// En la vista previa, como en Vercel (vercel.json), la portada usa el HTML prerenderizado y las
// demás rutas el HTML vacío de la aplicación (dist/app.html, scripts/prerender.mjs).
const rutasDeAplicacion = {
  name: "rutas-de-aplicacion",
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const ruta = req.url.split("?")[0]
      const app = path.resolve(server.config.build.outDir, "app.html")
      if (ruta !== "/" && !path.extname(ruta) && fs.existsSync(app)) req.url = "/app.html"
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), rutasDeAplicacion],
})
