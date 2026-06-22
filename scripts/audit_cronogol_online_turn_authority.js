#!/usr/bin/env node
let f=[];function a(c,m){if(!c)f.push(m)}function canStart(remoteTurn,local){return Number(remoteTurn)===Number(local)}
a(canStart(0,0),"J1 puede iniciar si remoteTurn=0");a(!canStart(0,1),"J2 no puede iniciar si remoteTurn=0");a(!canStart(1,0),"J1 no puede repetir si remoteTurn=1");a(canStart(1,1),"J2 puede iniciar si remoteTurn=1");
console.log(`AUDITORIA_CRONOGOL_ONLINE_TURN_AUTHORITY: ${f.length?"FAIL":"OK"}`);if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
