import { fotoUmbral, srcSetUmbral } from "../../data/umbral"
import { useProfundidad } from "../../lib/umbral-movimiento"
import { Barras, Caligrafia, Estrella, Mira, Registro } from "./Adornos"
import Causticas from "./Causticas"

// Motor de carteles: cada cartel es una pila de capas (de abajo hacia arriba) dentro de un
// contenedor con proporción fija. Las mismas capas sirven para el cartel, para el «despiece»
// (capas separadas en 3D) y para el proceso (capas que se encienden una a una).
// Todo el cartel es una imagen para lectores de pantalla (role="img" con su descripción).

function Capa({ nombre, z, ocultas, children, className = "" }) {
  return (
    <div
      className={`um-capa um-capa-${nombre} ${className}`}
      data-capa={nombre}
      data-oculta={ocultas?.includes(nombre) ? "" : undefined}
      style={{ "--z": z }}
    >
      {children}
    </div>
  )
}

function Foto({
  clave,
  sizes = "(max-width: 700px) 100vw, 50vw",
  eager,
  posicion,
  className = "",
}) {
  return (
    <img
      className={className}
      src={fotoUmbral(clave)}
      srcSet={srcSetUmbral(clave)}
      sizes={sizes}
      alt=""
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      style={posicion ? { objectPosition: posicion } : undefined}
    />
  )
}

function Recorte({ clave, eager, className = "" }) {
  return (
    <img
      className={`um-recorte ${className}`}
      src={fotoUmbral(`${clave}-recorte`)}
      srcSet={`${fotoUmbral(`${clave}-recorte`, 800)} 800w, ${fotoUmbral(`${clave}-recorte`)} 1600w`}
      sizes="(max-width: 700px) 100vw, 50vw"
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  )
}

function Ventana({ d, eager, ocultas }) {
  return (
    <>
      <Capa nombre="fondo" z={0} ocultas={ocultas}>
        <Foto clave={d.foto} eager={eager} className="um-v-tenue" />
      </Capa>
      <Capa nombre="letras" z={1} ocultas={ocultas}>
        <p className="um-v-letras" style={{ "--foto": `url(${fotoUmbral(d.foto)})` }}>
          <span>Entre</span>
          <span>las</span>
          <span>líneas</span>
        </p>
      </Capa>
      <Capa nombre="recorte" z={2} ocultas={ocultas}>
        <Recorte clave={d.recorte} eager={eager} />
      </Capa>
      <Capa nombre="notas" z={3} ocultas={ocultas} className="um-notas">
        <p className="um-n um-v-n1">
          Umbral
          <br />
          Fragmentos
          <br />
          <em>2026</em>
        </p>
        <p className="um-n um-v-n2">
          No somos lo que fingimos.
          <br />
          Somos lo que repetimos en <em>silencio</em>.
        </p>
        <p className="um-n um-v-n3">
          —<br />
          Leo <em>rostros</em>
          <br />
          Siento <em>espacios</em>
          <br />
          Recuerdo
          <br />
          <em>silencios</em>
        </p>
        <p className="um-n um-v-n4">
          No está roto.
          <br />
          Solo se
          <br />
          <em>reacomoda</em>.
        </p>
        <p className="um-n um-v-n5">
          <span>Número 07</span>
          Umbral · Fragmentos
        </p>
        <Caligrafia palabra="cambiando" className="um-v-firma" />
      </Capa>
    </>
  )
}

const REBANADAS = [
  // [foto, posición de la foto, clip, caja (izq, arr, ancho, alto)]
  ["saco", "50% 30%", "polygon(30% 0, 100% 0, 70% 100%, 0 100%)", [4, 46, 30, 40]],
  ["perfil", "50% 30%", "polygon(34% 0, 100% 0, 66% 100%, 0 100%)", [40, 6, 44, 76]],
  ["sombra", "50% 40%", "polygon(44% 0, 100% 0, 56% 100%, 0 100%)", [74, 44, 18, 40]],
  ["chamarra", "50% 35%", "polygon(50% 0, 100% 0, 50% 100%, 0 100%)", [30, 60, 24, 32]],
]

function Diagonal({ d, eager, ocultas }) {
  return (
    <>
      <Capa nombre="fondo" z={0} ocultas={ocultas}>
        <span className="um-papel" />
      </Capa>
      <Capa nombre="rebanadas" z={1} ocultas={ocultas}>
        {REBANADAS.map(([clave, pos, clip, [x, y, w, h]], i) => (
          <span
            key={clave}
            className={`um-reb um-reb-${i}`}
            style={{
              "--x": `${x}%`,
              "--y": `${y}%`,
              "--w": `${w}%`,
              "--h": `${h}%`,
              clipPath: clip,
            }}
          >
            <Foto clave={clave} eager={eager && i === 1} posicion={pos} />
          </span>
        ))}
        <span className="um-astilla um-astilla-1" />
        <span className="um-astilla um-astilla-2" />
      </Capa>
      <Capa nombre="recorte" z={2} ocultas={ocultas}>
        <span className="um-d-recorte">
          <Recorte clave={d.recorte} eager={eager} />
        </span>
      </Capa>
      <Capa nombre="notas" z={3} ocultas={ocultas} className="um-notas">
        <p className="um-d-titulo">
          <span>Mirar</span>
          <span>más allá</span>
          <span>del</span>
        </p>
        <Caligrafia palabra="ruido" className="um-d-ruido" />
        <p className="um-n um-d-n1">
          <b>Umbral</b>
          <br />
          Estudio
        </p>
        <p className="um-n um-d-n2">
          Vive claro.
          <br />
          Mira despacio.
        </p>
        <div className="um-n um-d-n3">
          <b>N.º 07 / 2026</b>
          <br />
          Colección
          <br />
          Para mirar dos veces.
          <Barras texto="PERSPECTIVA" />
        </div>
        <p className="um-n um-d-n4">
          <b>Enfoca</b>
          <br />
          en
          <br />
          lo que
          <br />
          importa.
        </p>
        <Mira className="um-d-mira" />
        <p className="um-d-nota">
          No es solo una foto:
          <br />
          es un punto de vista.
        </p>
        <p className="um-n um-d-n6">Umbral — la mirada que habla en silencio.</p>
        <Registro className="um-d-reg1" />
        <Registro className="um-d-reg2" />
      </Capa>
    </>
  )
}

