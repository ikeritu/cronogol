# CronoGol v2.1.1 — Lobby Guardrails



## v2.1.1 — Lobby Guardrails

Pulido del lobby privado:

- Impide que el anfitrión se una a su propia sala desde el mismo dispositivo.
- Si el invitado usa el mismo nombre que el anfitrión, pide cambiar nombre.
- Si una sala ya tiene invitado distinto, bloquea una segunda unión.
- Si ya hay una sala activa como anfitrión, pregunta antes de crear otra.
- Mejora los mensajes: compartir código, sala lista, rival conectado.
- No cambia la lógica del partido local ni sincroniza todavía el partido completo.

## v2.0.1 — Supabase Private Rooms Draft

Esta versión configura Supabase como backend inicial de salas privadas.

Incluye:
- URL de Supabase configurada.
- anon/publishable key pública configurada.
- Creación de salas en la tabla `cronogol_rooms`.
- Unión a sala mediante input integrado, sin `prompt()` nativo del navegador.
- Archivo SQL `SUPABASE_SCHEMA_v2_0_1.sql`.
- El juego local continúa intacto.
- La sincronización completa de partido aún no está activada.

Primer paso tras subir:
1. Abrir Supabase → SQL Editor.
2. Ejecutar `SUPABASE_SCHEMA_v2_0_1.sql`.
3. Subir esta versión a GitHub Pages.
4. Probar `Crear sala`.
5. Probar `Unirse` con ese código en otro navegador o pestaña.

## v2.0.0 — Online Foundation

Primera versión de la rama V2. Esta versión no activa todavía partidas online reales; prepara una base segura para salas privadas sin romper la V1 estable.

Incluye:

- nuevo módulo `online-foundation.js`;
- modelo inicial de borrador de sala;
- normalización y validación de códigos de sala;
- snapshot serializable del estado de partido para futura sincronización;
- panel V2 online en la pantalla inicial;
- botones de crear/unirse en modo local seguro, sin backend;
- actualización de versión/cache a `v2.0.0`.

No incluye todavía:

- Supabase conectado;
- sincronización real entre dispositivos;
- login;
- ranking público;
- monetización nueva.

La base jugable local de `v1.12.3` queda intacta.

## v1.12.3 — Stats UI Final Polish

Pulido final de la interfaz del panel de estadísticas locales. No modifica reglas, lógica del juego, sonidos, online ni analítica.

## v1.12.3 — Fast Rules & Stats Polish

Versión de cierre evolutivo de V1 centrada en rejugabilidad local sin tocar el núcleo del juego.

### Cambios principales

- Añadido panel de estadísticas locales en la pantalla inicial.
- Añadido historial de las últimas partidas guardado en este dispositivo.
- Añadido resumen acumulado al final del partido.
- Añadida opción para borrar estadísticas locales.
- Persistencia mediante `localStorage`, sin backend, sin login y sin analítica nueva.

### Seguridad de la versión

- No cambia reglas de juego.
- No cambia modo clásico ni modo rápido.
- No cambia máquina.
- No reintroduce tracking avanzado ni Zaraz.
- Mantiene Cloudflare Web Analytics básico.

## v1.12.3 — Fast Rules & Stats Polish

Versión conservadora basada en `v1.11.0 — Technical Foundation`.

### Objetivo

Corregir la visualización móvil de la botonera secundaria de la pantalla inicial para que no se monte, no se corte y no cree desplazamiento horizontal dentro del reloj.

### Cambios

- Reseteo final de `grid-column` y `grid-row` heredados en botones con `data-slot`.
- Botonera secundaria en móvil organizada en 2 columnas.
- En pantallas muy estrechas, botonera en 1 columna.
- Contención de overflow horizontal en la pantalla inicial.
- Ajuste ligero del modal de menú en móvil.

### No se toca

- Reglas del juego.
- Lógica de cronómetro.
- Sonidos.
- Penalti/falta especial.
- Analytics.
- Cloudflare/Zaraz.


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


## v1.11.0 — CSS Refactor

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


## v1.11.0 — Stability Rollback

Esta versión parte de `v1.11.0 CSS Refactor`, última versión estable confirmada antes de añadir la capa de eventos de juego.

Motivo:

- Se detectó bloqueo de la web durante partida tras la versión con tracking de eventos.
- Se retira la capa `Game Event Tracking` de `v1.11.0`.
- Se mantiene Cloudflare Web Analytics básico.
- Se mantiene dominio `https://cronogol.es/`.
- Se mantiene CSS refactor.
- Se mantiene copyright/footer.

No se toca la lógica del juego.


## v1.11.0 — Goal & Penalty Feedback

Esta versión parte de `v1.11.0 Stability Rollback`.

Objetivo:

- Añadir feedback audiovisual de gol, penalti, falta, tarjetas y palos sin reintroducir tracking de eventos.
- Mantener la estabilidad recuperada en `v1.11.0`.

Cambios:

