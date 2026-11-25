// Cálculo del cotizador (V4.9). Funciones puras: reciben una configuración y devuelven otra o un
// desglose. No tocan el DOM ni React, para que la versión con servidor (sección 24) pueda
// recalcular el precio con el mismo código y el mismo catálogo antes de registrar una solicitud.
//
// Configuración: { categoria, sel: { [id]: cantidad }, moneda, urgencia, plan, demo, version }

import {
  CATEGORIAS,
  FUNCIONES,
  MANTENIMIENTO,
  MONEDAS,
  NUCLEO_ALGUNA,
  PARAMETROS,
  PUNTOS_DE_PARTIDA,
  URGENCIAS,
  categoriaPorId,
  funcionPorId,
} from "../data/catalogo"
import { demoPorId } from "../data/demos"

export const disponible = (f, cat) => f.estados[cat] != null

const seleccionadas = (sel) => Object.keys(sel).filter((id) => sel[id] > 0)

export const recogeDatos = (sel) => seleccionadas(sel).some((id) => funcionPorId(id)?.datos)

// Por qué una función seleccionada no se puede quitar, o null si sí se puede.
export function motivoBloqueo(id, config) {
  const { categoria, sel } = config
  const f = funcionPorId(id)
  const cat = categoriaPorId(categoria)
  if (f.estados[categoria] === "N") return `Incluido siempre en ${articulo(cat)}`
  if (id === "privacidad" && recogeDatos(sel))
    return "Incluido siempre: el sitio recibe datos personales"
  const alguna = NUCLEO_ALGUNA[categoria]
  if (alguna?.includes(id) && alguna.filter((a) => sel[a] > 0).length === 1)
    return `${cat.nombre} necesita carrito o cuentas de usuario`
  return null
}

const articulo = (cat) =>
  ({
    personalizado: "un proyecto personalizado",
    landing: "una landing",
    varias: "un sitio de varias páginas",
    tienda: "una tienda o sistema",
  })[cat.id]

// Asegura el núcleo de la categoría, el aviso de privacidad cuando hace falta y que no queden
// funciones que no caben. Devuelve una configuración nueva.
export function normalizar(config) {
  const sel = {}
  for (const id of seleccionadas(config.sel)) {
    const f = funcionPorId(id)
    if (f && disponible(f, config.categoria)) sel[id] = config.sel[id]
  }
  for (const f of FUNCIONES) if (f.estados[config.categoria] === "N") sel[f.id] ||= 1
  const alguna = NUCLEO_ALGUNA[config.categoria]
  if (alguna && !alguna.some((id) => sel[id] > 0)) sel[alguna[0]] = 1
  // Dependencias de lo que quedó (por ejemplo, el panel que piden las cuentas).
  let cambio = true
  while (cambio) {
    cambio = false
    for (const id of seleccionadas(sel)) {
      for (const r of funcionPorId(id).requiere ?? [])
        if (!sel[r] && disponible(funcionPorId(r), config.categoria)) {
          sel[r] = 1
          cambio = true
        }
    }
  }
  if (recogeDatos(sel)) sel.privacidad ||= 1
  return { ...config, sel }
}

// Funciones del núcleo e incluidas de una categoría: lo que se marca al elegirla desde cero.
export function seleccionBase(categoria) {
  const sel = {}
  for (const f of FUNCIONES) {
    const e = f.estados[categoria]
    if (e === "N" || e === "I") sel[f.id] = 1
  }
  // En Personalizado no viene nada marcado: se construye desde cero (decisión de Ian, 25/11/2026).
  return sel
}

const leerLista = (lista) =>
  Object.fromEntries(
    lista.map((x) => {
      const [id, n] = x.split("*")
      return [id, Number(n) || 1]
    }),
  )

