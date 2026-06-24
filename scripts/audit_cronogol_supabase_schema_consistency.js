#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const setup = fs.readFileSync(path.join(root, "SUPABASE_PRIVATE_ROOMS_SETUP.sql"), "utf8");
const migration = fs.readFileSync(path.join(root, "SUPABASE_SCHEMA_v2_6_8.sql"), "utf8");

let failures = [];
function a(cond, msg) { if (!cond) failures.push(msg); }

a(setup.includes("state_json jsonb"), "El SQL principal debe crear state_json jsonb");
a(setup.includes("app_version text"), "El SQL principal debe crear app_version text");
a(setup.includes("last_seen_at timestamptz"), "El SQL principal debe crear last_seen_at timestamptz");
a(setup.includes("add column if not exists state_json"), "El SQL principal debe incluir migración idempotente state_json");
a(setup.includes("room_state"), "El SQL principal debe migrar desde room_state antigua");
a(!/^\s*room_state\s+jsonb\s+not\s+null\s+default/m.test(setup), "El SQL principal no debe crear room_state como columna oficial");
a(migration.includes("add column if not exists state_json"), "La migración v2.6.8 debe añadir state_json");
a(migration.includes("add column if not exists app_version"), "La migración v2.6.8 debe añadir app_version");
a(migration.includes("add column if not exists last_seen_at"), "La migración v2.6.8 debe añadir last_seen_at");

console.log(`AUDITORIA_CRONOGOL_SUPABASE_SCHEMA_CONSISTENCY: ${failures.length ? "FAIL" : "OK"}`);
if (failures.length) {
  failures.forEach((f) => console.error("- " + f));
  process.exit(1);
}
