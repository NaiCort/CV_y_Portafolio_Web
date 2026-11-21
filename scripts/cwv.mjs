// Core Web Vitals de laboratorio: teléfono de 390 px (DPR 3), CPU 4× más lenta y red 4G lenta.
// Uso: node scripts/cwv.mjs /ruta1,/ruta2   (base: DEMO_BASE_URL o http://127.0.0.1:4173)
import { chromium } from "playwright"

const BASE = process.env.DEMO_BASE_URL || "http://127.0.0.1:4173"
const rutas = (process.argv[2] || "/").split(",")
const browser = await chromium.launch()
for (const ruta of rutas) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  })
  const page = await ctx.newPage()
  const cdp = await ctx.newCDPSession(page)
  await cdp.send("Network.enable")
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  })
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 })
  await page.addInitScript(() => {
    window.__cwv = { lcp: 0, cls: 0, lcpEl: "" }
    new PerformanceObserver((lista) => {
      for (const e of lista.getEntries()) {
        window.__cwv.lcp = e.startTime
        window.__cwv.lcpEl = `${e.element?.tagName || ""}.${e.element?.className?.baseVal ?? e.element?.className ?? ""}`
      }
    }).observe({ type: "largest-contentful-paint", buffered: true })
    new PerformanceObserver((lista) => {
      for (const e of lista.getEntries()) if (!e.hadRecentInput) window.__cwv.cls += e.value
    }).observe({ type: "layout-shift", buffered: true })
  })
  await page.goto(BASE + ruta, { waitUntil: "load", timeout: 90000 })
  await page.waitForTimeout(6000)
  const r = await page.evaluate(() => window.__cwv)
  console.log(
    `${ruta.padEnd(30)} LCP ${(r.lcp / 1000).toFixed(2)} s  CLS ${r.cls.toFixed(3)}  (${r.lcpEl.slice(0, 40)})`,
  )
  await ctx.close()
}
await browser.close()
