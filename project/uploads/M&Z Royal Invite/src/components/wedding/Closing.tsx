import { motion } from "motion/react";
import { Monogram } from "./Monogram";
import { Ornament } from "./Ornament";

export function Closing() {
  return (
    <section className="px-6 pb-20 pt-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1 }}
        className="mx-auto flex max-w-xl flex-col items-center"
      >
        <Monogram size={140} />
        <Ornament className="mt-6" />
        <p className="mt-4 font-serif text-lg italic text-foreground/85">
          We look forward to celebrating with you.
        </p>
        <p className="mt-2 font-display text-2xl tracking-[0.15em] text-gold-dark">
          Z &amp; M
        </p>
        <p className="mt-8 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Zarin &amp; Mahbubul · 16 July 2026
        </p>
      </motion.div>
    </section>
  );
}
