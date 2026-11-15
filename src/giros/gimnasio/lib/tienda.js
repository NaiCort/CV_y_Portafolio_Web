import { findPaquete, nombrePaquete } from "../data/coaches"
import { findProducto } from "../data/tienda"

// Carrito y pedidos de la tienda simulada. Se guardan en este navegador; nada se cobra ni se
// envía. Los paquetes de sesiones personales van en el mismo carrito que los productos.
export const TIENDA_KEY = "brio-tienda-v1"
export const DESCUENTO_SOCIO = 0.1
export const MAXIMO_POR_LINEA = 5
export const ESTADO_TIENDA = { carrito: [], pedidos: [] }

export function cargarTienda(storage) {
  try {
    const d = JSON.parse(storage?.getItem(TIENDA_KEY) || "null")
    if (!d || !Array.isArray(d.carrito) || !Array.isArray(d.pedidos)) return ESTADO_TIENDA
    return {
      carrito: d.carrito.filter((l) => articulo(l)),
      pedidos: d.pedidos,
    }
  } catch {
    return ESTADO_TIENDA
  }
}
export function guardarTienda(storage, estado) {
  try {
    storage?.setItem(TIENDA_KEY, JSON.stringify(estado))
  } catch {
    /* Sin almacenamiento el carrito dura mientras la página esté abierta. */
  }
}

export const precioSocio = (precio) => Math.round(precio * (1 - DESCUENTO_SOCIO))
export const claveDe = (tipo, id, variante) => `${tipo}:${id}:${variante || ""}`

// Datos para mostrar una línea del carrito, sea producto o paquete.
export function articulo(linea) {
  if (linea.tipo === "paquete") {
    const p = findPaquete(linea.id)
    return p && { nombre: nombrePaquete(p), precio: p.precio, detalle: "60 min cada una" }
  }
  const p = findProducto(linea.id)
  return p && { nombre: p.nombre, precio: p.precio, detalle: linea.variante || p.detalle }
}

export function cuentas(carrito, esSocio) {
  let subtotal = 0
  let descuento = 0
  let piezas = 0
  for (const l of carrito) {
    const a = articulo(l)
    subtotal += a.precio * l.cantidad
    if (esSocio) descuento += (a.precio - precioSocio(a.precio)) * l.cantidad
    piezas += l.cantidad
  }
  const total = subtotal - descuento
  // Los precios ya incluyen IVA (16 %): se desglosa, no se suma.
  const iva = Math.round(((total * 16) / 116) * 100) / 100
  return { subtotal, descuento, total, iva, piezas }
}

// Existencias de ejemplo por sucursal, fijas para cada par producto–sucursal.
export function existencias(productoId, sucursalId) {
  let h = 7
  for (const c of `${productoId}|${sucursalId}`) h = (h * 31 + c.charCodeAt(0)) % 9973
  const n = h % 7
  return n === 1 ? 0 : n
}

// La recepción entrega pedidos de 9:00 a 20:00 en todas las sucursales.
export const ENTREGAS = [9, 20]

// Cuándo estaría listo un pedido: dos horas después de apartarlo, dentro del horario de
// entregas; si falta alguna pieza en la sucursal, llega en dos días.
export function listoPara(ahora, faltaAlgo) {
  const [abre, cierra] = ENTREGAS
  const f = new Date(ahora)
  if (faltaAlgo) {
    f.setDate(f.getDate() + 2)
    f.setHours(abre, 0, 0, 0)
    return f
  }
  f.setMinutes(f.getMinutes() + 120)
  f.setMinutes(f.getMinutes() <= 30 ? 30 : 60, 0, 0)
  const mismoDia = f.toDateString() === new Date(ahora).toDateString()
  if (mismoDia && f.getHours() < abre) f.setHours(abre, 0, 0, 0)
  else if (!mismoDia || f.getHours() + f.getMinutes() / 60 > cierra) {
    const m = new Date(ahora)
    m.setDate(m.getDate() + 1)
    m.setHours(abre, 0, 0, 0)
    return m
  }
  return f
}

export function tiendaReducer(estado, accion) {
  switch (accion.type) {
    case "agregar": {
      const clave = claveDe(accion.tipo, accion.id, accion.variante)
      const previa = estado.carrito.find((l) => l.clave === clave)
      const carrito = previa
        ? estado.carrito.map((l) =>
            l.clave === clave
              ? { ...l, cantidad: Math.min(MAXIMO_POR_LINEA, l.cantidad + accion.cantidad) }
              : l,
          )
        : [
            ...estado.carrito,
            {
              clave,
              tipo: accion.tipo,
              id: accion.id,
              variante: accion.variante || null,
              cantidad: Math.min(MAXIMO_POR_LINEA, accion.cantidad),
            },
          ]
      return { ...estado, carrito }
    }
    case "cantidad":
      return {
        ...estado,
        carrito: estado.carrito
          .map((l) =>
            l.clave === accion.clave
              ? { ...l, cantidad: Math.max(0, Math.min(MAXIMO_POR_LINEA, accion.cantidad)) }
              : l,
          )
          .filter((l) => l.cantidad > 0),
      }
    case "quitar":
      return { ...estado, carrito: estado.carrito.filter((l) => l.clave !== accion.clave) }
    case "apartar": {
      const { sucursal, nombre, ahora, esSocio } = accion
      const faltaAlgo = estado.carrito.some(
        (l) => l.tipo === "producto" && existencias(l.id, sucursal) < l.cantidad,
      )
      const c = cuentas(estado.carrito, esSocio)
      const pedido = {
        id: `PED-${String(ahora).slice(-5)}`,
        fecha: new Date(ahora).toISOString(),
        sucursal,
        nombre: nombre.trim().slice(0, 40),
        lineas: estado.carrito.map((l) => {
          const a = articulo(l)
          return {
            tipo: l.tipo,
            nombre: a.nombre,
            detalle: a.detalle,
            cantidad: l.cantidad,
            precio: esSocio ? precioSocio(a.precio) : a.precio,
          }
        }),
        total: c.total,
        descuento: c.descuento,
        soloPaquetes: estado.carrito.every((l) => l.tipo === "paquete"),
        listo: listoPara(ahora, faltaAlgo).toISOString(),
        estado: "apartado",
      }
      return { carrito: [], pedidos: [...estado.pedidos, pedido] }
    }
    case "cancelarPedido":
      return {
        ...estado,
        pedidos: estado.pedidos.map((p) =>
          p.id === accion.id ? { ...p, estado: "cancelado" } : p,
        ),
      }
    case "borrar":
      return ESTADO_TIENDA
    default:
      return estado
  }
}
