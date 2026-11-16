import { act } from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import TallerApp from "../src/giros/taller/TallerApp"
import { TALLERES, findServicio } from "../src/giros/taller/data/talleres"
import { TESTIGOS, URGENCIAS } from "../src/giros/taller/data/testigos"
import { FOTOS } from "../src/giros/taller/data/medios"
import { LOCAL_ROSALES, SUCURSALES_VERTICE } from "../src/giros/taller/data/ubicaciones"
import { estadoAhora, horarioAgrupado } from "../src/giros/taller/lib/horario"
import { buscarOrden, ETAPAS, ETAPA_EJEMPLO } from "../src/giros/taller/lib/consulta"
import { precioServicio, precioTexto } from "../src/giros/taller/lib/formato"
import { TEMA_KEY, guardarTema, leerTema } from "../src/giros/taller/lib/tema"
import { advance, button, click, enter, render } from "./helpers"

const renderTaller = (path = "/taller") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/taller/*" element={<TallerApp />} />
      </Routes>
    </MemoryRouter>,
  )
const memoria = () => {
  const datos = new Map()
  return { getItem: (k) => datos.get(k) ?? null, setItem: (k, v) => datos.set(k, String(v)) }
}
afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
})

describe("Datos del taller", () => {
  it("cada testigo apunta a un servicio que existe en los dos talleres", () => {
    expect(TESTIGOS).toHaveLength(6)
    for (const t of TESTIGOS) {
      expect(URGENCIAS[t.urgencia], t.id).toBeTruthy()
      for (const taller of Object.values(TALLERES)) {
        const oferta = t.taller[taller.id]
        expect(oferta?.nota, `${t.id} en ${taller.id}`).toBeTruthy()
        if (oferta.servicio)
          expect(findServicio(taller, oferta.servicio), `${t.id} en ${taller.id}`).toBeTruthy()
      }
    }
  })

  it("solo Vértice tiene sucursales y Mi garaje", () => {
    expect(TALLERES.rosales.sucursales).toBeUndefined()
    expect(TALLERES.vertice.sucursales).toHaveLength(4)
    const { km, ultimo, siguiente } = TALLERES.vertice.garaje
    expect(km).toBeGreaterThan(ultimo)
    expect(km).toBeLessThan(siguiente)
  })

  it("da crédito a la foto de cada taller", () => {
    for (const taller of Object.values(TALLERES)) {
      expect(FOTOS[taller.foto.id]?.pagina).toMatch(/^https:\/\/commons\.wikimedia\.org\//)
      expect(taller.foto.alt.length).toBeGreaterThan(20)
    }
  })

  it("escribe precios en pesos y respeta los textos sin cifra", () => {
    expect(precioTexto(1450)).toBe("$1,450")
    expect(precioServicio(findServicio(TALLERES.vertice, "hojalateria"))).toBe("Cotización")
    expect(precioServicio(findServicio(TALLERES.vertice, "recoleccion"))).toBe("Incluida")
    expect(precioServicio(null)).toBe("Sin costo")
  })
})

describe("Ubicaciones", () => {
  const km = ([lon1, lat1], [lon2, lat2]) => Math.hypot((lon1 - lon2) * 105, (lat1 - lat2) * 111)
  it("ubica los dos talleres en Xalapa, en zonas distintas y sin repetir puntos", () => {
    const puntos = [LOCAL_ROSALES, ...SUCURSALES_VERTICE]
    for (const p of puntos) {
      const [lon, lat] = p.coordenadas
      expect(lon, p.id).toBeGreaterThan(-96.97)
      expect(lon, p.id).toBeLessThan(-96.86)
      expect(lat, p.id).toBeGreaterThan(19.49)
      expect(lat, p.id).toBeLessThan(19.59)
      expect(p.referencia.osm, p.id).toMatch(/^(way|node|relation)\/\d+$/)
      expect(p.horario, p.id).toHaveLength(7)
    }
    // El taller familiar no comparte zona con ninguna sucursal del multimarca (más de 2 km).
    for (const s of SUCURSALES_VERTICE)
      expect(km(LOCAL_ROSALES.coordenadas, s.coordenadas), s.id).toBeGreaterThan(2)
    expect(new Set(SUCURSALES_VERTICE.map((s) => s.id)).size).toBe(4)
  })

  it("dice si está abierto y cuándo abre", () => {
    const h = LOCAL_ROSALES.horario
    // Martes 17 de noviembre de 2026.
    expect(estadoAhora(h, new Date(2026, 10, 17, 10))).toEqual({
      abierto: true,
      texto: "Abierto hasta las 18:30",
    })
    expect(estadoAhora(h, new Date(2026, 10, 17, 7)).texto).toBe("Abre hoy a las 8:30")
    expect(estadoAhora(h, new Date(2026, 10, 17, 19)).texto).toBe("Abre mañana a las 8:30")
    // Sábado por la tarde: el domingo cierra, abre el lunes.
    expect(estadoAhora(h, new Date(2026, 10, 21, 15)).texto).toBe("Abre el lunes a las 8:30")
  })

  it("agrupa los días con el mismo horario", () => {
    const grupos = horarioAgrupado(LOCAL_ROSALES.horario, [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ])
    expect(grupos.map((g) => [g.dias, g.texto])).toEqual([
      ["Lunes a viernes", "8:30 a 18:30"],
      ["Sábado", "8:30 a 14:00"],
      ["Domingo", "Cerrado"],
    ])
    expect(grupos[0].incluye(3)).toBe(true)
    expect(grupos[0].incluye(0)).toBe(false)
  })
})

describe("Consulta tu auto", () => {
  const orden = TALLERES.rosales.orden
  it("encuentra la orden de ejemplo sin importar guiones, espacios ni mayúsculas", () => {
    expect(buscarOrden(orden, "r 2611 047", "yhr2741")).toEqual({
      estado: "encontrada",
      etapa: ETAPA_EJEMPLO,
    })
    expect(ETAPAS.some((e) => e.id === ETAPA_EJEMPLO)).toBe(true)
  })
  it("distingue datos incompletos de una orden que no existe", () => {
    expect(buscarOrden(orden, "", "YHR-27-41").estado).toBe("incompleto")
    expect(buscarOrden(orden, "R-2611-048", "YHR-27-41").estado).toBe("no-encontrada")
  })
})

describe("Tema", () => {
  it("lee y guarda solo talleres conocidos", () => {
    const s = memoria()
    expect(leerTema(s)).toBe("rosales")
    guardarTema(s, "vertice")
    expect(leerTema(s)).toBe("vertice")
    guardarTema(s, "otro")
    expect(s.getItem(TEMA_KEY)).toBe("vertice")
    expect(leerTema({ getItem: () => "otro" })).toBe("rosales")
    expect(
      leerTema({
        getItem: () => {
          throw new Error("bloqueado")
        },
      }),
    ).toBe("rosales")
  })
})

describe("Portada", () => {
  it("abre con Rosales, un solo h1 y la consulta sin cuenta", async () => {
    const { container } = await renderTaller()
    expect(container.querySelectorAll("h1")).toHaveLength(1)
    expect(container.querySelector("h1").textContent).toBe(TALLERES.rosales.titulo)
    expect(container.querySelector("#consulta")).toBeTruthy()
    expect(container.querySelector("#sucursales")).toBeNull()
    expect(container.querySelector("#ubicacion .t-ficha")).toBeTruthy()
    expect(container.querySelectorAll(".t-mapa")).toHaveLength(1)
    expect(container.querySelectorAll(".t-lista-precios li")).toHaveLength(6)
  })

  it("cambia de taller con el selector y lo recuerda", async () => {
    const { container } = await renderTaller()
    await click(button("Vértice (multimarca)"))
    expect(container.querySelector("h1").textContent).toBe(TALLERES.vertice.titulo)
    expect(container.querySelector(".taller-root").dataset.tema).toBe("vertice")
    expect(container.querySelectorAll(".t-sucursales > li")).toHaveLength(4)
    expect(container.querySelector("#ubicacion")).toBeNull()
    expect(container.querySelector("#consulta")).toBeNull()
    expect(container.querySelector(".t-garaje")).toBeTruthy()
    expect(localStorage.getItem(TEMA_KEY)).toBe("vertice")
    expect(document.documentElement.dataset.tallerTema).toBe("vertice")
  })

  it("lee el testigo elegido con la oferta y el precio del taller del tema", async () => {
    const { container } = await renderTaller()
    const lectura = () => container.querySelector("#t-lectura")
    expect(lectura().querySelector("h3").textContent).toBe("Revisar motor")
    expect(lectura().textContent).toContain("$350")
    await click(button("Aceite"))
    expect(button("Aceite").getAttribute("aria-pressed")).toBe("true")
    expect(button("Motor").getAttribute("aria-pressed")).toBe("false")
    expect(lectura().textContent).toContain("Detente")
    expect(lectura().textContent).toContain("Mecánico a domicilio")
    await click(button("Llantas"))
    expect(lectura().textContent).toContain("Sin costo")
    await click(button("Vértice (multimarca)"))
    expect(lectura().textContent).toContain("Alineación y balanceo")
    expect(lectura().textContent).toContain("$690")
  })

  it("cada tema muestra solo sus locales y la lista elige sucursal", async () => {
    const { container } = await renderTaller()
    expect(container.querySelector("#ubicacion").textContent).toContain("Colonia Revolución")
    expect(container.querySelector("#ubicacion").textContent).not.toContain("Arco Sur")
    await click(button("Vértice (multimarca)"))
    const lista = container.querySelector(".t-sucursales")
    const abiertos = () => [...lista.querySelectorAll(".t-sucursal-detalle:not([hidden])")]
    expect(abiertos()).toHaveLength(1)
    const arco = [...lista.querySelectorAll(".t-sucursal-boton")].find((b) =>
      b.textContent.includes("Arco Sur"),
    )
    await click(arco)
    expect(arco.getAttribute("aria-expanded")).toBe("true")
    expect(abiertos()).toHaveLength(1)
    expect(abiertos()[0].textContent).toContain("Avenida Arco Sur")
    expect(container.querySelector("#sucursales").textContent).not.toContain("Colonia Revolución")
    expect(
      [...abiertos()[0].querySelectorAll("a")]
        .find((a) => a.textContent === "Agendar aquí")
        .getAttribute("href"),
    ).toBe("/taller/cita?sucursal=arco-sur")
  })

  it("lleva a agendar desde la portada, el testigo y la barra del teléfono", async () => {
    const { container } = await renderTaller()
    await click(button("Frenos"))
    const enlace = [...container.querySelectorAll("#t-lectura a")].find(
      (a) => a.textContent === "Agendar revisión",
    )
    expect(enlace.getAttribute("href")).toBe("/taller/cita?testigo=frenos")
    expect(container.querySelector(".t-heroe a.t-btn-p").getAttribute("href")).toBe("/taller/cita")
    expect(container.querySelector(".t-barra-movil a").getAttribute("href")).toBe("/taller/cita")
  })

  it("WhatsApp sigue siendo una conversación simulada", async () => {
    await renderTaller()
    await click(button("Escribir por WhatsApp"))
    const chat = document.querySelector("dialog")
    expect(chat.textContent).toContain("Mecánica Rosales")
    expect(chat.textContent).toContain("En un sitio real")
  })

  it("simula la llamada sin marcar a ningún número", async () => {
    const { container } = await renderTaller()
    expect(container.querySelector('a[href^="tel:"]')).toBeNull()
    await click(container.querySelector(".t-tel"))
    const dialogo = document.querySelector("dialog")
    expect(dialogo.textContent).toContain("228 104 2236")
    expect(dialogo.textContent).toContain("la demo no hace llamadas")
    await click(button("Volver a la demo", dialogo))
    expect(document.querySelector("dialog")).toBeNull()
  })

  it("consulta la orden de ejemplo en cinco estados", async () => {
    vi.useFakeTimers()
    const { container } = await renderTaller()
    const form = container.querySelector(".t-consulta")
    await click(button("Consultar", form))
    expect(form.textContent).toContain("Escribe el folio y las placas")
    const [folio, placas] = form.querySelectorAll("input")
    await enter(folio, "R-0000-000")
    await enter(placas, "YHR-27-41")
    await click(button("Consultar", form))
    expect(button("Buscando…", form).disabled).toBe(true)
    await advance(600)
    expect(form.textContent).toContain("No encontramos esa orden")
    await click(form.querySelector(".t-consulta-ejemplo"))
    expect(folio.value).toBe("R-2611-047")
    await click(button("Consultar", form))
    await advance(600)
    const resultado = container.querySelector(".t-consulta-resultado")
    expect(resultado.querySelector('[aria-current="step"]').textContent).toContain(
      "Esperando tu visto bueno",
    )
    expect(resultado.querySelectorAll(".is-hecha")).toHaveLength(2)
    await click(button("Consultar otra orden"))
    expect(container.querySelector(".t-consulta input").value).toBe("")
  })

  it("muestra los créditos y regresa al inicio desde rutas desconocidas", async () => {
    const { container } = await renderTaller("/taller/creditos")
    expect(container.querySelector("h1").textContent).toBe("Créditos")
    expect(container.querySelectorAll(".t-creditos-lista li")).toHaveLength(2)
    await act(async () => {})
    const otra = await renderTaller("/taller/no-existe")
    expect(otra.container.querySelector("h1").textContent).toBe(TALLERES.rosales.titulo)
  })
})
