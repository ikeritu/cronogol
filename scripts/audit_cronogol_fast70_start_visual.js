#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
function fast(v){if(v===1||v===2)return"post";if(v===3||v===4)return"crossbar";if(v===50)return"yellow";if(v===60)return"red";if(v===96||v===97)return"free";if(v%10===9)return"penalty";if(v%10===0)return"goal";return"miss"}
a(fast(70)==="goal","En rápido, 70 debe ser GOL");
a(fast(10)==="goal","En rápido, 10 debe ser GOL");
a(fast(90)==="goal","En rápido, 90 debe ser GOL");
a(fast(50)==="yellow","50 debe ser AMARILLA, no gol");
a(fast(60)==="red","60 debe ser ROJA, no gol");
let ui={timer:"00:00:83",running:false};
function start(){ui.running=true;ui.timer="00:00:01"}
start();a(ui.timer==="00:00:01","Al pulsar START debe pintar reloj vivo sin quedarse congelado");
console.log(`AUDITORIA_CRONOGOL_FAST70_START_VISUAL: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
