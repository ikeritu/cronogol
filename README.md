# CronoGol v1.10.3 — Stability Hotfix

## Objetivo

Mejorar la sensación de juego sin modificar las reglas ni la lógica base.

## Cambios aplicados

- Añadida descripción visible de dificultad de máquina.
- Añadido mensaje emocional al final del partido.
- Añadido mensaje emocional al resultado compartido.
- Añadidos estilos para el mensaje emocional.
- Se mantiene descartada la ayuda opcional para modo clásico largo.

## Mensajes de dificultad

- Fácil: máquina torpe, ideal para aprender.
- Normal: partida equilibrada.
- Difícil: más precisión y más peligro en jugadas especiales.

## Ejemplos de mensajes finales

- Partido ajustadísimo.
- Festival ofensivo.
- Drama total desde los once metros.
- Partido de porteros.
- Victoria contundente.
- La máquina no perdona.

## No se ha tocado

- Reglas del modo clásico.
- Ayuda para modo clásico largo.
- START/STOP.
- Turnos.
- Máquina.
- Modo rápido.
- Penalti/falta.
- Historial.
- Estadísticas.
- Bizum/PayPal.

## QA recomendado

1. Elegir 1 vs Máquina.
2. Cambiar dificultad y comprobar texto descriptivo.
3. Terminar una partida.
4. Confirmar mensaje emocional en el final.
5. Compartir resultado y comprobar que incluye la frase emocional.
6. Confirmar que reglas y turnos siguen igual.


## Analítica

Se ha añadido Cloudflare Web Analytics para medir visitas básicas y rendimiento de la web.

Snippet añadido en las páginas HTML:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7ee638b73aa24300b417a555e67fd1ae"}'></script>
<!-- End Cloudflare Web Analytics -->
```

Permite revisar en Cloudflare métricas como visitas, páginas vistas, visitantes aproximados, origen, dispositivo, navegador y rendimiento básico.


## Derechos de autor

© 2026 CronoGol. Juego original creado por Iker Ituarte.

El código, textos, diseño visual, reglas redactadas, logotipo y materiales gráficos de este proyecto pertenecen a su autor, salvo que se indique lo contrario.

No está permitido copiar, redistribuir, publicar, modificar o explotar este proyecto sin autorización previa.


## v1.9.9

Esta versión parte de `v1.9.8 Game Feel Improvements` y añade únicamente:

- Cloudflare Web Analytics.
- URL oficial `https://cronogol.es/`.
- Archivo `CNAME`.
- Footer de derechos de autor.
- Sección de derechos de autor en README.
- Actualización documental.

No se modifica la lógica del juego.


## v1.9.10 — Home UI Polish

Esta versión parte de `v1.9.9 Analytics sobre v1.9.8` y aplica una mejora visual controlada en la pantalla inicial.

Cambios:

- El LCD inicial deja de repetir visualmente `CronoGol` y pasa a comunicar mejor la mecánica.
- El botón `EMPEZAR PARTIDO` pasa a naranja/dorado para diferenciarlo del rojo de STOP/peligro.
- Los bloques secundarios de la home bajan peso visual.
- Se corrige la duplicación técnica de `data-i18n` en `ÚLTIMA TIRADA` si estaba presente.
- Se mantiene Cloudflare Web Analytics.
- Se mantiene dominio `https://cronogol.es/`.
- Se mantiene footer y sección de derechos de autor.

No se modifica la lógica del juego.


## v1.10.0 — CSS Refactor

Esta versión parte de `v1.9.10 Home UI Polish`.

Objetivo:

- Limpiar el CSS acumulado.
- Reducir ruido histórico de versiones anteriores.
- Mantener diseño y lógica sin cambios.
- Preparar el proyecto para futuras mejoras con menor riesgo.

Cambios:

- Limpieza conservadora de `style.css`.
- Eliminación de comentarios históricos acumulados.
- Encabezado técnico único con mapa funcional del CSS.
- Normalización básica de espaciado.
- Creación de `CSS_AUDIT_v1_10_0.md`.
- Actualización de `README`, `CHANGELOG`, `VERSION` y manifest.

No se ha tocado:

- Lógica del juego.
- Reglas.
- Turnos.
- Máquina.
- Penalti/falta.
- Estadísticas.
- Historial.
- Listeners principales.
- Cloudflare Web Analytics.
- Dominio personalizado.


## v1.10.1 — Game Event Tracking

Esta versión parte de `v1.10.0 CSS Refactor`.

Objetivo: medir acciones importantes dentro del juego, no solo visitas de página.

Eventos añadidos:

- `app_loaded`
- `start_match`
- `finish_match`
- `share_result`
- `share_home`
- `copy_result`
- `copy_link`
- `rules_open`
- `support_open`
- `feedback_open`
- `mode_machine`
- `mode_local`
- `mode_fast`
- `mode_classic`

Funcionamiento:

- Si Cloudflare Zaraz está disponible, se usa `zaraz.track(eventName, payload)`.
- Si Zaraz no está disponible, la web no se rompe: se guardan contadores locales en `localStorage` y se muestran en consola para pruebas.
- Cloudflare Web Analytics básico sigue midiendo visitas y rendimiento.

Para ver eventos personalizados en Cloudflare, hay que activar/configurar Zaraz o una herramienta compatible con eventos personalizados.

No se ha tocado la lógica del juego.


## v1.10.2 — Direct GA4 Event Bridge

Esta versión parte de `v1.10.1 Game Event Tracking`.

GA4 ya recibía visitas mediante Zaraz, pero los eventos personalizados del juego no aparecían todavía en tiempo real.

Cambios:

- Se mantiene el envío a `zaraz.track()`.
- Se añade envío directo a `gtag("event", eventName, payload)` si `gtag` está disponible.
- Se añade `dataLayer.push({ event: eventName, ... })` como puente adicional.
- No se duplica `page_view`, porque solo se envían eventos personalizados.
- Se mantiene fallback a `localStorage` y `console.debug`.

Eventos esperados en GA4:

- `app_loaded`
- `start_match`
- `finish_match`
- `share_result`
- `share_home`
- `copy_result`
- `copy_link`
- `rules_open`
- `support_open`
- `feedback_open`
- `mode_machine`
- `mode_local`
- `mode_fast`
- `mode_classic`

No se ha tocado la lógica del juego.


## v1.10.3 — Stability Hotfix

Esta versión parte de `v1.10.2 Direct GA4 Event Bridge`.

Objetivo:

Corregir riesgos de estabilidad detectados en auditoría, sin cambiar reglas ni diseño.

Cambios:

- Capa defensiva para controlar timeouts de la máquina.
- Limpieza de timeouts al volver al setup, reiniciar o iniciar nueva partida.
- Protección del debug oculto en producción.
- Refuerzo del tracking directo en botones clave.
- Añadido `type="button"` a botones HTML sin tipo.
- Actualización documental.

No se ha tocado:

- Reglas del juego.
- Sistema de turnos.
- Marcador.
- Penalti/falta.
- Estadísticas.
- Historial.
- CSS principal.
- Diseño visual.

QA recomendado:

1. 1 vs Máquina → esperar turno de máquina → reiniciar.
2. 1 vs Máquina → volver a setup → iniciar nueva partida.
3. Rápido → empezar → reiniciar.
4. Abrir reglas/apoya/feedback.
5. Probar eventos en consola y GA4.
6. Probar en móvil.
