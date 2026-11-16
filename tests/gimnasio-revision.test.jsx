import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { HORARIO, findCategoria } from "../src/giros/gimnasio/data/clases"
import { COACHES } from "../src/giros/gimnasio/data/coaches"
import { SUCURSALES, findSucursal } from "../src/giros/gimnasio/data/sucursales"
import { abierta, cuandoAbre } from "../src/giros/gimnasio/lib/aforo"
import { horasLibres } from "../src/giros/gimnasio/lib/evaluacion"
import { click, render } from "./helpers"

const minutos = (hora) => {
  const [h, m] = hora.split(":").map(Number)
  return h * 60 + m
}

describe("Revisión final de Brío", () => {
  it("ningún coach tiene dos clases a la vez y cada clase cabe en el horario de su sucursal", () => {
    for (const a of HORARIO) {
      const finA = minutos(a.hora) + findCategoria(a.categoria).minutos
      for (const b of HORARIO) {
        if (a === b || a.coach !== b.coach || a.dia !== b.dia) continue
        const choca =
          minutos(a.hora) < minutos(b.hora) + findCategoria(b.categoria).minutos &&
          minutos(b.hora) < finA
        expect(choca, `${a.id} y ${b.id}`).toBe(false)
      }
      const f = new Date(2026, 10, 15 + a.dia, ...a.hora.split(":").map(Number))
      expect(abierta(findSucursal(a.sucursal), f), a.id).toBe(true)
      const fin = new Date(f.getTime() + (findCategoria(a.categoria).minutos - 1) * 60000)
      expect(abierta(findSucursal(a.sucursal), fin), `${a.id} termina abierta`).toBe(true)
    }
  })

  it("no ofrece la evaluación mientras el coach da clase", () => {
    const antes = new Date(2026, 10, 1)
    for (const c of COACHES)
      for (const s of SUCURSALES) {
        // Martes 17 de noviembre de 2026.
        const dia = new Date(2026, 10, 17)
        for (const h of horasLibres(c.id, s.id, dia, antes).filter((x) => x.libre)) {
          const clase = HORARIO.find(
            (x) =>
              x.coach === c.id && x.dia === 2 && Math.abs(minutos(x.hora) - minutos(h.hora)) < 60,
          )
          expect(clase, `${c.id} ${s.id} ${h.hora}`).toBeUndefined()
        }
      }
  })

  it("dice cuándo abre una sucursal cerrada", () => {
    const centro = findSucursal("centro")
    expect(cuandoAbre(centro, new Date(2026, 10, 17, 4, 0))).toBe("abre a las 5:30")
    expect(cuandoAbre(centro, new Date(2026, 10, 17, 23, 30))).toBe("abre mañana a las 5:30")
    // Viernes en la noche: el sábado abre a las 7:00.
    expect(cuandoAbre(centro, new Date(2026, 10, 20, 23, 30))).toBe("abre mañana a las 7:00")
  })

  it("no muestra la foto de box cuando se filtra una disciplina sin medio propio", async () => {
    await render(
      <MemoryRouter initialEntries={["/gimnasio/clases"]}>
        <Routes>
          <Route path="/gimnasio/*" element={<GimnasioApp />} />
        </Routes>
      </MemoryRouter>,
    )
    const chip = (nombre) =>
      [...document.querySelectorAll('input[name="categoria"]')].find(
        (i) => i.nextElementSibling.textContent === nombre,
      )
    await click(chip("Movilidad"))
    const medio = document.querySelector(".b-clases-medio")
    expect(medio.classList.contains("b-medio-texto")).toBe(true)
    expect(medio.querySelector("img, video")).toBeNull()
    expect(medio.textContent).toContain("Movilidad")
    await click(chip("Ciclo"))
    expect(document.querySelector(".b-clases-medio img")).toBeTruthy()
  })

  it("cuenta las clases del día sin «el hoy»", async () => {
    await render(
      <MemoryRouter initialEntries={["/gimnasio/clases"]}>
        <Routes>
          <Route path="/gimnasio/*" element={<GimnasioApp />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(document.body.textContent).not.toMatch(/el (hoy|mañana)/)
  })
})
