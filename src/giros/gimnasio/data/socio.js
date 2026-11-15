// Perfil de ejemplo para el área de socio. Andrea no existe; sus datos son inventados.
export const SOCIO = {
  nombre: "Andrea",
  apellido: "Ruiz",
  correo: "andrea@socio.demo",
  plan: "club",
  base: "centro",
  desde: "2026-03-02",
  codigo: "BRIO-SOCIO-DEMO-0427",
  meta: 3,
  racha: 3,
  // Minutos por día, de lunes a domingo, de la semana en curso.
  semana: [55, 0, 72, 0, 59, 0, 0],
  pedido: { producto: "Proteína de vainilla, 1 kg", sucursal: "centro" },
  // Mediciones de composición corporal de ejemplo (báscula de bioimpedancia en el club).
  mediciones: [
    { fecha: "2026-05-04", peso: 66.8, musculo: 24.1, grasa: 31.2, visceral: 7 },
    { fecha: "2026-06-29", peso: 65.9, musculo: 24.5, grasa: 30.1, visceral: 7 },
    { fecha: "2026-08-24", peso: 65.1, musculo: 25.0, grasa: 28.7, visceral: 6 },
    { fecha: "2026-10-19", peso: 64.6, musculo: 25.4, grasa: 27.6, visceral: 6 },
  ],
  // Lo que mostraría un reloj conectado hoy, solo como ejemplo.
  reloj: { pasos: 7480, metaPasos: 9000, kcalActivas: 412, fcReposo: 62 },
}

// Credenciales de la demo: se muestran en pantalla, no son secretas.
export const CREDENCIALES = { correo: SOCIO.correo, clave: "brio-demo" }
