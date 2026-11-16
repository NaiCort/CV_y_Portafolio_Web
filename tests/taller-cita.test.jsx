import { act } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import TallerApp from "../src/giros/taller/TallerApp"
import { TALLERES } from "../src/giros/taller/data/talleres"
import {
  CITAS_KEY,
  admiteDomicilio,
  cargarCitas,
  desdeTestigo,
  diasDisponibles,
  horasDelDia,
  serviciosAgendables,
  sucursalesPara,
  telefonoValido,
} from "../src/giros/taller/lib/citas"
import { crearIcs } from "../src/giros/taller/lib/calendario"
import { eventoDeCita, lugarTexto } from "../src/giros/taller/lib/citaTexto"
import { TEMA_KEY } from "../src/giros/taller/lib/tema"
import { advance, button, click, enter, render } from "./helpers"

const { rosales, vertice } = TALLERES
// Martes 17 de noviembre de 2026, 10:00.
const AHORA = new Date(2026, 10, 17, 10)
const renderCita = (path = "/taller/cita") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/taller/*" element={<TallerApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (sel) => document.querySelector(sel)
const radio = (texto) =>
  [...document.querySelectorAll("label")]
    .find((l) => l.textContent.includes(texto) && l.querySelector("input"))
    .querySelector("input")
const continuar = () => click(button("Continuar"))

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout", "setInterval"] })
  vi.setSystemTime(AHORA)
})
afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe("Reglas de la cita", () => {
  it("no agenda la recolección como servicio y manda las especialidades a su sucursal", () => {
    expect(serviciosAgendables(vertice).some((s) => s.id === "recoleccion")).toBe(false)
    expect(sucursalesPara(vertice, "hibridos").map((s) => s.id)).toEqual(["arco-sur"])
    expect(sucursalesPara(vertice, "hojalateria").map((s) => s.id)).toEqual(["animas"])
    expect(sucursalesPara(vertice, "diagnostico")).toHaveLength(4)
    expect(admiteDomicilio("diagnostico")).toBe(true)
    expect(admiteDomicilio("frenos")).toBe(false)
  })

  it("convierte un testigo en servicio y avisa si no conviene manejar", () => {
    expect(desdeTestigo(rosales, "aceite")).toMatchObject({
      servicio: "domicilio",
      noManejar: true,
    })
    expect(desdeTestigo(vertice, "aceite")).toMatchObject({
      servicio: "diagnostico",
      noManejar: true,
    })
    expect(desdeTestigo(rosales, "llantas").servicio).toBe("diagnostico")
    expect(desdeTestigo(rosales, "nada")).toBeNull()
  })

  it("ofrece horas con dos de anticipación, dentro del horario y sin domingos cerrados", () => {
    const hoy = horasDelDia(rosales.local.horario, "rosales-taller", AHORA, AHORA)
    expect(hoy[0].texto).toBe("8:30")
    expect(hoy.at(-1).texto).toBe("17:30")
    expect(hoy.filter((h) => h.inicio.getHours() < 12).every((h) => !h.libre)).toBe(true)
    const dias = diasDisponibles(rosales.local.horario, "rosales-taller", AHORA)
    expect(dias).toHaveLength(10)
    expect(dias.some((d) => d.dia.getDay() === 0)).toBe(false)
    const ocupadas = dias.flatMap((d) => d.horas).filter((h) => !h.libre).length
    expect(ocupadas).toBeGreaterThan(0)
    // Lázaro Cárdenas sí abre el domingo.
    const cardenas = vertice.sucursales.find((s) => s.id === "cardenas")
    expect(
      diasDisponibles(cardenas.horario, "cardenas", AHORA).some((d) => d.dia.getDay() === 0),
    ).toBe(true)
  })

  it("valida el teléfono y descarta citas guardadas dañadas", () => {
    expect(telefonoValido("228 000 0000")).toBe(true)
    expect(telefonoValido("12345")).toBe(false)
    localStorage.setItem(
      CITAS_KEY,
      JSON.stringify([{ id: "x" }, null, { id: "a", taller: "rosales", fecha: "2026" }]),
    )
    expect(cargarCitas(localStorage)).toHaveLength(1)
    localStorage.setItem(CITAS_KEY, "{")
    expect(cargarCitas(localStorage)).toEqual([])
  })

  it("describe el lugar y arma el evento de calendario", () => {
    const cita = {
      id: "VC-1",
      servicio: "hibridos",
      sucursal: "arco-sur",
      recoleccion: true,
      direccion: "Av. Ejemplo 1",
      fecha: new Date(2026, 10, 18, 9).toISOString(),
      auto: "Toyota Prius 2020",
    }
    expect(lugarTexto(vertice, cita)).toBe(
      "Recolección en Av. Ejemplo 1; se atiende en Vértice Arco Sur",
    )
    const ics = crearIcs(eventoDeCita(vertice, cita))
    expect(ics).toContain("SUMMARY:Revisión de híbridos · Vértice")
    expect(ics).toContain("UID:VC-1@taller.demo")
    expect(ics.split("\r\n").every((l) => new TextEncoder().encode(l).length <= 75)).toBe(true)
  })
})

describe("Agendar cita", () => {
  it("agenda en Rosales con el mecánico a domicilio, en cinco pasos", async () => {
    await renderCita("/taller/cita?testigo=aceite")
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    expect($(".t-cita-aviso").textContent).toContain("Presión de aceite")
    expect(radio("Mecánico a domicilio").checked).toBe(true)
    await continuar()
    await continuar()
    expect($("#t-marca").getAttribute("aria-invalid")).toBe("true")
    expect(document.activeElement).toBe($("#t-marca"))
    await enter($("#t-marca"), "Nissan")
    await enter($("#t-modelo"), "Versa")
    await enter($("#t-anio"), "1900")
    await continuar()
    expect(document.body.textContent).toContain("Escribe un año entre 1960")
    await enter($("#t-anio"), "2018")
    await continuar()
    // Solo domicilio: no se ofrece llevarlo al taller.
    expect(document.body.textContent).not.toContain("Lo llevo al taller")
    await enter($("#t-colonia"), "Otra colonia")
    await enter($("#t-calle"), "Calle Ejemplo 12")
    await continuar()
    expect(document.body.textContent).toContain("El mecánico llega hasta 3 km")
    await enter($("#t-colonia"), "21 de Marzo")
    await click($(".t-dias input"))
    const libre = [...document.querySelectorAll(".t-horas input")].find((i) => !i.disabled)
    await click(libre)
    await continuar()
    await enter($("#t-nombre"), "Ana Ejemplo")
    await enter($("#t-telefono"), "22800")
    await continuar()
    expect(document.body.textContent).toContain("Escribe un número de 10 dígitos")
    await enter($("#t-telefono"), "2280000000")
    await continuar()
    expect($(".t-resumen").textContent).toContain("Calle Ejemplo 12, colonia 21 de Marzo")
    await click(button("Confirmar cita"))
    expect(button("Apartando tu lugar…").disabled).toBe(true)
    await advance(900)
    expect($(".t-cita-hecha h2").textContent).toBe("Tu cita está apartada")
    expect($(".t-cita-folio").textContent).toMatch(/^Folio RC-/)
    const guardadas = JSON.parse(localStorage.getItem(CITAS_KEY))
    expect(guardadas).toHaveLength(1)
    expect(guardadas[0]).toMatchObject({
      taller: "rosales",
      modo: "domicilio",
      servicio: "domicilio",
    })
    expect($(".t-tus-citas").textContent).toContain("Mecánico a domicilio en la colonia")
  })

  it("agenda en Vértice una especialidad en su sucursal, con recolección", async () => {
    localStorage.setItem(TEMA_KEY, "vertice")
    await renderCita("/taller/cita")
    await click(radio("Revisión de híbridos"))
    await continuar()
    await enter($("#t-marca"), "Toyota")
    await enter($("#t-modelo"), "Prius")
    await continuar()
    // Híbridos solo en Arco Sur: queda elegida sin preguntar.
    expect(document.querySelectorAll('input[name="sucursal"]')).toHaveLength(1)
    expect(document.body.textContent).toContain("se atiende solo en la sucursal Arco Sur")
    await click(radio("Pasen por mi auto"))
    await continuar()
    expect(document.body.textContent).toContain("Escribe dónde pasamos por el auto.")
    await enter($("#t-direccion"), "Av. Ejemplo 100")
    await click($(".t-dias input"))
    await click([...document.querySelectorAll(".t-horas input")].find((i) => !i.disabled))
    await continuar()
    await enter($("#t-nombre"), "Luis Ejemplo")
    await enter($("#t-telefono"), "228 111 2233")
    await continuar()
    await click(button("Confirmar cita"))
    await advance(900)
    expect($(".t-cita-folio").textContent).toMatch(/^Folio VC-/)
    expect($(".t-cita-hecha").textContent).toContain("Recolección en Av. Ejemplo 100")
    const [cita] = JSON.parse(localStorage.getItem(CITAS_KEY))
    expect(cita).toMatchObject({ taller: "vertice", sucursal: "arco-sur", recoleccion: true })
  })

  it("abre con la sucursal pedida y cada taller ve solo sus citas", async () => {
    localStorage.setItem(
      CITAS_KEY,
      JSON.stringify([
        {
          id: "RC-1",
          taller: "rosales",
          servicio: "aceite",
          modo: "taller",
          fecha: new Date(2026, 10, 18, 9).toISOString(),
          auto: "Nissan Versa",
          estado: "confirmada",
        },
      ]),
    )
    localStorage.setItem(TEMA_KEY, "vertice")
    await renderCita("/taller/cita?sucursal=cardenas")
    expect($(".t-tus-citas")).toBeNull()
    await click(radio("Alineación y balanceo"))
    await continuar()
    await enter($("#t-marca"), "Kia")
    await enter($("#t-modelo"), "Rio")
    await continuar()
    expect(radio("Lázaro Cárdenas").checked).toBe(true)
    await click(button("Mecánica Rosales (taller familiar)"))
    expect($("h1").textContent).toBe("Agendar cita en Rosales")
    expect($(".t-tus-citas").textContent).toContain("Cambio de aceite y filtro")
  })

  it("cancela una cita con confirmación", async () => {
    localStorage.setItem(
      CITAS_KEY,
      JSON.stringify([
        {
          id: "RC-1",
          taller: "rosales",
          servicio: "aceite",
          modo: "taller",
          fecha: new Date(2026, 10, 18, 9).toISOString(),
          auto: "Nissan Versa",
          estado: "confirmada",
        },
      ]),
    )
    await renderCita()
    await click(button("Cancelar cita"))
    await click(button("No"))
    expect(JSON.parse(localStorage.getItem(CITAS_KEY))[0].estado).toBe("confirmada")
    await click(button("Cancelar cita"))
    await click(button("Sí, cancelar"))
    await act(async () => {})
    expect(JSON.parse(localStorage.getItem(CITAS_KEY))[0].estado).toBe("cancelada")
    expect($(".t-tus-citas li").textContent).toContain("cancelada")
  })
})
