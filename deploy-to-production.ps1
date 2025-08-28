# ===================================================================
# Frontend Deployment Script - Development to Production
# ===================================================================
# This script automates the deployment of tested features from the 
# development repo (Gogulancode) to production repo (BabajiShivram)
# ===================================================================

param(
    [Parameter(Mandatory=$true)]
    [string]$CommitMessage,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipLocalCommit,
    
    [Parameter(Mandatory=$false)]
    [switch]$TestMode
)

# Configuration
$DEV_REPO_PATH = "D:\LT-India-frontend"
$PROD_REPO_PATH = "D:\LiveTracking_India_Version_2.0"
$FRONTEND_PATH = "$PROD_REPO_PATH\frontend"

Write-Host "Frontend Deployment Script" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host "Dev Repo: $DEV_REPO_PATH" -ForegroundColor Cyan
Write-Host "Prod Repo: $PROD_REPO_PATH" -ForegroundColor Cyan
Write-Host "Commit Message: $CommitMessage" -ForegroundColor Yellow
Write-Host ""

# Function to check if a directory exists
function Test-Directory {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        Write-Host "Error: Directory not found: $Path" -ForegroundColor Red
        exit 1
    }
}

# Function to run git command safely
function Invoke-GitCommand {
    param([string]$Command, [string]$WorkingDir)
    
    Push-Location $WorkingDir
    try {
        Write-Host "Running: git $Command" -ForegroundColor Blue
        Invoke-Expression "git $Command"
        if ($LASTEXITCODE -ne 0) {
            throw "Git command failed with exit code $LASTEXITCODE"
        }
    }
    catch {
        Write-Host "Git command failed: $_" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    finally {
        Pop-Location
    }
}

# Validate directories
Write-Host "Validating directories..." -ForegroundColor Blue
Test-Directory $DEV_REPO_PATH
Test-Directory $PROD_REPO_PATH

# Step 1: Commit to Development Repository (if not skipped)
if (-not $SkipLocalCommit) {
    Write-Host ""
    Write-Host "Step 1: Committing to Development Repository" -ForegroundColor Green
    Write-Host "===============================================" -ForegroundColor Green
    
    Push-Location $DEV_REPO_PATH
    try {
        # Check if there are changes to commit
        $gitStatus = git status --porcelain
        if ($gitStatus) {
            Write-Host "Changes detected, committing to development repo..." -ForegroundColor Yellow
            Invoke-GitCommand "add ." $DEV_REPO_PATH
            Invoke-GitCommand "commit -m `"$CommitMessage`"" $DEV_REPO_PATH
            
            if (-not $TestMode) {
                Invoke-GitCommand "push origin main" $DEV_REPO_PATH
                Write-Host "Development repo updated successfully!" -ForegroundColor Green
            } else {
                Write-Host "TEST MODE: Skipping push to development repo" -ForegroundColor Yellow
            }
        } else {
            Write-Host "No changes detected in development repo" -ForegroundColor Yellow
        }
    }
    finally {
        Pop-Location
    }
} else {
    Write-Host "Skipping development repo commit (--SkipLocalCommit flag used)" -ForegroundColor Yellow
}

# Step 2: Copy Files to Production Repository
Write-Host ""
Write-Host "Step 2: Copying Files to Production Repository" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Remove existing frontend content (except .git if it exists)
if (Test-Path $FRONTEND_PATH) {
    Write-Host "Cleaning existing frontend directory..." -ForegroundColor Blue
    Get-ChildItem $FRONTEND_PATH -Exclude ".git" | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
}

# Copy all files from development to production frontend folder
Write-Host "Copying files from development to production..." -ForegroundColor Blue
Copy-Item "$DEV_REPO_PATH\*" $FRONTEND_PATH -Recurse -Force -Exclude ".git"

# Clean up unnecessary folders in production
Write-Host "Cleaning up build artifacts..." -ForegroundColor Blue
$foldersToRemove = @("node_modules", "dist", ".angular", ".nx")
foreach ($folder in $foldersToRemove) {
    $folderPath = Join-Path $FRONTEND_PATH $folder
    if (Test-Path $folderPath) {
        Remove-Item $folderPath -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "   Removed: $folder" -ForegroundColor Gray
    }
}

Write-Host "Files copied successfully!" -ForegroundColor Green

# Step 3: Commit to Production Repository
Write-Host ""
Write-Host "Step 3: Committing to Production Repository" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

Push-Location $PROD_REPO_PATH
try {
    # Check if there are changes to commit
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "Changes detected, committing to production repo..." -ForegroundColor Yellow
        
        $prodCommitMessage = "feat(frontend): $CommitMessage"
        
        Invoke-GitCommand "add ." $PROD_REPO_PATH
        Invoke-GitCommand "commit -m `"$prodCommitMessage`"" $PROD_REPO_PATH
        
        if (-not $TestMode) {
            Invoke-GitCommand "push origin main" $PROD_REPO_PATH
            Write-Host "Production repo updated successfully!" -ForegroundColor Green
        } else {
            Write-Host "TEST MODE: Skipping push to production repo" -ForegroundColor Yellow
        }
    } else {
        Write-Host "No changes detected in production repo" -ForegroundColor Yellow
    }
}
finally {
    Pop-Location
}

# Step 4: Summary
Write-Host ""
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host "Development repo: Committed and pushed" -ForegroundColor Green
Write-Host "Production repo: Frontend updated and pushed" -ForegroundColor Green
Write-Host "Clean deployment with no build artifacts" -ForegroundColor Green

if ($TestMode) {
    Write-Host ""
    Write-Host "TEST MODE was enabled - no actual pushes were made" -ForegroundColor Yellow
    Write-Host "Run without -TestMode to execute the full deployment" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Repository Status:" -ForegroundColor Cyan
Write-Host "Dev:  https://github.com/Gogulancode/LT-India-frontend" -ForegroundColor Gray
Write-Host "Prod: https://github.com/Babaji-Shivram/LiveTracking_India_Version_2.0/tree/main/frontend" -ForegroundColor Gray
Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Green
