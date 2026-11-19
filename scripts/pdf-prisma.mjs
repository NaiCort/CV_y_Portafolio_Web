// Genera los PDF de los dos números completos de Prisma desde la página de lectura, con la
// hoja de estilos de impresión. Uso: con `npm run build && npx vite preview --port 4199`
// corriendo, `DEMO_BASE_URL=http://127.0.0.1:4199 node scripts/pdf-prisma.mjs`.
import { mkdirSync } from "node:fs"
import { chromium } from "playwright"

const base = process.env.DEMO_BASE_URL ?? "http://127.0.0.1:4199"
const salida = "public/revista/prisma/pdf"
const numeros = [
  [24, "andromeda"],
  [23, "adn-no-codificante"],
]

mkdirSync(salida, { recursive: true })
const navegador = await chromium.launch()
const pagina = await navegador.newPage()
for (const [n, id] of numeros) {
  await pagina.goto(`${base}/revista/prisma/articulo/${id}`, { waitUntil: "networkidle" })
  await pagina.evaluate(() => document.fonts.ready)
  // Fuera del sitio de la revista solo están el aviso de demo y la marca de agua.
  await pagina.addStyleTag({
    content: "@media print { .revista-root > :not(.pr-root) { display: none !important } }",
  })
  const ruta = `${salida}/prisma-${n}-${id}.pdf`
  await pagina.pdf({
    path: ruta,
    format: "Letter",
    margin: { top: "18mm", bottom: "18mm", left: "18mm", right: "18mm" },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;font:8px Arial;color:#666;text-align:center">Prisma · N.º ${n} · contenido ficticio de una demo · <span class="pageNumber"></span>/<span class="totalPages"></span></div>`,
  })
  console.log(`PDF: ${ruta}`)
}
await navegador.close()
