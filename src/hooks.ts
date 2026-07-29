import { useEffect, useRef, useState } from "react";

/** Animated count-up with ease-out, restarts when target changes. */
export function useCountUp(target: number, duration = 1300): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/** Ticking UTC clock. */
export function useClock(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** IntersectionObserver-based scroll reveal (fires once). */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, shown };
}

/** Small live jitter around a base value — makes telemetry feel alive. */
export function useJitter(base: number, spread: number, intervalMs = 2200): number {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(Math.max(1, Math.round(base + (Math.random() * 2 - 1) * spread)));
    }, intervalMs + Math.random() * 400);
    return () => clearInterval(id);
  }, [base, spread, intervalMs]);
  return value;
}

/** Rotating feed of log lines; newest first, capped. */
export function useLiveFeed(pool: string[], cap = 4, intervalMs = 3800) {
  const [lines, setLines] = useState<{ id: number; text: string; time: string }[]>([]);
  const counter = useRef(0);
  useEffect(() => {
    const stamp = () =>
      new Date().toISOString().slice(11, 19) + "Z";
    // seed two lines immediately so the panel never looks empty
    setLines([
      { id: 1, text: pool[0], time: stamp() },
      { id: 2, text: pool[1], time: stamp() },
    ]);
    counter.current = 2;
    const id = setInterval(() => {
      counter.current += 1;
      setLines((prev) =>
        [
          {
            id: counter.current,
            text: pool[counter.current % pool.length],
            time: stamp(),
          },
          ...prev,
        ].slice(0, cap)
      );
    }, intervalMs);
    return () => clearInterval(id);
  }, [pool, cap, intervalMs]);
  return lines;
}
