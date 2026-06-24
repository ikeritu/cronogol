#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

let failures = [];
function a(cond, msg) { if (!cond) failures.push(msg); }

a(sw.includes('CACHE_NAME = "cronogol-v2.7.0"'), "sw.js debe usar CACHE_NAME v2.7.0");
a(!sw.includes("./logo-cronogol.png"), "sw.js no debe cachear logo-cronogol.png inexistente");
a(sw.includes("Promise.allSettled"), "sw.js debe evitar cache.addAll atómico");
a(sw.includes("ignoreSearch: true"), "sw.js debe ignorar query strings en cache match");
a(sw.includes("console.warn"), "sw.js no debe tragar errores en silencio");

const expected = [
  "index.html",
  "style.css",
  "game.js",
  "online-foundation.js",
  "favicon.png",
  "favicon.svg",
  "logo-cronogol-new.png",
  "logo-cronogol-horizontal.png",
  "logo-cronogol-transparent.png",
  "og-cronogol.png"
];

for (const asset of expected) {
  a(fs.existsSync(path.join(root, asset)), `Asset referenciado existe: ${asset}`);
  a(sw.includes(`./${asset}`), `sw.js incluye ${asset}`);
}

console.log(`AUDITORIA_CRONOGOL_SW_ASSETS: ${failures.length ? "FAIL" : "OK"}`);
if (failures.length) {
  failures.forEach((f) => console.error("- " + f));
  process.exit(1);
}
