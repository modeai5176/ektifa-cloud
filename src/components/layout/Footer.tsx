'use client';

import Link from 'next/link';
import { useState } from 'react';

const columns = [
  {
    heading: 'Shop',
    links: [
      { label: 'All products', href: '/collection' },
      { label: 'QAND chocolate', href: '/#qand' },
      { label: 'AL FAYA honey', href: '/#al-faya' },
    ],
  },
  {
    heading: 'House',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Ingredients', href: '/#ingredients' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer
      id="contact"
      className="border-t border-line bg-paper-deep px-6 pb-10 pt-20 md:px-10 lg:px-14"
    >
      <div className="mx-auto max-w-maison">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <img
              src="/images/ektifa_logo_v.svg"
              alt="EKTIFA"
              className="h-20 w-auto"
            />
            <p className="eyebrow mt-7 text-muted">Crafted in the Emirates</p>
            <p className="mt-5 max-w-sm font-display text-2xl font-light leading-snug text-ink-soft">
              Chocolate and honey, made with native ingredients.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-8 max-w-sm"
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-4 border-b border-line pb-3">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent text-sm font-light tracking-luxe text-ink placeholder:text-muted/70 focus:outline-none"
                />
                <button
                  type="submit"
                  className="eyebrow shrink-0 text-sage transition-colors hover:text-sage-deep"
                >
                  {sent ? 'Done' : 'Join'}
                </button>
              </div>
              {sent && (
                <p className="mt-3 text-xs font-light tracking-luxe text-muted">
                  Thank you.
                </p>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow text-muted">{col.heading}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="link-draw text-sm font-light tracking-luxe text-ink-soft transition-colors hover:text-sage"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-line pt-8 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light tracking-luxe">
            © {new Date().getFullYear()} EKTIFA — United Arab Emirates
          </p>
          <div className="flex gap-6">
            {['Instagram', 'WhatsApp'].map((s) => (
              <a
                key={s}
                href="#"
                className="eyebrow link-draw transition-colors hover:text-sage"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
