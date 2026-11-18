import { COSTO_EMPLEADO, COSTO_FACTURAS, findRegimen } from "../data/despacho"

// Iguala aproximada según régimen, facturas al mes y empleados. Es orientativa: el despacho
// confirma el precio por escrito después de revisar el caso.
export function estimar({ regimen, facturas = 0, empleados = 0 }) {
  const r = findRegimen(regimen)
  if (!r) return null
  let base = r.precio
  if (r.facturas !== null && facturas > r.facturas)
    base += Math.ceil((facturas - r.facturas) / 10) * COSTO_FACTURAS
  const mensual = r.unidad === "al mes"
  if (mensual) base += Math.max(0, empleados) * COSTO_EMPLEADO
  const redondea = (n) => Math.round(n / 10) * 10
  return {
    regimen: r,
    minimo: redondea(base),
    maximo: redondea(base * 1.2),
    unidad: r.unidad,
    nomina: mensual && empleados > 0,
  }
}

export const telefonoValido = (t) => String(t).replace(/\D/g, "").length === 10

export function folioCotizacion(ahora = new Date()) {
  return `COT-${ahora.getTime().toString(36).toUpperCase().slice(-5)}`
}
