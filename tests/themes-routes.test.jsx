import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"
import PsicologoApp from "../src/giros/psicologo/PsicologoApp"
import App from "../src/App"
import { button, click, render } from "./helpers"

const montar = (tema) => {
  if (tema) localStorage.setItem("demo-psicologo-theme", tema)
  return render(
    <MemoryRouter>
      <PsicologoApp />
    </MemoryRouter>,
  )
}

describe("Psicólogo, tres temas (V4.10.2)", () => {
  it.each([
    ["sala", "Sala con luz"],
    ["neblina", "Neblina"],
    ["cuaderno", "Cuaderno"],
  ])("%s tiene un h1, la misma estructura y el cotizador con su identificador", async (tema) => {
    await montar(tema)
    expect(document.querySelector(`.psi-${tema}`)).not.toBeNull()
    expect(document.querySelectorAll("h1").length).toBe(1)
    expect(document.querySelectorAll("main").length).toBe(1)
    expect(document.querySelectorAll('a[href="#"]').length).toBe(0)
    for (const id of [
      "inicio",
      "te-suena",
      "como-trabajo",
      "sobre-mi",
      "honorarios",
      "primera-sesion",
      "instituciones",
      "recursos",
      "preguntas",
      "contacto",
    ])
      expect(document.getElementById(id), id).not.toBeNull()
    expect(document.body.textContent).toContain("650 MXN")
    expect(document.body.textContent).toContain("Cédula profesional 0000000")
    expect(document.querySelector('.p-crisis a[href="tel:8009112000"]')).not.toBeNull()
    expect(document.querySelector('a[href^="/cotizador"]').getAttribute("href")).toBe(
      `/cotizador?demo=psicologo-${tema}`,
    )
    // Sin texto libre en el contacto: nadie escribe ahí su motivo de consulta.
    expect(document.querySelectorAll("#contacto textarea").length).toBe(0)
    // Fotos servidas desde el sitio.
    for (const img of document.querySelectorAll(".psi img"))
      expect(img.getAttribute("src")).toMatch(/^\/psicologo\/fotos\//)
  })

  it("abre la agenda en la llamada previa y la reseña pública sin opiniones inventadas", async () => {
    await montar("sala")
    await click(button("Agenda una llamada de 15 minutos", document.getElementById("inicio")))
    expect(document.querySelector("dialog").textContent).toContain("Agenda: Llamada previa")
    await click(button("Cerrar ventana"))
    await click(button("Ver opiniones en el perfil público"))
    expect(document.querySelector("dialog").textContent).toContain(
      "no muestra opiniones inventadas",
    )
    await click(button("Cerrar ventana"))
    await click(button("Aviso de privacidad"))
    expect(document.querySelector("dialog").textContent).toContain("ARCO")
  })

  it("«Pedir información» elige el tema del contacto", async () => {
    await montar("cuaderno")
    Element.prototype.scrollIntoView ??= () => {}
    await click(button("Pedir información"))
    expect(document.querySelector("#contacto select").value).toBe("Escuela, empresa o colega")
  })

  it("se recupera de un tema guardado inválido o anterior y permite elegir otro", async () => {
    await montar("calido")
    expect(button("Tema Sala con luz").getAttribute("aria-pressed")).toBe("true")
    await click(button("Tema Neblina"))
    expect(localStorage.getItem("demo-psicologo-theme")).toBe("neblina")
    expect(document.querySelector(".psi-neblina")).not.toBeNull()
  })

  it("una ruta desconocida muestra una salida funcional al portafolio", async () => {
    window.history.replaceState(null, "", "/no-existe")
    await render(<App />)
    expect(document.querySelector("h1").textContent).toBe("Esta página no existe")
    await click(document.querySelector('a[href="/"]'))
    expect(document.querySelector("h1").textContent).toBe("Ian Habid Aldana Martínez")
    expect(document.title).toContain("CV y portafolio")
  })
})
