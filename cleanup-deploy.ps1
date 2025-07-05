# Simplified cleanup script for deployment

Write-Host "Starting cleanup process..." -ForegroundColor Cyan

# Remove Firebase file (now using Supabase)
if (Test-Path "lib\firebase.ts") {
    Write-Host "Removing firebase.ts..." -ForegroundColor Yellow
    Remove-Item "lib\firebase.ts" -Force
}

# Remove Firebase from package.json
if (Test-Path "package.json") {
    Write-Host "Updating package.json..." -ForegroundColor Cyan
    $json = Get-Content "package.json" -Raw | ConvertFrom-Json
    
    # Remove firebase from dependencies if it exists
    if ($json.dependencies.firebase) {
        $json.dependencies.PSObject.Properties.Remove("firebase")
        $jsonString = $json | ConvertTo-Json -Depth 10
        Set-Content -Path "package.json" -Value $jsonString
        Write-Host "Removed Firebase dependency from package.json" -ForegroundColor Green
    }
}

# Clean up build artifacts
if (Test-Path ".next") {
    Write-Host "Removing .next build directory..." -ForegroundColor Yellow
    Remove-Item ".next" -Recurse -Force
}

Write-Host "Cleanup complete! Your project is ready for deployment." -ForegroundColor Green
