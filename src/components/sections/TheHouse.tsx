'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { RevealText, Reveal } from '@/components/ui/Reveal';

interface Chapter {
  index: string;
  label: string;
  heading: string;
  body: string;
  tone: string;
}

const chapters: Chapter[] = [
  {
    index: '01',
    label: 'Foundation',
    heading: 'A house, not a brand.',
    body: 'EKTIFA was founded on a single conviction — that chocolate and honey, treated with the patience of jewellery, could become objects worth keeping. We build collections, not products.',
    tone: '#1a0f0a',
  },
  {
    index: '02',
    label: 'Place',
    heading: 'The Emirates, distilled.',
    body: 'We draw on the materials and manners of this place — the honey of the desert bloom, the date, the saffron, and above all the art of receiving. The maison is unmistakably of the UAE.',
    tone: '#241410',
  },
  {
    index: '03',
    label: 'Philosophy',
    heading: 'Generosity as a discipline.',
    body: 'Luxury here is restraint. Nothing is louder than it needs to be. The gift speaks for the giver, and so every detail is considered long before it is ever seen.',
    tone: '#2a1810',
  },
  {
    index: '04',
    label: 'Craft',
    heading: 'The hand before the machine.',
    body: 'Every centre is placed by hand, every case folded and bound by hand. The atelier works to the standards of a manufacture, measured in degrees and days.',
    tone: '#3d2619',
  },
  {
    index: '05',
    label: 'Future',
    heading: 'An institution in the making.',
    body: 'We are building a maison meant to outlast us — a contemporary Emirati house of chocolate and honey, extended one considered creation at a time.',
    tone: '#4a2f1c',
  },
];

function ChapterPanel({ chapter, i }: { chapter: Chapter; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.3, 1, 1, 0.3]
  );

  const flip = i % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative flex min-h-[90svh] items-center"
      style={{ backgroundColor: chapter.tone }}
    >
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-15" />
      <div className="mx-auto w-full max-w-maison px-6 md:px-10 lg:px-14">
        <motion.div
          style={{ opacity }}
          className={`flex flex-col gap-10 lg:items-center lg:gap-20 ${
            flip ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          {/* numeral + abstract plate */}
          <motion.div
            style={{ y }}
            className="relative flex aspect-[4/5] w-full max-w-sm shrink-0 items-center justify-center overflow-hidden lg:w-[36%]"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(120% 100% at 30% 20%, ${chapter.tone === '#1a0f0a' ? '#3d2619' : '#7a5436'} 0%, ${chapter.tone} 70%)`,
              }}
            />
            <span className="relative font-display text-[9rem] font-light leading-none text-sand/15 md:text-[12rem]">
              {chapter.index}
            </span>
            <div className="hairline absolute bottom-10 left-8 right-8" />
          </motion.div>

          {/* text */}
          <div className="lg:w-[52%]">
            <Reveal>
              <p className="eyebrow text-sand/70">
                The House — {chapter.label}
              </p>
            </Reveal>
            <RevealText
              as="h3"
              className="mt-6 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1] tracking-tightest text-pearl"
              lines={[chapter.heading]}
            />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-lg text-base font-light leading-relaxed tracking-luxe text-bone/75 md:text-lg">
                {chapter.body}
              </p>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function TheHouse() {
  return (
    <section id="house" aria-label="The House" className="relative">
      {chapters.map((c, i) => (
        <ChapterPanel key={c.index} chapter={c} i={i} />
      ))}
    </section>
  );
}
