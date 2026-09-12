# Run from C:\BOOKS Project\mindshelf

npm install @prisma/client@7 @prisma/adapter-pg@7 pg
npm install -D prisma@7 tsx
npm pkg set scripts.postinstall="prisma generate"

npx prisma generate

# Then test locally:
npm run build

# If build passes:
git add .
git commit -m "Fix Prisma Vercel build and cover storage"
git push
