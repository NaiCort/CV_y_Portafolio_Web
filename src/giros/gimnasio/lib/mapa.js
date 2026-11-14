// Calles del mapa dibujado: dos retículas giradas a cada lado del río. Sin datos reales.
export const MAPA = { ancho: 760, alto: 560 }

function reticula(angulo, paso) {
  const a = (angulo * Math.PI) / 180
  const lineas = []
  for (let k = -24; k <= 24; k++) {
    const d = k * paso
    const cx = MAPA.ancho / 2 + d * Math.cos(a + Math.PI / 2)
    const cy = MAPA.alto / 2 + d * Math.sin(a + Math.PI / 2)
    const L = 900
    lineas.push(
      `M${Math.round(cx - L * Math.cos(a))} ${Math.round(cy - L * Math.sin(a))}L${Math.round(cx + L * Math.cos(a))} ${Math.round(cy + L * Math.sin(a))}`,
    )
  }
  return lineas.join("")
}

export const CALLES = {
  oeste: reticula(12, 34) + reticula(102, 40),
  este: reticula(-8, 30) + reticula(82, 38),
}
export const RIO = "M380 0 C 330 200 420 330 300 560"
export const AVENIDAS = [
  "M0 410 C 200 380 420 300 760 330",
  "M120 0 C 160 200 230 360 260 560",
  "M560 0 C 540 160 600 380 700 560",
]
