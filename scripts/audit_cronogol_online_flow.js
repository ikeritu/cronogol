#!/usr/bin/env node
/*
CronoGol v2.5.7 — Autoauditoría de flujo online simulado

No usa Supabase real ni navegador.
Simula host/invitado, turnos, marcador, última tirada y sanciones.
*/

const fs = require("fs");
const path = require("path");

function pad(n){ return String(n).padStart(2, "0"); }

function fastRule(v){
  if(v === 1 || v === 2) return {type:"post", title:"POSTE", repeat:true};
  if(v === 3 || v === 4) return {type:"crossbar", title:"LARGUERO", repeat:true};
  if(v === 50) return {type:"yellow", title:"AMARILLA", changeTurn:true, skip:1};
  if(v === 60) return {type:"red", title:"ROJA", changeTurn:true, skip:2};
  if(v === 96 || v === 97) return {type:"free_kick", title:"FALTA PELIGROSA", special:true};
  if(v % 10 === 9) return {type:"penalty", title:"PENALTI", special:true};
  if(v % 10 === 0) return {type:"goal", title:"GOL", changeTurn:true, goals:1};
  return {type:"miss", title:"FALLO", changeTurn:true};
}

function classicRule(v){
  if(v === 0) return {type:"goal", title:"GOL", changeTurn:true, goals:1};
  if(v === 1 || v === 2) return {type:"post", title:"POSTE", repeat:true};
  if(v === 3 || v === 4) return {type:"crossbar", title:"LARGUERO", repeat:true};
  if(v === 45) return {type:"half_time", title:"DESCANSO", changeTurn:true};
  if(v === 50) return {type:"yellow", title:"AMARILLA", changeTurn:true, skip:1};
  if(v === 60) return {type:"red", title:"ROJA", changeTurn:true, skip:2};
  if(v === 90) return {type:"full_time", title:"FINAL"};
  if(v === 96 || v === 97) return {type:"free_kick", title:"FALTA PELIGROSA", special:true};
  if(v === 98 || v === 99) return {type:"penalty", title:"PENALTI", special:true};
  return {type:"miss", title:"FALLO", changeTurn:true};
}

function makeInitialRoom(matchMode="fast"){
  return {
    status: "playing",
    state_json: {
      phase: "playing",
      gameMode: "online",
      matchMode,
      currentPlayerIndex: 0,
      players: [
        {index:0, name:"Iker", goals:0, skipTurns:0},
        {index:1, name:"ikeritus", goals:0, skipTurns:0}
      ],
      score: [0,0],
      lastThrow: null,
      events: []
    }
  };
}

function applySkips(state, rows){
  let guard = 0;
  while(state.players[state.currentPlayerIndex].skipTurns > 0 && guard < 8){
    const p = state.players[state.currentPlayerIndex];
    p.skipTurns -= 1;
    rows.push({
      kind: "skip",
      actor: p.name,
      value: "--",
      title: "SANCIÓN",
      message: `${p.name} pierde turno por sanción`,
      score: `${state.score[0]}-${state.score[1]}`,
      turnAfter: state.players[state.currentPlayerIndex === 0 ? 1 : 0].name,
      skipTurns: state.players.map(x=>x.skipTurns).join("/")
    });
    state.currentPlayerIndex = state.currentPlayerIndex === 0 ? 1 : 0;
    guard++;
  }
}

function applyThrow(room, value, rows, mode="fast", specialValue=null){
  const state = room.state_json;
  const rule = mode === "fast" ? fastRule(value) : classicRule(value);
  const actorIndex = state.currentPlayerIndex;
  const actor = state.players[actorIndex];

  let finalRule = rule;
  let visibleValue = value;

  if(rule.goals) actor.goals += rule.goals;
  if(rule.skip) actor.skipTurns += rule.skip;

  if(rule.special && specialValue !== null){
    visibleValue = specialValue;
    if(rule.type === "penalty"){
      if(specialValue % 2 === 0){
        actor.goals += 1;
        finalRule = {type:"penalty_goal", title:"GOL DE PENALTI", changeTurn:true};
      }else{
        finalRule = {type:"penalty_miss", title:"PENALTI FALLADO", changeTurn:true};
      }
    }else if(rule.type === "free_kick"){
      if(specialValue >= 0 && specialValue <= 20){
        actor.goals += 1;
        finalRule = {type:"free_kick_goal", title:"GOL DE FALTA", changeTurn:true};
      }else{
        finalRule = {type:"free_kick_miss", title:"FALTA FALLADA", changeTurn:true};
      }
    }
  }

  state.score = [state.players[0].goals, state.players[1].goals];

  if(finalRule.changeTurn){
    state.currentPlayerIndex = actorIndex === 0 ? 1 : 0;
    applySkips(state, rows);
  }

  const lastThrow = {
    id: `audit-${rows.length + 1}`,
    kind: rule.special ? "special" : "normal",
    value: visibleValue,
    valueText: pad(visibleValue),
    actorIndex,
    actorName: actor.name,
    title: finalRule.title,
    message: `${actor.name} sacó ${pad(visibleValue)} → ${finalRule.title}`,
    eventClass: finalRule.type.includes("goal") || finalRule.type === "goal" ? "event-goal" : finalRule.type === "red" ? "event-red" : finalRule.type === "yellow" ? "event-yellow" : "event-neutral",
    createdAt: new Date().toISOString()
  };
  state.lastThrow = lastThrow;
  state.events.push(lastThrow);

  rows.push({
    kind: "throw",
    actor: actor.name,
    value: pad(visibleValue),
    title: finalRule.title,
    message: lastThrow.message,
    score: `${state.score[0]}-${state.score[1]}`,
    turnAfter: state.players[state.currentPlayerIndex].name,
    skipTurns: state.players.map(x=>x.skipTurns).join("/")
  });

  return lastThrow;
}

