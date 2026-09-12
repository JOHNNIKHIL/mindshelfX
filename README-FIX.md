# MindShelf Step 2.1 — Turbopack fix

The previous build had two issues that could cause the development server to fail:

1. Client components were importing `lib/books.ts`, which uses Node.js filesystem APIs. That server-only module must not enter the browser bundle.
2. The book detail component had a malformed favorite update expression.

This patch moves the pure reading calculations to `lib/reading.ts` and makes the book detail component client-safe.

Copy these files over the existing project files.

Then restart the dev server:
`Ctrl+C`
`npm run dev`

If Turbopack still reports a panic, remove `.next` and restart:
`Remove-Item -Recurse -Force .next`
`npm run dev`
