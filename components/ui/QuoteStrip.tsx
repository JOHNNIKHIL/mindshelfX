"use client";

import { useEffect, useState } from "react";

type QuoteStripProps = {
  quote?: string;
  label?: string;
};

const QUOTES = ["A few pages can change the direction of a whole day.", "Read slowly enough for an idea to stay with you.", "Books are quiet conversations that outlive the moment.", "The best shelf is the one you actually return to.", "One finished chapter is still progress.", "Read for curiosity first; understanding follows.", "A good book gives your mind somewhere interesting to wander.", "Your next favorite idea may be hiding on the next page.", "Reading is time spent building a larger inner world.", "A page read today is a thought carried into tomorrow.", "Keep the books that make you think after you close them.", "You do not need to read faster. You need to keep reading.", "Some books entertain you. The best ones rearrange you.", "A personal library is a record of what caught your attention.", "Read a little. Think a little. Repeat.", "There is no wasted page when it makes you curious.", "The shelf remembers every idea you chose to keep.", "Finish the book, or let the book change what you read next.", "Reading turns spare minutes into somewhere to go.", "The quietest habit can produce the loudest change.", "A book does not need to be finished to be useful.", "Let good ideas take up space in your mind.", "Your library is a map of questions worth asking.", "Read beyond what you already know.", "A chapter at a time is still a journey.", "The right sentence can stay with you for years.", "Collect ideas, not just books.", "Make room for a thought that challenges the last one.", "Reading is one of the few ways to travel without leaving your chair.", "A thoughtful page is worth more than a hurried chapter.", "Let your reading be deliberate, not merely busy.", "Every book you open is an invitation to see differently.", "Progress does not always look dramatic. Sometimes it looks like page 42.", "Read the book in front of you, not the pile behind it.", "A growing shelf is proof of a growing curiosity.", "Good books give you better questions.", "The goal is not more pages. It is more understanding.", "Leave a little room in your day for a good idea.", "A book becomes yours when you start thinking with it.", "Some evenings need silence. Some need a chapter.", "Your reading pace is allowed to be your own.", "Open the book. The rest can wait a little.", "A finished book is an ending; a useful idea is a beginning.", "Read widely enough to notice connections.", "The shelf may be still, but the ideas on it are moving.", "A small reading habit can quietly become a large life.", "Give your attention to something that deserves it.", "The next page is a very small place to begin.", "Keep reading until something makes you stop and think."];

function pickRandom(exclude?: string) {
  const available = exclude ? QUOTES.filter((item) => item !== exclude) : QUOTES;
  return available[Math.floor(Math.random() * available.length)];
}

export default function QuoteStrip({
  quote = QUOTES[0],
  label = "A little thought",
}: QuoteStripProps) {
  const [displayQuote, setDisplayQuote] = useState(quote);

  useEffect(() => {
    // Pick independently for each mounted quote strip.
    // Excluding the server fallback prevents the same sentence from lingering
    // after hydration and gives each page/instance its own random selection.
    setDisplayQuote(pickRandom(quote));
  }, [quote]);

  return (
    <aside className="quote-strip" aria-label={label}>
      <div className="quote-mark">“</div>
      <div className="quote-content">
        <div className="quote-label">{label}</div>
        <p key={displayQuote} className="quote-text">{displayQuote}</p>
      </div>
    </aside>
  );
}
