#!/bin/sh
set -e

# Substitute environment PORT in Nginx configuration.
export PORT=${PORT:-8080}
echo "🚀 Configuring Nginx proxy to listen on port: $PORT"
sed -i "s/\$PORT/$PORT/g" /etc/nginx/http.d/default.conf

# Start NestJS backend (port 5000)
echo "Starting NestJS API Server..."
node apps/api/dist/main.js &
BACKEND_PID=$!

# Start TanStack Start/Nitro frontend (port 3000)
echo "Starting TanStack Start Frontend Server..."
export PORT=3000
node apps/web/.output/server/index.mjs &
FRONTEND_PID=$!

# Start Nginx in the foreground
echo "Starting Nginx Reverse Proxy..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Handle shutdown signals gracefully
cleanup() {
    echo "Received termination signal. Shutting down cleanly..."
    kill -TERM "$BACKEND_PID" "$FRONTEND_PID" "$NGINX_PID" 2>/dev/null || true
    wait "$BACKEND_PID" "$FRONTEND_PID" "$NGINX_PID" 2>/dev/null || true
    echo "All processes stopped. Exiting."
}

trap cleanup SIGINT SIGTERM

# Wait for all processes to complete
wait "$BACKEND_PID" "$FRONTEND_PID" "$NGINX_PID"
