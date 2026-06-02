import { motion } from "motion/react";
import { Ornament } from "./Ornament";

type Item = { time: string; label: string; icon: string };

const ITEMS: Item[] = [
  { time: "5:30 PM", label: "Guest Arrival", icon: "🍽️" },
  { time: "6:30 PM", label: "Groom Arrival", icon: "🤵" },
  { time: "7:00 PM", label: "Bride Arrival", icon: "👰" },
  { time: "7:30 PM", label: "Nikah Ceremony on the Stage", icon: "💍" },
  { time: "8:30 PM", label: "Food Served", icon: "🍽️" },
  { time: "10:00 PM", label: "Cake and Celebration", icon: "🎂" },
  { time: "10:30 PM", label: "The End", icon: "🤲" },
];

export function Schedule() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          Our Schedule
        </p>
        <h2 className="mt-2 font-serif text-4xl italic text-gold-dark">Schedule</h2>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          What we have planned for you
        </p>
        <Ornament className="mt-5" />

        <div className="relative mt-12">
          <span className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {ITEMS.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.label} className="flex items-center gap-4">
                  {left ? (
                    <>
                      <div className="flex-1 text-right">
                        <div className="font-display text-xs uppercase tracking-[0.25em] text-gold-dark">
                          {item.label}
                        </div>
                        <div className="font-serif text-sm text-muted-foreground">{item.time}</div>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-cream text-lg shadow-emboss ring-1 ring-gold/30">
                        {item.icon}
                      </span>
                      <div className="flex-1" />
                    </>
                  ) : (
                    <>
                      <div className="flex-1" />
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-cream text-lg shadow-emboss ring-1 ring-gold/30">
                        {item.icon}
                      </span>
                      <div className="flex-1 text-left">
                        <div className="font-display text-xs uppercase tracking-[0.25em] text-gold-dark">
                          {item.label}
                        </div>
                        <div className="font-serif text-sm text-muted-foreground">{item.time}</div>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
