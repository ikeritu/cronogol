# CronoGol v1.9.2 — Home Simplification

## Objetivo

Reducir la carga visual de la pantalla inicial para que el usuario pueda empezar una partida más rápido.

## Cambios aplicados

- Se añade bloque plegable `Opciones avanzadas`.
- Se mueven a opciones avanzadas:
  - Dificultad de máquina.
  - Forzar descanso/final contra máquina.
- Se reduce visualmente `Modo online próximamente`.
- Se cambia el bloque de apoyo para que sea más discreto.
- Se compactan enlaces secundarios.
- Se reduce peso visual del footer de versión.
- Se mantiene el botón `Empezar partido` como acción principal.

## No se ha tocado

- Lógica del juego.
- START/STOP.
- Reglas.
- Turnos.
- Máquina.
- Modo rápido.
- Penalti/falta.
- Estadísticas.
- Historial.
- Bizum/PayPal.

## QA recomendado

1. Abrir `https://cronogol.es/`.
2. Confirmar que la pantalla inicial se ve más limpia.
3. Abrir y cerrar `Opciones avanzadas`.
4. Probar `1 vs Máquina`.
5. Probar `Rápido`.
6. Pulsar `Empezar partido`.
7. Confirmar que START/STOP funciona.
8. Confirmar que Apoya/Bizum siguen funcionando.
