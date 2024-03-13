#!/bin/bash

echo "Starting development server"
echo "Starting TypeScript watcher"
npx tsc --watch &
echo "Starting nodemon"
nodemon -q dist/index.js
echo "Development server stopped"
