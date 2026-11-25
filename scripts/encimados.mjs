// Detector de textos encimados y desbordes horizontales (herramienta de la pasada final).
// Uso: node scripts/encimados.mjs /ruta1,/ruta2 [selector-excluido]
// Base: DEMO_BASE_URL (por defecto http://127.0.0.1:4173, la de `vite preview`).
import { chromium } from "playwright"

const BASE = process.env.DEMO_BASE_URL || "http://127.0.0.1:4173"
const rutas = (process.argv[2] || "/").split(",")
const excluir = process.argv[3] || ".um-pila"
const TAMANOS = [
  [1980, 870],
  [1440, 900],
  [1280, 720],
  [1024, 768],
  [768, 1024],
  [390, 844],
  [320, 568],
]

const browser = await chromium.launch()
let casos = 0
for (const [width, height] of TAMANOS)
  for (const ruta of rutas) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 640 })
    await page.goto(BASE + ruta)
    await page.waitForTimeout(900)
    const res = await page.evaluate((excluir) => {
      const zona = document.querySelector("main") || document.body
      const visibles = [
        ...zona.querySelectorAll("small, b, em, p, span, a, h1, h2, h3, button, li, dt, dd"),
      ].filter((e) => {
        if (excluir && e.closest(excluir)) return false
        const st = getComputedStyle(e)
        const r = e.getBoundingClientRect()
        return (
          e.textContent.trim() &&
          r.width > 2 &&
          r.height > 2 &&
          st.visibility !== "hidden" &&
          st.display !== "none" &&
          !e.closest("[aria-hidden=true]") &&
          // Lo que está dentro de un <details> cerrado no se ve aunque tenga medidas (V4.9).
          e.checkVisibility?.() !== false
        )
      })
      // Solo hojas: elementos que no contienen a otro de la lista.
      const hojas = visibles.filter((e) => !visibles.some((o) => o !== e && e.contains(o)))
      const out = []
      for (let i = 0; i < hojas.length; i++)
        for (let j = i + 1; j < hojas.length; j++) {
          const a = hojas[i].getBoundingClientRect()
          const c = hojas[j].getBoundingClientRect()
          const ix = Math.min(a.right, c.right) - Math.max(a.left, c.left)
          const iy = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top)
          if (ix > 2 && iy > 2)
            out.push(
              `${hojas[i].textContent.trim().slice(0, 25)} ✕ ${hojas[j].textContent.trim().slice(0, 25)}`,
            )
        }
      return { out, ancho: document.documentElement.scrollWidth > innerWidth + 1 }
    }, excluir)
    if (res.out.length || res.ancho) {
      casos++
      console.log(
        `${width}x${height} ${ruta}: ${res.ancho ? "DESBORDA " : ""}${res.out.slice(0, 4).join(" | ")}`,
      )
    }
    await page.close()
  }
console.log("Casos con problemas:", casos)
await browser.close()
process.exitCode = casos ? 1 : 0
