@echo off
setlocal
cd /d "%~dp0"
echo.
echo ===== Cinephile - Windows installer build =====
echo.

where node >nul 2>nul
if errorlevel 1 goto :nonode
where npm >nul 2>nul
if errorlevel 1 goto :nonode

if not exist "package.json" (
  echo ERROR: package.json not found. Run this file from the extracted Cinephile folder.
  goto :fail
)
if not exist "package-lock.json" (
  echo ERROR: package-lock.json is missing. Use the original Cinephile ZIP; do not delete this file.
  goto :fail
)

for /f %%v in ('node -p "require('./package.json').version"') do set VER=%%v
echo Node:
node --version
echo npm:
call npm --version
echo Version being built: %VER%
echo.

if not exist "node_modules" (
  echo Installing dependencies with npm ci ...
  call npm ci
  if errorlevel 1 (
    echo.
    echo ERROR: npm ci failed. Check your internet connection and that Node.js is 22.12 or newer.
    goto :fail
  )
) else (
  echo node_modules already present, skipping npm ci.
)

echo.
echo Building the installer. The first build can take several minutes ...
call npm run dist:win
if errorlevel 1 (
  echo.
  echo ERROR: the installer build failed. See the messages above and docs\troubleshooting.md.
  goto :fail
)

set INSTALLER=%CD%\dist\Cinephile-Setup-%VER%.exe
if not exist "%INSTALLER%" (
  echo.
  echo ERROR: the build finished but the installer was not found at:
  echo   %INSTALLER%
  goto :fail
)

echo.
echo SUCCESS. Your installer is here:
echo   %INSTALLER%
echo.
pause
exit /b 0

:nonode
echo ERROR: Node.js and npm were not found. Install Node.js 22.12 or newer (LTS) from https://nodejs.org, then open a NEW terminal and run this file again.
:fail
echo.
echo The build did NOT succeed.
pause
exit /b 1