export function configInicial({ categoria, demo, version = "recomendada", moneda = "MXN" } = {}) {
  const punto = demo ? PUNTOS_DE_PARTIDA[demo] : null
  const cat = punto ? punto.categoria : categoriaPorId(categoria) ? categoria : "landing"
  const sel = punto ? leerLista(punto[version] ?? punto.recomendada) : seleccionBase(cat)
  return normalizar({
    categoria: cat,
    sel,
    moneda: MONEDAS[moneda] ? moneda : "MXN",
    urgencia: "normal",
    plan: "ninguno",
    pago: "unico",
    demo: punto ? demo : null,
    version: punto ? version : null,
  })
}

const diferencia = (antes, despues) => ({
  quitadas: seleccionadas(antes).filter((id) => !despues[id]),
  agregadas: seleccionadas(despues).filter((id) => !antes[id]),
})

// La categoría más pequeña, por encima de la actual, donde cabe la función con lo que requiere.
export function categoriaPara(id, categoria) {
  if (categoria === "personalizado") return null
  const actual = categoriaPorId(categoria).orden
  const cabe = (fid, cat, vistos = new Set()) => {
    if (vistos.has(fid)) return true
    vistos.add(fid)
    const f = funcionPorId(fid)
    return disponible(f, cat) && (f.requiere ?? []).every((r) => cabe(r, cat, vistos))
  }
  return (
    CATEGORIAS.filter((c) => c.orden > actual)
      .sort((a, b) => a.orden - b.orden)
      .find((c) => cabe(id, c.id))?.id ?? null
  )
}

// Quita una función y lo que dependa de ella. Las de núcleo no se quitan.
function quitar(config, id) {
  const sel = { ...config.sel }
  delete sel[id]
  let cambio = true
  while (cambio) {
    cambio = false
    for (const otra of seleccionadas(sel)) {
      const f = funcionPorId(otra)
      const falta =
        (f.requiere ?? []).some((r) => !sel[r]) ||
        (f.requiereAlguna && !f.requiereAlguna.some((r) => sel[r]))
      if (falta && f.estados[config.categoria] !== "N") {
        delete sel[otra]
        cambio = true
      }
    }
  }
  // Si ya nada recoge datos, el aviso de privacidad vuelve a ser opcional, pero se conserva:
  // quitarlo es decisión del cliente.
  return { ...config, sel }
}

// Pone una función con lo que requiere y quita lo que la excluye.
function poner(config, id, cantidad = 1) {
  let cfg = { ...config, sel: { ...config.sel } }
  const f = funcionPorId(id)
  for (const x of f.excluye ?? []) if (cfg.sel[x]) cfg = quitar(cfg, x)
  cfg.sel[id] = cantidad
  for (const r of f.requiere ?? []) if (!cfg.sel[r]) cfg = poner(cfg, r)
  if (f.requiereAlguna && !f.requiereAlguna.some((r) => cfg.sel[r]))
    cfg = poner(
      cfg,
      f.requiereAlguna.find((r) => disponible(funcionPorId(r), cfg.categoria)),
    )
  return cfg
}

// Resultado de un cambio: { config, quitadas, agregadas } o { bloqueo } o { necesitaCategoria }.
export function alternar(config, id) {
  const f = funcionPorId(id)
  if (config.sel[id]) {
    const bloqueo = motivoBloqueo(id, config)
    if (bloqueo) return { bloqueo }
    const nueva = normalizar(quitar(config, id))
    return { config: nueva, ...diferencia(config.sel, nueva.sel) }
  }
  if (
    !disponible(f, config.categoria) ||
    (f.requiere ?? []).some((r) => !disponible(funcionPorId(r), config.categoria))
  )
    return { necesitaCategoria: categoriaPara(id, config.categoria) }
  const nueva = normalizar(poner(config, id))
  return { config: nueva, ...diferencia(config.sel, nueva.sel) }
}

export function fijarCantidad(config, id, cantidad) {
  const f = funcionPorId(id)
  const n = Math.max(1, Math.min(f.cantidad ?? 1, Math.round(cantidad) || 1))
  return { ...config, sel: { ...config.sel, [id]: n } }
}

