@echo off
call npm create vite@latest . -- --template react
call npm install
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p
echo SETUP_COMPLETE
