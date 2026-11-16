import { FOTOS } from "../data/medios"

export default function Creditos() {
  return (
    <section className="t-wrap t-seccion t-creditos" aria-labelledby="t-titulo">
      <h1 id="t-titulo" tabIndex={-1}>
        Créditos
      </h1>
      <p className="t-bajada">
        Las fotos vienen de Wikimedia Commons y se sirven desde este sitio. Ilustran el ambiente: no
        son Mecánica Rosales, Vértice ni su personal.
      </p>
      <ul className="t-creditos-lista">
        {Object.entries(FOTOS).map(([id, foto]) => (
          <li key={id}>
            <img src={`/taller/fotos/${id}-640.webp`} alt="" width="160" height="107" />
            <div>
              <b>{foto.nombre}</b>
              <span>
                {foto.autor} · {foto.licencia}
              </span>
              <span>Cambios: {foto.cambios}</span>
              <a href={foto.pagina} target="_blank" rel="noopener noreferrer">
                Ver en Wikimedia Commons
              </a>
            </div>
          </li>
        ))}
      </ul>
      <h2>Tipografías</h2>
      <p>
        Saira (Omnibus-Type), Figtree (Erik Kennedy) e IBM Plex Mono (IBM), con licencia SIL Open
        Font License 1.1.
      </p>
    </section>
  )
}