// Cambia de categoría conservando lo compatible. Lo que no cabe se informa.
export function cambiarCategoria(config, categoria) {
  const nueva = normalizar({ ...config, categoria, version: config.demo ? config.version : null })
  return { config: nueva, ...diferencia(config.sel, nueva.sel) }
}

// --- Precio y plazo ---

const redondear = (valor, paso) => Math.round(valor / paso) * paso

export function precioFuncion(f, moneda, horasBase = 0) {
  if (f.aparte) return null
  const m = MONEDAS[moneda]
  const horas = f.porcentaje ? horasBase * f.porcentaje : (f.horas[0] + f.horas[1]) / 2
  return redondear(horas * m.tarifa, m.redondeo)
}

export function calcular(config) {
  const m = MONEDAS[config.moneda]
  let hMin = 0
  let hMax = 0
  const lineas = []
  for (const f of FUNCIONES) {
    if (!config.sel[f.id] || f.porcentaje) continue
    const n = config.sel[f.id]
    if (!f.aparte) {
      hMin += f.horas[0] * n
      hMax += f.horas[1] * n
    }
    const unidad = precioFuncion(f, config.moneda)
    lineas.push({
      id: f.id,
      nombre: f.nombre,
      cantidad: n,
      precio: unidad == null ? null : unidad * n,
    })
  }
  const hMedia = (hMin + hMax) / 2
  for (const f of FUNCIONES) {
    if (!config.sel[f.id] || !f.porcentaje) continue
    lineas.push({
      id: f.id,
      nombre: f.nombre,
      cantidad: 1,
      precio: precioFuncion(f, config.moneda, hMedia),
    })
    hMin += hMin * f.porcentaje
    hMax += hMax * f.porcentaje
  }
  const funciones = lineas.reduce((s, l) => s + (l.precio ?? 0), 0)
  const calidad = redondear(funciones * PARAMETROS.calidad, m.redondeo)
  hMin *= 1 + PARAMETROS.calidad
  hMax *= 1 + PARAMETROS.calidad
  const base = funciones + calidad
  const minimo = base < m.minimo ? m.minimo - base : 0
  const proyecto = base + minimo
  const urgencias = URGENCIAS.map((u) => ({ ...u, disponible: !u.maxHoras || hMax <= u.maxHoras }))
  const u = urgencias.find((x) => x.id === config.urgencia && x.disponible) ?? urgencias[0]
  const recargo = Math.round(proyecto * u.recargo)
  const lanzamiento = -Math.round((proyecto + recargo) * PARAMETROS.lanzamiento)
  // El primer mes del plan de mantenimiento entra en el total y en el desglose (pedido de Ian,
  // 25/11/2026); los siguientes se pagan cada mes. El lanzamiento no se aplica al mantenimiento.
  // En el plan mensual, el mantenimiento es obligatorio (al menos el plan mínimo) y se paga cada
  // mes junto con el saldo, así que no entra como «primer mes» en el total del sitio.
  const mensual = config.pago === "mensual"
  const planElegido = planEfectivo(config)
  const primerMes = mensual ? 0 : planElegido.precio[config.moneda]
  const pagoUnicoNeto = proyecto + recargo + lanzamiento
  const neto = pagoUnicoNeto + primerMes
  const iva = m.iva ? Math.round(neto * PARAMETROS.iva) : 0
  const total = neto + iva
  const pagoUnico = m.iva ? Math.round(pagoUnicoNeto * (1 + PARAMETROS.iva)) : pagoUnicoNeto
  const dias = (h) => Math.max(1, Math.ceil((h / PARAMETROS.horasPorDia) * u.plazo))
  const plan = planElegido
  const mensualidadNeta = plan.precio[config.moneda]
  const mensualidad = m.iva ? Math.round(mensualidadNeta * (1 + PARAMETROS.iva)) : mensualidadNeta
  return {
    moneda: m.id,
    lineas,
    aparte: lineas.filter((l) => l.precio == null).map((l) => l.id),
    funciones,
    calidad,
    minimo,
    urgencia: u,
    urgencias,
    recargo,
    lanzamiento,
    neto,
    iva,
    total,
    primerMes,
    pagoUnico,
    pago: mensual ? planMensual(pagoUnico, mensualidad) : null,
    anticipo: Math.round(pagoUnico * PARAMETROS.anticipo),
    horas: [Math.round(hMin), Math.round(hMax)],
    dias: [dias(hMin), dias(hMax)],
    plan,
    mensualidad,
  }
}

