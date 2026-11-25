import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, button } from "./restaurant-browser.mjs"

// CV web y portafolio (V4.8) y cotizador (V4.9).
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
        // V4.8.6: la portada llega prerenderizada; las demás rutas, vacías; sin errores al hidratar.
        const errores = []
        page.on("pageerror", (e) => errores.push(e.message))
        const portada = await (await page.request.get(`${base}/`)).text()
        assert(portada.includes("Ian Habid Aldana Martínez</h1>"), "CV en el HTML inicial")
        assert(portada.includes("application/ld+json"), "Datos estructurados")
        assert(portada.includes('rel="canonical"'), "URL canónica")
        const demo = await (await page.request.get(`${base}/cafe`)).text()
        assert(demo.includes('<div id="root"></div>'), "Las demos llegan vacías")
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
          await page.locator('[aria-labelledby="cv-certificaciones"]').waitFor()
          // Índice: marca la sección elegida, también la última (que no llega arriba).
          for (const id of ["cv-certificaciones", "cv-educacion", "cv-certificaciones"]) {
            await page.locator(`.cv-indice a[href="#${id}"]`).click()
            await page.waitForTimeout(1500)
            assert.equal(
              await page.locator(".cv-indice a[aria-current]").getAttribute("href"),
              `#${id}`,
              `Índice en ${id}`,
            )
          }
          await page.locator("main").evaluate((m) => m.scrollTo(0, 0))
          await page.waitForFunction(
            () =>
              document.querySelector(".cv-indice a[aria-current]")?.getAttribute("href") ===
              "#cv-resumen",
          )
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
          await button(page, "Demos").click()
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

        // V4.9: cotizador. Desde una variante, con la nota y el total; quitar, deshacer y enviar.
        await go(page, base, "/cotizador?demo=brio-distrito&moneda=MXN")
        await page.getByText("Brío (Distrito)").first().waitFor()
        assert.equal(await page.locator("h1").count(), 1)
        await bounds(page)
        await audit(page)
        const total = () => page.locator(".cot-total-cifra").textContent()
        const barra = page.locator(".cot-barra")
        assert.equal(await barra.isVisible(), !escritorio, "Barra del total solo en el celular")
        const antes = await total()
        await page.getByLabel("Reservas con disponibilidad").click()
        await page.locator(".cot-aviso").getByText("Quitaste").waitFor()
        assert.notEqual(await total(), antes, "El total cambia al quitar")
        await page.getByRole("button", { name: "Deshacer" }).click()
        assert.equal(await total(), antes, "Deshacer devuelve el total")
        if (!escritorio) {
          await barra.getByRole("button", { name: "Ver detalle" }).click()
          await page.locator(".cot-der.abierta .cot-total-cifra").waitFor()
          await bounds(page)
          await audit(page)
          await page.getByRole("button", { name: "Cerrar detalle" }).click()
        }
        await go(page, base, "/cotizador?demo=ladera&moneda=MXN&paso=envia")
        await audit(page)
        await page.locator("#cot-nombre").fill("Prueba")
        // La red del entorno no llega a WhatsApp: se captura la dirección en vez de abrirla.
        await page.evaluate(() => {
          window.__abiertas = []
          window.open = (url) => window.__abiertas.push(url) && null
        })
        await page.getByRole("button", { name: "Enviar por WhatsApp" }).click()
        const abierta = await page.evaluate(() => window.__abiertas[0])
        assert.match(
          decodeURIComponent(abierta),
          /^https:\/\/wa\.me\/.*cotización C-\d{6}-/s,
          "Folio",
        )
        await page.locator(".cot-listo").waitFor()
        await go(page, base, "/cotizador")
        await audit(page)
        // Regresar desde una demo de ejemplo vuelve a «Elige tipo», a la misma altura (V4.9.0).
        const ejemplo = page.locator(".cot-tipo").nth(2)
        const verEjemplo = ejemplo.getByRole("link", { name: "Ver un ejemplo" })
        await verEjemplo.scrollIntoViewIfNeeded()
        const altura = await page.evaluate(() => Math.round(scrollY))
        await verEjemplo.click()
        await page.waitForURL(/\/restaurante/)
        await page.goBack()
        await page.getByRole("heading", { level: 1, name: "Cotiza tu sitio" }).waitFor()
        await page.waitForFunction((y) => Math.abs(scrollY - y) < 4, altura)
        // Cada paso es una entrada del historial.
        await page.locator(".cot-tipo").nth(1).getByRole("button").click()
        await page.getByRole("heading", { level: 1, name: "Tu landing" }).waitFor()
        await page.goBack()
        await page.getByRole("heading", { level: 1, name: "Cotiza tu sitio" }).waitFor()
        // V4.9.1: en la demo de ejemplo, el botón flotante regresa al cotizador.
        await page.locator(".cot-tipo").nth(2).getByRole("link", { name: "Ver un ejemplo" }).click()
        await page.waitForURL(/\/restaurante/)
        const volver = page.locator(".volver-cot button")
        await volver.waitFor()
        await bounds(page)
        if (width < 640) await volver.click()
        await volver.click()
        await page.getByRole("heading", { level: 1, name: "Cotiza tu sitio" }).waitFor()
        await page.goto(`${base}/restaurante`)
        await page.locator("h1").first().waitFor()
        assert.equal(await page.locator(".volver-cot").count(), 0, "Sin botón con enlace directo")
        await go(page, base, "/cotizador")
        await page.getByRole("link", { name: "Ian Aldana · CV y demos" }).click()
        await page.locator(".cv-nombre").waitFor()
        // V4.10.3: aviso de privacidad del sitio, enlazado desde el CV y el cotizador.
        await page.goto(`${base}/privacidad`)
        await page.getByRole("heading", { level: 1, name: "Aviso de privacidad" }).waitFor()
        assert.match(await page.title(), /Aviso de privacidad/)
        assert.match(await page.locator("main").textContent(), /ARCO/)
        await bounds(page)
        await audit(page)
        await page.getByRole("link", { name: "Volver al CV y portafolio" }).click()
        await page.locator(".cv-nombre").waitFor()
        assert.equal(await page.locator('a[href="/privacidad"]').count(), 1, "Enlace en el CV")
        assert.deepEqual(errores, [], "Sin errores de hidratación")
        return { width }
      },
    )
})
