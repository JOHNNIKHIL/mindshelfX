# MindShelf — Step 2 Functional Build

This replaces the demo-data UI with a real local persistent store.

Features:
- Add books
- Fixed total pages
- Pages read updates
- Derived progress
- Read / Reading / Unread status
- Favorites
- Search
- Genre filter
- Reading-status filters
- Delete books
- Home stats from actual data
- Analytics from actual data
- Responsive desktop/mobile UI

Storage:
`data/books.json`

This is intentionally a simple local persistence layer for development. For production hosting, the next phase should move this repository layer to PostgreSQL/Supabase so data survives redeployments and can be safely backed up.
