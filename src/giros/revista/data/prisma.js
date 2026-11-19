// Prisma: revista ficticia de ciencia y tecnología en acceso abierto (docs/FICHA_REVISTA.md).
// Autores, instituciones, DOI, ORCID y cifras son de ejemplo. Fotos de Unsplash, servidas desde el sitio.
export const foto = (clave, ancho = 1000) => `/revista/prisma/fotos/${clave}-${ancho}.webp`
export const fotoSrcSet = (clave) => `${foto(clave, 480)} 480w, ${foto(clave, 1000)} 1000w`

// Un color por área; las portadas y el fondo del número elegido toman ese color.
export const AREAS = {
  astronomia: ["Astronomía", "#1E5BD8"],
  genetica: ["Genética", "#0F8C8C"],
  ia: ["Inteligencia artificial", "#C2552D"],
  biologia: ["Biología celular", "#B4234B"],
  espacio: ["Espacio", "#0E7FB0"],
  fisica: ["Física", "#2A6FD6"],
  electronica: ["Electrónica", "#B7791F"],
  neuro: ["Neurociencia", "#C0466A"],
  medicina: ["Medicina", "#B83A2E"],
  abierta: ["Ciencia abierta", "#3E8A4F"],
  matematicas: ["Matemáticas", "#7A6A2A"],
  quimica: ["Química", "#2F8F7A"],
  datos: ["Ciencia de datos", "#5B6B86"],
  sociedad: ["Ciencia y sociedad", "#A0522D"],
}

export const AUTORES = [
  ["lucia-arrieta", "Lucía Arrieta", "Astrofísica", "Instituto Austral de Astrofísica"],
  ["tomas-ibarra", "Tomás Ibarra", "Astrónomo", "Observatorio del Altiplano"],
  ["rafael-montes", "Rafael Montes", "Ingeniero en óptica", "Instituto Austral de Astrofísica"],
  ["mariana-solano", "Mariana Solano", "Genetista", "Centro de Genómica del Pacífico"],
  ["diego-ferran", "Diego Ferrán", "Bioinformático", "Universidad del Valle Central"],
  ["andres-calvo", "Andrés Calvo", "Ingeniero en robótica", "Laboratorio Andino de Robótica"],
  ["paula-rios", "Paula Ríos", "Científica de datos", "Universidad del Valle Central"],
  ["irene-quesada", "Irene Quesada", "Bióloga celular", "Instituto de Biomedicina del Sur"],
  ["sofia-lara", "Sofía Lara", "Ingeniera aeroespacial", "Agencia Espacial Latina"],
  ["gael-ortiz", "Gael Ortiz", "Físico", "Universidad Politécnica del Golfo"],
  ["elena-vidal", "Elena Vidal", "Ingeniera electrónica", "Universidad Politécnica del Golfo"],
  ["carmen-ayala", "Carmen Ayala", "Neurocientífica", "Instituto de Biomedicina del Sur"],
  ["rocio-llanos", "Rocío Llanos", "Médica investigadora", "Hospital Universitario del Norte"],
  ["julia-navarro", "Julia Navarro", "Bibliotecaria científica", "Red de Ciencia Abierta"],
  ["ana-beltran", "Ana Beltrán", "Matemática", "Universidad del Altiplano"],
  ["valeria-mora", "Valeria Mora", "Química", "Centro de Química Verde"],
].map(([id, nombre, oficio, institucion], i) => ({
  id,
  nombre,
  iniciales: nombre
    .split(" ")
    .map((p) => p[0])
    .join(""),
  oficio,
  institucion: `${institucion} (ficticio)`,
  orcid: `0000-0002-${String(1000 + i * 137).padStart(4, "0")}-${String(2000 + i * 211).slice(-4)}`,
}))
export const findAutor = (id) => AUTORES.find((a) => a.id === id)
export const USUARIO = { nombre: "Diego Robles", iniciales: "DR" }
export const articulosDe = (autorId) => ARTICULOS.filter((a) => a.autores.includes(autorId))

