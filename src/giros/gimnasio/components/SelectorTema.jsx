import { TEMAS } from "../lib/tema"

// Selector propio de Brío: dos paletas sobre la misma estructura (docs/FICHA_GIMNASIO.md).
export default function SelectorTema({ tema, onCambiar }) {
  const actual = TEMAS.find((t) => t.id === tema)
  return (
    <div className="b-temas demo-theme-switcher" role="group" aria-label="Tema de color de la demo">
      <span className="b-temas-nombre" aria-live="polite">
        Tema {actual.nombre}
      </span>
      <div className="b-temas-botones">
        {TEMAS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={t.id === tema}
            aria-label={`Tema ${t.nombre}`}
            onClick={() => onCambiar(t.id)}
          >
            <span style={{ background: t.color }} />
          </button>
        ))}
      </div>
    </div>
  )
}
