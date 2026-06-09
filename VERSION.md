# VERSION

Current version: v1.10.11
Release name: Strict Physical Vibration Gate
Base version: v1.10.10 Vibration Strict Fix
Status: Stable candidate
Primary URL: https://cronogol.es/

Rules enforced:

- Goal: strong physical vibration.
- Penalty fail: light physical vibration.
- Normal miss: no physical vibration.
- Free kick fail: no physical vibration.
- Post/crossbar: no physical vibration.
- START/STOP: no physical vibration.
- Cards: no physical vibration.
- Half/full time: no physical vibration.

Technical notes:

- No generic haptic().
- No generic vibrate().
- navigator.vibrate only inside physicalVibration().
- game.js and style.css use ?v=1.10.11 cache busting.
- Gameplay rules unchanged.
