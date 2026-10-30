@echo off
setlocal
title Intranet Course Share - Keep This Window Open
cd /d "%~dp0"

set "COURSE_PYTHON=C:\Users\zhaojing112150\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if not exist "%COURSE_PYTHON%" (
  echo Python runtime was not found:
  echo %COURSE_PYTHON%
  echo.
  echo Install Python or update COURSE_PYTHON in this file.
  pause
  exit /b 1
)

echo Intranet site: http://10.10.16.26:4173/courses-v2.html
echo Keep this window open while other users access the site.
echo Press Ctrl+C to stop sharing.
echo.

"%COURSE_PYTHON%" -m http.server 4173 --bind 0.0.0.0
