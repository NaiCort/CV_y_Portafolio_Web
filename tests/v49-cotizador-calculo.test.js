import { describe, expect, it } from "vitest"
import { CATEGORIAS, FUNCIONES, PUNTOS_DE_PARTIDA, funcionPorId } from "../src/data/catalogo"
import { DEMOS } from "../src/data/demos"
import {
  aParametros,
  alternar,
  calcular,
  cambiarCategoria,
  categoriaPara,
  configInicial,
  crearFolio,
  deParametros,
  fijarCantidad,
  monedaPorIdioma,
  rangoCategoria,
  textoPlazo,
} from "../src/lib/cotizacion"

const marcadas = (c) => Object.keys(c.sel).filter((id) => c.sel[id] > 0)

describe("V4.9: catálogo del cotizador", () => {
  it("cada función tiene identificador único, grupo, estados en las cuatro categorías y reglas válidas", () => {
    const ids = FUNCIONES.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const f of FUNCIONES) {
      expect(Object.keys(f.estados).sort()).toEqual(CATEGORIAS.map((c) => c.id).sort())
      expect(f.aparte || f.porcentaje || f.horas?.length === 2, f.id).toBeTruthy()
      for (const r of [...(f.requiere ?? []), ...(f.requiereAlguna ?? []), ...(f.excluye ?? [])])
        expect(funcionPorId(r), `${f.id} → ${r}`).toBeTruthy()
    }
  })

  it("en Personalizado cabe todo el catálogo", () => {
    for (const f of FUNCIONES) expect(f.estados.personalizado, f.id).not.toBeNull()
  })

  it("cada demo del portafolio tiene su punto de partida y sus versiones solo usan funciones que existen", () => {
    for (const d of DEMOS) expect(PUNTOS_DE_PARTIDA[d.id], d.id).toBeTruthy()
    for (const [demo, p] of Object.entries(PUNTOS_DE_PARTIDA))
      for (const v of ["esencial", "recomendada", "completa"])
        for (const x of p[v])
          expect(funcionPorId(x.split("*")[0]), `${demo} ${v} ${x}`).toBeTruthy()
  })

  it("las tres versiones de cada demo crecen: esencial < recomendada < completa", () => {
    for (const demo of Object.keys(PUNTOS_DE_PARTIDA)) {
      const t = ["esencial", "recomendada", "completa"].map(
        (version) => calcular(configInicial({ demo, version })).total,
      )
      expect(t[0], demo).toBeLessThan(t[1])
      expect(t[1], demo).toBeLessThan(t[2])
    }
  })
})

