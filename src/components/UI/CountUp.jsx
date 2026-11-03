import { useEffect, useRef, useState } from "react";

const DURATION_MS = 700;

// Animates from the previous value to `value`; `format` renders each frame.
export default function CountUp({ value, format = (n) => Math.round(n) }) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const from = fromRef.current;
    if (reduceMotion || from === value) {
      setDisplay(value);
      fromRef.current = value;
      return;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (value - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      fromRef.current = value;
    };
  }, [value]);

  return <>{format(display)}</>;
}
