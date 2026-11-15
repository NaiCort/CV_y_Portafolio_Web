import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import {
  ESTADO_INICIAL,
  SOCIO_KEY,
  cargarSocio,
  invitadosDelMes,
  renovacionDe,
  socioReducer,
} from "../src/giros/gimnasio/lib/socio"
import { advance, button, click, enter, render } from "./helpers"

const renderBrio = (path = "/gimnasio/socio") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/gimnasio/*" element={<GimnasioApp />} />
      </Routes>
    </MemoryRouter>,
  )
const entrar = async () => {
  await click(button("Usar el perfil de ejemplo"))
  await click(button("Entrar"))
  await advance(700)
}
const guardado = () => JSON.parse(localStorage.getItem(SOCIO_KEY) || "null")

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})
afterEach(() => vi.useRealTimers())

describe("Lógica del área de socio", () => {
  it("avisa la renovación con menos de cinco días y congela por meses completos", () => {
    const ahora = new Date(2026, 10, 17, 10)
    expect(renovacionDe(ahora)).toEqual(new Date(2026, 10, 21))
    const e = socioReducer(ESTADO_INICIAL, {
      type: "congelar",
      meses: 2,
      motivo: "viaje",
      ahora: ahora.getTime(),
    })
    expect(e.membresia).toBe("congelada")
    expect(new Date(e.congelada.hasta)).toEqual(new Date(2027, 0, 17))
    expect(socioReducer(e, { type: "reactivar" }).congelada).toBeNull()
    expect(socioReducer(e, { type: "borrar" })).toBe(ESTADO_INICIAL)
  })

  it("cuenta solo los invitados del mes y tolera datos guardados dañados", () => {
    const ahora = new Date(2026, 10, 17)
    const invitados = [
      { fecha: new Date(2026, 10, 2).toISOString() },
      { fecha: new Date(2026, 9, 30).toISOString() },
    ]
    expect(invitadosDelMes(invitados, ahora)).toBe(1)
    expect(cargarSocio({ getItem: () => "{roto" })).toBe(ESTADO_INICIAL)
    expect(cargarSocio(null)).toBe(ESTADO_INICIAL)
  })
})

describe("Área de socio", () => {
  it("rechaza otras credenciales sin pedir datos y entra con el perfil de ejemplo", async () => {
    await renderBrio()
    expect(document.querySelector("h1").textContent).toBe("Área de socio")
    await enter(document.querySelector("#b-entrar-correo"), "otra@persona.com")
    await enter(document.querySelector("#b-entrar-clave"), "x")
    await click(button("Entrar"))
    expect(document.querySelector("#b-entrar-error").textContent).toContain(
      "solo existe el perfil de ejemplo",
    )
    expect(guardado()?.sesion ?? false).toBe(false)
    await entrar()
    expect(document.querySelector("h1").textContent).toBe("Hola, Andrea")
    expect(document.querySelector(".b-renovacion").textContent).toContain("se renueva")
    expect(guardado().sesion).toBe(true)
    await click(button("Salir"))
    expect(document.querySelector("#b-entrar-correo")).toBeTruthy()
  })

  it("simula la entrada, conecta el reloj y genera pases de invitado hasta el límite", async () => {
    await renderBrio()
    await entrar()
    await click(button("Simular entrada"))
    expect(document.querySelector(".b-aviso").textContent).toContain("Simulación")
    expect(guardado().entradas).toHaveLength(1)

    await click(button("Conectar reloj"))
    await click(button("Conectar (simulado)"))
    expect(document.querySelector(".b-reloj-datos").textContent).toContain("7,480")
    expect(guardado().reloj).toBe(true)

    await click(button("Generar pase"))
    expect(document.querySelector("#b-inv-error")).toBeTruthy()
    for (const nombre of ["Luis", "Ana", "Bea"]) {
      await enter(document.querySelector("#b-inv-nombre"), nombre)
      await click(button("Generar pase"))
    }
    expect(document.querySelectorAll(".b-invitados li")).toHaveLength(3)
    expect(document.querySelector("#b-inv-nombre")).toBeNull()
    expect(document.body.textContent).toContain("Ya usaste los pases de este mes")
  })

  it("congela, reactiva y cancela en un paso, y lo recuerda al volver", async () => {
    const { unmount } = await renderBrio()
    await entrar()
    await click(button("Congelar"))
    await click(button("Congelar 1 mes"))
    expect(document.querySelector(".b-membresia dl").textContent).toContain("Congelada hasta")
    expect(document.body.textContent).toContain("el pase se reactiva")
    await click(button("Reactivar ahora"))
    await click(button("Cancelar membresía"))
    await click(button("Sí, cancelar"))
    expect(document.querySelector(".b-membresia dl").textContent).toContain("Cancelada")
    expect(document.querySelector(".b-renovacion")).toBeNull()
    await unmount()

    await renderBrio()
    expect(document.querySelector("h1").textContent).toBe("Hola, Andrea")
    expect(document.querySelector(".b-membresia dl").textContent).toContain("Cancelada")
  })

  it("borra todos los datos de la demo desde el aviso de privacidad", async () => {
    await renderBrio()
    await entrar()
    await click(button("Aviso de privacidad", document.querySelector("footer")))
    expect(document.querySelector("dialog[open]").textContent).toContain("datos de salud")
    await click(button("Borrar mis datos de esta demo"))
    await click(button("Sí, borrar todo"))
    expect(document.querySelector("#b-entrar-correo")).toBeTruthy()
    expect(guardado()?.sesion ?? false).toBe(false)
  })
})
