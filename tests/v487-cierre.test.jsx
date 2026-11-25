import { afterEach, describe, expect, it } from "vitest"
import useRouteFocus from "../src/hooks/useRouteFocus"
import { render } from "./helpers"

function Pagina() {
  useRouteFocus()
  return (
    <>
      <a href="#contenido">Saltar al contenido</a>
      <main id="contenido" tabIndex={-1}>
        Contenido
      </main>
    </>
  )
}

describe("V4.8.7: foco al entrar a una página", () => {
  afterEach(() => window.history.replaceState(null, ""))

  it("en la página de entrada no mueve el foco: el teclado empieza en «Saltar al contenido»", async () => {
    window.history.replaceState(null, "")
    await render(<Pagina />)
    expect(document.activeElement).toBe(document.body)
  })

  it("al navegar dentro del sitio lleva el foco al contenido", async () => {
    window.history.replaceState({ usr: null, key: "a1b2c3", idx: 1 }, "")
    await render(<Pagina />)
    expect(document.activeElement?.id).toBe("contenido")
  })
})
