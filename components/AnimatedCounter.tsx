'use client';

import { useEffect, useState } from 'react';

export default function AnimatedCounter({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [value]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 text-center shadow-card backdrop-blur-xl">
      <p className="text-4xl font-semibold text-white">{count.toLocaleString()}+</p>
      <p className="mt-3 text-sm uppercase tracking-[0.22em] text-purple-200/80">{label}</p>
    </div>
  );
}
