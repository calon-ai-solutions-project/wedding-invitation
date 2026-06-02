import { motion } from "motion/react";
import { Divider, Ornament } from "./Ornament";
import { WEDDING } from "@/lib/wedding";

export function Couple() {
  return (
    <section id="couple" className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-xl text-center"
      >
        <p className="font-display text-xs uppercase tracking-[0.35em] text-bronze">
          ﷽
        </p>
        <p className="mt-4 font-serif text-lg italic leading-relaxed text-foreground/85">
          “With the blessing of our families, we invite you to join us as
          Zarin and Mahbub begin their new journey together.”
        </p>
        <Ornament className="mt-6" />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <CoupleCard
            label="The Bride"
            name={WEDDING.bride.name}
            parents={WEDDING.bride.parents}
          />
          <CoupleCard
            label="The Groom"
            name={WEDDING.groom.name}
            parents={WEDDING.groom.parents}
          />
        </div>

        <Divider />
      </motion.div>
    </section>
  );
}

function CoupleCard({
  label,
  name,
  parents,
}: {
  label: string;
  name: string;
  parents: string;
}) {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="embossed-card rounded-lg p-6"
    >
      <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-dark">
        {label}
      </p>
      <h3 className="mt-3 font-serif text-2xl text-foreground">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {parents}
      </p>
    </motion.div>
  );
}
