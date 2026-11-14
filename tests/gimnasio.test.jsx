import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { SUCURSALES, findSucursal, horarioTexto } from "../src/giros/gimnasio/data/sucursales"
import { CATEGORIAS, HORARIO, findCategoria } from "../src/giros/gimnasio/data/clases"
import { COACHES, findCoach } from "../src/giros/gimnasio/data/coaches"
import { FILAS, PLANES } from "../src/giros/gimnasio/data/planes"
import { abierta, aforoEn, estadoAforo } from "../src/giros/gimnasio/lib/aforo"
import { cuandoTexto, lugaresLibres, proximasClases } from "../src/giros/gimnasio/lib/horario"
import { TEMA_KEY, guardarTema, leerTema } from "../src/giros/gimnasio/lib/tema"
import { codigoDelPase } from "../src/giros/gimnasio/lib/pase"
import { button, click, render } from "./helpers"

const renderBrio = (path = "/gimnasio") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/gimnasio/*" element={<GimnasioApp />} />
      </Routes>
    </MemoryRouter>,
  )
// Martes 17 de noviembre de 2026.
const martes = (h, m = 0) => new Date(2026, 10, 17, h, m)
const memoria = () => {
  const datos = new Map()
  return { getItem: (k) => datos.get(k) ?? null, setItem: (k, v) => datos.set(k, String(v)) }
}

describe("Datos de Brío", () => {
  it("tiene cinco sucursales, coaches y categorías completos y sin repetir", () => {
    expect(SUCURSALES).toHaveLength(5)
    expect(new Set(SUCURSALES.map((s) => s.id)).size).toBe(5)
    for (const clase of HORARIO) {
      expect(findSucursal(clase.sucursal), clase.id).toBeTruthy()
      expect(findCategoria(clase.categoria), clase.id).toBeTruthy()
      expect(findCoach(clase.coach), clase.id).toBeTruthy()
      expect(clase.dia).toBeGreaterThanOrEqual(0)
      expect(clase.dia).toBeLessThanOrEqual(6)
    }
    expect(new Set(HORARIO.map((c) => c.id)).size).toBe(HORARIO.length)
    expect(HORARIO).toHaveLength(52)
    expect(COACHES.every((c) => HORARIO.some((h) => h.coach === c.id))).toBe(true)
    expect(CATEGORIAS.every((c) => HORARIO.some((h) => h.categoria === c.id))).toBe(true)
  })

  it("ubica las cinco sucursales en Xalapa, separadas entre sí", () => {
    for (const s of SUCURSALES) {
      const [lon, lat] = s.coordenadas
      expect(lon, s.id).toBeGreaterThan(-96.97)
      expect(lon, s.id).toBeLessThan(-96.86)
      expect(lat, s.id).toBeGreaterThan(19.49)
      expect(lat, s.id).toBeLessThan(19.58)
      expect(s.referencia.osm).toMatch(/^(way|node|relation)\/\d+$/)
    }
    const claves = SUCURSALES.map((s) => s.coordenadas.join(","))
    expect(new Set(claves).size).toBe(5)
  })

  it("describe cada plan en palabras, con un solo plan destacado", () => {
    expect(PLANES.filter((p) => p.destacado)).toHaveLength(1)
    expect(PLANES.map((p) => p.precio)).toEqual([549, 949, 1490])
    for (const fila of FILAS) expect(fila.total).toBeTruthy()
  })

  it("da el horario de hoy de cada sucursal", () => {
    expect(horarioTexto(findSucursal("centro"), martes(10))).toBe("5:30 a 23:00")
    expect(horarioTexto(findSucursal("centro"), new Date(2026, 10, 21, 10))).toBe("7:00 a 20:00")
    expect(horarioTexto(findSucursal("macuiltepetl"), martes(3))).toBe("Abierta las 24 horas")
  })
})

describe("Aforo simulado", () => {
  it("marca cerradas las sucursales fuera de horario y Macuiltépetl siempre abierta", () => {
    expect(abierta(findSucursal("centro"), martes(4))).toBe(false)
    expect(aforoEn(findSucursal("centro"), martes(4))).toBeNull()
    expect(aforoEn(findSucursal("macuiltepetl"), martes(4))).toBeGreaterThan(0)
  })

  it("sube en la tarde y se queda entre 2 y 97 %", () => {
    for (const s of SUCURSALES) {
      const tarde = aforoEn(s, martes(19))
      const mediodia = aforoEn(s, martes(11))
      expect(tarde).toBeGreaterThan(mediodia)
      expect(tarde).toBeLessThanOrEqual(97)
      expect(mediodia).toBeGreaterThanOrEqual(2)
    }
  })

  it("nombra el estado por rango", () => {
    expect(estadoAforo(null)).toBe("cerrada")
    expect(estadoAforo(20)).toBe("tranquilo")
    expect(estadoAforo(50)).toBe("normal")
    expect(estadoAforo(70)).toBe("lleno a medias")
    expect(estadoAforo(90)).toBe("lleno")
  })
})

describe("Horario de clases", () => {
  it("lista las próximas sesiones en orden y solo en el futuro", () => {
    const ahora = martes(18, 30)
    const sesiones = proximasClases(ahora)
    expect(sesiones[0].fecha > ahora).toBe(true)
    for (let i = 1; i < sesiones.length; i++)
      expect(sesiones[i].fecha >= sesiones[i - 1].fecha).toBe(true)
    // La de 18:30 en Tecajetes ya empezó: la siguiente es a las 19:00.
    expect(sesiones[0].hora).toBe("19:00")
    expect(sesiones.every((s) => s.fecha > ahora)).toBe(true)
  })

  it("da lugares libres estables y dentro del cupo", () => {
    const [sesion] = proximasClases(martes(6))
    const libres = lugaresLibres(sesion)
    expect(lugaresLibres(sesion)).toBe(libres)
    expect(libres).toBeGreaterThanOrEqual(0)
    expect(libres).toBeLessThanOrEqual(findCategoria(sesion.categoria).cupo)
  })

  it("dice hoy, mañana o el día de la semana", () => {
    expect(cuandoTexto(martes(19), martes(8))).toBe("hoy 19:00")
    expect(cuandoTexto(new Date(2026, 10, 18, 7), martes(8))).toBe("mañana 7:00")
    expect(cuandoTexto(new Date(2026, 10, 20, 7), martes(8))).toBe("viernes 7:00")
  })
})

describe("Tema y pase", () => {
  it("lee Cobalto por omisión, guarda solo temas válidos y no falla sin almacenamiento", () => {
    const storage = memoria()
    expect(leerTema(storage)).toBe("cobalto")
    guardarTema(storage, "distrito")
    expect(storage.getItem(TEMA_KEY)).toBe("distrito")
    guardarTema(storage, "neon")
    expect(leerTema(storage)).toBe("distrito")
    expect(leerTema(null)).toBe("cobalto")
  })

  it("cambia el código del pase cada 30 segundos", () => {
    const t = Date.UTC(2026, 10, 17, 12, 0, 0)
    expect(codigoDelPase("X", t)).toBe(codigoDelPase("X", t + 29_000))
    expect(codigoDelPase("X", t)).not.toBe(codigoDelPase("X", t + 30_000))
  })
})

describe("Inicio de Brío", () => {
  it("tiene un h1, título propio, el horario real en cifras y ningún enlace vacío", async () => {
    await renderBrio()
    expect(document.querySelectorAll("h1")).toHaveLength(1)
    expect(document.title).toContain("Brío")
    expect(document.body.textContent).toContain(`${HORARIO.length} clases a la semana`)
    expect(document.querySelectorAll("#clases article")).toHaveLength(3)
    expect(document.querySelectorAll("table tbody tr")).toHaveLength(FILAS.length + 1)
    expect(document.querySelectorAll(".b-planes-movil li")).toHaveLength(PLANES.length)
    // Sin IntersectionObserver (jsdom) el mapa espera a que se pida.
    expect(button("Ver el mapa de Xalapa")).toBeTruthy()
    expect(document.querySelectorAll('a[href="#"]')).toHaveLength(0)
    expect(document.querySelector(".b-qr path").getAttribute("d")).toMatch(/^M\d/)
  })

  it("cambia de tema, lo marca y lo guarda", async () => {
    window.localStorage.removeItem(TEMA_KEY)
    await renderBrio()
    const raiz = document.querySelector(".brio-root")
    expect(raiz.dataset.tema).toBe("cobalto")
    await click(button("Tema Distrito"))
    expect(raiz.dataset.tema).toBe("distrito")
    expect(button("Tema Distrito").getAttribute("aria-pressed")).toBe("true")
    expect(window.localStorage.getItem(TEMA_KEY)).toBe("distrito")
    window.localStorage.removeItem(TEMA_KEY)
  })

  it("elige una sucursal desde la lista y actualiza la ficha del mapa", async () => {
    await renderBrio()
    const lista = document.querySelector(".b-lista")
    await click(
      [...lista.querySelectorAll("button")].find((b) => b.textContent.includes("Tecajetes")),
    )
    expect(document.querySelector(".b-ficha b").textContent).toBe("Tecajetes")
    expect(
      [...lista.querySelectorAll("button")].find((b) => b.textContent.includes("Tecajetes")),
    ).toHaveProperty("ariaPressed", "true")
  })

  it("avisa que el área de socio llega después en lugar de no hacer nada", async () => {
    await renderBrio()
    await click(button("Entrar"))
    expect(document.querySelector(".b-aviso").textContent).toContain("siguiente entrega")
    await click(button("Cerrar aviso"))
    expect(document.querySelector(".b-aviso")).toBeNull()
  })

  it("muestra los créditos con autor y licencia", async () => {
    await renderBrio("/gimnasio/creditos")
    expect(document.querySelector("h1").textContent).toBe("Créditos")
    expect(document.body.textContent).toContain("CC BY-SA 4.0")
    expect(document.querySelectorAll(".b-creditos-lista li")).toHaveLength(4)
  })
})
