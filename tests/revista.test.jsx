import { existsSync, readFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import RevistaApp from "../src/giros/revista/RevistaApp"
import { ACTUAL, NUMEROS, PALETAS, foto as fotoRubor } from "../src/giros/revista/data/rubor"
import {
  ARTICULOS,
  AUTORES,
  buscar,
  findAutor,
  foto as fotoPrisma,
  populares,
} from "../src/giros/revista/data/prisma"
import {
  MARCADORES_KEY,
  alternar,
  leerMarcadores,
  reiniciarCache,
} from "../src/giros/revista/lib/marcadores"
import { agregar, leerComentarios, quitar } from "../src/giros/revista/lib/comentarios"
import { advance, button, click, enter, render } from "./helpers"

const renderRevista = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/revista/*" element={<RevistaApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (s) => document.querySelector(s)
const $$ = (s) => [...document.querySelectorAll(s)]
const publico = (url) => `public${url}`

beforeEach(() => {
  localStorage.clear()
  reiniciarCache()
})
afterEach(() => vi.useRealTimers())

describe("Datos", () => {
  it("Rubor tiene 24 números, del más reciente al primero, y dos completos", () => {
    expect(NUMEROS).toHaveLength(24)
    expect(NUMEROS.map((x) => x.n)).toEqual(Array.from({ length: 24 }, (_, i) => 24 - i))
    expect(NUMEROS.filter((x) => x.completo).map((x) => x.n)).toEqual([24, 23])
    expect(ACTUAL.n).toBe(24)
    for (const x of NUMEROS) {
      expect(PALETAS[x.paleta], `paleta del N.º ${x.n}`).toBeTruthy()
      expect(existsSync(publico(fotoRubor(x.foto, 600))), `foto del N.º ${x.n}`).toBe(true)
    }
    expect(PALETAS[NUMEROS[0].paleta]).not.toBe(PALETAS[NUMEROS[1].paleta])
  })

  it("Prisma tiene 24 investigaciones con autores existentes y fotos servidas desde el sitio", () => {
    expect(ARTICULOS).toHaveLength(24)
    expect(new Set(ARTICULOS.map((a) => a.id)).size).toBe(24)
    expect(ARTICULOS.filter((a) => a.completo).map((a) => a.n)).toEqual([24, 23])
    for (const a of ARTICULOS) {
      for (const id of a.autores) expect(findAutor(id), `${a.id}: ${id}`).toBeTruthy()
      expect(existsSync(publico(fotoPrisma(a.foto, 480))), a.id).toBe(true)
    }
    expect(AUTORES.every((x) => x.institucion.includes("ficticio"))).toBe(true)
  })

  it("las fotos coinciden con su procedencia registrada", () => {
    const origen = JSON.parse(readFileSync("public/revista/medios-origen.json", "utf8"))
    expect(origen.length).toBeGreaterThan(100)
    for (const m of origen.slice(0, 20)) {
      const ruta = publico(m.archivo)
      expect(createHash("sha256").update(readFileSync(ruta)).digest("hex"), ruta).toBe(m.sha256)
    }
  })

  it("populares cambian con el periodo y la búsqueda ignora acentos", () => {
    expect(populares("semana").map((a) => a.id)).not.toEqual(populares("siempre").map((a) => a.id))
    expect(buscar("genetica").every((a) => a.area === "genetica")).toBe(true)
    expect(buscar("Arrieta").map((a) => a.id)).toContain("andromeda")
    expect(buscar("   ")).toEqual([])
  })
})

describe("Marcadores y comentarios guardados", () => {
  it("alterna y valida lo guardado", () => {
    alternar("rubor", 23)
    alternar("prisma", "andromeda")
    alternar("rubor", 12)
    expect(leerMarcadores()).toEqual({ rubor: [12, 23], prisma: ["andromeda"] })
    alternar("rubor", 23)
    expect(leerMarcadores().rubor).toEqual([12])
    localStorage.setItem(MARCADORES_KEY, JSON.stringify({ rubor: ["x", 4], prisma: [3, "ok"] }))
    expect(leerMarcadores()).toEqual({ rubor: [4], prisma: ["ok"] })
    localStorage.setItem(MARCADORES_KEY, "{roto")
    expect(leerMarcadores()).toEqual({ rubor: [], prisma: [] })
  })

  it("agrega y quita comentarios propios", () => {
    let d = agregar({}, "rubor-24", "  Me encantó  ", 1)
    expect(d["rubor-24"]).toEqual([{ id: "c1", texto: "Me encantó", fecha: 1 }])
    expect(agregar(d, "rubor-24", "   ")).toBe(d)
    d = quitar(d, "rubor-24", "c1")
    expect(d["rubor-24"]).toEqual([])
    expect(leerComentarios({ getItem: () => "{malo" })).toEqual({})
  })
})

describe("Entrada", () => {
  it("lleva a las dos revistas y la Bienvenida la enlaza", async () => {
    await renderRevista("/revista")
    expect($$("h1")).toHaveLength(1)
    const destinos = $$(".rv-puerta").map((a) => a.getAttribute("href"))
    expect(destinos).toEqual(["/revista/rubor", "/revista/prisma"])
    const { default: Bienvenida } = await import("../src/pages/Bienvenida")
    await render(
      <MemoryRouter>
        <Bienvenida />
      </MemoryRouter>,
    )
    const enlace = $$("a").find((a) => a.textContent.includes("Revista digital"))
    expect(enlace.getAttribute("href")).toBe("/revista")
  })

  it("las dos revistas tienen un botón para volver a elegir", async () => {
    for (const ruta of ["/revista/rubor", "/revista/prisma"]) {
      const { unmount } = await renderRevista(ruta)
      const volver = $('header a[aria-label="Volver a elegir revista"]')
      expect(volver.getAttribute("href"), ruta).toBe("/revista")
      await unmount()
    }
  })
})

describe("Rubor", () => {
  it("la portada es siempre el número más reciente, completo y con su paleta", async () => {
    await renderRevista("/revista/rubor")
    expect($$("h1")).toHaveLength(1)
    expect($("h1").textContent).toContain("N.º 24")
    expect($(".rb-root").style.getPropertyValue("--rb-acento")).toBe(PALETAS.rojo.acento)
    for (const id of ["sumario", "carta", "entrevista", "anuncio", "reportaje", "comentarios"])
      expect(document.getElementById(id), id).toBeTruthy()
    expect($(".rb-pie-foto").textContent).toContain("personaje ficticio")
    expect($(".rb-anuncio-et").textContent).toContain("ficticio")
  })

  it("el menú de números lista los 24 por fecha y cada número cambia la paleta", async () => {
    await renderRevista("/revista/rubor")
    const b = button("Números ▾")
    expect(b.getAttribute("aria-expanded")).toBe("false")
    await click(b)
    const enlaces = $$("#rb-numeros a")
    expect(enlaces).toHaveLength(24)
    expect(enlaces[0].getAttribute("href")).toBe("/revista/rubor")
    expect(enlaces[1].getAttribute("href")).toBe("/revista/rubor/numero/23")
    await click(enlaces[1])
    expect($("#rb-numeros")).toBeNull()
    expect($("h1").textContent).toContain("N.º 23")
    expect($(".rb-root").style.getPropertyValue("--rb-acento")).toBe(PALETAS.azul.acento)
  })

  it("un número de archivo muestra su portada y lo dice", async () => {
    await renderRevista("/revista/rubor/numero/12")
    expect($(".rb-archivo").textContent).toContain("solo el N.º 24 y el N.º 23")
    expect($(".rb-recorte")).toBeNull()
    await renderRevista("/revista/rubor/numero/99")
    expect($$("h1").at(-1).textContent).toContain("N.º 24")
  })

  it("guarda el número en marcadores y se puede quitar desde la cuenta", async () => {
    await renderRevista("/revista/rubor/numero/23")
    await click(button("☆ Guardar número"))
    expect(button("★ Guardado en marcadores").getAttribute("aria-pressed")).toBe("true")
    expect(JSON.parse(localStorage.getItem(MARCADORES_KEY)).rubor).toEqual([23])
    await renderRevista("/revista/rubor/marcadores")
    const cuenta = $$(".rb-cuenta").at(-1)
    expect(cuenta.textContent).toContain("Ana Ruiz")
    expect(cuenta.querySelectorAll(".rb-rejilla-num li")).toHaveLength(1)
    await click(button("Quitar el N.º 23 de marcadores", cuenta))
    expect(cuenta.textContent).toContain("Todavía no guardas")
  })

  it("publica un comentario con espera, lo guarda y lo borra", async () => {
    vi.useFakeTimers()
    await renderRevista("/revista/rubor")
    const caja = $(".rb-comentarios")
    const enviar = button("Publicar comentario", caja)
    expect(enviar.disabled).toBe(true)
    await enter(caja.querySelector("textarea"), "Gran número")
    await click(enviar)
    expect(enviar.textContent).toBe("Publicando…")
    await advance(600)
    expect(caja.querySelector(".rb-com-propio").textContent).toContain("Gran número")
    expect(JSON.parse(localStorage.getItem("revista-comentarios-v1"))["rubor-24"]).toHaveLength(1)
    await click(button("Borrar mi comentario", caja))
    expect(caja.querySelector(".rb-com-propio")).toBeNull()
    await click(button("Reportar", caja))
    expect(button("Reportado", caja).disabled).toBe(true)
  })
})

describe("Prisma", () => {
  it("elegir un número cambia el panel, su color y su imagen desvanecida", async () => {
    await renderRevista("/revista/prisma")
    expect($$("h1")).toHaveLength(1)
    expect($$(".pr-fila .pr-num")).toHaveLength(24)
    expect($(".pr-sel h2").textContent).toBe(ARTICULOS[0].titulo)
    const otro = ARTICULOS[3]
    await click(button(`N.º ${otro.n}: ${otro.titulo}`))
    expect($(".pr-sel h2").textContent).toBe(otro.titulo)
    expect($(".pr-selbg").style.getPropertyValue("--c")).toBe(otro.color)
    expect($$(".pr-sel .pr-autores a")[0].getAttribute("href")).toBe(
      `/revista/prisma/autor/${otro.autores[0]}`,
    )
    expect($(".pr-sel a.pr-bt-p").getAttribute("href")).toBe(`/revista/prisma/articulo/${otro.id}`)
  })

  it("guarda, avisa del PDF y cambia el periodo de populares", async () => {
    await renderRevista("/revista/prisma")
    await click(button("☆ Guardar", $(".pr-sel")))
    expect(JSON.parse(localStorage.getItem(MARCADORES_KEY)).prisma).toEqual(["andromeda"])
    expect($(".pr-cab").textContent).toContain("Marcadores (1)")
    const pdf = $$(".pr-sel a").find((a) => a.textContent.includes("Descargar PDF"))
    expect(pdf.getAttribute("href")).toBe("/revista/prisma/pdf/prisma-24-andromeda.pdf")
    expect(pdf.hasAttribute("download")).toBe(true)
    expect(existsSync(publico(pdf.getAttribute("href")))).toBe(true)
    const antes = $$(".pr-pop li a").map((a) => a.textContent)
    await click(button("Siempre"))
    expect(button("Siempre").getAttribute("aria-pressed")).toBe("true")
    expect($$(".pr-pop li a").map((a) => a.textContent)).not.toEqual(antes)
  })

  it("lee completo el N.º 24: índice, figuras con datos, cita y comentarios", async () => {
    await renderRevista("/revista/prisma/articulo/andromeda")
    expect($$("h1")).toHaveLength(1)
    const indice = $$('nav[aria-label="En este artículo"] a').map((a) => a.getAttribute("href"))
    for (const destino of indice)
      expect(document.getElementById(destino.slice(1)), destino).toBeTruthy()
    expect($$(".pr-fig svg[role=img]")).toHaveLength(2)
    expect($$(".pr-fig-datos table")).toHaveLength(2)
    expect($(".pr-citar").textContent).toContain("Arrieta, L., Ibarra, T. y Montes, R. (2026)")
    await click(button("Texto grande"))
    expect($(".pr-hoja").classList.contains("pr-hoja-g")).toBe(true)
    expect($$(".pr-com-av").map((x) => x.textContent)).toEqual(["MU", "LA", "CA"])
  })

  it("un número de archivo solo muestra su resumen y avisa del PDF", async () => {
    await renderRevista("/revista/prisma/articulo/cometa")
    expect($(".pr-hoja")).toBeNull()
    await click(button("↓ Descargar PDF"))
    expect($(".pr-aviso").textContent).toContain("Solo los números 24 y 23")
  })

  it("busca con Ctrl K por autor", async () => {
    await renderRevista("/revista/prisma")
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }))
    await click(document.body)
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))
    await enter(await vi.waitFor(() => document.getElementById("pr-q")), "Solano")
    const res = $$(".pr-buscar-lista a")
    expect(res.length).toBeGreaterThan(0)
    expect(res[0].getAttribute("href")).toBe("/revista/prisma/articulo/adn-no-codificante")
  })

  it("perfil de autor y ficha de investigación", async () => {
    await renderRevista("/revista/prisma/autor/lucia-arrieta")
    expect($("h1").textContent).toBe("Lucía Arrieta")
    expect($(".pr-lista a").getAttribute("href")).toBe("/revista/prisma/articulo/andromeda")
    await renderRevista("/revista/prisma/articulo/cometa")
    expect($$(".pr-art h1").at(-1).textContent).toBe("Un cometa visto desde el desierto")
    expect($$(".pr-nota").at(-1).textContent).toContain("Entrada de archivo")
  })
})
