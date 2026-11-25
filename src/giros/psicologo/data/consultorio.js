// Contenido único del consultorio (V4.10.2). Los tres temas leen de aquí: cambian el orden, la
// composición y la piel, nunca las palabras ni los datos. Fuentes: docs/INVESTIGACION_PSICOLOGO_2.md
// (contenido, ley y precios) y docs/FICHA_PSICOLOGO.md (temas). Todo es ficticio y lo dice.

export const PERSONA = {
  nombre: "Valeria Romero",
  titulo: "Psicóloga",
  ciudad: "Xalapa",
  licenciatura: "Licenciada en Psicología, Universidad Veracruzana",
  maestria: "Maestra en Psicoterapia Cognitivo-Conductual",
  cedula: "0000000",
  cedulaNota: "número ficticio de la demo",
  // Enlace real al buscador público de cédulas de la SEP.
  verificar: "https://www.cedulaprofesional.sep.gob.mx/",
  avisoPublicidad: "Aviso de publicidad COFEPRIS 000000 (ficticio)",
  anios: 8,
  telefono: "228 000 0000",
  correo: "hola@valeriaromero.example",
  direccion: "Calle de ejemplo 12, colonia Centro, Xalapa, Veracruz",
  coordenadas: [-96.9229, 19.5297],
  horario: [
    ["Lunes a viernes", "9:00 a 20:00"],
    ["Sábado", "9:00 a 14:00"],
  ],
}

export const TEMAS = [
  { id: "sala", nombre: "Sala con luz", color: "#8F4A2B", variante: "psicologo-sala" },
  { id: "neblina", nombre: "Neblina", color: "#2F5F6E", variante: "psicologo-neblina" },
  { id: "cuaderno", nombre: "Cuaderno", color: "#D9A441", variante: "psicologo-cuaderno" },
]

export const NAV = [
  ["como-trabajo", "Cómo trabajo"],
  ["honorarios", "Honorarios"],
  ["primera-sesion", "Primera sesión"],
  ["preguntas", "Preguntas"],
  ["contacto", "Contacto"],
]

export const PORTADA = {
  titulo: {
    sala: "Si la ansiedad no te deja descansar, aquí puedes empezar a hablarlo.",
    neblina: "Cuando todo se nubla, un espacio para ver con calma.",
    cuaderno: ["Escribir lo que sientes es el ", "primer paso", ". Hablarlo, el segundo."],
  },
  texto:
    "Acompaño a personas adultas y adolescentes que viven con ansiedad, duelo o relaciones difíciles. En mi consultorio de Xalapa o en línea, a tu ritmo.",
  accion: "Agenda una llamada de 15 minutos",
  secundaria: "Conoce cómo trabajo",
  llamada:
    "La llamada no tiene costo y no es terapia: sirve para resolver dudas y ver si te sientes en confianza.",
}

export const MOTIVOS = [
  [
    "Tu cabeza no se apaga",
    "Piensas en lo que podría salir mal y te cuesta dormir o concentrarte.",
  ],
  [
    "Perdiste a alguien",
    "El duelo pesa más de lo que esperabas y no sabes cómo seguir con lo de todos los días.",
  ],
  ["Te exiges demasiado", "Nada parece suficiente y el cansancio ya es parte de tu semana."],
  ["Tu relación se siente lejos", "Hablan, pero ya no se escuchan, y las discusiones se repiten."],
  ["El trabajo te rebasa", "Llegas a casa sin energía y el domingo ya piensas en el lunes."],
  [
    "Algo cambió en tu vida",
    "Una mudanza, una separación o un nuevo rol, y todavía no te acomodas.",
  ],
]

export const ENFOQUE = {
  resumen:
    "Trabajo con terapia cognitivo-conductual y de aceptación y compromiso. Dicho sin jerga: entendemos qué mantiene lo que te pasa y practicamos formas nuevas de responder, sin pelearte con lo que sientes.",
  pasos: [
    [
      "En la sesión",
      "Hablamos de lo que pasó en la semana, buscamos patrones y elegimos qué practicar. Tú marcas el ritmo.",
    ],
    [
      "Entre sesiones",
      "Te llevas algo pequeño y concreto: anotar, probar una conversación, una pausa al día.",
    ],
    [
      "A lo largo del proceso",
      "Revisamos cada tanto si vamos hacia donde quieres. Si algo no funciona, lo cambiamos.",
    ],
  ],
  nota: "No prometo resultados ni plazos: cada proceso es distinto. Sí me comprometo a explicarte cada paso.",
}

