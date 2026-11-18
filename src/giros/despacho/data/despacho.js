// Cotejo, despacho contable ficticio (docs/FICHA_DESPACHO.md). Personas, clientes, cédula,
// precios y cifras son de ejemplo. Precios aproximados en pesos, con IVA incluido.
export const DESPACHO = {
  nombre: "Cotejo",
  completo: "Cotejo, contadores y asesores",
  telefono: "228 815 4470",
  horario: "Lunes a viernes de 9:00 a 18:00",
  direccion: "Xalapa, Veracruz",
  contadora: {
    nombre: "Elena Murrieta",
    titulo: "C.P.C.",
    iniciales: "EM",
    detalle:
      "Contadora pública con cédula profesional, certificada por el IMCP y con 18 años de experiencia. Revisa cada declaración antes de presentarla.",
  },
}

export const REGIMENES = [
  {
    id: "sueldos",
    nombre: "Sueldos y salarios",
    para: "Para quien solo recibe sueldo y quiere hacer su declaración anual o recuperar su saldo a favor.",
    precio: 900,
    unidad: "al año",
    incluye: [
      "Declaración anual con deducciones personales",
      "Seguimiento del saldo a favor",
      "Revisión de tus facturas de gastos",
    ],
  },
  {
    id: "resico",
    nombre: "RESICO persona física",
    para: "Para quien cobra por su cuenta y factura menos de $3.5 millones al año.",
    precio: 690,
    unidad: "al mes",
    incluye: [
      "Declaraciones mensuales y anual",
      "Hasta 30 facturas al mes",
      "Previo el día 10 y semáforo en tu expediente",
      "WhatsApp con tu contadora",
    ],
  },
  {
    id: "plataformas",
    nombre: "Plataformas digitales",
    para: "Para quien gana con apps: transporte, hospedaje o ventas en línea.",
    precio: 490,
    unidad: "al mes",
    incluye: [
      "Declaraciones mensuales y anual",
      "Conciliación de las retenciones de cada plataforma",
      "Previo el día 10 y semáforo en tu expediente",
    ],
  },
  {
    id: "arrendamiento",
    nombre: "Arrendamiento",
    para: "Para quien renta casas, departamentos o locales.",
    precio: 790,
    unidad: "al mes",
    incluye: [
      "Declaraciones mensuales y anual",
      "Facturas a tus inquilinos",
      "Deducción opcional o de gastos, la que te convenga",
    ],
  },
  {
    id: "empresarial",
    nombre: "Actividad empresarial",
    para: "Para negocios de una persona física con gastos que deducir o empleados.",
    precio: 1290,
    unidad: "al mes",
    incluye: [
      "Contabilidad completa y declaraciones",
      "Hasta 60 facturas al mes",
      "Contabilidad electrónica",
      "Asesoría trimestral para no llevarte sorpresas",
    ],
  },
  {
    id: "moral",
    nombre: "Persona moral",
    para: "Para sociedades y pymes. El precio sube con las facturas y la nómina.",
    precio: 3900,
    unidad: "al mes",
    incluye: [
      "Contabilidad, impuestos y contabilidad electrónica",
      "Hasta 100 facturas al mes",
      "DIOT y opinión de cumplimiento cada mes",
      "Estados financieros y junta trimestral",
    ],
  },
]

export const SERVICIOS = [
  ["Contabilidad e impuestos", "Personas físicas, RESICO y personas morales"],
  ["Nómina e IMSS", "Recibos, cuotas obrero-patronales e INFONAVIT"],
  ["Facturación", "Emisión y revisión de facturas"],
  ["Constitución de empresas", "Acta, alta en el SAT y primeras obligaciones"],
  ["Defensa ante el SAT", "Requerimientos, multas y sellos bloqueados"],
  ["Dictamen y auditoría", "Por contador público inscrito ante el SAT"],
  ["Regularización", "Declaraciones atrasadas y saldos a favor"],
  ["Declaración anual", "Personas morales en marzo; físicas en abril"],
  ["Asesoría y planeación", "Proyección trimestral para no llevarte sorpresas"],
]

// Cómo se trabaja cada mes, con fechas (no pasos numerados).
export const MES = [
  ["Del 1 al 5", "Nos mandas lo que falte", "Estados de cuenta y facturas que no estén en el SAT."],
  ["Día 10", "Te enviamos el previo", "Cuánto vas a pagar y por qué, para que lo apruebes."],
  ["Antes del 17", "Presentamos y pagas", "Con tu visto bueno; te damos la línea de captura."],
  [
    "Al presentar",
    "Te dejamos el acuse",
    "En tu expediente, junto con la opinión de cumplimiento.",
  ],
]

export const HERRAMIENTAS = [
  ["Diagnóstico gratuito", "Cinco preguntas: tu régimen, tus riesgos y qué plan te conviene."],
  ["Calendario fiscal", "Lo que te vence este mes según tu régimen."],
  ["Calculadoras", "RESICO, aguinaldo y finiquito, orientativas."],
  ["Tu expediente", "Aprueba el previo y sube lo que te pedimos, sin contraseña."],
]

export const findRegimen = (id) => REGIMENES.find((r) => r.id === id)
