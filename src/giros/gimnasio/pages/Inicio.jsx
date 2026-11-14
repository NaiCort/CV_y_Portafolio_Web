import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Disco from "../components/Disco"
import MapaXalapa from "../components/MapaXalapa"
import PaseQR from "../components/PaseQR"
import { SUCURSALES, findSucursal, horarioTexto } from "../data/sucursales"
import { CATEGORIAS, HORARIO, findCategoria } from "../data/clases"
import { findCoach } from "../data/coaches"
import { FILAS, PLANES } from "../data/planes"
import { SOCIO } from "../data/socio"
import { FOTOS } from "../data/medios"
import { aforoEn, estadoAforo } from "../lib/aforo"
import { cuandoTexto, lugaresLibres, proximasClases } from "../lib/horario"

const pesos = (n) => `$${n.toLocaleString("en-US")}`
const CON_FOTO = CATEGORIAS.filter((c) => c.foto).map((c) => c.id)

function useAhora(cada = 60000) {
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setAhora(new Date()), cada)
    return () => clearInterval(timer)
  }, [cada])
  return ahora
}

function Aforo({ ahora }) {
  return (
    <section className="b-aforo" aria-labelledby="b-aforo-titulo">
      <div>
        <h2 id="b-aforo-titulo">Ahora mismo</h2>
        <small>Aforo simulado por sucursal</small>
      </div>
      {SUCURSALES.map((s) => {
        const pct = aforoEn(s, ahora)
        const estado = estadoAforo(pct)
        return (
          <div key={s.id}>
            {s.nombre}
            <small className="b-num">
              {pct === null ? "Cerrada ahora" : `${pct} % · ${estado}`}
            </small>
            <div
              className={pct >= 60 ? "b-barra is-alta" : "b-barra"}
              role="meter"
              aria-label={`Aforo de ${s.nombre}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct ?? 0}
              aria-valuetext={pct === null ? "cerrada" : `${pct} por ciento, ${estado}`}
            >
              <i style={{ width: `${pct ?? 0}%` }} />
            </div>
          </div>
        )
      })}
    </section>
  )
}

function Sucursales({ ahora }) {
  const [elegida, setElegida] = useState("natura")
  const s = findSucursal(elegida)
  const pct = aforoEn(s, ahora)
  return (
    <div className="b-sucursales">
      <figure className="b-mapa-marco">
        <MapaXalapa elegida={elegida} onElegir={setElegida} />
        <div className="b-ficha" aria-live="polite">
          <b>{s.nombre}</b>
          <p>{s.direccion}</p>
          <dl>
            <div>
              <dt>Hoy</dt>
              <dd className="b-num">{horarioTexto(s, ahora)}</dd>
            </div>
            <div>
              <dt>Aforo ahora</dt>
              <dd className="b-num">{pct === null ? "Cerrada" : `${pct} %`}</dd>
            </div>
            <div>
              <dt>Tiene</dt>
              <dd>{s.tiene.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </figure>
      <div>
        <h2 id="sucursales-titulo" className="b-d b-angosta">
          ¿Cuál te queda cerca?
        </h2>
        <p className="b-lead">Tu membresía abre las cinco. Cada una tiene algo propio.</p>
        <ul className="b-lista">
          {SUCURSALES.map((item) => {
            const p = aforoEn(item, ahora)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={item.id === elegida}
                  onClick={() => setElegida(item.id)}
                >
                  <span>
                    <strong>{item.nombre}</strong>
                    <small>{item.rasgo}</small>
                  </span>
                  <em className="b-num">
                    {p === null ? "cerrada" : `${p} %`}
                    <br />
                    {p === null ? "" : estadoAforo(p)}
                  </em>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Clases({ ahora }) {
  const sesiones = useMemo(() => {
    const todas = proximasClases(ahora, (c) => CON_FOTO.includes(c.categoria))
    return CON_FOTO.map((id) => todas.find((s) => s.categoria === id)).sort(
      (a, b) => a.fecha - b.fecha,
    )
  }, [ahora])
  return (
    <div className="b-clases">
      <h2 id="clases-titulo" className="b-d b-angosta">
        Próximas clases en el club
      </h2>
      <p className="b-lead">
        {HORARIO.length} clases a la semana en {CATEGORIAS.length} disciplinas. Los lugares libres
        son simulados.
      </p>
      <div className="b-clases-grid">
        {sesiones.map((sesion) => {
          const cat = findCategoria(sesion.categoria)
          const libres = lugaresLibres(sesion)
          const foto = FOTOS[cat.foto]
          return (
            <article key={sesion.id}>
              <img
                src={`/gimnasio/fotos/${cat.foto}-640.webp`}
                srcSet={`/gimnasio/fotos/${cat.foto}-640.webp 640w, /gimnasio/fotos/${cat.foto}.webp 1280w`}
                sizes="(max-width: 640px) 100vw, 33vw"
                alt={foto.alt}
                loading="lazy"
                width="640"
                height="427"
              />
              <div className="b-clase-info">
                <span className="b-etiqueta b-num">
                  {cuandoTexto(sesion.fecha, ahora)} ·{" "}
                  {libres === 0 ? "lista de espera" : `${libres} lugares`}
                </span>
                <h3>{cat.nombre}</h3>
                <p>
                  {findSucursal(sesion.sucursal).nombre} · Coach {findCoach(sesion.coach).nombre} ·{" "}
                  {cat.minutos} min
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Telefono() {
  const base = findSucursal(SOCIO.base)
  const plan = PLANES.find((p) => p.id === SOCIO.plan)
  const total = SOCIO.semana.reduce((a, b) => a + b, 0)
  const visitas = SOCIO.semana.filter(Boolean).length
  const max = Math.max(...SOCIO.semana)
  const ahora = useAhora()
  const siguiente = proximasClases(
    ahora,
    (c) => c.categoria === "ciclo" && c.sucursal === "tecajetes",
  )[0]
  return (
    <div className="b-escena" aria-label="Vista previa del área de socio con el perfil de ejemplo">
      <div className="b-telefono">
        <div className="b-pantalla">
          <div className="b-hola">
            <div>
              <small>
                Plan {plan.nombre} · Sucursal base {base.nombre}
              </small>
              <b>Hola, {SOCIO.nombre}</b>
            </div>
            <img src="/gimnasio/fotos/socia-640.webp" alt="" width="38" height="38" />
          </div>
          <PaseQR base={SOCIO.codigo} />
          <div className="b-siguiente">
            <small>Tu próxima clase</small>
            <b className="b-num">Ciclo · {cuandoTexto(siguiente.fecha, ahora)}</b>
            <span>
              {findSucursal(siguiente.sucursal).nombre} · Coach {findCoach(siguiente.coach).nombre}{" "}
              · bici 12
            </span>
          </div>
          <div className="b-semana">
            <div className="b-semana-h">
              <span>Esta semana</span>
              <b className="b-num">
                {total} min · {visitas} visitas
              </b>
            </div>
            <div className="b-barras" aria-hidden="true">
              {SOCIO.semana.map((m, i) => (
                <i
                  key={i}
                  className={m ? "is-on" : ""}
                  style={{ height: `${m ? Math.max(14, (m / max) * 100) : 8}%` }}
                />
              ))}
            </div>
            <div className="b-dias" aria-hidden="true">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
          </div>
          <div className="b-tienda-aviso">
            <span>Tienda</span>
            <b>{SOCIO.pedido.producto}</b>
            <em>Listo para recoger en {findSucursal(SOCIO.pedido.sucursal).nombre}</em>
          </div>
        </div>
      </div>
      <div className="b-flota b-flota-1">
        <span>{base.nombre}, ahora</span>
        <b className="b-num">
          {aforoEn(base, ahora) === null ? "Cerrada" : `${aforoEn(base, ahora)} % de aforo`}
        </b>
      </div>
      <div className="b-flota b-flota-2">
        <span>Racha</span>
        <b>{SOCIO.racha} semanas</b>
        <span>Meta: {SOCIO.meta} visitas por semana</span>
      </div>
    </div>
  )
}

export default function Inicio({ onPendiente }) {
  const ahora = useAhora()
  return (
    <>
      <div className="b-hero-marco">
        <section className="b-hero b-wrap" aria-labelledby="b-titulo">
          <div>
            <h1 id="b-titulo" tabIndex={-1} className="b-d">
              <span className="b-ancha">Entrena</span>
              <span className="b-estrecha">en las cinco.</span>
            </h1>
            <p className="b-hero-texto">
              Un club con {SUCURSALES.length} sucursales, {HORARIO.length} clases a la semana y
              coaches de planta. Tu membresía abre todas, desde el primer día.
            </p>
            <div className="b-acciones">
              <a className="b-btn b-btn-p" href="#clases">
                Ver las próximas clases
              </a>
              <a className="b-btn" href="#planes">
                Comparar planes
              </a>
            </div>
          </div>
          <Disco />
        </section>
      </div>
      <Aforo ahora={ahora} />
      <section className="b-oscura" aria-label="Sucursales y clases">
        <div className="b-wrap">
          <section id="sucursales" aria-labelledby="sucursales-titulo">
            <Sucursales ahora={ahora} />
          </section>
          <section id="clases" aria-labelledby="clases-titulo">
            <Clases ahora={ahora} />
          </section>
        </div>
      </section>
      <div className="b-wrap">
        <section id="socio" className="b-socio" aria-labelledby="socio-titulo">
          <div>
            <h2 id="socio-titulo" className="b-d b-media">
              Tu club, <span>en el bolsillo.</span>
            </h2>
            <p className="b-lead">
              Entra con el perfil de ejemplo y recorre lo que ve un socio. Sus datos son inventados.
            </p>
            <ul className="b-socio-lista">
              <li>
                <b>Pase de entrada</b>
                <span>QR en las cinco sucursales, sin tarjeta</span>
              </li>
              <li>
                <b>Reservas</b>
                <span>Elige bici o lugar, con lista de espera</span>
              </li>
              <li>
                <b>Tu semana</b>
                <span>Visitas, minutos y la meta que elegiste</span>
              </li>
              <li>
                <b>Tienda</b>
                <span>Pide y recoge al llegar a tu sucursal</span>
              </li>
            </ul>
            <button type="button" className="b-btn b-btn-p" onClick={() => onPendiente("socio")}>
              Entrar con el perfil de ejemplo
            </button>
          </div>
          <Telefono />
        </section>
        <section id="planes" className="b-planes" aria-labelledby="planes-titulo">
          <h2 id="planes-titulo" className="b-d b-ancha">
            Tres planes, sin letra chica
          </h2>
          <div className="b-tabla-marco" tabIndex={0} role="region" aria-labelledby="planes-titulo">
            <table>
              <caption className="b-oculto">Comparación de membresías, al mes con IVA</caption>
              <thead>
                <tr>
                  <td />
                  {PLANES.map((p) => (
                    <th key={p.id} scope="col" className={p.destacado ? "is-on" : ""}>
                      <span>{p.nombre}</span>
                      <small>{p.lema}</small>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Al mes, IVA incluido</th>
                  {PLANES.map((p) => (
                    <td key={p.id} className={`b-precio b-num${p.destacado ? " is-on" : ""}`}>
                      {pesos(p.precio)} <small>MXN</small>
                    </td>
                  ))}
                </tr>
                {FILAS.map((fila) => (
                  <tr key={fila.concepto}>
                    <th scope="row">{fila.concepto}</th>
                    {PLANES.map((p) => (
                      <td
                        key={p.id}
                        className={[p.destacado && "is-on", !fila[p.id] && "is-no"]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {fila[p.id] || "No incluido"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ol className="b-planes-movil" aria-label="Membresías, al mes con IVA">
            {PLANES.map((p) => (
              <li key={p.id} className={p.destacado ? "is-on" : ""}>
                <div className="b-plan-cabeza">
                  <h3>{p.nombre}</h3>
                  <p className="b-num">
                    {pesos(p.precio)} <small>MXN al mes</small>
                  </p>
                </div>
                <p className="b-plan-lema">{p.lema}</p>
                <dl>
                  {FILAS.map((fila) => (
                    <div key={fila.concepto} className={fila[p.id] ? "" : "is-no"}>
                      <dt>{fila.concepto}</dt>
                      <dd>{fila[p.id] || "No incluido"}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
          <p className="b-letra">
            Sin plazo forzoso. Cancelas desde tu perfil en un paso y te avisamos cinco días antes de
            cada renovación. Precios de ejemplo; esta demo no cobra.{" "}
            <Link to="/gimnasio/creditos">Créditos de fotos y tipografías</Link>
          </p>
        </section>
      </div>
    </>
  )
}
