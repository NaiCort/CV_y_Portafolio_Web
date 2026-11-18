import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"
import DespachoApp from "../src/giros/despacho/DespachoApp"
import { REGIMENES } from "../src/giros/despacho/data/despacho"
import { SERVICIOS_DETALLE as SERVICIOS } from "../src/giros/despacho/data/servicios"
import { button, click, render } from "./helpers"

const renderDespacho = (path = "/despacho") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/despacho/*" element={<DespachoApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (s) => document.querySelector(s)

describe("Datos de Cotejo", () => {
  it("tiene seis regímenes con precio, unidad y lo que incluye, sin repetir", () => {
    expect(REGIMENES).toHaveLength(6)
    expect(new Set(REGIMENES.map((r) => r.id)).size).toBe(6)
    for (const r of REGIMENES) {
      expect(r.precio, r.id).toBeGreaterThan(0)
      expect(["al mes", "al año"]).toContain(r.unidad)
      expect(r.incluye.length, r.id).toBeGreaterThan(1)
    }
    expect(SERVICIOS).toHaveLength(9)
  })
})

describe("Portada", () => {
  it("abre con un solo h1, sin href vacíos ni enlaces tel:", async () => {
    const { container } = await renderDespacho()
    expect(container.querySelectorAll("h1")).toHaveLength(1)
    expect(container.querySelector('a[href="#"], a[href^="tel:"]')).toBeNull()
    expect(container.querySelectorAll(".d-servicios li")).toHaveLength(9)
  })

  it("el recibo cambia con el régimen elegido", async () => {
    await renderDespacho()
    expect($(".d-recibo-precio").textContent).toContain("$690")
    const moral = [...document.querySelectorAll(".d-regimenes label")].find((l) =>
      l.textContent.includes("Persona moral"),
    )
    await click(moral.querySelector("input"))
    expect($(".d-recibo-precio").textContent).toContain("$3,900")
    expect($(".d-recibo").textContent).toContain("DIOT")
    expect(moral.className).toBe("is-on")
  })

  it("cotizar desde el recibo lleva a la cotización con el régimen", async () => {
    await renderDespacho()
    const enlace = [...document.querySelectorAll(".d-recibo a")].find(
      (x) => x.textContent === "Cotizar mi caso",
    )
    expect(enlace.getAttribute("href")).toBe("/despacho/precios?regimen=resico#cotizar")
  })

  it("WhatsApp es una conversación simulada", async () => {
    await renderDespacho()
    await click(button("Escribir por WhatsApp"))
    expect(document.querySelector("dialog").textContent).toContain("En un sitio real")
  })

  it("aprobar el previo de ejemplo cambia su semáforo y se puede deshacer", async () => {
    await renderDespacho()
    const previo = () =>
      [...document.querySelectorAll(".d-semaforo li")].find((li) =>
        li.textContent.includes("Previo de noviembre"),
      )
    expect(previo().className).toBe("d-nivel-ojo")
    await click(button("Aprobar el previo de ejemplo"))
    expect(previo().className).toBe("d-nivel-ok")
    expect(previo().textContent).toContain("Aprobado")
    await click(button("Deshacer"))
    expect(previo().className).toBe("d-nivel-ojo")
  })

  it("simula la llamada y abre el menú del teléfono", async () => {
    const { container } = await renderDespacho()
    await click(container.querySelector(".d-tel"))
    expect(document.querySelector("dialog").textContent).toContain("la demo no hace llamadas")
    await click(button("Volver a la demo"))
    const menu = button("Menú")
    await click(menu)
    expect(menu.getAttribute("aria-expanded")).toBe("true")
    expect($("#d-menu-movil").hidden).toBe(false)
  })

  it("muestra créditos y regresa al inicio desde rutas desconocidas", async () => {
    const { container } = await renderDespacho("/despacho/creditos")
    expect(container.querySelector("h1").textContent).toBe("Créditos")
    const otra = await renderDespacho("/despacho/nada")
    expect(otra.container.querySelector("h1").textContent).toContain("Que todo cuadre")
  })
})
