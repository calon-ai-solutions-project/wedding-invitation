import { Ornament } from "./Ornament";

export function DressCode() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">What to Wear</p>
        <h2 className="mt-2 font-serif text-4xl italic text-gold-dark">Dress Code</h2>
        <Ornament className="mt-5" />

        <div className="embossed-card mt-8 rounded-2xl px-6 py-8">
          <p className="font-display text-base uppercase tracking-[0.3em] text-gold-dark">
            Semi-Formal · Modest
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 text-left">
            <div className="text-center">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-bronze">
                Women
              </p>
              <p className="mt-2 font-serif text-lg text-foreground">Long Dress · Saree · Modest Formal Outfit</p>
            </div>
            <div className="text-center">
              <p className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-bronze">
                Men
              </p>
              <p className="mt-2 font-serif text-lg text-foreground">Suit · Panjabi · Smart Formal Outfit</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-serif text-sm italic text-muted-foreground">Suggested colours:</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              {[
                { c: "#c9a87c", n: "Gold" },
                { c: "#8a5a2b", n: "Bronze" },
                { c: "#f4ead8", n: "Cream" },
                { c: "#5d2b1c", n: "Maroon" },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center gap-1">
                  <span
                    className="h-9 w-9 rounded-full ring-2 ring-gold/30 shadow-emboss"
                    style={{ background: s.c }}
                  />
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
