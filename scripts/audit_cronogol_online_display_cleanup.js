#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const game = fs.readFileSync(path.join(process.cwd(), "game.js"), "utf8");
let failures = [];
function a(cond,msg){ if(!cond) failures.push(msg); }

a(game.includes("CronoGolDisplayOwnership"), "Debe mantenerse CronoGolDisplayOwnership como dueño visual");
a(game.includes("CronoGolOnlineDisplayCleanup"), "Debe existir marcador v2.6.0 de limpieza");
a(game.includes("old v2.5.1 pullProtect polling disabled"), "PullProtect antiguo debe estar desactivado");
a(game.includes("old v2.5.3 pull/restore polling disabled"), "Pull/restore antiguo v2.5.3 debe estar desactivado");
a(game.includes("old v2.5.5 remote stop polling disabled"), "Polling remoto antiguo v2.5.5 debe estar desactivado");
a(game.includes("old v2.5.4 60ms live render disabled"), "Render vivo antiguo de 60ms debe estar desactivado");
a(game.includes("old v2.5.6 monotonic 50ms painter disabled"), "Painter monotónico antiguo debe estar desactivado");

a(!game.includes("setInterval(pullProtect,900);"), "setInterval(pullProtect,900) no debe seguir activo");
a(!game.includes("setInterval(()=>{pull();restore()},750);"), "setInterval pull/restore no debe seguir activo");
a(!game.includes("setInterval(()=>{if(Date.now()<pollingFastUntil)pull()},250);setInterval(pull,900);"), "Polling remoto compacto no debe seguir activo");
a(!/setInterval\(\(\)=>\{\s*if\(online\(\)&&isLocalTurn\(\)&&gameState\.isRunning\)\{\s*try\{renderMs\(currentElapsedMs\)\}catch\(e\)\{\}\s*\}\s*\},60\);/s.test(game), "Render 60ms antiguo no debe seguir activo");
a(!/setInterval\(\(\)=>\{\s*if\(shouldGuard\(\)\)\{\s*try\{paintMonotonic\(currentElapsedMs\)\}catch\(e\)\{\}\s*\}\s*\},50\);/s.test(game), "Painter 50ms antiguo no debe seguir activo");

console.log(`AUDITORIA_CRONOGOL_ONLINE_DISPLAY_CLEANUP: ${failures.length ? "FAIL" : "OK"}`);
if(failures.length){ failures.forEach(f => console.error("- " + f)); process.exit(1); }
