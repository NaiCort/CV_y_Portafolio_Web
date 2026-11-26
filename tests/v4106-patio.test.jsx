import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import RestauranteRuta from "../src/giros/restaurante/RestauranteRuta"
import { FOTO_LOCAL } from "../src/giros/restaurante/portada"
import { fotoResponsiva, TAMANOS } from "../src/giros/restaurante/data/fotos"
import { STORAGE_KEY } from "../src/giros/restaurante/state/model"
import { CARGAS, precargarPortada } from "../src/rutasDemo"
import { button, click, render } from "./helpers"

// V4.10.6: entrega de Patio 12 en V4.10 (docs/ESTADO_V4.10.6.md).
const ruta = (url) => (
  <MemoryRouter initialEntries={[url]}>
    <Routes>
      <Route path="/restaurante/*" element={<RestauranteRuta />} />
    </Routes>
  </MemoryRouter>
)
const $ = (s) => document.querySelector(s)
const $$ = (s) => [...document.querySelectorAll(s)]
afterEach(() => localStorage.clear())

describe("V4.10.6: carga más ligera (DEC-021)", () => {
  it("la ruta del restaurante trae su propio estado; el armazón del sitio ya no lo carga", async () => {
    await render(ruta("/restaurante"))
    expect($("h1").textContent).toContain("Buen comer.")
    const app = readFileSync("src/App.jsx", "utf8")
    expect(app).not.toMatch(/RestaurantProvider|FloatingTimer/)
    expect(app).not.toMatch(/import Bienvenida/)
    expect(Object.keys(CARGAS)).toContain("/")
  })

  it("la portada precarga su código y CSS desde el manifiesto, que no se publica", () => {
    const prerender = readFileSync("scripts/prerender.mjs", "utf8")
    expect(prerender).toMatch(/manifest\.json/)
    expect(prerender).toMatch(/rel="modulepreload"/)
    expect(prerender).toMatch(/fs\.rm\(path\.join\(dist, "\.vite"\)/)
  })
})

describe("V4.10.6: aviso de privacidad de ejemplo", () => {
  it("dice qué guarda, qué pediría un restaurante real y borra lo guardado", async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ schema: 2, pointId: "xalapa", widget: { x: 1, y: 1 } }),
    )
    await render(ruta("/restaurante"))
    await click(button("Aviso de privacidad"))
    const aviso = $("dialog[open]")
    const titulos = [...aviso.querySelectorAll("h3")].map((h) => h.textContent)
    expect(titulos).toEqual([
      "Lo que guarda en este navegador",
      "Mapa y ubicación",
      "Lo que pediría un restaurante real",
    ])
    expect(aviso.textContent).not.toMatch(/Google Fonts|Unsplash/)
    await click(button("Borrar mis datos de esta demo"))
    await click(button("Sí, borrar todo"))
    expect($("dialog[open]")).toBeNull()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})

