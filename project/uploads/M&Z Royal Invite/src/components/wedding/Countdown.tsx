import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Ornament } from "./Ornament";
import { WEDDING } from "@/lib/wedding";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function Countdown() {
  const target = new Date(WEDDING.dateISO).getTime();
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    setT(diff(target));
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  }, [target]);

  const units: [string, number | null][] = [
    ["Days", mounted ? t.d : null],
    ["Hours", mounted ? t.h : null],
    ["Minutes", mounted ? t.m : null],
    ["Seconds", mounted ? t.s : null],
  ];

  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-xl text-center"
      >
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          Counting the moments
        </p>
        <h2 className="mt-2 font-serif text-3xl text-gold-dark">
          Until Our Special Day
        </h2>
        <Ornament className="mt-4" />

        <div className="mt-8 grid grid-cols-4 gap-3">
          {units.map(([label, value]) => (
            <div key={label} className="embossed-card rounded-lg px-2 py-4">
              <div className="font-display text-2xl text-gold-dark tabular-nums sm:text-3xl">
                {value === null ? "--" : String(value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
