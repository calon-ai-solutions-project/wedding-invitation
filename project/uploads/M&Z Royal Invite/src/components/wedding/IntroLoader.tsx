import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import introCover from "@/assets/intro-cover.jpg";
import { playMusic, preloadMusic } from "@/lib/music";

type Props = { onOpen: () => void };

export function IntroLoader({ onOpen }: Props) {
  const [closing, setClosing] = useState(false);

  // Preload YouTube player so the tap can start playback synchronously,
  // keeping the user-gesture token valid on iOS/Android.
  useEffect(() => {
    preloadMusic();
  }, []);

  const handleOpen = () => {
    // Trigger music inside the user gesture so iOS/Android allow playback
    playMusic();
    setClosing(true);
    setTimeout(onOpen, 850);
  };

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={handleOpen}
          role="button"
          aria-label="Tap to open invitation"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-between overflow-hidden bg-[#efe7d8] active:opacity-95"
        >
          {/* Full-bleed embossed cover */}
          <motion.img
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 9, ease: "easeOut" }}
            src={introCover}
            alt="Embossed M&Z medallion on cream paper"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Subtle warm vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(60,30,10,0.25)_100%)]" />

          {/* Lamp flames — grow from small to big, flicker softly */}
          <Flame side="left" />
          <Flame side="right" />

          {/* Gold foil shimmer sweep */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.2 }}
            className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-overlay"
          />

          {/* Top label */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="relative z-10 mt-10 px-6 text-center font-serif text-xs italic tracking-[0.32em] text-[#5b3a1e] sm:text-sm"
          >
            YOU ARE INVITED FOR OUR SPECIAL DAY
          </motion.p>

          {/* Bottom tap-to-open */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="relative z-10 mb-12 flex flex-col items-center gap-3 text-center"
          >
            <motion.span
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="font-display text-[0.7rem] uppercase tracking-[0.5em] text-[#5b3a1e]"
            >
              Tap to Open
            </motion.span>
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#8a5a2b] to-transparent" />
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#7a4f2c]/80">
              Best with sound on
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Flame({ side }: { side: "left" | "right" }) {
  const pos = side === "left" ? "left-[14%]" : "right-[14%]";
  return (
    <div className={`pointer-events-none absolute bottom-[18%] ${pos} z-[5]`}>
      {/* Outer warm halo — grows from small to big */}
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 0.55, 0.45, 0.6], scale: [0.2, 1, 0.95, 1.05] }}
        transition={{ duration: 4.5, times: [0, 0.6, 0.8, 1], ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
        className="h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,196,90,0.85) 0%, rgba(255,140,40,0.45) 35%, transparent 70%)" }}
      />
      {/* Inner bright core flame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: [0, 0.95, 0.8, 1], scale: [0.1, 0.7, 0.6, 0.8] }}
        transition={{ duration: 4.5, times: [0, 0.6, 0.8, 1], ease: "easeOut", repeat: Infinity, repeatType: "mirror", delay: 0.1 }}
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
        style={{ background: "radial-gradient(circle, rgba(255,250,220,0.95) 0%, rgba(255,180,70,0.7) 50%, transparent 80%)" }}
      />
      {/* Tiny flicker spark */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.7, 1, 0.65], scale: [0.9, 1.1, 0.95, 1.15, 1] }}
        transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, #fff7d6 0%, #ffc266 60%, transparent 100%)" }}
      />
    </div>
  );
}
