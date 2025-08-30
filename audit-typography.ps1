# Typography Standardization Script
# This script helps identify and fix typography inconsistencies

Write-Host "LT India ERP - Typography Audit Tool" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Method 1: Find all manual Tailwind typography classes
Write-Host ""
Write-Host "Method 1: Searching for Manual Tailwind Typography Classes..." -ForegroundColor Yellow

$manualTypographyPattern = "text-(xs|sm|base|lg|xl|2xl|3xl)|font-size:"
$tsFiles = Get-ChildItem -Path "src" -Recurse -Include "*.ts" | Where-Object { $_.Name -notmatch "\.spec\.ts$" }

Write-Host "Found $($tsFiles.Count) TypeScript files to check" -ForegroundColor Gray

$violationFiles = @()
foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match $manualTypographyPattern) {
        $violations = ([regex]::Matches($content, $manualTypographyPattern)).Count
        $violationFiles += [PSCustomObject]@{
            File = $file.FullName.Replace("$PWD\", "")
            Violations = $violations
            Type = if ($file.Directory.Name -match "role|user|identity") { "CRITICAL" } 
                   elseif ($file.Directory.Name -match "master|form") { "HIGH" }
                   else { "MEDIUM" }
        }
    }
}

Write-Host ""
Write-Host "VIOLATIONS FOUND: $($violationFiles.Count) files" -ForegroundColor Red

# Group by priority
$critical = $violationFiles | Where-Object { $_.Type -eq "CRITICAL" }
$high = $violationFiles | Where-Object { $_.Type -eq "HIGH" }
$medium = $violationFiles | Where-Object { $_.Type -eq "MEDIUM" }

Write-Host ""
Write-Host "CRITICAL (User-Facing): $($critical.Count) files" -ForegroundColor Red
$critical | Sort-Object Violations -Descending | Select-Object -First 10 | ForEach-Object {
    $violationText = "$($_.Violations) violations"
    Write-Host "  $($_.File) ($violationText)" -ForegroundColor Red
}

Write-Host ""
Write-Host "HIGH (Forms/Masters): $($high.Count) files" -ForegroundColor Yellow
$high | Sort-Object Violations -Descending | Select-Object -First 10 | ForEach-Object {
    $violationText = "$($_.Violations) violations"
    Write-Host "  $($_.File) ($violationText)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "MEDIUM (Supporting): $($medium.Count) files" -ForegroundColor Green
$medium | Sort-Object Violations -Descending | Select-Object -First 5 | ForEach-Object {
    $violationText = "$($_.Violations) violations"
    Write-Host "  $($_.File) ($violationText)" -ForegroundColor Green
}

# Method 2: Find wrong HTML header usage
Write-Host ""
Write-Host "Method 2: Checking HTML Header Usage..." -ForegroundColor Yellow

$wrongHeaderPattern = '<h[1-6].*class="(?!page-title|section-header|subsection-header|component-header)'
$headerViolations = @()

foreach ($file in $tsFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match $wrongHeaderPattern) {
        $violations = ([regex]::Matches($content, $wrongHeaderPattern)).Count
        $headerViolations += [PSCustomObject]@{
            File = $file.FullName.Replace("$PWD\", "")
            Violations = $violations
        }
    }
}

Write-Host "HEADER VIOLATIONS: $($headerViolations.Count) files" -ForegroundColor Red
$headerViolations | Sort-Object Violations -Descending | Select-Object -First 10 | ForEach-Object {
    $violationText = "$($_.Violations) violations"
    Write-Host "  $($_.File) ($violationText)" -ForegroundColor Red
}

# Method 3: Generate fix recommendations
Write-Host ""
Write-Host "Method 3: Fix Recommendations..." -ForegroundColor Yellow

Write-Host ""
Write-Host "RECOMMENDED FIXES:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan

Write-Host ""
Write-Host "1. Replace Manual Typography Classes:" -ForegroundColor White
Write-Host "   text-lg      -> section-header" -ForegroundColor Gray
Write-Host "   text-base    -> body-text" -ForegroundColor Gray
Write-Host "   text-sm      -> secondary-text" -ForegroundColor Gray
Write-Host "   text-xs      -> table-text" -ForegroundColor Gray
Write-Host "   text-xl+     -> page-title" -ForegroundColor Gray

Write-Host ""
Write-Host "2. Fix HTML Headers:" -ForegroundColor White
Write-Host "   <h1> -> class='page-title'" -ForegroundColor Gray
Write-Host "   <h2> -> class='section-header'" -ForegroundColor Gray
Write-Host "   <h3> -> class='subsection-header'" -ForegroundColor Gray
Write-Host "   <h4> -> class='component-header'" -ForegroundColor Gray

Write-Host ""
Write-Host "3. Priority Order:" -ForegroundColor White
Write-Host "   1. Role/User Management (CRITICAL)" -ForegroundColor Red
Write-Host "   2. Master Forms (HIGH)" -ForegroundColor Yellow
Write-Host "   3. Dashboard/Navigation (MEDIUM)" -ForegroundColor Green

# Method 4: Generate specific file recommendations
Write-Host ""
Write-Host "Method 4: Top Priority Files to Fix..." -ForegroundColor Yellow

$topFiles = $violationFiles | Sort-Object @{Expression={
    switch ($_.Type) {
        "CRITICAL" { 1 }
        "HIGH" { 2 }
        "MEDIUM" { 3 }
    }
}}, @{Expression={$_.Violations}; Descending=$true} | Select-Object -First 20

Write-Host ""
Write-Host "TOP 20 FILES TO FIX FIRST:" -ForegroundColor Cyan
Write-Host "===========================" -ForegroundColor Cyan

$topFiles | ForEach-Object {
    $color = switch ($_.Type) {
        "CRITICAL" { "Red" }
        "HIGH" { "Yellow" }
        "MEDIUM" { "Green" }
    }
    $violationText = "$($_.Violations) violations"
    Write-Host "$($_.Type.PadRight(8)) $($_.File) ($violationText)" -ForegroundColor $color
}

Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host "===========" -ForegroundColor Cyan
Write-Host "1. Start with CRITICAL files (role/user management)" -ForegroundColor White
Write-Host "2. Use find/replace in VS Code:" -ForegroundColor White
Write-Host "   - Find: text-lg" -ForegroundColor Gray
Write-Host "   - Replace: section-header" -ForegroundColor Gray
Write-Host "3. Test builds after each component fix" -ForegroundColor White
Write-Host "4. Verify visual consistency" -ForegroundColor White

Write-Host ""
Write-Host "Run this script anytime to check progress!" -ForegroundColor Green
