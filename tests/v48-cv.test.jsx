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

  it("lista cada demo una sola vez, con su miniatura", async () => {
    const { container } = await montar()
    for (const d of DEMOS) {
      expect(container.querySelectorAll(`a[href="${d.ruta}"]`), d.id).toHaveLength(1)
      expect(container.querySelector(`img[src="/cv/demos/${d.id}.webp"]`), d.id).toBeTruthy()
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

  it("el índice enlaza las cinco secciones y marca la primera", async () => {
    const { container } = await montar()
    const enlaces = [...container.querySelectorAll(".cv-indice a")]
    expect(enlaces.map((a) => a.getAttribute("href"))).toEqual([
      "#cv-resumen",
      "#cv-proyectos",
      "#cv-experiencia",
      "#cv-educacion",
      "#cv-certificaciones",
    ])
    expect(enlaces[0].getAttribute("aria-current")).toBe("true")
  })

  it("cada certificación enlaza a su PDF", async () => {
    const { container } = await montar()
    const enlaces = [...container.querySelectorAll('[aria-labelledby="cv-certificaciones"] a')].map(
      (a) => a.getAttribute("href"),
    )
    expect(enlaces).toEqual([
      "/cv/certificados/visualizador-de-big-data.pdf",
      "/cv/certificados/finder.pdf",
      "/cv/certificados/curador-de-datos.pdf",
    ])
  })

  it("el proyecto de este sitio lleva a la misma página y no repite las demos", async () => {
    const { container } = await montar()
    const propio = [...container.querySelectorAll(".cv-item-enlace")].find((a) =>
      a.textContent.includes("CV y portafolio web"),
    )
    expect(propio.getAttribute("href")).toBe("/")
    expect(propio.getAttribute("target")).toBeNull()
    expect(container.textContent).not.toMatch(/Ver las \d demos/)
    expect(container.querySelector(".cv-linea")).toBeNull()
  })

  it("la experiencia está completa (CV de noviembre más lo del CV visual)", async () => {
    const { container } = await montar()
    const seccion = container.querySelector('[aria-labelledby="cv-experiencia"]')
    expect(seccion.querySelectorAll(".cv-lista > .cv-item")).toHaveLength(4)
    expect(seccion.textContent).toContain("Rincón de Imágenes")
    expect(seccion.textContent).not.toContain("CV y portafolio web")
    const proyectos = container.querySelector('[aria-labelledby="cv-proyectos"]')
    expect(proyectos.querySelectorAll(".cv-lista > .cv-item")).toHaveLength(1)
    expect(proyectos.textContent).toContain("CV y portafolio web")
    const texto = seccion.textContent
    for (const frase of [
      "vistas, CTEs y reglas de negocio",
      "Desarrollo de módulos web para la gestión de personal",
      "tablas, búsqueda y carga",
      "Gestión de entregables remotos",
      "control de calidad básico",
      "Validación de calificaciones con regex y CAST seguro",
    ])
      expect(texto).toContain(frase)
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

// V4.9: el cotizador provisional se convirtió en el cotizador; sus pruebas siguen aquí para
// conservar lo que se pedía desde V4.8 (reconocer la demo de origen por su identificador).
describe("V4.8 y V4.9: cotizador desde una demo", () => {
  it("reconoce la demo de origen y su variante por su identificador", async () => {
    const { container } = await montar("/cotizador?demo=vertice")
    expect(container.querySelector("h1").textContent).toBe(
      "Un sitio como la demo Rosales y Vértice (Vértice)",
    )
  })

  it("sin una demo válida, empieza por elegir el tipo de sitio", async () => {
    const { container } = await montar("/cotizador?demo=no-existe")
    expect(container.querySelector("h1").textContent).toBe("Cotiza tu sitio")
  })
})
