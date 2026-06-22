# CLAUDE.md — CronoGol

Instrucciones para Claude Code al trabajar en este repositorio. Léelas al inicio de cada sesión.

## Qué es CronoGol

Juego web tipo cronómetro Casio: el jugador para un cronómetro y las centésimas determinan acciones de fútbol (gol, fallo, penalti, falta, tarjeta, poste, larguero...). Tiene modo local, modo máquina, modo rápido y modo online (salas privadas por código vía Supabase REST).

- Repo: https://github.com/ikeritu/cronogol
- Ruta local: `D:\Proyectos\⏱ Cronogol`
- Dominio: https://cronogol.es (probar versiones con `?v=X.Y.Z`)

## Estado actual

- Última versión: **v2.6.1 — Online Core Bugfix**, encima de v2.6.0 (Online Core Refactor).
- v2.6.0 consolidó toda la lógica online en un único controlador `CronoGolOnlineCore` y desactivó los parches legacy mediante el gate `CRONOGOL_DISABLE_LEGACY_ONLINE_PATCHES = true`.
- v2.6.1 corrigió: atribución del STOP al jugador correcto, regla de turno unificada (cierre de doble tirada) y limpieza de un gate muerto.
- El online aún NO está dado por estable: falta validación real PC + móvil.

## Áreas PROTEGIDAS (no tocar sin permiso explícito del usuario)

- Ranking
- Predicciones guardadas
- Recuperación de resultados
- Lógica de posiciones
- CSS validado (`style.css`) — salvo bug muy claro y autorizado
- Políticas RLS de Supabase (deuda pendiente, requiere plan)
- Modo local / modo máquina si el problema es del online
- Reglas de juego ya validadas (salvo bug demostrado)

Si arreglar el online requiere refactor real (consolidar módulos, eliminar parches), está permitido. Pero las áreas de arriba no se tocan sin permiso.

## Antes de cualquier cambio grande, indica

1. Archivos a tocar
2. Por qué
3. Riesgo
4. Cómo validarlo
5. Qué NO se va a tocar

## Reglas de juego que NO se deben romper (modo rápido / five)

- Acabados en `0` = GOL, salvo excepciones (`70`, `10`, `90` son GOL).
- `50` = AMARILLA.
- `60` = ROJA.
- `96` y `97` = FALTA PELIGROSA.
- Acabados en `9` = PENALTI (`09`, `19`, `89`, `99`).
- `01/02` = POSTE (repite jugador).
- `03/04` = LARGUERO (repite jugador).

Motor activo: `evaluateFastThrow` y `evaluateThrow` en `game.js`. Las claves que produce (`special:"free_kick"`, `special:"penalty"`) deben seguir coincidiendo con `applyNormalResult` y `evaluateSpecialThrow`.

## Arquitectura online (decisiones tomadas)

- **STOP es la autoridad / fuente de verdad.** Al pulsar STOP se calcula el valor real, se guarda `lastStoppedThrow`, se congela y ambos dispositivos pintan ese mismo STOP. No usar streaming constante de ticks como fuente de verdad.
- **RUNNING_REMOTE sin streaming.** Al pulsar START se publica `runningState` una sola vez; el rival anima el cronómetro localmente con `startedAtMs`, `baseMs` y `Date.now()`. Al STOP se limpia `runningState`.
- Controlador único: `CronoGolOnlineCore` (START remoto basado en `state_json.currentPlayerIndex`, STOP basado en `lastStoppedThrow`).
- No añadir dependencias sin justificarlo. No abrir Supabase Realtime hasta que el core REST esté estable.

## Archivos clave

`index.html`, `game.js` (núcleo, ~5200 líneas), `online-foundation.js` (salas/lobby), `style.css`, `sw.js`, `supabase-config.js`, `SUPABASE_PRIVATE_ROOMS_SETUP.sql`, `scripts/run_auditoria_cronogol.ps1` y los `scripts/audit_cronogol_*.js`.

## Supabase

- URL: https://xbrrdkflztxkvnngmdhu.supabase.co
- Tabla: `cronogol_rooms`
- Columnas usadas por el código: `room_code`, `host_name`, `guest_name`, `status`, `state_json`, `app_version`, `last_seen_at`, `created_at`, `updated_at`.
- La anon/public key vive en el frontend (es pública por diseño). Deuda: está repetida en `game.js` y `online-foundation.js`; conviene centralizarla en `supabase-config.js`.

## Validación obligatoria

Tras cualquier cambio, ejecutar y dejar en verde:

```powershell
node --check game.js
node --check online-foundation.js
node --check sw.js
powershell -ExecutionPolicy Bypass -File ".\scripts\run_auditoria_cronogol.ps1" -ProjectPath "."
```

Limitación conocida: la mayoría de auditorías son comprobaciones de presencia de texto (`includes(...)`), NO ejecutan la lógica real. "Verde" prueba que el código existe, no que el online funcione. No darlo por validado sin la prueba manual.

Validación manual del online (PC + móvil), imprescindible para cualquier cambio que toque online:
1. Crear sala, entrar con móvil.
2. Solo Jugador 1 tiene START. Tira una vez y NO puede tirar dos veces.
3. Jugador 2 ve START; mientras corre, Jugador 1 ve su cronómetro remoto.
4. Al STOP, ambos ven el mismo resultado congelado y atribuido al jugador correcto.
5. Probar valores: `70`, `09`, `19`, `89`, `50`, `60`, `96`, `97`.
6. Sin estados mezclados (reloj de otro momento, número inferior de un STOP anterior, evento incompatible).

## Flujo de release

Bump de versión en `sw.js` (CACHE_NAME y `?v=`), `index.html` (`?v=`), `VERSION.md`, manifest y `CHANGELOG.md`. Luego:

```powershell
git add .
git commit -m "Release vX.Y.Z nombre"
git push origin main
```

Probar después en `https://cronogol.es/?v=X.Y.Z`.

## Estilo de trabajo

Prioriza arreglar bien el online. Refactor real permitido en el online. Prudencia máxima en las áreas protegidas. Si una versión online falla, no volver a parches pequeños ciegos: auditar el core y corregir en una versión focused bugfix.
