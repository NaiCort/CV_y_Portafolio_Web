import { SECCIONES } from "./cvSecciones"

// Índice del CV con la sección activa (V4.8.3, docs/IDEAS_CV.md).

export function Indice({ activa, onIr }) {
  return (
    <nav className="cv-indice" aria-label="Secciones del CV">
      <ol>
        {SECCIONES.map(([id, nombre]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activa === id ? "true" : undefined}
              onClick={(e) => onIr(e, id)}
            >
              {nombre}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
