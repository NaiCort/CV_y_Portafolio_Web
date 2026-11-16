import { TEMAS } from "../lib/tema"

// Selector propio del taller: cada tema es otro negocio sobre la misma estructura.
export default function SelectorTema({ tema, onCambiar }) {
  const actual = TEMAS.find((t) => t.id === tema)
  return (
    <div className="t-temas demo-theme-switcher" role="group" aria-label="Taller de la demo">
      <span className="t-temas-nombre" aria-live="polite">
        {actual.nombre}
      </span>
      <div className="t-temas-botones">
        {TEMAS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={t.id === tema}
            aria-label={`${t.nombre} (${t.detalle.toLowerCase()})`}
            onClick={() => onCambiar(t.id)}
          >
            <span style={{ background: t.color }} />
          </button>
        ))}
      </div>
    </div>
  )
}
