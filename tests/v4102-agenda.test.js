import { describe, expect, it } from "vitest"
import {
  diasDisponibles,
  horaEnZona,
  horarios,
  textoRecordatorio,
  validarContacto,
  validarNombre,
} from "../src/giros/psicologo/lib/agenda"

describe("Agenda simulada del consultorio", () => {
  it("ofrece seis días sin domingos, a partir de mañana", () => {
    const dias = diasDisponibles(new Date(2026, 10, 28)) // sábado
    expect(dias).toHaveLength(6)
    expect(dias[0].nombre).toBe("lunes 30 de noviembre")
    expect(dias.every((d) => d.fecha.getDay() !== 0)).toBe(true)
  })
  it("el sábado solo tiene mañana y los horarios ocupados son estables", () => {
    const [sabado] = diasDisponibles(new Date(2026, 10, 27))
    expect(sabado.fecha.getDay()).toBe(6)
    expect(horarios(sabado).map((h) => h.hora)).toEqual([9, 11])
    expect(horarios(sabado)).toEqual(horarios(sabado))
  })
  it("convierte la hora a la zona del visitante", () => {
    expect(horaEnZona(16, "centro")).toBe("16:00")
    expect(horaEnZona(9, "noroeste")).toBe("7:00")
    expect(horaEnZona(18, "madrid")).toBe("1:00 (día siguiente)")
  })
  it("valida nombre, teléfono de 10 dígitos y correo", () => {
    expect(validarNombre(" ")).toBeTruthy()
    expect(validarNombre("Ana")).toBeNull()
    expect(validarContacto("whatsapp", "228 123 4567")).toBeNull()
    expect(validarContacto("whatsapp", "+52 228 123 4567")).toBeNull()
    expect(validarContacto("telefono", "12345")).toBeTruthy()
    expect(validarContacto("correo", "ana@ejemplo.mx")).toBeNull()
    expect(validarContacto("correo", "ana@")).toBeTruthy()
  })
  it("arma el recordatorio según lo agendado", () => {
    const linea = textoRecordatorio({
      tipo: "primera",
      dia: "lunes 30 de noviembre",
      hora: 16,
      modalidad: "linea",
      zona: "pacifico",
    })
    expect(linea).toContain("tu primera sesión")
    expect(linea).toContain("15:00")
    expect(linea).toContain("enlace de la videollamada")
  })
})
