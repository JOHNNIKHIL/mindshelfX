# MindShelf — UI/UX Bug Fix Patch

Built against the current `master` branch of JOHNNIKHIL/mindshelfX.

Requested fixes:
- Removed the prominent "+ Add book" CTA from Home.
- Removed the "+ Add book" CTA from Library.
- Kept the dedicated Add Book navigation item.
- Added a working Light/Dark theme switcher in the sidebar.
- Persists theme choice in localStorage.
- Falls back to the OS color-scheme preference on first load.
- Applies dark theme to the actual surfaces, controls, navigation, cards, forms and analytics components used by the current CSS.
- Added theme initialization to reduce the visible light-theme flash during navigation/loading.
- Kept the current search/filter/sort/grid/compact UX.
- Kept dynamic greeting and existing quote components.
- Included small interaction/gradient/hover refinements.

Files intentionally limited to those that need changing:
- app/page.tsx
- app/library/page.tsx
- app/layout.tsx
- app/globals.css
- components/layout/AppShell.tsx
- components/ui/ThemeSwitcher.tsx
- components/ui/ThemeInitializer.tsx

No database/schema/API/book data changes.
