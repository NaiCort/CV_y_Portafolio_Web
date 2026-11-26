// Foto principal de la portada de cada tema (V4.10.5). La usan los temas (`Foto`) y la precarga
// que main.jsx pide al entrar directo a /psicologo, antes de que llegue el código de la demo. Las
// dos leen de aquí para pedir el mismo archivo: si no coincidieran, el navegador la bajaría dos veces.
//
// `precargar` solo en Neblina, donde la foto (95 KB) era lo que más tardaba. En Sala y Cuaderno el
// retrato pesa 43 KB: pedirlo antes le quitaba ancho de banda al código y la portada se dibujaba
// más tarde (mediciones en docs/RENDIMIENTO.md).
import { readTheme } from "../../utils/themeStorage"

export const PORTADAS = {
  sala: { nombre: "retrato", anchos: [500, 900], sizes: "(min-width: 900px) 440px, 90vw" },
  neblina: {
    nombre: "bosque-niebla",
    anchos: [1000, 1200, 2000],
    sizes: "100vw",
    precargar: true,
  },
  cuaderno: { nombre: "retrato", anchos: [500, 900], sizes: "(min-width: 900px) 300px, 240px" },
}

// anchos: de menor a mayor; el primero es también el `src` de respaldo.
export const archivoFoto = (nombre, ancho) => `/psicologo/fotos/${nombre}-${ancho}.webp`
export const srcsetFoto = (nombre, anchos) =>
  anchos.map((ancho) => `${archivoFoto(nombre, ancho)} ${ancho}w`).join(", ")

// Sin `href`: un navegador que no entienda `imagesrcset` no baja nada en lugar de bajar la
// versión equivocada.
export function precargarPortada(documento = document) {
  const { nombre, anchos, sizes, precargar } = PORTADAS[readTheme()]
  if (!precargar) return
  const enlace = documento.createElement("link")
  enlace.setAttribute("rel", "preload")
  enlace.setAttribute("as", "image")
  enlace.setAttribute("imagesrcset", srcsetFoto(nombre, anchos))
  enlace.setAttribute("imagesizes", sizes)
  enlace.setAttribute("fetchpriority", "high")
  documento.head.append(enlace)
}
