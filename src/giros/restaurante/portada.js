// Foto de la portada de Patio 12 (V4.10.6). La usan Inicio y la precarga que main.jsx pide al
// entrar directo a /restaurante. En el teléfono, la foto asoma en la primera pantalla y es el
// elemento principal, pero se pedía hasta que llegaba el código del restaurante: la portada tardaba
// 2.9 s (docs/RENDIMIENTO.md). Las dos leen de aquí para pedir el mismo archivo.
export const FOTO_PORTADA = { src: "/restaurante/pasta.webp", width: 1000, height: 667 }

export function precargarPortada(documento = document) {
  const enlace = documento.createElement("link")
  enlace.setAttribute("rel", "preload")
  enlace.setAttribute("as", "image")
  enlace.setAttribute("href", FOTO_PORTADA.src)
  enlace.setAttribute("fetchpriority", "high")
  documento.head.append(enlace)
}
