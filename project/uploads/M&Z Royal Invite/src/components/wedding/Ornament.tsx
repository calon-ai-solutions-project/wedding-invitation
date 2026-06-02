type Props = { className?: string; flip?: boolean };

export function Ornament({ className = "", flip = false }: Props) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} aria-hidden>
      <svg
        viewBox="0 0 200 24"
        className={`h-5 w-40 text-gold ${flip ? "scale-x-[-1]" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      >
        <path d="M0 12 H70" />
        <path d="M70 12 q5 -10 12 0 q-5 10 -12 0 Z" fill="currentColor" fillOpacity="0.3" />
        <circle cx="92" cy="12" r="3" fill="currentColor" />
        <path d="M100 6 q8 6 0 12 q-8 -6 0 -12 Z" fill="currentColor" fillOpacity="0.4" />
        <circle cx="108" cy="12" r="3" fill="currentColor" />
        <path d="M118 12 q5 -10 12 0 q-5 10 -12 0 Z" fill="currentColor" fillOpacity="0.3" />
        <path d="M130 12 H200" />
      </svg>
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <svg viewBox="0 0 24 24" className="mx-3 h-6 w-6 text-gold" fill="currentColor">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" opacity="0.85" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`text-gold ${className}`} fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden>
      <path d="M5 5 Q40 10 40 40 Q10 40 5 5 Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M5 5 Q40 10 40 40" />
      <path d="M5 5 Q10 40 40 40" />
      <circle cx="22" cy="22" r="2" fill="currentColor" />
      <path d="M30 14 q6 4 0 8 q-6 -4 0 -8" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}
