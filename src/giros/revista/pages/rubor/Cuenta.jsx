import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { findNumero } from "../../data/rubor"

import { CLAVE_PLAN, precios } from "../../lib/suscripcion"
export default function Cuenta({ plan, actualizar }) {
  const [elegido, elegir] = useState("mensual")
  const [aviso, avisar] = useState("")
  const [params] = useSearchParams()
  const numero = findNumero(params.get("numero")) ?? findNumero(22)
  function cambiar(valor) {
    try {
      if (valor) localStorage.setItem(CLAVE_PLAN, valor)
      else localStorage.removeItem(CLAVE_PLAN)
      actualizar(valor)
      avisar(valor ? "Suscripción simulada activa." : "Suscripción cancelada.")
    } catch {
      avisar("El navegador impidió guardar el cambio. Revisa el permiso de almacenamiento.")
    }
  }
  return (
    <main className="rb-archivo">
      <h1>Cuenta de ejemplo</h1>
      <p>Suscripción al archivo de Rubor. Simulación sin cobros ni datos bancarios.</p>
      {plan ? (
        <>
          <p>
            Plan {plan} activo · {precios[plan]}.
          </p>
          <Link to={"/revista/rubor/numero/" + numero.n}>Leer el N.º {numero.n}</Link>
          <p>
            <button className="rb-boton" onClick={() => cambiar("")}>
              Cancelar suscripción
            </button>
          </p>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            cambiar(elegido)
          }}
        >
          <fieldset>
            <legend>Elige tu plan</legend>
            {Object.entries(precios).map(([p, precio]) => (
              <label key={p} style={{ display: "block" }}>
                <input
                  type="radio"
                  name="plan"
                  checked={p === elegido}
                  onChange={() => elegir(p)}
                />{" "}
                Plan {p} · {precio}
              </label>
            ))}
          </fieldset>
          <p>Renovación simulada de {precios[elegido]} hasta que canceles desde esta cuenta.</p>
          <button className="rb-boton" type="submit">
            Confirmar suscripción simulada
          </button>
        </form>
      )}
      <p role="status">{aviso}</p>
    </main>
  )
}
