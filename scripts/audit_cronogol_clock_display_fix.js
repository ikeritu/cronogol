#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
function pad(n){return String(n).padStart(2,"0")}
let ui={timer:"00:00:00",lastTwo:"--"};
function throwV(v){ui.lastTwo=pad(v)}
function clock(t,lastTwo){ui.timer=t;/* no debe tocar ui.lastTwo */}
throwV(31);clock("00:00:02",2);a(ui.timer==="00:00:02","reloj sincronizado");a(ui.lastTwo==="31","tirada 31 no debe cambiar a 02");
throwV(19);clock("00:00:03",3);a(ui.lastTwo==="19","tirada 19 no debe cambiar a 03");
console.log(`AUDITORIA_CRONOGOL_CLOCK_DISPLAY: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
