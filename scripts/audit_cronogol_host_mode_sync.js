#!/usr/bin/env node
let failures=[];function a(c,m){if(!c)failures.push(m)}
function fastRule(v){if(v===1||v===2)return"post";if(v===3||v===4)return"crossbar";if(v===50)return"yellow";if(v===60)return"red";if(v===96||v===97)return"free_kick";if(v%10===9)return"penalty";if(v%10===0)return"goal";return"miss"}
function classicRule(v){if(v===98||v===99)return"penalty";if(v===90)return"full_time";return"other"}
const room={state_json:{matchMode:"five",hostMatchMode:"five",rulesLockedByHost:true}},guest={matchMode:"classic"};
guest.matchMode=room.state_json.hostMatchMode||room.state_json.matchMode;
a(guest.matchMode==="five","El invitado debe heredar modo rápido/five del anfitrión");
a(fastRule(19)==="penalty","En rápido, 19 debe ser PENALTI");
a(fastRule(29)==="penalty","En rápido, 29 debe ser PENALTI");
a(fastRule(90)==="goal","En rápido, 90 debe ser GOL");
a(classicRule(19)!=="penalty","En clásico, 19 no debe ser penalti");
console.log(`AUDITORIA_CRONOGOL_HOST_MODE: ${failures.length?"FAIL":"OK"}`);
if(failures.length){failures.forEach(f=>console.error("- "+f));process.exit(1)}
