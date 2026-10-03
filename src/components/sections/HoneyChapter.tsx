'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText, Reveal } from '@/components/ui/Reveal';

/**
 * Honey's own chapter. A single droplet falls through darkness as the
 * visitor scrolls, refracts light, and swells into an abstract amber
 * landscape.
 */
export default function HoneyChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const dropY = useTransform(scrollYProgress, [0, 0.55], ['-30vh', '42vh']);
  const dropScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 0.85],
    [0.4, 1, 1.2, 40]
  );
  const dropOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const fieldOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.78],
    [0, 1]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.65],
    [0, 1, 1, 0]
  );
  const endTextOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);

  return (
    <section
      ref={ref}
      id="honey"
      aria-label="Honey — The Golden Element"
      className="relative h-[320vh] bg-obsidian"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* dark amber void */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 90% at 50% 50%, #1a0f04 0%, #0b0a09 70%)',
          }}
        />

        {/* amber landscape that the droplet becomes */}
        <motion.div
          style={{ opacity: fieldOpacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 100% at 40% 30%, #e0a94a 0%, #c88a2e 35%, #9a641d 65%, #4a2f0c 100%)',
            }}
          />
          <div
            className="absolute inset-0 mix-blend-screen opacity-60"
            style={{
              background:
                'radial-gradient(40% 30% at 65% 60%, #f6e3b0 0%, transparent 60%)',
            }}
          />
          <div className="grain-overlay absolute inset-0 opacity-30" />
        </motion.div>

        {/* droplet */}
        <motion.div
          style={{ y: dropY, scale: dropScale, opacity: dropOpacity }}
          className="absolute left-1/2 top-1/2 h-24 w-20 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="h-full w-full"
            style={{
              borderRadius: '50% 50% 50% 50% / 62% 62% 38% 38%',
              background:
                'radial-gradient(35% 30% at 38% 30%, #f6e3b0 0%, #e0a94a 30%, #c88a2e 55%, #7a4a12 100%)',
              boxShadow:
                'inset -6px -10px 20px rgba(74,47,12,0.6), inset 6px 6px 14px rgba(246,227,176,0.5), 0 20px 60px rgba(200,138,46,0.4)',
            }}
          />
        </motion.div>

        {/* opening text */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 px-6 text-center"
        >
          <p className="eyebrow mb-8 text-amber-light/80">08 — Honey</p>
          <RevealText
            as="h2"
            className="font-display text-[clamp(2.6rem,8vw,7rem)] font-light leading-[0.9] tracking-tightest text-pearl"
            lines={['The golden', 'element.']}
          />
        </motion.div>

        {/* closing text over the amber field */}
        <motion.div
          style={{ opacity: endTextOpacity }}
          className="relative z-10 max-w-xl px-6 text-center"
        >
          <h3 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-tight tracking-tightest text-cacao-deep">
            Raw Sidr honey, drawn from the desert bloom.
          </h3>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed tracking-luxe text-cacao-deep/80 md:text-base">
              Honey is not an accent in the EKTIFA world — it is a material in
              its own right. It sweetens the caramel, blooms the saffron, and
              stands alone as the house&apos;s most elemental offering.
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
