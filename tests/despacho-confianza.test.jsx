import { existsSync, readFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import DespachoApp from "../src/giros/despacho/DespachoApp"
import { GUIAS, OPINIONES } from "../src/giros/despacho/data/confianza"
import { FOTOS } from "../src/giros/despacho/data/medios"
import {
  EXPEDIENTE_KEY,
  cargar,
  inicial,
  mensajesAviso,
  reducir,
} from "../src/giros/despacho/lib/expediente"
import { advance, button, click, render } from "./helpers"

const renderDespacho = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/despacho/*" element={<DespachoApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (s) => document.querySelector(s)
afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe("Fotos ilustrativas", () => {
  it("se sirven desde el sitio con su procedencia y huella", () => {
    const origen = JSON.parse(readFileSync("public/despacho/medios-origen.json", "utf8"))
    for (const m of origen) {
      const ruta = `public${m.archivo}`
      expect(existsSync(ruta), ruta).toBe(true)
      expect(createHash("sha256").update(readFileSync(ruta)).digest("hex"), ruta).toBe(m.sha256)
    }
    for (const [id, f] of Object.entries(FOTOS)) {
      expect(f.src.startsWith("/despacho/fotos/")).toBe(true)
      // Xalapa es una foto real del lugar; las demás son ilustrativas y lo dicen.
      expect(f.pie, id).toMatch(id === "xalapa" ? /Wikimedia Commons/ : /ilustrativa/)
    }
  })

  it("la portada dice que la persona del retrato no es Elena", async () => {
    await renderDespacho("/despacho")
    const fig = $(".d-retrato")
    expect(fig.querySelector("img").getAttribute("src")).toBe(FOTOS.contadora.src)
    expect(fig.textContent).toContain("no es Elena")
    expect($(".d-sala img").getAttribute("alt")).toMatch(/Sala de juntas/)
  })

  it("los créditos enlazan los originales", async () => {
    await renderDespacho("/despacho/creditos")
    const enlaces = [...document.querySelectorAll(".d-pagina a")].map((a) => a.getAttribute("href"))
    expect(enlaces).toContain(FOTOS.contadora.origen)
    expect(enlaces).toContain(FOTOS.sala.origen)
  })
})

describe("Especialidades, opiniones y guías en la portada", () => {
  it("muestra cuatro especialidades y opiniones declaradas como inventadas", async () => {
    await renderDespacho("/despacho")
    expect(document.querySelectorAll(".d-especialidades > div")).toHaveLength(4)
    expect(document.querySelectorAll(".d-opiniones blockquote")).toHaveLength(OPINIONES.length)
    expect($("#opiniones").textContent).toContain("inventadas")
    const guias = [...document.querySelectorAll(".d-guias a")]
    expect(guias.map((a) => a.getAttribute("href"))).toEqual(
      GUIAS.map((g) => `/despacho/guias#${g.id}`),
    )
  })
})

describe("Guías cortas", () => {
  it("cada guía tiene secciones y lleva a una herramienta o servicio", async () => {
    await renderDespacho("/despacho/guias")
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    for (const g of GUIAS) {
      const art = document.getElementById(g.id)
      expect(art.querySelector("h2").textContent).toBe(g.titulo)
      expect(art.querySelectorAll("h3").length).toBeGreaterThan(0)
      expect(art.querySelector("a.d-btn").getAttribute("href")).toBe(g.herramienta[0])
    }
    expect($("#resico").textContent).toContain("$3.5 millones")
    expect($("#requerimiento").textContent).toContain("buzón tributario")
    expect($("#anual").textContent).toContain("$400,000")
  })
})

describe("Antes de contratarnos", () => {
  it("dice con quién encaja Cotejo y con quién no, antes de cotizar", async () => {
    await renderDespacho("/despacho/precios")
    const antes = $(".d-antes")
    expect(antes.textContent).toContain("en ceros")
    expect(antes.textContent).toContain("e.firma")
    expect(antes.compareDocumentPosition($("#cotizar")) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
  })
})

describe("Recordatorio por WhatsApp", () => {
  it("valida lo guardado y arma los mensajes elegidos", () => {
    let e = reducir(inicial(), { type: "avisos", valor: { previo: true, fechas: false } })
    expect(e.avisos).toEqual({ previo: true, fechas: false })
    expect(mensajesAviso(e.avisos)).toHaveLength(1)
    expect(mensajesAviso(e.avisos)[0]).toContain("$1,284")
    e = reducir(e, { type: "avisos", valor: { previo: false, fechas: false } })
    expect(e.avisos).toBeNull()
    localStorage.setItem(
      EXPEDIENTE_KEY,
      JSON.stringify({ ...inicial(), avisos: { previo: "sí", fechas: true } }),
    )
    expect(cargar(localStorage).avisos).toEqual({ previo: false, fechas: true })
  })

  it("se elige, se activa con espera, muestra el ejemplo y se apaga", async () => {
    vi.useFakeTimers()
    localStorage.setItem(EXPEDIENTE_KEY, JSON.stringify({ ...inicial(), sesion: true }))
    await renderDespacho("/despacho/expediente")
    const rec = $(".d-recordatorio")
    await click(button("Elegir mis avisos", rec))
    const casillas = rec.querySelectorAll("input[type=checkbox]")
    await click(casillas[0])
    expect(button("Activar el recordatorio", rec).disabled).toBe(true)
    await click(casillas[1])
    await click(button("Activar el recordatorio", rec))
    expect(rec.textContent).toContain("Activando")
    await advance(700)
    expect(rec.querySelectorAll(".d-wa-burbujas li")).toHaveLength(1)
    expect(rec.textContent).toContain("no se envió")
    expect(JSON.parse(localStorage.getItem(EXPEDIENTE_KEY)).avisos).toEqual({
      previo: false,
      fechas: true,
    })
    await click(button("Desactivar el recordatorio", rec))
    expect(button("Elegir mis avisos", rec)).toBeTruthy()
  })
})

describe("Portada editorial", () => {
  it("lleva el libro mayor, el panel de Xalapa con crédito y el expediente sobre la consulta", async () => {
    await renderDespacho("/despacho")
    expect($("h1").textContent).toBe("Que todo cuadre antes del 17.")
    expect($(".d-portada canvas").getAttribute("aria-hidden")).toBe("true")
    expect($(".d-panel-xalapa img").getAttribute("src")).toBe(FOTOS.xalapa.src)
    expect($(".d-xalapa-pie").textContent).toContain("Koffermejia")
    expect($(".d-consulta-foto .d-exp")).toBeTruthy()
    expect($(".d-consulta-img figcaption").textContent).toContain("ilustrativa")
    expect(document.querySelectorAll(".d-datos li")).toHaveLength(3)
  })

  it("los créditos enlazan las cuatro fotos", async () => {
    await renderDespacho("/despacho/creditos")
    const enlaces = [...document.querySelectorAll(".d-pagina a")].map((a) => a.getAttribute("href"))
    for (const f of Object.values(FOTOS)) expect(enlaces).toContain(f.origen)
  })
})
