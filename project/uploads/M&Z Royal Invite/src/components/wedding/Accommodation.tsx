import { ExternalLink } from "lucide-react";
import { Ornament } from "./Ornament";

const HOTELS = [
  {
    name: "Premier Inn Romford Central",
    note: "Nearby hotel option for guests travelling to Romford.",
    url: "https://www.google.com/maps/search/Premier+Inn+Romford+Central",
  },
  {
    name: "Holiday Inn Express Romford",
    note: "Easy access and family rooms available.",
    url: "https://www.google.com/maps/search/Holiday+Inn+Express+Romford",
  },
];

export function Accommodation() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">For Our Guests</p>
        <h2 className="mt-2 font-serif text-4xl italic text-gold-dark">Accommodation</h2>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          Recommendations for your stay
        </p>
        <Ornament className="mt-5" />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HOTELS.map((h) => (
            <div key={h.name} className="embossed-card rounded-xl p-5 text-left">
              <h3 className="font-serif text-lg text-gold-dark">{h.name}</h3>
              <p className="mt-2 font-serif text-sm text-muted-foreground">{h.note}</p>
              <a
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-card px-3.5 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark transition hover:bg-gradient-gold hover:text-white"
              >
                <ExternalLink size={12} /> View details
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
