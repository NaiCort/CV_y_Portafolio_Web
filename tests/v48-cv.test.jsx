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
      "Trayectoria",
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

describe("V4.8.3: foto, índice, línea de tiempo y transición", () => {
  it("muestra la foto con texto alternativo y tamaños", async () => {
    const { container } = await montar()
    const img = container.querySelector(".cv-foto img")
    expect(img.getAttribute("alt")).toBe("Retrato de Ian Habid Aldana Martínez")
    expect(img.getAttribute("srcset")).toContain("ian-1024.webp 1024w")
  })

  it("el índice enlaza las seis secciones y marca la primera", async () => {
    const { container } = await montar()
    const enlaces = [...container.querySelectorAll(".cv-indice a")]
    expect(enlaces.map((a) => a.getAttribute("href"))).toEqual([
      "#cv-resumen",
      "#cv-trayectoria",
      "#cv-proyectos",
      "#cv-experiencia",
      "#cv-educacion",
      "#cv-certificaciones",
    ])
    expect(enlaces[0].getAttribute("aria-current")).toBe("true")
  })

  it("la línea de tiempo dibuja ocho filas sin pasar de hoy", async () => {
    const { container } = await montar()
    const filas = [...container.querySelectorAll(".cv-linea li")]
    expect(filas).toHaveLength(8)
    for (const f of filas) {
      const barra = f.querySelector(".cv-linea-barra")
      expect(parseFloat(barra.style.getPropertyValue("--b"))).toBeLessThanOrEqual(100)
      expect(parseFloat(barra.style.getPropertyValue("--a"))).toBeGreaterThanOrEqual(0)
    }
    const enCurso = filas.filter((f) => f.hasAttribute("data-en-curso"))
    expect(enCurso.map((f) => f.querySelector(".cv-linea-nombre").firstChild.textContent)).toEqual([
      "Maestría en Ingeniería",
      "Múltiples Demos",
    ])
    expect(container.querySelector(".cv-linea figcaption").textContent).toContain("agosto de 2028")
  })

  it("abrir una demo navega a su ruta (sin View Transitions, directo)", async () => {
    const { container } = await render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/cafe" element={<h1>Ladera</h1>} />
        </Routes>
      </MemoryRouter>,
    )
    await click(container.querySelector('#demos a[href="/cafe"]'))
    expect(container.querySelector("h1").textContent).toBe("Ladera")
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
