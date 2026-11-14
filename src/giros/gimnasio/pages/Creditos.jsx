import { FOTOS } from "../data/medios"

const NOMBRES = {
  combate: "Combate",
  ciclo: "Ciclo",
  press: "Fuerza, video",
  socia: "Perfil de ejemplo",
}

export default function Creditos() {
  return (
    <section className="b-wrap b-creditos" aria-labelledby="b-titulo">
      <h1 id="b-titulo" tabIndex={-1} className="b-d b-media">
        Créditos
      </h1>
      <p className="b-lead">
        Las fotos y el video vienen de Wikimedia Commons y se sirven desde este sitio. Ilustran el
        ambiente: no son Brío, sus sucursales ni sus coaches.
      </p>
      <ul className="b-creditos-lista">
        {Object.entries(FOTOS).map(([id, foto]) => (
          <li key={id}>
            <img src={`/gimnasio/fotos/${id}-640.webp`} alt="" width="160" height="107" />
            <div>
              <b>{NOMBRES[id]}</b>
              <span>
                {foto.autor} · {foto.licencia}
              </span>
              {foto.cambios && <span>Cambios: {foto.cambios}</span>}
              <a href={foto.pagina} target="_blank" rel="noopener noreferrer">
                Ver en Wikimedia Commons
              </a>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="b-d b-media b-creditos-sub">Tipografías</h2>
      <p>
        Anybody (Etcetera Type Co.) y Public Sans (USWDS), con licencia SIL Open Font License 1.1.
      </p>
    </section>
  )
}
