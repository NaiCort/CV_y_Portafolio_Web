import { precargarPortada as precargarPortadaPsicologo } from "./giros/psicologo/portadas"
import {
  precargarConocenos,
  precargarPortada as precargarPortadaPatio,
} from "./giros/restaurante/portada"

// Carga diferida de cada demo y del cotizador. La usa App (rutas perezosas) y el CV, que precarga
// la ruta al pasar el cursor o enfocarla para que la transición de entrada no muestre «Cargando…».
// El cotizador se separó en V4.10.3: la portada ya no descarga su código (presupuesto de
// rendimiento, docs/RENDIMIENTO.md).
export const CARGAS = {
  // El CV también se carga aparte (V4.10.6, DEC-021): las demos no descargan su código. En la
  // portada no se nota: llega prerenderizado y dist/index.html precarga su código y su CSS
  // (scripts/prerender.mjs).
  "/": () => import("./pages/Bienvenida"),
  "/cotizador": () => import("./pages/Cotizador"),
  "/privacidad": () => import("./pages/Privacidad"),
  "/psicologo": () => import("./giros/psicologo/PsicologoApp"),
  "/restaurante": () => import("./giros/restaurante/RestauranteRuta"),
  "/cafe": () => import("./giros/cafe/CafeApp"),
  "/gimnasio": () => import("./giros/gimnasio/GimnasioApp"),
  "/taller": () => import("./giros/taller/TallerApp"),
  "/despacho": () => import("./giros/despacho/DespachoApp"),
  "/revista": () => import("./giros/revista/RevistaApp"),
}

export const precargar = (ruta) => CARGAS[ruta]?.().catch(() => {})

// Foto principal de la página de entrada, pedida antes de que llegue el código de la demo (V4.10.5,
// docs/RENDIMIENTO.md). Solo al cargar la página y solo en la portada de cada demo (la ruta exacta):
// en las demás páginas el elemento principal suele ser el título. Al navegar desde el CV, el código
// ya se precargó. Las demás demos la agregan en su entrega de V4.10 si su medición lo pide.
const PORTADAS = {
  "/psicologo": precargarPortadaPsicologo,
  "/restaurante": precargarPortadaPatio,
  "/restaurante/conocenos": precargarConocenos,
}
export const precargarPortada = (ruta) => PORTADAS[ruta.replace(/\/+$/, "") || "/"]?.()
