// Carga diferida de cada demo. La usa App (rutas perezosas) y el CV, que precarga la demo al
// pasar el cursor o enfocarla para que la transición de entrada no muestre «Cargando demo…».
export const CARGAS = {
  "/psicologo": () => import("./giros/psicologo/PsicologoApp"),
  "/restaurante": () => import("./giros/restaurante/RestauranteApp"),
  "/cafe": () => import("./giros/cafe/CafeApp"),
  "/gimnasio": () => import("./giros/gimnasio/GimnasioApp"),
  "/taller": () => import("./giros/taller/TallerApp"),
  "/despacho": () => import("./giros/despacho/DespachoApp"),
  "/revista": () => import("./giros/revista/RevistaApp"),
}

export const precargar = (ruta) => CARGAS[ruta]?.().catch(() => {})
