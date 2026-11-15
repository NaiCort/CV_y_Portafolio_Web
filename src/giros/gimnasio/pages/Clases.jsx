import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Clip from "../components/Clip"
import ReservaPanel from "../components/ReservaPanel"
import MisReservas from "../components/MisReservas"
import { CATEGORIAS, HORARIO, findCategoria } from "../data/clases"
import { COACHES, findCoach } from "../data/coaches"
import { SUCURSALES, findSucursal } from "../data/sucursales"
import { MEDIOS } from "../data/medios"
import { cuandoTexto, lugaresLibres, proximasClases } from "../lib/horario"
import { sesionPorId } from "../lib/reservas"

const DIA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
const hora = (f) => `${f.getHours()}:${String(f.getMinutes()).padStart(2, "0")}`

function dias(ahora) {
  return Array.from({ length: 7 }, (_, i) => {
    const f = new Date(ahora)
    f.setHours(0, 0, 0, 0)
    f.setDate(f.getDate() + i)
    const nombre = i === 0 ? "Hoy" : i === 1 ? "Mañana" : DIA[f.getDay()]
    return { clave: f.toDateString(), nombre, numero: f.getDate(), fecha: f }
  })
}

// Sesiones de un día concreto, incluidas las que ya empezaron (se muestran sin reserva).
function sesionesDelDia(fecha) {
  return HORARIO.filter((c) => c.dia === fecha.getDay())
    .map((c) => {
      const f = new Date(fecha)
      const [h, m] = c.hora.split(":").map(Number)
      f.setHours(h, m, 0, 0)
      return { ...c, fecha: f }
    })
    .sort((a, b) => a.fecha - b.fecha)
}

