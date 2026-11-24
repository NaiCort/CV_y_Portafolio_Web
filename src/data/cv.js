// Datos del CV web (Sitio Profesional Integral V1.4, sección 5). Fuente: CV de noviembre de 2026,
// que manda cuando difiere del CV visual V2; del V2 se toman los roles por puesto, los cursos
// relevantes de Mecatrónica y el seguimiento de entregables en Fiverr. Donde el PDF y esto chocan
// (nombres, etiquetas), manda el PDF; el sitio puede dar más detalle. El CV web, el PDF y
// LinkedIn deben decir lo mismo: un cambio aquí se replica en los otros dos.
// Las claves de texto están pensadas para añadir el inglés (sección 25) sin cambiar la forma.

import { LINKEDIN_URL, WHATSAPP_NUMBER } from "../components/shared/contactInfo"

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
    campo: "Teléfono",
    etiqueta: "Teléfono y WhatsApp",
    texto: "+52 228 162 8345",
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    id: "correo",
    campo: "Correo",
    etiqueta: "Correo",
    texto: "ian.martinez2610@gmail.com",
    url: "mailto:ian.martinez2610@gmail.com",
  },
  {
    id: "linkedin",
    campo: "LinkedIn",
    etiqueta: "LinkedIn",
    texto: "in/ian-almarti",
    url: LINKEDIN_URL,
  },
  {
    id: "github",
    campo: "GitHub",
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

// Proyectos propios (Ian, 23/11/2026): van antes de la experiencia porque son lo más reciente y
// lo verificable. El primero es este mismo sitio (antes «Múltiples Demos»): su enlace lleva a la
// misma página, por si alguien lo elige de todos modos.
export const PROYECTOS = [
  {
    id: "multiples-demos",
    puesto: "CV y portafolio web",
    lugar: "Proyecto independiente · el sitio que estás viendo",
    periodo: "Agosto 2026 – actualidad",
    url: "/",
    puntos: [
      "Esta misma página: mi CV y siete demos interactivas, una por giro de negocio, que se abren desde la sección «Demos». Cada demo tiene identidad visual propia y simulaciones funcionales: reservas, pedidos con precio en tiempo real, presupuestos, áreas de cliente y vista previa de WhatsApp.",
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
]

// Experiencia: trabajo para otros (un negocio real, una institución y clientes), con el texto del
// CV de noviembre y lo que solo trae el CV visual (vistas, módulos web, tablas y carga,
// entregables y control de calidad) integrado sin repetir. Rincón de Imágenes va aquí porque es
// un sitio para un negocio local en funcionamiento (Ian prefiere presentarlo como independiente).
export const EXPERIENCIA = [
  {
    id: "rincon-de-imagenes",
    puesto: "Rincón de Imágenes",
    lugar: "Proyecto independiente (Astro)",
    periodo: "Junio 2026",
    url: "https://rincondeimagenes.com",
    puntos: [
      "Sitio web publicado para un negocio de artesanías y escultura en funcionamiento: catálogo digital, integración con WhatsApp, Instagram y Google Maps.",
    ],
    stack: ["Astro", "HTML, CSS y JS", "Git y GitHub"],
  },
  {
    id: "servicio-social",
    puesto: "Servicio Social · Analista de Datos / Desarrollo Web",
    lugar: "CECyTEV · Xalapa, Ver.",
    periodo: "Septiembre 2025 – marzo 2026",
    puntos: [
      "Diseño y unificación de consultas para el historial académico en PostgreSQL, incluyendo el cálculo de promedios por materia y periodo con vistas, CTEs y reglas de negocio.",
      "Limpieza y normalización de datos: carga de CSV irregular a staging, estandarización de teléfonos, CCT y fechas, y generación de un dataset final consistente.",
      "Motor de generación de documentos en Django: DOCX con docxtpl y conversión a PDF, con validación de plantillas y variables.",
      "Página web en Django para consulta de directorios: modelos reflejados, búsqueda, paginación y plantillas Bootstrap.",
      "Validación de calificaciones con regex y CAST seguro.",
    ],
  },
  {
    id: "practicas",
    puesto: "Prácticas Profesionales",
    lugar: "CECyTEV, Dirección Administrativa / RRHH · Xalapa, Ver.",
    periodo: "Mayo – junio 2025",
    puntos: [
      "Diseño de la arquitectura de un sistema de control de movimientos de personal y planteles.",
      "Desarrollo de módulos web para la gestión de personal y conexión con la base de datos.",
      "API REST con Node y Express; frontend en Angular con Bootstrap y DataTables (tablas, búsqueda y carga); roles y permisos.",
      "Despliegue a un servidor de pruebas, con versionado y documentación técnica en Git.",
    ],
  },
  {
    id: "fiverr",
    puesto: "Freelance · Asistencia virtual / Traducción español-inglés",
    lugar: "Fiverr · remoto",
    periodo: "Junio 2021 – febrero 2026",
    puntos: [
      "Traducción de textos español-inglés para clientes internacionales.",
      "Gestión de agendas, planeación de viajes y búsqueda de información en línea.",
      "Gestión de entregables remotos con clientes: seguimiento, comunicación y cumplimiento de tiempos.",
      "Normalización, organización y actualización de documentos y hojas de cálculo en Excel, con control de calidad básico.",
    ],
  },
]

export const EDUCACION = [
  {
    id: "maestria",
    titulo: "Maestría en Ingeniería",
    lugar: "Universidad Martí",
    periodo: "2026 – 2028",
    nota: "En curso; egreso esperado en agosto de 2028.",
  },
  {
    id: "isc",
    titulo: "Ingeniería en Sistemas Computacionales",
    lugar: "IVES, Xalapa",
    periodo: "2022 – 2026",
    nota: "Egresado; titulación en curso por estudios de posgrado.",
  },
  {
    id: "mecatronica",
    titulo: "Ingeniería Mecatrónica (no concluida)",
    lugar: "TecNM, ITSX",
    periodo: "2018 – 2022",
    nota: "Cursos relevantes: programación, control, PLC, microcontroladores, metrología y calidad.",
  },
]

// Cada certificación enlaza a su PDF (verificable con el folio y el código QR del documento).
export const CERTIFICACIONES = [
  {
    id: "big-data",
    titulo: "Visualizador de Big Data",
    lugar: "Fundación Carlos Slim",
    anio: 2025,
    horas: 74,
    pdf: "/cv/certificados/visualizador-de-big-data.pdf",
  },
  {
    id: "finder",
    titulo: "Finder",
    lugar: "Fundación Carlos Slim",
    anio: 2026,
    horas: 26,
    pdf: "/cv/certificados/finder.pdf",
  },
  {
    id: "curador",
    titulo: "Curador de Datos",
    lugar: "Fundación Carlos Slim",
    anio: 2026,
    horas: 30,
    pdf: "/cv/certificados/curador-de-datos.pdf",
  },
]
