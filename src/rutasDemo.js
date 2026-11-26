import { precargarPortada as precargarPortadaPsicologo } from "./giros/psicologo/portadas"

// Carga diferida de cada demo y del cotizador. La usa App (rutas perezosas) y el CV, que precarga
// la ruta al pasar el cursor o enfocarla para que la transición de entrada no muestre «Cargando…».
// El cotizador se separó en V4.10.3: la portada ya no descarga su código (presupuesto de
// rendimiento, docs/RENDIMIENTO.md).
export const CARGAS = {
  "/cotizador": () => import("./pages/Cotizador"),
  "/privacidad": () => import("./pages/Privacidad"),
  "/psicologo": () => import("./giros/psicologo/PsicologoApp"),
  "/restaurante": () => import("./giros/restaurante/RestauranteApp"),
  "/cafe": () => import("./giros/cafe/CafeApp"),
  "/gimnasio": () => import("./giros/gimnasio/GimnasioApp"),
  "/taller": () => import("./giros/taller/TallerApp"),
  "/despacho": () => import("./giros/despacho/DespachoApp"),
  "/revista": () => import("./giros/revista/RevistaApp"),
}

export const precargar = (ruta) => CARGAS[ruta]?.().catch(() => {})

// Foto principal de la ruta de entrada, pedida antes de que llegue el código de la demo (V4.10.5,
// docs/RENDIMIENTO.md). Solo al cargar la página: al navegar desde el CV, el código ya se precargó.
// Las demás demos la agregan en su entrega de V4.10 si su medición lo pide.
const PORTADAS = { "/psicologo": precargarPortadaPsicologo }
export const precargarPortada = (ruta) => PORTADAS[`/${ruta.split("/")[1]}`]?.()
