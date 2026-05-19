@echo off
REM Farm Management Backend - Quick Start Script
REM Run this to start the server tomorrow!

cls
echo.
echo =====================================
echo  Farm Management Backend
echo  Quick Start Script
echo =====================================
echo.

cd /d "d:\New folder\Farm-management\backend\config"

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo =====================================
echo  Seeding demo data...
echo =====================================
echo.
call npm run seed:demo

echo.
echo =====================================
echo  Starting server on port 5000...
echo =====================================
echo.
echo 🚀 Server starting...
echo.
call npm start

pause
