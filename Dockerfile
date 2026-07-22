# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY turbo.json ./
COPY packages/ ./packages/
COPY apps/web/package*.json ./apps/web/
COPY apps/web/ ./apps/web/

# Install packages
RUN npm ci

# Build web frontend
RUN npx turbo run build --filter=@vedhkrit/web...

# Stage 2: Production Nginx runtime stage
FROM nginx:1.25-alpine AS runner

# Non-root user permissions
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Copy custom Nginx configuration
COPY infra/nginx/nginx.conf /etc/nginx/nginx.conf
COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built frontend static assets
COPY --from=builder /usr/src/app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/healthz || exit 1

USER nginx

CMD ["nginx", "-g", "daemon off;"]
