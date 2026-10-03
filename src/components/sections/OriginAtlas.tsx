'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { originNodes } from '@/data/origin';
import { RevealText, Reveal } from '@/components/ui/Reveal';

/**
 * An editorial atlas. Nodes trace the journey from cacao to the maison,
 * joined by a hand-drawn route. Selecting a node tells its chapter.
 */
export default function OriginAtlas() {
  const [active, setActive] = useState(0);
  const node = originNodes[active];

  // build the route path through all nodes (in viewBox 1000x560)
  const points = originNodes.map((n) => ({
    x: n.x * 1000,
    y: n.y * 560,
  }));
  const route = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <section
      id="origin"
      aria-label="Origin"
      className="relative overflow-hidden bg-cacao-deep py-28 md:py-36"
    >
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-15" />
      <div className="relative mx-auto w-full max-w-maison px-6 md:px-10 lg:px-14">
        <Reveal>
          <p className="eyebrow text-sand/70">09 — Origin</p>
        </Reveal>
        <RevealText
          as="h2"
          className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-tightest text-pearl"
          lines={['An atlas of', 'where it begins.']}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          {/* atlas plate */}
          <div className="relative aspect-[1000/560] w-full overflow-hidden rounded-sm border border-sand/10 bg-obsidian/40">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 100% at 30% 20%, #241410 0%, #120a06 70%)',
              }}
            />
            {/* engraved latitude lines */}
            <svg
              viewBox="0 0 1000 560"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  x2="1000"
                  y1={(i + 1) * 70}
                  y2={(i + 1) * 70}
                  stroke="#c9b79c"
                  strokeOpacity="0.07"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  y1="0"
                  y2="560"
                  x1={(i + 1) * 83}
                  x2={(i + 1) * 83}
                  stroke="#c9b79c"
                  strokeOpacity="0.07"
                  strokeWidth="1"
                />
              ))}

              {/* route */}
              <motion.path
                d={route}
                fill="none"
                stroke="#a8864e"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* nodes */}
              {originNodes.map((n, i) => (
                <g
                  key={n.index}
                  transform={`translate(${n.x * 1000} ${n.y * 560})`}
                  className="cursor-pointer"
                  onClick={() => setActive(i)}
                  role="button"
                  aria-label={`${n.label} — ${n.place}`}
                >
                  <circle
                    r={i === active ? 22 : 14}
                    fill="transparent"
                    stroke={i === active ? '#e0a94a' : '#c9b79c'}
                    strokeOpacity={i === active ? 0.8 : 0.35}
                    strokeWidth="1"
                    className="transition-all duration-500"
                  />
                  <circle
                    r={i === active ? 5 : 3}
                    fill={i === active ? '#e0a94a' : '#c9b79c'}
                    className="transition-all duration-500"
                  />
                  <text
                    x="0"
                    y={-28}
                    textAnchor="middle"
                    fill={i === active ? '#f6f2e9' : '#c9b79c'}
                    fillOpacity={i === active ? 1 : 0.5}
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.2em',
                      fontFamily: 'var(--font-sans)',
                    }}
                    className="transition-all duration-500"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* chapter detail */}
          <div className="relative">
            <div className="flex gap-2">
              {originNodes.map((n, i) => (
                <button
                  key={n.index}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${n.label}`}
                  className={`h-px flex-1 transition-all duration-500 ${
                    i === active ? 'bg-amber-light' : 'bg-sand/20'
                  }`}
                />
              ))}
            </div>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <span className="font-display text-6xl font-light text-sand/30">
                {node.index}
              </span>
              <h3 className="mt-4 font-display text-4xl font-light tracking-tight text-pearl">
                {node.label}
              </h3>
              <p className="mt-1 text-xs tracking-widest text-amber-light/70">
                {node.place.toUpperCase()}
              </p>
              <p className="mt-6 max-w-sm text-base font-light leading-relaxed tracking-luxe text-bone/75">
                {node.note}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
