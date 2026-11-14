// Contenido del alta simulada. El reglamento es de ejemplo; el cuestionario de salud solo se
// describe: por decisión de Ian, la demo no pide datos de salud a quien la visita.
export const PASOS = ["Plan", "Cuenta", "Salud", "Reglamento", "Pago"]

// Temas del cuestionario de preparación para la actividad física que usan muchos gimnasios
// (tipo PAR-Q). Se resumen con palabras propias; no se reproduce ningún formulario oficial.
export const TEMAS_SALUD = [
  "Si un médico te ha dicho que tienes alguna condición del corazón",
  "Si sientes dolor en el pecho al hacer actividad física o en reposo",
  "Si pierdes el equilibrio por mareos o has perdido el conocimiento",
  "Si tienes algún problema de huesos o articulaciones que empeore con el ejercicio",
  "Si tomas medicamentos para la presión arterial o el corazón",
  "Si conoces cualquier otra razón por la que no debas hacer actividad física",
]

export const REGLAMENTO = [
  "Usa toalla en máquinas y bancos, y limpia el equipo al terminar.",
  "Regresa discos y mancuernas a su lugar.",
  "Reserva tus clases y cancela con 2 horas de anticipación para liberar tu lugar.",
  "Entra con tu propio pase; los pases de invitado se activan desde tu perfil.",
  "Sigue las indicaciones del personal y de los coaches en todo momento.",
]

export const METODOS_PAGO = [
  {
    id: "recepcion",
    nombre: "En recepción, en tu primera visita",
    nota: "Pagas el primer mes al llegar. No se pide ningún dato de pago aquí.",
  },
  {
    id: "domiciliacion",
    nombre: "Cargo mensual a tarjeta",
    nota: "Simulado: en un club real capturarías tu tarjeta en una página segura del banco. Aquí no se pide ningún número.",
  },
]
