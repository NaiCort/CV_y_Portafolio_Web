import { TRAZOS } from "../../data/umbral-trazos"
import { useEnVista } from "../../lib/umbral-movimiento"

// Adornos de cartel: siempre decorativos (aria-hidden). El texto que importa va en HTML real.

// Código de barras determinista a partir de un texto.
export function Barras({ texto = "UMBRAL", etiqueta, className = "" }) {
  const anchos = [...texto.padEnd(14, "·")].map((c, i) => 1 + ((c.charCodeAt(0) * (i + 3)) % 4))
  let x = 0
  const barras = anchos.map((w, i) => {
    const r = { x, w: i % 2 ? w * 0.6 : w }
    x += w + 1.2
    return r
  })
  return (
    <span className={`um-barras ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${x} 20`} preserveAspectRatio="none">
        {barras.map((b) => (
          <rect key={b.x} x={b.x} width={b.w} height="20" />
        ))}
      </svg>
      {etiqueta && <span>{etiqueta}</span>}
    </span>
  )
}

export function Mira({ className = "" }) {
  return (
    <svg className={`um-mira ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="11" />
      <path d="M20 2v36M2 20h36" />
    </svg>
  )
}

export function Estrella({ className = "" }) {
  return (
    <svg className={`um-estrella ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0C21.5 13 27 18.5 40 20 27 21.5 21.5 27 20 40 18.5 27 13 21.5 0 20 13 18.5 18.5 13 20 0Z" />
    </svg>
  )
}

// Marca de registro de imprenta (esquinas del pliego).
export function Registro({ className = "" }) {
  return (
    <svg className={`um-registro ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0v24M0 12h24" />
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

// Palabra caligráfica que se escribe sola: el trazo recorre la letra y luego se rellena.
export function Caligrafia({ palabra, className = "" }) {
  const t = TRAZOS[palabra]
  const [ref, visto] = useEnVista()
  return (
    <svg
      ref={ref}
      className={`um-caligrafia ${visto ? "um-escrita" : ""} ${className}`}
      viewBox={t.vb}
      aria-hidden="true"
    >
      <path d={t.d} pathLength="1" />
    </svg>
  )
}
