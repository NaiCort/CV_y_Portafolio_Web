import { act } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import Cotizador from "../src/pages/Cotizador"
import { button, click, render } from "./helpers"

const montar = (ruta) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/cotizador" element={<Cotizador />} />
      </Routes>
    </MemoryRouter>,
  )

const casilla = (container, nombre) => {
  const label = [...container.querySelectorAll(".cot-fun label")].find(
    (l) => l.textContent === nombre,
  )
  expect(label, nombre).toBeTruthy()
  return container.querySelector(`#${CSS.escape(label.htmlFor)}`)
}
const total = (container) => container.querySelector(".cot-total-cifra").textContent
const escribir = async (input, valor) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set
  await act(async () => {
    setter.call(input, valor)
    input.dispatchEvent(new Event("input", { bubbles: true }))
  })
}

afterEach(() => vi.restoreAllMocks())

describe("V4.9: cotizador", () => {
  it("sin demo empieza por los cuatro tipos de sitio, con «desde» y «completo»", async () => {
    const { container } = await montar("/cotizador?moneda=MXN")
    expect(container.querySelector("h1").textContent).toBe("Cotiza tu sitio")
    const tipos = [...container.querySelectorAll(".cot-tipo h3")].map((h) => h.textContent)
    expect(tipos).toEqual(["Personalizado", "Landing", "Varias páginas", "Tienda o sistema"])
    expect(container.querySelector(".cot-tipo-precio").textContent).toMatch(/desde/)
    expect(container.querySelectorAll("h1")).toHaveLength(1)
  })

  it("desde una demo precarga su versión recomendada y deja cambiar de versión", async () => {
    const { container } = await montar("/cotizador?demo=psicologo&moneda=MXN")
    expect(container.querySelector("h1").textContent).toBe(
      "Un sitio como la demo Consultorio de psicología",
    )
    expect(casilla(container, "Agenda de citas paso a paso").checked).toBe(true)
    const antes = total(container)
    await click(button("Completa"))
    expect(total(container)).not.toBe(antes)
    expect(button("Completa").getAttribute("aria-pressed")).toBe("true")
  })

  it("lo de núcleo no se puede quitar y dice por qué", async () => {
    const { container } = await montar("/cotizador?demo=psicologo&moneda=MXN")
    const una = casilla(container, "Una sola página con secciones")
    expect(una.disabled).toBe(true)
    expect(container.textContent).toContain("Incluido siempre en una landing")
  })

  it("quitar una función avisa lo que se fue con ella, la tacha en la nota y permite deshacer", async () => {
    const { container } = await montar("/cotizador?demo=psicologo&version=completa&moneda=MXN")
    const antes = total(container)
    await click(casilla(container, "Agenda de citas paso a paso"))
    const aviso = container.querySelector(".cot-aviso").textContent
    expect(aviso).toContain("Quitaste «Agenda de citas paso a paso»")
    expect(aviso).toContain("Recordatorios")
    expect(container.querySelector(".cot-renglones .tachada").textContent).toContain(
      "Agenda de citas",
    )
    expect(total(container)).not.toBe(antes)
    await click(button("Deshacer"))
    expect(total(container)).toBe(antes)
    expect(casilla(container, "Agenda de citas paso a paso").checked).toBe(true)
  })

  it("una función que no cabe pide confirmar el cambio de tipo", async () => {
    const { container } = await montar("/cotizador?demo=psicologo&moneda=MXN")
    await click(casilla(container, "Carrito con precio en tiempo real"))
    const dialogo = document.querySelector("dialog")
    expect(dialogo.textContent).toContain("varias páginas")
    await click(button("Cambiar y añadir", dialogo))
    expect(container.querySelector(".cot-cat.on").textContent).toContain("Varias páginas")
    expect(casilla(container, "Carrito con precio en tiempo real").checked).toBe(true)
    expect(container.querySelector(".cot-aviso").textContent).toContain("Una sola página")
  })

  it("en pesos el total incluye IVA; en dólares dice que es sin impuestos", async () => {
    const { container } = await montar("/cotizador?demo=psicologo&moneda=MXN")
    expect(container.querySelector(".cot-total").textContent).toContain("Total con IVA")
    expect(container.querySelector(".cot-renglones").textContent).toContain("IVA 16 %")
    const usd = [...container.querySelectorAll(".cot-moneda input")].find((i) => i.value === "USD")
    await click(usd)
    expect(container.querySelector(".cot-total").textContent).toContain("Total sin impuestos")
    expect(total(container)).toMatch(/USD$/)
  })

  it("el envío pide el nombre y abre WhatsApp con el folio y el detalle", async () => {
    const abrir = vi.spyOn(window, "open").mockImplementation(() => null)
    const { container } = await montar("/cotizador?demo=ladera&moneda=MXN&paso=envia")
    expect(container.querySelector("h1").textContent).toBe("Revisa y envía")
    await click(button("Enviar por WhatsApp"))
    expect(abrir).not.toHaveBeenCalled()
    expect(container.querySelector(".cot-error").textContent).toMatch(/nombre/)
    await escribir(container.querySelector("#cot-nombre"), "Ana López")
    await click(button("Enviar por WhatsApp"))
    const url = decodeURIComponent(abrir.mock.calls[0][0])
    expect(url).toMatch(/^https:\/\/wa\.me\//)
    expect(url).toMatch(/cotización C-\d{6}-[0-9A-Z]{4}/)
    expect(url).toContain("Ladera")
    expect(url).toContain("Total con IVA")
    expect(url).toContain("Nombre: Ana López")
    expect(url).toContain("/cotizador?demo=ladera")
    expect(container.querySelector(".cot-listo").textContent).toContain("Se abrió WhatsApp")
  })

  it("con empresa, avisa que la propuesta incluirá retenciones y contrato", async () => {
    const { container } = await montar("/cotizador?demo=cotejo&paso=envia")
    const empresa = [...container.querySelectorAll('input[name="factura"]')].find(
      (i) => i.value === "empresa",
    )
    await click(empresa)
    expect(container.textContent).toContain("retenciones")
  })
})
