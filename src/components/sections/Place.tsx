'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText, Reveal } from '@/components/ui/Reveal';

/**
 * An abstract desert landscape composed from layered dune curves and
 * raking light — no stock photography. Parallax gives it depth as the
 * visitor passes through.
 */
export default function Place() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const farY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['-14%', '10%']);
  const nearY = useTransform(scrollYProgress, [0, 1], ['-22%', '16%']);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[110svh] items-center overflow-hidden bg-cacao-deep"
      aria-label="Place"
    >
      {/* Sky / atmosphere */}
      <motion.div
        style={{ scale: skyScale }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #120a06 0%, #241410 30%, #4a2f1c 62%, #7a5436 100%)',
          }}
        />
        {/* raking sun glow */}
        <div
          className="absolute left-1/2 top-[22%] h-[40vw] w-[40vw] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(224,169,74,0.28) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Dune layers */}
      <motion.div style={{ y: farY }} className="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 400" className="h-auto w-full" preserveAspectRatio="none">
          <path
            d="M0,220 C320,140 520,200 760,170 C1020,138 1200,210 1440,160 L1440,400 L0,400 Z"
            fill="#5c3a22"
          />
        </svg>
      </motion.div>
      <motion.div style={{ y: midY }} className="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 360" className="h-auto w-full" preserveAspectRatio="none">
          <path
            d="M0,240 C260,180 480,250 720,210 C980,166 1180,250 1440,200 L1440,360 L0,360 Z"
            fill="#3d2619"
          />
        </svg>
      </motion.div>
      <motion.div style={{ y: nearY }} className="absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 300" className="h-auto w-full" preserveAspectRatio="none">
          <path
            d="M0,220 C300,260 520,180 780,220 C1040,258 1220,190 1440,230 L1440,300 L0,300 Z"
            fill="#1a0f0a"
          />
        </svg>
      </motion.div>

      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-25" />

      {/* Copy */}
      <div className="relative z-10 mx-auto w-full max-w-maison px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-sand/70">02 — Place</p>
          </Reveal>
          <RevealText
            as="h2"
            className="mt-8 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[0.98] tracking-tightest text-pearl"
            lines={['Born from a place where', 'hospitality is an art.']}
          />
          <Reveal delay={0.2} className="mt-10 max-w-xl">
            <p className="text-base font-light leading-relaxed tracking-luxe text-bone/75 md:text-lg">
              EKTIFA is an Emirati maison built around generosity. In this
              country, to receive a guest is a discipline — of warmth, of
              patience, of the finest things offered without announcement. We
              translate that ritual into chocolate and honey: objects made to be
              given, and given well.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
