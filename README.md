# CronoGol v1.9.10 — Home UI Polish

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
