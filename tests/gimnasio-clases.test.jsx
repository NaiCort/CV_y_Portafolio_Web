import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { findCategoria } from "../src/giros/gimnasio/data/clases"
import { lugaresLibres, proximasClases } from "../src/giros/gimnasio/lib/horario"
import {
  ESPERA_PASO_MS,
  RESERVAS_KEY,
  avanzarEspera,
  cancelacion,
  cancelar,
  lugaresOcupados,
  reservar,
  resumenDeClase,
} from "../src/giros/gimnasio/lib/reservas"
import { advance, button, click, enter, render } from "./helpers"

const renderClases = (path = "/gimnasio/clases") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/gimnasio/*" element={<GimnasioApp />} />
      </Routes>
    </MemoryRouter>,
  )
const lunes = new Date(2026, 10, 16, 6, 0)
const sesiones = proximasClases(lunes)
const conLugar = sesiones.find((s) => lugaresLibres(s) > 0 && s.categoria !== "ritmo")
const llena = sesiones.find((s) => lugaresLibres(s) === 0)

describe("Reglas de reserva", () => {
  it("marca como ocupados tantos lugares como cupo menos libres, siempre los mismos", () => {
    const ocupados = lugaresOcupados(conLugar)
    const { cupo } = findCategoria(conLugar.categoria)
    expect(ocupados.size).toBe(cupo - lugaresLibres(conLugar))
    expect([...lugaresOcupados(conLugar)]).toEqual([...ocupados])
    for (const n of ocupados) expect(n).toBeGreaterThanOrEqual(1)
  })

  it("no duplica la reserva de una misma sesión y confirma si hay lugar", () => {
    const ahora = lunes.getTime()
    const una = reservar([], { sesion: conLugar, lugar: 3, nombre: " Luis ", ahora })
    expect(una).toHaveLength(1)
    expect(una[0]).toMatchObject({ estado: "confirmada", lugar: 3, nombre: "Luis" })
    expect(reservar(una, { sesion: conLugar, lugar: 4, nombre: "Luis", ahora })).toBe(una)
  })

  it("pone en lista de espera una clase llena y asigna lugar al avanzar", () => {
    expect(llena, "Hay al menos una clase llena en la semana").toBeTruthy()
    const ahora = lunes.getTime()
    const [r] = reservar([], { sesion: llena, lugar: null, nombre: "Ana", ahora })
    expect(r).toMatchObject({ estado: "espera", posicion: 2 })
    const uno = avanzarEspera([r], ahora + ESPERA_PASO_MS)
    expect(uno[0].posicion).toBe(1)
    expect(avanzarEspera(uno, ahora + ESPERA_PASO_MS)).toBe(uno)
    const dos = avanzarEspera(uno, ahora + 2 * ESPERA_PASO_MS)
    expect(dos[0]).toMatchObject({ estado: "confirmada", posicion: null, liberada: true })
  })

  it("permite cancelar sin consecuencia hasta 2 horas antes", () => {
    const [r] = reservar([], { sesion: conLugar, lugar: 1, nombre: "Luis", ahora: 0 })
    const inicio = new Date(r.fecha).getTime()
    expect(cancelacion(r, inicio - 3 * 3600_000)).toBe("libre")
    expect(cancelacion(r, inicio - 3600_000)).toBe("tardia")
    expect(cancelacion(r, inicio + 1)).toBe("pasada")
    expect(cancelar([r], r.id)[0].estado).toBe("cancelada")
  })

  it("estima calorías con MET y 70 kg, y reparte los minutos por zona", () => {
    const r = { categoria: "ciclo" }
    const resumen = resumenDeClase(r)
    expect(resumen).toMatchObject({ minutos: 45, kcal: Math.round((8.5 * 70 * 45) / 60) })
    for (const categoria of ["fuerza", "ciclo", "combate", "movilidad", "ritmo"]) {
      const { minutos, zonas } = resumenDeClase({ categoria })
      expect(
        zonas.reduce((a, b) => a + b, 0),
        categoria,
      ).toBe(minutos)
    }
  })
})

describe("Página de Clases", () => {
  it("tiene un h1, filtra por disciplina y muestra el horario de mañana", async () => {
    await renderClases()
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    expect(document.title).toContain("Clases")
    const dias = document.querySelectorAll(".b-chips")[0].querySelectorAll("input")
    await click(dias[1])
    const todas = document.querySelectorAll(".b-sesiones li").length
    expect(todas).toBeGreaterThan(0)
    const combate = [...document.querySelectorAll(".b-chips")[1].querySelectorAll("label")].find(
      (l) => l.textContent === "Combate",
    )
    await click(combate.querySelector("input"))
    for (const li of document.querySelectorAll(".b-sesiones li"))
      expect(li.textContent).toContain("Combate")
  })

  it("reserva un lugar con nombre, pasa por procesamiento y lo guarda en Mis reservas", async () => {
    vi.useFakeTimers()
    await renderClases()
    await click(document.querySelectorAll(".b-chips")[0].querySelectorAll("input")[1])
    await click(document.querySelector(".b-sesiones .b-btn-p"))
    const dialogo = document.querySelector("dialog[open]")
    expect(dialogo).toBeTruthy()
    await click(dialogo.querySelector('button[type="submit"]'))
    const error = dialogo.querySelector(".b-error")
    const libre = dialogo.querySelector(".b-lugares-rejilla input:not(:disabled)")
    if (libre) {
      expect(error.textContent).toMatch(/Elige/)
      await click(libre)
    }
    await enter(dialogo.querySelector('input[name="nombre"]'), "Luis")
    await click(dialogo.querySelector('button[type="submit"]'))
    expect(dialogo.textContent).toContain("Reservando")
    await advance(800)
    expect(dialogo.querySelector(".b-reserva-codigo").textContent).toMatch(/^BR-\d{5}$/)
    await click(button("Cerrar"))
    const guardadas = JSON.parse(localStorage.getItem(RESERVAS_KEY)).reservas
    expect(guardadas).toHaveLength(1)
    expect(guardadas[0].nombre).toBe("Luis")
    expect(document.querySelector("#mis-reservas").textContent).toContain("Confirmada")
    await click(button("Simular que ya terminó"))
    expect(document.querySelector(".b-resumen").textContent).toContain("Calorías estimadas")
  })

  it("abre la reserva al llegar desde Inicio con la sesión en la dirección", async () => {
    const s = proximasClases(new Date()).find((x) => x.fecha - Date.now() > 3600_000)
    await renderClases(`/gimnasio/clases?sesion=${s.id}&fecha=${s.fecha.toISOString()}`)
    expect(document.querySelector("dialog[open]")).toBeTruthy()
    expect(document.querySelector("dialog[open] h2").textContent).toContain(
      findCategoria(s.categoria).nombre,
    )
  })
})
