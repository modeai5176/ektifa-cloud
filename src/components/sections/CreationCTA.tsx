'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText } from '@/components/ui/Reveal';

export default function CreationCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <section
      ref={ref}
      aria-label="Create your EKTIFA"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* immersive cacao glow */}
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(circle, rgba(168,134,78,0.22) 0%, rgba(61,38,25,0.12) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="eyebrow mb-10 text-sand/70">10 — The EKTIFA Creation</p>
        <RevealText
          as="h2"
          className="font-display text-[clamp(3rem,11vw,10rem)] font-light leading-[0.88] tracking-tightest text-pearl"
          lines={['Create', 'your EKTIFA.']}
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-md text-base font-light leading-relaxed tracking-luxe text-bone/75 md:text-lg"
        >
          A box composed entirely by you — its architecture, its material, its
          chocolates, down to the engraving.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <Link
            href="/create"
            className="group relative inline-flex items-center gap-4 overflow-hidden border border-sand/30 px-10 py-5 transition-colors duration-700 hover:border-brass"
          >
            <span className="absolute inset-0 -translate-x-full bg-brass/90 transition-transform duration-700 ease-luxe group-hover:translate-x-0" />
            <span className="relative eyebrow text-bone transition-colors duration-700 group-hover:text-obsidian">
              Begin your creation
            </span>
            <span className="relative text-bone transition-colors duration-700 group-hover:text-obsidian">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
