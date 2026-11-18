// Calendario fiscal simplificado por régimen. Si una fecha cae en sábado o domingo pasa al lunes
// (no se consideran días festivos). Orientativo; las fechas exactas las publica el SAT.
export const PERFILES = [
  ["resico", "RESICO persona física"],
  ["plataformas", "Plataformas digitales"],
  ["arrendamiento", "Arrendamiento"],
  ["empresarial", "Actividad empresarial"],
  ["moral", "Persona moral"],
  ["sueldos", "Sueldos y salarios"],
]

const habil = (anio, mes, dia) => {
  const d = new Date(anio, mes, dia)
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1)
  return d
}
const ultimoDia = (anio, mes) => new Date(anio, mes + 1, 0).getDate()

// Obligaciones del mes `mes` (0 = enero) para un perfil, con o sin empleados.
export function obligaciones(perfil, anio, mes, conEmpleados = false) {
  const lista = []
  const anterior = new Date(anio, mes - 1, 1).toLocaleDateString("es-MX", { month: "long" })
  const agrega = (fecha, nombre, detalle) => lista.push({ fecha, nombre, detalle })
  const mensual = perfil !== "sueldos"
  if (mensual)
    agrega(habil(anio, mes, 17), "ISR e IVA del mes", `Pago de lo que corresponde a ${anterior}.`)
  if (mensual && conEmpleados) {
    agrega(
      habil(anio, mes, 17),
      "Retenciones e IMSS",
      `ISR de sueldos y cuotas del IMSS de ${anterior}.`,
    )
    if (mes % 2 === 0)
      agrega(habil(anio, mes, 17), "Retiro e INFONAVIT", "Aportaciones del bimestre anterior.")
  }
  if (perfil === "moral")
    agrega(
      habil(anio, mes, 3),
      "Contabilidad electrónica",
      "Balanza de comprobación del segundo mes anterior.",
    )
  if (perfil === "empresarial")
    agrega(
      habil(anio, mes, 5),
      "Contabilidad electrónica",
      "Balanza de comprobación del segundo mes anterior.",
    )
  if (["moral", "empresarial", "arrendamiento"].includes(perfil))
    agrega(
      new Date(anio, mes, ultimoDia(anio, mes)),
      "DIOT",
      `Operaciones con proveedores de ${anterior}.`,
    )
  if (perfil === "moral" && mes === 2)
    agrega(new Date(anio, 2, 31), "Declaración anual", "De la persona moral, del año anterior.")
  if (perfil !== "moral" && mes === 3)
    agrega(new Date(anio, 3, 30), "Declaración anual", "De personas físicas, del año anterior.")
  if (perfil === "moral" && mes === 4)
    agrega(new Date(anio, 4, 30), "Reparto de utilidades", "Fecha límite para pagar la PTU.")
  return lista.sort((a, b) => a.fecha - b.fecha)
}
