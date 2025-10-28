#!/bin/bash
# Auto-generate .env file based on environment
# Usage: ./scripts/deploy-env.sh [dev|prod]

set -e

ENV=${1:-dev}

echo "🔧 Generating .env for environment: $ENV"

if [ "$ENV" = "prod" ]; then
    cat > .env << EOF
# Production Environment - Auto-generated
VITE_API_URL=https://api.cinemyar.com
VITE_API_URL_DEV=http://localhost:3000
VITE_API_URL_PROD=https://api.cinemyar.com

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false

# App Info
VITE_APP_NAME=CINEMYAR
VITE_APP_ENV=production
EOF
    echo "✅ Production .env generated"
    
elif [ "$ENV" = "dev" ]; then
    cat > .env << EOF
# Development Environment - Auto-generated
VITE_API_URL=http://47.128.81.163:3000
VITE_API_URL_DEV=http://47.128.81.163:3000
VITE_API_URL_PROD=https://api.cinemyar.com

# Geo API
GEO_URL=https://api.bigdatacloud.net/data/reverse-geocode-client
GEO_URL_DEV=https://api.bigdatacloud.net/data/reverse-geocode-client
GEO_URL_PROD=https://api.bigdatacloud.net/data/reverse-geocode-client

# Supabase
SUPABASE_URL=https://nkdtkslbrbvplhdvfvxy.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rZHRrc2xicmJ2cGxoZHZmdnh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNzM0OTQsImV4cCI6MjA3NTY0OTQ5NH0.KpsS81JXCeHX6bsCCaahK1dtnlTSCAGq4n_uh3t0R2o

# OMDB API
VITE_OMDB_API_KEY=edbcc006

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# App Info
VITE_APP_NAME=CINEMYAR
VITE_APP_ENV=development
EOF
    echo "✅ Development .env generated"
    
else
    echo "❌ Invalid environment: $ENV"
    echo "Usage: ./scripts/deploy-env.sh [dev|prod]"
    exit 1
fi

# Generate environment TypeScript files
echo "🔧 Generating TypeScript environment files..."
pnpm run generate:env

echo ""
echo "✅ All environment files generated for: $ENV"
echo "📝 .env file created"
echo "📝 src/environments/*.ts files created"
