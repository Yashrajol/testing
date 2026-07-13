# Production image for the NestJS API (apps/platform).
# Built from the monorepo root: docker build -f Dockerfile .

FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/platform/package.json apps/platform/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json

RUN npm ci

COPY packages/ packages/
COPY apps/platform/ apps/platform/

RUN npm run db:generate --workspace=@vedhkrit/database
RUN npm run build --workspace=@vedhkrit/platform

# Drop dev dependencies, keeping the generated Prisma client.
RUN npm prune --omit=dev


FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/packages packages/
COPY --from=builder /app/apps/platform/dist apps/platform/dist/
COPY --from=builder /app/apps/platform/package.json apps/platform/package.json

# Render injects PORT; main.ts falls back to 5000 locally.
EXPOSE 5000

CMD ["node", "apps/platform/dist/main.js"]
