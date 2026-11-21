// Umbral: revista ficticia de fotografía y diseño. Relatos, creador y números ficticios. Las
// fotografías son de Pexels (licencia de Pexels) y se sirven desde el sitio; las personas no son
// el creador ni personajes reales. Ficha: docs/FICHA_UMBRAL.md.
export const fotoUmbral = (clave, ancho = 1600) => `/revista/umbral/${clave}-${ancho}.webp`
export const srcSetUmbral = (clave) =>
  `${fotoUmbral(clave, 800)} 800w, ${fotoUmbral(clave, 1600)} 1600w`

export const CREADOR = {
  id: "nicolas-vera",
  nombre: "Nicolás Vera",
  oficio: "Fotógrafo y diseñador editorial",
  lema: "Mirar, recortar, volver a mirar.",
  bio: [
    "Nicolás Vera es el creador ficticio de Umbral. Empezó haciendo carteles para conciertos en una imprenta de barrio y aprendió ahí que una letra puede ser una ventana.",
    "En Umbral publica dossiers que se leen como carteles: cada uno empieza por una sola imagen y la desarma frente al lector, capa por capa, hasta mostrar cómo se construyó.",
  ],
}

export const DOSSIERS = [
  {
    id: "entre-lineas",
    numero: 7,
    titulo: "Entre líneas",
    disciplina: "Fotografía",
    tono: "noche",
    cartel: "ventana",
    autor: CREADOR.nombre,
    pagina: 12,
    foto: "calle",
    recorte: "calle",
    alt: "Un joven con lentes y sudadera negra en una calle de noche, con luces desenfocadas detrás.",
    entradilla:
      "Un retrato no termina en el rostro. También lo construye la calle que dejamos alrededor, y las letras pueden ser la ventana por la que la miramos.",
    capitulos: [
      {
        titulo: "La calle también retrata",
        texto: [
          "Nicolás parte de una pregunta sencilla: ¿qué cuenta una persona antes de mirar a cámara? En este ensayo ficticio, la sudadera, el gesto de la barbilla y la distancia con las luces construyen una presencia antes que una cara.",
          "La fotografía original es de noche, con el fondo desenfocado en manchas de luz. Ese fondo es el que después vive dentro de las letras del cartel: no se inventa nada, solo se recorta.",
          "Por eso el primer paso nunca es tipográfico. Primero se mira la foto completa, se decide qué parte de la calle importa y qué parte de la persona no puede taparse.",
        ],
      },
      {
        titulo: "Leer rostros, sentir espacios",
        texto: [
          "El cartel separa la foto en dos planos. Atrás, la calle, que solo se asoma por las letras. Adelante, la persona recortada, que pasa por encima del título como si caminara entre líneas.",
          "Al mover el cursor, los planos se desplazan a distinto ritmo. Es el mismo truco del cine de recortes: lo cercano se mueve menos, lo lejano más, y el ojo entiende profundidad donde solo hay dos imágenes.",
        ],
        cita: "Dejar espacio también es tomar una decisión.",
      },
      {
        titulo: "El corte como lenguaje",
        texto: [
          "Un recorte puede contar tres historias de la misma toma: la calle, el gesto y el detalle de las manos. Ninguna es más verdadera que la otra; cada una dirige la mirada a una pregunta distinta.",
          "En la versión de lectura las fotografías vuelven a mostrarse completas. La composición nunca debe impedir comprenderlas: el cartel es una forma de mirar, no un disfraz.",
        ],
      },
    ],
    proceso: [
      [
        "fondo",
        "La foto completa",
        "Se elige una toma con espacio alrededor del sujeto y luz en el fondo.",
      ],
      [
        "letras",
        "Las letras como ventana",
        "El título se recorta con la misma foto: la calle solo se ve dentro de las letras.",
      ],
      [
        "recorte",
        "La persona encima",
        "Se separa a la persona del fondo y se coloca sobre el título, alineada al pixel.",
      ],
      [
        "notas",
        "Anotaciones",
        "Textos pequeños, número y una palabra caligráfica terminan el cartel.",
      ],
    ],
    // [pie, foto, punto de interés, acercamiento]
    recortes: [
      ["La calle", "calle", "50% 60%", 1],
      ["El gesto", "calle", "38% 24%", 2.4],
      ["Las manos", "calle", "66% 88%", 2.6],
    ],
  },
  {
    id: "otra-perspectiva",
    numero: 7,
    titulo: "Otra perspectiva",
    disciplina: "Diseño",
    tono: "papel",
    cartel: "diagonal",
    autor: CREADOR.nombre,
    pagina: 34,
    foto: "perfil",
    recorte: "perfil",
    alt: "Retrato en blanco y negro de un hombre de perfil con lentes oscuros, mirando hacia arriba.",
    entradilla:
      "Mirar dos veces. Una historia sobre diagonales, contrastes y todo lo que dejamos fuera de la imagen para que el ruido no hable más fuerte que ella.",
    capitulos: [
      {
        titulo: "Una superficie para mirar",
        texto: [
          "Este dossier ficticio explora cómo cambia un retrato cuando se corta en diagonal. La diagonal introduce tensión; el borde recto, una pausa. Entre ambas, el rostro queda partido pero no perdido.",
          "Las rebanadas no son adorno: cada una muestra otra toma, otro encuadre u otra luz de la misma sesión, y juntas cuentan lo que una sola foto no alcanza.",
        ],
        cita: "Una composición empieza por lo que decides dejar fuera.",
      },
      {
        titulo: "Forma y significado",
        texto: [
          "Una regla de taller: el efecto solo vale si acompaña al contenido. Por eso la palabra caligráfica aparece una sola vez y en el lugar donde la lectura se detiene.",
          "Las anotaciones del borde (fechas, colecciones, marcas de registro) vienen del cartel impreso: dicen al ojo que está frente a una pieza terminada, no frente a un boceto.",
          "En pantalla, las rebanadas se deslizan al bajar. En papel no se moverían; aquí el movimiento ocupa el lugar del tiempo que uno pasa frente a un cartel.",
        ],
      },
      {
        titulo: "Del boceto a la lectura",
        texto: [
          "Primero se ordena el relato. Después se eligen tamaños, proporciones y contrastes. El resultado puede ser distinto en cada pantalla y seguir siendo la misma pieza: una voz, un recorrido y una intención reconocible.",
          "En el teléfono, las cinco rebanadas se vuelven tres. Lo que se pierde en número se gana en tamaño, y el rostro sigue siendo el centro.",
        ],
      },
    ],
    proceso: [
      [
        "fondo",
        "Papel y grano",
        "Un papel claro con grano fino; la luz cae de arriba a la izquierda.",
      ],
      [
        "rebanadas",
        "Rebanadas diagonales",
        "Cuatro tomas de la sesión se cortan en paralelogramos con la misma inclinación.",
      ],
      [
        "recorte",
        "El perfil que sale",
        "El perfil recortado rompe su rebanada y sale hacia el título.",
      ],
      [
        "notas",
        "Ruido y silencio",
        "Título condensado, una palabra caligráfica y anotaciones en los márgenes.",
      ],
    ],
    recortes: [
      ["El perfil", "perfil", "62% 28%", 1.6],
      ["La sombra", "sombra", "50% 30%", 1.3],
      ["El abrigo", "chamarra", "50% 45%", 1.2],
    ],
  },
]
export const findDossier = (id) => DOSSIERS.find((d) => d.id === id)

