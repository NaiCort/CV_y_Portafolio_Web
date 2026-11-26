import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import PsicologoApp from "../src/giros/psicologo/PsicologoApp"
import Respira from "../src/giros/psicologo/components/Respira"
import { PORTADAS } from "../src/giros/psicologo/portadas"
import { completarImagenes, corregirEstilo } from "../src/lib/estiloMapa"
import { precargarPortada } from "../src/rutasDemo"
import { advance, button, click, render } from "./helpers"

// V4.10.5: cambio de tema, «Respira conmigo», estilo del mapa y foto de Neblina.
describe("V4.10.5: cambio de tema en Psicólogo", () => {
  it("vuelve arriba al cambiar de tema (con movimiento reducido, sin velo)", async () => {
    localStorage.setItem("demo-psicologo-theme", "sala")
    const subir = vi.spyOn(window, "scrollTo").mockImplementation(() => {})
    await render(
      <MemoryRouter>
        <PsicologoApp />
      </MemoryRouter>,
    )
    subir.mockClear()
    await click(button("Tema Cuaderno"))
    expect(document.querySelector(".psi-cuaderno")).not.toBeNull()
    expect(document.querySelector(".psi-velo")).toBeNull()
    expect(subir).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" })
    // Elegir el tema que ya está activo no hace nada.
    subir.mockClear()
    await click(button("Tema Cuaderno"))
    expect(subir).not.toHaveBeenCalled()
  })
})

describe("V4.10.5: «Respira conmigo»", () => {
  it("la figura nace quieta, sigue las fases y se apaga al detener", async () => {
    vi.useFakeTimers()
    await render(<Respira />)
    const figura = () => document.querySelector(".p-respira-figura")
    expect(figura().dataset.fase).toBe("quieta")
    expect(figura().style.getPropertyValue("--p-dur")).toBe("0s")
    await click(button("Empezar"))
    expect(figura().dataset.fase).toBe("inhala")
    expect(figura().style.getPropertyValue("--p-dur")).toBe("4s")
    expect(document.querySelector(".p-respira-numero").textContent).toBe("4")
    await advance(4000)
    expect(figura().dataset.fase).toBe("exhala")
    expect(figura().style.getPropertyValue("--p-dur")).toBe("6s")
    await click(button("Detener"))
    expect(figura().dataset.fase).toBe("quieta")
    expect(figura().style.getPropertyValue("--p-dur")).toBe("0.9s")
    expect(document.querySelector(".p-respira-numero")).toBeNull()
  })
})

describe("V4.10.5: estilo del mapa sin advertencias", () => {
  const filtro = [
    "all",
    ["<=", ["get", "ref_length"], 6],
    ["match", ["get", "network"], ["us-interstate"], true, false],
  ]
  it("pide un número con respaldo en los escudos de carretera y no toca lo demás", () => {
    const otra = { id: "agua", type: "fill", filter: ["==", ["get", "class"], "lake"] }
    const sinFiltro = { id: "fondo", type: "background" }
    const estilo = corregirEstilo({
      version: 8,
      layers: [{ id: "highway-shield-non-us", type: "symbol", filter: filtro }, otra, sinFiltro],
    })
    expect(estilo.layers[0].filter[1]).toEqual(["<=", ["number", ["get", "ref_length"], 99], 6])
    expect(estilo.layers[0].filter[2]).toEqual(filtro[2])
    expect(estilo.layers[1]).toBe(otra)
    expect(estilo.layers[2]).toBe(sinFiltro)
  })
  it("entrega una imagen transparente cuando el estilo pide una que no existe", () => {
    const eventos = {}
    const map = {
      on: (nombre, fn) => (eventos[nombre] = fn),
      hasImage: vi.fn(() => false),
      addImage: vi.fn(),
    }
    completarImagenes(map)
    eventos.styleimagemissing({ id: "wood-pattern" })
    expect(map.addImage).toHaveBeenCalledWith("wood-pattern", {
      width: 1,
      height: 1,
      data: new Uint8Array(4),
    })
  })
})

describe("V4.10.5: fotos de Psicólogo", () => {
  it("cada foto servida tiene su procedencia y su huella", () => {
    const origen = JSON.parse(readFileSync("public/psicologo/medios-origen.json", "utf8"))
    const registradas = origen.medios.flatMap((m) => m.archivos.map((a) => a.archivo))
    for (const archivo of registradas) {
      const ruta = `public${archivo}`
      expect(existsSync(ruta), ruta).toBe(true)
      const huella = origen.medios.flatMap((m) => m.archivos).find((a) => a.archivo === archivo)
      expect(createHash("sha256").update(readFileSync(ruta)).digest("hex"), ruta).toBe(
        huella.sha256,
      )
    }
    const servidas = readdirSync("public/psicologo/fotos").map((f) => `/psicologo/fotos/${f}`)
    expect(servidas.sort()).toEqual([...registradas].sort())
  })

  it("la portada de Neblina ofrece un tamaño intermedio para teléfonos de pantalla densa", async () => {
    localStorage.setItem("demo-psicologo-theme", "neblina")
    await render(
      <MemoryRouter>
        <PsicologoApp />
      </MemoryRouter>,
    )
    const foto = document.querySelector(".psi-neblina .p-portada-foto")
    expect(foto.getAttribute("src")).toBe("/psicologo/fotos/bosque-niebla-1000.webp")
    expect(foto.getAttribute("srcset")).toBe(
      "/psicologo/fotos/bosque-niebla-1000.webp 1000w, /psicologo/fotos/bosque-niebla-1200.webp 1200w, /psicologo/fotos/bosque-niebla-2000.webp 2000w",
    )
    expect(foto.getAttribute("fetchpriority")).toBe("high")
  })
})

describe("V4.10.5: precarga de la foto de portada", () => {
  const precargas = () => [...document.head.querySelectorAll('link[rel="preload"][as="image"]')]
  afterEach(() => precargas().forEach((l) => l.remove()))

  it("al entrar a /psicologo con Neblina pide la misma foto que dibuja el tema", async () => {
    for (const tema of Object.keys(PORTADAS).filter((t) => PORTADAS[t].precargar)) {
      localStorage.setItem("demo-psicologo-theme", tema)
      precargarPortada("/psicologo")
      const [enlace] = precargas()
      const vista = await render(
        <MemoryRouter>
          <PsicologoApp />
        </MemoryRouter>,
      )
      const foto = vista.container.querySelector("img[fetchpriority='high']")
      expect(enlace.getAttribute("imagesrcset"), tema).toBe(foto.getAttribute("srcset"))
      expect(enlace.getAttribute("imagesizes"), tema).toBe(foto.getAttribute("sizes"))
      expect(enlace.getAttribute("fetchpriority")).toBe("high")
      expect(enlace.hasAttribute("href")).toBe(false)
      enlace.remove()
      await vista.unmount()
    }
  })

  it("no pide nada con Sala o Cuaderno ni en las demás rutas", () => {
    expect(Object.keys(PORTADAS).filter((t) => PORTADAS[t].precargar)).toEqual(["neblina"])
    for (const tema of ["sala", "cuaderno"]) {
      localStorage.setItem("demo-psicologo-theme", tema)
      precargarPortada("/psicologo")
    }
    localStorage.setItem("demo-psicologo-theme", "neblina")
    for (const ruta of ["/", "/cotizador", "/restaurante", "/psicologia"]) precargarPortada(ruta)
    expect(precargas()).toHaveLength(0)
  })
})
