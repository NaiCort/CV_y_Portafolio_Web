import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import DespachoApp from "../src/giros/despacho/DespachoApp"
import { PREGUNTAS, diagnosticar } from "../src/giros/despacho/lib/diagnostico"
import { obligaciones } from "../src/giros/despacho/lib/calendario"
import {
  aguinaldo,
  diasVacaciones,
  finiquito,
  isrResico,
  UMA_DIARIA,
} from "../src/giros/despacho/lib/calculos"
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

describe("Diagnóstico", () => {
  const base = { monto: "bajo", empleados: "no", corriente: "si", buzon: "si" }
  it("sugiere el régimen según cómo y cuánto ganas", () => {
    expect(diagnosticar({ ...base, ingreso: "cuenta" }).regimen).toBe("resico")
    expect(diagnosticar({ ...base, ingreso: "cuenta", monto: "alto" }).regimen).toBe("empresarial")
    expect(diagnosticar({ ...base, ingreso: "apps" }).regimen).toBe("plataformas")
    expect(diagnosticar({ ...base, ingreso: "empresa" }).regimen).toBe("moral")
    expect(diagnosticar({ ...base, ingreso: "sueldo" }).regimen).toBe("sueldos")
  })

  it("avisa de riesgos y, si no hay, lo dice", () => {
    expect(diagnosticar({ ...base, ingreso: "cuenta" }).riesgos).toEqual([
      { nivel: "ok", texto: "Con lo que contestaste, no vemos riesgos inmediatos." },
    ])
    const d = diagnosticar({
      ingreso: "negocio",
      monto: "alto",
      empleados: "pocos",
      corriente: "no",
      buzon: "no",
    })
    expect(d.riesgos.map((r) => r.nivel)).toEqual(["ojo", "mal", "mal", "ojo"])
    expect(d.regularizar).toBe(true)
    expect(d.empleados).toBe(3)
  })

  it("recorre las cinco preguntas y muestra el plan", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] })
    await renderDespacho("/despacho/diagnostico")
    expect(button("Siguiente").disabled).toBe(true)
    const elegir = async (texto) =>
      click(
        [...document.querySelectorAll(".d-opciones label")]
          .find((l) => l.textContent === texto)
          .querySelector("input"),
      )
    const respuestas = [
      "Con una empresa o sociedad",
      "Entre $1 y $3.5 millones",
      "De 1 a 5",
      "Debo declaraciones",
    ]
    for (const r of respuestas) {
      await elegir(r)
      await click(button("Siguiente"))
    }
    await click(button("Atrás"))
    expect($(".d-opciones legend").textContent).toContain(PREGUNTAS[3].texto)
    await click(button("Siguiente"))
    await elegir("No")
    await click(button("Ver mi diagnóstico"))
    expect(button("Revisando tus respuestas…").disabled).toBe(true)
    await advance(800)
    expect($(".d-diag-resultado h2").textContent).toBe("Tu régimen probable: Persona moral")
    expect($(".d-diag-plan").textContent).toContain("$4,440")
    expect($(".d-diag-plan").textContent).toContain("regularización")
    const cotizar = [...document.querySelectorAll(".d-diag-resultado a")].find(
      (a) => a.textContent === "Cotizar este plan",
    )
    expect(cotizar.getAttribute("href")).toBe("/despacho/precios?regimen=moral#cotizar")
    await click(button("Empezar de nuevo"))
    expect($(".d-opciones legend").textContent).toContain(PREGUNTAS[0].texto)
  })
})

describe("Calendario fiscal", () => {
  it("pasa al lunes las fechas en fin de semana", () => {
    // 17 de octubre de 2026 cae en sábado.
    const [isr] = obligaciones("resico", 2026, 9)
    expect(isr.fecha.getDay()).toBe(1)
    expect(isr.fecha.getDate()).toBe(19)
  })

  it("cambia según el régimen y los empleados", () => {
    const nombres = (...a) => obligaciones(...a).map((o) => o.nombre)
    expect(nombres("sueldos", 2026, 10)).toEqual([])
    expect(nombres("sueldos", 2026, 3)).toEqual(["Declaración anual"])
    expect(nombres("moral", 2026, 2)).toContain("Declaración anual")
    expect(nombres("moral", 2026, 10)).toEqual([
      "Contabilidad electrónica",
      "ISR e IVA del mes",
      "DIOT",
    ])
    // Noviembre lleva retiro e INFONAVIT del bimestre; diciembre no.
    expect(nombres("resico", 2026, 10, true)).toContain("Retiro e INFONAVIT")
    expect(nombres("resico", 2026, 11, true)).not.toContain("Retiro e INFONAVIT")
  })

  it("navega entre meses y filtra por régimen", async () => {
    vi.useFakeTimers({ toFake: ["Date"] })
    vi.setSystemTime(new Date(2026, 10, 18))
    await renderDespacho("/despacho/calendario")
    expect($(".d-cal-cab h2").textContent).toBe("noviembre de 2026")
    expect($(".d-cal-dias .is-hoy").textContent).toBe("18")
    await click(button("Mes siguiente"))
    expect($(".d-cal-cab h2").textContent).toBe("diciembre de 2026")
    await enter($("#d-perfil"), "sueldos")
    expect($(".d-cal-lista-titulo").textContent).toBe("Este mes no te vence nada")
    expect($(".d-check")).toBeNull()
  })
})

describe("Calculadoras", () => {
  it("calcula ISR de RESICO por tramo y resta la retención", () => {
    expect(isrResico(20000)).toEqual({ tasa: 0.01, isr: 200, retenido: 0, aPagar: 200 })
    expect(isrResico(40000, 10000)).toEqual({ tasa: 0.011, isr: 440, retenido: 125, aPagar: 315 })
    expect(isrResico(100000).tasa).toBe(0.02)
  })

  it("calcula aguinaldo con la parte exenta de 30 UMA", () => {
    expect(aguinaldo(450, 365)).toEqual({ bruto: 6750, exento: 3519.3, gravado: 3230.7 })
    expect(aguinaldo(200, 182.5).bruto).toBe(1500)
    expect(UMA_DIARIA).toBe(117.31)
  })

  it("da vacaciones según los años de servicio y calcula el finiquito", () => {
    expect([1, 2, 5, 6, 10, 11].map(diasVacaciones)).toEqual([12, 14, 20, 22, 22, 24])
    const f = finiquito({ salarioDiario: 400, ingreso: "2025-01-01", salida: "2025-07-01" })
    expect(f.diasAnio).toBe(182)
    expect(f.aguinaldo).toBeCloseTo((400 * 15 * 182) / 365, 1)
    expect(f.diasVacaciones).toBeCloseTo((12 * 181) / 365, 1)
    expect(
      finiquito({ salarioDiario: 400, ingreso: "2025-07-01", salida: "2025-01-01" }),
    ).toBeNull()
  })

  it("cambia de calculadora y recalcula al escribir", async () => {
    await renderDespacho("/despacho/calculadoras")
    expect($(".d-calc-total").textContent).toContain("$315.00")
    await enter($("#d-c-ingresos"), "20000")
    await enter($("#d-c-morales"), "0")
    expect($(".d-calc-total").textContent).toContain("$200.00")
    await click(button("Aguinaldo"))
    expect(button("Aguinaldo").getAttribute("aria-pressed")).toBe("true")
    expect($(".d-calc-total").textContent).toContain("$6,750.00")
    await click(button("Finiquito"))
    await enter($("#d-c-ingreso"), "2030-01-01")
    expect(document.body.textContent).toContain("La fecha de salida debe ser posterior")
  })
})
