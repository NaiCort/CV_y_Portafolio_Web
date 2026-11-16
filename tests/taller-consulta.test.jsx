import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import TallerApp from "../src/giros/taller/TallerApp"
import { TALLERES } from "../src/giros/taller/data/talleres"
import {
  ORDEN_KEY,
  aumentoHallazgo,
  avanzarReparacion,
  cargarOrden,
  decidirHallazgo,
  enviarVistoBueno,
  estadoInicial,
  garantiaHasta,
  piezasCambiadas,
  totales,
} from "../src/giros/taller/lib/orden"
import { TEMA_KEY } from "../src/giros/taller/lib/tema"
import { advance, button, click, enter, render } from "./helpers"

const { rosales, vertice } = TALLERES
const ruta = (t) =>
  `/taller/consulta?${new URLSearchParams({ folio: t.orden.folio, placas: t.orden.placas })}`
const renderConsulta = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/taller/*" element={<TallerApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (sel) => document.querySelector(sel)
const opcion = (scope, texto) =>
  [...scope.querySelectorAll("label")]
    .find((l) => l.textContent.trim() === texto)
    .querySelector("input")
const con = (decisiones, extra = {}) => ({ ...estadoInicial(), decisiones, firma: "Ana", ...extra })

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout", "setInterval"] })
  vi.setSystemTime(new Date(2026, 10, 26, 11))
})
afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe("Presupuesto por partida", () => {
  it("cada partida con precio suma refacción y mano de obra", () => {
    for (const t of [rosales, vertice]) {
      for (const p of [...t.orden.partidas.filter((x) => x.precio), t.orden.hallazgo])
        expect(p.refaccion + p.manoObra, `${t.id} ${p.id}`).toBe(p.precio)
    }
  })

  it("si no se autoriza nada, se paga solo el diagnóstico", () => {
    const t = totales(rosales, con({ balatas: "no", amortiguador: "no" }))
    expect(t).toMatchObject({ soloDiagnostico: true, total: 350, iva: 48 })
    expect(totales(vertice, con({ llantas: "no", servicio: "no" })).total).toBe(450)
  })

  it("suma lo autorizado con IVA incluido y descuenta el diagnóstico", () => {
    const t = totales(rosales, con({ balatas: "si", amortiguador: "no" }, { hallazgo: "si" }))
    expect(t).toMatchObject({ total: 1630, refacciones: 1180, manoObra: 450, diagnostico: 0 })
    expect(t.iva).toBe(225)
    expect(aumentoHallazgo(rosales.orden, con({ balatas: "si", amortiguador: "no" }))).toBeCloseTo(
      680 / 950,
    )
  })

  it("solo avanza por las transiciones permitidas", () => {
    const sinFirma = { ...con({ balatas: "si", amortiguador: "no" }), firma: " " }
    expect(enviarVistoBueno(rosales.orden, sinFirma)).toBe(sinFirma)
    const incompleto = con({ balatas: "si" })
    expect(enviarVistoBueno(rosales.orden, incompleto)).toBe(incompleto)
    const nada = enviarVistoBueno(rosales.orden, con({ balatas: "no", amortiguador: "no" }))
    expect(nada.etapa).toBe("listo")
    let e = enviarVistoBueno(rosales.orden, con({ balatas: "si", amortiguador: "no" }))
    expect(e.etapa).toBe("reparacion")
    e = avanzarReparacion(e)
    expect(e.avance).toBe(1)
    // No termina sin decidir el hallazgo.
    expect(avanzarReparacion(e)).toBe(e)
    expect(decidirHallazgo(e, "quizá")).toBe(e)
    e = avanzarReparacion(decidirHallazgo(e, "no"))
    expect(e.etapa).toBe("listo")
  })

  it("explica qué piezas se devuelven y cuáles se reciclan", () => {
    const piezas = piezasCambiadas(vertice.orden, con({ llantas: "si", servicio: "si" }))
    expect(piezas.map((p) => p.nota).join(" ")).toContain("residuo peligroso")
    expect(piezas.map((p) => p.nota).join(" ")).toContain("reciclar")
  })

  it("da garantía de 90 días en Rosales y seis meses en Vértice", () => {
    const desde = new Date(2026, 10, 26)
    expect(garantiaHasta("rosales", desde).toDateString()).toBe(
      new Date(2027, 1, 24).toDateString(),
    )
    expect(garantiaHasta("vertice", desde).getMonth()).toBe(4)
  })

  it("carga la orden guardada de cada taller y descarta la dañada", () => {
    localStorage.setItem(ORDEN_KEY, JSON.stringify({ vertice: { etapa: "listo", firma: "x" } }))
    expect(cargarOrden(localStorage, "vertice").etapa).toBe("listo")
    expect(cargarOrden(localStorage, "rosales").etapa).toBe("visto-bueno")
    localStorage.setItem(ORDEN_KEY, JSON.stringify({ rosales: { etapa: "otra" } }))
    expect(cargarOrden(localStorage, "rosales")).toEqual(estadoInicial())
    localStorage.setItem(ORDEN_KEY, "{")
    expect(cargarOrden(localStorage, "rosales")).toEqual(estadoInicial())
  })
})

describe("Consulta tu auto", () => {
  it("pide folio y placas si la dirección no trae una orden válida", async () => {
    await renderConsulta("/taller/consulta?folio=R-1&placas=AAA")
    expect($("h1").textContent).toBe("Consulta tu auto")
    expect($(".t-consulta")).toBeTruthy()
    expect($(".t-presu")).toBeNull()
  })

  it("recorre visto bueno, reparación con hallazgo y entrega en Rosales", async () => {
    await renderConsulta(ruta(rosales))
    expect(document.querySelectorAll(".t-presu-partida")).toHaveLength(3)
    await click(button("Enviar mi visto bueno"))
    expect($('[role="alert"]').textContent).toContain("Falta decidir")
    const [balatas, amortiguador] = document.querySelectorAll(".t-presu .t-decision")
    await click(opcion(balatas, "Autorizar"))
    await click(opcion(amortiguador, "No por ahora"))
    expect($(".t-firma .t-resumen").textContent).toContain("$950")
    await click(button("Enviar mi visto bueno"))
    expect($('[role="alert"]').textContent).toContain("firma")
    await enter($("#t-firma"), "Ana Ejemplo")
    await click(button("Enviar mi visto bueno"))
    expect(button("Enviando tu visto bueno…").disabled).toBe(true)
    await advance(800)
    expect($('.t-etapas [aria-current="step"]').textContent).toContain("En reparación")
    expect(balatas.disabled).toBe(true)
    await click(button("Avanzar la simulación"))
    expect($(".t-hallazgo").textContent).toContain("sube el total 72 %")
    expect(button("Terminar la reparación").disabled).toBe(true)
    await click(opcion($(".t-hallazgo"), "Autorizar"))
    await click(button("Terminar la reparación"))
    expect($(".t-entrega h2").textContent).toBe("Listo para entregar")
    expect($(".t-comprobante-total").textContent).toContain("$1,630")
    expect($(".t-entrega").textContent).toContain("Disco delantero izquierdo")
    expect($(".t-entrega").textContent).toContain("24 de febrero de 2027")
    expect(JSON.parse(localStorage.getItem(ORDEN_KEY)).rosales.etapa).toBe("listo")
    await click(button("Reiniciar la orden de ejemplo"))
    expect($(".t-firma")).toBeTruthy()
    expect(JSON.parse(localStorage.getItem(ORDEN_KEY)).rosales.etapa).toBe("visto-bueno")
  })

  it("sin autorizar nada, Vértice entrega cobrando solo el diagnóstico", async () => {
    localStorage.setItem(TEMA_KEY, "vertice")
    await renderConsulta(ruta(vertice))
    const [llantas, servicio] = document.querySelectorAll(".t-presu .t-decision")
    await click(opcion(llantas, "No por ahora"))
    await click(opcion(servicio, "No por ahora"))
    expect($(".t-firma").textContent).toContain("pagarías solo el diagnóstico, $450")
    await enter($("#t-firma"), "Luis Ejemplo")
    await click(button("Enviar mi visto bueno"))
    await advance(800)
    expect($(".t-entrega h2").textContent).toBe("Listo para recoger")
    expect($(".t-comprobante").textContent).toContain("Diagnóstico computarizado")
    expect($(".t-comprobante-total").textContent).toContain("$450")
  })

  it("la orden de un taller no abre en el otro", async () => {
    localStorage.setItem(TEMA_KEY, "vertice")
    await renderConsulta(ruta(rosales))
    expect($(".t-presu")).toBeNull()
    expect($(".t-consulta")).toBeTruthy()
  })
})
