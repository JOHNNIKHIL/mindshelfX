type QuoteStripProps = {
  quote: string;
  label?: string;
};

export default function QuoteStrip({ quote, label = "A little thought" }: QuoteStripProps) {
  return (
    <aside className="quote-strip" aria-label={label}>
      <div className="quote-mark">“</div>
      <div>
        <div className="quote-label">{label}</div>
        <p>{quote}</p>
      </div>
    </aside>
  );
}
