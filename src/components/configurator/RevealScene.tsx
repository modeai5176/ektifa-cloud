'use client';

import { motion } from 'framer-motion';
import { useCreation, estimatePrice, filledCount } from '@/lib/creation';

const ease = [0.16, 1, 0.3, 1] as const;

export default function RevealScene({
  onBack,
}: {
  onBack: () => void;
}) {
  const { state } = useCreation();
  const price = estimatePrice(state);
  const recipient = state.recipient || state.engraving;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease }}
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12"
    >
      {/* top line */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
        className="flex items-center justify-between"
      >
        <p className="eyebrow text-sand/70">Your creation</p>
        <button
          onClick={onBack}
          className="eyebrow pointer-events-auto text-sand/60 transition-colors hover:text-pearl"
        >
          ← Keep composing
        </button>
      </motion.div>

      {/* centre title */}
      <div className="pointer-events-none flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6, ease }}
          className="eyebrow text-sand/60"
        >
          EKTIFA / 001
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8, ease }}
          className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-none tracking-tightest text-pearl"
        >
          Your creation
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease }}
          className="mt-6 text-xs tracking-widest text-sand/70"
        >
          {recipient
            ? `PREPARED EXCLUSIVELY FOR ${recipient.toUpperCase()}`
            : 'PREPARED EXCLUSIVELY FOR YOU'}
        </motion.p>
      </div>

      {/* bottom actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.3, ease }}
        className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-col items-center gap-6"
      >
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-[0.55rem] tracking-widest text-stone/70">
              {state.slots.length} PIECES · {filledCount(state)} COMPOSED
            </p>
            <p className="mt-1 font-display text-xl font-light text-pearl">
              AED {price.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button className="eyebrow border border-sand/25 px-7 py-4 text-sand/80 transition-colors hover:border-sand/50 hover:text-pearl">
            Save creation
          </button>
          <button className="group relative overflow-hidden border border-brass/60 px-7 py-4">
            <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-700 ease-luxe group-hover:translate-x-0" />
            <span className="relative eyebrow text-brass-light transition-colors duration-700 group-hover:text-obsidian">
              Add to bag
            </span>
          </button>
          <button className="eyebrow border border-sand/25 px-7 py-4 text-sand/80 transition-colors hover:border-sand/50 hover:text-pearl">
            Request bespoke consultation
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
