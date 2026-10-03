'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Collection } from '@/data/collections';
import { RevealText, Reveal } from '@/components/ui/Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

function Chapter({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 lg:grid-cols-[180px_1fr] lg:gap-16 ${className}`}>
      <Reveal>
        <p className="eyebrow pt-2 text-sand/60">{label}</p>
      </Reveal>
      <div>{children}</div>
    </div>
  );
}

export default function ProductStory({ collection }: { collection: Collection }) {
  return (
    <article className="relative bg-obsidian">
      {/* THE OBJECT — hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(110% 90% at 50% 20%, #241410 0%, #0b0a09 70%)`,
          }}
        />
        <div
          className="absolute left-1/2 top-[34%] h-[40vw] w-[40vw] -translate-x-1/2 rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle, ${collection.accentColor}33 0%, transparent 65%)`,
            filter: 'blur(60px)',
          }}
        />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-15" />

        <div className="relative mx-auto grid w-full max-w-maison gap-12 px-6 md:px-10 lg:grid-cols-2 lg:items-center lg:px-14">
          <div>
            <Reveal>
              <Link
                href="/collection"
                className="eyebrow link-draw text-sand/60"
              >
                ← Collection
              </Link>
            </Reveal>
            <div className="mt-8 flex items-center gap-4">
              <span className="eyebrow text-sand/50">{collection.index}</span>
              <span className="font-arabic text-lg text-sand/40" dir="rtl" aria-hidden>
                {collection.arabic}
              </span>
            </div>
            <RevealText
              as="h1"
              className="mt-6 font-display text-[clamp(3.5rem,10vw,9rem)] font-light leading-[0.85] tracking-tightest text-pearl"
              lines={[collection.name]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-base font-light leading-relaxed tracking-luxe text-bone/75 md:text-lg">
                {collection.essence}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <p className="eyebrow text-sand/50">Pieces</p>
                  <p className="mt-2 font-display text-3xl font-light text-pearl">
                    {collection.pieces}
                  </p>
                </div>
                <div className="h-10 w-px bg-sand/15" />
                <div>
                  <p className="eyebrow text-sand/50">From</p>
                  <p className="mt-2 font-display text-3xl font-light text-pearl">
                    {collection.priceFrom}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* the object — CSS 3D presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: -24, rotateY: -28 }}
            animate={{ opacity: 1, scale: 1, rotateX: -18, rotateY: -24 }}
            transition={{ duration: 1.6, ease, delay: 0.3 }}
            className="relative mx-auto hidden lg:block"
            style={{ perspective: '1400px' }}
          >
            <div
              className="animate-drift-slow"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(-18deg) rotateY(-24deg)',
                width: '320px',
                height: '200px',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${collection.caseColor}, ${collection.accentColor})`,
                  boxShadow: '0 60px 100px rgba(0,0,0,0.6)',
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${collection.lidColor}, #0b0a09)`,
                  transform: 'translateZ(44px)',
                }}
              >
                <span
                  className="h-px w-24"
                  style={{ background: collection.accentColor }}
                />
              </div>
              <div
                className="absolute left-0 top-full h-[44px] w-full origin-top"
                style={{
                  background: `linear-gradient(180deg, ${collection.lidColor}, ${collection.caseColor})`,
                  transform: 'rotateX(-90deg)',
                }}
              />
              <div
                className="absolute right-0 top-0 h-full w-[44px] origin-right"
                style={{
                  background: `linear-gradient(90deg, ${collection.caseColor}, ${collection.lidColor})`,
                  transform: 'rotateY(90deg)',
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* editorial chapters */}
      <div className="mx-auto max-w-maison space-y-24 px-6 py-28 md:px-10 lg:space-y-32 lg:px-14">
        <Chapter label="The Story">
          <RevealText
            as="h2"
            className="max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-[1.1] tracking-tight text-pearl"
            lines={[collection.story.story]}
            stagger={0}
          />
        </Chapter>

        <div className="hairline" />

        <Chapter label="The Object">
          <Reveal>
            <p className="max-w-2xl text-lg font-light leading-relaxed tracking-luxe text-bone/75">
              {collection.story.object}
            </p>
          </Reveal>
        </Chapter>

        <Chapter label="The Composition">
          <Reveal>
            <p className="max-w-2xl text-lg font-light leading-relaxed tracking-luxe text-bone/75">
              {collection.story.composition}
            </p>
          </Reveal>
        </Chapter>

        <div className="hairline" />

        <Chapter label="The Flavours">
          <ul className="flex flex-wrap gap-x-10 gap-y-5">
            {collection.flavours.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05, ease }}
                className="font-display text-2xl font-light text-pearl md:text-3xl"
              >
                {f}
              </motion.li>
            ))}
          </ul>
        </Chapter>

        <Chapter label="The Materials">
          <ul className="space-y-3">
            {collection.materials.map((m, i) => (
              <Reveal key={m} delay={i * 0.05}>
                <li className="flex items-baseline gap-4 text-bone/75">
                  <span className="text-xs tracking-widest text-brass-light">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-light tracking-luxe">{m}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Chapter>

        <Chapter label="The Craft">
          <Reveal>
            <p className="max-w-2xl text-lg font-light leading-relaxed tracking-luxe text-bone/75">
              {collection.craft}
            </p>
          </Reveal>
        </Chapter>

        <Chapter label="The Presentation">
          <Reveal>
            <p className="max-w-2xl text-lg font-light leading-relaxed tracking-luxe text-bone/75">
              {collection.story.presentation}
            </p>
          </Reveal>
        </Chapter>

        <div className="hairline" />

        {/* ACQUIRE — restrained */}
        <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow pt-2 text-sand/60">Acquire</p>
          </Reveal>
          <div>
            <Reveal>
              <div className="flex flex-col gap-8 border border-sand/15 p-8 md:flex-row md:items-center md:justify-between md:p-10">
                <div>
                  <p className="font-display text-3xl font-light text-pearl">
                    {collection.name}
                  </p>
                  <p className="mt-2 text-sm font-light tracking-luxe text-bone/60">
                    {collection.pieces} pieces · from {collection.priceFrom}
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="group relative overflow-hidden border border-brass/50 px-8 py-4">
                    <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-700 ease-luxe group-hover:translate-x-0" />
                    <span className="relative eyebrow text-brass-light transition-colors duration-700 group-hover:text-obsidian">
                      Add to bag
                    </span>
                  </button>
                  <Link
                    href="/create"
                    className="eyebrow flex items-center justify-center border border-sand/20 px-8 py-4 text-bone/70 transition-colors duration-500 hover:text-bone"
                  >
                    Compose your own
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-xs font-light leading-relaxed tracking-luxe text-stone">
                For private clients and bespoke commissions, the maison receives
                enquiries personally. Each creation is prepared to order.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}
