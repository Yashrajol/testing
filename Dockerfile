# Production image for the NestJS API (apps/api).
# Built from the monorepo root: docker build -f Dockerfile .

FROM node:20-alpine AS builder

RUN apk add --no-cache openssl python3 make g++

WORKDIR /usr/src/app

# Copy the entire monorepo source code
COPY . .

# Install packages, then dedupe so @nestjs/common/core hoist to the root
# node_modules. Without this, npm nests per-workspace copies and root-level
# packages (@nestjs/config, throttler, schedule) fail to resolve @nestjs/common.
RUN npm install
RUN npm dedupe

# Run prisma generate and build the API and its dependencies
RUN npm run db:generate --workspace=@vedhkrit/database
RUN npx turbo run build --filter=@vedhkrit/api...


FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

ENV NODE_ENV=production

WORKDIR /app

# Copy the entire workspace build output and dependencies from builder stage
COPY --from=builder /usr/src/app ./

# Render injects PORT; main.ts falls back to 5000 locally.
EXPOSE 5000

CMD ["node", "apps/api/dist/apps/api/src/main.js"]
