type QuoteStripProps = {
  quote: string;
  label?: string;
};

export default function QuoteStrip({ quote, label = "A little thought" }: QuoteStripProps) {
  return (
    <aside className="quote-strip" aria-label={label}>
      <blockquote className="quote-content">
        <p className="quote-text">“{quote}”</p>
        <footer className="quote-label">— {label}</footer>
      </blockquote>
    </aside>
  );
}
