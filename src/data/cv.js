// Datos del CV web (Sitio Profesional Integral V1.4, sección 5). Fuente: CV de noviembre de 2026,
// que manda cuando difiere del CV visual V2; del V2 se toman los roles por puesto, los cursos
// relevantes de Mecatrónica y el seguimiento de entregables en Fiverr. El CV web, el PDF y
// LinkedIn deben decir lo mismo: un cambio aquí se replica en los otros dos.
// Las claves de texto están pensadas para añadir el inglés (sección 25) sin cambiar la forma.

import { LINKEDIN_URL, WHATSAPP_NUMBER } from "../components/shared/contactInfo"

// `fechas`: [inicio, fin] en "AAAA-MM" o solo "AAAA" cuando no se conoce el mes; fin null = en
// curso. Las usa la línea de tiempo; el texto visible sigue siendo `periodo`.
export const CV_VERSION = { fecha: "2026-11", etiqueta: "Noviembre de 2026" }

export const PERSONA = {
  nombre: "Ian Habid Aldana Martínez",
  titulo: "Ingeniero en Sistemas Computacionales",
  enfoque: ["SQL", "PostgreSQL", "Backend", "Datos Jr"],
  ciudad: "Xalapa, Veracruz, México",
}

export const CONTACTO = [
  {
    id: "telefono",
    campo: "teléfono",
    etiqueta: "Teléfono y WhatsApp",
    texto: "+52 228 162 8345",
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    id: "correo",
    campo: "correo",
    etiqueta: "Correo",
    texto: "ian.martinez2610@gmail.com",
    url: "mailto:ian.martinez2610@gmail.com",
  },
  {
    id: "linkedin",
    campo: "linkedin",
    etiqueta: "LinkedIn",
    texto: "in/ian-almarti",
    url: LINKEDIN_URL,
  },
  {
    id: "github",
    campo: "github",
    etiqueta: "GitHub",
    texto: "NaiCort",
    url: "https://github.com/NaiCort",
  },
]

export const DOCUMENTOS = [
  {
    id: "cv-texto",
    etiqueta: "CV en texto (PDF)",
    url: "/cv/cv-ian-aldana-noviembre-2026.pdf",
    disponible: true,
  },
  // El CV visual se publicará cuando Ian lo actualice (decidido el 21/11/2026).
  { id: "cv-visual", etiqueta: "CV visual (PDF)", url: null, disponible: false },
]

export const RESUMEN =
  "Egresado de Ingeniería en Sistemas Computacionales (titulación en curso) y estudiante de la Maestría en Ingeniería. Tengo experiencia práctica con PostgreSQL y SQL en un entorno institucional: consultas unificadas con vistas y CTEs para reportes académicos, limpieza y normalización de datos, y módulos en Django (con documentos DOCX y PDF) y en Angular con Node para un sistema de gestión de personal. Hoy construyo sitios interactivos con React y Tailwind CSS para distintos giros de negocio. Me importan la calidad de los datos, el código que se puede mantener y el control de versiones."

export const HABILIDADES = [
  {
    grupo: "Bases de datos y SQL",
    items: [
      "PostgreSQL 16+",
      "SQL avanzado: JOINs, CTEs, agregaciones",
      "Vistas y tablas de trabajo",
      "Integridad referencial",
    ],
  },
  {
    grupo: "Calidad de datos",
    items: [
      "Staging desde CSV irregular",
      "Estandarización de teléfonos, CCT y fechas",
      "Validación con regex",
      "CAST seguro",
    ],
  },
  { grupo: "Backend", items: ["Python (Django)", "Node.js (Express)", "APIs REST"] },
  {
    grupo: "Frontend",
    items: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Angular 14–18",
      "TypeScript",
      "HTML y CSS",
      "Bootstrap",
      "DataTables",
      "Astro",
    ],
  },
  { grupo: "Pruebas", items: ["Vitest", "Playwright"] },
  { grupo: "Documentos", items: ["docxtpl (plantillas DOCX)", "PDF desde DOCX"] },
  { grupo: "Herramientas", items: ["Git y GitHub", "VS Code", "Vercel", "pgAdmin 4", "npm y pip"] },
]

export const IDIOMAS = [
  { idioma: "Español", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "Intermedio" },
]

