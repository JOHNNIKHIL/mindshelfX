"use client";

import type { Book } from "@/lib/types";
import Link from "next/link";

type ContinueReadingProps = {
  books: Book[];
};

export default function ContinueReading({ books }: ContinueReadingProps) {
  const readingBooks = books.filter(
    (book) => book.pagesRead > 0 && book.pagesRead < book.totalPages
  );

  if (readingBooks.length === 0) {
    return (
      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Continue
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Nothing to continue
          </h2>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
          Start reading a book and it will appear here.
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Continue
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Pick up where you left off
          </h2>
        </div>
        <Link
          href="/library"
          className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          View library
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {readingBooks.slice(0, 3).map((book) => {
          const progress =
            book.totalPages > 0
              ? Math.min(100, Math.round((book.pagesRead / book.totalPages) * 100))
              : 0;

          return (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex gap-4">
                <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2 text-center text-[10px] font-medium text-zinc-400">
                      No cover
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-zinc-900 group-hover:underline dark:text-zinc-100">
                    {book.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {book.author}
                  </p>

                  <div className="mt-5">
                    <div className="mb-1 flex justify-between text-xs text-zinc-500">
                      <span>
                        {book.pagesRead} / {book.totalPages} pages
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
