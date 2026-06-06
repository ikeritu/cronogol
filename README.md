# CronoGol v1.9.0 — Analytics Release

CronoGol es un juego web gratuito inspirado en el clásico juego de cronómetro con relojes digitales tipo Casio.

## Estado de esta versión

`v1.9.0` parte de la versión estable confirmada `v1.8.8`.

Esta versión añade:

- Cloudflare Web Analytics.
- URL oficial `https://cronogol.es/`.
- Archivo `CNAME` para GitHub Pages.
- Texto de autoría en footer.
- Sección de derechos de autor en README.
- Actualización de privacidad para informar del uso de Cloudflare Web Analytics.

## URL oficial

```text
https://cronogol.es/
```

## Analítica

Se ha añadido Cloudflare Web Analytics para medir visitas básicas y rendimiento de la web.

Snippet añadido en las páginas HTML:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "7ee638b73aa24300b417a555e67fd1ae"}'></script>
<!-- End Cloudflare Web Analytics -->
```

## Qué se puede consultar en Cloudflare

- Visitas.
- Visitantes aproximados.
- Páginas vistas.
- País o región aproximada.
- Navegador.
- Dispositivo.
- Referencias de entrada.
- Rendimiento básico.

## Derechos de autor

© 2026 CronoGol. Juego original creado por Iker Ituarte.

El código, textos, diseño visual, reglas redactadas, logotipo y materiales gráficos de este proyecto pertenecen a su autor, salvo que se indique lo contrario.

No está permitido copiar, redistribuir, publicar, modificar o explotar este proyecto sin autorización previa.

## QA mínimo recomendado

Antes de publicar cambios nuevos, probar:

1. ES → 1 vs Máquina → Rápido → Empezar partido.
2. ES → 1 vs 1 → Clásico → Empezar partido.
3. EN → 1 vs Machine → Fast → START MATCH.
4. START / STOP.
5. Estadísticas.
6. Historial.
7. Penalti.
8. Falta.
9. Reglas.
10. Compartir.
11. Feedback.
12. Support / Apoya.
13. Cloudflare Web Analytics detecta visitas tras unas horas.
