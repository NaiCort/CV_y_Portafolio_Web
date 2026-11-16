import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import TallerApp from "../src/giros/taller/TallerApp"
import { BATERIA_EJEMPLO, PERFIL_GARAJE, decidirSeguro } from "../src/giros/taller/data/vertice"
import {
  GARAJE_KEY,
  cargarGaraje,
  credencialesValidas,
  siguienteServicio,
  validarKm,
} from "../src/giros/taller/lib/garaje"
import { CITAS_KEY } from "../src/giros/taller/lib/citas"
import { TEMA_KEY } from "../src/giros/taller/lib/tema"
import { advance, button, click, enter, render } from "./helpers"

const renderTaller = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/taller/*" element={<TallerApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (sel) => document.querySelector(sel)
const enlace = (texto) => [...document.querySelectorAll("a")].find((a) => a.textContent === texto)
const [mazda, prius] = PERFIL_GARAJE.autos

beforeEach(() => localStorage.setItem(TEMA_KEY, "vertice"))
afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe("Reglas de Vértice", () => {
  it("decide entre seguro y pago directo según el deducible", () => {
    expect(decidirSeguro(280000, 5, 9000)).toMatchObject({ deducible: 14000, conviene: "directo" })
    expect(decidirSeguro(280000, 5, 30000)).toMatchObject({
      deducible: 14000,
      conviene: "seguro",
      ahorro: 16000,
    })
  })

  it("marca un solo bloque de la batería bajo el mínimo", () => {
    expect(BATERIA_EJEMPLO.bloques.filter((v) => v < BATERIA_EJEMPLO.minimo)).toHaveLength(1)
  })

  it("valida el perfil de ejemplo y el kilometraje", () => {
    expect(credencialesValidas(" Mariana@Ejemplo.mx ", "vertice2026")).toBe(true)
    expect(credencialesValidas("mariana@ejemplo.mx", "otra")).toBe(false)
    const vacio = { km: {} }
    expect(validarKm(mazda, vacio, "")).toBe("Escribe el kilometraje.")
    expect(validarKm(mazda, vacio, "60000")).toContain("No puede ser menor")
    expect(validarKm(mazda, vacio, "200000")).toContain("salto muy grande")
    expect(validarKm(mazda, vacio, "63,000")).toBeNull()
    expect(siguienteServicio(mazda, 69600)).toMatchObject({ faltan: 400, toca: true })
    expect(siguienteServicio(prius, 38900).toca).toBe(false)
  })

  it("descarta un garaje guardado dañado", () => {
    localStorage.setItem(GARAJE_KEY, "{")
    expect(cargarGaraje(localStorage).sesion).toBe(false)
    localStorage.setItem(GARAJE_KEY, JSON.stringify({ sesion: "sí", km: 3 }))
    expect(cargarGaraje(localStorage)).toEqual({ sesion: false, km: {}, recordatorios: {} })
  })
})

describe("Páginas de Vértice", () => {
  it("hojalatería calcula si conviene usar el seguro", async () => {
    await renderTaller("/taller/hojalateria")
    expect($("h1").textContent).toBe("Hojalatería y seguros")
    expect($(".t-deducible-resultado").textContent).toContain("Conviene pagarla directo")
    await enter($("#t-reparacion"), "30000")
    expect($(".t-deducible-resultado").textContent).toContain("Conviene usar el seguro")
    await click(
      [...document.querySelectorAll(".t-deducible label")]
        .find((l) => l.textContent.includes("20 %"))
        .querySelector("input"),
    )
    expect($(".t-deducible-resultado").textContent).toContain("$56,000")
    expect($(".t-deducible-resultado").textContent).toContain("Conviene pagarla directo")
    await enter($("#t-valor"), "")
    expect($(".t-deducible-resultado").textContent).toContain("Escribe el valor")
    expect(enlace("Agendar valoración").getAttribute("href")).toBe(
      "/taller/cita?servicio=hojalateria",
    )
  })

  it("híbridos muestra el reporte de batería y preguntas", async () => {
    await renderTaller("/taller/hibridos")
    expect($(".t-usados-precio").textContent).toContain("$1,890")
    expect(document.querySelectorAll(".t-bateria-barras i.is-bajo")).toHaveLength(1)
    expect(document.querySelectorAll(".t-preguntas details")).toHaveLength(3)
    expect(enlace("Agendar en Arco Sur").getAttribute("href")).toBe(
      "/taller/cita?servicio=hibridos",
    )
  })

  it("en Rosales, las páginas de Vértice ofrecen cambiar de taller", async () => {
    localStorage.setItem(TEMA_KEY, "rosales")
    await renderTaller("/taller/hibridos")
    expect($(".t-solo-en").textContent).toContain("Vértice")
    await click(button("Ver Vértice"))
    expect($(".t-bateria")).toBeTruthy()
  })

  it("Mi garaje entra con el perfil de ejemplo, actualiza el kilometraje y sale", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] })
    localStorage.setItem(
      CITAS_KEY,
      JSON.stringify([
        {
          id: "VC-1",
          taller: "vertice",
          servicio: "alineacion",
          sucursal: "cardenas",
          fecha: new Date(2026, 10, 30, 9).toISOString(),
          auto: "Mazda 3",
          estado: "confirmada",
        },
      ]),
    )
    await renderTaller("/taller/garaje")
    await click(button("Entrar"))
    expect($('[role="alert"]').textContent).toContain("no coinciden")
    await click(button("Usar el perfil de ejemplo"))
    await click(button("Entrar"))
    await advance(600)
    expect($(".t-garaje-hola h2").textContent).toBe("Hola, Mariana")
    expect($(".t-garaje-orden").textContent).toContain("esperando tu visto bueno")
    expect($(".t-historial").textContent).toContain("Cita: Alineación y balanceo")
    const km = $("#t-km-mazda")
    await enter(km, "1000")
    await click(button("Guardar"))
    expect($("#t-km-error-mazda").textContent).toContain("No puede ser menor")
    await enter(km, "69600")
    await click(button("Guardar"))
    expect($(".t-garaje-km").textContent).toBe("69,600 km")
    expect($(".t-garaje-cab").textContent).toContain("Ya toca servicio")
    expect(JSON.parse(localStorage.getItem(GARAJE_KEY)).km.mazda).toBe(69600)
    await click(button("Toyota Prius 2020"))
    expect($(".t-garaje-km").textContent).toBe("38,900 km")
    expect(enlace("Agendar revisión de híbridos")).toBeTruthy()
    await click($(".t-garaje-auto .t-check input"))
    expect(JSON.parse(localStorage.getItem(GARAJE_KEY)).recordatorios.prius).toBe(true)
    await click(button("Salir"))
    expect($(".t-entrar")).toBeTruthy()
  })

  it("el menú del teléfono abre y se cierra al elegir una página", async () => {
    await renderTaller("/taller")
    const menu = button("Menú")
    expect($("#t-menu-movil").hidden).toBe(true)
    await click(menu)
    expect(menu.getAttribute("aria-expanded")).toBe("true")
    const items = [...document.querySelectorAll("#t-menu-movil a")].map((a) => a.textContent)
    expect(items).toEqual([
      "Precios",
      "Hojalatería y seguros",
      "Híbridos",
      "Sucursales",
      "Mi garaje",
      "Consulta tu auto",
      "Agendar cita",
    ])
    await click(
      [...document.querySelectorAll("#t-menu-movil a")].find((a) => a.textContent === "Híbridos"),
    )
    expect($("h1").textContent).toBe("Híbridos y eléctricos")
    expect($("#t-menu-movil").hidden).toBe(true)
  })
})
