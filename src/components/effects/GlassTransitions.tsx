import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Each rectangular cell is split into two triangles. Unlike ten giant panes,
// these tessellate the entire control without leaving uncovered gaps.
const makeShards = (columns: number, rows: number) => {
  const pieces: { clip: string; x: number; y: number; index: number }[] = [];
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x0 = (column / columns) * 100;
      const x1 = ((column + 1) / columns) * 100;
      const y0 = (row / rows) * 100;
      const y1 = ((row + 1) / rows) * 100;
      const alternate = (row + column) % 2 === 0;
      const corners = alternate
        ? [[[x0, y0], [x1, y0], [x1, y1]], [[x0, y0], [x1, y1], [x0, y1]]]
        : [[[x0, y0], [x1, y0], [x0, y1]], [[x1, y0], [x1, y1], [x0, y1]]];
      corners.forEach((triangle, half) => pieces.push({
        clip: `polygon(${triangle.map(([x, y]) => `${x}% ${y}%`).join(", ")})`,
        x: (column + 0.5 - columns / 2) / (columns / 2),
        y: (row + 0.5 - rows / 2) / (rows / 2),
        index: pieces.length + half,
      }));
    }
  }
  return pieces;
};

const cardShards = makeShards(6, 5);
const buttonShards = makeShards(5, 3);
const pageShards = makeShards(6, 5);

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
       const isCard = rect.height > 90 && rect.width > 150;
       const pieces = isCard ? cardShards : buttonShards;

      const holder = document.createElement("div");
      holder.className = "glass-click-fragments";
      holder.setAttribute("aria-hidden", "true");
      holder.style.left = `${rect.left}px`;
      holder.style.top = `${rect.top}px`;
      holder.style.width = `${rect.width}px`;
      holder.style.height = `${rect.height}px`;
      const computed = getComputedStyle(control);
       for (let index = 0; index < pieces.length; index += 1) {
         const shard = pieces[index];
        const piece = control.cloneNode(true) as HTMLElement;
        piece.removeAttribute("id");
        piece.removeAttribute("href");
        piece.removeAttribute("tabindex");
         piece.querySelectorAll("[id], [href], [tabindex]").forEach((node) => {
           node.removeAttribute("id");
           node.removeAttribute("href");
           node.removeAttribute("tabindex");
         });
         piece.style.cssText = `position:absolute;inset:0;width:100%;height:100%;margin:0;max-width:none;min-width:0;pointer-events:none;animation:none;transition:none;transform:none;clip-path:${shard.clip};color:${computed.color};border-radius:${computed.borderRadius};`;
        piece.classList.add("glass-click-piece");
         const spread = isCard ? 130 : 76;
         piece.style.setProperty("--piece-x", `${shard.x * spread + Math.sin(index * 7.3) * 27}px`);
         piece.style.setProperty("--piece-y", `${shard.y * spread + Math.cos(index * 5.1) * 28}px`);
         piece.style.setProperty("--piece-z", `${(index % 4) * 35 + 50}px`);
         piece.style.setProperty("--piece-rotate", `${(index % 2 ? 1 : -1) * (65 + index % 5 * 18)}deg`);
         piece.style.setProperty("--piece-tilt", `${(index % 3 - 1) * 78}deg`);
         piece.style.animationDelay = `${index % 6 * 9}ms`;
        holder.appendChild(piece);
      }
      document.body.appendChild(holder);
       // Only the visual original is hidden; its click handler and navigation run normally.
       const previousOpacity = control.style.opacity;
       control.style.opacity = "0";
       window.setTimeout(() => { control.style.opacity = previousOpacity; holder.remove(); }, 1150);
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
     for (let index = 0; index < pageShards.length; index += 1) {
       const shard = pageShards[index];
      const piece = document.createElement("span");
      piece.className = "glass-assembly-piece";
       piece.style.clipPath = shard.clip;
       piece.style.setProperty("--piece-x", `${shard.x * 180 + Math.sin(index * 4) * 50}px`);
       piece.style.setProperty("--piece-y", `${shard.y * 165 + Math.cos(index * 3) * 50}px`);
       piece.style.setProperty("--piece-z", `${100 + index % 5 * 75}px`);
       piece.style.setProperty("--piece-rotate", `${(index % 2 ? 1 : -1) * (40 + index % 6 * 16)}deg`);
       piece.style.setProperty("--piece-tilt", `${(index % 3 - 1) * 65}deg`);
       piece.style.animationDelay = `${index % 8 * 18}ms`;
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