describe("V4.9: reglas entre funciones", () => {
  it("la landing trae su núcleo y no deja quitarlo", () => {
    const c = configInicial({ categoria: "landing" })
    expect(c.sel["una-pagina"]).toBe(1)
    expect(alternar(c, "una-pagina").bloqueo).toMatch(/landing/)
  })

  it("el aviso de privacidad entra solo cuando el sitio recibe datos y entonces no se puede quitar", () => {
    let c = configInicial({ categoria: "landing" })
    expect(c.sel.formulario).toBe(1)
    expect(c.sel.privacidad).toBe(1)
    expect(alternar(c, "privacidad").bloqueo).toMatch(/datos personales/)
    c = alternar(c, "formulario").config
    expect(alternar(c, "privacidad").config.sel.privacidad).toBeUndefined()
  })

  it("quitar una función quita lo que depende de ella y lo informa", () => {
    const c = configInicial({ demo: "patio-12", version: "completa" })
    const r = alternar(c, "carrito")
    expect(r.quitadas).toEqual(expect.arrayContaining(["carrito", "pedidos"]))
    expect(r.config.sel.pedidos).toBeUndefined()
  })

  it("añadir una función añade lo que requiere", () => {
    const c = configInicial({ categoria: "varias" })
    const r = alternar(c, "pedidos")
    expect(r.agregadas).toEqual(expect.arrayContaining(["pedidos", "carrito"]))
  })

  it("los recordatorios necesitan citas o reservas; sin ninguna se van", () => {
    const c = configInicial({ demo: "psicologo", version: "completa" })
    expect(c.sel.recordatorios).toBe(1)
    const r = alternar(c, "citas")
    expect(r.quitadas).toEqual(expect.arrayContaining(["citas", "recordatorios"]))
  })

  it("una sola página y páginas con menú se excluyen en Personalizado", () => {
    const c = alternar(configInicial({ categoria: "personalizado" }), "una-pagina").config
    expect(c.sel["una-pagina"]).toBe(1)
    const r = alternar(c, "paginas")
    expect(r.config.sel.paginas).toBe(1)
    expect(r.quitadas).toContain("una-pagina")
  })

  it("una función que no cabe pide cambiar a la categoría más pequeña donde sí cabe", () => {
    const c = configInicial({ categoria: "landing" })
    expect(alternar(c, "carrito").necesitaCategoria).toBe("varias")
    expect(alternar(c, "cuentas").necesitaCategoria).toBe("tienda")
    expect(categoriaPara("carrito", "personalizado")).toBeNull()
  })

  it("al cambiar de categoría se conserva lo compatible y se informa lo retirado", () => {
    const c = configInicial({ demo: "patio-12", version: "completa" })
    const r = cambiarCategoria(c, "landing")
    expect(r.config.categoria).toBe("landing")
    expect(r.quitadas).toEqual(expect.arrayContaining(["paginas", "carrito", "sucursales"]))
    expect(r.config.sel.mapa).toBe(1)
    expect(r.config.sel["una-pagina"]).toBe(1)
  })

  it("Tienda o sistema exige carrito o cuentas y no deja quitar el último", () => {
    const c = configInicial({ categoria: "tienda" })
    expect(c.sel.carrito || c.sel.cuentas).toBeTruthy()
    expect(c.sel.panel).toBe(1)
    expect(alternar(c, "carrito").bloqueo).toMatch(/carrito o cuentas/)
  })

  it("la cantidad multiplica el precio y respeta el máximo", () => {
    let c = configInicial({ categoria: "landing" })
    c = alternar(c, "temas").config
    const uno = calcular(c).lineas.find((l) => l.id === "temas").precio
    c = fijarCantidad(c, "temas", 9)
    expect(c.sel.temas).toBe(4)
    expect(calcular(c).lineas.find((l) => l.id === "temas").precio).toBe(uno * 4)
  })
})

