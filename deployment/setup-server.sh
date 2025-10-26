#!/bin/bash
# Run this script on your AWS Lightsail Debian server
set -e

echo "🔧 Setting up AWS Lightsail server for CINEMYAR..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install nginx
echo "🌐 Installing nginx..."
sudo apt install nginx -y

# Install Node.js 20
echo "📥 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm globally
echo "📦 Installing pnpm..."
sudo npm install -g pnpm

# Create directories
echo "📁 Creating application directories..."
sudo mkdir -p /var/www/cinemyar
sudo chown $USER:$USER /var/www/cinemyar

# Create bare git repository
echo "🔧 Setting up git repository..."
mkdir -p ~/apps/cinemyar
cd ~/apps/cinemyar
git init --bare

# Install post-receive hook (you'll upload this separately)
echo "📝 Post-receive hook should be placed at: ~/apps/cinemyar/hooks/post-receive"

# Create nginx config
echo "⚙️  Creating nginx configuration..."
sudo tee /etc/nginx/sites-available/cinemyar > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/html;
    index index.html;

    # SPA routing - critical for React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets aggressively
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp4|vtt)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# Enable site
echo "✅ Enabling nginx site..."
sudo ln -sf /etc/nginx/sites-available/cinemyar /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# Configure sudoers for deployment commands
echo "🔐 Configuring sudoers for deployment..."
echo "$USER ALL=(ALL) NOPASSWD: /bin/rm -rf /var/www/html/*, /bin/cp -r *, /bin/systemctl restart nginx" | sudo tee /etc/sudoers.d/cinemyar-deploy
sudo chmod 0440 /etc/sudoers.d/cinemyar-deploy

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo ""
echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Upload post-receive hook: scp deployment/post-receive YOUR_SERVER:~/apps/cinemyar/hooks/"
echo "2. Make it executable: ssh YOUR_SERVER 'chmod +x ~/apps/cinemyar/hooks/post-receive'"
echo "3. Deploy: git push lightsail main"
