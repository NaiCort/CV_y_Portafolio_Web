import { Link } from "react-router-dom"
import Expediente from "../components/Expediente"
import Recibo from "../components/Recibo"
import { ESPECIALIDADES, GUIAS, OPINIONES } from "../data/confianza"
import { DESPACHO, HERRAMIENTAS, MES } from "../data/despacho"
import { FOTOS } from "../data/medios"
import { SERVICIOS_DETALLE } from "../data/servicios"

export default function Inicio({ onWhatsApp }) {
  const c = DESPACHO.contadora
  return (
    <>
      <section className="d-wrap d-heroe" aria-labelledby="d-titulo">
        <div>
          <h1 id="d-titulo" tabIndex={-1}>
            Sabes cómo vas con el SAT sin tener que preguntar
          </h1>
          <p className="d-bajada">
            Despacho contable para personas físicas y empresas en Xalapa. Tu situación en un
            semáforo, el previo antes del 17 y WhatsApp para todo lo demás.
          </p>
          <div className="d-acciones">
            <Link className="d-btn d-btn-p" to="/despacho/precios#cotizar">
              Cotizar en 24 horas
            </Link>
            <button type="button" className="d-btn" onClick={onWhatsApp}>
              Escribir por WhatsApp
            </button>
          </div>
        </div>
        <Expediente />
      </section>

      <section id="precios" className="d-wrap d-sec" aria-labelledby="d-precios-titulo">
        <div className="d-sec-cab">
          <h2 id="d-precios-titulo">Elige tu régimen y ve el precio</h2>
          <p>
            Precios aproximados con IVA. Si no sabes cuál es el tuyo, te lo decimos sin costo en la
            primera llamada.
          </p>
        </div>
        <Recibo />
      </section>

      <section id="como" className="d-wrap d-sec" aria-labelledby="d-como-titulo">
        <div className="d-sec-cab">
          <h2 id="d-como-titulo">Así trabajamos cada mes</h2>
          <p>Nada se presenta sin tu visto bueno y nada se te pasa el 17.</p>
        </div>
        <ol className="d-mes">
          {MES.map(([cuando, que, detalle]) => (
            <li key={cuando}>
              <span className="d-mes-cuando">{cuando}</span>
              <b>{que}</b>
              <span>{detalle}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="servicios" className="d-wrap d-sec" aria-labelledby="d-serv-titulo">
        <div className="d-sec-cab">
          <h2 id="d-serv-titulo">Todo lo contable, en un solo despacho</h2>
          <p>Para personas físicas y para empresas. Lo que no está en la lista, lo cotizamos.</p>
        </div>
        <ul className="d-servicios">
          {SERVICIOS_DETALLE.map((x) => (
            <li key={x.id}>
              <Link to={`/despacho/servicios#${x.id}`}>
                <b>{x.nombre}</b>
                <span>{x.para}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="especialidades" className="d-wrap d-sec" aria-labelledby="d-esp-titulo">
        <div className="d-sec-cab">
          <h2 id="d-esp-titulo">Con quién trabajamos más</h2>
          <p>
            Atendemos a todos, pero estos casos los vemos cada semana y sabemos dónde se tropiezan.
          </p>
        </div>
        <dl className="d-especialidades">
          {ESPECIALIDADES.map((x) => (
            <div key={x.quien}>
              <dt>
                <b>{x.quien}</b>
                <span>{x.ejemplos}</span>
              </dt>
              <dd>{x.vemos}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="herramientas" className="d-wrap d-sec" aria-labelledby="d-herr-titulo">
        <div className="d-sec-cab">
          <h2 id="d-herr-titulo">Herramientas sin costo</h2>
          <p>Para saber dónde estás antes de hablar con nosotros.</p>
        </div>
        <ul className="d-herr">
          {HERRAMIENTAS.map(([nombre, detalle, ruta]) => (
            <li key={nombre}>
              {ruta ? (
                <Link to={ruta}>
                  <b>{nombre}</b>
                  <span>{detalle}</span>
                </Link>
              ) : (
                <div>
                  <b>{nombre}</b>
                  <span>{detalle}</span>
                  <em>Llega en la siguiente entrega de esta demo.</em>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section id="guias" className="d-wrap d-sec" aria-labelledby="d-guias-titulo">
        <div className="d-sec-cab">
          <h2 id="d-guias-titulo">Guías cortas</h2>
          <p>Lo que más nos preguntan, en cinco minutos o menos.</p>
        </div>
        <ul className="d-guias">
          {GUIAS.map((g) => (
            <li key={g.id}>
              <Link to={`/despacho/guias#${g.id}`}>
                <b>{g.titulo}</b>
                <span>{g.resumen}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="equipo" className="d-wrap d-sec" aria-labelledby="d-equipo-titulo">
        <div className="d-frente">
          <figure className="d-retrato">
            <img
              src={FOTOS.contadora.src}
              srcSet={FOTOS.contadora.srcSet}
              sizes="(max-width: 640px) 60vw, 240px"
              width={FOTOS.contadora.ancho}
              height={FOTOS.contadora.alto}
              alt={FOTOS.contadora.alt}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{FOTOS.contadora.pie}</figcaption>
          </figure>
          <div>
            <h2 id="d-equipo-titulo">Con una contadora al frente</h2>
            <p className="d-frente-nombre">
              {c.titulo} {c.nombre}
            </p>
            <p>{c.detalle}</p>
            <ul className="d-confianza">
              <li>Nunca te pedimos tu e.firma: es tuya y equivale a tu firma.</li>
              <li>Lo que sabemos de tu negocio queda bajo secreto profesional.</li>
              <li>Si cambias de despacho, te entregamos todo tu expediente.</li>
            </ul>
            <p className="d-nota">
              Persona y cédula inventadas para esta demo; en un despacho real, la cédula se verifica
              gratis en el registro de la SEP.
            </p>
          </div>
        </div>
        <figure className="d-sala">
          <img
            src={FOTOS.sala.src}
            srcSet={FOTOS.sala.srcSet}
            sizes="(max-width: 1180px) calc(100vw - 36px), 1120px"
            width={FOTOS.sala.ancho}
            height={FOTOS.sala.alto}
            alt={FOTOS.sala.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            {FOTOS.sala.pie} Atendemos con cita de {DESPACHO.horario.toLowerCase()}.
          </figcaption>
        </figure>
      </section>

      <section id="opiniones" className="d-wrap d-sec" aria-labelledby="d-op-titulo">
        <div className="d-sec-cab">
          <h2 id="d-op-titulo">Lo que dicen nuestros clientes</h2>
          <p>
            Opiniones inventadas para esta demo; un despacho real enlazaría reseñas verificables.
          </p>
        </div>
        <ul className="d-opiniones">
          {OPINIONES.map((o) => (
            <li key={o.quien}>
              <blockquote>
                <p>{o.texto}</p>
              </blockquote>
              <p className="d-opinion-quien">
                <b>{o.quien}</b> · {o.giro}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
