# CronoGol v1.8.8 — Stable Clean Release

CronoGol es un juego web gratuito inspirado en el clásico juego de cronómetro con relojes digitales tipo Casio.

El jugador pulsa START, deja correr el cronómetro y pulsa STOP. El resultado se decide con los dos últimos dígitos.

## Estado de esta versión

`v1.8.8` parte de la versión funcional confirmada `v1.8.7`.

Esta versión es una limpieza estable:

- No cambia la lógica del juego.
- No cambia el flujo de turnos.
- No cambia los listeners principales.
- No cambia las reglas.
- No cambia el sistema de máquina.
- Limpia documentación.
- Actualiza referencias a GitHub Pages.
- Revisa privacidad y feedback.
- Añade changelog y manifest de versión.

## URL principal

GitHub Pages:

```text
https://ikeritu.github.io/cronogol/
```

## Modos de juego

### 1 vs 1 local

Dos jugadores juegan en el mismo dispositivo, alternando turnos.

### 1 vs Máquina

El jugador juega contra la máquina. Cuando le toca a la máquina, el sistema realiza la tirada automáticamente.

## Duraciones

### Modo clásico

Reglas principales:

- `00` = Gol.
- `01-02` = Poste. Repite el mismo jugador.
- `03-04` = Larguero. Repite el mismo jugador.
- `45` = Descanso.
- `50` = Amarilla. Pierde el siguiente turno.
- `60` = Roja. Pierde dos turnos.
- `90` = Final del partido.
- `96-97` = Falta peligrosa.
- `98-99` = Penalti.
- Resto de números = Fallo.

### Modo rápido

- Todo número terminado en `0` es gol.
- Todo número terminado en `9` es penalti.
- Gana el primero que llegue a 6 goles con 2 de ventaja.

## Feedback

El feedback se envía mediante Formspree.

Archivo principal:

```text
feedback.html
```

## Apoyo voluntario

CronoGol seguirá siendo gratuito. El proyecto puede apoyarse mediante:

- Bizum.
- PayPal.

## Archivos principales

```text
index.html
game.js
style.css
feedback.html
apoya.html
como-jugar.html
contacto.html
privacidad.html
README.md
CHANGELOG.md
VERSION.md
RELEASE_MANIFEST_v1_8_8.json
```

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

## Próximos pasos recomendados

1. Mantener `v1.8.8` como base estable.
2. Comprar dominio propio.
3. Conectar dominio a GitHub Pages.
4. Después, mejorar diseño/logo o multidioma completo en versiones pequeñas.
