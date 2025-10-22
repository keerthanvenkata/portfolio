$ErrorActionPreference = "Stop"

Write-Host "Installing frontend dependencies (this may take a moment)..." -ForegroundColor Cyan
if (!(Test-Path node_modules)) { npm install }

Write-Host "Starting Vite dev server on http://127.0.0.1:5173" -ForegroundColor Green
npm run dev