function Vertical({ d, eager, ocultas }) {
  return (
    <>
      <Capa nombre="fondo" z={0} ocultas={ocultas}>
        <Foto clave={d.foto} eager={eager} className="um-a-foto" />
        <span className="um-a-reflejo" />
        <Causticas />
      </Capa>
      <Capa nombre="letras" z={1} ocultas={ocultas}>
        <span className="um-a-panel" />
        <p className="um-a-palabra">Agua</p>
      </Capa>
      <Capa nombre="notas" z={2} ocultas={ocultas} className="um-notas">
        <div className="um-a-columna">
          <p className="um-a-lema">{d.lema}</p>
          <p className="um-a-fecha">
            <b>Octubre</b>
            <br />
            2026
          </p>
          <p className="um-a-tipo">
            Cartel
            <br />
            <b>tipográfico</b>
          </p>
          <Barras texto="AGUA-06" className="um-a-barras" />
        </div>
      </Capa>
    </>
  )
}

const TIRAS = [
  [21, 26, 17, 58],
  [38, 15, 25, 72],
  [64, 21, 17, 52],
]

function Tiras({ d, eager, ocultas }) {
  return (
    <>
      <Capa nombre="fondo" z={0} ocultas={ocultas}>
        <span className="um-papel um-papel-calido" />
        <Foto clave="ventana" className="um-t-luz" />
      </Capa>
      <Capa nombre="tiras" z={1} ocultas={ocultas}>
        {TIRAS.map(([x, y, w, h], i) => (
          <span
            key={x}
            className="um-tira"
            style={{ "--x": x, "--y": y, "--w": w, "--h": h, "--m": `${(i - 1) * 2.2}%` }}
          >
            <Foto clave={d.foto} eager={eager && i === 1} />
          </span>
        ))}
      </Capa>
      <Capa nombre="letras" z={2} ocultas={ocultas}>
        <p className="um-t-palabra">Crear</p>
      </Capa>
      <Capa nombre="recorte" z={3} ocultas={ocultas}>
        <Recorte clave={d.recorte} eager={eager} className="um-t-recorte" />
      </Capa>
      <Capa nombre="notas" z={4} ocultas={ocultas} className="um-notas">
        <p className="um-n um-t-marca">
          <Estrella />
          <span>
            <b>Umbral</b>
            <br />
            Estudio creativo
          </span>
        </p>
        <p className="um-n um-t-n1">Ideas × diseño × impacto</p>
        <p className="um-n um-t-n2">
          Misma alma.
          <br />
          Otra perspectiva.
          <br />
          Siempre creando.
        </p>
        <p className="um-n um-t-n3">
          Contar
          <br />
          historias
          <br />
          con imágenes
        </p>
        <p className="um-t-ideas">
          Ideas en
          <br />
          realidad
        </p>
        <p className="um-n um-t-n4">
          Fotografía
          <br />
          Carteles
          <br />
          Revistas
          <br />
          Identidad
        </p>
        <p className="um-n um-t-n5">
          El buen diseño
          <br />
          une mejor.
        </p>
        <p className="um-n um-t-n6">
          <small>Desde</small>
          <b>2024</b>
        </p>
        <Barras texto="UMBRAL-ESTUDIO" etiqueta="Umbral estudio" className="um-t-barras" />
        <Caligrafia palabra="bello" className="um-t-firma" />
        <Estrella className="um-t-estrella" />
        <p className="um-n um-t-n7">Más que diseño, un idioma</p>
      </Capa>
    </>
  )
}

function Simple({ d, eager, ocultas }) {
  return (
    <>
      <Capa nombre="fondo" z={0} ocultas={ocultas}>
        <Foto clave={d.foto} eager={eager} className="um-s-foto" />
      </Capa>
      <Capa nombre="notas" z={1} ocultas={ocultas} className="um-notas">
        <p className="um-s-titulo">{d.titulo}</p>
        <p className="um-n um-s-n1">
          Umbral · N.º {String(d.numero).padStart(2, "0")}
          <br />
          {d.mes}
        </p>
        <p className="um-n um-s-n2">{d.lema}</p>
      </Capa>
    </>
  )
}

const VARIANTES = { ventana: Ventana, diagonal: Diagonal, vertical: Vertical, tiras: Tiras }

export default function Cartel({
  d,
  eager = false,
  despiece = false,
  ocultas,
  proporcion,
  className = "",
}) {
  const ref = useProfundidad()
  const Variante = VARIANTES[d.cartel] ?? Simple
  return (
    <div
      ref={ref}
      className={`um-cartel um-c-${d.cartel} um-tono-${d.tono} ${className}`}
      data-despiece={despiece ? "" : undefined}
      role="img"
      aria-label={`Cartel de «${d.titulo}». ${d.alt}`}
      style={proporcion ? { "--prop": proporcion } : undefined}
    >
      <div className="um-pila" aria-hidden="true">
        <Variante d={d} eager={eager} ocultas={ocultas} />
      </div>
    </div>
  )
}
