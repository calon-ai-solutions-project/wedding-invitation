import { Music, VolumeX } from "lucide-react";
import { toggleMusic, useMusicState } from "@/lib/music";

export function MusicToggle() {
  const playing = useMusicState();

  return (
    <button
      onClick={toggleMusic}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-white shadow-gold transition hover:scale-110"
    >
      {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
    </button>
  );
}
