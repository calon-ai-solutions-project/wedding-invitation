import { motion } from "motion/react";
import { Ornament, CornerOrnament } from "./Ornament";
import { WEDDING } from "@/lib/wedding";
const heroLoop = { url: "/hero-loop.mp4" };

export function Hero() {
  const scrollNext = () => {
    document.getElementById("couple")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center text-white">
      {/* Cinematic background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
        disablePictureInPicture
        preload="auto"
        poster=""
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroLoop.url} type="video/mp4" />
      </video>

      {/* Warm gradient + vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e05]/70 via-[#2b1707]/55 to-[#0e0703]/85" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <CornerOrnament className="absolute left-2 top-2 h-20 w-20 text-gold opacity-80" />
      <CornerOrnament className="absolute right-2 top-2 h-20 w-20 -scale-x-100 text-gold opacity-80" />
      <CornerOrnament className="absolute bottom-2 left-2 h-20 w-20 -scale-y-100 text-gold opacity-80" />
      <CornerOrnament className="absolute bottom-2 right-2 h-20 w-20 -scale-100 text-gold opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10"
      >
        <p className="font-display text-[10px] uppercase tracking-[0.5em] text-gold/90">
          The Wedding of
        </p>
        <h1 className="mt-4 font-serif text-5xl italic leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-6xl">
          Zarin
          <br />
          <span className="text-gold">&amp;</span>
          <br />
          Mahbub
        </h1>
        <Ornament className="mt-6 text-gold" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-10 space-y-2"
      >
        <p className="font-serif text-base italic text-white/85">
          With joy and gratitude, the family of the bride invites you to celebrate
        </p>
        <p className="font-display text-sm uppercase tracking-[0.35em] text-gold">
          {WEDDING.dateDisplay}
        </p>
        <p className="font-serif text-xs text-white/70">
          {WEDDING.venue.name} · {WEDDING.venue.address}
        </p>
        <p className="font-serif text-xs text-white/60">
          Guest arrival starts from {WEDDING.timeDisplay}
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        onClick={scrollNext}
        className="relative z-10 mt-10 rounded-full border border-gold/70 bg-black/30 px-8 py-3 font-display text-[11px] uppercase tracking-[0.35em] text-gold backdrop-blur transition hover:bg-gradient-gold hover:text-white"
      >
        Begin the Story
      </motion.button>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold/70"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
}
