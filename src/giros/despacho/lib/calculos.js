// Calculadoras orientativas: RESICO, aguinaldo y finiquito. Cifras de 2026 (UMA vigente del
// 1 de febrero de 2026 al 31 de enero de 2027, publicada por el INEGI). No sustituyen un cálculo
// formal.
export const UMA_DIARIA = 117.31

// Tabla mensual de ISR de RESICO para personas físicas (art. 113-E de la LISR).
export const TABLA_RESICO = [
  [25000, 0.01],
  [50000, 0.011],
  [83333.33, 0.015],
  [208333.33, 0.02],
  [3500000, 0.025],
]

const redondea = (n) => Math.round(n * 100) / 100

export function isrResico(ingresos, aPersonasMorales = 0) {
  const tramo = TABLA_RESICO.find(([limite]) => ingresos <= limite) ?? TABLA_RESICO.at(-1)
  const tasa = tramo[1]
  const isr = redondea(ingresos * tasa)
  const retenido = redondea(Math.min(aPersonasMorales, ingresos) * 0.0125)
  return { tasa, isr, retenido, aPagar: redondea(Math.max(0, isr - retenido)) }
}

export function aguinaldo(salarioDiario, diasTrabajados, diasAguinaldo = 15) {
  const proporcion = Math.min(diasTrabajados, 365) / 365
  const bruto = redondea(salarioDiario * diasAguinaldo * proporcion)
  const exento = redondea(Math.min(bruto, UMA_DIARIA * 30))
  return { bruto, exento, gravado: redondea(bruto - exento) }
}

// Días de vacaciones por año de servicio (LFT, reforma de 2023): 12 el primero, dos más por año
// hasta 20 en el quinto, y dos más cada cinco años.
export function diasVacaciones(anios) {
  const n = Math.max(1, Math.floor(anios))
  if (n <= 5) return 10 + 2 * n
  return 20 + 2 * Math.floor((n - 1) / 5)
}

const DIA = 86400000
// Fechas «aaaa-mm-dd» en hora local, para que la zona horaria no mueva el día.
const fecha = (f) => (typeof f === "string" ? new Date(`${f}T00:00`) : new Date(f))

export function finiquito({ salarioDiario, ingreso, salida, vacacionesTomadas = 0 }) {
  const inicio = fecha(ingreso)
  const fin = fecha(salida)
  if (!(fin > inicio)) return null
  const aniosServicio = (fin - inicio) / DIA / 365
  const inicioAnio = new Date(fin.getFullYear(), 0, 1)
  const diasAnio = Math.floor((fin - (inicio > inicioAnio ? inicio : inicioAnio)) / DIA) + 1
  // Vacaciones del año de servicio en curso, en proporción.
  const aniosCompletos = Math.floor(aniosServicio)
  const ultimoAniversario = new Date(inicio)
  ultimoAniversario.setFullYear(inicio.getFullYear() + aniosCompletos)
  const diasDesdeAniversario = Math.max(0, (fin - ultimoAniversario) / DIA)
  const vacacionesProporcionales = (diasVacaciones(aniosCompletos + 1) * diasDesdeAniversario) / 365
  const diasVac = Math.max(0, redondea(vacacionesProporcionales - vacacionesTomadas))
  const vacaciones = redondea(diasVac * salarioDiario)
  const prima = redondea(vacaciones * 0.25)
  const agui = aguinaldo(salarioDiario, diasAnio).bruto
  return {
    aniosServicio: redondea(aniosServicio),
    diasAnio,
    diasVacaciones: diasVac,
    aguinaldo: agui,
    vacaciones,
    prima,
    total: redondea(agui + vacaciones + prima),
  }
}
