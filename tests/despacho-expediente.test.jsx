import { act } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import DespachoApp from "../src/giros/despacho/DespachoApp"
import {
  EXPEDIENTE_KEY,
  cargar,
  inicial,
  reducir,
  semaforo,
  totalIsr,
  totalIva,
  totalPrevio,
} from "../src/giros/despacho/lib/expediente"
import { isrResico } from "../src/giros/despacho/lib/calculos"
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
const guardado = () => JSON.parse(localStorage.getItem(EXPEDIENTE_KEY))
afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe("Reglas del expediente", () => {
  it("el previo cuadra con la tabla de RESICO", () => {
    expect(isrResico(64200, 20000)).toMatchObject({ isr: 963, retenido: 250 })
    expect([totalIsr, totalIva, totalPrevio]).toEqual([713, 571, 1284])
  })

  it("solo avanza el previo por pasos válidos", () => {
    const e = { ...inicial(), sesion: true }
    expect(reducir(e, { type: "presentar" })).toBe(e)
    expect(reducir(e, { type: "duda", texto: "  " })).toBe(e)
    const duda = reducir(e, { type: "duda", texto: "¿Por qué el IVA es bajo?" })
    expect(duda.previo).toBe("duda")
    const aprobado = reducir(duda, { type: "aprobar" })
    expect(aprobado.previo).toBe("aprobado")
    expect(reducir(aprobado, { type: "presentar" }).previo).toBe("presentado")
  })

  it("el semáforo refleja buzón, previo y solicitudes", () => {
    let e = inicial()
    expect(semaforo(e).map(([n]) => n)).toEqual(["ok", "ok", "ojo", "mal", "ojo"])
    e = reducir(e, { type: "buzon" })
    e = reducir(e, { type: "aprobar" })
    e = reducir(e, { type: "no-tengo", id: "renta" })
    e = reducir(e, {
      type: "subir",
      id: "estado-cuenta",
      archivo: { nombre: "a.pdf", peso: "2 kB" },
    })
    expect(semaforo(e).every(([n]) => n === "ok")).toBe(true)
    expect(
      reducir(e, { type: "deshacer-solicitud", id: "renta" }).solicitudes.renta,
    ).toBeUndefined()
  })

  it("descarta un expediente guardado dañado", () => {
    localStorage.setItem(EXPEDIENTE_KEY, "{")
    expect(cargar(localStorage)).toEqual(inicial())
    localStorage.setItem(EXPEDIENTE_KEY, JSON.stringify({ previo: "otro", sesion: true }))
    expect(cargar(localStorage)).toEqual(inicial())
  })
})

describe("Tu expediente", () => {
  it("se abre sin contraseña y recorre previo, duda, presentación y documentos", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] })
    await renderDespacho("/despacho/expediente")
    expect($(".d-entrar").textContent).toContain("nunca te pedimos tu e.firma")
    await click(button("Abrir el expediente de ejemplo"))
    await advance(600)
    expect($(".d-panel-cab h2").textContent).toBe("Hola, Mariana")
    expect($(".d-previo-total").textContent).toContain("$1,284")
    await click(button("Tengo una duda"))
    expect(button("Enviar a Elena").disabled).toBe(true)
    await enter($("#d-duda"), "¿Por qué el IVA es tan bajo?")
    await click(button("Enviar a Elena"))
    expect($(".d-respuesta").textContent).toContain("compraste equipo con factura")
    await click(button("Aprobar el previo"))
    expect(guardado().previo).toBe("aprobado")
    await click(button("Simular la presentación"))
    expect(button("Presentando…").disabled).toBe(true)
    await advance(800)
    expect($(".d-previo-acciones").textContent).toContain("Línea de captura")
    expect($(".d-documentos").textContent).toContain("Acuse de la declaración de noviembre")
    await click(button("Ver Acuse de la declaración de noviembre"))
    expect(document.querySelector("dialog").textContent).toContain("$713")
    await click(button("Cerrar"))
  })

  it("sube un archivo sin enviarlo, avisa si no lo tienes y confirma el buzón", async () => {
    localStorage.setItem(EXPEDIENTE_KEY, JSON.stringify({ ...inicial(), sesion: true }))
    await renderDespacho("/despacho/expediente")
    const input = document.querySelector('.d-solicitudes input[type="file"]')
    const archivo = new File(["x".repeat(3000)], "estado-octubre.pdf", { type: "application/pdf" })
    await act(async () => {
      Object.defineProperty(input, "files", { value: [archivo] })
      input.dispatchEvent(new Event("change", { bubbles: true }))
    })
    expect($(".d-sol-hecha").textContent).toContain("estado-octubre.pdf (3 kB)")
    await click(button("No lo tengo"))
    expect($(".d-solicitudes").textContent).toContain("Le avisamos a Elena")
    expect(document.querySelector(".d-semaforo-panel").textContent).toContain("Todo recibido")
    await click(button("Ya lo confirmé"))
    expect($(".d-buzon")).toBeNull()
    expect(guardado().buzon).toBe(true)
    await click(button("Reiniciar el ejemplo"))
    expect(guardado().buzon).toBe(false)
    await click(button("Salir"))
    expect($(".d-entrar")).toBeTruthy()
  })

  it("la cabecera y la portada llevan al expediente", async () => {
    await renderDespacho("/despacho")
    const hrefs = [...document.querySelectorAll("a")].map((a) => a.getAttribute("href"))
    expect(hrefs.filter((h) => h === "/despacho/expediente").length).toBeGreaterThanOrEqual(3)
  })
})