export default function Clases({
  reservas,
  onReservar,
  onCancelar,
  onTerminar,
  onCalificar,
  ahora,
}) {
  const [params, setParams] = useSearchParams()
  const opciones = useMemo(() => dias(ahora), [ahora])
  // Llegar desde Inicio con ?sesion=…&fecha=… abre la reserva de esa sesión.
  const [desdeInicio] = useState(() => {
    const id = params.get("sesion")
    const fecha = params.get("fecha")
    const sesion = id && fecha ? sesionPorId(id, fecha) : null
    return sesion && sesion.fecha > ahora ? sesion : null
  })
  const [dia, setDia] = useState(() => desdeInicio?.fecha.toDateString() || opciones[0].clave)
  const [categoria, setCategoria] = useState("todas")
  const [sucursal, setSucursal] = useState("todas")
  const [coach, setCoach] = useState("todos")
  const [abierta, setAbierta] = useState(desdeInicio)
  // Llegar desde Planes con ?prueba=1 marca la siguiente reserva como clase de prueba gratis.
  const [modoPrueba, setModoPrueba] = useState(() => params.get("prueba") === "1")
  const pruebaPrevia = reservas.find((r) => r.prueba && r.estado !== "cancelada")
  useEffect(() => {
    if (params.has("sesion") || params.has("prueba")) setParams({}, { replace: true })
  }, [params, setParams])
  const elegido = opciones.find((o) => o.clave === dia) || opciones[0]
  const sesiones = sesionesDelDia(elegido.fecha).filter(
    (s) =>
      (categoria === "todas" || s.categoria === categoria) &&
      (sucursal === "todas" || s.sucursal === sucursal) &&
      (coach === "todos" || s.coach === coach),
  )
  const medio = MEDIOS[categoria] ? categoria : "combate"
  const reservada = (s) =>
    reservas.find(
      (r) => r.sesionId === s.id && r.fecha === s.fecha.toISOString() && r.estado !== "cancelada",
    )
  const siguiente = proximasClases(ahora)[0]
  return (
    <>
      <section className="b-wrap b-clases-cabeza" aria-labelledby="b-titulo">
        <div>
          <h1 id="b-titulo" tabIndex={-1} className="b-d b-angosta">
            Clases
          </h1>
          <p className="b-lead">
            {HORARIO.length} clases a la semana en {CATEGORIAS.length} disciplinas y{" "}
            {SUCURSALES.length} sucursales. Reserva tu lugar; las reservas son simuladas y se
            guardan en este navegador.
          </p>
        </div>
        <div className="b-clases-medio">
          <Clip id={medio} prioridad />
        </div>
      </section>

      <section className="b-wrap b-horario" aria-labelledby="b-horario-titulo">
        {modoPrueba && (
          <div className="b-modo-prueba" role="status">
            {pruebaPrevia ? (
              <p>
                Ya apartaste tu clase de prueba gratis:{" "}
                {findCategoria(pruebaPrevia.categoria).nombre},{" "}
                {cuandoTexto(new Date(pruebaPrevia.fecha), ahora)}. Es una por persona.
              </p>
            ) : (
              <p>
                Elige tu clase de prueba gratis: reserva cualquier clase del horario. No necesitas
                membresía.
              </p>
            )}
            <button type="button" className="b-inline" onClick={() => setModoPrueba(false)}>
              Salir del modo prueba
            </button>
          </div>
        )}
        <h2 id="b-horario-titulo" className="b-d b-angosta">
          Horario
        </h2>
        <div className="b-filtros">
          <fieldset className="b-chips">
            <legend>Día</legend>
            {opciones.map((o) => (
              <label key={o.clave} className="b-chip">
                <input
                  type="radio"
                  name="dia"
                  checked={dia === o.clave}
                  onChange={() => setDia(o.clave)}
                />
                <span>
                  {o.nombre} <b className="b-num">{o.numero}</b>
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset className="b-chips">
            <legend>Disciplina</legend>
            {[{ id: "todas", nombre: "Todas" }, ...CATEGORIAS].map((c) => (
              <label key={c.id} className="b-chip">
                <input
                  type="radio"
                  name="categoria"
                  checked={categoria === c.id}
                  onChange={() => setCategoria(c.id)}
                />
                <span>{c.nombre}</span>
              </label>
            ))}
          </fieldset>
          <div className="b-selects">
            <label>
              Sucursal
              <select value={sucursal} onChange={(e) => setSucursal(e.target.value)}>
                <option value="todas">Todas</option>
                {SUCURSALES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Coach
              <select value={coach} onChange={(e) => setCoach(e.target.value)}>
                <option value="todos">Todos</option>
                {COACHES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <p className="b-resultado" role="status">
          {sesiones.length === 0
            ? "No hay clases con esos filtros este día."
            : `${sesiones.length} ${sesiones.length === 1 ? "clase" : "clases"} el ${elegido.nombre.toLowerCase()}`}
          {sesiones.length === 0 && siguiente && (
            <>
              {" "}
              <button
                type="button"
                className="b-inline"
                onClick={() => {
                  setCategoria("todas")
                  setSucursal("todas")
                  setCoach("todos")
                }}
              >
                Quitar filtros
              </button>
            </>
          )}
        </p>
        <ul className="b-sesiones">
          {sesiones.map((s) => {
            const cat = findCategoria(s.categoria)
            const empezo = s.fecha <= ahora
            const libres = lugaresLibres(s)
            const mia = reservada(s)
            return (
              <li key={s.id} className={empezo ? "is-pasada" : ""}>
                <span className="b-sesion-hora b-num">{hora(s.fecha)}</span>
                <span className="b-sesion-info">
                  <strong>{cat.nombre}</strong>
                  <small>
                    {findSucursal(s.sucursal).nombre} · Coach {findCoach(s.coach).nombre} ·{" "}
                    {cat.minutos} min
                  </small>
                </span>
                <span className="b-sesion-lugares b-num">
                  {empezo
                    ? "Ya empezó"
                    : mia
                      ? mia.estado === "espera"
                        ? "En lista de espera"
                        : "Reservada"
                      : libres === 0
                        ? "Llena"
                        : `${libres} de ${cat.cupo} libres`}
                </span>
                {!empezo && !mia && (
                  <button
                    type="button"
                    className={libres === 0 ? "b-btn" : "b-btn b-btn-p"}
                    aria-label={`${libres === 0 ? "Lista de espera" : "Reservar"}: ${cat.nombre} a las ${hora(s.fecha)}`}
                    onClick={() => setAbierta(s)}
                  >
                    {libres === 0 ? "Lista de espera" : "Reservar"}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <MisReservas
        reservas={reservas}
        ahora={ahora}
        onCancelar={onCancelar}
        onTerminar={onTerminar}
        onCalificar={onCalificar}
      />

      {abierta && (
        <ReservaPanel
          sesion={abierta}
          ahora={ahora}
          nombrePrevio={reservas.at(-1)?.nombre || ""}
          prueba={modoPrueba && !pruebaPrevia}
          onReservar={onReservar}
          onCerrar={() => setAbierta(null)}
        />
      )}
    </>
  )
}
