# CronoGol v1.9.4 — Secondary Actions Reorder

## Objetivo

Reorganizar los botones secundarios de la pantalla inicial para mejorar jerarquía visual y dar más presencia al apoyo voluntario.

## Nueva estructura

```text
[ Reglas ] [ Modos ] [ Historia ]
[ Compartir ] [ Copiar enlace ] [ Feedback ]
[              ☕ Apoya CronoGol              ]
```

## Cambios aplicados

- Reordenados botones secundarios.
- `Apoya CronoGol` ocupa las 3 columnas inferiores.
- Apoya queda como CTA secundaria clara.
- Añadidos estilos específicos para la nueva rejilla.
- Añadidas claves de traducción para `Modos` e `Historia`.

## No se ha tocado

- Lógica del juego.
- START/STOP.
- Reglas.
- Turnos.
- Máquina.
- Modo rápido.
- Penalti/falta.
- Historial.
- Estadísticas.
- Bizum/PayPal.

## QA recomendado

1. Abrir `https://cronogol.es/`.
2. Verificar orden:
   - Reglas / Modos / Historia.
   - Compartir / Copiar enlace / Feedback.
   - Apoya CronoGol a ancho completo.
3. Probar cada botón secundario.
4. Probar Apoya → Bizum / PayPal.
5. Probar Empezar partido.
