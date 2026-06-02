import { motion } from "motion/react";
import { Ornament } from "./Ornament";

// Decorative placeholder tiles — swap with real photos later.
const TILES = Array.from({ length: 6 }).map((_, i) => i);

export function Gallery() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          A glimpse
        </p>
        <h2 className="mt-2 font-serif text-3xl text-gold-dark">Our Gallery</h2>
        <Ornament className="mt-4" />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TILES.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="embossed-card relative aspect-square overflow-hidden rounded-lg"
            >
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, oklch(0.86 0.10 85 / 0.7), transparent 60%), radial-gradient(circle at 70% 70%, oklch(0.55 0.12 55 / 0.5), transparent 65%)",
                }}
              />
              <svg viewBox="0 0 100 100" className="absolute inset-0 m-auto h-3/5 w-3/5 text-gold-dark/60" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden>
                <circle cx="50" cy="50" r="40" />
                {Array.from({ length: 8 }).map((_, k) => (
                  <g key={k} transform={`rotate(${k * 45} 50 50)`}>
                    <path d="M50 12 Q56 30 50 48 Q44 30 50 12 Z" fill="currentColor" fillOpacity="0.25" />
                  </g>
                ))}
              </svg>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Photos coming soon · share yours with #ZarinMahbub2026
        </p>
      </div>
    </section>
  );
}
