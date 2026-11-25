import { describe, expect, it } from "vitest"
import { personaJsonLd, render, SITIO } from "../src/entry-server"
import { DEMOS } from "../src/data/demos"

describe("V4.8.6: portada prerenderizada", () => {
  it("el HTML del servidor trae el CV completo y la lista de demos", () => {
    const html = render()
    expect(html).toContain("Ian Habid Aldana Martínez</h1>")
    for (const id of ["cv-resumen", "cv-proyectos", "cv-experiencia", "cv-educacion"])
      expect(html).toContain(`id="${id}"`)
    for (const d of DEMOS) expect(html).toContain(`href="${d.ruta}"`)
  })

  it("los datos estructurados describen a la persona con los mismos datos del CV", () => {
    const p = personaJsonLd()
    expect(p["@type"]).toBe("Person")
    expect(p.name).toBe("Ian Habid Aldana Martínez")
    expect(p.url).toBe(`${SITIO}/`)
    expect(SITIO).toBe("https://cv-y-portafolio-web.vercel.app")
    expect(p.sameAs).toEqual([
      "https://www.linkedin.com/in/ian-almarti/",
      "https://github.com/NaiCort",
    ])
    expect(p.address.addressLocality).toBe("Xalapa")
    expect(p.knowsLanguage).toEqual(["Español", "Inglés"])
  })
})
