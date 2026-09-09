@echo off
cd /d "%~dp0"
title Buselworks Dev Server

REM Avoid sibling project ports:
REM ChristinasBeautyRoom 3347, GameTracker 8000, SkinProtocolRX 8445,
REM GreyEdgeGroup 8446, RKidds 8765
set PORT=3348
set URL=http://127.0.0.1:%PORT%

REM Free the port if a previous Next/dev server is still holding it
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT% " ^| findstr LISTENING') do (
  echo Port %PORT% is in use by PID %%a - stopping it...
  taskkill /PID %%a /F >nul 2>&1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo ERROR: npm was not found on PATH.
  echo Open a terminal where "npm --version" works, or install Node via mise.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo ERROR: npm install failed.
    pause
    exit /b 1
  )
)

echo Starting Buselworks on %URL%
echo Opening browser when the server is ready...
echo.

start "" powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$p=%PORT%; $u='%URL%'; for ($i=0; $i -lt 90; $i++) { try { $c = New-Object Net.Sockets.TcpClient; $c.Connect('127.0.0.1',$p); $c.Close(); Start-Process $u; exit 0 } catch {} ; Start-Sleep -Milliseconds 500 }; Write-Host ('Timed out waiting for '+$u); Read-Host 'Press Enter'"

REM Call Next directly so -p is always honored (npm arg forwarding can fail on Windows)
call npx next dev --turbopack -p %PORT% -H 127.0.0.1
if errorlevel 1 (
  echo.
  echo ERROR: Dev server failed to start.
  pause
  exit /b 1
)
pause