describe("V4.9: precio y plazo", () => {
  it("Personalizado empieza sin nada marcado y cuesta el proyecto mínimo", () => {
    const c = configInicial({ categoria: "personalizado" })
    expect(Object.keys(c.sel)).toEqual([])
    const r = calcular(c)
    expect(r.funciones + r.calidad + r.minimo).toBe(3500)
  })

  it("el primer mes de mantenimiento entra en el desglose y el total, sin descuento de lanzamiento", () => {
    const c = configInicial({ demo: "psicologo" })
    const sin = calcular(c)
    const con = calcular({ ...c, plan: "basico" })
    expect(con.primerMes).toBe(1200)
    expect(con.lanzamiento).toBe(sin.lanzamiento)
    expect(con.total).toBe(sin.total + 1200 + Math.round((sin.neto + 1200) * 0.16) - sin.iva)
    expect(con.anticipo).toBe(sin.anticipo)
    expect(con.mensualidad).toBe(1392)
  })

  it("el plazo se escribe sin repetir el número cuando el rango es de un solo día", () => {
    expect(textoPlazo([2, 2])).toBe("2 días hábiles")
    expect(textoPlazo([1, 1])).toBe("1 día hábil")
    expect(textoPlazo([3, 5])).toBe("de 3 a 5 días hábiles")
  })

  it("en pesos suma funciones, ficha y calidad, lanzamiento e IVA, y el total incluye impuestos", () => {
    const r = calcular(configInicial({ demo: "psicologo", version: "recomendada" }))
    expect(r.moneda).toBe("MXN")
    expect(r.calidad).toBe(Math.round((r.funciones * 0.1) / 100) * 100)
    expect(r.lanzamiento).toBeLessThan(0)
    expect(r.iva).toBe(Math.round(r.neto * 0.16))
    expect(r.total).toBe(r.neto + r.iva)
    expect(r.dias[0]).toBeLessThanOrEqual(r.dias[1])
  })

  it("en dólares y euros no se suma IVA", () => {
    for (const moneda of ["USD", "EUR"]) {
      const r = calcular(configInicial({ demo: "psicologo", moneda }))
      expect(r.iva).toBe(0)
      expect(r.total).toBe(r.neto)
    }
  })

  it("un proyecto muy pequeño sube al mínimo", () => {
    let c = alternar(configInicial({ categoria: "personalizado" }), "whatsapp").config
    expect(Object.keys(c.sel)).toEqual(["whatsapp"])
    const r = calcular(c)
    expect(r.minimo).toBeGreaterThan(0)
    expect(r.funciones + r.calidad + r.minimo).toBe(3500)
    c = { ...c, moneda: "USD" }
    expect(calcular(c).funciones + calcular(c).calidad + calcular(c).minimo).toBe(300)
  })

  it("el plazo usa 8 horas por día hábil y la urgencia lo acorta con recargo", () => {
    const c = configInicial({ demo: "psicologo" })
    const normal = calcular(c)
    expect(normal.dias[1]).toBe(Math.ceil(normal.horas[1] / 8))
    const prioritaria = calcular({ ...c, urgencia: "prioritaria" })
    expect(prioritaria.recargo).toBeGreaterThan(0)
    expect(prioritaria.dias[1]).toBeLessThan(normal.dias[1])
  })

  it("la entrega exprés no existe para proyectos grandes", () => {
    const grande = calcular({
      ...configInicial({ demo: "brio", version: "completa" }),
      urgencia: "expres",
    })
    expect(grande.urgencias.find((u) => u.id === "expres").disponible).toBe(false)
    expect(grande.urgencia.id).toBe("normal")
  })

  it("las funciones de IA no suman un número inventado: se cotizan en la propuesta", () => {
    const c = alternar(configInicial({ categoria: "landing" }), "ia-whatsapp").config
    const r = calcular(c)
    expect(r.aparte).toContain("ia-whatsapp")
    expect(r.lineas.find((l) => l.id === "ia-whatsapp").precio).toBeNull()
  })

  it("el sitio en dos idiomas suma un 30 % de las horas", () => {
    const c = configInicial({ demo: "psicologo" })
    const con = calcular(alternar(c, "dos-idiomas").config)
    expect(con.horas[1]).toBeGreaterThan(calcular(c).horas[1] * 1.25)
  })

  it("cada categoría da un «desde» menor que su «completo»", () => {
    for (const cat of CATEGORIAS) {
      const r = rangoCategoria(cat.id, "MXN")
      expect(r.desde, cat.id).toBeLessThan(r.completo)
    }
  })
})

describe("V4.9: moneda, folio y dirección", () => {
  it("elige la moneda por idioma y región del navegador", () => {
    expect(monedaPorIdioma("es-MX")).toBe("MXN")
    expect(monedaPorIdioma("es-ES")).toBe("EUR")
    expect(monedaPorIdioma("de-DE")).toBe("EUR")
    expect(monedaPorIdioma("en-US")).toBe("USD")
    expect(monedaPorIdioma("es-AR")).toBe("USD")
  })

  it("el folio lleva la fecha y un código corto", () => {
    expect(crearFolio(new Date(2026, 10, 25), () => 0.5)).toMatch(/^C-261125-[0-9A-Z]{4}$/)
  })

  it("la configuración sobrevive a la dirección", () => {
    let c = configInicial({ demo: "taller", version: "completa", moneda: "USD" })
    c = fijarCantidad(c, "calculadora", 3)
    c = { ...c, urgencia: "prioritaria", plan: "estandar" }
    const vuelta = deParametros(aParametros(c))
    expect(vuelta.categoria).toBe(c.categoria)
    expect(vuelta.moneda).toBe("USD")
    expect(vuelta.urgencia).toBe("prioritaria")
    expect(vuelta.plan).toBe("estandar")
    expect(marcadas(vuelta).sort()).toEqual(marcadas(c).sort())
    expect(vuelta.sel.calculadora).toBe(3)
  })

  it("las variantes de una demo llevan a su punto de partida", () => {
    expect(deParametros(new URLSearchParams("demo=psicologo-calido")).demo).toBe("psicologo")
    expect(deParametros(new URLSearchParams("demo=rubor")).demo).toBe("revista")
    expect(deParametros(new URLSearchParams("demo=no-existe")).demo).toBeNull()
  })
})
