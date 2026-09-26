import { useMemo } from "react";

interface Props { count?: number; className?: string; }

const FloatingBubbles = ({ count = 14, className = "" }: Props) => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 12 + Math.random() * 60;
        const left = Math.random() * 100;
        const delay = Math.random() * 14;
        const duration = 10 + Math.random() * 14;
        const isOrange = i % 2 === 0;
        return { i, size, left, delay, duration, isOrange };
      }),
    [count]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.i}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            background: b.isOrange
              ? "radial-gradient(circle at 30% 30%, hsl(22 95% 55% / .55), hsl(22 95% 55% / .15) 60%, transparent 70%)"
              : "radial-gradient(circle at 30% 30%, hsl(220 90% 52% / .55), hsl(220 90% 52% / .15) 60%, transparent 70%)",
            border: b.isOrange
              ? "1px solid hsl(22 95% 55% / .35)"
              : "1px solid hsl(220 90% 52% / .35)",
            boxShadow: b.isOrange
              ? "inset 0 0 12px hsl(22 95% 55% / .3)"
              : "inset 0 0 12px hsl(220 90% 52% / .3)",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
