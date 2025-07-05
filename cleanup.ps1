# Cleanup script for Abibas project deployment preparation

Write-Host "🧹 Starting cleanup process for deployment..." -ForegroundColor Cyan

# List of files to remove
$filesToRemove = @(
    # Firebase file (now using Supabase)
    "lib/firebase.ts",
    
    # Any log files
    "*.log",
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
    
    # Any temporary files that may have been created
    "**/*.tmp",
    "**/*.bak",
    "**/Thumbs.db",
    "**/.DS_Store"
)

# Remove specific files
foreach ($file in $filesToRemove) {
    $files = Get-ChildItem -Path $file -ErrorAction SilentlyContinue
    if ($files) {
        foreach ($f in $files) {
            Write-Host "🗑️ Removing file: $($f.FullName)" -ForegroundColor Yellow
            Remove-Item $f.FullName -Force
        }
    }
}

# Remove any empty directories (recursive)
function Remove-EmptyDirectories {
    $dirs = Get-ChildItem -Directory -Recurse
    $dirsRemoved = 0
    
    foreach ($dir in $dirs) {
        $items = Get-ChildItem -Path $dir.FullName -Recurse -Force
        if ($items.Count -eq 0) {
            Write-Host "🗑️ Removing empty directory: $($dir.FullName)" -ForegroundColor Yellow
            Remove-Item $dir.FullName -Force
            $dirsRemoved++
        }
    }
    
    return $dirsRemoved
}

$removedDirs = Remove-EmptyDirectories

# Remove unused dependencies from package.json
Write-Host "📦 Checking for unused dependencies in package.json..." -ForegroundColor Cyan

# Clean build artifacts
if (Test-Path ".next") {
    Write-Host "🧹 Removing .next build directory..." -ForegroundColor Yellow
    Remove-Item ".next" -Recurse -Force
}

if (Test-Path "node_modules") {
    Write-Host "🧹 Removing node_modules (will be reinstalled)..." -ForegroundColor Yellow
    Remove-Item "node_modules" -Recurse -Force
}

# Fix package.json - remove firebase if it exists
if (Test-Path "package.json") {
    Write-Host "📝 Updating package.json to remove unused dependencies..." -ForegroundColor Cyan
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    # Create a PSCustomObject to store the modified dependencies
    $updatedDependencies = [PSCustomObject]@{}
    
    # Add all dependencies except firebase
    foreach ($prop in $packageJson.dependencies.PSObject.Properties) {
        if ($prop.Name -ne "firebase") {
            $updatedDependencies | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value
        }
    }
    
    # Replace the dependencies with the updated ones
    $packageJson.dependencies = $updatedDependencies
    
    # Convert back to JSON and save
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
}

# Clean install dependencies
Write-Host "📦 Reinstalling dependencies..." -ForegroundColor Cyan
npm ci

# Build project
Write-Host "🏗️ Building project..." -ForegroundColor Cyan
npm run build

Write-Host "✅ Cleanup complete! Project is ready for deployment." -ForegroundColor Green
Write-Host "To deploy to Vercel, run: vercel" -ForegroundColor Cyan
Write-Host "To deploy to Netlify, run: netlify deploy" -ForegroundColor Cyan
