// Membresías de ejemplo, precios mensuales en MXN con IVA incluido.
export const PLANES = [
  { id: "acceso", nombre: "Acceso", lema: "Para entrenar por tu cuenta", precio: 549 },
  { id: "club", nombre: "Club", lema: "El que elige la mayoría", precio: 949, destacado: true },
  { id: "total", nombre: "Total", lema: "Todo incluido", precio: 1490 },
]

// Cada fila dice qué incluye cada plan, en palabras. `null` significa que no lo incluye.
export const FILAS = [
  {
    concepto: "Máquinas, regaderas y locker",
    acceso: "En las 5 sucursales",
    club: "En las 5 sucursales",
    total: "En las 5 sucursales, locker fijo",
  },
  {
    concepto: "Clases grupales",
    acceso: null,
    club: "Ilimitadas, con reserva",
    total: "Ilimitadas, reserva 48 h antes",
  },
  {
    concepto: "Coach personal",
    acceso: "Plan inicial en la app",
    club: "2 sesiones al mes",
    total: "4 sesiones al mes y plan semanal",
  },
  {
    concepto: "Incluido sin costo",
    acceso: null,
    club: "Toalla",
    total: "Toalla, bebida de proteína diaria y evaluación InBody mensual",
  },
  {
    concepto: "Invitados",
    acceso: "1 pase al mes",
    club: "3 pases al mes",
    total: "Uno en cada visita",
  },
]
