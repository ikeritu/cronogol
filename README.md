# CronoGol v1.10.9 — Haptics Tuning

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


## v1.10.2 — Stability Rollback

Esta versión parte de `v1.10.0 CSS Refactor`, última versión estable confirmada antes de añadir la capa de eventos de juego.

Motivo:

- Se detectó bloqueo de la web durante partida tras la versión con tracking de eventos.
- Se retira la capa `Game Event Tracking` de `v1.10.1`.
- Se mantiene Cloudflare Web Analytics básico.
- Se mantiene dominio `https://cronogol.es/`.
- Se mantiene CSS refactor.
- Se mantiene copyright/footer.

No se toca la lógica del juego.


## v1.10.3 — Goal & Penalty Feedback

Esta versión parte de `v1.10.2 Stability Rollback`.

Objetivo:

- Añadir feedback audiovisual de gol, penalti, falta, tarjetas y palos sin reintroducir tracking de eventos.
- Mantener la estabilidad recuperada en `v1.10.2`.

Cambios:

- Sonido de gol más reconocible.
- Sonido de penalti/falta más claro.
- Sonido de penalti fallado.
- Flash visual en gol y eventos especiales.
- Vibración visual del dispositivo en poste/larguero.
- Respeta `prefers-reduced-motion`.
- No se reintroduce Zaraz ni Game Event Tracking.

No se toca la lógica del juego.


## v1.10.4 — Machine Special Lock Fix

Esta versión parte de `v1.10.3 Goal & Penalty Feedback`.

Objetivo:

- Corregir el bloqueo del botón START/STOP cuando la máquina obtiene penalti o falta.
- Evitar desbloqueos incondicionales después de tiradas automáticas de la máquina.
- Guardar y cancelar correctamente los timeouts de la máquina.
- Añadir una función central `syncActionControls()` para mantener coherente el estado de los controles.

Cambios:

- `maybeMachineTurn()` ya no reactiva controles si `pendingSpecial` queda activo.
- `maybeMachineSpecialTurn()` ya no reactiva controles de forma incondicional.
- Los timeouts de máquina se almacenan en `machineTurnTimeout`, `machineStopTimeout`, `machineSpecialTurnTimeout` y `machineSpecialStopTimeout`.
- Se añaden guardas de pantalla activa, final de partido, tanda de penaltis y turno real.
- Se mantiene sonido/feedback visual de v1.10.3.
- No se reintroduce Zaraz ni tracking de eventos.

No se cambian reglas ni comportamiento de marcador.


## v1.10.5 — Machine Special Autoshot Fix

Esta versión parte de `v1.10.4 Machine Special Lock Fix`.

Motivo:

- `v1.10.4` bloqueaba correctamente el botón START/STOP cuando la máquina obtenía penalti/falta.
- Pero la máquina no ejecutaba la tirada especial porque `maybeMachineSpecialTurn()` llamaba a una función inexistente (`startSpecialTimer()`).

Corrección:

- La tirada especial automática de la máquina usa el cronómetro real existente: `startTimer()` y `stopTimer()`.
- El botón sigue bloqueado para el usuario.
- La máquina ejecuta el disparo especial por código.
- Se mantiene `syncActionControls()` después de la tirada.
- No se reintroduce Zaraz ni tracking de eventos.

No se cambian reglas ni marcador.


## v1.10.6 — Machine Special Flow Fix

Esta versión corrige de forma completa el flujo automático de penalti/falta de la máquina.

Corrige los 6 errores detectados:

1. Crea `getMachineSpecialForcedValue()`.
2. Crea `getMachineSpecialStopDelay()`.
3. Rehace `maybeMachineSpecialTurn()` sin depender de botones ni de `startTimer()/stopTimer()`.
4. Evita desbloqueos manuales peligrosos en `evaluateSpecialThrow()`.
5. Mantiene `syncActionControls()` como autoridad del estado de botones.
6. Añade estado visual durante la especial de máquina: `MÁQUINA...` y `DISPARO`.

No se reintroduce Zaraz ni tracking de eventos.

No se cambian reglas ni marcador.


## v1.10.7 — Machine Special Direct Resolve

Esta versión corrige de forma más robusta el penalti/falta de la máquina.

Motivo:

- En versiones anteriores la máquina podía quedarse con el panel especial visible y los botones en STOP/STOP ESPECIAL sin resolver.
- El problema era que la especial seguía acoplada al flujo de botones/cronómetro manual.

Corrección:

- Nueva función `resolveMachineSpecialDirectly()`.
- La máquina resuelve penalti/falta sin depender de `START`, `STOP`, `TIRADA ESPECIAL` ni de botones habilitados.
- `applyNormalResult()` programa la especial de máquina solo después de `updateUI()` y `syncActionControls()`.
- `evaluateSpecialThrow()` centraliza el cierre de panel especial, cambio de turno y limpieza visual.
- Se restaura visualmente el botón principal con `resetMainTimerVisualState()`.
- No se reintroduce Zaraz ni tracking de eventos.

No se cambian reglas ni marcador.


## v1.10.7_ESTABLE_MACHINE_SPECIAL_OK

Versión congelada como estable tras confirmar el arreglo del flujo de penalti/falta de la máquina.

Confirmado:

- Botones humanos bloqueados durante turno especial de máquina.
- Máquina ejecuta automáticamente penalti/falta.
- El botón principal no queda atascado en STOP.
- El turno continúa correctamente.
- Sin Zaraz/event tracking.
- Cloudflare Web Analytics básico se mantiene.

Esta versión debe usarse como base para futuras modificaciones.


## v1.10.8 — Sound & Haptics Polish

Esta versión parte de `v1.10.7_ESTABLE_MACHINE_SPECIAL_OK`.

Objetivo:

- Mejorar la sensación de juego sin tocar reglas ni lógica de máquina.
- Hacer más reconocibles los sonidos de gol, penalti, falta, palos, tarjetas y final.
- Añadir vibraciones físicas más diferenciadas en móviles compatibles.
- Mejorar la vibración visual de pantalla/dispositivo.

Cambios:

- Nuevo sistema semántico `haptic(type)`.
- Sonidos más diferenciados para:
  - gol,
  - penalti,
  - penalti fallado,
  - falta,
  - poste/larguero,
  - amarilla/roja,
  - descanso/final.
- Feedback de tanda de penaltis con sonido, vibración y flash.
- Animaciones visuales ligeras para gol, penalti/falta y roja.
- Respeta `prefers-reduced-motion`.
- No se reintroduce Zaraz ni tracking de eventos.

No se toca:

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta de máquina.
- Historial.
- Estadísticas.


## v1.10.9 — Haptics Tuning

Esta versión parte de `v1.10.8 Sound & Haptics Polish`.

Ajuste solicitado:

- La vibración física queda limitada a dos casos:
  - gol: vibración más fuerte;
  - penalti fallado: vibración leve.
- El resto de eventos mantienen sonido y feedback visual, pero no vibración física.

No se toca:

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Historial.
- Estadísticas.
- Sonidos.
- Zaraz/tracking de eventos.
