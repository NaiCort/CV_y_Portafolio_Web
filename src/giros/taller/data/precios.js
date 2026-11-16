// Lista de precios completa de cada taller (ejemplo). Pesos con IVA incluido; «desde» porque el
// precio final depende del auto y se confirma por escrito antes de trabajar.
export const LISTAS = {
  rosales: [
    {
      categoria: "Mantenimiento",
      servicios: [
        ["Cambio de aceite y filtro", "Sintético, motor de 4 cilindros", 780],
        ["Afinación menor", "Bujías y filtro de aire", 950],
        ["Afinación mayor", "Bujías, filtros y limpieza de inyectores", 1450],
        ["Cambio de anticongelante", "Lavado del sistema incluido", 620],
      ],
    },
    {
      categoria: "Frenos",
      servicios: [
        ["Balatas delanteras", "Incluye rectificar discos si hace falta", 950],
        ["Balatas traseras de tambor", "Ajuste del freno de mano incluido", 850],
        ["Rectificado de discos", "El par", 380],
        ["Cambio de líquido de frenos", "Purga de las cuatro ruedas", 450],
      ],
    },
    {
      categoria: "Suspensión y dirección",
      servicios: [
        ["Revisión de suspensión", "Con el auto en el elevador", 0],
        ["Amortiguador", "Cada uno", 1180],
        ["Rótulas", "El par", 1100],
      ],
    },
    {
      categoria: "Eléctrico",
      servicios: [
        ["Diagnóstico con escáner", "Se descuenta si hacemos la reparación", 350],
        ["Revisión de alternador y marcha", "Con medición de carga", 300],
        ["Cambio de batería", "Mano de obra; la batería se cotiza aparte", 150],
      ],
    },
    {
      categoria: "Otros",
      servicios: [
        ["Revisión antes de comprar un usado", "Reporte por escrito con fotos", 600],
        ["Mecánico a domicilio en la colonia", "Hasta 3 km del taller", 250],
        ["Revisión de presión y ponchaduras", "Aunque no sea cita", 0],
      ],
    },
  ],
  vertice: [
    {
      categoria: "Mantenimiento por kilometraje",
      servicios: [
        ["Servicio de 10,000, 30,000 o 60,000 km", "Aceite, filtros y revisión de 30 puntos", 2190],
        ["Servicio de 20,000 o 40,000 km", "Además, líquido de frenos y filtro de cabina", 2690],
        ["Servicio de 80,000 km", "Además, bujías y banda de accesorios", 4890],
      ],
    },
    {
      categoria: "Diagnóstico",
      servicios: [["Diagnóstico computarizado", "Reporte con fotos y video a tu WhatsApp", 450]],
    },
    {
      categoria: "Llantas y alineación",
      servicios: [
        ["Alineación y balanceo", "Equipo 3D con informe impreso", 690],
        ["Montaje y balanceo", "Por llanta", 150],
        ["Rotación de llantas", "Las cuatro", 250],
      ],
    },
    {
      categoria: "Frenos",
      servicios: [
        ["Balatas delanteras", "Refacción original o equivalente", 1290],
        ["Discos delanteros", "El par, con balatas", 2480],
      ],
    },
    {
      categoria: "Híbridos (sucursal Arco Sur)",
      servicios: [
        ["Revisión de híbridos", "Batería de alto voltaje, inversor y frenos regenerativos", 1890],
        ["Prueba de batería de alto voltaje", "Estado de cada módulo", 990],
      ],
    },
    {
      categoria: "Hojalatería y pintura (sucursal Ánimas)",
      servicios: [
        ["Valoración de daños", "Con o sin aseguradora", 0],
        ["Pintura por pieza", "Igualación de color por computadora", 2800],
      ],
    },
  ],
}

// Reglas que vienen del contrato tipo de Profeco y la ley (iguales en los dos talleres).
export const REGLAS = [
  "Presupuesto por escrito antes de trabajar, con refacciones, mano de obra y vigencia.",
  "Si no aceptas el presupuesto, pagas solo el diagnóstico.",
  "Si durante el trabajo el total sube más de 20 %, te pedimos autorización por escrito; nosotros la pedimos siempre.",
  "Refacciones nuevas, salvo que autorices usadas o reconstruidas.",
  "Las piezas cambiadas te las regresamos al entregar, salvo residuos peligrosos o las de garantía.",
  "Comprobante con el desglose de cada trabajo.",
  "Puedes cancelar sin costo si el servicio no ha empezado, dentro de cinco días hábiles.",
  "Si no recoges el auto en 48 horas después de avisarte, se cobra depósito.",
]

export const PAGOS = {
  rosales: "Efectivo, tarjeta de débito o crédito y transferencia.",
  vertice:
    "Efectivo, tarjetas, transferencia y meses sin intereses con tarjetas participantes desde $3,000.",
}
