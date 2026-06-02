import { motion } from "motion/react";
import { Ornament } from "./Ornament";
import { TIMELINE } from "@/lib/wedding";

export function Timeline() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          The Evening
        </p>
        <h2 className="mt-2 font-serif text-3xl text-gold-dark">Wedding Timeline</h2>
        <Ornament className="mt-4" />

        <div className="relative mt-10 text-left">
          <span className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />
          <ul className="space-y-5">
            {TIMELINE.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative flex items-center gap-4 pl-1"
              >
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-white shadow-gold ring-4 ring-background">
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden>
                    <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" />
                  </svg>
                </span>
                <div className="embossed-card flex-1 rounded-lg px-4 py-3">
                  <div className="font-display text-xs uppercase tracking-[0.25em] text-gold-dark">
                    {item.time}
                  </div>
                  <div className="font-serif text-base text-foreground">{item.label}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
