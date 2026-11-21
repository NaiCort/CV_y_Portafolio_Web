import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import { DEMOS, ESTADOS, demoPorId } from "../src/data/demos"
import Bienvenida from "../src/pages/Bienvenida"
import ComercialCTA from "../src/components/shared/ComercialCTA"
import DemoBanner from "../src/components/shared/DemoBanner"
import WaterMark from "../src/components/WaterMark"
import FloatingTimer from "../src/giros/restaurante/components/FloatingTimer"
import RestaurantProvider from "../src/giros/restaurante/state/RestaurantProvider"
import {
  createVisit,
  serializeState,
  initialState,
  STORAGE_KEY,
} from "../src/giros/restaurante/state/model"
import { render } from "./helpers"

describe("V4.8.0: catálogo de demos", () => {
  it("cada demo y variante tiene un identificador único y un estado válido", () => {
    const ids = DEMOS.flatMap((d) => [d.id, ...d.variantes.map((v) => v.id)])
    expect(new Set(ids).size).toBe(ids.length)
    for (const d of DEMOS) {
      expect(Object.keys(ESTADOS)).toContain(d.estado)
      expect(d.ruta).toMatch(/^\//)
      expect(d.funciones.length).toBeGreaterThan(0)
    }
    expect(demoPorId("umbral").id).toBe("revista")
    expect(demoPorId("no-existe")).toBeNull()
  })

  it("la portada lista todas las demos del catálogo", async () => {
    const { container } = await render(
      <MemoryRouter>
        <Bienvenida />
      </MemoryRouter>,
    )
    for (const d of DEMOS) {
      expect(container.querySelector(`a[href="${d.ruta}"]`), d.id).toBeTruthy()
    }
  })
})

describe("V4.8.0: componentes compartidos", () => {
  it("la llamada comercial usa un h2 y no lleva etiqueta sobre el título", async () => {
    const { container } = await render(
      <ComercialCTA backgroundColor="#111" accentColor="#e2574c" />,
    )
    expect(container.querySelector("h2").textContent).toMatch(/sitio así/)
    expect(container.querySelector("h3")).toBeNull()
    expect(container.textContent).not.toMatch(/Sobre esta demo/)
  })

  it("el banner y la autoría son regiones con nombre", async () => {
    const { container } = await render(
      <MemoryRouter>
        <DemoBanner />
        <WaterMark />
      </MemoryRouter>,
    )
    const regiones = [...container.querySelectorAll("aside")].map((a) =>
      a.getAttribute("aria-label"),
    )
    expect(regiones).toEqual(["Aviso de demo", "Autoría de la demo"])
    expect(container.querySelector('aside a[href="/"]')).toBeTruthy()
  })
})

describe("V4.8.0: contador del restaurante", () => {
  afterEach(() => localStorage.clear())
  const sembrar = () => {
    const state = initialState()
    state.visit = createVisit("dine", 2, Date.now())
    localStorage.setItem(STORAGE_KEY, serializeState(state))
  }
  const montar = (ruta) =>
    render(
      <MemoryRouter initialEntries={[ruta]}>
        <RestaurantProvider>
          <FloatingTimer />
        </RestaurantProvider>
      </MemoryRouter>,
    )

  it("se muestra dentro del restaurante", async () => {
    sembrar()
    await montar("/restaurante/carta")
    expect(document.body.textContent).toMatch(/Espera de mesa/)
  })

  it("no se muestra fuera del restaurante, pero conserva la visita", async () => {
    sembrar()
    await montar("/gimnasio")
    expect(document.body.textContent).not.toMatch(/Espera de mesa/)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).visit).toBeTruthy()
  })
})
