import {
  CONFIDENCIAL,
  EN_LINEA,
  ENFOQUE,
  FORMACION,
  HONORARIOS,
  INSTITUCIONES,
  MOTIVOS,
  precio,
  PRIMERA_SESION,
  SERVICIOS,
  SOBRE_MI,
} from "../data/consultorio"

// Contenido de cada sección (V4.10.2). Cada tema decide el título, el orden y el contenedor;
// aquí solo está el cuerpo, con variantes de forma donde la estructura cambia.

export function Motivos() {
  return (
    <ul className="p-motivos">
      {MOTIVOS.map(([titulo, texto]) => (
        <li key={titulo}>
          <h3>{titulo}</h3>
          <p>{texto}</p>
        </li>
      ))}
    </ul>
  )
}

export function Enfoque() {
  return (
    <>
      <p className="p-entrada">{ENFOQUE.resumen}</p>
      <dl className="p-pasos">
        {ENFOQUE.pasos.map(([titulo, texto]) => (
          <div key={titulo}>
            <dt>{titulo}</dt>
            <dd>{texto}</dd>
          </div>
        ))}
      </dl>
      <p className="p-nota">{ENFOQUE.nota}</p>
    </>
  )
}

export function Historia() {
  return (
    <>
      <p className="p-saludo">{SOBRE_MI.saludo}</p>
      {SOBRE_MI.historia.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </>
  )
}

export function Formacion() {
  return (
    <ul className="p-formacion">
      {FORMACION.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}

export function Foto({ nombre, anchos, alt = "", className = "", sizes, prioridad = false }) {
  const [chica, grande] = anchos
  return (
    <img
      className={className}
      src={`/psicologo/fotos/${nombre}-${chica}.webp`}
      srcSet={`/psicologo/fotos/${nombre}-${chica}.webp ${chica}w, /psicologo/fotos/${nombre}-${grande}.webp ${grande}w`}
      sizes={sizes}
      alt={alt}
      loading={prioridad ? "eager" : "lazy"}
      fetchPriority={prioridad ? "high" : undefined}
      decoding="async"
    />
  )
}

// forma: «tarjetas» (Sala), «tabla» (Neblina) o «libreta» (Cuaderno).
export function Honorarios({ forma }) {
  const servicios =
    forma === "tabla" ? (
      <table className="p-tabla">
        <caption className="p-oculto">Servicios, duración y honorarios</caption>
        <thead>
          <tr>
            <th scope="col">Servicio</th>
            <th scope="col">Duración</th>
            <th scope="col">Honorarios</th>
          </tr>
        </thead>
        <tbody>
          {SERVICIOS.map((s) => (
            <tr key={s.id}>
              <th scope="row">
                {s.nombre}
                <span className="p-tabla-para">{s.para}</span>
              </th>
              <td>{s.duracion}</td>
              <td className="p-precio">{precio(s.precio)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">
              {HONORARIOS.social.titulo}
              <span className="p-tabla-para">{HONORARIOS.social.texto}</span>
            </th>
            <td>50 min</td>
            <td className="p-precio">{precio(HONORARIOS.social.precio)}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <ul className={forma === "libreta" ? "p-libreta" : "p-tarjetas"}>
        {SERVICIOS.map((s) => (
          <li key={s.id}>
            <h3>
              <span>{s.nombre}</span>
              {forma === "libreta" && <span className="p-guia" aria-hidden="true" />}
              <span className="p-precio">{precio(s.precio)}</span>
            </h3>
            <p>
              {s.duracion} · {s.para}
            </p>
          </li>
        ))}
        <li className="p-social">
          <h3>
            <span>{HONORARIOS.social.titulo}</span>
            {forma === "libreta" && <span className="p-guia" aria-hidden="true" />}
            <span className="p-precio">{precio(HONORARIOS.social.precio)}</span>
          </h3>
          <p>{HONORARIOS.social.texto}</p>
        </li>
      </ul>
    )
  return (
    <>
      {servicios}
      <p className="p-entrada">
        {HONORARIOS.enLinea} {HONORARIOS.llamada}
      </p>
      <ul className="p-pagos">
        {HONORARIOS.pagos.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className="p-nota">{HONORARIOS.cancelacion}</p>
    </>
  )
}

export function PrimeraSesion({ conNota = false }) {
  return (
    <>
      <ol className="p-linea">
        {PRIMERA_SESION.map(([cuando, texto]) => (
          <li key={cuando}>
            <h3>{cuando}</h3>
            <p>{texto}</p>
          </li>
        ))}
      </ol>
      {conNota ? (
        <p className="p-adhesiva">{CONFIDENCIAL}</p>
      ) : (
        <p className="p-confidencial">{CONFIDENCIAL}</p>
      )}
    </>
  )
}

export function EnLinea() {
  return (
    <dl className="p-enlinea">
      {EN_LINEA.map(([titulo, texto]) => (
        <div key={titulo}>
          <dt>{titulo}</dt>
          <dd>{texto}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Instituciones({ onPedir }) {
  return (
    <>
      <p className="p-entrada">{INSTITUCIONES.intro}</p>
      <ul className="p-instituciones">
        {INSTITUCIONES.lista.map(([titulo, texto]) => (
          <li key={titulo}>
            <h3>{titulo}</h3>
            <p>{texto}</p>
          </li>
        ))}
      </ul>
      <button type="button" className="p-btn p-btn-s" onClick={onPedir}>
        Pedir información
      </button>
    </>
  )
}
