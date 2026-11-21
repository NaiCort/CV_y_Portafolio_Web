import { verificarMusica } from "./revista-musica.mjs"
import { verificarEnvio } from "./prisma-envio.mjs"
import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, dialog, close } from "./restaurant-browser.mjs"

const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("h1").first().waitFor({ state: "attached" })
}
// axe mide colores reales: se espera a que terminen fundidos y animaciones. Las ligadas al
// desplazamiento (Umbral) y las infinitas (ondas de la bocina) no terminan nunca: se ignoran.
const audit = async (page) => {
  await page.waitForFunction(() =>
    document
      .querySelector(".revista-root")
      .getAnimations({ subtree: true })
      .filter(
        (a) =>
          a.timeline instanceof DocumentTimeline &&
          Number.isFinite(a.effect?.getComputedTiming().endTime),
      )
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
      `Recorrido de Rubor, Prisma y Umbral · ${width}px`,
      {
        viewport: { width, height: 900 },
        ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: width === 1440 ? "no-preference" : "reduce",
      },
      async ({ page, context }) => {
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
          "/revista/umbral",
          "/revista/umbral/dossier/entre-lineas",
          "/revista/umbral/dossier/otra-perspectiva",
          "/revista/umbral/creador/nicolas-vera",
          "/revista/umbral/guardados",
          "/revista/umbral/creditos",
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
        await page.locator("#pr-q").fill("a")
        assert.equal(await page.locator(".pr-buscar-lista a").count(), 24)
        await page.locator("#pr-q").fill("cometa")
        await page.locator(".pr-buscar-lista a").first().waitFor()
        await audit(page)
        await close(page)
        await page.locator(".pr-sel .pr-autores a").first().click()
        await page.waitForURL(/autor\/sofia-lara$/)
        await go(page, base, "/revista/prisma/marcadores")
        await page.locator(".pr-rej li").first().waitFor()
        await audit(page)

        // El foco acompaña a la nueva lectura, en lugar de quedarse al final.
        await go(page, base, "/revista/prisma/articulo/andromeda")
        await page.locator(".pr-sig a").focus()
        await page.keyboard.press("Enter")
        await page.waitForURL(/adn-no-codificante$/)
        await page.waitForFunction(
          () => document.activeElement === document.querySelector("main h1"),
        )

        // Umbral: relato, proceso, disciplina y guardados.
        await go(page, base, "/revista/umbral/dossier/entre-lineas")
        await page.getByRole("button", { name: "Ver proceso", exact: true }).click()
        assert.equal(await page.locator(".um-proceso li").count(), 4)
        await audit(page)
        await page
          .getByRole("button", { name: "Guardar dossier: Entre líneas", exact: true })
          .click()
        await page.getByRole("link", { name: "Guardados (1)", exact: true }).click()
        await page.locator(".um-lista > li").first().waitFor()
        assert.equal(await page.locator(".um-lista > li").count(), 1)
        await go(page, base, "/revista/umbral")
        await page.locator(".um-indice select").selectOption("Diseño")
        assert.equal(await page.locator(".um-lista > li").count(), 1)
        await audit(page)

        // Dos pestañas escriben elementos diferentes sin perder ninguno.
        if (width === 390) {
          await go(page, base, "/revista/rubor/numero/12")
          await page.getByRole("link", { name: "Suscribirme para leer la nota de archivo" }).click()
          await page.getByRole("radio", { name: /Plan anual/ }).check()
          await page.getByRole("button", { name: "Confirmar suscripción simulada" }).click()
          await page.getByRole("link", { name: "Leer el N.º 12" }).click()
          await page.reload()
          await page.getByRole("heading", { name: /Notas de la editora/ }).waitFor()
          await go(page, base, "/revista/rubor/cuenta")
          await page.getByRole("button", { name: "Cancelar suscripción" }).click()
          await go(page, base, "/revista/rubor/numero/12")
          await page.getByRole("link", { name: /Suscribirme/ }).waitFor()
          const aislado = await context.browser().newContext({ viewport: { width, height: 900 } })
          try {
            await verificarEnvio(await aislado.newPage(), base)
            await verificarMusica(await aislado.newPage(), base)
          } finally {
            await aislado.close()
          }
          const otra = await context.newPage()
          await go(page, base, "/revista/prisma/articulo/andromeda")
          await go(otra, base, "/revista/prisma/articulo/adn-no-codificante")
          await page.getByRole("button", { name: "☆ Guardar", exact: true }).click()
          await otra.getByRole("button", { name: "☆ Guardar", exact: true }).click()
          await page.waitForFunction(() =>
            document.querySelector(".pr-cab").textContent.includes("Marcadores (3)"),
          )
          await otra.close()
          await page.reload()
          await page.getByRole("button", { name: "★ Guardado", exact: true }).waitFor()
        }

        // Privacidad: solo elimina el ámbito de Revista, también en la vista actual.
        await go(page, base, "/revista/umbral/guardados")
        await page.evaluate(() => localStorage.setItem("qa-otra-demo", "conservar"))
        await page
          .getByRole("button", { name: "Privacidad y datos de Revista", exact: true })
          .click()
        await audit(page)
        await page.getByRole("button", { name: "Borrar los datos de Revista", exact: true }).click()
        await page
          .getByText("Aquí aparecerán los dossiers que guardes.", { exact: false })
          .waitFor()
        assert.equal(await page.locator(".um-lista > li").count(), 0)
        assert.equal(await page.evaluate(() => localStorage.getItem("qa-otra-demo")), "conservar")
        await bounds(page)
        await audit(page)
      },
    )
})
