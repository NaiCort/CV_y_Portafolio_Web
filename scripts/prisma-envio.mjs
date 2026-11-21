import assert from "node:assert/strict"
export async function verificarEnvio(page, base) {
  await page.goto(base + "/revista/prisma/publicar")
  await page.getByLabel("Título", { exact: true }).fill("Seguimiento de lluvia urbana")
  await page.getByLabel("Área", { exact: true }).selectOption("datos")
  await page.getByLabel("Resumen", { exact: true }).fill("Comparación ficticia de mediciones.")
  await page
    .getByLabel("Archivo PDF")
    .setInputFiles({
      name: "muestra.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4"),
    })
  await page.getByRole("button", { name: "Enviar investigación" }).click()
  await page.getByText("Enviado", { exact: true }).waitFor()
  await page.reload()
  await page.getByRole("button", { name: "Simular inicio de revisión" }).click()
  await page.getByText("En revisión", { exact: true }).waitFor()
  await page.getByRole("button", { name: "Publicar preimpresión" }).click()
  await page.getByText("Preimpresión publicada", { exact: true }).waitFor()
  await page.getByRole("link", { name: "Explorar por área" }).first().click()
  await page.getByRole("button", { name: "Ciencia de datos", exact: true }).click()
  await page.getByLabel("Estado", { exact: true }).selectOption("preimpresion")
  await page.getByLabel("Orden", { exact: true }).selectOption("lecturas")
  await page.getByRole("link", { name: "Seguimiento de lluvia urbana" }).click()
  await page.getByText("Comparación ficticia de mediciones.").waitFor()
  assert.equal(await page.locator("main h1").innerText(), "Seguimiento de lluvia urbana")
  await page.getByRole("button", { name: "Privacidad y datos de Revista" }).click()
  await page.getByRole("button", { name: "Borrar los datos de Revista" }).click()
  await page.getByRole("heading", { name: "Preimpresión no disponible" }).waitFor()
}