// [n, id, título, área, foto, autores, resumen]
const LISTA = [
  [
    24,
    "andromeda",
    "Lo que la luz de Andrómeda no dice",
    "astronomia",
    "940025",
    ["lucia-arrieta", "tomas-ibarra", "rafael-montes"],
    "Medimos durante tres años la luz que llega de la galaxia de Andrómeda y encontramos que una parte de su brillo no se explica con las estrellas que vemos. Proponemos dónde buscar lo que falta y cómo comprobarlo con telescopios pequeños.",
  ],
  [
    23,
    "adn-no-codificante",
    "El ADN que no codifica también habla",
    "genetica",
    "351029",
    ["mariana-solano", "diego-ferran"],
    "Más del 90 % de nuestro ADN no fabrica proteínas. Comparamos 400 genomas y encontramos regiones que, sin codificar nada, encienden y apagan genes vecinos según la temperatura.",
  ],
  [
    22,
    "robots-poca-energia",
    "Robots que aprenden con poca energía",
    "ia",
    "943543",
    ["andres-calvo", "paula-rios"],
    "Entrenamos un brazo robótico con un modelo que consume menos que un foco y aprende a tomar objetos nuevos en veinte intentos.",
  ],
  [
    21,
    "celulas-se-reparan",
    "Células que se reparan solas",
    "biologia",
    "213369",
    ["irene-quesada"],
    "Observamos cómo algunas células de la piel cierran pequeñas heridas en su membrana en menos de un minuto, y qué proteína lo coordina.",
  ],
  [
    20,
    "satelites-pequenos",
    "Satélites pequeños, preguntas grandes",
    "espacio",
    "811953",
    ["sofia-lara"],
    "Un satélite del tamaño de una caja de zapatos midió durante un año la humedad del suelo en los Andes con un error menor al 4 %.",
  ],
  [
    19,
    "plasma-frio",
    "Plasma frío para desinfectar hospitales",
    "fisica",
    "724739",
    ["gael-ortiz", "rocio-llanos"],
    "Probamos un generador de plasma a temperatura ambiente que elimina el 99 % de las bacterias de una superficie en dos minutos.",
  ],
  [
    18,
    "chips-luz",
    "Chips que se enfrían con luz",
    "electronica",
    "660439",
    ["elena-vidal", "gael-ortiz"],
    "Un recubrimiento que convierte parte del calor de un procesador en luz infrarroja bajó su temperatura 6 grados sin ventiladores.",
  ],
  [
    17,
    "cerebro-bilingue",
    "El cerebro bilingüe a los 70",
    "neuro",
    "757148",
    ["carmen-ayala"],
    "Seguimos a 300 adultos mayores durante diez años: quienes hablaban dos idiomas a diario mostraron síntomas de demencia más tarde.",
  ],
  [
    16,
    "corazones-3d",
    "Corazones impresos en 3D para practicar",
    "medicina",
    "405186",
    ["rocio-llanos"],
    "Modelos impresos a partir de tomografías reales ayudaron a residentes a planear cirugías complejas en menos tiempo.",
  ],
  [
    15,
    "laboratorios-abiertos",
    "Laboratorios que comparten todo",
    "abierta",
    "226825",
    ["julia-navarro", "paula-rios"],
    "Revisamos 120 laboratorios que publican sus datos crudos: sus resultados se repiten con más éxito y se citan más.",
  ],
  [
    14,
    "sequias",
    "Matemáticas para predecir sequías",
    "matematicas",
    "041078",
    ["ana-beltran"],
    "Un modelo con solo tres variables anticipó con dos meses de margen cuatro de las cinco sequías del altiplano entre 2010 y 2025.",
  ],
  [
    13,
    "quimica-verde",
    "Química sin solventes tóxicos",
    "quimica",
    "349884",
    ["valeria-mora"],
    "Sustituimos un solvente común en la fabricación de pinturas por agua con sal y una molécula derivada del maíz.",
  ],
  [
    12,
    "cohetes-reutilizables",
    "Cohetes que vuelven a casa",
    "espacio",
    "487492",
    ["sofia-lara", "rafael-montes"],
    "Cuánto cuesta en realidad reutilizar un cohete: analizamos 60 lanzamientos y el desgaste de sus motores.",
  ],
  [
    11,
    "ciudades-de-noche",
    "Ciudades que se ven desde el espacio",
    "datos",
    "580459",
    ["paula-rios"],
    "Con imágenes nocturnas de satélite estimamos el crecimiento de 40 ciudades hispanas en la última década.",
  ],
  [
    10,
    "microscopios",
    "Microscopios para todas las escuelas",
    "abierta",
    "006812",
    ["julia-navarro", "irene-quesada"],
    "Diseñamos un microscopio de bajo costo con piezas impresas y una cámara de teléfono que llega a 400 aumentos.",
  ],
  [
    9,
    "software-reproducible",
    "Software científico que se puede repetir",
    "datos",
    "166150",
    ["diego-ferran", "paula-rios"],
    "La mitad de los análisis que revisamos no se podían repetir por cambios en el software. Proponemos una lista de cinco pasos.",
  ],
  [
    8,
    "pizarra",
    "Historia de una demostración en la pizarra",
    "matematicas",
    "190371",
    ["ana-beltran"],
    "Reconstruimos, a partir de fotos de pizarras, cómo un grupo de estudiantes llegó a una prueba nueva de un teorema clásico.",
  ],
  [
    7,
    "esferas-plasma",
    "Lo que enseña una esfera de plasma",
    "fisica",
    "245164",
    ["gael-ortiz"],
    "Un juguete de oficina sirve para explicar la ionización y medir campos eléctricos en el salón de clases.",
  ],
  [
    6,
    "robots-asistentes",
    "Robots que acompañan en hospitales",
    "ia",
    "255707",
    ["andres-calvo", "rocio-llanos"],
    "Medimos cómo reaccionan pacientes y enfermeras ante un robot que reparte medicamentos en un hospital de 200 camas.",
  ],
  [
    5,
    "vacunas-placa",
    "Vacunas probadas en miniatura",
    "biologia",
    "863486",
    ["irene-quesada", "mariana-solano"],
    "Placas con cientos de pozos permiten probar candidatas a vacuna con una fracción de los reactivos habituales.",
  ],
  [
    4,
    "tableros-datos",
    "Tableros que se entienden",
    "datos",
    "953301",
    ["paula-rios"],
    "Pusimos a prueba seis formas de mostrar datos de salud pública con 900 personas: ganó la más sencilla.",
  ],
  [
    3,
    "transbordador",
    "Lo que aprendimos del transbordador",
    "sociedad",
    "263952",
    ["sofia-lara"],
    "Una historia de los treinta años del transbordador espacial contada a partir de sus informes técnicos.",
  ],
  [
    2,
    "mujeres-laboratorio",
    "Quién firma los artículos",
    "sociedad",
    "471384",
    ["julia-navarro", "carmen-ayala"],
    "Revisamos 10,000 artículos en español: las mujeres firman el 41 % pero solo el 23 % como autoras principales.",
  ],
  [
    1,
    "cometa",
    "Un cometa visto desde el desierto",
    "astronomia",
    "887197",
    ["tomas-ibarra"],
    "Fotografiamos durante 40 noches un cometa con telescopios de aficionado y calculamos su órbita con un error menor al 1 %.",
  ],
]

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
]
const fechaDe = (n) => {
  const d = new Date(2026, 10, 18)
  d.setDate(d.getDate() - (24 - n) * 14)
  return {
    iso: d.toISOString().slice(0, 10),
    texto: `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`,
  }
}

