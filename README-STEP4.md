# MindShelf — Step 4: Data Hardening

This patch strengthens the existing local JSON storage layer before we import the full library.

## Replace these files

Copy the following into the existing project, replacing the same paths:

- `lib/books.ts`
- `app/api/books/route.ts`
- `app/api/books/[id]/route.ts`
- `components/books/BookDetailClient.tsx`

Do NOT replace `data/books.json` — keep your existing Atomic Habits record.

## What changed

- Prevents `pagesRead` from silently exceeding `totalPages`.
- If total pages is reduced below the current pages read, the edit is rejected instead of silently altering reading data.
- Serializes writes in the running Node process to reduce rapid-update races.
- Writes through a temporary file before replacing `books.json`.
- Maintains `data/books.json.bak` as the previous known-good copy.
- Disables API caching so refreshed pages see current data.
- Better validation and error messages.
- Pages-read control now handles empty/invalid input safely.
- Delete has better error handling.

## Test after copying

Stop the dev server and run:

```powershell
Ctrl+C
Remove-Item -Recurse -Force .next
npm run dev
```

Then test:

1. Open Atomic Habits.
2. Set Pages Read to 50 and save.
3. Refresh the browser.
4. Confirm it still says 50/310 and 16%.
5. Edit total pages to 40 while pages read is 50.
6. Confirm the app rejects that edit rather than silently changing your pages read.
7. Edit total pages to 320; it should work.
8. Set pages read to 320; status should become Read and progress 100%.
9. Refresh again; the state must remain.

Once this passes, the next step is importing the real collection and then building the deeper analytics.
