import assert from "node:assert/strict"
import { suite, audit as auditar, bounds, button, dialog, close } from "./restaurant-browser.mjs"

// Psicólogo, V4.10.2: los tres temas (Sala con luz, Neblina y Cuaderno) en cinco anchos. Recorre la
// agenda completa, «Respira conmigo», «Pedir información», el formulario, el menú del celular y el
// cambio de tema, con axe y sin desbordes horizontales.
const TEMAS = [
  ["sala", "Sala con luz"],
  ["neblina", "Neblina"],
  ["cuaderno", "Cuaderno"],
]

// axe mide colores reales: antes se marcan como vistas todas las entradas y se espera el fundido.
const audit = async (page) => {
  await page.evaluate(() =>
    document.querySelectorAll("[data-entra]").forEach((n) => n.classList.add("p-visto")),
  )
  await page.waitForFunction(() =>
    document
      .querySelector(".psi-raiz")
      .getAnimations({ subtree: true })
      .every((a) => a.playState !== "running"),
  )
  await page.waitForTimeout(320)
  await auditar(page)
}

await suite("psicologo", async ({ run, base }) => {
  for (const width of [320, 390, 768, 1024, 1440])
    for (const [tema, nombre] of TEMAS)
      await run(
        `${nombre} · ${width}px`,
        {
          viewport: { width, height: 900 },
          ...(width < 640 ? { isMobile: true, hasTouch: true } : {}),
          reducedMotion: width === 1440 ? "no-preference" : "reduce",
        },
        async ({ page }) => {
          await page.addInitScript((v) => {
            if (!sessionStorage.getItem("psi-prueba")) {
              localStorage.setItem("demo-psicologo-theme", v)
              sessionStorage.setItem("psi-prueba", "1")
            }
          }, tema)
          await page.goto(`${base}/psicologo`)
          await page.locator("main h1").waitFor()
          assert.equal(await page.locator("h1").count(), 1, "Un solo h1")
          assert.equal(await page.locator('a[href="#"]').count(), 0)
          assert(await page.locator(`.psi-${tema}`).count(), `Tema ${tema}`)
          assert.match(await page.title(), /Valeria Romero/)
          // Fotos servidas desde el sitio y cargadas.
          for (const img of await page.locator(".psi img").all()) {
            await img.scrollIntoViewIfNeeded()
            await img.evaluate((el) => el.decode())
            assert.match(await img.getAttribute("src"), /^\/psicologo\/fotos\/.+\.webp$/)
          }
          await bounds(page)
          await audit(page)

          // Agenda: portada -> llamada previa, con errores, horario, contacto y recordatorio.
          await page.evaluate(() => window.scrollTo(0, 0))
          await button(page.locator("#inicio"), "Agenda una llamada de 15 minutos").click()
          const d = dialog(page)
          await button(d, "Apartar el horario").click()
          assert.equal(await d.locator(".p-error").count(), 4, "Cuatro errores al enviar vacío")
          await d.locator(".p-dias button").first().click()
          await d.locator(".p-horas button:not([disabled])").first().click()
          await d.getByLabel("Tu nombre").fill("Ana")
          await d.getByLabel("Número de WhatsApp").fill("2281234567")
          await d.getByText("Leí el aviso de privacidad.").click()
          await audit(page)
          await button(d, "Apartar el horario").click()
          await d.locator(".p-resultado").waitFor()
          assert.match(await d.locator(".p-resultado").textContent(), /Ana/)
          await d.getByRole("button", { name: /Recuérdamelo por WhatsApp/ }).click()
          assert.match(await d.locator(".p-wa").textContent(), /llamada de 15 minutos/)
          await audit(page)
          await button(d, "Agendar otra").click()
          await d.locator(".p-opcion", { hasText: "Primera sesión" }).click()
          await button(d, "Continuar").click()
          await button(d, "En línea").click()
          await d.getByLabel("Tu zona horaria").selectOption("madrid")
          await d.locator(".p-dias button").first().click()
          assert.match(await d.locator(".p-horas").textContent(), /16:00/)
          await close(page)

          // Respira conmigo: empieza, cambia de fase y se detiene.
          const respira = page.locator(".p-respira")
          await respira.scrollIntoViewIfNeeded()
          await button(respira, "Empezar").click()
          await page.waitForTimeout(1100)
          assert.equal(
            await respira.locator(".p-respira-figura").getAttribute("data-fase"),
            "inhala",
          )
          await button(respira, "Detener").click()

          // Instituciones lleva al contacto con el tema elegido.
          await button(page.locator("#instituciones"), "Pedir información").click()
          assert.equal(
            await page.locator("#contacto select").inputValue(),
            "Escuela, empresa o colega",
          )
          const contacto = page.locator("#contacto")
          await contacto.getByLabel("Tu nombre").fill("Luis")
          await contacto.getByLabel("Número de WhatsApp").fill("228 123 4567")
          await contacto.locator(".p-check input").check()
          await button(contacto, "Enviar").click()
          await contacto.locator(".p-resultado").waitFor()
          await audit(page)
          await button(contacto, "Escribir otro mensaje").click()

          // WhatsApp simulado y aviso de privacidad.
          await button(contacto, "Escribir por WhatsApp").click()
          await dialog(page).waitFor()
          await close(page)
          await button(page.locator(".p-pie"), "Aviso de privacidad").click()
          assert.match(await dialog(page).textContent(), /ARCO/)
          await audit(page)
          await close(page)

          // Reseñas públicas simuladas: sin opiniones inventadas.
          await button(page.locator("#sobre-mi"), "Ver opiniones en el perfil público").click()
          assert.match(await dialog(page).textContent(), /no muestra opiniones inventadas/)
          await close(page)

          // Ayuda en crisis con teléfonos reales.
          assert(await page.locator('.p-crisis a[href="tel:8009112000"]').count())

          // Menú del celular.
          if (width < 1060) {
            await page.evaluate(() => window.scrollTo(0, 0))
            await page.locator(".p-menu-boton").click()
            assert.equal(await page.locator(".p-menu-movil a").count(), 5)
            await page.locator(".p-menu-movil a", { hasText: "Honorarios" }).click()
            assert(await page.locator(".p-menu-movil").isHidden())
          }

          // Cotizador con el identificador del tema.
          assert.equal(
            await page
              .getByRole("link", { name: "Cotiza un sitio como este" })
              .getAttribute("href"),
            `/cotizador?demo=psicologo-${tema}`,
          )
          await bounds(page)
        },
      )

  await run(
    "Cambio de tema y recuerdo",
    { viewport: { width: 1280, height: 900 } },
    async ({ page }) => {
      await page.goto(`${base}/psicologo`)
      await page.locator("main h1").waitFor()
      for (const [tema, nombre] of TEMAS) {
        await page.getByRole("button", { name: `Tema ${nombre}` }).click()
        await page.locator(`.psi-${tema}`).waitFor()
        assert.equal(await page.evaluate(() => localStorage.getItem("demo-psicologo-theme")), tema)
      }
      await page.reload()
      await page.locator(".psi-cuaderno").waitFor()
    },
  )
})
