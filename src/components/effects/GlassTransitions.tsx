import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const shards = [
  "polygon(0 0, 34% 0, 17% 36%)",
  "polygon(34% 0, 67% 0, 48% 34%, 17% 36%)",
  "polygon(67% 0, 100% 0, 100% 33%, 48% 34%)",
  "polygon(0 0, 17% 36%, 0 68%)",
  "polygon(17% 36%, 48% 34%, 34% 69%, 0 68%)",
  "polygon(48% 34%, 100% 33%, 69% 67%, 34% 69%)",
  "polygon(100% 33%, 100% 100%, 69% 67%)",
  "polygon(0 68%, 34% 69%, 33% 100%, 0 100%)",
  "polygon(34% 69%, 69% 67%, 67% 100%, 33% 100%)",
  "polygon(69% 67%, 100% 100%, 67% 100%)",
];

const isReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Decorative effects only: navigation and button handlers continue to run normally. */
export default function GlassTransitions() {
  const location = useLocation();
  const initial = useRef(true);

  useEffect(() => {
    if (isReduced()) return;

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest("button, a[href], [role='button']");
      if (!(control instanceof HTMLElement) || control.matches(":disabled, [aria-disabled='true']")) return;
      const rect = control.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.width > window.innerWidth * 0.95) return;

      const holder = document.createElement("div");
      holder.className = "glass-click-fragments";
      holder.setAttribute("aria-hidden", "true");
      holder.style.left = `${rect.left}px`;
      holder.style.top = `${rect.top}px`;
      holder.style.width = `${rect.width}px`;
      holder.style.height = `${rect.height}px`;
      const computed = getComputedStyle(control);
      for (let index = 0; index < shards.length; index += 1) {
        const piece = control.cloneNode(true) as HTMLElement;
        piece.removeAttribute("id");
        piece.removeAttribute("href");
        piece.removeAttribute("tabindex");
        piece.style.cssText = `position:absolute;inset:0;width:100%;height:100%;margin:0;max-width:none;min-width:0;pointer-events:none;animation:none;transition:none;transform:none;clip-path:${shards[index]};background:${computed.backgroundColor};color:${computed.color};border-radius:0;`;
        piece.classList.add("glass-click-piece");
        piece.style.setProperty("--piece-x", `${((index % 4) - 1.5) * 33}px`);
        piece.style.setProperty("--piece-y", `${(Math.floor(index / 4) - 1) * 35}px`);
        piece.style.setProperty("--piece-rotate", `${(index % 2 ? 1 : -1) * (15 + index * 3)}deg`);
        holder.appendChild(piece);
      }
      document.body.appendChild(holder);
      window.setTimeout(() => holder.remove(), 740);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    if (isReduced()) return;

    const overlay = document.createElement("div");
    overlay.className = "glass-page-assembly";
    overlay.setAttribute("aria-hidden", "true");
    for (let index = 0; index < shards.length; index += 1) {
      const piece = document.createElement("span");
      piece.className = "glass-assembly-piece";
      piece.style.clipPath = shards[index];
      piece.style.setProperty("--piece-x", `${((index % 4) - 1.5) * 105}px`);
      piece.style.setProperty("--piece-y", `${(Math.floor(index / 4) - 1) * 115}px`);
      piece.style.setProperty("--piece-rotate", `${(index % 2 ? 1 : -1) * (14 + index * 4)}deg`);
      piece.style.animationDelay = `${index * 24}ms`;
      overlay.appendChild(piece);
    }
    document.body.appendChild(overlay);
    const main = document.querySelector("main");
    main?.classList.remove("glass-page-enter");
    // Restart the entrance animation even when the router reuses a page shell.
    void main?.getBoundingClientRect();
    main?.classList.add("glass-page-enter");
    const timeout = window.setTimeout(() => {
      overlay.remove();
      main?.classList.remove("glass-page-enter");
    }, 1250);
    return () => {
      window.clearTimeout(timeout);
      overlay.remove();
      main?.classList.remove("glass-page-enter");
    };
  }, [location.pathname]);

  return null;
}