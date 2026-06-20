export default function FlavorProfile({ notes = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {notes.map((note) => (
        <span key={note} className="border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-champagne">
          {note}
        </span>
      ))}
    </div>
  );
}
