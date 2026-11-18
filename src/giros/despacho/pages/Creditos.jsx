import { FOTOS } from "../data/medios"

export default function Creditos() {
  return (
    <section className="d-wrap d-sec d-pagina" aria-labelledby="d-titulo">
      <h1 id="d-titulo" tabIndex={-1}>
        Créditos
      </h1>
      <p className="d-bajada">
        El expediente, el recibo y los documentos están dibujados en la página. La contadora, los
        clientes y sus opiniones son inventados.
      </p>
      <h2>Fotos</h2>
      <p>
        Dos fotos ilustrativas de Unsplash, con su licencia de uso libre, recortadas y servidas
        desde este sitio. La persona del retrato no es Elena Murrieta ni trabaja en un despacho, y
        la sala no está en Xalapa.
      </p>
      <ul className="d-confianza">
        <li>
          Retrato de la sección «Con una contadora al frente»:{" "}
          <a href={FOTOS.contadora.origen} rel="noreferrer" target="_blank">
            original en Unsplash
          </a>
          .
        </li>
        <li>
          Sala de juntas:{" "}
          <a href={FOTOS.sala.origen} rel="noreferrer" target="_blank">
            original en Unsplash
          </a>
          ; se recortó para dejar fuera un cuadro de otra ciudad.
        </li>
      </ul>
      <p className="d-nota">
        Procedencia, cambios y huella de cada archivo en /despacho/medios-origen.json.
      </p>
      <h2>Tipografías</h2>
      <p>
        Literata (TypeTogether) e Instrument Sans (Instrument), con licencia SIL Open Font License
        1.1, servidas desde este sitio.
      </p>
    </section>
  )
}
