import { useEffect, useRef, useState } from "react";

interface Props { end: number; duration?: number; suffix?: string; className?: string; decimals?: number; }

const CountUp = ({ end, duration = 1800, suffix = "", className = "", decimals = 0 }: Props) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(eased * end);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.floor(value).toLocaleString();

  return <span ref={ref} className={className}>{formatted}{suffix}</span>;
};

export default CountUp;