- Sonido de gol más reconocible.
- Sonido de penalti/falta más claro.
- Sonido de penalti fallado.
- Flash visual en gol y eventos especiales.
- Vibración visual del dispositivo en poste/larguero.
- Respeta `prefers-reduced-motion`.
- No se reintroduce Zaraz ni Game Event Tracking.

No se toca la lógica del juego.


## v1.11.0 — Machine Special Lock Fix

Esta versión parte de `v1.11.0 Goal & Penalty Feedback`.

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
- Se mantiene sonido/feedback visual de v1.11.0.
- No se reintroduce Zaraz ni tracking de eventos.

No se cambian reglas ni comportamiento de marcador.


## v1.11.0 — Machine Special Autoshot Fix

Esta versión parte de `v1.11.0 Machine Special Lock Fix`.

Motivo:

- `v1.11.0` bloqueaba correctamente el botón START/STOP cuando la máquina obtenía penalti/falta.
- Pero la máquina no ejecutaba la tirada especial porque `maybeMachineSpecialTurn()` llamaba a una función inexistente (`startSpecialTimer()`).

Corrección:

- La tirada especial automática de la máquina usa el cronómetro real existente: `startTimer()` y `stopTimer()`.
- El botón sigue bloqueado para el usuario.
- La máquina ejecuta el disparo especial por código.
- Se mantiene `syncActionControls()` después de la tirada.
- No se reintroduce Zaraz ni tracking de eventos.

No se cambian reglas ni marcador.


## v1.11.0 — Machine Special Flow Fix

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


## v1.11.0 — Machine Special Direct Resolve

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


## v1.11.0_ESTABLE_MACHINE_SPECIAL_OK

Versión congelada como estable tras confirmar el arreglo del flujo de penalti/falta de la máquina.

Confirmado:

- Botones humanos bloqueados durante turno especial de máquina.
- Máquina ejecuta automáticamente penalti/falta.
- El botón principal no queda atascado en STOP.
- El turno continúa correctamente.
- Sin Zaraz/event tracking.
- Cloudflare Web Analytics básico se mantiene.

Esta versión debe usarse como base para futuras modificaciones.


## v1.11.0 — Sound & Haptics Polish

Esta versión parte de `v1.11.0_ESTABLE_MACHINE_SPECIAL_OK`.

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


## v1.11.0 — Haptics Tuning

Esta versión parte de `v1.11.0 Sound & Haptics Polish`.

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


## v1.11.0 — Vibration Strict Fix

Corrige la vibración tras fallo normal.

Ajuste:

- Se eliminan todas las llamadas directas a vibración física fuera de `haptic()`.
- `haptic()` solo permite vibrar en:
  - gol: vibración fuerte;
  - penalti fallado: vibración leve.
- Fallo normal: sin vibración física.
- Falta fallada: sin vibración física.
- Poste/larguero: sin vibración física.
- START/STOP: sin vibración física.
- Tarjetas/descanso/final: sin vibración física.
- También se elimina la vibración visual de fallo normal/poste/larguero para evitar confusión.

No se toca:

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Zaraz/tracking de eventos.


## v1.11.0 — Strict Physical Vibration Gate

Esta versión blinda la vibración física según la norma cerrada:

| Caso | Vibración física |
|---|---:|
| Gol | Fuerte |
| Penalti fallado | Leve |
| Fallo normal | Eliminada |
| Falta fallada | Eliminada |
| Poste/larguero | Eliminada |
| START/STOP | Eliminada |
| Tarjetas | Eliminada |
| Descanso/final | Eliminada |

Cambios técnicos:

- Eliminado `haptic()` genérico.
- Eliminado `vibrate()` genérico.
- Añadido `physicalVibration(event)` como único punto que puede llamar a `navigator.vibrate`.
- Añadido `applyPhysicalVibration(context)` como única puerta de decisión.
- Eliminadas llamadas directas a vibración fuera de `physicalVibration()`.
- `triggerScreenFeedback()` solo aplica animación en:
  - `goal`;
  - `penalty_fail`.
- Añadido cache busting:
  - `game.js?v=1.11.0`;
  - `style.css?v=1.11.0`.

No se toca:

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Zaraz/tracking de eventos.


## v1.11.0_ESTABLE_VIBRATION_OK

Versión congelada como estable tras confirmar que la vibración física cumple la norma cerrada.

Confirmado: gol fuerte, penalti fallado leve, y sin vibración en fallo normal, falta fallada, poste/larguero, START/STOP, tarjetas y descanso/final.

Esta versión debe usarse como base para futuras modificaciones.


## v1.11.0 — Project Audit Fixes

Correcciones aplicadas desde la auditoría multidisciplinar:

- Debounce/bloqueo temporal de START/STOP y tirada especial.
- Sanitización y límite de nombres de jugadores.
- Confirmación real antes de reiniciar partido.
- Cierre de menú/modal con Escape y botón atrás.
- Botón superior "Inicio" en páginas secundarias.
- Mejora visual de estados del selector de idioma.
- Transición suave del menú lateral.
- Fallback de portapapeles ya mantenido.
- Cache busting actualizado a `game.js?v=1.11.0` y `style.css?v=1.11.0`.
- PWA mínima con `sw.js` y `site.webmanifest`.

