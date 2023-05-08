@echo off

xcopy index.html public\ /y /v /q /i
xcopy sw.js public\ /y /v /q /i
xcopy script.js public\ /y /v /q /i
xcopy style.css public\ /y /v /q /i
xcopy manifest.json public\ /y /v /q /i
xcopy icon512.png public\ /y /v /q /i
xcopy icon_maskable.png public\ /y /v /q /i

echo deploying to firebase...

cd public

firebase deploy --only hosting