// Proyectos propios: van antes de la experiencia porque son lo más reciente y lo verificable.
export const PROYECTOS = [
  {
    id: "multiples-demos",
    fechas: ["2026-08", null],
    nombre: "Múltiples Demos",
    tipo: "Proyecto independiente",
    periodo: "Agosto 2026 – actualidad",
    url: "https://multiples-demos.vercel.app/",
    enlaceInterno: "#demos",
    puntos: [
      "Siete sitios demostrativos por giro de negocio, con identidades propias y simulaciones funcionales: reservas, pedidos con precio en tiempo real, presupuestos, áreas de cliente y vista previa de WhatsApp.",
      "Pruebas unitarias con Vitest y de navegador con Playwright y axe (WCAG 2.2 AA) en cada entrega.",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Vercel",
      "Vitest",
      "Playwright",
    ],
  },
  {
    id: "rincon-de-imagenes",
    fechas: ["2026-06", "2026-06"],
    nombre: "Rincón de Imágenes",
    tipo: "Proyecto independiente",
    periodo: "Junio 2026",
    url: "https://rincondeimagenes.com",
    puntos: [
      "Sitio publicado para un negocio de artesanías y escultura: catálogo digital e integración con WhatsApp, Instagram y Google Maps.",
    ],
    stack: ["Astro", "HTML, CSS y JS", "Git y GitHub"],
  },
]

export const EXPERIENCIA = [
  {
    id: "servicio-social",
    fechas: ["2025-09", "2026-03"],
    puesto: "Servicio Social · Analista de Datos y Backend",
    lugar: "CECyTEV",
    ciudad: "Xalapa, Ver.",
    periodo: "Septiembre 2025 – marzo 2026",
    puntos: [
      "Diseño y unificación de consultas para el historial académico en PostgreSQL, con promedios por materia y periodo mediante CTEs y reglas de negocio.",
      "Limpieza y normalización: carga de CSV irregular a staging, estandarización de teléfonos, CCT y fechas, y dataset final consistente.",
      "Motor de documentos en Django: DOCX con docxtpl, conversión a PDF y validación de plantillas y variables.",
      "Página en Django para consultar directorios: modelos reflejados, búsqueda, paginación y plantillas Bootstrap.",
      "Validación de calificaciones con regex y CAST seguro.",
    ],
  },
  {
    id: "practicas",
    fechas: ["2025-05", "2025-06"],
    puesto: "Prácticas Profesionales · Full-Stack Jr",
    lugar: "CECyTEV, Dirección Administrativa (RRHH)",
    ciudad: "Xalapa, Ver.",
    periodo: "Mayo – junio 2025",
    puntos: [
      "Arquitectura de un sistema de control de movimientos de personal y planteles.",
      "API REST con Node y Express; frontend en Angular con Bootstrap y DataTables; roles y permisos.",
      "Despliegue en un servidor de pruebas con documentación en Git.",
    ],
  },
  {
    id: "fiverr",
    fechas: ["2021-06", "2026-02"],
    puesto: "Freelance · Asistencia virtual y traducción español-inglés",
    lugar: "Fiverr",
    ciudad: "Remoto",
    periodo: "Junio 2021 – febrero 2026",
    puntos: [
      "Traducción español-inglés para clientes internacionales.",
      "Gestión de agendas, planeación de viajes y búsqueda de información; seguimiento de entregables y tiempos con cada cliente.",
      "Normalización y organización de documentos y hojas de cálculo en Excel.",
    ],
  },
]

export const EDUCACION = [
  {
    id: "maestria",
    fechas: ["2026", null],
    titulo: "Maestría en Ingeniería",
    lugar: "Universidad Martí",
    periodo: "2026 – 2028",
    nota: "En curso; egreso esperado en agosto de 2028.",
  },
  {
    id: "isc",
    fechas: ["2022", "2026"],
    titulo: "Ingeniería en Sistemas Computacionales",
    lugar: "IVES, Xalapa",
    periodo: "2022 – 2026",
    nota: "Egresado; titulación en curso por estudios de posgrado.",
  },
  {
    id: "mecatronica",
    fechas: ["2018", "2022"],
    titulo: "Ingeniería Mecatrónica (no concluida)",
    lugar: "TecNM, ITSX",
    periodo: "2018 – 2022",
    nota: "Cursos relevantes: programación, control, PLC, microcontroladores, metrología y calidad.",
  },
]

export const CERTIFICACIONES = [
  {
    id: "big-data",
    titulo: "Visualizador de Big Data",
    lugar: "Fundación Carlos Slim",
    anio: 2025,
    horas: 74,
  },
  { id: "finder", titulo: "Finder", lugar: "Fundación Carlos Slim", anio: 2026, horas: 26 },
  {
    id: "curador",
    titulo: "Curador de Datos",
    lugar: "Fundación Carlos Slim",
    anio: 2026,
    horas: 30,
  },
]

// Filas de la línea de tiempo (de lo más antiguo a lo más reciente), con su tipo.
export const TRAYECTORIA = [
  ...EDUCACION.map((e) => ({ ...e, nombre: e.titulo, tipo: "estudio" })),
  ...EXPERIENCIA.map((e) => ({ ...e, nombre: e.puesto.split(" · ")[0], tipo: "trabajo" })),
  ...PROYECTOS.map((p) => ({ ...p, tipo: "proyecto" })),
].sort((a, b) => a.fechas[0].localeCompare(b.fechas[0]))
