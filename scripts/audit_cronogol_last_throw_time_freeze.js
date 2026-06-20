#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
let ui={timer:"00:00:00",lastTwo:"--",running:false,waiting:true};
let lastThrow=null;
function throwV(v){lastThrow={valueText:String(v).padStart(2,"0"),displayTime:`00:00:${String(v).padStart(2,"0")}`};ui.timer=lastThrow.displayTime;ui.lastTwo=lastThrow.valueText}
function remoteClock(t){ui.timer=t}
function restore(){if(!ui.running&&ui.waiting&&lastThrow){ui.timer=lastThrow.displayTime;ui.lastTwo=lastThrow.valueText}}
throwV(91);remoteClock("00:00:01");restore();a(ui.timer==="00:00:91","Al esperar turno debe conservar tiempo de tirada 91, no 01");a(ui.lastTwo==="91","Número inferior conserva 91");
throwV(31);remoteClock("00:00:02");restore();a(ui.timer==="00:00:31","Al esperar turno debe conservar tiempo de tirada 31, no 02");a(ui.lastTwo==="31","Número inferior conserva 31");
console.log(`AUDITORIA_CRONOGOL_LAST_THROW_TIME: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
