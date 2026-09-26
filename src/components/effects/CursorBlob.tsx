import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  kind: "foam" | "drop";
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  life: number;
  maxLife: number;
  stretch: number;
  angle: number;
};

const MAX_PARTICLES = 180;
const MAX_RIPPLES = 22;

const CursorBlob = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (reducedMotion.matches || coarsePointer.matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const primary = rootStyles.getPropertyValue("--primary").trim();
    const secondary = rootStyles.getPropertyValue("--secondary").trim();
    const background = rootStyles.getPropertyValue("--background").trim();
    const color = (token: string, alpha: number) => `hsl(${token} / ${alpha})`;

    const particles: Particle[] = [];
    const ripples: Ripple[] = [];
    const pointer = { x: -400, y: -400, px: -400, py: -400, vx: 0, vy: 0, active: false };
    let animationFrame = 0;
    let lastTime = performance.now();
    let lastSpawn = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addParticle = (particle: Particle) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push(particle);
    };

    const createWake = (speed: number, now: number) => {
      if (!pointer.active || speed < 1.2 || now - lastSpawn < 13) return;
      lastSpawn = now;

      const length = Math.max(speed, 0.001);
      const nx = pointer.vx / length;
      const ny = pointer.vy / length;
      const sideX = -ny;
      const sideY = nx;
      const intensity = Math.min(speed / 22, 1);
      const count = 3 + Math.round(intensity * 6);

      for (let i = 0; i < count; i += 1) {
        const side = i % 2 === 0 ? -1 : 1;
        const spread = 7 + Math.random() * (18 + intensity * 18);
        const back = 9 + Math.random() * 34;
        const life = 380 + Math.random() * 520;
        addParticle({
          x: pointer.x - nx * back + sideX * spread * side,
          y: pointer.y - ny * back + sideY * spread * side,
          vx: -nx * (0.4 + Math.random() * 1.4) + sideX * side * (0.6 + Math.random() * 1.8),
          vy: -ny * (0.4 + Math.random() * 1.4) + sideY * side * (0.6 + Math.random() * 1.8) - Math.random() * 0.9,
          size: 2.5 + Math.random() * (6 + intensity * 6),
          life,
          maxLife: life,
          kind: Math.random() > 0.3 ? "foam" : "drop",
        });
      }

      if (now % 70 < 18) {
        if (ripples.length >= MAX_RIPPLES) ripples.shift();
        ripples.push({
          x: pointer.x - nx * 24,
          y: pointer.y - ny * 24,
          radius: 8,
          life: 560,
          maxLife: 560,
          stretch: 1.5 + intensity,
          angle: Math.atan2(ny, nx),
        });
      }
    };

    const drawWakeCrest = (speed: number) => {
      if (!pointer.active || speed < 0.8) return;
      const length = Math.max(speed, 0.001);
      const nx = pointer.vx / length;
      const ny = pointer.vy / length;
      const sideX = -ny;
      const sideY = nx;
      const wakeLength = 38 + Math.min(speed * 2.5, 78);
      const width = 12 + Math.min(speed * 0.7, 22);

      context.save();
      context.lineCap = "round";
      context.shadowBlur = 14;
      context.shadowColor = color(primary, 0.5);

      [-1, 1].forEach((side) => {
        const gradient = context.createLinearGradient(
          pointer.x,
          pointer.y,
          pointer.x - nx * wakeLength + sideX * width * side,
          pointer.y - ny * wakeLength + sideY * width * side,
        );
        gradient.addColorStop(0, color(background, 0.9));
        gradient.addColorStop(0.35, color(primary, 0.7));
        gradient.addColorStop(1, color(primary, 0));
        context.strokeStyle = gradient;
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(pointer.x - nx * 3, pointer.y - ny * 3);
        context.quadraticCurveTo(
          pointer.x - nx * wakeLength * 0.45 + sideX * width * 0.35 * side,
          pointer.y - ny * wakeLength * 0.45 + sideY * width * 0.35 * side,
          pointer.x - nx * wakeLength + sideX * width * side,
          pointer.y - ny * wakeLength + sideY * width * side,
        );
        context.stroke();
      });
      context.restore();
    };

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const speed = Math.hypot(pointer.vx, pointer.vy);
      createWake(speed, now);

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.life -= 16.67 * dt;
        ripple.radius += 1.35 * dt;
        if (ripple.life <= 0) {
          ripples.splice(index, 1);
          continue;
        }
        const alpha = (ripple.life / ripple.maxLife) * 0.42;
        context.save();
        context.translate(ripple.x, ripple.y);
        context.rotate(ripple.angle);
        context.scale(ripple.stretch, 1);
        context.strokeStyle = color(primary, alpha);
        context.lineWidth = 1.4;
        context.beginPath();
        context.arc(0, 0, ripple.radius, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life -= 16.67 * dt;
        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= Math.exp(-0.05 * dt);
        particle.vy += particle.kind === "drop" ? 0.045 * dt : -0.012 * dt;
        const progress = particle.life / particle.maxLife;
        const radius = particle.size * (0.45 + progress * 0.55);
        const gradient = context.createRadialGradient(
          particle.x - radius * 0.35,
          particle.y - radius * 0.4,
          radius * 0.05,
          particle.x,
          particle.y,
          radius,
        );
        gradient.addColorStop(0, color(background, 0.92 * progress));
        gradient.addColorStop(0.28, color(primary, 0.6 * progress));
        gradient.addColorStop(0.72, color(primary, 0.22 * progress));
        gradient.addColorStop(1, color(secondary, 0));
        context.fillStyle = gradient;
        context.shadowBlur = particle.kind === "foam" ? 9 : 5;
        context.shadowColor = color(primary, 0.45 * progress);
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
        if (particle.kind === "foam" && radius > 4) {
          context.strokeStyle = color(background, 0.65 * progress);
          context.lineWidth = 0.8;
          context.stroke();
        }
      }

      drawWakeCrest(speed);
      pointer.vx *= Math.exp(-0.18 * dt);
      pointer.vy *= Math.exp(-0.18 * dt);
      animationFrame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!pointer.active) {
        pointer.px = event.clientX;
        pointer.py = event.clientY;
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.vx = event.clientX - pointer.px;
      pointer.vy = event.clientY - pointer.py;
      pointer.px = event.clientX;
      pointer.py = event.clientY;
      pointer.active = true;
    };

    const leave = () => {
      pointer.active = false;
    };

    resize();
    animationFrame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-water-wake" aria-hidden="true" />;
};

export default CursorBlob;