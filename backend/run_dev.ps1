$ErrorActionPreference = "Stop"

Write-Host "Creating virtual environment..." -ForegroundColor Cyan
if (!(Test-Path .venv)) { python -m venv .venv }

Write-Host "Activating virtual environment..." -ForegroundColor Cyan
& .\.venv\Scripts\Activate.ps1

Write-Host "Installing dependencies..." -ForegroundColor Cyan
pip install -U pip
pip install -r requirements.txt

Write-Host "Starting FastAPI server on http://127.0.0.1:8000" -ForegroundColor Green
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000


