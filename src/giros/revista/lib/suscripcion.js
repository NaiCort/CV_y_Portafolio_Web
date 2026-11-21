export const CLAVE_PLAN = "revista-rubor-plan"
export const precios = { mensual: "79 MXN cada mes", anual: "790 MXN cada año" }
export function leerPlan() {
  try {
    const p = localStorage.getItem(CLAVE_PLAN)
    return Object.hasOwn(precios, p) ? p : ""
  } catch {
    return ""
  }
}
