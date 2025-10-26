#!/bin/bash
# Run this on your Lightsail server to fix the git repository

set -e

echo "🔧 Converting to bare repository..."

# Backup existing repo
if [ -d ~/apps/cinemyar ]; then
    echo "📦 Backing up existing repo..."
    mv ~/apps/cinemyar ~/apps/cinemyar.backup.$(date +%s)
fi

# Create bare repository
echo "📁 Creating bare repository..."
mkdir -p ~/apps/cinemyar
cd ~/apps/cinemyar
git init --bare

# Create work tree directory
echo "📂 Creating work tree..."
sudo mkdir -p /var/www/cinemyar
sudo chown $USER:$USER /var/www/cinemyar

echo "✅ Repository fixed!"
echo ""
echo "Next steps:"
echo "1. Upload post-receive hook: scp deployment/post-receive admin@YOUR_SERVER:~/apps/cinemyar/hooks/"
echo "2. Make executable: ssh admin@YOUR_SERVER 'chmod +x ~/apps/cinemyar/hooks/post-receive'"
echo "3. Deploy: git push lightsail main"