function assert(cond, msg, failures){
  if(!cond) failures.push(msg);
}

function runScenario(){
  const failures = [];
  const rows = [];
  const room = makeInitialRoom("fast");
  const state = room.state_json;

  assert(state.currentPlayerIndex === 0, "El turno inicial debe ser del host/Iker", failures);

  // 1) Host marca con 10. Turno invitado.
  applyThrow(room, 10, rows, "fast");
  assert(state.score[0] === 1 && state.score[1] === 0, "Tras 10, Iker debe tener 1 gol", failures);
  assert(state.currentPlayerIndex === 1, "Tras gol de Iker debe tocar ikeritus", failures);
  assert(state.lastThrow.message === "Iker sacó 10 → GOL", "lastThrow limpio tras gol", failures);

  // 2) Invitado falla con 61. Turno host.
  applyThrow(room, 61, rows, "fast");
  assert(state.currentPlayerIndex === 0, "Tras fallo de ikeritus debe tocar Iker", failures);
  assert(state.lastThrow.message === "ikeritus sacó 61 → FALLO", "lastThrow limpio tras fallo", failures);

  // 3) Host saca roja 60. Debe pasar a invitado y host queda con 2 skips.
  applyThrow(room, 60, rows, "fast");
  assert(state.players[0].skipTurns === 2, "Iker debe quedar con 2 turnos de sanción tras roja", failures);
  assert(state.currentPlayerIndex === 1, "Tras roja de Iker debe tocar ikeritus", failures);

  // 4) Invitado falla. Al volver turno a host, host salta 1 turno y vuelve invitado.
  applyThrow(room, 62, rows, "fast");
  assert(state.players[0].skipTurns === 1, "Iker debe consumir el primer turno de roja", failures);
  assert(state.currentPlayerIndex === 1, "Tras consumir primer skip de roja debe seguir ikeritus", failures);

  // 5) Invitado falla otra vez. Host consume segundo skip y sigue invitado.
  applyThrow(room, 63, rows, "fast");
  assert(state.players[0].skipTurns === 0, "Iker debe consumir el segundo turno de roja", failures);
  assert(state.currentPlayerIndex === 1, "Tras consumir segundo skip de roja debe seguir ikeritus", failures);

  // 6) Invitado saca penalti 29 y luego 21, fallado.
  applyThrow(room, 29, rows, "fast", 21);
  assert(state.score[0] === 1 && state.score[1] === 0, "Penalti fallado no debe cambiar marcador", failures);
  assert(state.lastThrow.title === "PENALTI FALLADO", "Debe quedar PENALTI FALLADO", failures);

  // 7) Host tira falta peligrosa 96 y especial 12, gol de falta.
  // Como tras penalti fallado cambia turno al host.
  assert(state.currentPlayerIndex === 0, "Tras penalti fallado debe tocar Iker", failures);
  applyThrow(room, 96, rows, "fast", 12);
  assert(state.score[0] === 2, "Gol de falta de Iker debe subir marcador a 2", failures);
  assert(state.lastThrow.title === "GOL DE FALTA", "Debe quedar GOL DE FALTA", failures);

  return {ok: failures.length === 0, failures, rows, finalState: state};
}

function writeReports(result){
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g,"").replace(/\..+/,"").replace("T","_");
  const dir = path.join(process.cwd(), "auditorias", stamp + "_online");
  fs.mkdirSync(dir, {recursive:true});

  fs.writeFileSync(path.join(dir, "auditoria_cronogol_online_flow.json"), JSON.stringify({
    generatedAt: now.toISOString(),
    ok: result.ok,
    failures: result.failures,
    rows: result.rows,
    finalState: result.finalState
  }, null, 2), "utf8");

  const table = [
    "| # | Tipo | Actor | Tirada | Resultado | Mensaje | Marcador | Turno después | Skips |",
    "|---:|---|---|---:|---|---|---|---|---|",
    ...result.rows.map((r,i)=>`| ${i+1} | ${r.kind} | ${r.actor} | ${r.value} | ${r.title} | ${r.message} | ${r.score} | ${r.turnAfter} | ${r.skipTurns} |`)
  ];

  const md = [
    "# Autoauditoría CronoGol — flujo online simulado",
    "",
    `Fecha: ${now.toISOString()}`,
    "",
    `Resultado: **${result.ok ? "OK" : "FAIL"}**`,
    "",
    "## Secuencia simulada",
    "",
    ...table,
    "",
    "## Estado final",
    "",
    "```json",
    JSON.stringify(result.finalState, null, 2),
    "```",
    "",
    "## Fallos",
    ...(result.failures.length ? result.failures.map(f=>`- ${f}`) : ["- Ninguno"])
  ].join("\n");

  fs.writeFileSync(path.join(dir, "auditoria_cronogol_online_flow.md"), md, "utf8");
  return dir;
}

const result = runScenario();
const dir = writeReports(result);
console.log(`AUDITORIA_CRONOGOL_ONLINE: ${result.ok ? "OK" : "FAIL"}`);
console.log(`Salida: ${dir}`);
if(!result.ok){
  result.failures.forEach(f=>console.error(`- ${f}`));
  process.exit(1);
}
