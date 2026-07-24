# @vedhkrit/database

Production-grade shared database package for VEDHKRIT monorepo backend services.

## Usage in Node.js & Express.js

```typescript
import { prisma } from '@vedhkrit/database';

async function getUser(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}
```

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and run database migrations
- `npm run db:studio` - Launch Prisma Studio
- `npm run db:seed` - Seed the database with demo data
- `npm run db:reset` - Reset database and re-run migrations
- `npm run db:format` - Format Prisma schema files
- `npm run db:validate` - Validate Prisma schema syntax
