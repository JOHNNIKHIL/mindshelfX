# MindShelf — Database Migration Patch

This patch replaces the Vercel-incompatible `data/books.json` persistence layer
with PostgreSQL through Prisma.

## 1. Install dependencies

From the MindShelf project root:

```powershell
npm install @prisma/client@7 @prisma/adapter-pg@7 pg
npm install -D prisma@7 tsx
```

## 2. Copy these files

Replace/add:

- `prisma/schema.prisma`
- `prisma.config.ts`
- `lib/prisma.ts`
- `lib/books.ts`
- `scripts/migrate-json-to-db.ts`

Do NOT delete `data/books.json` yet.

## 3. Create the database

In Vercel, add a Prisma Postgres database through the Storage/Marketplace
integration and connect it to the MindShelf project. Vercel will provide
`DATABASE_URL`.

For local development, put the same connection string in `.env`:

```env
DATABASE_URL="your-postgres-connection-string"
```

Never commit `.env`.

## 4. Generate the client and create the table

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

## 5. Import the existing books

Before running this, make sure your local `data/books.json` contains your
current books.

```powershell
npx tsx scripts/migrate-json-to-db.ts
```

This uses upsert, so running it again will not create duplicate records.

## 6. Make Vercel generate Prisma

Add this to the existing `scripts` object in package.json:

```json
"postinstall": "prisma generate"
```

Keep all your existing scripts.

For production schema deployment, use:

```powershell
npx prisma migrate deploy
```

The production DATABASE_URL should be configured in Vercel, not committed
to Git.

## Important

This patch migrates the BOOK DATA first. Cover uploads still use the local
filesystem and therefore need a separate object-storage step for Vercel
(e.g. Vercel Blob, Neon/S3-compatible storage, or another managed object
store). Do not delete your local `data/covers` until that migration is done.
