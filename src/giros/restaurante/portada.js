// Fotos principales de Patio 12 y su precarga (V4.10.6). Las usan Inicio y Conócenos, y la precarga
// que main.jsx pide al entrar directo a esas páginas. En el teléfono, cada foto es el elemento
// principal, pero se pedía hasta que llegaba el código del restaurante: Inicio tardaba 2.9 s y
// Conócenos 4.4 s (docs/RENDIMIENTO.md). Las páginas y la precarga leen de aquí para pedir el mismo
// archivo. Este módulo va en el paquete común: debe quedarse chico.
export const FOTO_PORTADA = { src: "/restaurante/pasta.webp", width: 1000, height: 667 }

// La foto del local, en tres tamaños desde el original de Unsplash.
export const FOTO_LOCAL = {
  src: "/restaurante/patio-1400.webp",
  srcSet:
    "/restaurante/patio-800.webp 800w, /restaurante/patio-1200.webp 1200w, /restaurante/patio-1400.webp 1400w",
  sizes: "(min-width: 1000px) 50vw, 100vw",
  width: 1400,
  height: 933,
}

function precargar(foto, documento) {
  const enlace = documento.createElement("link")
  enlace.setAttribute("rel", "preload")
  enlace.setAttribute("as", "image")
  if (foto.srcSet) {
    enlace.setAttribute("imagesrcset", foto.srcSet)
    enlace.setAttribute("imagesizes", foto.sizes)
  } else enlace.setAttribute("href", foto.src)
  enlace.setAttribute("fetchpriority", "high")
  documento.head.append(enlace)
}
export const precargarPortada = (documento = document) => precargar(FOTO_PORTADA, documento)
export const precargarConocenos = (documento = document) => precargar(FOTO_LOCAL, documento)
