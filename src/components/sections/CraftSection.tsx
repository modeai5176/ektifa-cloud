'use client';

import { useEffect, useRef, useState } from 'react';
import { craftStages } from '@/data/craft';
import { Reveal } from '@/components/ui/Reveal';

const stageTones = [
  { base: '#2a1810', hi: '#6b4428', sh: '#120a06' }, // the hand
  { base: '#9a641d', hi: '#e0a94a', sh: '#4a2f0c' }, // temperature / honey
  { base: '#6b4320', hi: '#c3883f', sh: '#2e1a0a' }, // finish
  { base: '#8a8072', hi: '#c9b79c', sh: '#4a443c' }, // detail / case
  { base: '#1a0f0a', hi: '#3d2619', sh: '#0b0a09' }, // the object
];

/**
 * A manufacture / atelier sequence. GSAP pins the section and drives
 * stage transitions as the visitor scrolls; the backdrop zooms from an
 * abstract macro field into the material — a controlled "microscope".
 */
export default function CraftSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(0); // 0..1 within-stage zoom

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: 'top top',
          end: `+=${craftStages.length * 100}%`,
          pin: pinRef.current!,
          scrub: prefersReduced ? false : 0.6,
          onUpdate: (self) => {
            const p = self.progress * craftStages.length;
            const idx = Math.min(craftStages.length - 1, Math.floor(p));
            setActive(idx);
            setZoom(p - idx);
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  const tone = stageTones[active] ?? stageTones[0];
  const stage = craftStages[active];
  // microscope: scale the backdrop within each stage, then "reveal"
  const scale = 1.05 + zoom * 0.5;
  const revealed = zoom > 0.55;

  return (
    <section
      ref={sectionRef}
      id="craft"
      aria-label="Craft"
      className="relative bg-obsidian"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] items-center justify-center overflow-hidden"
      >
        {/* microscope backdrop */}
        <div
          className="absolute inset-0 transition-[background] duration-1000 ease-luxe"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 0.2s linear',
            background: `radial-gradient(120% 120% at 40% 30%, ${tone.hi} 0%, ${tone.base} 45%, ${tone.sh} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            opacity: revealed ? 0.15 : 0.6,
            transition: 'opacity 0.6s var(--ease-luxe)',
            background: `linear-gradient(115deg, transparent 35%, ${tone.hi}55 50%, transparent 65%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 100% at 50% 50%, transparent 30%, rgba(11,10,9,0.7) 100%)',
          }}
        />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-25" />

        {/* progress rail */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex lg:left-14">
          {craftStages.map((s, i) => (
            <div key={s.index} className="flex items-center gap-3">
              <span
                className={`h-px transition-all duration-700 ease-luxe ${
                  i === active ? 'w-10 bg-pearl' : 'w-5 bg-sand/30'
                }`}
              />
              <span
                className={`text-[0.6rem] tracking-widest transition-colors duration-700 ${
                  i === active ? 'text-pearl' : 'text-sand/40'
                }`}
              >
                {s.index}
              </span>
            </div>
          ))}
        </div>

        {/* stage content */}
        <div className="relative z-10 px-6 text-center">
          <p className="eyebrow mb-8 text-pearl/60">05 — Craft</p>
          <h2
            key={`title-${active}`}
            className="font-display text-[clamp(3rem,11vw,10rem)] font-light leading-[0.9] tracking-tightest text-pearl"
            style={{ animation: 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {stage.title}
          </h2>
          <p
            key={`line-${active}`}
            className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed tracking-luxe text-pearl/75 md:text-lg"
            style={{ animation: 'fade-up 1.1s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {stage.line}
          </p>
          {/* microscope reveal caption */}
          <p
            className="mx-auto mt-6 max-w-md text-xs font-light leading-relaxed tracking-widest text-sand/60 transition-opacity duration-700"
            style={{ opacity: revealed ? 1 : 0 }}
          >
            {stage.detail}
          </p>
        </div>
      </div>

      {/* non-pinned intro for context on first paint */}
      <div className="sr-only">
        <Reveal>
          <p>The EKTIFA manufacture — from the hand to the finished object.</p>
        </Reveal>
      </div>
    </section>
  );
}
