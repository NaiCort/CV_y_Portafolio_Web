import { useMemo } from "react"
import { Link } from "react-router-dom"
import { SUCURSALES } from "../data/sucursales"
import { aforoPorHora, horasTranquilas } from "../lib/aforo"

// Para quien nunca ha ido a un gimnasio o vuelve después de mucho tiempo: quitar lo
// desconocido (qué pasa al llegar, qué traer, qué hacer) y decir cuándo está tranquilo.
// «10:00 a 17:00»; si ningún tramo baja de un tercio, la hora menos llena.
function tramoTexto(sucursal, fecha) {
  const tramos = horasTranquilas(sucursal, fecha)
  if (tramos.length) return tramos.map(([a, b]) => `${a}:00 a ${b}:00`).join(" y ")
  const visitables = aforoPorHora(sucursal, fecha).filter((x) => x.hora >= 6 && x.hora < 22)
  const menos = visitables.reduce((a, b) => (b.pct < a.pct ? b : a))
  return `Suele estar concurrida; la hora menos llena es a las ${menos.hora}:00`
}

// Un miércoles y un sábado próximos sirven de referencia para la curva de aforo.
function proximo(ahora, dia) {
  const f = new Date(ahora)
  f.setHours(12, 0, 0, 0)
  f.setDate(f.getDate() + ((dia - f.getDay() + 7) % 7))
  return f
}

export default function PrimeraVisita({ ahora }) {
  const filas = useMemo(() => {
    const miercoles = proximo(ahora, 3)
    const sabado = proximo(ahora, 6)
    return SUCURSALES.map((s) => ({
      s,
      semana: tramoTexto(s, miercoles),
      finde: tramoTexto(s, sabado),
    }))
  }, [ahora])
  return (
    <div className="b-wrap b-primera">
      <section className="b-primera-cabeza" aria-labelledby="b-titulo">
        <h1 id="b-titulo" tabIndex={-1} className="b-d b-media">
          Tu primera visita
        </h1>
        <p className="b-lead">
          Si nunca has entrado a un gimnasio, o hace mucho que no vas, esto es lo que pasa. Nadie
          espera que sepas usar las máquinas el primer día.
        </p>
        <div className="b-acciones">
          <Link className="b-btn b-btn-p" to="/gimnasio/clases?prueba=1">
            Clase de prueba gratis
          </Link>
          <Link className="b-btn" to="/gimnasio/coaches">
            Evaluación gratuita con un coach
          </Link>
        </div>
      </section>

      <div className="b-primera-rejilla">
        <section aria-labelledby="b-llegar">
          <h2 id="b-llegar">Al llegar</h2>
          <p>
            Dices en recepción que es tu primera vez. Te dan un pase de prueba y un locker de día, y
            un coach de piso te enseña el club en 15 minutos: vestidores, área de pesas, cardio y
            salones de clase. Ahí mismo puedes preguntarle lo que quieras.
          </p>
          <p className="b-nota">
            En un club real llenarías un cuestionario breve de salud antes de entrenar. Esta demo no
            lo pide.
          </p>
        </section>

        <section aria-labelledby="b-traer">
          <h2 id="b-traer">Qué traer</h2>
          <ul className="b-primera-lista">
            <li>Ropa cómoda y tenis de suela plana.</li>
            <li>Toalla. En los planes Club y Total el club te la da.</li>
            <li>Botella: hay garrafones de agua en todas las sucursales.</li>
            <li>Un candado, si tienes. Si no, te prestamos uno.</li>
          </ul>
        </section>

        <section aria-labelledby="b-entrenar">
          <h2 id="b-entrenar">Un primer entrenamiento de 20 minutos</h2>
          <p>Lo que propone Leo, nuestro coach de fuerza para principiantes:</p>
          <ul className="b-primera-lista">
            <li>Cinco minutos en bici fija, a un ritmo en el que puedas platicar.</li>
            <li>
              Dos máquinas guiadas, prensa de pierna y jalón al pecho: tres series de diez, con un
              peso que te deje terminar sin apretar los dientes.
            </li>
            <li>Cinco minutos de estiramientos en el área de tapetes.</li>
          </ul>
          <p>
            ¿Prefieres una clase? Movilidad y Ritmo son para empezar.{" "}
            <Link to="/gimnasio/clases">Ver el horario</Link>
          </p>
        </section>

        <section aria-labelledby="b-preguntar">
          <h2 id="b-preguntar">Si te da pena preguntar</h2>
          <p>
            Los coaches de piso están para eso, aunque no tengas sesiones contratadas. Y si
            prefieres ir con calma, la evaluación gratuita te deja un plan para las primeras cuatro
            semanas.
          </p>
        </section>
      </div>

      <section className="b-tranquilas" aria-labelledby="b-tranquilas-titulo">
        <h2 id="b-tranquilas-titulo" className="b-d b-media">
          Cuándo está más tranquilo
        </h2>
        <p>Horas con menos de un tercio del aforo, según el aforo simulado de cada sucursal.</p>
        <table className="b-tabla-tranquilas">
          <thead>
            <tr>
              <th scope="col">Sucursal</th>
              <th scope="col">Entre semana</th>
              <th scope="col">Fin de semana</th>
            </tr>
          </thead>
          <tbody>
            {filas.map(({ s, semana, finde }) => (
              <tr key={s.id}>
                <th scope="row">{s.nombre}</th>
                <td className="b-num">{semana}</td>
                <td className="b-num">{finde}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
