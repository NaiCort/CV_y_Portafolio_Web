import fs from "node:fs"
import { describe, expect, it } from "vitest"

// V4.10.7: el handbook es uno solo (DEC-033, docs/HANDBOOK.md).
const leer = (ruta) => fs.readFileSync(ruta, "utf8")

describe("V4.10.7: el portafolio apunta al handbook único (DEC-033)", () => {
  it("DEC-033 está aceptada y sustituye a DEC-017", () => {
    const decisiones = leer("docs/DECISIONES.md")
    const dec033 = decisiones.split("\n").find((l) => l.startsWith("| DEC-033 |"))
    expect(dec033).toContain("`NaiCort/Digital-Development-Handbook`")
    expect(dec033).toContain("ACEPTADA")
    const dec017 = decisiones.split("\n").find((l) => l.startsWith("| DEC-017 |"))
    expect(dec017).toContain("SUSTITUIDA por DEC-033")
  })
  it("CLAUDE.md, HANDBOOK.md y el índice de docs nombran el handbook único y su versión", () => {
    for (const ruta of ["CLAUDE.md", "docs/HANDBOOK.md", "docs/README.md"]) {
      const texto = leer(ruta)
      expect(texto, ruta).toContain("NaiCort/Digital-Development-Handbook`")
      expect(texto, ruta).toContain("1.3.0")
    }
  })
  it("ningún documento vigente sigue diciendo que la edición Claude es la adoptada", () => {
    for (const ruta of ["CLAUDE.md", "docs/HANDBOOK.md", "docs/README.md"]) {
      const texto = leer(ruta)
      expect(texto, ruta).not.toContain(
        "`NaiCort/Digital-Development-Handbook-Claude`, versión 1.1.0)",
      )
      expect(texto, ruta).not.toMatch(/-GPT` no se toca/)
    }
  })
})
