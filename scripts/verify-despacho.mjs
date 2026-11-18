import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, button, dialog, close } from "./restaurant-browser.mjs"

const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("main h1").waitFor()
}
// axe mide colores reales: se espera a que terminen fundidos y transiciones.
const audit = async (page) => {
  await page.waitForFunction(() =>
    document
      .querySelector(".despacho-root")
      .getAnimations({ subtree: true })
      .every((a) => a.playState !== "running"),
  )
  await auditar(page)
}

await suite("despacho", async ({ run, base }) => {
  for (const width of [320, 390, 768, 1024, 1440])
    await run(
      `Recorrido de Cotejo · ${width}px`,
      {
        viewport: { width, height: 900 },
        ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: width === 1440 ? "no-preference" : "reduce",
      },
      async ({ page }) => {
        for (const path of ["/despacho", "/despacho/precios", "/despacho/creditos"]) {
          await go(page, base, path)
          assert.equal(await page.locator("h1").count(), 1, `Un h1 en ${path}`)
          assert.equal(await page.locator('a[href="#"], a[href^="tel:"]').count(), 0)
          await bounds(page)
          await audit(page)
        }
        await go(page, base, "/despacho")
        // Recibo por régimen.
        await page.locator(".d-regimenes label", { hasText: "Persona moral" }).click()
        assert.match(await page.locator(".d-recibo-precio").textContent(), /\$3,900/)
        await audit(page)
        // Expediente de ejemplo.
        await page.getByRole("button", { name: "Aprobar el previo de ejemplo" }).click()
        await page.getByRole("button", { name: "Deshacer" }).waitFor()
        await audit(page)
        // Cotizar lleva a la cotización con el régimen elegido.
        await page.locator(".d-recibo").getByRole("link", { name: "Cotizar mi caso" }).click()
        await page.waitForURL(/precios\?regimen=moral/)
        await page.locator("#d-empleados").fill("5")
        assert.match(await page.locator(".d-estimado").textContent(), /\$4,800/)
        await page.getByLabel("Nombre", { exact: true }).fill("Ana Ejemplo")
        await page.getByLabel("WhatsApp", { exact: true }).fill("2281112233")
        await page.getByRole("button", { name: "Pedir cotización" }).click()
        await page.locator(".d-cot-hecha").waitFor()
        await bounds(page)
        await audit(page)
        // WhatsApp simulado.
        await go(page, base, "/despacho")
        await button(page.locator(".d-heroe"), "Escribir por WhatsApp").click()
        await dialog(page).waitFor()
        await audit(page)
        await close(page)
        // Menú o navegación, según el ancho.
        if (width < 900) {
          await page.getByRole("button", { name: "Menú" }).click()
          await page.locator("#d-menu-movil").getByRole("link", { name: "Servicios" }).click()
          await page.locator("#d-menu-movil").waitFor({ state: "hidden" })
          assert((await page.locator(".d-barra-movil").isVisible()) === width < 640)
        } else {
          await page.locator(".d-nav").getByRole("link", { name: "Servicios" }).click()
        }
        await page.waitForFunction(() => location.hash === "#servicios")
      },
    )
})
