import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"
import Bienvenida from "../src/pages/Bienvenida"
import Cotizador from "../src/pages/Cotizador"
import { DEMOS } from "../src/data/demos"
import { EXPERIENCIA, PERSONA } from "../src/data/cv"
import { button, click, render } from "./helpers"

const montar = (ruta = "/") =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/cotizador" element={<Cotizador />} />
      </Routes>
    </MemoryRouter>,
  )

describe("V4.8: CV web y portafolio", () => {
  it("tiene un solo h1 con el nombre y las secciones del CV en orden", async () => {
    const { container } = await montar()
    const h1 = container.querySelectorAll("h1")
    expect(h1).toHaveLength(1)
    expect(h1[0].textContent).toBe(PERSONA.nombre)
    const secciones = [...container.querySelectorAll("main .cv-seccion > h2")].map(
      (h) => h.textContent,
    )
    expect(secciones).toEqual([
      "Resumen",
      "Proyectos",
      "Experiencia",
      "Educación",
      "Certificaciones",
    ])
    for (const e of EXPERIENCIA) expect(container.textContent).toContain(e.puesto)
  })

  it("lista cada demo una sola vez, con su identificador", async () => {
    const { container } = await montar()
    for (const d of DEMOS) {
      expect(container.querySelectorAll(`a[href="${d.ruta}"]`), d.id).toHaveLength(1)
      expect(container.textContent).toContain(`id: ${d.id}`)
    }
  })

  it("el PDF de noviembre se abre y el CV visual queda como pronto", async () => {
    const { container } = await montar()
    const pdf = container.querySelector('a[href$=".pdf"]')
    expect(pdf.getAttribute("href")).toBe("/cv/cv-ian-aldana-noviembre-2026.pdf")
    expect(container.querySelector('[aria-disabled="true"]').textContent).toMatch(/pronto/)
  })

  it("el botón Demos abre y cierra la lista", async () => {
    const { container } = await montar()
    const demos = button("Demos ▾")
    expect(demos.getAttribute("aria-expanded")).toBe("false")
    await click(demos)
    expect(demos.getAttribute("aria-expanded")).toBe("true")
    expect(container.querySelector(".cv-root").dataset.demos).toBe("abierto")
    await click(button("Cerrar la lista de demos"))
    expect(demos.getAttribute("aria-expanded")).toBe("false")
  })
})

describe("V4.8: cotizador provisional", () => {
  it("reconoce la demo de origen por su identificador", async () => {
    const { container } = await montar("/cotizador?demo=vertice")
    expect(container.querySelector("h1").textContent).toBe("Cotizar un sitio")
    expect(container.textContent).toContain("Rosales y Vértice (Vértice)")
    const wa = container.querySelector('a[href^="https://wa.me/"]')
    expect(decodeURIComponent(wa.getAttribute("href"))).toContain("(vertice)")
  })

  it("sin demo, ofrece la cotización desde cero", async () => {
    const { container } = await montar("/cotizador?demo=no-existe")
    expect(container.textContent).not.toContain("Partirías de la demo")
  })
})
