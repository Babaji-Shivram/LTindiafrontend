@echo off
echo.
echo ========================================
echo   Frontend Deployment Quick Launcher
echo ========================================
echo.

if "%~1"=="" (
    echo Usage: deploy.bat "Your commit message"
    echo.
    echo Examples:
    echo   deploy.bat "Add new user management features"
    echo   deploy.bat "Fix role detail validation issues"
    echo   deploy.bat "Implement dashboard analytics"
    echo.
    pause
    exit /b 1
)

echo Running PowerShell deployment script...
echo.

powershell.exe -ExecutionPolicy Bypass -File "%~dp0deploy-to-production.ps1" -CommitMessage "%~1"

echo.
echo Deployment script completed!
pause
