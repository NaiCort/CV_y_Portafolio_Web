import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Disco from "../components/Disco"
import MapaXalapa from "../components/MapaXalapa"
import PaseQR from "../components/PaseQR"
import Clip from "../components/Clip"
import TablaPlanes from "../components/TablaPlanes"
import { SUCURSALES, findSucursal, horarioTexto } from "../data/sucursales"
import { CATEGORIAS, HORARIO, findCategoria } from "../data/clases"
import { findCoach } from "../data/coaches"
import { PLANES } from "../data/planes"
import { SOCIO } from "../data/socio"
import { aforoEn, cuandoAbre, estadoAforo } from "../lib/aforo"
import { cuandoTexto, lugaresLibres, proximasClases } from "../lib/horario"

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
              {pct === null ? `Cerrada · ${cuandoAbre(s, ahora)}` : `${pct} % · ${estado}`}
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
  const [elegida, setElegida] = useState("centro")
  const lista = useRef(null)
  // Si se elige desde el mapa, la fila abierta se lleva a la vista dentro de la lista, sin
  // mover la página. En el teléfono la lista no se desplaza sola y esto no hace nada.
  useEffect(() => {
    const marco = lista.current
    const fila = marco?.querySelector(".is-on")
    if (!marco || !fila || marco.scrollHeight <= marco.clientHeight) return
    const arriba = fila.offsetTop - marco.offsetTop
    if (
      arriba < marco.scrollTop ||
      arriba + fila.offsetHeight > marco.scrollTop + marco.clientHeight
    )
      marco.scrollTo({ top: arriba - 8, behavior: "smooth" })
  }, [elegida])
  return (
    <div className="b-sucursales">
      <div className="b-suc-cabeza">
        <h2 id="sucursales-titulo" className="b-d b-angosta">
          ¿Cuál te queda cerca?
        </h2>
        <p className="b-lead">Tu membresía abre las cinco. Cada una tiene algo propio.</p>
      </div>
      <div className="b-suc-grid">
        <div className="b-mapa-marco">
          <MapaXalapa elegida={elegida} onElegir={setElegida} />
        </div>
        <div className="b-suc-lista" ref={lista}>
          <ul className="b-acordeon">
            {SUCURSALES.map((item) => {
              const p = aforoEn(item, ahora)
              const on = item.id === elegida
              return (
                <li key={item.id} className={on ? "is-on" : ""}>
                  <button
                    type="button"
                    id={`b-suc-${item.id}`}
                    aria-expanded={on}
                    aria-controls={`b-suc-${item.id}-datos`}
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
                  <div
                    id={`b-suc-${item.id}-datos`}
                    role="region"
                    aria-labelledby={`b-suc-${item.id}`}
                    className="b-suc-datos"
                    hidden={!on}
                  >
                    <p>{item.direccion}</p>
                    <dl>
                      <div>
                        <dt>Hoy</dt>
                        <dd className="b-num">{horarioTexto(item, ahora)}</dd>
                      </div>
                      <div>
                        <dt>Aforo ahora</dt>
                        <dd className="b-num">
                          {p === null
                            ? `Cerrada, ${cuandoAbre(item, ahora)}`
                            : `${p} %, ${estadoAforo(p)}`}
                        </dd>
                      </div>
                      <div>
                        <dt>Tiene</dt>
                        <dd>{item.tiene.join(", ")}</dd>
                      </div>
                    </dl>
                    <p className="b-suc-ref">
                      Referencia en el mapa: {item.referencia.nombre}. Ahí no hay ningún gimnasio.
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
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
  const [activa, setActiva] = useState(null)
  return (
    <div className="b-clases">
      <h2 id="clases-titulo" className="b-d b-angosta">
        Próximas clases en el club
      </h2>
      <p className="b-lead">
        {HORARIO.length} clases a la semana en {CATEGORIAS.length} disciplinas. Los lugares libres
        son simulados.
      </p>
      <div className="b-clases-acciones">
        <Link className="b-btn" to="/gimnasio/clases">
          Ver el horario completo
        </Link>
      </div>
      <div className="b-clases-grid">
        {sesiones.map((sesion) => (
          <TarjetaClase
            key={sesion.id}
            sesion={sesion}
            ahora={ahora}
            activa={activa === sesion.id}
            onActivar={(si) => setActiva((a) => (si ? sesion.id : a === sesion.id ? null : a))}
          />
        ))}
      </div>
    </div>
  )
}

// Cada tarjeta es el enlace para reservar. Con ratón o teclado, pasar encima o enfocarla
// enciende el video; con el dedo, el primer toque lo enciende y el segundo abre la reserva.
function TarjetaClase({ sesion, ahora, activa, onActivar }) {
  const cat = findCategoria(sesion.categoria)
  const libres = lugaresLibres(sesion)
  const cuando = cuandoTexto(sesion.fecha, ahora)
  const destino = `/gimnasio/clases?sesion=${sesion.id}&fecha=${sesion.fecha.toISOString()}`
  const toque = useRef({ tipo: "mouse", yaActiva: false })
  return (
    <Link
      className={`b-clase-tarjeta${activa ? " is-activa" : ""}`}
      to={destino}
      onPointerEnter={(e) => e.pointerType === "mouse" && onActivar(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onActivar(false)}
      onPointerDown={(e) => {
        toque.current = { tipo: e.pointerType, yaActiva: activa }
      }}
      onFocus={() => onActivar(true)}
      onBlur={() => onActivar(false)}
      onClick={(e) => {
        const { tipo, yaActiva } = toque.current
        toque.current = { tipo: "mouse", yaActiva: false }
        if (tipo !== "mouse" && !yaActiva) {
          e.preventDefault()
          onActivar(true)
        }
      }}
    >
      <Clip id={cat.foto} activo={activa} decorativa />
      <div className="b-clase-info">
        <span className="b-etiqueta b-num">
          {cuando} · {libres === 0 ? "lista de espera" : `${libres} lugares`}
        </span>
        <h3>{cat.nombre}</h3>
        <p>
          {findSucursal(sesion.sucursal).nombre} · Coach {findCoach(sesion.coach).nombre} ·{" "}
          {cat.minutos} min
        </p>
        <span className="b-clase-ir">
          {libres === 0 ? "Entrar a la lista de espera" : "Reservar"}
          <span aria-hidden="true"> →</span>
        </span>
      </div>
    </Link>
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

export default function Inicio() {
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
              <Link className="b-btn b-btn-p" to="/gimnasio/clases?prueba=1">
                Clase de prueba gratis
              </Link>
              <Link className="b-btn" to="/gimnasio/planes">
                Comparar planes
              </Link>
            </div>
            <p className="b-hero-nota">
              Sin membresía y sin tarjeta. ¿Nunca has ido a un gimnasio?{" "}
              <Link to="/gimnasio/primera-visita">Así es tu primera visita</Link>
            </p>
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
            <Link className="b-btn b-btn-p" to="/gimnasio/socio">
              Entrar con el perfil de ejemplo
            </Link>
          </div>
          <Telefono />
        </section>
        <section id="planes" className="b-planes" aria-labelledby="planes-titulo">
          <h2 id="planes-titulo" className="b-d b-ancha">
            Tres niveles de experiencia
          </h2>
          <TablaPlanes tituloId="planes-titulo" />
        </section>
      </div>
    </>
  )
}
