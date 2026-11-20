// Relatos y creadores ficticios. Fotos ilustrativas ya registradas en medios-origen.json.
export const DOSSIERS = [
  {
    id: "entre-lineas",
    titulo: "Entre líneas",
    disciplina: "Fotografía",
    color: "#163C35",
    foto: "/revista/rubor/fotos/691023-1200.webp",
    mini: "/revista/rubor/fotos/691023-600.webp",
    detalle: "/revista/rubor/fotos/360753-1200.webp",
    autor: "Nicolás Vera",
    entradilla:
      "Un retrato no termina en el rostro. También lo construye el espacio que dejamos alrededor.",
    capitulos: [
      {
        titulo: "El espacio también retrata",
        texto:
          "Nicolás parte de una pregunta sencilla: ¿qué cuenta una persona antes de mirar a cámara? En este ensayo ficticio, la ropa, el gesto y la distancia construyen una presencia. La fotografía se lee completa antes de fragmentarla.",
        cita: "Dejar espacio también es tomar una decisión.",
      },
      {
        titulo: "Una imagen, distintas lecturas",
        texto:
          "El encuadre cerrado dirige la mirada al gesto. El plano abierto permite reconocer una actitud y un contexto. Al cambiar entre ambos, la imagen no gana una historia nueva: revela otra parte de la misma pregunta.",
      },
      {
        titulo: "El corte como lenguaje",
        texto:
          "La tipografía y la imagen comparten un plano. Los cortes responden a la geometría de las letras, pero conservan el punto de atención. En la versión de lectura, las fotografías vuelven a mostrarse enteras: la composición nunca debe impedir comprenderlas.",
      },
    ],
    proceso: [
      "Elegir una fotografía con espacio alrededor del sujeto.",
      "Probar el encuadre completo antes de diseñar los recortes.",
      "Separar texto e imagen para que ambos sigan siendo accesibles.",
      "Recomponer la página en móvil, conservando el gesto y el relato.",
    ],
  },
  {
    id: "otra-perspectiva",
    titulo: "Otra perspectiva",
    disciplina: "Diseño",
    color: "#894530",
    foto: "/revista/rubor/fotos/403499-1200.webp",
    mini: "/revista/rubor/fotos/403499-600.webp",
    detalle: "/revista/rubor/fotos/530036-1200.webp",
    autor: "Nicolás Vera",
    entradilla:
      "Mirar dos veces. Una historia sobre encuadres, contrastes y lo que dejamos fuera de la imagen.",
    capitulos: [
      {
        titulo: "Una superficie para mirar",
        texto:
          "Este dossier ficticio explora cómo cambia una fotografía al rodearla de silencio. El fondo claro no intenta explicar la imagen. Le concede tiempo. El título abre el tema y después deja paso a la observación.",
        cita: "Una composición empieza por lo que decides dejar fuera.",
      },
      {
        titulo: "Forma y significado",
        texto:
          "Una diagonal introduce tensión; un borde recto establece una pausa. El efecto solo tiene sentido cuando acompaña al contenido. Por eso las imágenes de este dossier se pueden abrir completas y los párrafos mantienen su orden natural.",
      },
      {
        titulo: "Del boceto a la lectura",
        texto:
          "Primero se ordena el relato. Después se eligen tamaños, proporciones y contrastes. El resultado puede ser distinto en cada pantalla y seguir siendo la misma pieza: una voz, un recorrido y una intención reconocible.",
      },
    ],
    proceso: [
      "Definir qué quiere contar la pieza en una frase.",
      "Ordenar las imágenes por ritmo, no por tamaño.",
      "Reservar el gesto tipográfico para la apertura.",
      "Probar lectura, contraste y navegación con teclado.",
    ],
  },
]
export const findDossier = (id) => DOSSIERS.find((d) => d.id === id)
