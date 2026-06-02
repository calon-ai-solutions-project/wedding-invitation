import mzLogo from "@/assets/mz-monogram.png";
import { useMusicState } from "@/lib/music";

type Props = { size?: number; className?: string };

export function Monogram({ size = 180, className = "" }: Props) {
  const playing = useMusicState();
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ornate ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 text-gold animate-slow-spin"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        aria-hidden
      >
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="92" strokeDasharray="2 4" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24;
          const r = (v: number) => Math.round(v * 100) / 100;
          const x1 = r(100 + Math.cos(a) * 86);
          const y1 = r(100 + Math.sin(a) * 86);
          const x2 = r(100 + Math.cos(a) * 78);
          const y2 = r(100 + Math.sin(a) * 78);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </svg>

      {/* Inner emblem ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 text-gold-dark"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        aria-hidden
      >
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="62" strokeWidth="0.3" />
      </svg>

      {/* The actual gold MZ monogram */}
      <img
        src={mzLogo}
        alt="M & Z Monogram"
        className="relative z-10 object-contain drop-shadow-[0_4px_14px_rgba(201,168,76,0.55)]"
        style={{
          width: size * 0.78,
          height: size * 0.78,
        }}
      />

      {/* Soft gold glow — intensifies in sync with the music */}
      <div
        className="absolute inset-0 rounded-full animate-gold-shimmer pointer-events-none transition-all duration-[1200ms] ease-out"
        style={{
          background: `radial-gradient(circle, oklch(0.82 0.15 80 / ${playing ? 0.65 : 0.3}) 0%, transparent ${playing ? 72 : 60}%)`,
          filter: `blur(${playing ? 16 : 10}px)`,
          transform: `scale(${playing ? 1.08 : 1})`,
          animationDuration: playing ? "2.4s" : "4.8s",
        }}
        aria-hidden
      />
    </div>
  );
}
