import { FOTOS } from "../data/medios"
import Cabeza from "../components/Cabeza"

export default function Creditos() {
  return (
    <section className="d-pagina" aria-labelledby="d-titulo">
      <Cabeza
        ruta={["Créditos"]}
        titulo="Créditos"
        gris="de fotos y letras."
        bajada="El expediente, el recibo y los documentos están dibujados en la página. La contadora, los clientes y sus opiniones son inventados."
      />
      <div className="d-wrap d-pagina-cuerpo">
        <h2>Fotos</h2>
        <p>
          Servidas desde este sitio. Las de Xalapa son reales; las demás son ilustrativas, de
          Unsplash y con su licencia de uso libre: ninguna persona es Elena Murrieta, ni clienta, ni
          personal de Cotejo, y la sala no está en Xalapa.
        </p>
        <ul className="d-confianza">
          {Object.values(FOTOS).map((f) => (
            <li key={f.src}>
              {f.credito}:{" "}
              <a href={f.origen} rel="noreferrer" target="_blank">
                {f.enlace}
              </a>
              .
            </li>
          ))}
        </ul>
        <p className="d-nota">
          Procedencia, cambios y huella de cada archivo en /despacho/medios-origen.json.
        </p>
        <h2>Tipografías</h2>
        <p>
          Literata (TypeTogether) e Instrument Sans (Instrument), con licencia SIL Open Font License
          1.1, servidas desde este sitio.
        </p>
      </div>
    </section>
  )
}
