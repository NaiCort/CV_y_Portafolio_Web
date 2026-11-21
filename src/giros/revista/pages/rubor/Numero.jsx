import { notasRubor } from "../../data/notasRubor"
import { Link } from "react-router-dom"
import Comentarios from "../../components/Comentarios"
import { ACTUAL, EDITORA, LECTORA, NUMEROS, fechaNumero, foto, fotoSrcSet } from "../../data/rubor"
import { useMarcadores } from "../../lib/marcadores"

function Codigo() {
  return (
    <div className="rb-codigo" aria-hidden="true">
      {Array.from({ length: 30 }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  )
}

function Foto({ clave, sizes, posicion, alt = "" }) {
  return (
    <img
      src={foto(clave)}
      srcSet={fotoSrcSet(clave)}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={posicion ? { objectPosition: posicion } : undefined}
    />
  )
}

function Guardar({ numero }) {
  const [guardados, alternar] = useMarcadores("rubor")
  const si = guardados.includes(numero.n)
  return (
    <button
      type="button"
      className={si ? "rb-boton rb-boton-on" : "rb-boton"}
      aria-pressed={si}
      onClick={() => alternar(numero.n)}
    >
      {si ? "★ Guardado en marcadores" : "☆ Guardar número"}
    </button>
  )
}

function Portada({ numero }) {
  const p = numero.portada
  const titulo = (
    <h1 className="rb-mast">
      RUBOR
      <span className="rv-oculto">
        {" "}
        N.º {numero.n}, {fechaNumero(numero).toLowerCase()}: {p.persona}
      </span>
    </h1>
  )
  return (
    <section className={numero.completo ? "rb-portada" : "rb-portada rb-portada-archivo"}>
      <div className="rb-rejilla" aria-hidden="true" />
      {numero.completo ? (
        <div className="rb-disco" aria-hidden="true" />
      ) : (
        <div className="rb-tinte rb-portada-foto" aria-hidden="true">
          <Foto clave={numero.foto} sizes="100vw" posicion="50% 25%" />
        </div>
      )}
      {numero.completo && (
        <img
          className="rb-recorte"
          src={foto(p.recorte, 1400)}
          srcSet={`${foto(p.recorte, 700)} ${Math.round(p.ancho / 2)}w, ${foto(p.recorte, 1000)} ${Math.round((p.ancho * 1000) / 1400)}w, ${foto(p.recorte, 1400)} ${p.ancho}w`}
          sizes="(max-width: 640px) 60vw, 45vw"
          width={p.ancho}
          height={1400}
          alt={`${p.persona}, en la portada (persona ilustrativa)`}
          fetchPriority="high"
        />
      )}
      {/* El contenido va en flujo, de arriba abajo: nada se encima en ningún tamaño. */}
      <div className="rb-port-cont">
        {titulo}
        <p className="rb-numfecha">
          N.º {numero.n} · {fechaNumero(numero)}
          {numero.precio ? ` · ${numero.precio}` : ""}
        </p>
        <div className="rb-port-lineas">
          <div className="rb-lin rb-l1">
            <small>Portada</small>
            <b>
              {p.protagonista[0]} <span className="rb-r">{p.protagonista.slice(1).join(" ")}</span>
            </b>
            {p.frase ? <em>{p.frase}</em> : <em>«{numero.tema}»</em>}
            {p.cifra && (
              <p className="rb-cifra">
                <span>{p.cifra[0]}</span>
                <b>{p.cifra[1]}</b>
                <em>{p.cifra[2]}</em>
              </p>
            )}
          </div>
          {p.derecha && (
            <div className="rb-lin rb-l2">
              {p.derecha.map(([et, t, b]) => (
                <p key={t}>
                  <small>{et}</small>
                  <b>{t}</b>
                  <em>{b}</em>
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="rb-port-pie">
          <Codigo />
          {numero.completo && (
            <a className="rb-baja" href="#sumario">
              Baja para hojear ↓
            </a>
          )}
          <p className="rb-pie-foto">
            Foto ilustrativa (Unsplash). {p.persona} es un personaje ficticio.
          </p>
        </div>
      </div>
    </section>
  )
}

function Folio({ numero, pagina, lado = "d" }) {
  return (
    <span className={`rb-folio rb-folio-${lado}`} aria-hidden="true">
      {lado === "d" ? `Rubor · ${fechaNumero(numero)} · ${pagina}` : pagina}
    </span>
  )
}

function Archivo({ numero, plan }) {
  const anteriores = NUMEROS.filter((x) => x.n !== numero.n).slice(0, 3)
  return (
    <section id="sumario" className="rb-archivo" aria-labelledby="rb-archivo-titulo">
      <h2 id="rb-archivo-titulo">
        Número de <span>archivo</span>
      </h2>
      <p>
        «{numero.tema}», {fechaNumero(numero)}. En acceso libre, solo el N.º 24 y el N.º 23 tienen
        edición completa.
      </p>
      {plan ? (
        <article>
          <h3>Notas de la editora · {numero.tema}</h3>
          <p>{notasRubor[numero.n - 1]}</p>
        </article>
      ) : (
        <p>
          <Link className="rb-boton" to={`/revista/rubor/cuenta?numero=${numero.n}`}>
            Suscribirme para leer la nota de archivo
          </Link>
        </p>
      )}
      <div className="rb-acciones">
        <Guardar numero={numero} />
        <Link className="rb-boton rb-boton-on" to="/revista/rubor">
          Ir al número actual
        </Link>
        <Link className="rb-boton" to="/revista/rubor/numero/23">
          Hojear el N.º 23
        </Link>
      </div>
      <Anteriores lista={anteriores} />
    </section>
  )
}

function Anteriores({ lista }) {
  return (
    <div className="rb-anteriores">
      <h2>Números anteriores</h2>
      <ul>
        {lista.map((x) => (
          <li key={x.n}>
            <Link to={x.n === ACTUAL.n ? "/revista/rubor" : `/revista/rubor/numero/${x.n}`}>
              <img src={foto(x.foto, 600)} alt="" loading="lazy" width={110} height={146} />
              <span>
                <small>
                  N.º {x.n} · {fechaNumero(x)}
                </small>
                <b>{x.tema}</b>
                <em>{x.completo ? "Completo en esta demo" : "Archivo"}</em>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Numero({ numero, plan }) {
  if (!numero.completo)
    return (
      <main>
        <Portada numero={numero} />
        <Archivo numero={numero} plan={plan} />
      </main>
    )
  const { sumario, carta, entrevista: e, anuncio, reportaje: r } = numero
  const pag = Object.fromEntries(sumario.map(([p, , , id]) => [id, p]))
  const anteriores = NUMEROS.filter((x) => x.n !== numero.n).slice(0, 3)
  return (
    <main>
      <Portada numero={numero} />

      <section id="sumario" className="rb-sumario rb-pag" aria-labelledby="rb-sum-titulo">
        <div className="rb-tinte">
          <Foto clave={numero.sumarioFoto} sizes="(max-width: 640px) 100vw, 50vw" />
        </div>
        <div className="rb-sumario-txt">
          <h2 id="rb-sum-titulo">
            En este <span>número</span>
          </h2>
          <ol>
            {sumario.map(([p, t, b, id]) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span>{p}</span>
                  <b>{t}</b>
                  <em>{b}</em>
                </a>
              </li>
            ))}
          </ol>
          <nav aria-label="Más de Rubor">
            <Link to="/revista/rubor/secciones">Explorar secciones</Link>
            {numero.n === ACTUAL.n && (
              <>
                {" "}
                · <Link to="/revista/rubor/sesion">Detrás de cámaras</Link>
              </>
            )}
          </nav>
          <Guardar numero={numero} />
        </div>
        <Folio numero={numero} pagina={3} />
      </section>

      <section id="carta" className="rb-carta rb-pag" aria-labelledby="rb-carta-titulo">
        <h2 id="rb-carta-titulo">Carta de la editora</h2>
        <div>
          {carta.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p className="rb-firma">{EDITORA}, editora (personaje ficticio)</p>
        </div>
        <Folio numero={numero} pagina={pag.carta} lado="i" />
      </section>

      <section id="entrevista" className="rb-entrevista rb-pag" aria-labelledby="rb-ent-titulo">
        <div className="rb-tinte rb-entrevista-foto">
          <Foto clave={e.foto} sizes="(max-width: 640px) 100vw, 50vw" posicion="60% 20%" />
          <span className="rb-gigante" aria-hidden="true">
            {e.gigante}
          </span>
        </div>
        <div className="rb-entrevista-txt">
          <small>{e.etiqueta}</small>
          <h2 id="rb-ent-titulo">{e.titulo}</h2>
          <p className="rb-bajada">{e.bajada}</p>
          <div className="rb-columnas">
            <p>{e.parrafos[0]}</p>
            <p>{e.parrafos[1]}</p>
            <blockquote className="rb-cita">
              <p>{e.cita}</p>
            </blockquote>
            {e.parrafos.slice(2).map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
        <Folio numero={numero} pagina={pag.entrevista} />
      </section>

      <section
        id="anuncio"
        className="rb-anuncio rb-tinte rb-pag"
        aria-label={`Anuncio ficticio: ${anuncio.marca}`}
      >
        <Foto clave={anuncio.foto} sizes="100vw" />
        <div className="rb-anuncio-marca">
          <b>{anuncio.marca}</b>
          <span>{anuncio.lema}</span>
        </div>
        <span className="rb-anuncio-et">Anuncio ficticio</span>
      </section>

      <section id="reportaje" className="rb-reportaje rb-pag" aria-labelledby="rb-rep-titulo">
        <div className="rb-mosaico">
          <div className="rb-tinte">
            <Foto clave={r.fotos[0]} sizes="(max-width: 640px) 100vw, 30vw" posicion="35% 30%" />
          </div>
          <Foto clave={r.fotos[1]} sizes="(max-width: 640px) 50vw, 25vw" />
          <Foto clave={r.fotos[2]} sizes="(max-width: 640px) 50vw, 25vw" />
        </div>
        <div className="rb-reportaje-txt">
          <h2 id="rb-rep-titulo">
            {r.titulo[0]}
            <br />
            {r.titulo[1]}
          </h2>
          <p className="rb-bajada">{r.bajada}</p>
          <div className="rb-columnas">
            {r.parrafos.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
        <Folio numero={numero} pagina={pag.reportaje} />
      </section>

      <section id="comentarios" className="rb-fin">
        <Comentarios
          clave={`rubor-${numero.n}`}
          ejemplos={numero.comentarios}
          usuario={LECTORA}
          prefijo="rb"
          titulo="Comentarios del número"
        />
        <Anteriores lista={anteriores} />
      </section>
    </main>
  )
}
