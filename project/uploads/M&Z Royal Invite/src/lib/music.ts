// Shared music singleton powered by a hidden YouTube IFrame player.
// The intro tap calls playMusic() inside the user gesture so mobile
// browsers allow playback. We loop the first ~60s of the track.
import { useEffect, useState } from "react";

const VIDEO_ID = "4h1WFyOQv0Y"; // Jashn-E-Bahaaraa
const LOOP_SECONDS = 60;
const VOLUME = 18; // 0-100, kept low ("hidly")

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  setVolume: (v: number) => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
};

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let player: YTPlayer | null = null;
let ready = false;
let pendingPlay = false;
let loopTimer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<(playing: boolean) => void>();
const emit = (p: boolean) => listeners.forEach((l) => l(p));

function ensureContainer() {
  if (typeof document === "undefined") return null;
  let el = document.getElementById("yt-music-host");
  if (!el) {
    el = document.createElement("div");
    el.id = "yt-music-host";
    el.style.cssText =
      "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(el);
    const inner = document.createElement("div");
    inner.id = "yt-music-player";
    el.appendChild(inner);
  }
  return el;
}

function loadAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if (window.YT && window.YT.Player) return resolve();
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.getElementById("yt-iframe-api")) {
      const s = document.createElement("script");
      s.id = "yt-iframe-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
  });
}

async function init() {
  if (player) return;
  ensureContainer();
  await loadAPI();
  await new Promise<void>((resolve) => {
    player = new window.YT.Player("yt-music-player", {
      videoId: VIDEO_ID,
      width: "1",
      height: "1",
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        start: 0,
      },
      events: {
        onReady: () => {
          ready = true;
          try {
            (player as any).unMute?.();
          } catch {}
          player?.setVolume(VOLUME);
          if (pendingPlay) {
            pendingPlay = false;
            try {
              (player as any).unMute?.();
              player?.setVolume(VOLUME);
              player?.playVideo();
            } catch {}
          }
          startLoopWatcher();
          resolve();
        },
        onStateChange: (e: any) => {
          // 1 = playing, 2 = paused, 0 = ended
          if (e.data === 1) emit(true);
          if (e.data === 2) emit(false);
          if (e.data === 0) {
            player?.seekTo(0, true);
            player?.playVideo();
          }
        },
      },
    }) as unknown as YTPlayer;
  });
}

function startLoopWatcher() {
  if (loopTimer) return;
  loopTimer = setInterval(() => {
    if (!player || !ready) return;
    try {
      if (player.getCurrentTime() >= LOOP_SECONDS) {
        player.seekTo(0, true);
      }
    } catch {}
  }, 1000);
}

export function preloadMusic() {
  // Kick off API + player creation early so the tap can play synchronously.
  init();
}

export function playMusic() {
  if (ready && player) {
    try {
      (player as any).unMute?.();
      player.setVolume(VOLUME);
      player.playVideo();
    } catch {}
    return;
  }
  pendingPlay = true;
  init();
}

export function pauseMusic() {
  player?.pauseVideo();
}

export function toggleMusic() {
  if (!player || !ready) {
    playMusic();
    return;
  }
  // 1 = playing
  if (player.getPlayerState() === 1) player.pauseVideo();
  else player.playVideo();
}

export function useMusicState() {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    listeners.add(setPlaying);
    return () => {
      listeners.delete(setPlaying);
    };
  }, []);
  return playing;
}
