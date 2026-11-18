import { Link } from "react-router-dom"
import Expediente from "../components/Expediente"
import Foto from "../components/Foto"
import LibroMayor from "../components/LibroMayor"
import Recibo from "../components/Recibo"
import { ESPECIALIDADES, GUIAS, OPINIONES } from "../data/confianza"
import { DESPACHO, HERRAMIENTAS, MES } from "../data/despacho"
import { FOTOS } from "../data/medios"
import { SERVICIOS_DETALLE } from "../data/servicios"

export default function Inicio({ onWhatsApp }) {
  const c = DESPACHO.contadora
  return (
    <>
      <section className="d-portada" aria-labelledby="d-titulo">
        <LibroMayor />
        <div className="d-wrap d-portada-texto">
          <h1 id="d-titulo" tabIndex={-1}>
            Que todo cuadre <span>antes del 17.</span>
          </h1>
          <div className="d-portada-pie">
            <p className="d-bajada">
              Despacho contable en Xalapa para personas físicas y empresas. Cada mes revisamos,
              comparamos y te mostramos el previo antes de presentar nada.
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
        </div>
      </section>

      <section className="d-panel-xalapa" aria-labelledby="d-xalapa-titulo">
        <img
          src={FOTOS.xalapa.src}
          srcSet={FOTOS.xalapa.srcSet}
          sizes="100vw"
          width={FOTOS.xalapa.ancho}
          height={FOTOS.xalapa.alto}
          alt={FOTOS.xalapa.alt}
          loading="lazy"
          decoding="async"
        />
        <div className="d-wrap">
          <p className="d-xalapa-contexto">
            Casi siempre, uno se entera de que algo falló cuando llega la carta del SAT, meses
            después.
          </p>
          <h2 id="d-xalapa-titulo">Tus cuentas solo están bien si cada mes cuadran.</h2>
        </div>
        <p className="d-xalapa-pie">{FOTOS.xalapa.pie}</p>
      </section>

      <section className="d-wrap d-consulta" aria-labelledby="d-consulta-titulo">
        <div className="d-consulta-texto">
          <h2 id="d-consulta-titulo">Contadores en Xalapa que te avisan antes</h2>
          <p>
            Revisamos cada mes, te mandamos el previo y nada se presenta sin tu visto bueno. Así se
            ve tu expediente: pruébalo.
          </p>
          <Expediente />
          <ul className="d-datos">
            <li>
              <b>18 años</b>
              <span>al frente, la C.P.C. Elena Murrieta</span>
            </li>
            <li>
              <b>Iguala fija</b>
              <span>desde $490 al mes, con IVA</span>
            </li>
            <li>
              <b>Sin e.firma</b>
              <span>nunca te la pedimos</span>
            </li>
          </ul>
        </div>
        <figure className="d-consulta-img">
          <Foto f={FOTOS.consulta} sizes="(max-width: 900px) 100vw, 50vw" />
          <figcaption>{FOTOS.consulta.pie}</figcaption>
        </figure>
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
          {MES.map(([dia, cuando, que, detalle]) => (
            <li key={cuando}>
              <span className="d-mes-dia" aria-hidden="true">
                {dia}
              </span>
              <span className="d-mes-cuando">{cuando}</span>
              <b>{que}</b>
              <span>{detalle}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="d-pf" aria-labelledby="d-pf-titulo">
        <Foto f={FOTOS.lista} sizes="100vw" />
        <div className="d-wrap">
          <p className="d-pf-contexto">
            Antes de presentar, cada renglón se compara contra lo que el SAT ya sabe de ti.
          </p>
          <h2 id="d-pf-titulo">Nada se presenta sin tu visto bueno.</h2>
        </div>
        <p className="d-pf-pie">{FOTOS.lista.pie}</p>
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
                <i aria-hidden="true">→</i>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="especialidades" className="d-wrap d-sec" aria-labelledby="d-esp-titulo">
        <div className="d-esp">
          <figure className="d-esp-foto">
            <Foto f={FOTOS.calle} sizes="(max-width: 900px) 100vw, 40vw" />
            <figcaption>{FOTOS.calle.pie}</figcaption>
          </figure>
          <div>
            <div className="d-sec-cab d-sec-cab-sola">
              <h2 id="d-esp-titulo">Con quién trabajamos más</h2>
              <p>
                Atendemos a todos, pero estos casos los vemos cada semana y sabemos dónde se
                tropiezan.
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
          </div>
        </div>
      </section>

      <section id="herramientas" className="d-wrap d-sec" aria-labelledby="d-herr-titulo">
        <div className="d-sec-cab">
          <h2 id="d-herr-titulo">Herramientas sin costo</h2>
          <p>Para saber dónde estás antes de hablar con nosotros.</p>
        </div>
        <ul className="d-herr">
          {HERRAMIENTAS.map(([nombre, detalle, ruta]) => (
            <li key={nombre}>
              <Link to={ruta}>
                <b>{nombre}</b>
                <span>{detalle}</span>
                <em aria-hidden="true">Abrir →</em>
              </Link>
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
            <Foto f={FOTOS.contadora} sizes="(max-width: 900px) 90vw, 420px" />
            <figcaption>{FOTOS.contadora.pie}</figcaption>
          </figure>
          <div>
            <h2 id="d-equipo-titulo">Con una contadora al frente</h2>
            <blockquote className="d-cita">
              <p>
                «Reviso cada declaración antes de que se presente. Si algo no cuadra, te lo digo
                antes que el SAT.»
              </p>
            </blockquote>
            <p className="d-frente-nombre">
              <b>
                {c.titulo} {c.nombre}
              </b>{" "}
              · {c.detalle}
            </p>
            <ul className="d-confianza">
              <li>Nunca te pedimos tu e.firma: es tuya y equivale a tu firma.</li>
              <li>Lo que sabemos de tu negocio queda bajo secreto profesional.</li>
              <li>Si cambias de despacho, te entregamos todo tu expediente.</li>
            </ul>
            <p className="d-nota">
              Persona, cita y cédula inventadas para esta demo; en un despacho real, la cédula se
              verifica gratis en el registro de la SEP.
            </p>
          </div>
        </div>
        <figure className="d-sala">
          <Foto f={FOTOS.sala} sizes="(max-width: 1200px) 100vw, 1136px" />
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
