param([string]$ProjectPath = ".")
Write-Host "============================================="
Write-Host " Autoauditoría CronoGol"
Write-Host "============================================="
Write-Host "Proyecto: $ProjectPath"
Push-Location $ProjectPath
try {
  foreach ($s in @("audit_cronogol_deterministic_clock.js","audit_cronogol_stop_event_consistency.js","audit_cronogol_single_clock_painter.js","audit_cronogol_realtime_sync.js")) {
    $p = ".\scripts\$s"
    if (Test-Path $p) { node $p; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE } }
  }
  Write-Host "AUDITORÍA CRONOGOL: OK" -ForegroundColor Green
}
finally { Pop-Location }
