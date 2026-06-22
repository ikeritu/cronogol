#!/usr/bin/env node
const fs=require("fs"), path=require("path");
const game=fs.readFileSync(path.join(process.cwd(),"game.js"),"utf8");
let f=[];function a(c,m){if(!c)f.push(m)}
a(game.includes("CRONOGOL_DISABLE_LEGACY_ONLINE_PATCHES = true"),"Legacy online patch gate must be enabled");
a(game.includes("CronoGolOnlineCore=Object.freeze"),"New CronoGolOnlineCore must exist");
a(game.includes("publishRunning"),"Core must publish runningState once on START");
a(game.includes("publishStop"),"Core must publish authoritative STOP");
a(game.includes("paintRemoteRunning"),"Core must paint RUNNING_REMOTE locally");
a(game.includes("state_json"),"Core must use state_json");
const disabled=(game.match(/__cronogolLegacyDisabled\.push/g)||[]).length;
a(disabled>=10,"At least 10 legacy online blocks should be gated");
console.log(`AUDITORIA_CRONOGOL_ONLINE_CORE_REFACTOR: ${f.length?"FAIL":"OK"}`);
if(f.length){f.forEach(x=>console.error("- "+x));process.exit(1)}
