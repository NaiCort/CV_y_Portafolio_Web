import fs from "node:fs"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import Privacidad from "../src/pages/Privacidad"
import Bienvenida from "../src/pages/Bienvenida"
import { render } from "./helpers"

// V4.10.3: adopción del Digital Development Handbook (docs/HANDBOOK.md).
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"))
const encabezados = Object.fromEntries(
  vercel.headers.find((h) => h.source === "/(.*)").headers.map((h) => [h.key, h.value]),
)

describe("V4.10.3: seguridad (G4, docs/SEGURIDAD.md)", () => {
  it("envía los encabezados básicos en todas las rutas", () => {
    expect(encabezados["X-Content-Type-Options"]).toBe("nosniff")
    expect(encabezados["X-Frame-Options"]).toBe("DENY")
    expect(encabezados["Referrer-Policy"]).toBe("strict-origin-when-cross-origin")
    expect(encabezados["Permissions-Policy"]).toContain("camera=()")
    // Patio 12 usa la ubicación para el local más cercano.
    expect(encabezados["Permissions-Policy"]).toContain("geolocation=(self)")
    expect(encabezados["Content-Security-Policy"]).toContain("frame-ancestors 'none'")
  })
  it("la política de contenido no permite scripts en línea ni eval", () => {
    const csp = encabezados["Content-Security-Policy-Report-Only"]
    const scripts = csp.split(";").find((d) => d.trim().startsWith("script-src"))
    expect(scripts.trim()).toBe("script-src 'self'")
    expect(csp).not.toContain("unsafe-eval")
    // Los únicos orígenes externos son los mapas de OpenFreeMap.
    const externos = [...new Set(csp.match(/https:\/\/[^\s;]+/g))]
    expect(externos).toEqual(["https://tiles.openfreemap.org"])
  })
  it("los archivos con huella en /assets se guardan un año", () => {
    const assets = vercel.headers.find((h) => h.source === "/assets/(.*)").headers[0]
    expect(assets.value).toBe("public, max-age=31536000, immutable")
  })
})

describe("V4.10.3: aviso de privacidad del sitio (GEN-008)", () => {
  it("dice quién es responsable, qué datos recibe, para qué y cómo ejercer los derechos", async () => {
    await render(
      <MemoryRouter>
        <Privacidad />
      </MemoryRouter>,
    )
    expect(document.querySelectorAll("h1").length).toBe(1)
    expect(document.title).toContain("Aviso de privacidad")
    const texto = document.querySelector("main").textContent
    for (const parte of ["Ian Habid Aldana Martínez", "cotizador", "ARCO", "20 días hábiles"])
      expect(texto).toContain(parte)
    expect(texto).toContain("No uso cookies de seguimiento ni herramientas de analítica")
    expect(document.querySelector('a[href^="mailto:"]')).not.toBeNull()
  })
  it("el CV enlaza el aviso", async () => {
    await render(
      <MemoryRouter>
        <Bienvenida />
      </MemoryRouter>,
    )
    expect(document.querySelector('a[href="/privacidad"]').textContent).toBe("Aviso de privacidad")
  })
})
