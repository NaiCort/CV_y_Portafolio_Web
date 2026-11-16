import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { PLANES } from "../src/giros/gimnasio/data/planes"
import { RESERVAS_KEY } from "../src/giros/gimnasio/lib/reservas"
import { advance, button, click, enter, render } from "./helpers"

const renderBrio = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/gimnasio/*" element={<GimnasioApp />} />
      </Routes>
    </MemoryRouter>,
  )
const continuar = () => click(button("Continuar"))

describe("Página de Planes", () => {
  it("compara los tres planes y cada uno lleva al alta con su plan", async () => {
    await renderBrio("/gimnasio/planes")
    expect(document.querySelector("h1").textContent).toBe("Planes")
    expect(document.title).toContain("Planes")
    for (const p of PLANES) {
      const enlaces = [...document.querySelectorAll(`a[href="/gimnasio/alta?plan=${p.id}"]`)]
      expect(enlaces.length, p.id).toBe(2)
    }
    expect(document.querySelectorAll(".b-preguntas details")).toHaveLength(9)
    expect(document.querySelector(".b-sin-cobros").textContent).toContain("mantenimiento anual")
    expect(document.body.textContent).toContain("¿Qué pasa si cierra una sucursal?")
    // Opiniones de ejemplo, declaradas como inventadas y sin calificaciones.
    expect(document.querySelectorAll(".b-opiniones blockquote")).toHaveLength(4)
    expect(document.querySelector(".b-opiniones").textContent).toContain("inventados")
    expect(document.querySelector(".b-opiniones").textContent).not.toMatch(/★|kilos|kg/)
    expect(document.querySelector('a[href="/gimnasio/clases?prueba=1"]')).toBeTruthy()
  })
})

describe("Alta en cinco pasos", () => {
  it("marca el plan de la dirección, valida, pide firma y confirma sin guardar nada", async () => {
    vi.useFakeTimers()
    await renderBrio("/gimnasio/alta?plan=total")
    expect(document.querySelector('input[name="plan"]:checked').value).toBe("total")
    await continuar()
    expect(document.querySelector(".b-paso-texto").textContent).toContain("Paso 2 de 5")
    await continuar()
    expect(document.querySelectorAll(".b-error")).toHaveLength(3)
    expect(document.activeElement.id).toBe("b-alta-nombre")
    await enter(document.querySelector("#b-alta-nombre"), "Ana López")
    await enter(document.querySelector("#b-alta-correo"), "ana@ejemplo")
    await enter(document.querySelector("#b-alta-telefono"), "228 123 4567")
    await continuar()
    expect(document.activeElement.id).toBe("b-alta-correo")
    await enter(document.querySelector("#b-alta-correo"), "ana@ejemplo.com")
    await continuar()
    expect(document.body.textContent).toContain("Esta demo no pide datos de salud")
    expect(document.querySelectorAll("form input").length).toBe(0)
    await click(button("Entendido, continuar"))
    await click(document.querySelector("#b-alta-acepta"))
    await enter(document.querySelector("#b-alta-firma"), "Otra Persona")
    await continuar()
    expect(document.querySelector(".b-error").textContent).toContain("Ana López")
    // Sin mayúsculas ni tildes también vale.
    await enter(document.querySelector("#b-alta-firma"), "ana lopez")
    await continuar()
    expect(document.querySelector(".b-alta-total").textContent).toContain("$1,490")
    await click(button("Confirmar alta"))
    expect(document.body.textContent).toContain("Dando de alta")
    await advance(900)
    expect(document.querySelector("h1").textContent).toBe("Ya eres parte de Brío")
    expect(document.querySelector(".b-reserva-codigo").textContent).toMatch(/^BRIO-\d{6}$/)
    const guardado = JSON.stringify({ ...localStorage })
    expect(guardado).not.toContain("ana@ejemplo.com")
    expect(guardado).not.toContain("López")
  })

  it("permite volver al paso anterior sin perder lo escrito", async () => {
    await renderBrio("/gimnasio/alta")
    await continuar()
    await enter(document.querySelector("#b-alta-nombre"), "Luis")
    await click(button("Atrás"))
    await continuar()
    expect(document.querySelector("#b-alta-nombre").value).toBe("Luis")
  })
})

describe("Clase de prueba gratis", () => {
  it("marca la reserva como prueba y no deja apartar otra", async () => {
    vi.useFakeTimers()
    await renderBrio("/gimnasio/clases?prueba=1")
    expect(document.querySelector(".b-modo-prueba").textContent).toContain("Elige tu clase")
    await click(document.querySelectorAll(".b-chips")[0].querySelectorAll("input")[1])
    await click(document.querySelector(".b-sesiones .b-btn-p"))
    const dialogo = document.querySelector("dialog[open]")
    expect(dialogo.querySelector("h2").textContent).toMatch(/^Clase de prueba: /)
    const libre = dialogo.querySelector(".b-lugares-rejilla input:not(:disabled)")
    if (libre) await click(libre)
    await enter(dialogo.querySelector('input[name="nombre"]'), "Ana")
    await click(dialogo.querySelector('button[type="submit"]'))
    await advance(800)
    await click(button("Cerrar"))
    expect(JSON.parse(localStorage.getItem(RESERVAS_KEY)).reservas[0].prueba).toBe(true)
    expect(document.querySelector(".b-modo-prueba").textContent).toContain("Ya apartaste")
    expect(document.querySelector(".b-prueba-etiqueta").textContent).toBe("Clase de prueba")
  })
})
