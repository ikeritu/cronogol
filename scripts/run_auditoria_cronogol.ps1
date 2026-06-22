param([string]$ProjectPath = ".")
Write-Host "============================================="
Write-Host " Autoauditoría CronoGol"
Write-Host "============================================="
Write-Host "Proyecto: $ProjectPath"
Push-Location $ProjectPath
try {
  foreach ($s in @("audit_cronogol_rules.js","audit_cronogol_online_flow.js","audit_cronogol_host_mode_sync.js","audit_cronogol_menu_flow.js","audit_cronogol_online_clock_finish.js","audit_cronogol_clock_display_fix.js","audit_cronogol_last_throw_time_freeze.js","audit_cronogol_stop_time_sync.js","audit_cronogol_fast70_start_visual.js","audit_cronogol_remote_stop_paint_timer_smoothing.js","audit_cronogol_monotonic_timer_guard.js","audit_cronogol_display_ownership.js","audit_cronogol_online_display_cleanup.js","audit_cronogol_online_turn_authority.js","audit_cronogol_running_remote_display.js","audit_cronogol_display_single_owner.js","audit_cronogol_online_core_refactor.js","audit_cronogol_sw_assets.js","audit_cronogol_supabase_schema_consistency.js")) {
    $p = ".\scripts\$s"
    if (Test-Path $p) {
      node $p
      if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
  }
  Write-Host "AUDITORÍA CRONOGOL: OK" -ForegroundColor Green
}
finally { Pop-Location }
