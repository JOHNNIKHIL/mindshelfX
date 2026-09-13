"use client";

import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/lib/types";
import OptimizedCover from "@/components/books/OptimizedCover";
import { getProgress } from "@/lib/reading";

function MiniBook({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`} className="reading-pick-book">
      <div className="reading-pick-cover">
        {book.cover ? (
          <OptimizedCover
            src={book.cover}
            sizes="96px"
            className="reading-pick-cover-image"
          />
        ) : (
          <div className="cover-fallback"><span>{book.title}</span></div>
        )}
      </div>
      <div className="reading-pick-book-info">
        <strong>{book.title}</strong>
        <span>{book.author}</span>
        <small>{getProgress(book)}% complete</small>
      </div>
    </Link>
  );
}

export default function ReadingPicks({
  initialNext,
  bookOfDay,
  finishMe,
  candidates,
}: {
  initialNext: Book | null;
  bookOfDay: Book | null;
  finishMe: Book[];
  candidates: Book[];
}) {
  const [next, setNext] = useState(initialNext);

  function chooseNext() {
    if (!candidates.length) return;
    const pool = candidates.filter((book) => book.id !== next?.id);
    const source = pool.length ? pool : candidates;
    setNext(source[Math.floor(Math.random() * source.length)]);
  }

  return (
    <section className="reading-features">
      <div className="section-head">
        <div>
          <h2>Reading picks</h2>
          <span className="sub">A little help deciding what comes next.</span>
        </div>
      </div>

      <div className="reading-feature-grid">
        <div className="reading-feature-card reading-feature-hero">
          <div className="eyebrow">WHAT TO READ NEXT</div>
          {next ? (
            <>
              <MiniBook book={next} />
              <button type="button" className="btn" onClick={chooseNext}>
                Pick another
              </button>
            </>
          ) : (
            <p className="sub">Your library is empty.</p>
          )}
        </div>

        <div className="reading-feature-card">
          <div className="eyebrow">BOOK OF THE DAY</div>
          {bookOfDay ? <MiniBook book={bookOfDay} /> : <p className="sub">Add a book to begin.</p>}
          <span className="reading-feature-note">A different book every day.</span>
        </div>

        <div className="reading-feature-card">
          <div className="eyebrow">FINISH ME</div>
          {finishMe.length ? (
            <div className="finish-list">
              {finishMe.map((book) => (
                <Link href={`/book/${book.id}`} key={book.id} className="finish-row">
                  <div>
                    <strong>{book.title}</strong>
                    <span>{book.pagesRead} / {book.totalPages} pages</span>
                  </div>
                  <b>{book.totalPages - book.pagesRead} left</b>
                </Link>
              ))}
            </div>
          ) : (
            <p className="sub">No unfinished books yet. Nice.</p>
          )}
        </div>
      </div>
    </section>
  );
}
