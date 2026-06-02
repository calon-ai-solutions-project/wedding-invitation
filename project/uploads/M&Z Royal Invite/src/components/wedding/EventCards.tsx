import { motion } from "motion/react";
import { MapPin, Calendar, Clock, Shirt } from "lucide-react";
import { Ornament } from "./Ornament";
import { EVENTS, mapsUrl } from "@/lib/wedding";

export function EventCards() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bronze">
          Join us for
        </p>
        <h2 className="mt-2 font-serif text-3xl text-gold-dark">Wedding Events</h2>
        <Ornament className="mt-4" />

        <div className="mt-10 space-y-6">
          {EVENTS.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="embossed-card relative overflow-hidden rounded-xl p-6 text-left"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-gold opacity-20 blur-xl" />
              <p className="font-display text-[11px] uppercase tracking-[0.3em] text-gold-dark">
                Ceremony
              </p>
              <h3 className="mt-2 font-serif text-2xl text-foreground">
                {ev.title}
              </h3>

              <ul className="mt-4 space-y-2 text-sm text-foreground/85">
                <Row icon={<Calendar size={14} />}>{ev.date}</Row>
                <Row icon={<Clock size={14} />}>{ev.time}</Row>
                <Row icon={<MapPin size={14} />}>
                  {ev.venue}
                  <span className="block text-muted-foreground">{ev.address}</span>
                </Row>
                <Row icon={<Shirt size={14} />}>{ev.dressCode}</Row>
              </ul>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block rounded-full bg-gradient-gold px-6 py-2 font-display text-xs uppercase tracking-[0.25em] text-white shadow-gold transition hover:scale-[1.02]"
              >
                View Location
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        {icon}
      </span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}
