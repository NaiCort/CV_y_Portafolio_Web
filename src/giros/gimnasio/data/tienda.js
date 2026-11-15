// Tienda corta de Brío. Productos de ejemplo, sin marca real; precios en MXN con IVA incluido.
// Se aparta en línea y se paga al recoger en la sucursal: esta demo no cobra.
export const CATEGORIAS_TIENDA = [
  { id: "equipo", nombre: "Equipo" },
  { id: "nutricion", nombre: "Nutrición" },
  { id: "ropa", nombre: "Ropa y accesorios" },
]

export const PRODUCTOS = [
  {
    id: "guantes",
    nombre: "Guantes de box",
    categoria: "equipo",
    precio: 899,
    detalle: "Piel sintética, cierre de velcro",
    variantes: { nombre: "Tamaño", opciones: ["10 oz", "12 oz", "14 oz"] },
    descripcion:
      "Para costal y manoplas. 10 oz para manos chicas o trabajo de velocidad; 12 y 14 oz para entrenar y para guantes con compañero.",
    puntos: ["Relleno de espuma de doble densidad", "Forro interior que seca rápido", "Par"],
  },
  {
    id: "vendas",
    nombre: "Vendas para box",
    categoria: "equipo",
    precio: 199,
    detalle: "4.5 m, algodón con elástico",
    variantes: { nombre: "Color", opciones: ["Negro", "Rojo"] },
    descripcion:
      "Protegen muñecas y nudillos debajo del guante. En la clase de Combate te enseñamos a ponértelas.",
    puntos: ["Largo de 4.5 m", "Gancho para el pulgar", "Par"],
  },
  {
    id: "cuerda",
    nombre: "Cuerda para saltar",
    categoria: "equipo",
    precio: 329,
    detalle: "Cable con rodamientos, ajustable",
    descripcion:
      "Cable de acero recubierto y mangos con rodamientos: gira parejo para dobles. Se ajusta a tu estatura sin herramientas.",
    puntos: ["Largo ajustable hasta 3 m", "Mangos de aluminio", "Cable de repuesto"],
  },
  {
    id: "bandas",
    nombre: "Bandas de resistencia",
    categoria: "equipo",
    precio: 459,
    detalle: "Juego de 3: ligera, media y fuerte",
    descripcion:
      "Para calentar hombros y cadera, ayudarte en las dominadas o entrenar fuera del club. Las usamos en Movilidad.",
    puntos: ["Látex de capas", "Tres tensiones", "Bolsa para guardarlas"],
  },
  {
    id: "proteina",
    nombre: "Proteína de suero",
    categoria: "nutricion",
    precio: 789,
    detalle: "1 kg, unas 30 porciones",
    variantes: { nombre: "Sabor", opciones: ["Vainilla", "Chocolate", "Sin sabor"] },
    descripcion:
      "Proteína de suero de leche concentrada. Es un alimento, no un medicamento: si tienes dudas sobre tu dieta, consulta a un profesional de la nutrición.",
    puntos: ["24 g de proteína por porción", "Contiene leche", "Hecha en México"],
  },
  {
    id: "barras",
    nombre: "Barras de proteína",
    categoria: "nutricion",
    precio: 540,
    detalle: "Caja de 12 barras de 60 g",
    variantes: { nombre: "Sabor", opciones: ["Cacahuate", "Chocolate"] },
    descripcion:
      "Para después de entrenar o para llevar. También se venden sueltas en la recepción de cada sucursal.",
    puntos: ["20 g de proteína por barra", "Contiene cacahuate y leche", "12 piezas"],
  },
  {
    id: "botella",
    nombre: "Botella térmica Brío",
    categoria: "ropa",
    precio: 389,
    detalle: "750 ml, acero inoxidable",
    variantes: { nombre: "Color", opciones: ["Cobalto", "Arcilla", "Negro"] },
    descripcion:
      "Doble pared: agua fría por 24 horas. Cabe en los portabotellas de las bicis de Ciclo. Hay garrafones de agua en todas las sucursales.",
    puntos: ["750 ml", "Tapa con asa", "Libre de BPA"],
  },
  {
    id: "toalla",
    nombre: "Toalla de microfibra",
    categoria: "ropa",
    precio: 249,
    detalle: "40 × 80 cm, seca rápido",
    descripcion:
      "Para la banca y para el sudor. En los planes Club y Total la toalla del club es gratis; esta es para llevártela.",
    puntos: ["40 × 80 cm", "Bolsa con malla", "Se lava en lavadora"],
  },
  {
    id: "playera",
    nombre: "Playera de entrenamiento",
    categoria: "ropa",
    precio: 429,
    detalle: "Tela técnica, logo Brío",
    variantes: { nombre: "Talla", opciones: ["CH", "M", "G", "XG"] },
    descripcion:
      "Tela ligera que no se pega al sudar. Corte recto; si estás entre dos tallas, elige la más grande.",
    puntos: ["Poliéster reciclado", "Costuras planas", "Hecha en México"],
  },
  {
    id: "candado",
    nombre: "Candado para locker",
    categoria: "ropa",
    precio: 179,
    detalle: "Combinación de 4 dígitos",
    descripcion:
      "Para los lockers de día. En el plan Total tienes un locker fijo con llave; este sirve para los demás.",
    puntos: ["Combinación que tú eliges", "Arco de acero", "Cabe en todos los lockers"],
  },
]
export const findProducto = (id) => PRODUCTOS.find((p) => p.id === id)
