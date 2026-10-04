'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

const links = [
  { label: 'Shop', href: '/collection' },
  { label: 'QAND', href: '/#qand' },
  { label: 'AL FAYA', href: '/#al-faya' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 32);
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
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-500 ease-luxe ${
            scrolled || open
              ? 'border-b border-line bg-paper/90 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        />
        <nav className="relative mx-auto flex max-w-maison items-center justify-between px-6 py-4 md:px-10 lg:px-14">
          <Link href="/" aria-label="EKTIFA home" className="relative z-10 shrink-0">
            <img
              src="/images/ektifa_logo_h.svg"
              alt="EKTIFA"
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="eyebrow link-draw text-ink-soft transition-colors duration-300 hover:text-sage"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              href="/collection"
              className="eyebrow border border-ink/20 px-5 py-2.5 text-ink transition-colors duration-300 hover:border-sage hover:text-sage"
            >
              Shop
            </Link>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative z-10 flex h-8 w-8 flex-col items-end justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`h-px bg-ink transition-all duration-300 ease-luxe ${
                open ? 'w-6 translate-y-[3.5px] rotate-45' : 'w-6'
              }`}
            />
            <span
              className={`h-px bg-ink transition-all duration-300 ease-luxe ${
                open ? 'w-6 -translate-y-[3.5px] -rotate-45' : 'w-4'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 lg:hidden"
          >
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-light text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-16 text-muted">Crafted in the Emirates</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