// «Desde» y «completo» de una categoría: solo su núcleo (en Personalizado, el proyecto mínimo) y
// todo lo que cabe en ella (una unidad de cada función del sitio, sin IA ni extras de contenido, y
// sin las que chocan con su estructura).
export function rangoCategoria(categoria, moneda) {
  const vacia = { categoria, sel: {}, moneda, urgencia: "normal", plan: "ninguno" }
  const desde = calcular(normalizar(vacia))
  let cfg = normalizar({ ...vacia, sel: seleccionBase(categoria) })
  for (const f of FUNCIONES) {
    // IA y los extras de contenido son servicios aparte: no cuentan en el «completo» del sitio.
    if (!disponible(f, categoria) || cfg.sel[f.id] || f.aparte) continue
    if (f.grupo === "ia" || f.grupo === "extras") continue
    if ((f.excluye ?? []).some((x) => cfg.sel[x])) continue
    const r = alternar(cfg, f.id)
    if (r.config) cfg = r.config
  }
  return { desde: desde.total, completo: calcular(cfg).total }
}

// Plan de mantenimiento que de verdad aplica: en el plan mensual, al menos el mínimo.
export function planEfectivo(config) {
  const plan = MANTENIMIENTO.find((p) => p.id === config.plan) ?? MANTENIMIENTO[0]
  if (config.pago !== "mensual") return plan
  const minimo = MANTENIMIENTO.findIndex((p) => p.id === PARAMETROS.mensual.planMinimo)
  return MANTENIMIENTO.indexOf(plan) < minimo ? MANTENIMIENTO[minimo] : plan
}

// Plan mensual: pago inicial, saldo en meses iguales sin intereses, más el mantenimiento.
function planMensual(pagoUnico, mensualidad) {
  const { inicial: parte, meses } = PARAMETROS.mensual
  const inicial = Math.round(pagoUnico * parte)
  const saldo = pagoUnico - inicial
  const cuotaSaldo = Math.round(saldo / meses)
  return {
    inicial,
    saldo,
    meses,
    cuotaSaldo,
    cuota: cuotaSaldo + mensualidad,
    despues: mensualidad,
    totalPlazo: inicial + (cuotaSaldo + mensualidad) * meses,
  }
}

// En Personalizado: el tipo más pequeño que ya cumple lo elegido (su núcleo está y todo cabe).
// Se sugiere sin aplicarlo (sección 18.5).
export function categoriaSugerida(config) {
  if (config.categoria !== "personalizado") return null
  const ids = seleccionadas(config.sel)
  if (!ids.length) return null
  return (
    CATEGORIAS.filter((c) => c.id !== "personalizado")
      .sort((a, b) => a.orden - b.orden)
      .find((c) => {
        if (!ids.every((id) => disponible(funcionPorId(id), c.id))) return false
        const nucleo = FUNCIONES.filter((f) => f.estados[c.id] === "N").every(
          (f) => config.sel[f.id],
        )
        const alguna = NUCLEO_ALGUNA[c.id]
        return nucleo && (!alguna || alguna.some((id) => config.sel[id]))
      })?.id ?? null
  )
}

