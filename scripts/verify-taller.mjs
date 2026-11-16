import assert from "node:assert/strict"
import { suite, audit, bounds, button, dialog, close } from "./restaurant-browser.mjs"

const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("main h1").waitFor()
}
const altura = (page) => page.evaluate(() => document.documentElement.scrollHeight)
// Cambia de taller y espera a que terminen las transiciones de color (200 ms).
const tema = async (page, nombre) => {
  await page
    .locator(".t-temas")
    .getByRole("button", { name: new RegExp(`^${nombre}`) })
    .click()
  await page.waitForFunction(() =>
    document
      .querySelector(".taller-root")
      .getAnimations({ subtree: true })
      .every((a) => a.playState !== "running"),
  )
}

await suite("taller", async ({ run, base }) => {
  for (const width of [320, 390, 768, 1024, 1440])
    await run(
      `Recorrido de Rosales y Vértice · ${width}px`,
      {
        viewport: { width, height: 900 },
        ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: width === 1440 ? "no-preference" : "reduce",
      },
      async ({ page }) => {
        for (const taller of ["Mecánica Rosales", "Vértice"]) {
          for (const path of ["/taller", "/taller/creditos"]) {
            await go(page, base, path)
            await tema(page, taller)
            assert.equal(await page.locator("h1").count(), 1, `Un h1 en ${path}`)
            assert.equal(await page.locator('a[href="#"], a[href^="tel:"]').count(), 0)
            await bounds(page)
            await audit(page)
          }
        }

        // Testigos: elegir uno cambia la lectura y el botón queda marcado.
        await go(page, base, "/taller")
        await tema(page, "Mecánica Rosales")
        const temperatura = page.locator(".t-testigo", { hasText: "Temperatura" })
        await temperatura.click()
        assert.equal(await temperatura.getAttribute("aria-pressed"), "true")
        assert.match(await page.locator("#t-lectura h3").textContent(), /Temperatura del motor/)
        assert.match(await page.locator("#t-lectura").textContent(), /Detente/)

        // Agendar desde el testigo abre el WhatsApp simulado con ese mensaje.
        await button(page.locator("#t-lectura"), "Agendar revisión").click()
        await dialog(page).waitFor()
        assert.match(await dialog(page).textContent(), /Hola, se me encendió la luz de temperatura/)
        await bounds(page)
        await audit(page)
        await close(page)

        // Consulta tu auto con la orden de ejemplo.
        const consulta = page.locator(".t-consulta")
        await consulta.scrollIntoViewIfNeeded()
        await consulta.locator(".t-consulta-ejemplo").click()
        await button(consulta, "Consultar").click()
        await page.locator(".t-consulta-resultado").waitFor()
        assert.match(
          await page.locator('.t-etapas [aria-current="step"]').textContent(),
          /Esperando tu visto bueno/,
        )
        await audit(page)

        // Mapa de Rosales: un solo local, distinto de los de Vértice, con su ficha al lado.
        await page.locator("#ubicacion .t-mapa").scrollIntoViewIfNeeded()
        await page.locator(".t-pin").first().waitFor({ timeout: 20000 })
        assert.equal(await page.locator(".t-pin").count(), 1)
        assert.match(await page.locator("#ubicacion .t-ficha").textContent(), /Colonia Revolución/)
        await audit(page)

        // Barra de contacto en teléfono; la llamada es simulada.
        const barra = page.locator(".t-barra-movil")
        if (width < 640) {
          assert(await barra.isVisible(), "Barra de contacto visible en teléfono")
          await button(barra, "Llamar").click()
        } else {
          assert(!(await barra.isVisible()), "Sin barra de contacto en pantallas anchas")
          await page.locator(".t-tel").click()
        }
        await dialog(page).waitFor()
        assert.match(await dialog(page).textContent(), /la demo no hace llamadas/)
        await audit(page)
        await close(page)

        // Cambiar de taller: Vértice tiene sucursales y Mi garaje, y lo recuerda al volver.
        await tema(page, "Vértice")
        await page.locator("#sucursales").waitFor()
        assert.equal(await page.locator(".t-sucursales > li").count(), 4)
        // Mapa de Vértice: cuatro marcas; tocar una abre su ficha en la lista.
        await page.locator("#sucursales .t-mapa").scrollIntoViewIfNeeded()
        await page.locator(".t-pin").nth(3).waitFor({ timeout: 20000 })
        assert.equal(await page.locator(".t-pin").count(), 4)
        await page.locator(".t-pin", { hasText: "Arco Sur" }).click()
        await page.locator("#t-suc-arco-sur").waitFor()
        assert.equal(
          await page
            .locator(".t-sucursal-boton", { hasText: "Arco Sur" })
            .getAttribute("aria-expanded"),
          "true",
        )
        await bounds(page)
        await audit(page)
        assert.equal(await page.locator("#consulta").count(), 0)
        assert.equal(await page.locator(".taller-root").getAttribute("data-tema"), "vertice")
        await page.reload()
        await page.locator("main h1").waitFor()
        assert.match(await page.locator("main h1").textContent(), /Tu auto, a la vista/)

        // La misma página no cambia de altura por volver al mismo tema.
        const antes = await altura(page)
        await tema(page, "Mecánica Rosales")
        await tema(page, "Vértice")
        assert.equal(await altura(page), antes, "Sin saltos al ir y volver de tema")

        // Navegación por secciones en pantallas anchas.
        if (width >= 1024) {
          await page.locator(".t-nav").getByRole("link", { name: "Precios", exact: true }).click()
          await page.waitForFunction(() => location.hash === "#precios")
          await page.waitForFunction(() => {
            const b = document.querySelector("#precios").getBoundingClientRect()
            return b.top >= 0 && b.top < innerHeight / 2
          })
        }
      },
    )
})
