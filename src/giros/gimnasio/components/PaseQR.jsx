import { useEffect, useMemo, useState } from "react"
import QRCode from "qrcode"

import { PERIODO_PASE as PERIODO, codigoDelPase } from "../lib/pase"

// Pase de entrada simulado. Contiene un texto de demostración, no abre ningún torniquete.

export default function PaseQR({ base }) {
  const [ahora, setAhora] = useState(() => Date.now())
  useEffect(() => {
    const timer = setInterval(() => setAhora(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  const codigo = codigoDelPase(base, ahora)
  const modulos = useMemo(
    () => QRCode.create(codigo, { errorCorrectionLevel: "M" }).modules,
    [codigo],
  )
  const restante = PERIODO - (Math.floor(ahora / 1000) % PERIODO)
  const n = modulos.size
  let d = ""
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (modulos.get(y, x)) d += `M${x} ${y}h1v1h-1z`
  return (
    <div className="b-pase">
      <svg
        viewBox={`-2 -2 ${n + 4} ${n + 4}`}
        className="b-qr"
        role="img"
        aria-label="Código QR de demostración"
        shapeRendering="crispEdges"
      >
        <rect x="-2" y="-2" width={n + 4} height={n + 4} fill="#fff" />
        <path d={d} fill="#16171A" />
      </svg>
      <div>
        <b>Pase de entrada</b>
        <span>Acércalo al torniquete de cualquier sucursal.</span>
        <em className="b-num">Se renueva en 0:{String(restante).padStart(2, "0")}</em>
      </div>
    </div>
  )
}
