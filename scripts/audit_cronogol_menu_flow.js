#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
const state={rules:"",rival:"",rivalLocked:true,canStart:false};
a(state.rules==="","sin reglas por defecto");
a(state.rival==="","sin rival por defecto");
a(state.rivalLocked===true,"rival debe estar bloqueado por defecto");
state.rival="local";
if(state.rivalLocked) state.rival="";
a(state.rival==="","no debe poder seleccionar rival antes de reglas");
state.rules="five";state.rivalLocked=false;
a(state.rivalLocked===false,"rival se desbloquea al elegir reglas");
a(state.canStart===false,"no empieza solo con reglas");
state.rival="online";state.canStart=!!(state.rules&&state.rival);
a(state.canStart===true,"empieza solo con reglas+rival");
a(state.rules==="five"&&state.rival==="online","reglas aplican a online");
console.log(`AUDITORIA_CRONOGOL_MENU_FLOW: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
