# Typography Fix Progress Report
Write-Host "Typography Fix Progress Report" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Count total files with violations
$files = Get-ChildItem -Path "src" -Recurse -Include "*.ts","*.html" | Where-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        $content -match "text-(xs|sm|lg|xl|base|2xl|3xl)"
    }
}

Write-Host "Files still containing typography violations: $($files.Count)" -ForegroundColor Yellow
Write-Host ""

# Count total violations
$totalViolations = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $regexMatches = [regex]::Matches($content, "text-(xs|sm|lg|xl|base|2xl|3xl)")
    $totalViolations += $regexMatches.Count
}

Write-Host "Total violations remaining: $totalViolations" -ForegroundColor Yellow
Write-Host ""

# Recently fixed files
Write-Host "Recently Fixed Files:" -ForegroundColor Green
Write-Host "- user-detail.component.ts - All 34 violations fixed"
Write-Host "- identity.component.ts - All 25+ violations fixed"
Write-Host "- login.component.ts - Fixed text-sm, text-base violations"
Write-Host "- dashboard.component.ts - Fixed text-xs, text-sm, text-lg, text-xl violations"
Write-Host "- country-list.component.ts - Fixed text-xs, text-sm violations"
Write-Host "- port-list.component.ts - All violations fixed"
Write-Host "- port-form.component.ts - All violations fixed"
Write-Host "- port-details.component.ts - All violations fixed"
Write-Host "- branch-list.component.ts - All violations fixed"
Write-Host "- branch-form.component.ts - All violations fixed"
Write-Host "- branch-details.component.ts - All violations fixed"
Write-Host ""

Write-Host "Next Priority Files:" -ForegroundColor Cyan
$priority = @(
    "two-factor-setup.component.ts",
    "role-detail-list.component.ts", 
    "users.component.ts",
    "customer-list.component.ts",
    "masters-demo.component.ts"
)
foreach ($p in $priority) {
    Write-Host "- $p"
}
