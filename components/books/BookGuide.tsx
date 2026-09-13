import type { BookGuide as BookGuideData } from "@/lib/book-guides";

export default function BookGuide({ guide }: { guide: BookGuideData }) {
  return (
    <section className="book-guide">
      <div className="book-guide-head">
        <div>
          <div className="eyebrow">A QUICK GUIDE</div>
          <h2>Before you read</h2>
        </div>
        <div className="book-guide-badge">No spoilers</div>
      </div>

      <div className="book-guide-grid">
        <article>
          <h3>What this book is about</h3>
          <p>{guide.about}</p>
        </article>
        <article>
          <h3>What to expect</h3>
          <p>{guide.expect}</p>
        </article>
      </div>

      <div className="book-guide-footer">
        <span className="book-guide-label">You might enjoy this for</span>
        <div className="book-guide-tags">
          {guide.bestFor.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </section>
  );
}