export const ARTICULOS = LISTA.map(([n, id, titulo, area, fotoClave, autores, resumen]) => {
  const f = fechaDe(n)
  const k = (n * 37) % 23
  return {
    n,
    id,
    titulo,
    area,
    areaNombre: AREAS[area][0],
    color: AREAS[area][1],
    foto: fotoClave,
    autores,
    resumen,
    fecha: f.texto,
    fechaIso: f.iso,
    // Una de cada tres es preimpresión: aún no pasa por revisión de pares.
    revisado: n === 24 || n === 23 || n % 3 !== 0,
    version: n % 4 === 0 ? 2 : 1,
    completo: n === 24 || n === 23,
    cifras: {
      lecturas: 2000 + n * 430 + k * 97,
      descargas: 400 + n * 110 + k * 31,
      citas: Math.round(n * 1.6 + k),
      comentarios: 3 + ((n * 7) % 26),
    },
    calificacion: Number((8.4 + ((n * 13) % 15) / 10).toFixed(1)),
    // Puntos de popularidad por periodo (de ejemplo).
    pop: {
      semana: ((n * 53) % 97) + n * 3,
      mes: ((n * 29) % 89) + n * 4,
      siempre: 300 - n * 7 + ((n * 17) % 40),
    },
  }
})

export const findArticulo = (id) => ARTICULOS.find((a) => a.id === id)
export const nombresAutores = (a) => a.autores.map((id) => findAutor(id).nombre)
export const populares = (periodo, cuantos = 5) =>
  [...ARTICULOS].sort((x, y) => y.pop[periodo] - x.pop[periodo]).slice(0, cuantos)
export const EDITOR = "adn-no-codificante"

// Búsqueda simple por título, área o autor, sin distinguir acentos.
const sinAcentos = (t) =>
  t
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
export function buscar(texto) {
  const q = sinAcentos(texto.trim())
  if (!q) return []
  return ARTICULOS.filter((a) =>
    sinAcentos([a.titulo, a.areaNombre, ...nombresAutores(a)].join(" ")).includes(q),
  )
}