export const SOBRE_MI = {
  saludo: "Hola, soy Valeria.",
  historia: [
    "Estudié Psicología en Xalapa y desde hace ocho años acompaño a personas que llegan cansadas de sentirse así. Antes de abrir el consultorio trabajé en un centro comunitario y en orientación universitaria.",
    "Fuera del consultorio camino por Los Tecajetes, leo novela y aprendo, despacio, a tocar el ukulele.",
  ],
  pieFoto: "Foto ilustrativa: la persona no es Valeria Romero.",
}

export const FORMACION = [
  "Licenciatura en Psicología, Universidad Veracruzana.",
  "Maestría en Psicoterapia Cognitivo-Conductual.",
  "Diplomado en Terapia de Aceptación y Compromiso.",
  "Supervisión clínica mensual con una colega con más de 20 años de práctica.",
  "Formación continua: duelo, ansiedad en adolescentes y terapia de pareja.",
]

export const RESENAS = {
  texto:
    "Por ética, en este sitio no hay testimonios de pacientes. Si quieres leer opiniones, están en plataformas públicas, donde cada paciente decide por su cuenta si escribe.",
  enlace: "Ver opiniones en el perfil público",
  modal: [
    "En un sitio real, este enlace abriría el perfil público de Valeria en Doctoralia o en Google, donde las opiniones las publican los pacientes, sin que ella las pida ni las elija.",
    "Esta demo no tiene perfil real y no muestra opiniones inventadas.",
  ],
}

export const SERVICIOS = [
  {
    id: "individual",
    nombre: "Terapia individual",
    para: "Personas adultas",
    duracion: "50 min",
    precio: 650,
  },
  {
    id: "adolescentes",
    nombre: "Terapia para adolescentes",
    para: "De 13 a 17 años, con una entrevista inicial con su madre, padre o tutor",
    duracion: "50 min",
    precio: 650,
  },
  {
    id: "pareja",
    nombre: "Terapia de pareja",
    para: "Las dos personas, juntas",
    duracion: "75 min",
    precio: 1100,
  },
]

export const HONORARIOS = {
  enLinea: "En línea cuesta lo mismo que en el consultorio.",
  social: {
    titulo: "Precio social",
    precio: 400,
    texto:
      "Para estudiantes y personas con ingresos bajos, con cupo de cuatro espacios al mes. Pregúntalo en la llamada; no te pediré comprobantes.",
  },
  llamada: "La llamada previa de 15 minutos no tiene costo.",
  pagos: [
    "Transferencia, tarjeta o efectivo.",
    "Factura deducible: paga con tarjeta o transferencia (el SAT no acepta efectivo para deducir).",
    "Si tu seguro cubre terapia, te doy la factura y un informe para tu reembolso; confírmalo antes con tu aseguradora.",
  ],
  cancelacion:
    "Si cancelas con 24 horas de aviso, no hay cargo. Con menos tiempo, se cobra la sesión, salvo una emergencia.",
}

export const PRIMERA_SESION = [
  ["Antes", "Una llamada de 15 minutos para resolver dudas. Después agendamos, si quieres."],
  [
    "Al empezar",
    "Leemos el consentimiento informado: cómo trabajo, la confidencialidad y sus límites. Lo firmas antes de la primera sesión.",
  ],
  ["Durante", "50 minutos. Me cuentas qué te trae; no hay respuestas correctas."],
  ["Al terminar", "Acordamos qué trabajar y cada cuánto vernos. Puedes pensarlo con calma."],
]

export const CONFIDENCIAL =
  "Lo que dices aquí es confidencial. Te explico sus límites desde el inicio: solo se rompe si hay riesgo grave para ti o para alguien más."

export const EN_LINEA = [
  ["Plataforma", "Videollamada con enlace privado; no necesitas instalar nada."],
  ["Tu espacio", "Busca un lugar donde nadie te escuche; con audífonos es más fácil."],
  ["Si se corta", "Te llamo por teléfono y seguimos; el tiempo perdido se repone."],
  [
    "Plan de emergencia",
    "En la primera sesión confirmamos dónde estás y a quién llamar si algo pasa.",
  ],
]

