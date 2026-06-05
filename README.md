# CronoGol v1.9.1 — Support Bugfix

## Objetivo

Corregir el primer fallo real detectado en la fase de monetización voluntaria.

## Cambios aplicados

- Añadida función global `openBizum()` en `game.js`.
- El botón `Abrir Bizum` del modal del juego ya tiene función real.
- Reforzadas funciones limpias de:
  - `showSupportModal()`
  - `shareCronoGol()`
  - `copyCronoGolLink()`
- Cambiado el bloque “Espacio de patrocinador” por un mensaje de apoyo voluntario.
- Añadida opción de feedback:
  - `Problema con Bizum / apoyo`
- Mejorado placeholder del campo dispositivo.
- Actualizada privacidad.
- Añadidos estilos menores para apoyo voluntario.

## No se ha tocado

- Reglas.
- Turnos.
- Máquina.
- Modo rápido.
- START/STOP.
- Penalti/falta.
- Estadísticas.
- Historial.

## QA recomendado

1. Abrir `https://cronogol.es/`.
2. Pulsar `Apoya`.
3. Pulsar `Abrir Bizum`.
4. Confirmar que copia los datos o intenta abrir la app bancaria.
5. Terminar una partida.
6. Pulsar `Abrir Bizum` en el resumen final.
7. Probar `Compartir`.
8. Probar que START/STOP sigue funcionando.
