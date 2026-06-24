#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const root = process.cwd();
const game = fs.readFileSync(path.join(root, "game.js"), "utf8");
let failures = [];
function a(cond,msg){ if(!cond) failures.push(msg); }

a(game.includes("function evaluateThrowOfficial(v, mode)"), "Debe existir evaluateThrowOfficial(v, mode)");
a(game.includes('function evaluateFastThrow(v) {\n  return evaluateThrowOfficial(v, "five");\n}'), "evaluateFastThrow debe delegar en evaluateThrowOfficial");
a(game.includes("function evaluateThrow(v){\n  return evaluateThrowOfficial(v, gameState && gameState.matchMode);\n}"), "evaluateThrow debe delegar en evaluateThrowOfficial");
a(game.includes("const r = typeof evaluateThrowOfficial"), "officialEvent debe delegar en evaluateThrowOfficial");
a(game.includes("evaluateThrowOfficial,"), "CronoGolDeterministicOnlineClock debe exponer evaluateThrowOfficial");
a(game.includes('const VERSION="2.7.0"'), "Bloque online debe declarar VERSION 2.7.0");
a(!game.includes("n%11===0"), "officialEvent ya no debe usar regla clásica n%11===0");

const requiredClassic = [
  'if (n === 0) return {type:"goal"',
  'if (n === 45) return {type:"half_time"',
  'if (n === 90) return {type:"full_time"',
  'if (n === 98 || n === 99) return {type:"penalty"'
];
for (const snippet of requiredClassic) a(game.includes(snippet), "Regla clásica esperada: " + snippet);

const requiredFast = [
  'if (n === 50) return {type:"yellow"',
  'if (n === 60) return {type:"red"',
  'if (n % 10 === 0) return {type:"goal"',
  'if (n % 10 === 9) return {type:"penalty"'
];
for (const snippet of requiredFast) a(game.includes(snippet), "Regla rápida esperada: " + snippet);

console.log(`AUDITORIA_CRONOGOL_UNIFIED_EVENT_RULES: ${failures.length ? "FAIL" : "OK"}`);
if(failures.length){
  failures.forEach((f)=>console.error("- " + f));
  process.exit(1);
}
