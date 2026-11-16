import Testigos from "../components/Testigos"
import OrdenServicio from "../components/OrdenServicio"
import ConsultaAuto from "../components/ConsultaAuto"
import Ubicacion from "../components/Ubicacion"
import { kmTexto, precioServicio } from "../lib/formato"

function Garaje({ garaje }) {
  const avance = (garaje.km - garaje.ultimo) / (garaje.siguiente - garaje.ultimo)
  return (
    <figure className="t-garaje">
      <div className="t-garaje-cab">
        <span>Mi garaje · {garaje.auto}</span>
        <span>Perfil de ejemplo</span>
      </div>
      <p className="t-garaje-km t-num">{kmTexto(garaje.km)}</p>
      <div
        className="t-garaje-barra"
        role="meter"
        aria-label="Avance hacia el siguiente servicio"
        aria-valuemin={garaje.ultimo}
        aria-valuemax={garaje.siguiente}
        aria-valuenow={garaje.km}
        aria-valuetext={`${kmTexto(garaje.km)} de ${kmTexto(garaje.siguiente)}`}
      >
        <i style={{ width: `${Math.round(avance * 100)}%` }} />
      </div>
      <figcaption className="t-num">
        <span>Último servicio: {kmTexto(garaje.ultimo)}</span>
        <span>Siguiente: {kmTexto(garaje.siguiente)}</span>
      </figcaption>
    </figure>
  )
}

export default function Inicio({ taller, onAgendar, onWhatsApp, onLlamar }) {
  const esRosales = taller.id === "rosales"
  return (
    <>
      <section className="t-wrap t-heroe" aria-labelledby="t-titulo">
        <div className="t-heroe-txt">
          <h1 id="t-titulo" tabIndex={-1}>
            {taller.titulo}
          </h1>
          <p className="t-bajada">{taller.bajada}</p>
          <div className="t-acciones">
            <button type="button" className="t-btn t-btn-p" onClick={() => onAgendar()}>
              Agendar cita
            </button>
            <button type="button" className="t-btn t-btn-s" onClick={onWhatsApp}>
              Escribir por WhatsApp
            </button>
          </div>
        </div>
        <div className="t-heroe-foto">
          <img
            src={`/taller/fotos/${taller.foto.id}-1280.webp`}
            srcSet={`/taller/fotos/${taller.foto.id}-640.webp 640w, /taller/fotos/${taller.foto.id}-1280.webp 1280w`}
            sizes="(max-width: 900px) 100vw, 50vw"
            width={taller.foto.ancho}
            height={taller.foto.alto}
            alt={taller.foto.alt}
            fetchPriority="high"
          />
        </div>
      </section>

      <section id="testigos" className="t-wrap t-seccion" aria-labelledby="t-testigos-titulo">
        <div className="t-sec-cab">
          <h2 id="t-testigos-titulo">¿Qué luz se encendió?</h2>
          <p>
            Elige el testigo que viste en tu tablero: te decimos qué puede ser, si es urgente y
            cuánto cuesta revisarlo.
          </p>
        </div>
        <Testigos taller={taller} onAgendar={onAgendar} />
        <p className="t-nota">
          Orientación general. Cada auto es distinto: si dudas, revisa el manual o llámanos.
        </p>
      </section>

      <section
        id="presupuesto"
        className="t-wrap t-seccion t-dos"
        aria-labelledby="t-presupuesto-titulo"
      >
        <div>
          <h2 id="t-presupuesto-titulo">{taller.presupuesto.titulo}</h2>
          <ul className="t-puntos">
            {taller.presupuesto.puntos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {esRosales ? (
            <div id="consulta" className="t-consulta-bloque">
              <h3>Consulta tu auto</h3>
              <p>Con el folio de tu orden y tus placas ves en qué va, sin llamar y sin cuenta.</p>
              <ConsultaAuto orden={taller.orden} />
            </div>
          ) : (
            <Garaje garaje={taller.garaje} />
          )}
        </div>
        <OrdenServicio orden={taller.orden} />
      </section>

      <section
        id="precios"
        className="t-wrap t-seccion t-precios"
        aria-labelledby="t-precios-titulo"
      >
        <div>
          <h2 id="t-precios-titulo">Precios desde</h2>
          <p>
            Mano de obra: {precioServicio({ precio: taller.manoDeObra })} la hora. Garantía de{" "}
            {taller.garantia}. Precios con IVA.
          </p>
        </div>
        <ul className="t-lista-precios">
          {taller.servicios.map((s) => (
            <li key={s.id}>
              <div>
                <b>{s.nombre}</b>
                <span>{s.detalle}</span>
              </div>
              <span className="t-precio t-num">{precioServicio(s)}</span>
            </li>
          ))}
        </ul>
      </section>

      <Ubicacion key={taller.id} taller={taller} onAgendar={onAgendar} onLlamar={onLlamar} />
    </>
  )
}