// Números de archivo: solo su lámina de portada existe en esta demo.
export const ARCHIVO = [
  {
    id: "agua",
    numero: 6,
    titulo: "Agua",
    cartel: "vertical",
    tono: "noche",
    disciplina: "Fotografía",
    foto: "agua",
    recorte: "agua",
    mes: "Octubre 2026",
    alt: "Una mujer con la mitad del rostro fuera del agua de un lago, al atardecer.",
    lema: "La luz cambia lo que toca, pero no lo que es.",
  },
  {
    id: "crear",
    numero: 5,
    titulo: "Crear",
    cartel: "tiras",
    tono: "papel",
    disciplina: "Diseño",
    foto: "sentada",
    recorte: "sentada",
    mes: "Septiembre 2026",
    alt: "Una mujer con gorro y audífonos sentada sobre un muro, con ropa oscura.",
    lema: "Más que diseño: un idioma.",
  },
  {
    id: "noche",
    numero: 4,
    titulo: "Lo que queda de la noche",
    cartel: "simple",
    tono: "noche",
    disciplina: "Fotografía",
    foto: "noche",
    mes: "Agosto 2026",
    alt: "Una persona camina sola por una calle iluminada por farolas naranjas.",
    lema: "Caminar despacio para ver más.",
  },
  {
    id: "cruces",
    numero: 3,
    titulo: "Cruces",
    cartel: "simple",
    tono: "papel",
    disciplina: "Diseño",
    foto: "cruce",
    mes: "Julio 2026",
    alt: "Una persona cruza una avenida al atardecer entre edificios y cables.",
    lema: "Toda ciudad es una retícula.",
  },
]
export const findArchivo = (id) => ARCHIVO.find((n) => n.id === id)

// Fotografías de Umbral (Pexels): clave local → página original.
export const FOTOS_UMBRAL = [
  ["calle", "31662046", "Joven en una calle de noche"],
  ["perfil", "6937590", "Perfil con lentes oscuros"],
  ["sombra", "13542997", "Retrato en sombra"],
  ["saco", "16217744", "Hombre de traje y lentes"],
  ["chamarra", "9995045", "Hombre con chamarra de piel"],
  ["sentada", "19101379", "Mujer sentada en un muro"],
  ["ventana", "11304227", "Sombra de ventana en la pared"],
  ["agua", "3139857", "Mujer en el agua de un lago"],
  ["noche", "19295553", "Calle de noche con farolas"],
  ["cruce", "5276003", "Cruce al atardecer"],
]
