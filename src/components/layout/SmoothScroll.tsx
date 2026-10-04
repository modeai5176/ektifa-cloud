'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Lenis-driven smooth scroll. Respects prefers-reduced-motion by
 * falling back to native scroll.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // expose for other modules (e.g. anchor navigation)
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
