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
