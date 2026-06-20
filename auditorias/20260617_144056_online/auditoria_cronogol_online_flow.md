# Autoauditoría CronoGol — flujo online simulado

Fecha: 2026-06-17T14:40:56.356Z

Resultado: **OK**

## Secuencia simulada

| # | Tipo | Actor | Tirada | Resultado | Mensaje | Marcador | Turno después | Skips |
|---:|---|---|---:|---|---|---|---|---|
| 1 | throw | Iker | 10 | GOL | Iker sacó 10 → GOL | 1-0 | ikeritus | 0/0 |
| 2 | throw | ikeritus | 61 | FALLO | ikeritus sacó 61 → FALLO | 1-0 | Iker | 0/0 |
| 3 | throw | Iker | 60 | ROJA | Iker sacó 60 → ROJA | 1-0 | ikeritus | 2/0 |
| 4 | skip | Iker | -- | SANCIÓN | Iker pierde turno por sanción | 1-0 | ikeritus | 1/0 |
| 5 | throw | ikeritus | 62 | FALLO | ikeritus sacó 62 → FALLO | 1-0 | ikeritus | 1/0 |
| 6 | skip | Iker | -- | SANCIÓN | Iker pierde turno por sanción | 1-0 | ikeritus | 0/0 |
| 7 | throw | ikeritus | 63 | FALLO | ikeritus sacó 63 → FALLO | 1-0 | ikeritus | 0/0 |
| 8 | throw | ikeritus | 21 | PENALTI FALLADO | ikeritus sacó 21 → PENALTI FALLADO | 1-0 | Iker | 0/0 |
| 9 | throw | Iker | 12 | GOL DE FALTA | Iker sacó 12 → GOL DE FALTA | 2-0 | ikeritus | 0/0 |

## Estado final

```json
{
  "phase": "playing",
  "gameMode": "online",
  "matchMode": "fast",
  "currentPlayerIndex": 1,
  "players": [
    {
      "index": 0,
      "name": "Iker",
      "goals": 2,
      "skipTurns": 0
    },
    {
      "index": 1,
      "name": "ikeritus",
      "goals": 0,
      "skipTurns": 0
    }
  ],
  "score": [
    2,
    0
  ],
  "lastThrow": {
    "id": "audit-9",
    "kind": "special",
    "value": 12,
    "valueText": "12",
    "actorIndex": 0,
    "actorName": "Iker",
    "title": "GOL DE FALTA",
    "message": "Iker sacó 12 → GOL DE FALTA",
    "eventClass": "event-goal",
    "createdAt": "2026-06-17T14:40:56.356Z"
  },
  "events": [
    {
      "id": "audit-1",
      "kind": "normal",
      "value": 10,
      "valueText": "10",
      "actorIndex": 0,
      "actorName": "Iker",
      "title": "GOL",
      "message": "Iker sacó 10 → GOL",
      "eventClass": "event-goal",
      "createdAt": "2026-06-17T14:40:56.355Z"
    },
    {
      "id": "audit-2",
      "kind": "normal",
      "value": 61,
      "valueText": "61",
      "actorIndex": 1,
      "actorName": "ikeritus",
      "title": "FALLO",
      "message": "ikeritus sacó 61 → FALLO",
      "eventClass": "event-neutral",
      "createdAt": "2026-06-17T14:40:56.356Z"
    },
    {
      "id": "audit-3",
      "kind": "normal",
      "value": 60,
      "valueText": "60",
      "actorIndex": 0,
      "actorName": "Iker",
      "title": "ROJA",
      "message": "Iker sacó 60 → ROJA",
      "eventClass": "event-red",
      "createdAt": "2026-06-17T14:40:56.356Z"
    },
    {
      "id": "audit-5",
      "kind": "normal",
      "value": 62,
      "valueText": "62",
      "actorIndex": 1,
      "actorName": "ikeritus",
      "title": "FALLO",
      "message": "ikeritus sacó 62 → FALLO",
      "eventClass": "event-neutral",
      "createdAt": "2026-06-17T14:40:56.356Z"
    },
    {
      "id": "audit-7",
      "kind": "normal",
      "value": 63,
      "valueText": "63",
      "actorIndex": 1,
      "actorName": "ikeritus",
      "title": "FALLO",
      "message": "ikeritus sacó 63 → FALLO",
      "eventClass": "event-neutral",
      "createdAt": "2026-06-17T14:40:56.356Z"
    },
    {
      "id": "audit-8",
      "kind": "special",
      "value": 21,
      "valueText": "21",
      "actorIndex": 1,
      "actorName": "ikeritus",
      "title": "PENALTI FALLADO",
      "message": "ikeritus sacó 21 → PENALTI FALLADO",
      "eventClass": "event-neutral",
      "createdAt": "2026-06-17T14:40:56.356Z"
    },
    {
      "id": "audit-9",
      "kind": "special",
      "value": 12,
      "valueText": "12",
      "actorIndex": 0,
      "actorName": "Iker",
      "title": "GOL DE FALTA",
      "message": "Iker sacó 12 → GOL DE FALTA",
      "eventClass": "event-goal",
      "createdAt": "2026-06-17T14:40:56.356Z"
    }
  ]
}
```

## Fallos
- Ninguno