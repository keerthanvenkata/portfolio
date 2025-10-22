$ErrorActionPreference = "Stop"

Write-Host "Starting backend and frontend in separate PowerShell windows..." -ForegroundColor Cyan

if (!(Test-Path .\backend)) { throw "backend directory not found" }
if (!(Test-Path .\frontend)) { throw "frontend directory not found" }

Start-Process powershell -ArgumentList "-NoExit","-Command","cd backend; ./run_dev.ps1"
Start-Process powershell -ArgumentList "-NoExit","-Command","cd frontend; ./run_dev.ps1"

Write-Host "Launched. Backend: http://127.0.0.1:8000  Frontend: http://127.0.0.1:5173" -ForegroundColor Green


