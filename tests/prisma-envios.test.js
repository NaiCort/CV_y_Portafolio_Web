import { expect, it } from "vitest"
import { leerEnvios, guardarEnvio, PREFIJO_ENVIO } from "../src/giros/revista/lib/envios"
import { borrarDatosRevista } from "../src/giros/revista/lib/privacidad"
it("conserva envíos independientes al avanzar una revisión y permite borrarlos desde privacidad", () => {
  const envio = {
    id: "a",
    titulo: "Estudio",
    resumen: "Resumen",
    autores: "Autora",
    area: "datos",
    archivo: "estudio.pdf",
    fecha: "2026-11-20",
    paso: 0,
  }
  guardarEnvio(envio)
  guardarEnvio({ ...envio, id: "b" })
  guardarEnvio({ ...envio, paso: 1 })
  localStorage.setItem(PREFIJO_ENVIO + "ilegible", "{")
  expect(
    leerEnvios()
      .map((e) => [e.id, e.paso])
      .sort(),
  ).toEqual([
    ["a", 1],
    ["b", 0],
  ])
  borrarDatosRevista()
  expect(leerEnvios()).toEqual([])
})
