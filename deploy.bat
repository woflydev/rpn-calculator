xcopy index.html public /y /v /q /i
xcopy script.js public /y /v /q /i
xcopy style.css public /y /v /q /i

cd public

firebase deploy --only hosting
