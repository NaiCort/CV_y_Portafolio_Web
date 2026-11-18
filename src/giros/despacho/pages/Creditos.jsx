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
        Servidas desde este sitio. La de Xalapa es real; las demás son ilustrativas, de Unsplash y
        con su licencia de uso libre: ninguna persona es Elena Murrieta, ni clienta, ni personal de
        Cotejo, y la sala no está en Xalapa.
      </p>
      <ul className="d-confianza">
        <li>
          Techos de Xalapa, de Koffermejia, en dominio público (CC0):{" "}
          <a href={FOTOS.xalapa.origen} rel="noreferrer" target="_blank">
            página en Wikimedia Commons
          </a>
          .
        </li>
        <li>
          Consulta en la portada:{" "}
          <a href={FOTOS.consulta.origen} rel="noreferrer" target="_blank">
            original en Unsplash
          </a>
          .
        </li>
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
