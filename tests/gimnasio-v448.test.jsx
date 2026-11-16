import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { CATEGORIAS, NIVELES } from "../src/giros/gimnasio/data/clases"
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
