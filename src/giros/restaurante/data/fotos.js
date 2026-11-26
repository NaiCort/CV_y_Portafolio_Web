export { FOTO_LOCAL } from "../portada"

// Fotos de Patio 12 en el tamaño justo (V4.10.6, DEC-021). Las fotos de más de 480 px tienen
// además una versión de 480 px («-480.webp»; registro en public/restaurante/fotos-origen-v4.10.6.json).
// Con srcset y sizes, el navegador baja la chica en tarjetas y miniaturas y la grande donde se ve
// grande. ANCHOS guarda el ancho real de cada foto servida.
const ANCHOS = {
  "/restaurante/agua.webp": 800,
  "/restaurante/aguacate.webp": 800,
  "/restaurante/cafe.webp": 1000,
  "/restaurante/carta/arrachera.webp": 1000,
  "/restaurante/carta/brisket.webp": 960,
  "/restaurante/carta/camaron.webp": 960,
  "/restaurante/carta/caprese.webp": 982,
  "/restaurante/carta/cerveza.webp": 667,
  "/restaurante/carta/cheesecake.webp": 1000,
  "/restaurante/carta/chilaquiles.webp": 1000,
  "/restaurante/carta/chili.webp": 1000,
  "/restaurante/carta/chipilin.webp": 1000,
  "/restaurante/carta/chocolate.webp": 1000,
  "/restaurante/carta/chowder.webp": 1000,
  "/restaurante/carta/cobb.webp": 600,
  "/restaurante/carta/cochinita.webp": 1000,
  "/restaurante/carta/costillas.webp": 1000,
  "/restaurante/carta/enchiladas-mineras.webp": 960,
  "/restaurante/carta/gorditas.webp": 330,
  "/restaurante/carta/hotcakes.webp": 1000,
  "/restaurante/carta/huevos-rancheros.webp": 960,
  "/restaurante/carta/machacado.webp": 960,
  "/restaurante/carta/margarita.webp": 838,
  "/restaurante/carta/mole.webp": 960,
  "/restaurante/carta/nachos.webp": 960,
  "/restaurante/carta/pastor.webp": 960,
  "/restaurante/carta/picaditas.webp": 741,
  "/restaurante/carta/quesadillas.webp": 960,
  "/restaurante/carta/risotto.webp": 500,
  "/restaurante/carta/salmon.webp": 750,
  "/restaurante/carta/tlacoyos.webp": 911,
  "/restaurante/carta/tlayuda.webp": 960,
  "/restaurante/carta/torta-ahogada.webp": 960,
  "/restaurante/carta/vino.webp": 428,
  "/restaurante/ensalada-2.webp": 1000,
  "/restaurante/ensalada.webp": 1000,
  "/restaurante/flan.webp": 800,
  "/restaurante/hamburguesa-2.webp": 1000,
  "/restaurante/hamburguesa.webp": 1000,
  "/restaurante/hongos.webp": 500,
  "/restaurante/limonada.webp": 800,
  "/restaurante/pasta.webp": 1000,
  "/restaurante/pastel.webp": 800,
  "/restaurante/pollo.webp": 800,
  "/restaurante/queso.webp": 1000,
  "/restaurante/sopa.webp": 800,
  "/restaurante/tacos.webp": 800,
  "/restaurante/tocino.webp": 500,
}

export function fotoResponsiva(src, sizes) {
  const ancho = ANCHOS[src]
  if (!ancho || ancho <= 480) return { src }
  return { src, srcSet: `${src.replace(/\.webp$/, "-480.webp")} 480w, ${src} ${ancho}w`, sizes }
}

// Tamaños con que se dibujan (medidos en V4.10.6 a 390, 768 y 1440 px).
export const TAMANOS = {
  tarjeta: "(min-width: 1000px) 480px, (min-width: 640px) 30vw, 34vw",
  destacado: "(min-width: 1000px) 480px, (min-width: 640px) 30vw, 85vw",
  galeria: "(min-width: 700px) 640px, 92vw",
}
