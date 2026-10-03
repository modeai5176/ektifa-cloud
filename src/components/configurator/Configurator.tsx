'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  CreationProvider,
  useCreation,
  architectures,
} from '@/lib/creation';
import { steps } from '@/data/configurator';
import ConfiguratorSidebar from './ConfiguratorSidebar';
import MaterialSelector from './MaterialSelector';
import ChocolateSelector from './ChocolateSelector';
import EngravingPanel from './EngravingPanel';
import CreationSummary from './CreationSummary';
import RevealScene from './RevealScene';
import { hasWebGL, prefersReducedMotion } from '@/lib/webgl';

const ConfiguratorCanvas = dynamic(() => import('./ConfiguratorCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="eyebrow animate-pulse text-sand/50">
        Preparing the atelier…
      </p>
    </div>
  ),
});

const ease = [0.16, 1, 0.3, 1] as const;

/** The step-specific contextual controls. */
function StepPanel() {
  const { state } = useCreation();
  const step = state.stepIndex;

  if (step === 0) return <ArchitecturePanel />;
  if (step === 1) return <MaterialSelector />;
  if (step === 2) return <ChocolateSelector />;
  if (step === 3) return <ArrangementPanel />;
  if (step === 4) return <EngravingPanel />;
  return null;
}

function ArchitecturePanel() {
  const { state, dispatch } = useCreation();
  return (
    <div>
      <p className="mb-5 text-xs font-light leading-relaxed tracking-luxe text-stone">
        Choose the architecture of your box. The case resizes to hold it.
      </p>
      <div className="space-y-2">
        {architectures.map((a) => {
          const active = a.id === state.architectureId;
          return (
            <button
              key={a.id}
              onClick={() => dispatch({ type: 'SET_ARCHITECTURE', id: a.id })}
              className={`flex w-full items-center justify-between border p-4 text-left transition-all duration-500 ${
                active
                  ? 'border-brass/60 bg-brass/5'
                  : 'border-sand/12 hover:border-sand/30'
              }`}
            >
              <span>
                <span
                  className={`block font-display text-2xl font-light ${
                    active ? 'text-pearl' : 'text-sand/70'
                  }`}
                >
                  {a.count}
                </span>
                <span className="text-[0.6rem] tracking-widest text-stone/70">
                  {a.description.toUpperCase()}
                </span>
              </span>
              <span className="text-[0.6rem] tracking-widest text-stone/60">
                {a.cols}×{a.rows}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ArrangementPanel() {
  const { dispatch } = useCreation();
  return (
    <div>
      <p className="mb-5 text-xs font-light leading-relaxed tracking-luxe text-stone">
        Arrange by hand — select a chocolate and place it — or let the maison
        compose a balanced arrangement for you.
      </p>
      <button
        onClick={() => dispatch({ type: 'AUTO_CURATE' })}
        className="group relative w-full overflow-hidden border border-brass/50 py-4"
      >
        <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-700 ease-luxe group-hover:translate-x-0" />
        <span className="relative eyebrow text-brass-light transition-colors duration-700 group-hover:text-obsidian">
          Auto curate
        </span>
      </button>
      <button
        onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        className="eyebrow mt-3 w-full border border-sand/20 py-4 text-sand/70 transition-colors hover:border-sand/40 hover:text-pearl"
      >
        Clear arrangement
      </button>
    </div>
  );
}

function ConfiguratorInner() {
  const { state, dispatch } = useCreation();
  const [webgl, setWebgl] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    setReduced(prefersReducedMotion());
    setMounted(true);
  }, []);

  const step = state.stepIndex;
  const isReveal = step === 5;
  const stepMeta = steps[step];

  function onSlotClick(slot: number) {
    if (step !== 2 && step !== 3) {
      dispatch({ type: 'SET_STEP', index: 2 });
    }
    if (state.slots[slot]) {
      dispatch({ type: 'CLEAR_SLOT', slot });
    } else {
      dispatch({ type: 'PLACE', slot });
    }
  }

  const canGoNext = step < steps.length - 1;
  const canGoPrev = step > 0;

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#0d0b0a]">
      {/* ambient ground */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 80% at 50% 30%, #1a120c 0%, #0d0b0a 70%)',
        }}
      />

      {/* 3D stage */}
      <div className="absolute inset-0">
        {mounted && webgl ? (
          <ConfiguratorCanvas
            state={state}
            onSlotClick={onSlotClick}
            reveal={isReveal}
            reduced={reduced}
          />
        ) : mounted ? (
          <WebGLFallback />
        ) : null}
      </div>

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          aria-label="EKTIFA home"
          className="flex items-center gap-3"
        >
          <img
            src="/brand/ektifa-logo-h.svg"
            alt="EKTIFA"
            className="h-6 w-auto"
            style={{ filter: 'brightness(0) invert(0.92) sepia(0.12)' }}
          />
        </Link>
        <Link
          href="/"
          className="eyebrow text-sand/60 transition-colors hover:text-pearl"
        >
          Close ✕
        </Link>
      </div>

      {/* desktop left rail */}
      {!isReveal && (
        <div className="absolute left-10 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
          <p className="eyebrow mb-6 text-sand/50">The Atelier</p>
          <ConfiguratorSidebar />
        </div>
      )}

      {/* contextual controls — right on desktop, bottom sheet on mobile */}
      <AnimatePresence mode="wait">
        {!isReveal && (
          <motion.aside
            key={stepMeta.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease }}
            className="absolute inset-x-0 bottom-0 z-30 max-h-[62svh] overflow-y-auto border-t border-sand/10 bg-obsidian/85 p-6 backdrop-blur-md lg:inset-x-auto lg:bottom-auto lg:right-10 lg:top-1/2 lg:max-h-[72svh] lg:w-[360px] lg:-translate-y-1/2 lg:rounded-sm lg:border lg:border-sand/12 lg:p-7"
            data-lenis-prevent
          >
            {/* mobile step indicator */}
            <div className="mb-5 flex items-center justify-between lg:hidden">
              <p className="eyebrow text-brass-light">
                {stepMeta.index} — {stepMeta.title}
              </p>
              <p className="text-[0.6rem] tracking-widest text-stone/60">
                {step + 1}/{steps.length}
              </p>
            </div>
            <p className="mb-6 hidden font-display text-3xl font-light tracking-tight text-pearl lg:block">
              {stepMeta.title.charAt(0) +
                stepMeta.title.slice(1).toLowerCase()}
            </p>

            <StepPanel />

            {/* nav */}
            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                onClick={() =>
                  canGoPrev && dispatch({ type: 'SET_STEP', index: step - 1 })
                }
                disabled={!canGoPrev}
                className="eyebrow text-sand/60 transition-colors enabled:hover:text-pearl disabled:opacity-30"
              >
                ← Back
              </button>
              <button
                onClick={() =>
                  canGoNext && dispatch({ type: 'SET_STEP', index: step + 1 })
                }
                className="group relative overflow-hidden border border-brass/50 px-6 py-3"
              >
                <span className="absolute inset-0 -translate-x-full bg-brass transition-transform duration-700 ease-luxe group-hover:translate-x-0" />
                <span className="relative eyebrow text-brass-light transition-colors duration-700 group-hover:text-obsidian">
                  {step === steps.length - 2 ? 'Reveal' : 'Continue'}
                </span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* bottom live summary (desktop, non-reveal) */}
      {!isReveal && (
        <div className="absolute inset-x-0 bottom-0 z-20 hidden px-10 pb-6 lg:block">
          <div className="mx-auto max-w-2xl border-t border-sand/10 pt-5">
            <CreationSummary />
          </div>
        </div>
      )}

      {/* reveal overlay */}
      <AnimatePresence>
        {isReveal && (
          <RevealScene onBack={() => dispatch({ type: 'SET_STEP', index: 4 })} />
        )}
      </AnimatePresence>
    </div>
  );
}

function WebGLFallback() {
  const { state } = useCreation();
  const material = architectures.find((a) => a.id === state.architectureId);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <div
        className="mb-10 h-40 w-56"
        style={{
          background:
            'linear-gradient(135deg, #c9b79c, #a8864e)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}
      />
      <p className="eyebrow text-sand/70">The EKTIFA Creation</p>
      <p className="mt-4 max-w-sm text-sm font-light leading-relaxed tracking-luxe text-bone/70">
        Your browser does not support the 3D atelier. You can still compose your
        box — a {material?.count}-piece creation — and our team will prepare it
        with you.
      </p>
    </div>
  );
}

export default function Configurator() {
  return (
    <CreationProvider>
      <ConfiguratorInner />
    </CreationProvider>
  );
}
