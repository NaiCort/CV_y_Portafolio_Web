import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { UMA_DIARIA, aguinaldo, finiquito, isrResico } from "../lib/calculos"
import { precioTexto } from "../lib/formato"

const pesos = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" })
const dinero = (n) => pesos.format(n)
const numero = (t) => Number(String(t).replace(/[^\d.]/g, "")) || 0
const soloNumero = (t) => t.replace(/[^\d.]/g, "").slice(0, 10)

function Campo({ id, etiqueta, valor, onCambiar, tipo = "text", ayuda }) {
  return (
    <div className="d-campo">
      <label htmlFor={id}>{etiqueta}</label>
      <input
        id={id}
        type={tipo}
        inputMode={tipo === "text" ? "decimal" : undefined}
        value={valor}
        onChange={(e) => onCambiar(tipo === "text" ? soloNumero(e.target.value) : e.target.value)}
        aria-describedby={ayuda ? `${id}-ayuda` : undefined}
        autoComplete="off"
      />
      {ayuda && (
        <span className="d-campo-ayuda" id={`${id}-ayuda`}>
          {ayuda}
        </span>
      )}
    </div>
  )
}

function Resultado({ filas, total }) {
  return (
    <dl className="d-calc-resultado" aria-live="polite">
      {filas.map(([n, v]) => (
        <div key={n}>
          <dt>{n}</dt>
          <dd className="d-num">{v}</dd>
        </div>
      ))}
      <div className="d-calc-total">
        <dt>{total[0]}</dt>
        <dd className="d-num">{total[1]}</dd>
      </div>
    </dl>
  )
}

function Resico() {
  const [ingresos, setIngresos] = useState("40000")
  const [morales, setMorales] = useState("10000")
  const r = isrResico(numero(ingresos), numero(morales))
  return (
    <>
      <div className="d-campos">
        <Campo
          id="d-c-ingresos"
          etiqueta="Ingresos cobrados del mes, sin IVA"
          valor={ingresos}
          onCambiar={setIngresos}
        />
        <Campo
          id="d-c-morales"
          etiqueta="De eso, facturado a personas morales"
          valor={morales}
          onCambiar={setMorales}
          ayuda="Ellas te retienen 1.25 % de ISR."
        />
      </div>
      <Resultado
        filas={[
          ["Tasa del mes", `${(r.tasa * 100).toFixed(2).replace(/\.?0+$/, "")} %`],
          ["ISR del mes", dinero(r.isr)],
          ["Menos lo que te retuvieron", dinero(r.retenido)],
        ]}
        total={["ISR a pagar el día 17", dinero(r.aPagar)]}
      />
    </>
  )
}

function Aguinaldo() {
  const [salario, setSalario] = useState("450")
  const [dias, setDias] = useState("365")
  const [diasAg, setDiasAg] = useState("15")
  const a = aguinaldo(numero(salario), numero(dias), numero(diasAg) || 15)
  return (
    <>
      <div className="d-campos">
        <Campo id="d-c-salario" etiqueta="Salario diario" valor={salario} onCambiar={setSalario} />
        <Campo
          id="d-c-dias"
          etiqueta="Días trabajados en el año"
          valor={dias}
          onCambiar={setDias}
          ayuda="365 si trabajaste todo el año."
        />
        <Campo
          id="d-c-diasag"
          etiqueta="Días de aguinaldo"
          valor={diasAg}
          onCambiar={setDiasAg}
          ayuda="La ley da al menos 15."
        />
      </div>
      <Resultado
        filas={[
          [`Exento de ISR (30 UMA de ${precioTexto(UMA_DIARIA)})`, dinero(a.exento)],
          ["Parte que paga ISR", dinero(a.gravado)],
        ]}
        total={["Aguinaldo bruto", dinero(a.bruto)]}
      />
    </>
  )
}

function Finiquito() {
  const hoy = new Date().toISOString().slice(0, 10)
  const [salario, setSalario] = useState("450")
  const [ingreso, setIngreso] = useState("2023-03-01")
  const [salida, setSalida] = useState(hoy)
  const [tomadas, setTomadas] = useState("0")
  const f = finiquito({
    salarioDiario: numero(salario),
    ingreso,
    salida,
    vacacionesTomadas: numero(tomadas),
  })
  return (
    <>
      <div className="d-campos">
        <Campo id="d-c-fsalario" etiqueta="Salario diario" valor={salario} onCambiar={setSalario} />
        <Campo
          id="d-c-tomadas"
          etiqueta="Vacaciones ya tomadas este año de servicio"
          valor={tomadas}
          onCambiar={setTomadas}
        />
        <Campo
          id="d-c-ingreso"
          etiqueta="Fecha de ingreso"
          tipo="date"
          valor={ingreso}
          onCambiar={setIngreso}
        />
        <Campo
          id="d-c-salida"
          etiqueta="Fecha de salida"
          tipo="date"
          valor={salida}
          onCambiar={setSalida}
        />
      </div>
      {f ? (
        <Resultado
          filas={[
            [`Aguinaldo proporcional (${f.diasAnio} días del año)`, dinero(f.aguinaldo)],
            [`Vacaciones pendientes (${f.diasVacaciones} días)`, dinero(f.vacaciones)],
            ["Prima vacacional (25 %)", dinero(f.prima)],
          ]}
          total={["Finiquito bruto, antes de ISR", dinero(f.total)]}
        />
      ) : (
        <p className="d-campo-error" role="status">
          La fecha de salida debe ser posterior a la de ingreso.
        </p>
      )}
      <p className="d-nota">
        No incluye indemnización ni prima de antigüedad, que aplican en algunos despidos.
      </p>
    </>
  )
}

const TABS = [
  ["resico", "ISR de RESICO", Resico],
  ["aguinaldo", "Aguinaldo", Aguinaldo],
  ["finiquito", "Finiquito", Finiquito],
]

export default function Calculadoras() {
  const [params, setParams] = useSearchParams()
  const actual = TABS.find(([id]) => id === params.get("c")) ?? TABS[0]
  const [, nombre, Componente] = actual
  return (
    <section className="d-wrap d-sec d-pagina" aria-labelledby="d-titulo">
      <h1 id="d-titulo" tabIndex={-1}>
        Calculadoras
      </h1>
      <p className="d-bajada">
        Orientativas, con las tablas y la UMA de 2026. Para un caso real, te lo calculamos con tus
        recibos y facturas.
      </p>
      <div className="d-tabs" role="group" aria-label="Elige una calculadora">
        {TABS.map(([id, n]) => (
          <button
            key={id}
            type="button"
            aria-pressed={id === actual[0]}
            onClick={() => setParams({ c: id }, { replace: true })}
          >
            {n}
          </button>
        ))}
      </div>
      <form className="d-calc" onSubmit={(e) => e.preventDefault()} aria-label={nombre}>
        <h2>{nombre}</h2>
        <Componente key={actual[0]} />
      </form>
    </section>
  )
}
