import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, dialog, close } from "./restaurant-browser.mjs"

const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("h1").first().waitFor({ state: "attached" })
}
// axe mide colores reales: se espera a que terminen fundidos y animaciones.
const audit = async (page) => {
  await page.waitForFunction(() =>
    document
      .querySelector(".revista-root")
      .getAnimations({ subtree: true })
      .every((a) => a.playState !== "running"),
  )
  await auditar(page)
}
// Las fotos cargan en diferido: se recorre la página para que todas estén puestas.
const recorrer = (page) =>
  page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    scrollTo(0, 0)
  })

await suite("revista", async ({ run, base }) => {
  for (const width of [320, 390, 768, 1024, 1440])
    await run(
      `Recorrido de Rubor y Prisma · ${width}px`,
      {
        viewport: { width, height: 900 },
        ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: width === 1440 ? "no-preference" : "reduce",
      },
      async ({ page }) => {
        for (const path of [
          "/revista",
          "/revista/rubor",
          "/revista/rubor/numero/23",
          "/revista/rubor/numero/12",
          "/revista/rubor/marcadores",
          "/revista/prisma",
          "/revista/prisma/articulo/andromeda",
          "/revista/prisma/articulo/adn-no-codificante",
          "/revista/prisma/articulo/cometa",
          "/revista/prisma/autor/lucia-arrieta",
          "/revista/prisma/marcadores",
        ]) {
          await go(page, base, path)
          await recorrer(page)
          assert.equal(await page.locator("h1").count(), 1, `Un h1 en ${path}`)
          assert.equal(await page.locator('a[href="#"]').count(), 0)
          await bounds(page)
          await audit(page)
        }

        // Rubor: menú de números, cambio de paleta y marcadores.
        await go(page, base, "/revista/rubor")
        await page.getByRole("button", { name: "Números", exact: true }).click()
        await page.locator("#rb-numeros").waitFor()
        assert.equal(await page.locator("#rb-numeros a").count(), 24)
        await audit(page)
        await page.locator("#rb-numeros a").nth(1).click()
        await page.waitForURL(/numero\/23$/)
        await page.waitForFunction(() =>
          document.querySelector("h1").textContent.includes("N.º 23"),
        )
        await page.getByRole("button", { name: "☆ Guardar número" }).first().click()
        await page.getByRole("button", { name: "★ Guardado en marcadores" }).first().waitFor()
        await page
          .locator(".rb-cab-der")
          .getByRole("link", { name: /Marcadores/ })
          .click()
        await page.locator(".rb-rejilla-num li").first().waitFor()
        await audit(page)

        // Rubor: comentario.
        await go(page, base, "/revista/rubor")
        await page.locator(".rb-comentarios textarea").fill("Comentario de prueba")
        await page.getByRole("button", { name: "Publicar comentario" }).click()
        await page.locator(".rb-com-propio").waitFor()
        await bounds(page)
        await audit(page)

        // Prisma: elegir número, guardar, populares y búsqueda.
        await go(page, base, "/revista/prisma")
        await page.locator(".pr-fila .pr-num").nth(4).click()
        assert.equal(
          await page.locator(".pr-sel h2").textContent(),
          "Satélites pequeños, preguntas grandes",
        )
        await page.locator(".pr-sel").getByRole("button", { name: "☆ Guardar" }).click()
        await page.getByRole("button", { name: "Mes" }).click()
        await audit(page)
        await page.locator(".pr-busca").click()
        await dialog(page).waitFor()
        await page.locator("#pr-q").fill("cometa")
        await page.locator(".pr-buscar-lista a").first().waitFor()
        await audit(page)
        await close(page)
        await page.locator(".pr-sel .pr-autores a").first().click()
        await page.waitForURL(/autor\/sofia-lara$/)
        await go(page, base, "/revista/prisma/marcadores")
        await page.locator(".pr-rej li").first().waitFor()
        await audit(page)
      },
    )
})
