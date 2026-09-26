import { useEffect, useRef } from "react";

/* Circuit board / hex grid pattern drawn on canvas */
const CircuitPattern = ({ color = "rgba(16, 185, 129, 0.06)", className = "" }: { color?: string; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      // Draw circuit lines
      const spacing = 60;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // Horizontal line
          if (Math.random() > 0.5) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + spacing, y);
            ctx.stroke();
          }
          // Vertical line
          if (Math.random() > 0.6) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + spacing);
            ctx.stroke();
          }
          // Node dot
          if (Math.random() > 0.7) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          }
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [color]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
};

/* Animated scanning line effect */
const ScanLine = ({ duration = 4 }: { duration?: number }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute left-0 right-0 h-[2px] opacity-20"
      style={{
        background: "linear-gradient(90deg, transparent, #10b981, transparent)",
        animation: `scanDown ${duration}s linear infinite`,
      }}
    />
    <style>{`
      @keyframes scanDown {
        0% { top: -2px; }
        100% { top: 100%; }
      }
    `}</style>
  </div>
);

/* Floating binary bits */
const BinaryFloat = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
    {Array.from({ length: 20 }).map((_, i) => (
      <span
        key={i}
        className="absolute text-emerald-600 font-mono text-xs select-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${8 + Math.random() * 10}px`,
        }}
      >
        {Math.random() > 0.5 ? "1" : "0"}
      </span>
    ))}
  </div>
);

/* Hex grid SVG pattern */
const HexGrid = ({ opacity = 0.03 }: { opacity?: number }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
          <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" />
          <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-600" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
);

/* Shield pulse ring */
const ShieldPulse = ({ className = "" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
    <div className="absolute inset-[-8px] rounded-full border border-emerald-400/10 animate-pulse" />
  </div>
);

/* Cyber data stream bar */
const DataStream = () => {
  const chars = "ABCDEFabcdef0123456789";
  const generateHash = () => Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

  return (
    <div className="overflow-hidden bg-gray-900/5 rounded-lg py-1 px-3 border border-emerald-500/10">
      <div className="flex gap-4 font-mono text-[9px] text-emerald-600/40 whitespace-nowrap">
        <span>SHA256: {generateHash()}</span>
        <span>|</span>
        <span>MD5: {generateHash().slice(0, 16)}</span>
        <span>|</span>
        <span>AES-256-GCM</span>
      </div>
    </div>
  );
};

export { CircuitPattern, ScanLine, BinaryFloat, HexGrid, ShieldPulse, DataStream };
