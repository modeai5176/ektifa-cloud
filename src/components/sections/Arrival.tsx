'use client';

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-obsidian" />,
});

const ease = [0.16, 1, 0.3, 1] as const;

export default function Arrival() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // content drifts up and fades as the visitor begins to scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
      aria-label="The Arrival"
    >
      {/* 3D chocolate surface */}
      <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
        <HeroScene />
      </motion.div>

      {/* vignette to deepen the edges toward near-black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 40%, transparent 40%, rgba(11,10,9,0.55) 80%, rgba(11,10,9,0.92) 100%)',
        }}
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />

      {/* Headline */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.6 }}
          className="eyebrow mb-8 text-sand/80"
        >
          A Contemporary Emirati Maison
        </motion.p>

        <h1 className="overflow-hidden">
          <motion.span
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.6, ease, delay: 0.85 }}
            className="block font-display text-[clamp(4.5rem,20vw,16rem)] font-light leading-[0.85] tracking-tightest text-pearl"
          >
            EKTIFA
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease, delay: 1.5 }}
          className="mt-8 text-sm font-light tracking-widest text-bone/70 md:text-base"
        >
          CRAFTED IN THE EMIRATES
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease, delay: 1.7 }}
          className="font-arabic mt-3 text-base text-sand/50"
          dir="rtl"
          aria-hidden
        >
          صُنع في الإمارات
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease, delay: 2 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow text-[0.6rem] text-bone/50">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-sand/15">
          <span className="absolute inset-0 origin-top animate-scroll-hint bg-sand/70" />
        </span>
      </motion.div>
    </section>
  );
}
