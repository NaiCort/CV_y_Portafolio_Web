// Coaches ficticios. Los nombres no corresponden a personas reales.
export const COACHES = [
  { id: "mara", nombre: "Mara", especialidad: "Fuerza y técnica de barra" },
  { id: "rafa", nombre: "Rafa", especialidad: "Box y kickboxing" },
  { id: "ivan", nombre: "Iván", especialidad: "Ciclo y resistencia" },
  { id: "sofia", nombre: "Sofía", especialidad: "Movilidad, yoga y pilates" },
  { id: "dani", nombre: "Dani", especialidad: "Ritmo y cardio de baile" },
  { id: "leo", nombre: "Leo", especialidad: "Fuerza para principiantes" },
]
export const findCoach = (id) => COACHES.find((coach) => coach.id === id)
