'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { materialGallery } from '@/data/materials';
import MacroSurface from '@/components/ui/MacroSurface';
import { Reveal } from '@/components/ui/Reveal';

/**
 * A pinned horizontal gallery of material studies. Vertical scroll is
 * translated into a slow horizontal pan across the materials.
 */
export default function MaterialGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // pan the track; total travel tuned to the number of panels
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-82%']);

  return (
    <section
      ref={ref}
      id="material"
      className="relative h-[420vh] bg-obsidian"
      aria-label="The Material"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* heading */}
        <div className="mx-auto w-full max-w-maison px-6 pt-28 md:px-10 lg:px-14">
          <Reveal>
            <p className="eyebrow text-sand/70">03 — The Material</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-none tracking-tightest text-pearl">
              The material.
            </h2>
          </Reveal>
        </div>

        {/* horizontal track */}
        <motion.div
          style={{ x }}
          className="mt-12 flex h-full items-center gap-6 px-6 md:gap-10 md:px-10 lg:px-14"
        >
          {materialGallery.map((m) => (
            <article
              key={m.index}
              className="group relative h-[52vh] w-[78vw] shrink-0 overflow-hidden sm:w-[46vw] lg:h-[58vh] lg:w-[30vw]"
            >
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-luxe group-hover:scale-110">
                <MacroSurface material={m} />
              </div>
              {/* label plate */}
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <span className="text-xs font-light tracking-widest text-pearl/70">
                  {m.index}
                </span>
                <div>
                  <h3 className="font-display text-4xl font-light tracking-tight text-pearl">
                    {m.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm font-light leading-relaxed tracking-luxe text-pearl/75 opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100">
                    {m.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
          <div className="w-[20vw] shrink-0" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
