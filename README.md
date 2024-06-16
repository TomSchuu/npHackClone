# To Compile

tsc && browserify ./dist/script.js ./dist/timer.js -o ./dist/bundle.js

# Tailwind

npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
