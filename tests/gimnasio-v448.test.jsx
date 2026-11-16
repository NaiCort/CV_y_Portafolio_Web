import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { CATEGORIAS, NIVELES } from "../src/giros/gimnasio/data/clases"
import { SUCURSALES, findSucursal } from "../src/giros/gimnasio/data/sucursales"
import { abierta, aforoEn, aforoPorHora, horasTranquilas } from "../src/giros/gimnasio/lib/aforo"
import { click, render } from "./helpers"

const renderBrio = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/gimnasio/*" element={<GimnasioApp />} />
      </Routes>
    </MemoryRouter>,
  )

describe("Nivel, intensidad y qué traer", () => {
  it("cada disciplina dice su nivel, intensidad y qué traer", () => {
    for (const c of CATEGORIAS) {
      expect(NIVELES[c.nivel], c.id).toBeTruthy()
      expect([1, 2, 3], c.id).toContain(c.intensidad)
      expect(c.traer.length, c.id).toBeGreaterThan(10)
    }
  })

  it("filtra el horario por nivel y explica las disciplinas", async () => {
    await renderBrio("/gimnasio/clases")
    expect(document.querySelectorAll(".b-guia-clases dt")).toHaveLength(CATEGORIAS.length)
    const nivel = [...document.querySelectorAll('input[name="nivel"]')]
    expect(nivel).toHaveLength(2)
    // Recorre los siete días con «Para empezar»: solo quedan Movilidad y Ritmo.
    await click(nivel[1])
    const dias = [...document.querySelectorAll('input[name="dia"]')]
    const vistas = new Set()
    for (const d of dias) {
      await click(d)
      for (const s of document.querySelectorAll(".b-sesiones strong")) vistas.add(s.textContent)
    }
    expect([...vistas].sort()).toEqual(["Movilidad", "Ritmo"])
    expect(document.querySelector(".b-sesiones .b-nivel").textContent).toContain("Para empezar")
  })
})

describe("Tu primera visita", () => {
  it("las horas tranquilas caen dentro del horario y bajo un tercio del aforo", () => {
    for (const s of SUCURSALES)
      for (const fecha of [new Date(2026, 10, 18, 12), new Date(2026, 10, 21, 12)])
        for (const [a, b] of horasTranquilas(s, fecha)) {
          expect(b - a, s.id).toBeGreaterThanOrEqual(2)
          for (let h = a; h < b; h++) {
            const f = new Date(fecha)
            f.setHours(h, 30, 0, 0)
            expect(abierta(s, f), `${s.id} ${h}:30`).toBe(true)
            const g = new Date(fecha)
            g.setHours(h, 0, 0, 0)
            expect(aforoEn(s, g) ?? 0, `${s.id} ${h}:00`).toBeLessThan(35)
          }
        }
    // El sábado Centro cierra a las 20:00: ningún tramo pasa de ahí.
    const centro = horasTranquilas(findSucursal("centro"), new Date(2026, 10, 21, 12))
    expect(Math.max(...centro.map(([, b]) => b))).toBeLessThanOrEqual(20)
  })

  it("explica la llegada, qué traer y las horas tranquilas, con enlaces desde la portada", async () => {
    await renderBrio("/gimnasio")
    await click(document.querySelector('.b-hero-nota a[href="/gimnasio/primera-visita"]'))
    expect(document.querySelector("main h1").textContent).toBe("Tu primera visita")
    expect(document.title).toContain("Tu primera visita")
    expect(document.querySelectorAll(".b-tabla-tranquilas tbody tr")).toHaveLength(5)
    expect(document.body.textContent).toContain("Qué traer")
    expect(document.querySelector('main a[href="/gimnasio/clases?prueba=1"]')).toBeTruthy()
    expect(document.querySelector('footer a[href="/gimnasio/primera-visita"]')).toBeTruthy()
  })
})

describe("Aforo de hoy por hora", () => {
  afterEach(() => vi.useRealTimers())

  it("solo cuenta las horas abiertas y marca la actual en la ficha de la sucursal", async () => {
    const sabado = new Date(2026, 10, 21, 12)
    expect(aforoPorHora(findSucursal("centro"), sabado).map((x) => x.hora)).toEqual([
      7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ])
    expect(aforoPorHora(findSucursal("macuiltepetl"), sabado)).toHaveLength(24)
    vi.useFakeTimers({ toFake: ["Date"] })
    vi.setSystemTime(new Date(2026, 10, 17, 18, 20))
    await renderBrio("/gimnasio")
    const ficha = document.querySelector("#b-suc-centro-datos .b-aforo-dia")
    expect(ficha.querySelector("figcaption").textContent).toMatch(/más lleno a las \d+:00/)
    expect(ficha.querySelector(".is-ahora")).toBeTruthy()
    expect(ficha.querySelector(".b-oculto").textContent).toContain("18:00")
    expect(ficha.querySelector(".b-oculto").textContent).toContain("(ahora)")
  })
})

describe("Accesibilidad y estacionamiento", () => {
  it("cada sucursal dice cómo se entra y dónde estacionarse, y la ficha lo muestra", async () => {
    for (const s of SUCURSALES) {
      expect(s.accesibilidad.length, s.id).toBeGreaterThan(20)
      expect(s.estacionamiento.length, s.id).toBeGreaterThan(20)
    }
    await renderBrio("/gimnasio")
    const ficha = document.querySelector("#b-suc-centro-datos").textContent
    expect(ficha).toContain("Accesibilidad")
    expect(ficha).toContain("Estacionamiento")
    expect(ficha).toContain(findSucursal("centro").estacionamiento)
  })
})
