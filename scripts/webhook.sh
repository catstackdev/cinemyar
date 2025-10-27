#!/bin/bash
cd /apps/cinemyar || exit
git fetch origin main
git reset --hard origin/main
pnpm install --frozen-lockfile
pnpm run build
pm2 restart cinemyar
