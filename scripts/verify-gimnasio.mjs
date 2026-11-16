import assert from "node:assert/strict"
import { suite, audit, bounds, button, dialog } from "./restaurant-browser.mjs"

const guardado = (page, clave) => page.evaluate((k) => JSON.parse(localStorage.getItem(k)), clave)
const go = async (page, base, path) => {
  await page.goto(`${base}${path}`)
  await page.locator("main h1").waitFor()
}
// Navega con el menú visible a ese ancho: la barra en escritorio o «Menú» en teléfono y tableta.
const navegar = async (page, nombre) => {
  const barra = page.locator(".b-header .b-nav")
  if (await barra.isVisible()) await barra.getByRole("link", { name: nombre, exact: true }).click()
  else {
    await page.locator(".b-btn-menu").click()
    await page.locator("#b-menu-movil").getByRole("link", { name: nombre, exact: true }).click()
  }
  await page.locator("main h1").waitFor()
  await page.locator("#b-menu-movil").waitFor({ state: "hidden" })
}

await suite("gimnasio", async ({ run, base }) => {
  for (const width of [320, 390, 768, 1024, 1440])
    await run(
      `Recorrido completo de Brío · ${width}px`,
      {
        viewport: { width, height: 900 },
        ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: width === 1440 ? "no-preference" : "reduce",
      },
      async ({ page }) => {
        for (const path of [
          "/gimnasio",
          "/gimnasio/clases",
          "/gimnasio/planes",
          "/gimnasio/alta",
          "/gimnasio/socio",
          "/gimnasio/coaches",
          "/gimnasio/tienda",
          "/gimnasio/tienda/guantes",
          "/gimnasio/carrito",
          "/gimnasio/primera-visita",
          "/gimnasio/creditos",
        ]) {
          await go(page, base, path)
          assert.equal(await page.locator("h1").count(), 1, `Un h1 en ${path}`)
          await bounds(page)
          await audit(page)
        }

        // Inicio: las tarjetas de clase son el enlace; el video corre solo al activarlas.
        await go(page, base, "/gimnasio")
        const tarjeta = page.locator("#clases a.b-clase-tarjeta").first()
        await tarjeta.scrollIntoViewIfNeeded()
        assert.equal(await page.locator("#clases video").count(), 0, "Ningún video al cargar")
        if (width === 1440) {
          await tarjeta.hover()
          await page.waitForFunction(() => {
            const v = document.querySelector("#clases .b-clase-tarjeta.is-activa video")
            return v && !v.paused && v.currentTime > 0.3
          })
          await page.mouse.move(2, 2)
          await page.waitForFunction(() => document.querySelector("#clases video")?.paused)
        } else if (width < 640) {
          await tarjeta.tap()
          assert.match(await tarjeta.getAttribute("class"), /is-activa/, "El primer toque activa")
          assert.equal(new URL(page.url()).pathname, "/gimnasio", "El primer toque no navega")
          await tarjeta.tap()
          await page.waitForURL(/\/gimnasio\/clases/)
        }

        // Primera visita: horas tranquilas de las cinco sucursales.
        await go(page, base, "/gimnasio/primera-visita")
        assert.equal(await page.locator(".b-tabla-tranquilas tbody tr").count(), 5)

        // Clases: filtro por nivel, reservar un lugar y agregarlo al calendario.
        await go(page, base, "/gimnasio/clases")
        await page.locator(".b-chip", { hasText: "Para empezar" }).click()
        for (const s of await page.locator(".b-sesiones strong").allTextContents())
          assert(["Movilidad", "Ritmo"].includes(s), `Nivel para empezar: ${s}`)
        await page.locator(".b-chip", { hasText: "Todos" }).first().click()
        const dias = page.locator(".b-chips").first().locator("label")
        let d = 0
        while (!(await page.locator(".b-sesiones .b-btn-p").count())) await dias.nth(++d).click()
        await page.locator(".b-sesiones .b-btn-p").first().click()
        const libre = dialog(page).locator(".b-lugares-rejilla label:not(.is-ocupado)").first()
        if (await libre.count()) await libre.click()
        await dialog(page).locator("input[name=nombre]").fill("Luis")
        await bounds(page)
        await audit(page)
        await dialog(page).locator("button[type=submit]").click()
        await dialog(page).locator(".b-reserva-hecha").waitFor()
        assert.match(await dialog(page).textContent(), /Qué traer/)
        const [ics] = await Promise.all([
          page.waitForEvent("download"),
          button(dialog(page), "Agregar a mi calendario").click(),
        ])
        assert.match(ics.suggestedFilename(), /^brio-BR-\d+\.ics$/)
        await button(dialog(page), "Cerrar").click()
        assert.equal(
          (await guardado(page, "brio-reservas-v1")).reservas.length,
          1,
          "Reserva guardada",
        )

        // Planes y alta: errores, firma y confirmación sin guardar nada.
        await navegar(page, "Planes")
        await page.getByRole("link", { name: "Elegir Club" }).first().click()
        await page.locator('input[name="plan"]:checked').waitFor()
        await button(page, "Continuar").click()
        await button(page, "Continuar").click()
        assert.equal(await page.locator(".b-error").count(), 3, "Tres errores en la cuenta")
        await page.fill("#b-alta-nombre", "Ana López")
        await page.fill("#b-alta-correo", "ana@ejemplo.com")
        await page.fill("#b-alta-telefono", "2281234567")
        await button(page, "Continuar").click()
        await button(page, "Entendido, continuar").click()
        await page.check("#b-alta-acepta")
        await page.fill("#b-alta-firma", "ana lopez")
        await button(page, "Continuar").click()
        await button(page, "Confirmar alta").click()
        await page.locator(".b-alta-hecha").waitFor()
        await audit(page)

        // Área de socio: entrar, reloj y congelar.
        await go(page, base, "/gimnasio/socio")
        await button(page, "Usar el perfil de ejemplo").click()
        await button(page, "Entrar").click()
        await page.locator(".b-area-cabeza h1").waitFor()
        await button(page, "Conectar reloj").click()
        await button(dialog(page), "Conectar (simulado)").click()
        await page.locator(".b-reloj-datos").waitFor()
        await button(page, "Congelar").click()
        await page.getByRole("button", { name: /Congelar 1 mes/ }).click()
        assert.match(await page.locator(".b-membresia dl").textContent(), /Congelada/)
        await bounds(page)
        await audit(page)

        // Coaches: evaluación gratuita y paquete al carrito.
        await navegar(page, "Coaches")
        await button(page, "Evaluación con Rafa").click()
        await dialog(page).locator('input[name="eva-dia"]').nth(1).check({ force: true })
        await dialog(page)
          .locator('input[name="eva-hora"]:not([disabled])')
          .first()
          .check({ force: true })
        await dialog(page).locator("#b-eva-nombre").fill("Luis")
        await button(dialog(page), "Agendar evaluación").click()
        await dialog(page).locator(".b-reserva-hecha").waitFor()
        await audit(page)
        await button(dialog(page), "Listo").click()
        assert.equal((await guardado(page, "brio-evaluacion-v1")).coach, "rafa")
        await page.getByRole("button", { name: /Paquete de 4 sesiones/ }).click()

        // Tienda: producto con variante, carrito con precio de socio y pedido apartado.
        await navegar(page, "Tienda")
        await page.locator('a[href="/gimnasio/tienda/proteina"]').click()
        await page.locator(".b-chip", { hasText: "Chocolate" }).click()
        await button(page, "Agregar al carrito").click()
        await page.locator(".b-agregado a").click()
        await page.locator(".b-lineas").waitFor()
        assert.match(await page.locator(".b-cuentas").textContent(), /Precio de socio/)
        await page.selectOption("#b-carrito-sucursal", "natura")
        await page.getByRole("button", { name: /Apartar pedido/ }).click()
        await page.locator(".b-pedido-hecho").waitFor()
        await bounds(page)
        await audit(page)
        const tienda = await guardado(page, "brio-tienda-v1")
        assert.equal(tienda.carrito.length, 0)
        assert.equal(tienda.pedidos[0].lineas.length, 2, "Paquete y proteína en el pedido")

        // Tema Distrito y aviso de privacidad: borrar todo.
        await button(page, "Tema Distrito").click()
        // La franja clara de planes no debe mover el contenido ni desbordar (error del 16/11).
        for (const ruta of ["/gimnasio/planes", "/gimnasio"]) {
          await go(page, base, ruta)
          await page.locator(".b-planes").scrollIntoViewIfNeeded()
          await bounds(page)
          const [logo, planes] = await page.evaluate(() =>
            [".b-logo", ".b-planes h1, .b-planes h2"].map(
              (s) => document.querySelector(s).getBoundingClientRect().left,
            ),
          )
          assert(Math.abs(logo - planes) < 2, `Planes alineado en Distrito (${ruta})`)
        }
        await go(page, base, "/gimnasio/carrito")
        await page.locator("footer").getByRole("button", { name: "Aviso de privacidad" }).click()
        await audit(page)
        await button(dialog(page), "Borrar mis datos de esta demo").click()
        await button(dialog(page), "Sí, borrar todo").click()
        assert.equal(await guardado(page, "brio-evaluacion-v1"), null)
        assert.deepEqual((await guardado(page, "brio-tienda-v1"))?.pedidos ?? [], [])

        await page.goto(`${base}/`)
        assert.equal(
          await page.locator('a[href="/gimnasio"]').count(),
          1,
          "La Bienvenida enlaza Gimnasio",
        )
        return { width }
      },
    )
})
