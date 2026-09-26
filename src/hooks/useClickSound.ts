import { useEffect } from "react";

/**
 * Plays a subtle synth "click" sound on every click anywhere in the document.
 * Uses Web Audio API — no asset required.
 */
const useClickSound = () => {
  useEffect(() => {
    let ctx: AudioContext | null = null;
    const play = () => {
      try {
        if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.setValueAtTime(880, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);
        g.gain.setValueAtTime(0.06, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.11);
      } catch {}
    };
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      if (t.closest("button, a, [role='button']")) play();
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);
};

export default useClickSound;
