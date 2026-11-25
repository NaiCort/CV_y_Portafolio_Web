import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import VolverCotizador from "../src/components/shared/VolverCotizador"
import { CLAVE_ORIGEN } from "../src/lib/origenCotizador"
import { render } from "./helpers"

const montar = (ruta) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <VolverCotizador />
    </MemoryRouter>,
  )
const marcar = () =>
  sessionStorage.setItem(
    CLAVE_ORIGEN,
    JSON.stringify({ url: "/cotizador", ruta: "/restaurante", y: 120 }),
  )

afterEach(() => sessionStorage.clear())

describe("V4.9.1: botón flotante «Vuelve al cotizador»", () => {
  it("aparece en la demo a la que se llegó desde el cotizador, también en sus páginas", async () => {
    marcar()
    await montar("/restaurante/carta")
    const boton = document.querySelector(".volver-cot button")
    expect(boton.getAttribute("aria-label")).toBe("Vuelve al cotizador")
    expect(boton.textContent).toContain("Vuelve al cotizador")
  })

  it("no aparece sin la marca (desde el CV o con un enlace directo)", async () => {
    await montar("/restaurante")
    expect(document.querySelector(".volver-cot")).toBeNull()
  })

  it("no aparece en otra demo distinta de la de origen", async () => {
    marcar()
    await montar("/cafe")
    expect(document.querySelector(".volver-cot")).toBeNull()
  })

  it("en el CV la marca se borra", async () => {
    marcar()
    await montar("/")
    expect(sessionStorage.getItem(CLAVE_ORIGEN)).toBeNull()
  })
})