export const INSTITUCIONES = {
  intro:
    "También trabajo con escuelas, empresas y colegas. Si te interesa, escríbeme desde el formulario y elige «Escuela, empresa o colega».",
  lista: [
    [
      "Talleres para escuelas",
      "Manejo de la ansiedad en exámenes y convivencia, para secundaria y preparatoria.",
    ],
    ["Charlas para empresas", "Estrés laboral y pausas que sí funcionan, en sesiones de una hora."],
    [
      "Supervisión e intervisión",
      "Espacios para colegas que empiezan a trabajar con terapia cognitivo-conductual.",
    ],
    [
      "Canalización",
      "Si lo que necesitas no es mi especialidad, te recomiendo a alguien de confianza.",
    ],
  ],
}

export const RECURSOS = [
  {
    id: "ansiedad",
    titulo: "Cuando la ansiedad sube de golpe",
    resumen: "Un ejercicio de dos minutos para volver al presente.",
    texto: [
      "Mira a tu alrededor y nombra cinco cosas que ves, cuatro que puedes tocar, tres que oyes, dos que hueles y una que saboreas.",
      "No busca que la ansiedad desaparezca, sino que tu atención regrese a donde estás. Funciona mejor si lo practicas en días tranquilos.",
    ],
  },
  {
    id: "duelo",
    titulo: "El duelo no tiene calendario",
    resumen: "Por qué no hay una forma correcta ni un plazo para extrañar.",
    texto: [
      "Hay días buenos y días en que todo vuelve. Eso no significa que vayas para atrás: el duelo va y viene.",
      "Si después de un tiempo sientes que no puedes con lo de todos los días, hablarlo con alguien ayuda.",
    ],
    crisis: true,
  },
  {
    id: "cuando",
    titulo: "¿Cuándo buscar terapia?",
    resumen: "Algunas señales de que podría ayudarte.",
    texto: [
      "Cuando lo que sientes ocupa casi todo tu día, cuando dejaste de hacer cosas que te gustaban o cuando las personas cercanas notan que no estás bien.",
      "No hace falta llegar al límite: también se va a terapia para conocerse y prevenir.",
    ],
  },
]

export const PREGUNTAS = [
  [
    "¿Cuántas sesiones voy a necesitar?",
    "Depende de lo que quieras trabajar. Muchas personas notan cambios entre la sexta y la décima sesión; lo revisamos cada tanto.",
  ],
  [
    "¿En línea funciona igual?",
    "Para la mayoría de los motivos, sí. Solo te pido un lugar privado y buena conexión.",
  ],
  [
    "¿Atiendes adolescentes?",
    "Sí, de 13 a 17 años. Empezamos con una entrevista con su madre, padre o tutor y después las sesiones son con el adolescente.",
  ],
  [
    "¿Das factura?",
    "Sí. Los honorarios de psicología son deducibles si pagas con tarjeta o transferencia.",
  ],
  [
    "¿Lo cubre mi seguro?",
    "Algunos seguros de gastos médicos sí y otros solo con médico tratante. Te doy la factura y un informe para el reembolso.",
  ],
  [
    "¿Qué pasa si falto?",
    "Si avisas con 24 horas, no hay cargo. Con menos tiempo se cobra la sesión, salvo una emergencia.",
  ],
  [
    "¿Lo que digo es confidencial?",
    "Sí. Solo hay límites cuando existe riesgo grave para ti o para alguien más, o por orden judicial; te los explico desde el inicio.",
  ],
]

export const CRISIS = {
  titulo: "Este sitio no atiende emergencias.",
  texto:
    "Si estás en riesgo o piensas en hacerte daño, llama al 911 o a la Línea de la Vida: gratuita, confidencial y disponible las 24 horas.",
  numero: "800 911 2000",
  tel: "8009112000",
  otras: [
    ["Emergencias", "911", "911"],
    ["Consejo Ciudadano, apoyo psicológico", "55 5533 5533", "5555335533"],
  ],
}

export const TEMAS_CONTACTO = [
  "Dudas antes de agendar",
  "Escuela, empresa o colega",
  "Factura o reembolso",
  "Otro tema",
]

export const CREDITOS =
  "Fotos ilustrativas de Unsplash. Tipografías Fraunces, Figtree, Instrument Sans, Newsreader, Literata y Caveat, con licencia SIL Open Font License."

export function precio(valor) {
  return `${valor.toLocaleString("es-MX")} MXN`
}

export const CONTACTO_INTRO =
  "Te respondo en horario de consulta, normalmente el mismo día. Si prefieres, agenda directamente la llamada de 15 minutos."
