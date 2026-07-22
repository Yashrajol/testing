# @vedhkrit/database

Production-grade shared database package for VEDHKRIT monorepo backend applications.

## Usage in NestJS

```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vedhkrit/database';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
```

Injecting `PrismaService`:

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

## Usage in Standalone Scripts

```typescript
import { prisma } from '@vedhkrit/database';

async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
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
