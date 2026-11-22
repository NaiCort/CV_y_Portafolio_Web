import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, button } from "./restaurant-browser.mjs"

// CV web y portafolio (V4.8) y cotizador provisional.
const audit = async (page) => {
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .filter((a) => Number.isFinite(a.effect?.getComputedTiming().endTime))
      .every((a) => a.playState !== "running"),
  )
  await auditar(page)
}
const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("h1").first().waitFor()
}

await suite("cv", async ({ run, base }) => {
  for (const width of [320, 390, 768, 1024, 1440])
    await run(
      `CV y portafolio · ${width}px`,
      {
        viewport: { width, height: 900 },
        ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: width === 1440 ? "no-preference" : "reduce",
      },
      async ({ page }) => {
        await go(page, base, "/")
        assert.equal(await page.locator("h1").count(), 1)
        assert.equal(await page.title(), "Ian Habid Aldana Martínez · CV y portafolio")
        await bounds(page)
        await audit(page)
        const escritorio = width >= 900
        assert.equal(
          await page.locator(".cv-barra").isVisible(),
          !escritorio,
          "Cabecera de celular",
        )
        assert.equal(await page.locator("#demos").isVisible(), escritorio, "Demos visibles")
        assert.equal(await page.locator('a[href="/despacho"]').count(), 1, "Una sola lista")

        if (escritorio) {
          // Cada columna se desplaza por separado; la página no.
          const alto = await page.evaluate(() => document.documentElement.scrollHeight)
          assert(alto <= 901, "La página entera no se desplaza")
          await page.locator("main").evaluate((m) => m.scrollTo(0, m.scrollHeight))
          await page.getByText("CV actualizado en").waitFor()
          // Índice: marca la sección que se lee y lleva a ella.
          await page.locator('.cv-indice a[href="#cv-trayectoria"]').click()
          await page.waitForFunction(
            () =>
              document.querySelector(".cv-indice a[aria-current]")?.getAttribute("href") ===
              "#cv-trayectoria",
          )
          await page.locator(".cv-linea").waitFor()
          await audit(page)
          // Transición de la demo (con movimiento a 1440 px; directa con movimiento reducido).
          await page.locator('#demos a[href="/cafe"]').click()
          await page.waitForURL(`${base}/cafe`)
          await page.locator("h1").first().waitFor()
          await page.goBack()
          await page.locator(".cv-nombre").waitFor()
        } else {
          const demos = button(page, "Demos")
          await demos.click()
          await page.locator("#demos").waitFor()
          assert.equal(await demos.getAttribute("aria-expanded"), "true")
          await bounds(page)
          await audit(page)
          await page.keyboard.press("Escape")
          await page.locator("#demos").waitFor({ state: "hidden" })
          // «Ver las 7 demos» del CV abre el mismo desplegable.
          await page.getByRole("link", { name: "Ver las 7 demos" }).click()
          await page.locator("#demos").waitFor()
          await page.locator('#demos a[href="/cafe"]').click()
          await page.waitForURL(`${base}/cafe`)
          await page.goBack()
          await page.locator("h1").first().waitFor()
          assert.equal(await page.locator("#demos").isVisible(), false, "Se cierra al elegir")
        }

        const pdf = await page.request.get(`${base}/cv/cv-ian-aldana-noviembre-2026.pdf`)
        assert.equal(pdf.status(), 200)
        assert.equal(pdf.headers()["content-type"], "application/pdf")

        await go(page, base, "/cotizador?demo=brio-distrito")
        await page.getByText("Brío (Distrito)").waitFor()
        await bounds(page)
        await audit(page)
        await page.getByRole("link", { name: "Volver al CV y las demos" }).click()
        await page.locator(".cv-nombre").waitFor()
        return { width }
      },
    )
})
