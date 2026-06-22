# CronoGol v2.6.0 — Technical Foundation

Base: `v1.10.17 — Flatten Secondary Actions`.

## Objetivo

Preparar la V2 online sin cambiar la jugabilidad visible de la V1.

Esta versión NO implementa todavía salas online. Su objetivo es reducir riesgos antes de introducir:

- creación de sala;
- enlace compartible;
- sincronización entre dos móviles;
- turnos online;
- reconexión;
- datos remotos.

## Cambios aplicados

### 1. Guardas de estabilidad

`endMatch()` ahora es idempotente:

```js
if (gameState.matchEnded) return;
```

Esto evita dobles finales de partido si dos eventos llegan muy juntos.

### 2. Timers centralizados

Se añaden funciones técnicas:

```js
clearMachineTurnTimers()
clearMachineSpecialTimers()
clearGameplayTimers()
```

No cambia la lógica de juego, pero reduce riesgo de timeouts vivos al cambiar de estado.

### 3. AudioContext más robusto

Se añade:

```js
resumeCronoGolAudio()
bindAudioUnlockOnce()
```

Esto ayuda a evitar sonidos bloqueados por políticas móviles de autoplay.

### 4. Restauración del botón especial

Se añade:

```js
restoreSpecialButtonLabel()
```

Objetivo: evitar que el botón de tirada especial quede con textos temporales tras acciones de máquina.

### 5. Service Worker corregido

Se elimina la ruta inexistente:

```text
./logo-cronogol-v1.10.17
```

Y se actualiza cache a `cronogol-v1.11.0`.

### 6. Feedback más resistente a spam

Se añade:

- honeypot oculto;
- timestamp cliente;
- cooldown local de 60 segundos;
- ejemplo de Cloudflare Worker para proteger Formspree.

## Duplicaciones detectadas pendientes

El archivo `game.js` todavía conserva duplicaciones históricas. No se han eliminado en esta versión para evitar una regresión grande antes de V2.

Duplicaciones actuales detectadas:

```json
{
  "formattedFinalResult": 2,
  "startMatch": 2,
  "handleMainAction": 2,
  "handleSpecialButton": 2,
  "showFinal": 2,
  "finalHtml": 2,
  "restartSameMatch": 2,
  "confirmReset": 2,
  "resetToSetup": 2,
  "showModal": 2,
  "closeModal": 2,
  "showSupportModal": 4,
  "shareCronoGol": 3,
  "resultText": 2,
  "copyCronoGolLink": 3
}
```

## Plan recomendado antes de V2 alpha

Siguiente saneamiento opcional:

1. separar `game.js` en módulos internos;
2. eliminar duplicados de share/support/modal;
3. aislar reglas de juego en `game-rules.js`;
4. aislar renderizado en `game-ui.js`;
5. crear después `online.js`.

## Verificación

- `node --check game.js`
- `node --check sw.js`

