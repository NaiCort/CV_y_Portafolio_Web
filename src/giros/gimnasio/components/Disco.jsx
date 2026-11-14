import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

// Disco de pesas de 20 kg: la firma de Brío. Gira al desplazarse; quieto con movimiento reducido.
const C = 300
const TORNILLOS = Array.from({ length: 6 }, (_, i) => {
  const a = (i * Math.PI) / 3
  return [C + 70 * Math.cos(a), C + 70 * Math.sin(a)]
})

export default function Disco({ className }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const giro = useTransform(scrollY, [0, 1600], [-18, 222])
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      style={{ rotate: reduced ? -18 : giro }}
    >
      <defs>
        <path id="brio-anillo" d="M 68,300 a 232,232 0 1,1 464,0 a 232,232 0 1,1 -464,0" />
      </defs>
      <circle cx={C} cy={C} r={296} className="b-disco-hule" />
      <circle cx={C} cy={C} r={286} className="b-disco-surco" />
      <circle cx={C} cy={C} r={278} className="b-disco-surco" />
      <circle cx={C} cy={C} r={238} className="b-disco-color" />
      <circle cx={C} cy={C} r={150} className="b-disco-hule" />
      <circle cx={C} cy={C} r={78} fill="#b9bcc2" />
      <circle cx={C} cy={C} r={62} fill="#8d9097" />
      <circle cx={C} cy={C} r={26} className="b-disco-centro" />
      {TORNILLOS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill="#6c6f75" />
      ))}
      <text className="b-disco-texto">
        <textPath href="#brio-anillo" textLength="1430" lengthAdjust="spacing">
          BRÍO · 20 KG · CINCO SUCURSALES · UN SOLO CLUB ·
        </textPath>
      </text>
    </motion.svg>
  )
}
