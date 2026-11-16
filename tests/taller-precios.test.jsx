import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import TallerApp from "../src/giros/taller/TallerApp"
import { TALLERES } from "../src/giros/taller/data/talleres"
import { LISTAS, REGLAS } from "../src/giros/taller/data/precios"
import { QUE_REVISAMOS, REPORTE_EJEMPLO } from "../src/giros/taller/data/usados"
import { TEMA_KEY } from "../src/giros/taller/lib/tema"
import { button, click, render } from "./helpers"

const renderTaller = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/taller/*" element={<TallerApp />} />
      </Routes>
    </MemoryRouter>,
  )
const $ = (sel) => document.querySelector(sel)
const casilla = (texto) =>
  [...document.querySelectorAll(".t-precio-elegir")]
    .find((l) => l.textContent.includes(texto))
    .querySelector("input")
afterEach(() => localStorage.clear())

describe("Lista de precios", () => {
  it("incluye en la lista completa cada servicio de la portada, con el mismo precio", () => {
    for (const t of Object.values(TALLERES)) {
      const todos = LISTAS[t.id].flatMap((c) => c.servicios)
      for (const s of t.servicios.filter((x) => x.precio > 0)) {
        const igual = todos.find(([, , precio]) => precio === s.precio)
        expect(igual, `${t.id} ${s.id}`).toBeTruthy()
      }
      expect(new Set(todos.map(([n]) => n)).size, t.id).toBe(todos.length)
    }
    expect(REGLAS.join(" ")).toContain("20 %")
  })

  it("suma los servicios marcados y se limpia", async () => {
    await renderTaller("/taller/precios")
    expect($("h1").textContent).toBe("Lista de precios")
    expect($(".t-suma-total").textContent).toBe("$0")
    await click(casilla("Cambio de aceite y filtro"))
    await click(casilla("Balatas delanteras"))
    expect($(".t-suma-total").textContent).toBe("$1,730")
    expect($(".t-suma").textContent).toContain("2 servicios")
    await click(casilla("Balatas delanteras"))
    expect($(".t-suma-total").textContent).toBe("$780")
    await click(button("Limpiar la suma"))
    expect($(".t-suma-total").textContent).toBe("$0")
    // Lo que no tiene costo no se puede sumar.
    const sinCosto = [...document.querySelectorAll(".t-lista-precios li")].find((li) =>
      li.textContent.includes("Revisión de suspensión"),
    )
    expect(sinCosto.querySelector("input")).toBeNull()
  })

  it("cada taller muestra su lista y sus formas de pago", async () => {
    localStorage.setItem(TEMA_KEY, "vertice")
    await renderTaller("/taller/precios")
    expect(document.body.textContent).toContain("Híbridos (sucursal Arco Sur)")
    expect(document.body.textContent).toContain("meses sin intereses")
    expect(document.body.textContent).not.toContain("Revisión antes de comprar un usado")
  })

  it("la portada enlaza a la lista completa", async () => {
    await renderTaller("/taller")
    const enlace = [...document.querySelectorAll("#precios a")].find(
      (a) => a.textContent === "Ver la lista completa",
    )
    expect(enlace.getAttribute("href")).toBe("/taller/precios")
  })
})

describe("Revisión antes de comprar un usado", () => {
  it("el reporte de ejemplo cubre cada categoría que se revisa", () => {
    expect(REPORTE_EJEMPLO.categorias.map((c) => c.id)).toEqual(QUE_REVISAMOS.map((c) => c.id))
    const reparar = REPORTE_EJEMPLO.categorias.reduce((n, c) => n + c.costo, 0)
    expect(reparar).toBe(7600)
  })

  it("muestra precio fijo, qué se revisa y el reporte desplegable en Rosales", async () => {
    await renderTaller("/taller/usados")
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    expect($(".t-usados-precio").textContent).toContain("$600")
    expect($(".t-usados-precio a").getAttribute("href")).toBe("/taller/cita?servicio=usados")
    expect(document.querySelectorAll(".t-revisamos h3")).toHaveLength(5)
    const boton = (texto) =>
      [...document.querySelectorAll(".t-reporte-lista button")].find((b) =>
        b.textContent.includes(texto),
      )
    expect(boton("Frenos").getAttribute("aria-expanded")).toBe("true")
    await click(boton("Papeles"))
    expect(boton("Papeles").getAttribute("aria-expanded")).toBe("true")
    expect(boton("Frenos").getAttribute("aria-expanded")).toBe("false")
    expect($("#t-rep-papeles").hidden).toBe(false)
    expect($(".t-reporte-total").textContent).toContain("$7,600")
  })

  it("en Vértice explica que es de Rosales y ofrece cambiar", async () => {
    localStorage.setItem(TEMA_KEY, "vertice")
    await renderTaller("/taller/usados")
    expect($(".t-solo-en").textContent).toContain("Mecánica Rosales")
    expect($(".t-reporte")).toBeNull()
    await click(button("Ver Mecánica Rosales"))
    expect($(".t-reporte")).toBeTruthy()
    expect(localStorage.getItem(TEMA_KEY)).toBe("rosales")
  })

  it("la cita llega con la revisión de usados elegida", async () => {
    await renderTaller("/taller/cita?servicio=usados")
    const elegido = [...document.querySelectorAll('input[name="servicio"]')].find((i) => i.checked)
    expect(elegido.closest("label").textContent).toContain("Revisión antes de comprar un usado")
  })
})

describe("Bienvenida", () => {
  it("enlaza el taller mecánico en el directorio de giros", async () => {
    const { default: Bienvenida } = await import("../src/pages/Bienvenida")
    await render(
      <MemoryRouter>
        <Bienvenida />
      </MemoryRouter>,
    )
    const enlace = [...document.querySelectorAll("a")].find((a) =>
      a.textContent.includes("Taller mecánico"),
    )
    expect(enlace.getAttribute("href")).toBe("/taller")
  })
})
