import { motion } from "motion/react";
import { Ornament } from "./Ornament";
import { WEDDING, mapsUrl, mapsEmbedUrl } from "@/lib/wedding";

export function VenueMap() {
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
          Venue
        </p>
        <h2 className="mt-2 font-serif text-3xl text-gold-dark">{WEDDING.venue.name}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{WEDDING.venue.address}</p>
        <Ornament className="mt-4" />

        <div className="mt-8 overflow-hidden rounded-xl border border-gold/40 shadow-emboss">
          <iframe
            title="Venue Map"
            src={mapsEmbedUrl}
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-full bg-gradient-gold px-8 py-3 font-display text-xs uppercase tracking-[0.25em] text-white shadow-gold transition hover:scale-[1.02]"
        >
          Open in Google Maps
        </a>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-background to-card/70 p-5 text-left shadow-emboss"
          style={{ transform: "perspective(900px) rotateX(2deg)" }}
        >
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-bronze">
            Parking
          </p>
          <p className="mt-2 font-serif text-sm text-foreground/85 leading-relaxed">
            Onsite parking is available. Please arrive early where possible.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
