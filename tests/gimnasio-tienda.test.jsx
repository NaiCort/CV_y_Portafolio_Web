import { MemoryRouter, Route, Routes } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import GimnasioApp from "../src/giros/gimnasio/GimnasioApp"
import { COACHES, PAQUETES } from "../src/giros/gimnasio/data/coaches"
import { PRODUCTOS } from "../src/giros/gimnasio/data/tienda"
import { SUCURSALES } from "../src/giros/gimnasio/data/sucursales"
import { SOCIO_KEY } from "../src/giros/gimnasio/lib/socio"
import {
  ESTADO_TIENDA,
  TIENDA_KEY,
  cargarTienda,
  cuentas,
  existencias,
  listoPara,
  precioSocio,
  tiendaReducer,
} from "../src/giros/gimnasio/lib/tienda"
import {
  EVALUACION_KEY,
  diasDeEvaluacion,
  horasLibres,
  sucursalesDe,
} from "../src/giros/gimnasio/lib/evaluacion"
import { advance, button, click, enter, render } from "./helpers"

const renderBrio = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/gimnasio/*" element={<GimnasioApp />} />
      </Routes>
    </MemoryRouter>,
  )
const h1 = () => document.querySelector("main h1").textContent
const agregar = (estado, id, cantidad = 1, variante) =>
  tiendaReducer(estado, { type: "agregar", tipo: "producto", id, variante, cantidad })

beforeEach(() => localStorage.clear())
afterEach(() => vi.useRealTimers())

describe("Datos de coaches y tienda", () => {
  it("tiene seis coaches que dan clase y diez productos completos", () => {
    expect(COACHES).toHaveLength(6)
    for (const c of COACHES) {
      expect(sucursalesDe(c.id).length, c.id).toBeGreaterThan(0)
      expect(c.formacion.length, c.id).toBeGreaterThan(0)
    }
    expect(PRODUCTOS).toHaveLength(10)
    expect(new Set(PRODUCTOS.map((p) => p.id)).size).toBe(10)
    for (const p of PRODUCTOS) {
      expect(p.precio, p.id).toBeGreaterThan(0)
      expect(p.puntos.length, p.id).toBeGreaterThan(0)
    }
    expect(PAQUETES.map((p) => p.precio / p.sesiones)).toEqual([390, 360, 330])
  })
})

describe("Cuentas de la tienda", () => {
  it("aplica el precio de socio y desglosa el IVA incluido", () => {
    expect(precioSocio(899)).toBe(809)
    let e = agregar(ESTADO_TIENDA, "guantes", 2, "12 oz")
    e = tiendaReducer(e, { type: "agregar", tipo: "paquete", id: "sesion-4", cantidad: 1 })
    expect(cuentas(e.carrito, false)).toEqual({
      subtotal: 3238,
      descuento: 0,
      total: 3238,
      iva: 446.62,
      piezas: 3,
    })
    expect(cuentas(e.carrito, true).total).toBe(809 * 2 + 1296)
  })

  it("junta piezas iguales, respeta el máximo y quita en cero", () => {
    let e = agregar(ESTADO_TIENDA, "proteina", 4, "Vainilla")
    e = agregar(e, "proteina", 4, "Vainilla")
    e = agregar(e, "proteina", 1, "Chocolate")
    expect(e.carrito.map((l) => l.cantidad)).toEqual([5, 1])
    e = tiendaReducer(e, { type: "cantidad", clave: e.carrito[1].clave, cantidad: 0 })
    expect(e.carrito).toHaveLength(1)
  })

  it("aparta el pedido, vacía el carrito y se puede cancelar", () => {
    const ahora = new Date(2026, 10, 17, 13, 10).getTime()
    let e = agregar(ESTADO_TIENDA, "toalla")
    e = tiendaReducer(e, {
      type: "apartar",
      sucursal: "centro",
      nombre: " Ana ",
      ahora,
      esSocio: true,
    })
    expect(e.carrito).toEqual([])
    expect(e.pedidos[0]).toMatchObject({
      nombre: "Ana",
      total: 224,
      descuento: 25,
      estado: "apartado",
    })
    e = tiendaReducer(e, { type: "cancelarPedido", id: e.pedidos[0].id })
    expect(e.pedidos[0].estado).toBe("cancelado")
  })

  it("entrega dentro del horario de recepción y avisa si falta una pieza", () => {
    const d = (h, m = 0, dia = 17) => new Date(2026, 10, dia, h, m)
    expect(listoPara(d(4, 30), false)).toEqual(d(9))
    expect(listoPara(d(13, 10), false)).toEqual(d(15, 30))
    expect(listoPara(d(13, 40), false)).toEqual(d(16))
    expect(listoPara(d(19, 0), false)).toEqual(d(9, 0, 18))
    expect(listoPara(d(13, 10), true)).toEqual(d(9, 0, 19))
    for (const p of PRODUCTOS)
      for (const s of SUCURSALES) {
        const n = existencias(p.id, s.id)
        expect(n).toBe(existencias(p.id, s.id))
        expect(n).toBeGreaterThanOrEqual(0)
        expect(n).toBeLessThanOrEqual(6)
      }
  })

  it("ignora datos guardados dañados o de productos que ya no existen", () => {
    expect(cargarTienda({ getItem: () => "{roto" })).toBe(ESTADO_TIENDA)
    const guardado = JSON.stringify({
      carrito: [{ clave: "producto:nada:", tipo: "producto", id: "nada", cantidad: 1 }],
      pedidos: [],
    })
    expect(cargarTienda({ getItem: () => guardado }).carrito).toEqual([])
  })
})

describe("Horario de la evaluación", () => {
  it("salta el domingo y no ofrece horas que ya pasaron", () => {
    const sabado = new Date(2026, 10, 21, 12)
    const dias = diasDeEvaluacion(sabado)
    expect(dias).toHaveLength(6)
    expect(dias.some((d) => d.getDay() === 0)).toBe(false)
    const hoy = horasLibres("mara", "centro", dias[0], sabado)
    expect(hoy.filter((h) => h.fecha.getHours() < 13).every((h) => !h.libre)).toBe(true)
  })
})

describe("Tienda", () => {
  it("lleva del catálogo a la ficha, al carrito y al pedido apartado", async () => {
    await renderBrio("/gimnasio/tienda")
    expect(h1()).toBe("Tienda")
    expect(document.querySelectorAll(".b-productos li")).toHaveLength(10)
    await click(document.querySelector('a[href="/gimnasio/tienda/guantes"]'))
    expect(h1()).toBe("Guantes de box")
    expect(document.title).toContain("Guantes de box")
    await click(document.querySelectorAll('input[name="variante"]')[2])
    await click(button("Agregar una pieza"))
    await click(button("Agregar al carrito"))
    expect(document.querySelector(".b-agregado").textContent).toContain("2 piezas (14 oz)")
    expect(document.querySelector(".b-btn-carrito .b-cuenta").textContent).toBe("2")
    await click(document.querySelector('.b-agregado a[href="/gimnasio/carrito"]'))
    expect(h1()).toBe("Carrito")
    expect(document.querySelector(".b-cuentas-total dd").textContent).toBe("$1,798")
    vi.useFakeTimers()
    await click(button("Apartar pedido · $1,798"))
    expect(document.querySelector("#b-carrito-error")).toBeTruthy()
    await enter(document.querySelector("#b-carrito-nombre"), "Luis")
    await click(button("Apartar pedido · $1,798"))
    await advance(900)
    expect(h1()).toBe("Pedido apartado")
    expect(document.body.textContent).toContain("no se cobró")
    const guardado = JSON.parse(localStorage.getItem(TIENDA_KEY))
    expect(guardado.carrito).toEqual([])
    expect(guardado.pedidos).toHaveLength(1)
    expect(document.querySelector(".b-btn-carrito")).toBeNull()
  })

  it("muestra el precio de socio cuando entraste con el perfil de ejemplo", async () => {
    localStorage.setItem(SOCIO_KEY, JSON.stringify({ sesion: true }))
    await renderBrio("/gimnasio/tienda/toalla")
    expect(document.querySelector(".b-precio-tienda").textContent).toContain("precio de socio")
    await click(button("Agregar al carrito"))
    await click(document.querySelector('.b-agregado a[href="/gimnasio/carrito"]'))
    expect(document.querySelector(".b-cuentas").textContent).toContain("−$25")
    expect(document.querySelector("#b-carrito-nombre").value).toBe("Andrea Ruiz")
  })

  it("manda a la tienda si el producto no existe", async () => {
    await renderBrio("/gimnasio/tienda/nada")
    expect(h1()).toBe("Tienda")
  })
})

describe("Coaches", () => {
  it("filtra por objetivo y lleva al horario de cada coach", async () => {
    await renderBrio("/gimnasio/coaches")
    expect(h1()).toBe("Coaches")
    expect(document.querySelectorAll(".b-coach")).toHaveLength(6)
    await click(document.querySelectorAll('input[name="objetivo-coach"]')[3])
    expect([...document.querySelectorAll(".b-coach h3")].map((n) => n.textContent)).toEqual([
      "Rafa",
    ])
    await click(document.querySelector('a[href="/gimnasio/clases?coach=rafa"]'))
    expect(h1()).toBe("Clases")
    const selects = [...document.querySelectorAll(".b-filtros select")]
    expect(selects.some((s) => s.value === "rafa")).toBe(true)
  })

  it("agenda la evaluación gratuita y la deja cancelar", async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 17, 6, 0))
    await renderBrio("/gimnasio/coaches")
    await click(button("Evaluación con Sofía"))
    expect(document.querySelector("#b-eva-coach").value).toBe("sofia")
    await click(button("Agendar evaluación", document.querySelector("dialog")))
    expect(document.querySelector("#b-eva-error").textContent).toBe("Elige una hora libre.")
    await click(document.querySelector('dialog input[name="eva-hora"]:not(:disabled)'))
    await click(button("Agendar evaluación", document.querySelector("dialog")))
    expect(document.querySelector("#b-eva-error").textContent).toContain("nombre")
    await enter(document.querySelector("#b-eva-nombre"), "Luis")
    await click(button("Agendar evaluación", document.querySelector("dialog")))
    await advance(800)
    expect(document.querySelector("dialog").textContent).toContain("te espera Sofía")
    expect(JSON.parse(localStorage.getItem(EVALUACION_KEY)).coach).toBe("sofia")
    await click(button("Listo"))
    expect(document.querySelector(".b-tu-evaluacion").textContent).toContain("Sofía")
    await click(button("Cancelar evaluación"))
    await click(button("Sí, cancelar"))
    expect(localStorage.getItem(EVALUACION_KEY)).toBeNull()
  })

  it("agrega un paquete de sesiones al mismo carrito", async () => {
    await renderBrio("/gimnasio/coaches")
    await click(button("Agregar al carrito: Paquete de 8 sesiones personales"))
    expect(document.querySelector(".b-btn-carrito .b-cuenta").textContent).toBe("1")
    await click(document.querySelector(".b-btn-carrito"))
    expect(document.querySelector(".b-lineas").textContent).toContain("Paquete de 8 sesiones")
    expect(document.querySelector('label[for="b-carrito-sucursal"]').textContent).toContain(
      "Pagar en la recepción",
    )
  })
})

describe("Menú y privacidad", () => {
  it("abre el menú del teléfono y lo cierra al cambiar de página", async () => {
    await renderBrio("/gimnasio")
    const menu = document.querySelector("#b-menu-movil")
    expect(menu.hidden).toBe(true)
    await click(button("Menú"))
    expect(menu.hidden).toBe(false)
    expect(button("Menú").getAttribute("aria-expanded")).toBe("true")
    await click(menu.querySelector('a[href="/gimnasio/tienda"]'))
    expect(h1()).toBe("Tienda")
    expect(document.querySelector("#b-menu-movil").hidden).toBe(true)
    // Elegir la página en la que ya estás también lo cierra.
    await click(button("Menú"))
    await click(document.querySelector('#b-menu-movil a[href="/gimnasio/tienda"]'))
    expect(document.querySelector("#b-menu-movil").hidden).toBe(true)
  })

  it("borra carrito, pedidos y evaluación desde el aviso de privacidad", async () => {
    localStorage.setItem(
      TIENDA_KEY,
      JSON.stringify({
        carrito: [{ clave: "producto:toalla:", tipo: "producto", id: "toalla", cantidad: 1 }],
        pedidos: [],
      }),
    )
    localStorage.setItem(
      EVALUACION_KEY,
      JSON.stringify({ id: "EVA-1", coach: "mara", sucursal: "centro", fecha: "2030-01-01" }),
    )
    await renderBrio("/gimnasio/tienda")
    expect(document.querySelector(".b-btn-carrito")).toBeTruthy()
    await click(button("Aviso de privacidad", document.querySelector("footer")))
    await click(button("Borrar mis datos de esta demo"))
    await click(button("Sí, borrar todo"))
    expect(document.querySelector(".b-btn-carrito")).toBeNull()
    expect(JSON.parse(localStorage.getItem(TIENDA_KEY))).toEqual(ESTADO_TIENDA)
    expect(localStorage.getItem(EVALUACION_KEY)).toBeNull()
  })
})
