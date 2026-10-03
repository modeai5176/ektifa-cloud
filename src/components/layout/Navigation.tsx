'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

const links = [
  { label: 'COLLECTION', href: '/#collection' },
  { label: 'THE HOUSE', href: '/#house' },
  { label: 'CRAFT', href: '/#craft' },
  { label: 'ORIGIN', href: '/#origin' },
  { label: 'CREATE', href: '/create' },
  { label: 'CONTACT', href: '/#contact' },
];

const utilities = [
  { label: 'Search', glyph: 'search' },
  { label: 'Account', glyph: 'account' },
  { label: 'Bag', glyph: 'bag' },
];

function Glyph({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (name === 'search')
    return (
      <svg {...common} aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  if (name === 'account')
    return (
      <svg {...common} aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-700 ease-luxe ${
            scrolled
              ? 'bg-obsidian/70 backdrop-blur-md border-b border-sand/10'
              : 'bg-transparent border-b border-transparent'
          }`}
        />
        <nav className="relative mx-auto flex max-w-maison items-center justify-between px-6 py-5 md:px-10 lg:px-14">
          {/* Logo */}
          <Link
            href="/"
            aria-label="EKTIFA home"
            className="relative z-10 shrink-0"
          >
            <img
              src="/brand/ektifa-logo-h.svg"
              alt="EKTIFA"
              className={`h-7 w-auto transition-all duration-700 ease-luxe md:h-8 ${
                scrolled ? 'opacity-95' : 'opacity-100'
              }`}
              style={{
                filter: 'brightness(0) invert(0.92) sepia(0.15)',
              }}
            />
          </Link>

          {/* Center links — desktop */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="eyebrow link-draw text-bone/75 transition-colors duration-500 hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Utilities — desktop */}
          <div className="hidden items-center gap-6 lg:flex">
            {utilities.map((u) => (
              <button
                key={u.label}
                aria-label={u.label}
                className="text-bone/75 transition-colors duration-500 hover:text-bone"
              >
                <Glyph name={u.glyph} />
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative z-10 flex h-8 w-8 flex-col items-end justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-px bg-bone transition-all duration-500 ease-luxe ${
                open ? 'w-6 translate-y-[3px] rotate-45' : 'w-6'
              }`}
            />
            <span
              className={`h-px bg-bone transition-all duration-500 ease-luxe ${
                open ? 'w-6 -translate-y-[3px] -rotate-45' : 'w-4'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-obsidian px-8 lg:hidden"
          >
            <div className="grain-overlay pointer-events-none absolute inset-0" />
            <ul className="relative space-y-2">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-light tracking-tightest text-bone/90"
                  >
                    {l.label.charAt(0) + l.label.slice(1).toLowerCase()}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-16 flex gap-8 text-bone/60">
              {utilities.map((u) => (
                <button key={u.label} className="eyebrow" aria-label={u.label}>
                  {u.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
