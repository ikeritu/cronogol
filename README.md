# CronoGol v1.7.9 — selector de idioma corregido

## Estado actual

Versión estable basada en la línea v1.7.x, con:

- Logo fuera del reloj.
- Selector ES / EN en la parte superior derecha.
- Traducción de textos principales.
- Modo clásico y modo rápido.
- Modo 1 vs 1 y 1 vs Máquina.
- Feedback mediante Formspree.
- Resultado compartible.
- GitHub Pages compatible.

## Corrección v1.7.9

Se corrige el selector de idioma:

- Los botones ES / EN ahora usan estilos propios.
- Al pulsar EN se aplica el idioma inglés.
- Al pulsar ES se vuelve al español.
- El idioma se guarda en `localStorage`.
- Se actualiza `document.documentElement.lang`.
- Se limpian posibles restos de la integración anterior.

## Qué se traduce

- Configuración inicial.
- Botones de modo y duración.
- Botón de empezar partido.
- Links principales.
- Tarjeta de modo online.
- Tarjeta de patrocinador.
- Menú.
- Etiquetas de estadísticas e historial.
- Textos básicos de turno.

## Pendiente

La traducción de mensajes dinámicos de jugada puede mejorarse en una versión posterior:

- Gol.
- Fallo.
- Penalti.
- Falta.
- Tarjetas.
- Mensajes finales.

## Publicación en GitHub Pages

Subir todos los archivos de esta carpeta al repositorio `cronogol`.

Configuración recomendada:

- Branch: `main`
- Folder: `/root`

URL esperada:

`https://ikeritu.github.io/cronogol/`
