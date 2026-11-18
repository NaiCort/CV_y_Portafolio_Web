import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, button, dialog, close } from "./restaurant-browser.mjs"

const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("main h1").waitFor()
}
// axe mide colores reales: se espera a que terminen fundidos y transiciones. Las animaciones
// ligadas al desplazamiento (la foto de Xalapa) no terminan nunca y no cambian colores.
const audit = async (page) => {
  await page.waitForFunction(() =>
    document
      .querySelector(".despacho-root")
      .getAnimations({ subtree: true })
      .every((a) => a.playState !== "running" || !(a.timeline instanceof DocumentTimeline)),
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
        for (const path of [
          "/despacho",
          "/despacho/precios",
          "/despacho/diagnostico",
          "/despacho/calendario",
          "/despacho/calculadoras",
          "/despacho/expediente",
          "/despacho/servicios",
          "/despacho/regularizacion",
          "/despacho/guias",
          "/despacho/creditos",
        ]) {
          await go(page, base, path)
          assert.equal(await page.locator("h1").count(), 1, `Un h1 en ${path}`)
          assert.equal(await page.locator('a[href="#"], a[href^="tel:"]').count(), 0)
          await bounds(page)
          await audit(page)
        }
        await go(page, base, "/despacho")
        // Portada: libro mayor dibujado, panel de Xalapa y expediente sobre la consulta.
        assert(await page.locator(".d-portada canvas").evaluate((c) => c.width > 0))
        await page.locator(".d-panel-xalapa").scrollIntoViewIfNeeded()
        await page.waitForFunction(() => {
          const i = document.querySelector(".d-panel-xalapa img")
          return i.complete && i.naturalWidth > 0
        })
        await page.locator(".d-consulta .d-exp").scrollIntoViewIfNeeded()
        await bounds(page)
        await audit(page)
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
        await button(page.locator(".d-portada"), "Escribir por WhatsApp").click()
        await dialog(page).waitFor()
        await audit(page)
        await close(page)
        // Diagnóstico completo.
        await page
          .locator(".d-herr")
          .getByRole("link", { name: /Diagnóstico gratuito/ })
          .click()
        await page.locator(".d-opciones").waitFor()
        for (const r of [
          "Por mi cuenta: servicios u honorarios",
          "Menos de $1 millón",
          "No",
          "No estoy seguro",
          "No sé qué es",
        ]) {
          await page.locator(".d-opciones label", { hasText: r }).first().click()
          await page.locator(".d-diag button[type=submit]").click()
        }
        await page.locator(".d-diag-resultado").waitFor()
        assert.match(await page.locator(".d-diag-resultado h2").textContent(), /RESICO/)
        await bounds(page)
        await audit(page)
        // Calendario: cambiar de régimen y de mes.
        await go(page, base, "/despacho/calendario")
        await page.getByLabel("Tu régimen").selectOption("moral")
        await page.getByRole("button", { name: "Mes siguiente" }).click()
        assert((await page.locator(".d-cal-lista li").count()) > 0)
        await audit(page)
        // Calculadoras: las tres.
        await go(page, base, "/despacho/calculadoras")
        for (const c of ["Aguinaldo", "Finiquito", "ISR de RESICO"]) {
          await page.locator(".d-tabs").getByRole("button", { name: c }).click()
          await page.locator(".d-calc-total").waitFor()
          await bounds(page)
          await audit(page)
        }
        await go(page, base, "/despacho")
        // Tu expediente: abrir, aprobar, presentar, subir y ver un documento.
        await go(page, base, "/despacho/expediente")
        await page.getByRole("button", { name: "Abrir el expediente de ejemplo" }).click()
        await page.locator(".d-panel").waitFor()
        await bounds(page)
        await audit(page)
        await page.getByRole("button", { name: "Aprobar el previo" }).click()
        await page.getByRole("button", { name: "Simular la presentación" }).click()
        await page.locator(".d-documentos li", { hasText: "declaración de noviembre" }).waitFor()
        await page
          .locator(".d-solicitudes input[type=file]")
          .first()
          .setInputFiles({
            name: "estado.pdf",
            mimeType: "application/pdf",
            buffer: Buffer.from("x"),
          })
        await page.locator(".d-sol-hecha").first().waitFor()
        await page.getByRole("button", { name: "Ya lo confirmé" }).click()
        await page
          .getByRole("button", { name: /^Ver Acuse de la declaración de noviembre/ })
          .click()
        await dialog(page).waitFor()
        await audit(page)
        await close(page)
        await audit(page)
        // Recordatorio por WhatsApp: elegir, activar y ver el ejemplo.
        await page.getByRole("button", { name: "Elegir mis avisos" }).click()
        await page.getByRole("button", { name: "Activar el recordatorio" }).click()
        await page.locator(".d-wa-burbujas li").first().waitFor()
        await bounds(page)
        await audit(page)
        await page.getByRole("button", { name: "Reiniciar el ejemplo" }).click()
        await page.getByRole("button", { name: "Salir" }).click()
        await page.locator(".d-entrar").waitFor()
        await go(page, base, "/despacho")
        // Fotos ilustrativas cargadas y con su aviso.
        await page.locator(".d-retrato img").scrollIntoViewIfNeeded()
        await page.waitForFunction(() =>
          [...document.querySelectorAll(".d-retrato img, .d-sala img")].every(
            (i) => i.complete && i.naturalWidth > 0,
          ),
        )
        assert.match(await page.locator(".d-retrato figcaption").textContent(), /no es Elena/)
        // Guías: de la portada a una guía en particular.
        await page
          .locator(".d-guias")
          .getByRole("link", { name: /Si te llega una carta/ })
          .click()
        await page.waitForFunction(() => location.hash === "#requerimiento")
        await audit(page)
        // Regularización: el cálculo responde y lleva a cotizar con atrasadas.
        await go(page, base, "/despacho/regularizacion")
        await page.getByLabel("¿Cuántos meses te faltan?").fill("12")
        assert.match(await page.locator(".d-calc-total").textContent(), /\$5,400/)
        await page.getByRole("link", { name: "Cotizar mi regularización" }).click()
        await page.waitForURL(/atrasadas=1/)
        assert(await page.locator(".d-check input").isChecked())
        // Aviso de privacidad con borrado.
        await go(page, base, "/despacho")
        await page.locator(".d-pie").getByRole("button", { name: "Aviso de privacidad" }).click()
        await dialog(page).waitFor()
        await audit(page)
        await button(dialog(page), "Borrar mis datos de esta demo").click()
        await button(dialog(page), "Sí, borrar todo").click()
        await dialog(page).waitFor({ state: "detached" })
        assert.match(await page.locator(".d-aviso").textContent(), /Se borró/)
        // Menú o navegación, según el ancho: a la página de servicios y a uno en particular.
        if (width < 900) {
          await page.getByRole("button", { name: "Menú" }).click()
          await page.locator("#d-menu-movil").getByRole("link", { name: "Servicios" }).click()
          await page.locator("#d-menu-movil").waitFor({ state: "hidden" })
          assert((await page.locator(".d-barra-movil").isVisible()) === width < 640)
        } else {
          await page.locator(".d-nav").getByRole("link", { name: "Servicios" }).click()
        }
        await page.waitForURL(/\/despacho\/servicios$/)
        await page.locator(".d-indice").getByRole("link", { name: "Defensa ante el SAT" }).click()
        await page.waitForFunction(() => location.hash === "#defensa")
        await audit(page)
      },
    )
})
