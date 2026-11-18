import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import DespachoApp from "../src/giros/despacho/DespachoApp"
import { REGIMENES } from "../src/giros/despacho/data/despacho"
import { SERVICIOS_DETALLE } from "../src/giros/despacho/data/servicios"
import { EXPEDIENTE_KEY, inicial } from "../src/giros/despacho/lib/expediente"
import { button, click, enter, render } from "./helpers"

const renderDespacho = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/despacho/*" element={<DespachoApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (s) => document.querySelector(s)
afterEach(() => localStorage.clear())

describe("Servicios", () => {
  it("cada servicio dice qué incluye, qué pide, su precio y un régimen válido", () => {
    expect(SERVICIOS_DETALLE).toHaveLength(9)
    expect(new Set(SERVICIOS_DETALLE.map((s) => s.id)).size).toBe(9)
    for (const s of SERVICIOS_DETALLE) {
      expect(s.incluye.length, s.id).toBeGreaterThan(1)
      expect(s.pedimos.length, s.id).toBeGreaterThan(0)
      expect(s.precio, s.id).toMatch(/\$|incluida/)
      expect(
        REGIMENES.some((r) => r.id === s.regimen),
        s.id,
      ).toBe(true)
    }
    expect(SERVICIOS_DETALLE.flatMap((s) => s.pedimos).join(" ")).toContain("nunca la e.firma")
  })

  it("lista los servicios con índice y enlaces a cotizar", async () => {
    await renderDespacho("/despacho/servicios")
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    expect(document.querySelectorAll(".d-serv")).toHaveLength(9)
    expect($(".d-indice a").getAttribute("href")).toBe("/despacho/servicios#contabilidad")
    expect($("#nomina a").getAttribute("href")).toBe(
      "/despacho/precios?regimen=empresarial#cotizar",
    )
    expect($("#regularizacion a").getAttribute("href")).toBe("/despacho/regularizacion")
  })

  it("la portada enlaza cada servicio a su detalle", async () => {
    await renderDespacho("/despacho")
    const enlaces = [...document.querySelectorAll(".d-servicios a")]
    expect(enlaces).toHaveLength(9)
    expect(enlaces[1].getAttribute("href")).toBe("/despacho/servicios#nomina")
  })
})

describe("¿Te dejaron de presentar?", () => {
  it("explica la corrección sin multa y calcula los honorarios", async () => {
    await renderDespacho("/despacho/regularizacion")
    expect($(".d-comparar").textContent).toContain("artículo 73")
    expect($(".d-comparar").textContent).toContain("$2,050 a $25,360")
    expect($(".d-calc-total").textContent).toContain("$1,350")
    await enter($("#d-meses"), "12")
    expect($(".d-calc-total").textContent).toContain("$5,400")
    await enter($("#d-meses"), "99")
    expect($(".d-calc-total").textContent).toContain("$27,000")
  })

  it("lleva a cotizar con la casilla de atrasadas marcada", async () => {
    await renderDespacho("/despacho/precios?atrasadas=1")
    expect($(".d-check input").checked).toBe(true)
  })
})

describe("Aviso de privacidad", () => {
  it("dice qué guarda y borra el expediente con confirmación", async () => {
    localStorage.setItem(
      EXPEDIENTE_KEY,
      JSON.stringify({ ...inicial(), sesion: true, buzon: true }),
    )
    await renderDespacho("/despacho/expediente")
    expect($(".d-panel")).toBeTruthy()
    await click(button("Aviso de privacidad"))
    const d = document.querySelector("dialog")
    expect(d.textContent).toContain("Secretaría Anticorrupción y Buen Gobierno")
    expect(d.textContent).not.toContain("INAI")
    await click(button("Borrar mis datos de esta demo", d))
    await click(button("No borrar", d))
    expect(localStorage.getItem(EXPEDIENTE_KEY)).not.toBeNull()
    await click(button("Borrar mis datos de esta demo", d))
    await click(button("Sí, borrar todo", d))
    expect(document.querySelector("dialog")).toBeNull()
    expect($(".d-aviso").textContent).toContain("Se borró el expediente")
    expect($(".d-entrar")).toBeTruthy()
  })
})
