# MindShelf — Step 1 UI

Copy these files into the root of the Next.js project.

This stage intentionally uses demo data and does NOT connect to PostgreSQL yet.

Core book model:
- title
- author
- genre
- cover
- totalPages (fixed)
- pagesRead
- favorite

Derived:
- progress = pagesRead / totalPages
- Read = pagesRead >= totalPages

Next phase: connect Prisma/PostgreSQL, create real CRUD, persist page updates and favorites, then import the real collection.