describe("V4.10.6: contacto real y cotizador (RF-002 y RF-003)", () => {
  it("la llamada comercial tiene «Hablemos» por WhatsApp y cotiza Patio 12", async () => {
    await render(ruta("/restaurante"))
    const llamada = $("#trabajemos-juntos")
    const enlaces = [...llamada.querySelectorAll("a")].map((a) => [
      a.textContent.trim(),
      a.getAttribute("href"),
    ])
    expect(enlaces.find(([t]) => t.startsWith("Hablemos"))[1]).toMatch(/^https:\/\/wa\.me\//)
    expect(enlaces.find(([t]) => t === "Cotiza un sitio como este")[1]).toContain("demo=patio-12")
  })
})

describe("V4.10.6: metadatos y patrones vigilados", () => {
  it("cada página tiene su propia descripción", async () => {
    const meta = document.createElement("meta")
    meta.setAttribute("name", "description")
    document.head.append(meta)
    const vistas = {}
    for (const url of ["/restaurante", "/restaurante/carta", "/restaurante/locales/xalapa"]) {
      const vista = await render(ruta(url))
      vistas[url] = meta.getAttribute("content")
      await vista.unmount()
    }
    expect(new Set(Object.values(vistas)).size).toBe(3)
    expect(vistas["/restaurante/locales/xalapa"]).toMatch(/^Xalapa · Centro: /)
    meta.remove()
  })

  it("sin etiquetas en mayúsculas sobre los títulos ni numeración decorativa", async () => {
    for (const url of [
      "/restaurante",
      "/restaurante/carta",
      "/restaurante/locales",
      "/restaurante/locales/xalapa",
      "/restaurante/conocenos",
    ]) {
      const vista = await render(ruta(url))
      expect($$(".r-kicker, .r-sidebar-title"), url).toHaveLength(0)
      expect(document.body.textContent, url).not.toMatch(/patio 12 \/ \d\d/)
      await vista.unmount()
    }
  })
})

describe("V4.10.6: fotos en el tamaño justo", () => {
  it("las fotos grandes ofrecen 480 px y las chicas se quedan como están", () => {
    expect(fotoResponsiva("/restaurante/queso.webp", TAMANOS.tarjeta)).toEqual({
      src: "/restaurante/queso.webp",
      srcSet: "/restaurante/queso-480.webp 480w, /restaurante/queso.webp 1000w",
      sizes: TAMANOS.tarjeta,
    })
    expect(fotoResponsiva("/restaurante/carta/gorditas.webp", TAMANOS.tarjeta)).toEqual({
      src: "/restaurante/carta/gorditas.webp",
    })
  })

  it("cada archivo nuevo tiene su registro y su huella", () => {
    const registro = JSON.parse(
      readFileSync("public/restaurante/fotos-origen-v4.10.6.json", "utf8"),
    )
    const registrados = registro.archivos.map((a) => a.archivo)
    for (const { archivo, sha256 } of registro.archivos) {
      const ruta = `public${archivo}`
      expect(existsSync(ruta), ruta).toBe(true)
      expect(createHash("sha256").update(readFileSync(ruta)).digest("hex"), ruta).toBe(sha256)
    }
    const chicas = [
      ...readdirSync("public/restaurante").map((f) => `/restaurante/${f}`),
      ...readdirSync("public/restaurante/carta").map((f) => `/restaurante/carta/${f}`),
    ].filter((f) => f.endsWith("-480.webp") || /\/patio-\d+\.webp$/.test(f))
    expect(chicas.sort()).toEqual([...registrados].sort())
    expect(existsSync("public/restaurante/patio.webp")).toBe(false)
  })

  it("al entrar directo, Inicio y Conócenos precargan su foto principal; las demás páginas no", () => {
    const precargas = () => $$('link[rel="preload"][as="image"]')
    precargarPortada("/restaurante")
    expect(precargas().map((l) => l.getAttribute("href"))).toEqual(["/restaurante/pasta.webp"])
    precargas().forEach((l) => l.remove())
    precargarPortada("/restaurante/conocenos/")
    expect(precargas()[0].getAttribute("imagesrcset")).toBe(FOTO_LOCAL.srcSet)
    expect(precargas()[0].getAttribute("imagesizes")).toBe(FOTO_LOCAL.sizes)
    precargas().forEach((l) => l.remove())
    for (const r of ["/restaurante/carta", "/restaurante/locales", "/restaurante/pedido"])
      precargarPortada(r)
    expect(precargas()).toHaveLength(0)
  })
})

describe("V4.10.6: tipografías con respaldo medido", () => {
  it("Bitter y DM Sans tienen su respaldo con size-adjust en toda la demo", () => {
    const css = readFileSync("src/giros/restaurante/restaurante.css", "utf8")
    expect(css).toMatch(/font-family: "Patio Bitter Respaldo";[\s\S]*?size-adjust: 114\.1%/)
    expect(css).toMatch(/font-family: "Patio Sans Respaldo";[\s\S]*?size-adjust: 102\.1%/)
    expect(css).not.toMatch(/"Patio (Bitter|Sans)",\s*(Georgia|sans-serif)/)
  })
})

vi.setConfig({ testTimeout: 20000 })
