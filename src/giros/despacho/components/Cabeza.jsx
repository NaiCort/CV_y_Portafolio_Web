import { Link } from "react-router-dom"

// Encabezado de las páginas interiores (V4.6.8): ruta, título grande con la segunda mitad en
// gris y bajada, sobre los renglones del libro mayor. Las palomas son decorativas.
const PALOMAS = [
  ["22%", "26px", "ok"],
  ["9%", "70px", "ok"],
  ["31%", "114px", "ok"],
  ["15%", "180px", "ojo"],
  ["4%", "224px", "ok"],
]

export default function Cabeza({ ruta, titulo, gris, bajada, children }) {
  return (
    <header className="d-cabeza">
      <div className="d-cabeza-renglones" aria-hidden="true">
        {PALOMAS.map(([derecha, arriba, tipo]) => (
          <i
            key={derecha}
            className={`d-paloma d-paloma-${tipo}`}
            style={{ right: derecha, top: arriba }}
          />
        ))}
      </div>
      <div className="d-wrap">
        <nav className="d-ruta" aria-label="Ruta">
          <Link to="/despacho">Inicio</Link>
          {ruta.map((r) =>
            Array.isArray(r) ? (
              <span key={r[1]}>
                {" / "}
                <Link to={r[0]}>{r[1]}</Link>
              </span>
            ) : (
              <span key={r}> / {r}</span>
            ),
          )}
        </nav>
        <h1 id="d-titulo" tabIndex={-1}>
          {titulo} {gris && <span>{gris}</span>}
        </h1>
        {bajada && <p className="d-bajada">{bajada}</p>}
        {children}
      </div>
    </header>
  )
}
