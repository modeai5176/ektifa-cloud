'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Collection } from '@/data/collections';

/**
 * A collection presented as a collectible object on a calm architectural
 * ground. A CSS 3D case tilts subtly toward the pointer — controlled,
 * never a gaming spin.
 */
export default function CollectionObject({
  collection,
  i,
}: {
  collection: Collection;
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: -18, y: -24 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -18 - py * 14, y: -24 + px * 26 });
  }
  function onLeave() {
    setTilt({ x: -18, y: -24 });
  }

  return (
    <Link
      href={`/collection/${collection.slug}`}
      className="group relative block"
      aria-label={`${collection.name} collection`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
        className="relative flex min-h-[72svh] flex-col items-center justify-center overflow-hidden px-6 py-20"
      >
        {/* calm architectural ground */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, #120a06 0%, ${
              i % 2 === 0 ? '#1a0f0a' : '#201611'
            } 55%, #0b0a09 100%)`,
          }}
        />
        <div
          className="absolute left-1/2 top-[38%] h-[34vw] w-[34vw] -translate-x-1/2 rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle, ${collection.accentColor}33 0%, transparent 65%)`,
            filter: 'blur(50px)',
          }}
        />

        {/* index + arabic */}
        <div className="relative mb-10 flex w-full max-w-4xl items-center justify-between">
          <span className="eyebrow text-sand/50">{collection.index}</span>
          <span className="font-arabic text-lg text-sand/40" dir="rtl" aria-hidden>
            {collection.arabic}
          </span>
        </div>

        {/* the object — CSS 3D case */}
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative mb-12"
          style={{ perspective: '1200px' }}
        >
          <div
            className="relative transition-transform duration-500 ease-luxe"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              width: '240px',
              height: '150px',
            }}
          >
            {/* case body top */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${collection.caseColor}, ${collection.accentColor})`,
                transform: 'translateZ(0px)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.55)',
              }}
            />
            {/* lid */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${collection.lidColor}, #0b0a09)`,
                transform: 'translateZ(34px)',
              }}
            >
              <span
                className="h-px w-16"
                style={{ background: `${collection.accentColor}` }}
              />
            </div>
            {/* front wall */}
            <div
              className="absolute left-0 top-full h-[34px] w-full origin-top"
              style={{
                background: `linear-gradient(180deg, ${collection.lidColor}, ${collection.caseColor})`,
                transform: 'rotateX(-90deg)',
              }}
            />
            {/* right wall */}
            <div
              className="absolute right-0 top-0 h-full w-[34px] origin-right"
              style={{
                background: `linear-gradient(90deg, ${collection.caseColor}, ${collection.lidColor})`,
                transform: 'rotateY(90deg)',
              }}
            />
          </div>
        </div>

        {/* name + essence */}
        <div className="relative max-w-xl text-center">
          <h3 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-none tracking-tightest text-pearl">
            {collection.name}
          </h3>
          <p className="mt-3 text-xs tracking-widest text-sand/60">
            {collection.tagline.toUpperCase()} · {collection.pieces} PIECES
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed tracking-luxe text-bone/70">
            {collection.essence}
          </p>
          <span className="eyebrow mt-8 inline-block text-brass-light transition-colors group-hover:text-brass">
            Discover the object →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
