# Reglas locales Ponytail - CronoGol

Estas instrucciones sirven para agentes IA como Cursor, Copilot, Claude Code, Codex o Aider.

## Ponytail anti-sobreingeniería

Antes de escribir código nuevo:

1. Pregunta si realmente hace falta.
2. Busca primero si ya existe una función nativa, estándar o ya implementada en el proyecto.
3. Prefiere borrar, simplificar o reutilizar antes que añadir.
4. No crees helpers, wrappers, servicios, clases, capas, estados o abstracciones si una solución simple basta.
5. No añadas dependencias salvo que estén claramente justificadas.
6. Mantén el cambio en el menor número de archivos posible.
7. Explica qué has simplificado y qué has decidido no tocar.

Nunca sacrificar:
- reglas de negocio;
- validaciones;
- seguridad;
- accesibilidad;
- trazabilidad;
- logs útiles;
- tests/checks;
- compatibilidad con versiones estables;
- claridad para mantenimiento futuro.

Modo recomendado para este proyecto: FULL prudente, no ULTRA.

## Reglas específicas CronoGol

No modificar sin permiso explícito:
- recuperación de resultados;
- predicciones guardadas;
- ranking;
- 11 ideal;
- lógica de posiciones;
- CSS ya validado visualmente;
- sistema de versiones;
- flujo ZIP + commit + push.

Prioridad:
- preservar funcionamiento online;
- cambios pequeños y reversibles;
- no introducir frameworks ni dependencias innecesarias;
- no reconstruir componentes si basta corregir HTML/CSS/JS existente.

Cada nueva versión ZIP debe incluir comandos PowerShell para:
- copiar al repo local;
- revisar git status;
- commit;
- push.

## Regla final

El mejor código es el que no hace falta escribir, pero la estabilidad, la trazabilidad y las decisiones ya validadas tienen prioridad sobre reducir líneas.