// Si el cliente quiere menos que el núcleo de un tipo, se le ofrece el inmediatamente inferior.
export function categoriaInferior(categoria) {
  return { tienda: "varias", varias: "landing", landing: "personalizado" }[categoria] ?? null
}

// «2 días hábiles» o «de 3 a 5 días hábiles».
export function textoPlazo([a, b]) {
  if (a === b) return `${a} ${a === 1 ? "día hábil" : "días hábiles"}`
  return `de ${a} a ${b} días hábiles`
}

// --- Moneda, folio y dirección ---

const EUROPA =
  /^(de|fr|it|nl|pt-PT|es-ES|ca|eu|gl|fi|sv|da|el|pl|cs|sk|hu|ro|bg|hr|sl|et|lv|lt|ga|mt)\b/
export function monedaPorIdioma(idioma = "es-MX") {
  if (/-MX$/i.test(idioma) || idioma === "es") return "MXN"
  if (EUROPA.test(idioma) || /-(ES|DE|FR|IT|NL|PT|IE|AT|BE|FI|GR)$/i.test(idioma)) return "EUR"
  return "USD"
}

export function crearFolio(fecha = new Date(), azar = Math.random) {
  const p = (n) => String(n).padStart(2, "0")
  const codigo = Math.floor(azar() * 36 ** 4)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
  return `C-${String(fecha.getFullYear()).slice(2)}${p(fecha.getMonth() + 1)}${p(fecha.getDate())}-${codigo}`
}

// La configuración viaja en la dirección para sobrevivir a recargas y poder compartirse.
export function aParametros(config) {
  const p = new URLSearchParams()
  if (config.demo) {
    p.set("demo", config.variante ?? config.demo)
    p.set("version", config.version)
  }
  p.set("tipo", config.categoria)
  p.set(
    "f",
    seleccionadas(config.sel)
      .map((id) => (config.sel[id] > 1 ? `${id}*${config.sel[id]}` : id))
      .join(","),
  )
  p.set("moneda", config.moneda)
  if (config.urgencia !== "normal") p.set("urgencia", config.urgencia)
  if (config.plan !== "ninguno") p.set("plan", config.plan)
  if (config.pago === "mensual") p.set("pago", "mensual")
  return p
}

export function deParametros(params, monedaPorDefecto = "MXN") {
  // Las variantes (psicologo-sala, vertice, rubor…) se cotizan como su demo y se recuerdan.
  const demoParam = params.get("demo") ?? ""
  const encontrada = demoPorId(demoParam)
  const demo = encontrada && PUNTOS_DE_PARTIDA[encontrada.id] ? encontrada.id : null
  const variante = demo ? (encontrada.variantes.find((v) => v.id === demoParam)?.id ?? null) : null
  const moneda = MONEDAS[params.get("moneda")] ? params.get("moneda") : monedaPorDefecto
  const version = ["esencial", "recomendada", "completa"].includes(params.get("version"))
    ? params.get("version")
    : "recomendada"
  let config = configInicial({ categoria: params.get("tipo"), demo, version, moneda })
  if (params.get("f") != null && params.get("tipo")) {
    const sel = {}
    for (const x of params.get("f").split(",").filter(Boolean)) {
      const [id, n] = x.split("*")
      const f = funcionPorId(id)
      if (f) sel[id] = Math.max(1, Math.min(f.cantidad ?? 1, Number(n) || 1))
    }
    config = normalizar({
      ...config,
      categoria: categoriaPorId(params.get("tipo")) ? params.get("tipo") : config.categoria,
      sel,
    })
  }
  if (URGENCIAS.some((u) => u.id === params.get("urgencia")))
    config.urgencia = params.get("urgencia")
  if (MANTENIMIENTO.some((p) => p.id === params.get("plan"))) config.plan = params.get("plan")
  if (params.get("pago") === "mensual") config.pago = "mensual"
  if (variante && config.demo) config.variante = variante
  return config
}
