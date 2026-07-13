#!/bin/bash
# ==============================================================================
# VEDHKRIT PLATFORM - VPS SERVER & DATABASE SETUP SCRIPT
# Target OS: Ubuntu 22.04 LTS / 24.04 LTS
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration variables (Modify these for production)
DB_USER="vedhkrit_admin"
DB_PASSWORD=$(openssl rand -base64 16)
DB_NAME="vedhkrit_db"
DOMAIN_NAME="vedhkrit.com"
EMAIL="admin@vedhkrit.com"

echo "=== [1/7] Updating System Packages ==="
sudo apt-get update -y
sudo apt-get upgrade -y

echo "=== [2/7] Installing Core Utilities & Docker ==="
sudo apt-get install -y curl git ufw nginx certbot python3-certbot-nginx

# Install Docker Engine & Compose
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

echo "=== [3/7] Setting Up Local PostgreSQL via Docker ==="
# Launch high-availability PostgreSQL container instance
docker run --name vedhkrit-postgres \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_DB=$DB_NAME \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  --restart always \
  -d postgres:15-alpine

echo "=== [4/7] Configuring UFW Firewall Profiles ==="
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 5432/tcp
sudo ufw --force enable

echo "=== [5/7] Creating Nginx Server Blocks ==="
# Map API and Client Web routes
sudo bash -c "cat > /etc/nginx/sites-available/$DOMAIN_NAME" <<EOF
server {
    listen 80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

server {
    listen 80;
    server_name api.$DOMAIN_NAME;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/$DOMAIN_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "=== [6/7] Obtaining SSL Certificates (Let's Encrypt) ==="
# Request certbot certificates (Uncomment in live shell when domains point to this IP)
# sudo certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME -d api.$DOMAIN_NAME --non-interactive --agree-tos -m $EMAIL

echo "=== [7/7] Automation Environment Configs ==="
# Output environment variables to connect monorepo platforms
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public"

cat <<EOF > .env.production
DATABASE_URL="$DATABASE_URL"
PORT=5000
NODE_ENV=production
JWT_SECRET="$(openssl rand -base64 32)"
EOF

echo "=============================================================================="
# Summary Output
echo " VPS SERVER CONFIGURATION IS COMPLETE!"
echo " - Database User: $DB_USER"
echo " - Database Password: $DB_PASSWORD"
echo " - Database Name: $DB_NAME"
echo " - Configured URL: $DATABASE_URL"
echo " Environment variables saved to: .env.production"
echo "=============================================================================="
