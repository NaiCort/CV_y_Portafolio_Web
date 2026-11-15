# Estado de V4.4.5 · Brío, área de socio

15 de noviembre de 2026. Base: V4.4.4 en la rama `claude/great-edison-k9xun2`.

## Construido

- **Entrada `/gimnasio/socio`.** Formulario de correo y contraseña que solo acepta el perfil de ejemplo; «Usar el perfil de ejemplo» llena los datos. Con otros datos explica que en la demo solo existe ese perfil. Hay un momento de «Entrando…» antes del panel. La sesión se recuerda en el navegador y «Salir» la cierra.
- **Panel de Andrea** (perfil inventado, plan Club, sucursal base Centro):
  - Aviso de renovación con fecha y precio, cinco días antes del cargo, con enlace a la membresía.
  - Pase de entrada con el QR que cambia cada 30 s y «Simular entrada» por sucursal; el aviso dice que no hay torniquete.
  - Esta semana: minutos por día, visitas y meta; la entrada simulada de hoy suma a la barra del día.
  - Reloj: «Conectar reloj» abre un diálogo que explica qué se compartiría y que no se conecta nada; después muestra pasos, calorías activas y frecuencia en reposo de ejemplo, y se puede desconectar.
  - Pases de invitado: Acceso uno al mes, Club tres, Total uno en cada visita. Pide nombre y sucursal, genera un código `INV-####` y muestra el mensaje que se compartiría, sin enviar nada. Al llegar al límite lo dice.
  - Composición corporal: cuatro mediciones de ejemplo en una gráfica de músculo y grasa con su tabla, para lectores de pantalla y para ver las cifras.
  - Sus reservas, las mismas de la página de Clases, con «Reservar otra clase».
  - Membresía: congelar uno o dos meses por viaje o salud, reactivar, y cancelar en un solo paso sin penalización, como pide Profeco. Congelada o cancelada, el pase y el aviso de renovación cambian.
  - Tras conectar el reloj o cambiar la membresía, el foco pasa al título de esa tarjeta, porque el botón usado desaparece.
- **Aviso de privacidad de Brío**, en el pie de todas las páginas: qué guarda la demo en el navegador, que no pide datos de salud al visitante, qué haría un gimnasio real con datos sensibles (consentimiento expreso por escrito), y «Borrar mis datos de esta demo», con confirmación, que vacía reservas, sesión, tema y preferencia de videos.
- **Cabecera:** «Entrar» o «Mi perfil» según la sesión. La vista previa del área de socio en Inicio enlaza al área.
- **Videos de Combate y Ciclo**, como el de Fuerza: tramos cortos y limpios, recortados, en blanco y negro, en bucle de ida y vuelta y sin audio.
  - Combate: 2.2 s de «Airmen trains for Rumble in the Deid IV» (Senior Airman Violette Hosack, Fuerza Aérea de EE. UU., dominio público). 4.4 s, 324 kB.
  - Ciclo: 2.6 s de «Kiwanis Spinning Event haalt 10.000 euro op voor Leontienhuis» (RN7, CC BY 3.0), recortado para quitar logotipos. 5.2 s, 380 kB.
  - Cada video tiene su póster (un cuadro del mismo video) en 1280 y 640 px. Las fotos anteriores de Combate y Ciclo se retiraron. Origen, licencia, cambios y SHA-256 en `public/gimnasio/medios-origen.json` y en Créditos.

## Sigue pendiente

Medios de Movilidad y Ritmo (no se encontraron todavía con licencia libre). Coaches y tienda (V4.4.6) y cierre (V4.4.7).

## Qué revisar en la vista previa

1. «Entrar» en la cabecera; probar un correo cualquiera y luego «Usar el perfil de ejemplo».
2. Simular una entrada, conectar el reloj y generar pases de invitado hasta el límite.
3. Congelar, reactivar y cancelar; recargar la página y ver que se recuerda.
4. «Aviso de privacidad» en el pie y «Borrar mis datos de esta demo».
5. En Inicio, las tarjetas de Combate y Ciclo en video.