No se han cambiado reglas, marcador, máquina, sonidos ni vibración estable.


## v1.11.0 — Home Support Dedup

Ajuste de UX en pantalla de inicio:

- Se elimina la segunda llamada de apoyo económico.
- Se mantiene un único botón claro: `☕ Apoya CronoGol`.
- Se elimina la franja redundante: `CronoGol es gratis · Puedes apoyar el proyecto invitándome a un café`.
- No se toca juego, reglas, máquina, sonidos, vibración ni analítica.


## v1.11.0 — Menu & Home Hierarchy Polish

Pulido visual de interfaz sin tocar la lógica del juego.

Cambios:

- Home reorganizada por grupos de acciones:
  - ayuda/contenido;
  - compartir/feedback;
  - apoyo como CTA suave.
- Menú lateral más compacto.
- `Reiniciar partido` separado como acción peligrosa.
- `Apoya CronoGol` baja peso visual en home y menú.
- Se mantiene la confirmación de reinicio añadida en v1.11.0.
- Cache busting actualizado a `game.js?v=1.11.0` y `style.css?v=1.11.0`.

No se toca:

- Reglas.
- Marcador.
- Máquina.
- Penalti/falta automática de máquina.
- Sonidos.
- Vibración estricta.
- Cloudflare Web Analytics.
- Zaraz/event tracking.


## v1.11.0 — Mobile Layout Fix

Esta versión parte de `v1.11.0`.

Objetivo:

- Corregir la maquetación móvil de los botones inferiores de la pantalla inicial.
- Evitar que `Reglas`, `Modos`, `Compartir`, `Copiar enlace` y `Feedback` se pisen o se salgan del marco.
- Ajustar el selector ES/EN para que no tape contenido al hacer scroll.
- Limitar altura del menú/modal en móvil.

No se toca:

- Lógica del juego.
- Reglas.
- Máquina.
- Penalti/falta.
- Sonidos.
- Vibración.
- Historial.
- Estadísticas.


## v1.11.0 — Secondary Actions Fix

Esta versión corrige el fallo real visto en PC y móvil en la zona inferior de acciones secundarias.

Problema:

- Los grupos internos `.setup-action-group` se comportaban como columnas dentro de `.setup-links`.
- Los botones quedaban estrechos, con cajas vacías y textos pisados.
- En móvil y PC los enlaces `Reglas`, `Modos`, `Historia`, `Compartir`, `Copiar enlace` y `Feedback` no se distribuían correctamente.

Solución:

- `.setup-action-group` pasa a `display: contents`.
- Los botones/enlaces internos pasan a ser elementos reales de la parrilla.
- En desktop/tablet se usa una parrilla de 3 columnas.
- En móvil se usa una parrilla de 2 columnas.
- `Apoya CronoGol` queda siempre a ancho completo.
- Se elimina cualquier contenido accidental antes de `<!DOCTYPE html>`.
- Se actualiza cache/versionado a `v1.11.0`.

No se toca la lógica del juego.


## v1.11.0 — Flatten Secondary Actions

Esta versión corrige la causa real del fallo de los botones inferiores.

Diagnóstico:

- El HTML de `index.html` agrupaba las acciones secundarias dentro de `.setup-action-group`.
- Parte del CSS histórico usaba selectores directos como `nav.setup-links > [data-slot="rules"]`.
- Al existir wrappers intermedios, esos selectores no alcanzaban a los botones reales.
- Además, una regla antigua con más especificidad forzaba estilos sobre los wrappers.
- Resultado: columnas estrechas, cajas vacías y textos pisados.

Solución real:

- Se elimina la agrupación interna y los botones vuelven a ser hijos directos de `nav.setup-links`.
- Se añade un override final específico para `#setup-screen nav.setup-links.secondary-actions-final`.
- Se mantiene `Apoya CronoGol` a ancho completo.
- Se actualiza versión/cache a `v1.11.0`.

No se toca la lógica del juego.


## v1.11.0 — Technical Foundation

Versión puente antes de V2 online.

Objetivo: preparar la base técnica para salas online sin tocar la jugabilidad.

Incluye:

- guarda idempotente en `endMatch()`;
- helpers para limpiar timers críticos;
- desbloqueo robusto de `AudioContext` tras interacción del usuario;
- restauración segura del texto de tirada especial;
- corrección de `sw.js` eliminando asset inexistente;
- actualización de cache/versionado a `v1.11.0`;
- honeypot y cooldown local en feedback;
- plantilla de Cloudflare Worker para proteger Formspree;
- documento `TECHNICAL_FOUNDATION_V1_11_0.md`.

No incluye todavía:

- Supabase;
- salas online;
- partida online;
- anuncios nuevos;
- automatización de contenidos.

## v2.1.0 — Room Lobby Sync

Añade lobby sincronizado: anfitrión, invitado, estado, refresco manual y polling suave. El partido completo aún no se sincroniza.
