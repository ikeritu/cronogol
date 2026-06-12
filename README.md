# CronoGol

**CronoGol** es un juego web gratuito inspirado en la mecánica clásica del cronómetro: pulsa START, detén el tiempo y marca gol cuando los dos últimos dígitos caen en `00`.

Sitio oficial: https://cronogol.es/

Versión actual documentada: **v2.1.7 — Online Remote Action UX**

---

## Estado del proyecto

CronoGol mantiene una base local estable y una rama V2 online en evolución.

### Estable

- Juego local 1 vs 1.
- Juego 1 vs Máquina.
- Modo clásico.
- Modo rápido.
- Penalti, falta peligrosa, tarjetas, poste y larguero.
- Estadísticas locales en el dispositivo.
- Historial local de últimas partidas.
- Sonido opcional.
- PWA básica con `site.webmanifest` y `sw.js`.
- Dominio personalizado y Cloudflare Web Analytics.

### En desarrollo

- Salas privadas online con Supabase.
- Sincronización básica de estado de partido.
- Visualización de última acción remota.
- Autoridad de turno por rol: anfitrión controla Jugador 1 y rival controla Jugador 2.

Todavía no replica el cronómetro corriendo en vivo ni resuelve conflictos online avanzados.

---

## Cómo se juega

### Objetivo

Parar el cronómetro en el momento adecuado para generar goles o eventos especiales.

### Resultado principal

| Últimos dígitos | Resultado |
|---:|---|
| `00` | Gol |
| `01-02` | Poste. Repite el mismo jugador. |
| `03-04` | Larguero. Repite el mismo jugador. |
| `50` | Amarilla. Termina el turno y pierde el siguiente. |
| `60` | Roja. Termina el turno y pierde el siguiente. |
| `96-97` | Falta peligrosa. |
| `98-99` | Penalti. |

### Modos

| Modo | Descripción |
|---|---|
| 1 vs 1 | Partida local entre dos jugadores. |
| 1 vs Máquina | Partida contra IA con dificultad fácil, normal o difícil. |
| Online | Salas privadas V2. Requiere Supabase configurado para partida remota real. |

### Duración

| Duración | Descripción |
|---|---|
| Clásico | Partido dividido en dos partes. |
| Rápido | Primero a 6 goles. |

---

## Estructura principal

```text
.
├── index.html                         # Pantalla principal y juego
├── game.js                            # Lógica principal de CronoGol
├── online-foundation.js               # Base V2 online / Supabase
├── supabase-config.js                 # Configuración pública del backend online
├── SUPABASE_PRIVATE_ROOMS_SETUP.sql   # SQL para crear salas privadas en Supabase
├── style.css                          # Estilos principales
├── sw.js                              # Service Worker / caché PWA
├── site.webmanifest                   # Manifest PWA
├── CHANGELOG.md                       # Historial de versiones
├── CNAME                              # Dominio personalizado
└── *.html                             # Páginas estáticas auxiliares
```

---

## Desarrollo local

CronoGol es una web estática. No necesita instalación de dependencias ni proceso de build.

### Opción rápida

Abre `index.html` en el navegador.

### Opción recomendada

Servir la carpeta con un servidor local para probar correctamente rutas, service worker y caché.

```bash
python -m http.server 8080
```

Después abre:

```text
http://localhost:8080
```

---

## Configuración online con Supabase

El modo online está preparado para funcionar con Supabase, pero por defecto queda desactivado.

1. Crear un proyecto en Supabase.
2. Ejecutar `SUPABASE_PRIVATE_ROOMS_SETUP.sql` en el SQL Editor.
3. Activar Realtime para la tabla `cronogol_rooms` si no queda activado por el script.
4. Editar `supabase-config.js`:

```js
window.CRONOGOL_SUPABASE_CONFIG = {
  enabled: true,
  url: "https://TU-PROYECTO.supabase.co",
  anonKey: "TU_ANON_PUBLIC_KEY"
};
```

No debe usarse nunca la `service_role key` en esta web pública.

---

## Archivos que no deben subirse

El repositorio debe evitar archivos generados o locales como:

- `node_modules/`
- `dist/`
- `build/`
- `.env`
- `.env.local`
- logs
- backups temporales
- capturas o exportaciones manuales
- archivos comprimidos generados localmente

La limpieza de mantenimiento deja el historial en `CHANGELOG.md` y evita duplicar documentación técnica antigua en la raíz.

---

## Analítica

El proyecto usa Cloudflare Web Analytics para métricas básicas de visitas y rendimiento.

No se debe reintroducir una capa avanzada de tracking de eventos sin probar que no afecta al rendimiento ni bloquea partidas.

---

## Seguridad de cambios

Antes de modificar lógica jugable conviene validar:

1. Inicio de partida local.
2. Modo 1 vs Máquina.
3. Modo rápido.
4. Penalti y falta peligrosa.
5. Amarilla y roja.
6. Estadísticas locales.
7. Reinicio de partido.
8. Service worker/cache en navegador limpio.
9. Online desactivado sin Supabase.
10. Online activado con sala de prueba, si hay backend configurado.

---

## Derechos de autor

© 2026 CronoGol. Juego original creado por Iker Ituarte.

El código, textos, diseño visual, reglas redactadas, logotipo y materiales gráficos de este proyecto pertenecen a su autor, salvo que se indique lo contrario.

No está permitido copiar, redistribuir, publicar, modificar o explotar este proyecto sin autorización previa.
