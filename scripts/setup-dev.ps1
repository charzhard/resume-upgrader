# 🚀 Resume Upgrader — Dev Setup Script
# --------------------------------------
# This PowerShell script automates the local setup and run process.
# Usage:
#   ./scripts/setup-dev.ps1

Write-Host "🔧 Setting up Resume Upgrader local environment..." -ForegroundColor Cyan

# Step 1️⃣ — Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found. Please install Node.js (https://nodejs.org) and re-run this script." -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ Node.js found: $(node -v)" -ForegroundColor Green
}

# Step 2️⃣ — Check npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm not found. Please install npm and re-run this script." -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ npm found: $(npm -v)" -ForegroundColor Green
}

# Step 3️⃣ — Install dependencies
Write-Host "📦 Installing npm dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully." -ForegroundColor Green

# Step 4️⃣ — Create .env.local if missing
$envPath = ".env.local"

if (-not (Test-Path $envPath)) {
    Write-Host "⚙️ Creating .env.local file..." -ForegroundColor Cyan
    @"
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_API_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
"@ | Out-File -FilePath $envPath -Encoding utf8

    Write-Host "✅ .env.local created successfully." -ForegroundColor Green
} else {
    Write-Host "ℹ️ .env.local already exists — skipping creation." -ForegroundColor Yellow
}

# Step 5️⃣ — Run local dev server
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
npm run dev
