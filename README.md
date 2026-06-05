# CronoGol v1.8.7 — QA Fix real

## Causa raíz detectada

El script no llegaba a inicializarse porque `game.js` usaba funciones que no existían:

- `forceDebugThrow`
- `currentPlayer`
- `scoreText`
- `pad`
- `randomInt`
- `clockSec`
- `playSound`
- `vibrate`
- `copyText`
- `showToast`
- `formattedFinalResult`
- `copyResult`

La primera rotura visible era esta línea:

```js
debugThrowBtn.onclick = forceDebugThrow;
```

Como `forceDebugThrow` no existía, JavaScript lanzaba un `ReferenceError` y dejaba de ejecutar el resto del archivo. Por eso ningún click funcionaba.

## Corrección

Se restauran los helpers base mínimos sin tocar la lógica principal del juego.

## Validación

- `node --check game.js` correcto.
- Prueba con navegador headless: click en `1 vs Máquina`, `Rápido` y `Empezar partido` cambia a la pantalla de juego.
