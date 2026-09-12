# MindShelf DB/Vercel Build Fix

This patch fixes the cover API so it no longer tries to write to Vercel's
read-only filesystem. Covers are temporarily returned as data URLs and stored
with the Book record in PostgreSQL.

Also run the dependency commands in README-commands.txt. Prisma must be
generated during Vercel's install step.
