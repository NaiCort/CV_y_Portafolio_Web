import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import DespachoApp from "../src/giros/despacho/DespachoApp"
import { EXTRAS, REGIMENES } from "../src/giros/despacho/data/despacho"
import { estimar, telefonoValido } from "../src/giros/despacho/lib/cotizar"
import { advance, button, click, enter, render } from "./helpers"

const renderDespacho = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/despacho/*" element={<DespachoApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (s) => document.querySelector(s)
afterEach(() => vi.useRealTimers())

describe("Estimación", () => {
  it("parte del precio del régimen y suma facturas extra y nómina", () => {
    expect(estimar({ regimen: "resico" })).toMatchObject({ minimo: 690, maximo: 830 })
    // 45 facturas: 15 más que las 30 incluidas, dos bloques de 10.
    expect(estimar({ regimen: "resico", facturas: 45 }).minimo).toBe(930)
    expect(estimar({ regimen: "moral", empleados: 5 })).toMatchObject({
      minimo: 4800,
      nomina: true,
    })
    // Sueldos es anual: ni facturas ni nómina cambian el precio.
    expect(estimar({ regimen: "sueldos", facturas: 500, empleados: 3 })).toMatchObject({
      minimo: 900,
      unidad: "al año",
      nomina: false,
    })
    expect(estimar({ regimen: "otro" })).toBeNull()
  })

  it("todos los regímenes y extras tienen precio", () => {
    for (const r of REGIMENES) expect(r.facturas === null || r.facturas > 0, r.id).toBe(true)
    for (const [nombre, , precio] of EXTRAS) expect(precio, nombre).toBeGreaterThan(0)
    expect(telefonoValido("228 111 2233")).toBe(true)
    expect(telefonoValido("123")).toBe(false)
  })
})

describe("Precios y cotización", () => {
  it("muestra las dos listas y un h1", async () => {
    await renderDespacho("/despacho/precios")
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    expect(document.querySelectorAll(".d-tabla-precios li")).toHaveLength(
      REGIMENES.length + EXTRAS.length,
    )
  })

  it("llega con el régimen pedido y estima al momento", async () => {
    await renderDespacho("/despacho/precios?regimen=moral")
    expect($("#d-regimen").value).toBe("moral")
    expect($(".d-estimado").textContent).toContain("$3,900 a $4,680")
    await enter($("#d-empleados"), "5")
    expect($(".d-estimado").textContent).toContain("$4,800")
    expect($(".d-estimado").textContent).toContain("con nómina")
    await enter($("#d-regimen"), "sueldos")
    expect($("#d-empleados")).toBeNull()
    expect($(".d-estimado").textContent).toContain("al año")
  })

  it("valida, procesa y confirma la cotización con folio", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "Date"] })
    await renderDespacho("/despacho/precios")
    await click(button("Pedir cotización"))
    expect($("#d-nombre").getAttribute("aria-invalid")).toBe("true")
    expect(document.activeElement).toBe($("#d-nombre"))
    await enter($("#d-nombre"), "Ana Ejemplo")
    await enter($("#d-telefono"), "2281112233")
    await click($(".d-check input"))
    await click(button("Pedir cotización"))
    expect(button("Enviando…").disabled).toBe(true)
    await advance(900)
    expect($(".d-cot-hecha h3").textContent).toBe("Recibimos tu solicitud")
    expect($(".d-cot-hecha").textContent).toMatch(/Folio COT-/)
    expect($(".d-cot-hecha").textContent).toContain("declaraciones atrasadas")
    await click(button("Cotizar otro caso"))
    expect($("#d-nombre").value).toBe("")
  })

  it("la cabecera y la portada llevan a cotizar", async () => {
    await renderDespacho("/despacho")
    const hrefs = [...document.querySelectorAll("a")]
      .filter((a) => /^Cotizar/.test(a.textContent))
      .map((a) => a.getAttribute("href"))
    expect(hrefs).toContain("/despacho/precios#cotizar")
  })
})
