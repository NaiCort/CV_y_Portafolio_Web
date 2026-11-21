// Catálogo de demos: fuente única para el portafolio, el futuro cotizador y las pruebas
// (Sitio Profesional Integral V1.4, secciones 8, 27 y 29). Cada demo y cada variante tiene un
// identificador estable que no debe cambiar aunque cambien su nombre o su ruta: el cotizador
// lo usará para precargar «un sitio como este».
//
// Estados (sección 27.1):
// - disponible: experiencia navegable publicada; se enlaza.
// - desarrollo: incorporada al plan pero sin concluir; se muestra sin prometer una demo completa.
// - proximamente: ficha sin experiencia publicada; nunca se presenta como funcional.
// - mantenimiento: publicada, con ajustes en curso; se avisa si algo no está disponible.

export const ESTADOS = {
  disponible: "Disponible",
  desarrollo: "En desarrollo",
  proximamente: "Próximamente",
  mantenimiento: "En mantenimiento",
}

export const DEMOS = [
  {
    id: "psicologo",
    giro: "Psicólogo",
    nombre: "Consultorio de psicología",
    ruta: "/psicologo",
    estado: "disponible",
    version: "V4.1.3",
    resumen: "Consultas, citas y un primer acercamiento sin fricción, en cuatro estilos.",
    variantes: [
      { id: "psicologo-calido", nombre: "Cálido", tema: "calido" },
      { id: "psicologo-minimalista", nombre: "Minimalista", tema: "minimalista" },
      { id: "psicologo-clinico", nombre: "Clínico", tema: "clinico" },
      { id: "psicologo-naturaleza", nombre: "Naturaleza", tema: "naturaleza" },
    ],
    funciones: ["una-pagina", "citas", "whatsapp", "formulario-contacto", "temas"],
  },
  {
    id: "patio-12",
    giro: "Restaurante",
    nombre: "Patio 12",
    ruta: "/restaurante",
    estado: "disponible",
    version: "V4.2.5",
    resumen: "Carta, pedido con seguimiento y reserva de mesa, en tres locales.",
    variantes: [],
    funciones: ["varias-paginas", "carta", "carrito", "reservas", "seguimiento", "sucursales"],
  },
  {
    id: "ladera",
    giro: "Café",
    nombre: "Ladera",
    ruta: "/cafe",
    estado: "disponible",
    version: "V4.3.6",
    resumen: "Café de altura: pedido para recoger, alérgenos, tamaños y recetas en casa.",
    variantes: [],
    funciones: ["varias-paginas", "carta", "carrito", "mapa", "privacidad"],
  },
  {
    id: "brio",
    giro: "Gimnasio",
    nombre: "Brío",
    ruta: "/gimnasio",
    estado: "disponible",
    version: "V4.4.8",
    resumen: "Cinco sucursales, clases con reserva, planes y alta, área de socio y tienda.",
    variantes: [
      { id: "brio-cobalto", nombre: "Cobalto", tema: "cobalto" },
      { id: "brio-distrito", nombre: "Distrito", tema: "distrito" },
    ],
    funciones: ["varias-paginas", "reservas", "planes", "area-cliente", "tienda", "sucursales"],
  },
  {
    id: "taller",
    giro: "Taller mecánico",
    nombre: "Rosales y Vértice",
    ruta: "/taller",
    estado: "disponible",
    version: "V4.5.6",
    resumen: "Testigos del tablero, presupuesto con visto bueno por partida y citas.",
    variantes: [
      { id: "rosales", nombre: "Mecánica Rosales", tema: "rosales" },
      { id: "vertice", nombre: "Vértice", tema: "vertice" },
    ],
    funciones: ["varias-paginas", "citas", "presupuesto", "calculadora", "area-cliente", "mapa"],
  },
  {
    id: "cotejo",
    giro: "Despacho contable",
    nombre: "Cotejo",
    ruta: "/despacho",
    estado: "disponible",
    version: "V4.6.8",
    resumen: "Tu expediente con semáforo, precios por régimen y herramientas fiscales.",
    variantes: [],
    funciones: ["varias-paginas", "cotizacion", "diagnostico", "calculadora", "area-cliente"],
  },
  {
    id: "revista",
    giro: "Revista digital",
    nombre: "Rubor, Prisma y Umbral",
    ruta: "/revista",
    estado: "disponible",
    version: "V4.7.21",
    resumen: "Tres revistas: moda para hojear, ciencia en acceso abierto y carteles de fotografía.",
    variantes: [
      { id: "rubor", nombre: "Rubor", ruta: "/revista/rubor" },
      { id: "prisma", nombre: "Prisma", ruta: "/revista/prisma" },
      { id: "umbral", nombre: "Umbral", ruta: "/revista/umbral" },
    ],
    funciones: ["varias-paginas", "lectura", "suscripcion", "area-cliente", "musica"],
  },
]

export const demoPorId = (id) =>
  DEMOS.find((d) => d.id === id || d.variantes.some((v) => v.id === id)) ?? null

export const disponible = (demo) => demo.estado === "disponible" || demo.estado === "mantenimiento"
