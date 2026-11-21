import assert from "node:assert/strict"

// Bocina de Revista: abajo a la derecha, en silencio al llegar, una pista por revista y el
// volumen solo aparece con la música encendida y el cursor encima.
export async function verificarMusica(page, base) {
  const audio = page.locator(".rv-musica audio")
  const volumen = page.locator(".rv-volumen")
  const deslizador = page.getByRole("slider", { name: "Volumen de la música", includeHidden: true })
  const activar = page.getByRole("button", { name: "Activar música" })
  const silenciar = page.getByRole("button", { name: "Silenciar música" })

  await page.goto(base + "/revista")
  assert.equal(await page.locator(".rv-musica").count(), 0, "La entrada no tiene música")

  await page.goto(base + "/revista/rubor")
  await activar.waitFor()
  assert(await audio.evaluate((a) => a.paused))
  assert.match(await audio.getAttribute("src"), /rubor-/)
  const caja = await page.locator(".rv-bocina").boundingBox()
  const vista = page.viewportSize()
  assert(caja.y > vista.height - 90, "La bocina está abajo")
  assert(caja.x > vista.width - 90, "La bocina está a la derecha")
  assert(!(await volumen.isVisible()), "Sin música no hay volumen")

  await activar.hover()
  assert(!(await volumen.isVisible()), "En silencio, pasar el cursor no muestra el volumen")
  await activar.click()
  await silenciar.waitFor()
  await page.waitForFunction(() => !document.querySelector(".rv-musica audio").paused)
  await silenciar.hover()
  await page.locator(".rv-musica[data-abierto]").waitFor()
  await deslizador.fill("62")
  assert.equal(await audio.evaluate((a) => Math.round(a.volume * 100)), 62)
  await page.mouse.move(10, 200)
  await page.waitForFunction(
    () => getComputedStyle(document.querySelector(".rv-volumen")).visibility === "hidden",
    null,
    { timeout: 3000 },
  )
  assert(!(await volumen.isVisible()), "Al salir el cursor, el volumen se oculta")

  // Con la música encendida, otra revista sigue sonando con su propia pista.
  await page.getByRole("link", { name: "Volver a elegir revista" }).click()
  await page
    .getByRole("link", { name: /Prisma/ })
    .first()
    .click()
  await page.waitForFunction(() =>
    document.querySelector(".rv-musica audio")?.getAttribute("src").includes("prisma-"),
  )
  await silenciar.waitFor()

  await page.reload()
  await activar.waitFor()
  assert(await audio.evaluate((a) => a.paused), "Al recargar empieza en silencio")
  assert.equal(await deslizador.inputValue(), "62", "El volumen se recuerda")

  await activar.click()
  await silenciar.waitFor()
  await page.getByRole("button", { name: "Privacidad y datos de Revista" }).click()
  await page.getByRole("button", { name: "Borrar los datos de Revista" }).click()
  await activar.waitFor()
  assert(await audio.evaluate((a) => a.paused))
  assert.equal(await deslizador.inputValue(), "35")
  assert.equal(await page.evaluate(() => localStorage.getItem("revista-musica-v1")), null)
}
