# Production image for the NestJS API (apps/api).
# Built from the monorepo root: docker build -f Dockerfile .

FROM node:20-alpine AS builder

RUN apk add --no-cache openssl python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./
COPY turbo.json ./
COPY packages/ ./packages/
COPY apps/api/package*.json ./apps/api/
COPY apps/api/ ./apps/api/
COPY .npmrc ./

# Install packages
RUN npm ci

# Run prisma generate and build the API and its dependencies
RUN npm run db:generate --workspace=@vedhkrit/database
RUN npx turbo run build --filter=@vedhkrit/api...

# Drop dev dependencies, keeping the generated Prisma client.
RUN npm prune --omit=dev


FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /usr/src/app/node_modules node_modules/
COPY --from=builder /usr/src/app/package.json package.json
COPY --from=builder /usr/src/app/packages packages/
COPY --from=builder /usr/src/app/apps/api/dist apps/api/dist/
COPY --from=builder /usr/src/app/apps/api/package.json apps/api/package.json

# Render injects PORT; main.ts falls back to 5000 locally.
EXPOSE 5000

CMD ["node", "apps/api/dist/main.js"]
