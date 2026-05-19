@echo off
cls
echo.
echo =====================================
echo  Stopping Farm Management Server
echo =====================================
echo.

REM Kill all node processes
taskkill /F /IM node.exe 2>nul

if %errorlevel% equ 0 (
    echo ✅ Server stopped successfully!
) else (
    echo ⚠️  No server process found on port 5000
)

echo.
echo Press any key to close...
pause > nul
