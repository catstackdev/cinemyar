#!/bin/bash
# Local deployment script - run this from your machine

set -e

REMOTE_NAME="lightsail"
BRANCH="main"

echo "🚀 Deploying CINEMYAR to AWS Lightsail..."

# Check if remote exists
if ! git remote | grep -q "^${REMOTE_NAME}$"; then
  echo "❌ Remote '${REMOTE_NAME}' not found!"
  echo "Add it with: git remote add lightsail admin@YOUR_SERVER_IP:~/apps/cinemyar"
  exit 1
fi

# Check if on correct branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  echo "⚠️  You're on branch '$CURRENT_BRANCH', not '$BRANCH'"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  You have uncommitted changes!"
  read -p "Commit them first? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    read -p "Commit message: " MESSAGE
    git commit -m "$MESSAGE"
  fi
fi

# Deploy
echo "📤 Pushing to Lightsail..."
git push $REMOTE_NAME $BRANCH

echo ""
echo "✅ Deployment initiated!"
echo "🌐 Check your server logs for deployment status"
