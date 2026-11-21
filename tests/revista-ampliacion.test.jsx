import { existsSync } from "node:fs"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { beforeEach, describe, expect, it, vi } from "vitest"
import RevistaApp from "../src/giros/revista/RevistaApp"
import { ARCHIVO, DOSSIERS, fotoUmbral } from "../src/giros/revista/data/umbral"
import { buscar } from "../src/giros/revista/data/prisma"
import {
  alternar,
  leerMarcadores,
  MARCADOR_PREFIJO,
  MARCADORES_KEY,
  reiniciarCache,
} from "../src/giros/revista/lib/marcadores"
import { borrarDatosRevista } from "../src/giros/revista/lib/privacidad"
import { button, click, enter, render } from "./helpers"

const abrir = (ruta) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/revista/*" element={<RevistaApp />} />
      </Routes>
    </MemoryRouter>,
  )
beforeEach(() => {
  localStorage.clear()
  reiniciarCache()
})

describe("Guardados de Revista", () => {
  it("conserva una escritura externa aunque el evento storage no haya llegado", () => {
    alternar("prisma", "andromeda")
    // Otra pestaña escribió su elemento sin modificar el anterior.
    localStorage.setItem(
      `${MARCADOR_PREFIJO}prisma:adn-no-codificante`,
      JSON.stringify({ on: true, at: Date.now() + 1 }),
    )
    alternar("umbral", "entre-lineas")
    expect(leerMarcadores().prisma).toEqual(
      expect.arrayContaining(["andromeda", "adn-no-codificante"]),
    )
    expect(leerMarcadores().umbral).toEqual(["entre-lineas"])
    alternar("prisma", "andromeda")
    expect(leerMarcadores().prisma).toEqual(["adn-no-codificante"])
  })
  it("migra sin duplicar y conserva las bajas aunque el registro antiguo todavía exista", () => {
    localStorage.setItem(MARCADORES_KEY, JSON.stringify({ rubor: [23, 23], prisma: ["andromeda"] }))
    expect(leerMarcadores().rubor).toEqual([23])
    alternar("rubor", 23)
    expect(leerMarcadores().rubor).toEqual([])
    alternar("rubor", 23)
    expect(leerMarcadores().rubor).toEqual([23])
  })
  it("un JSON antiguo dañado no invalida los elementos v2", () => {
    alternar("umbral", "entre-lineas")
    localStorage.setItem(MARCADORES_KEY, "{roto")
    localStorage.setItem(`${MARCADOR_PREFIJO}umbral:otro`, "{roto")
    expect(leerMarcadores().umbral).toEqual(["entre-lineas"])
  })
  it("actualiza el contador de otra pestaña al recibir storage", async () => {
    await abrir("/revista/umbral")
    localStorage.setItem(
      `${MARCADOR_PREFIJO}umbral:entre-lineas`,
      JSON.stringify({ on: true, at: Date.now() }),
    )
    const { act } = await import("react")
    await act(async () =>
      window.dispatchEvent(
        new StorageEvent("storage", { key: `${MARCADOR_PREFIJO}umbral:entre-lineas` }),
      ),
    )
    expect(document.querySelector(".um-cab nav").textContent).toContain("Guardados (1)")
  })
})

describe("Umbral", () => {
  it("todos los dossiers tienen relato completo, proceso y fotografías locales", () => {
    expect(DOSSIERS).toHaveLength(2)
    for (const d of DOSSIERS) {
      expect(d.capitulos.length).toBeGreaterThanOrEqual(3)
      expect(d.proceso.length).toBeGreaterThanOrEqual(4)
      for (const f of [fotoUmbral(d.foto), fotoUmbral(`${d.recorte}-recorte`, 800)])
        expect(existsSync(`public${f}`), f).toBe(true)
    }
  })
  it("la entrada ofrece las tres publicaciones y no una puerta sin destino", async () => {
    await abrir("/revista")
    expect([...document.querySelectorAll(".rv-puerta")].map((a) => a.getAttribute("href"))).toEqual(
      ["/revista/rubor", "/revista/prisma", "/revista/umbral"],
    )
  })
  it("permite alternar entre relato y proceso y guardar el dossier", async () => {
    await abrir("/revista/umbral/dossier/entre-lineas")
    expect(document.querySelector("h1").textContent).toBe("Entre líneas")
    await click(button("Ver proceso"))
    expect(document.querySelector(".um-proceso ol").children).toHaveLength(4)
    await click(button("Leer historia"))
    expect(document.querySelectorAll(".um-lectura .um-pliego")).toHaveLength(3)
    await click(button("Guardar dossier: Entre líneas"))
    expect(leerMarcadores().umbral).toEqual(["entre-lineas"])
    await click(button("Quitar de guardados: Entre líneas"))
    expect(leerMarcadores().umbral).toEqual([])
  })
  it("el proceso apaga capas del cartel y lo separa en 3D", async () => {
    await abrir("/revista/umbral/dossier/otra-perspectiva")
    await click(button("Ver proceso"))
    const cartel = document.querySelector(".um-proceso .um-cartel")
    expect(cartel.hasAttribute("data-despiece")).toBe(true)
    const interruptor = document.querySelector(".um-pasos li:nth-child(2) .um-interruptor")
    await click(interruptor)
    expect(interruptor.getAttribute("aria-pressed")).toBe("false")
    expect(cartel.querySelector('[data-capa="rebanadas"]').hasAttribute("data-oculta")).toBe(true)
    await click(button("Juntar las capas"))
    expect(cartel.hasAttribute("data-despiece")).toBe(false)
    expect(cartel.getAttribute("role")).toBe("img")
  })
  it("los números de archivo tienen su lámina y fotos locales", async () => {
    for (const n of ARCHIVO) expect(existsSync(`public${fotoUmbral(n.foto)}`), n.id).toBe(true)
    await abrir("/revista/umbral/lamina/agua")
    expect(document.querySelector("h1").textContent).toBe("Agua")
    expect(document.querySelector(".um-c-vertical")).toBeTruthy()
  })
  it("filtra disciplinas, ofrece un estado vacío y permite restablecerlo", async () => {
    const anterior = await abrir("/revista/umbral/guardados")
    expect(document.querySelector(".um-indice").textContent).toContain("Aquí aparecerán")
    await anterior.unmount()
    await abrir("/revista/umbral")
    await enter(document.querySelector(".um-indice select"), "Diseño")
    expect(document.querySelectorAll(".um-lista > li")).toHaveLength(1)
    expect(document.querySelector(".um-lista h3").textContent).toBe("Otra perspectiva")
  })
})

describe("Búsqueda, privacidad y créditos", () => {
  it("permite acceder a todos los resultados anunciados y muestra el vacío", async () => {
    await abrir("/revista/prisma")
    await click(document.querySelector(".pr-busca"))
    await enter(document.querySelector("#pr-q"), "a")
    expect(document.querySelectorAll(".pr-buscar-lista a")).toHaveLength(buscar("a").length)
    await enter(document.querySelector("#pr-q"), "zzzzz")
    expect(document.querySelector("dialog").textContent).toContain("No hay coincidencias")
  })
  it("borra datos y estado visible sin tocar otras demos", async () => {
    localStorage.setItem("brio-reservas-v1", "conservar")
    alternar("umbral", "entre-lineas")
    localStorage.setItem("revista-comentarios-v1", JSON.stringify({ ejemplo: [] }))
    await abrir("/revista/umbral/guardados")
    expect(document.querySelectorAll(".um-lista > li")).toHaveLength(1)
    await click(button("Privacidad y datos de Revista"))
    await click(button("Borrar los datos de Revista"))
    expect(document.querySelectorAll(".um-lista > li")).toHaveLength(0)
    expect(localStorage.getItem("revista-comentarios-v1")).toBeNull()
    expect(localStorage.getItem("brio-reservas-v1")).toBe("conservar")
    expect(document.querySelector(".rv-utilidades [role=status]").textContent).toContain(
      "Se borraron",
    )
  })
  it("informa si el navegador no permite borrar el almacenamiento", () => {
    localStorage.setItem("revista-comentarios-v1", "{}")
    const spy = vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("bloqueado")
    })
    expect(borrarDatosRevista()).toBe(false)
    spy.mockRestore()
  })
  it("créditos identifica fuentes locales y las imágenes ilustrativas", async () => {
    await abrir("/revista/umbral/creditos")
    expect(document.querySelector("h1").textContent).toBe("Créditos de Umbral")
    expect(document.querySelector("main").textContent).toContain("ficticios")
    expect(document.querySelectorAll('a[href^="/revista/fuentes/LICENSE-"]')).toHaveLength(5)
    expect(document.querySelector('a[href="/revista/audio/LICENCIA.txt"]').textContent).toContain(
      "CC BY",
    )
  })
})
