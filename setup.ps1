# This script sets up the entire Abibas project with Supabase, AI image generation, and dependencies

# Load environment variables
if (Test-Path .env.local) {
    Get-Content .env.local | ForEach-Object {
        if (-not ($_.StartsWith('#')) -and $_.Trim()) {
            $key, $value = $_ -split '=', 2
            [Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
        }
    }
    Write-Host "✅ Loaded environment variables from .env.local" -ForegroundColor Green
} else {
    Write-Host "⚠️ No .env.local file found. Please create one based on .env.example" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "📦 Installing project dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error installing dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Check if Supabase credentials are set
if (-not $env:NEXT_PUBLIC_SUPABASE_URL -or -not $env:NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    Write-Host "❌ Supabase credentials not found in environment variables." -ForegroundColor Red
    Write-Host "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local" -ForegroundColor Red
    exit 1
}

# Initialize Supabase database
Write-Host "🗄️ Initializing Supabase database..." -ForegroundColor Cyan
node scripts/initSupabase.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error initializing Supabase database" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Supabase database initialized successfully" -ForegroundColor Green

# Check if Replicate API token is set
if (-not $env:REPLICATE_API_TOKEN) {
    Write-Host "⚠️ Replicate API token not found. Skipping image generation." -ForegroundColor Yellow
    Write-Host "To generate AI images, set REPLICATE_API_TOKEN in .env.local and run 'npm run generate:images'" -ForegroundColor Yellow
} else {
    # Generate AI product images
    Write-Host "🎨 Generating AI product images (this may take a few minutes)..." -ForegroundColor Cyan
    node scripts/generateProductImages.js
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error generating product images" -ForegroundColor Red
    } else {
        Write-Host "✅ AI product images generated successfully" -ForegroundColor Green
    }
}

# Start development server
Write-Host "🚀 Setup complete! Starting development server..." -ForegroundColor Cyan
Write-Host "The admin dashboard will be available at: http://localhost:3000/admin" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow

npm run dev
