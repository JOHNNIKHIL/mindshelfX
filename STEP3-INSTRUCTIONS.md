# MindShelf Step 3 — Foundation + Library

This replaces the main application foundation with:

- Reliable JSON persistence for local development.
- Add book + validation.
- Edit book.
- Delete book.
- Favorite toggle.
- Fixed total page count.
- Pages-read validation and automatic clamping.
- Derived Read / Reading / Unread status.
- Real cover uploads (JPG/PNG/WebP).
- Library search.
- Status filters.
- Favorite filter.
- Genre filter.
- Responsive mobile layout.
- LAN development origin configuration.

## Install / run

From the project folder:

```powershell
npm run dev
```

If Next is already running, stop it with Ctrl+C first.

Then open:

```text
http://localhost:3000
```

You can also use the LAN address.

## Important

This patch does NOT overwrite your existing `data/books.json` when copied manually unless you choose to do so.

If you already have a test book in `data/books.json`, keep that file.

If you are replacing the whole project, keep your existing package.json and node_modules.

## Test

1. Add Atomic Habits.
2. Set Total Pages = 320.
3. Set Pages Read = 50.
4. Add a cover.
5. Add the book.
6. Refresh.
7. Edit the book.
8. Change Pages Read to 320.
9. It should become Read / 100%.
10. Open Library and Analytics.

The next major step after this is importing your real collection rather than manually entering all 48 books.
