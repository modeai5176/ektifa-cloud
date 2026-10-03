'use client';

import Link from 'next/link';
import { useState } from 'react';

const columns = [
  {
    heading: 'Maison',
    links: [
      { label: 'Collection', href: '/#collection' },
      { label: 'The House', href: '/#house' },
      { label: 'Craft', href: '/#craft' },
      { label: 'Origin', href: '/#origin' },
      { label: 'Create', href: '/create' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    heading: 'Clientele',
    links: [
      { label: 'Private Clients', href: '/#contact' },
      { label: 'Bespoke Gifting', href: '/create' },
      { label: 'Corporate / VIP', href: '/#contact' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-sand/10 bg-obsidian px-6 pb-12 pt-24 md:px-10 lg:px-14"
    >
      <div className="grain-overlay pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-maison">
        {/* Top line */}
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <img
              src="/brand/ektifa-logo-v.svg"
              alt="EKTIFA"
              className="h-24 w-auto"
              style={{ filter: 'brightness(0) invert(0.92) sepia(0.12)' }}
            />
            <p className="eyebrow mt-8 text-sand/70">Crafted in the Emirates</p>
            <p className="mt-6 max-w-sm font-display text-2xl font-light leading-snug text-bone/80">
              A private correspondence, extended twice a season.
            </p>

            {/* Newsletter — restrained, not an ecommerce popup */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-8 max-w-sm"
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address for the maison correspondence
              </label>
              <div className="flex items-center gap-4 border-b border-sand/25 pb-3">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your correspondence address"
                  className="w-full bg-transparent text-sm font-light tracking-luxe text-bone placeholder:text-stone/60 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Request correspondence"
                  className="eyebrow shrink-0 text-brass-light transition-colors hover:text-brass"
                >
                  {sent ? 'Received' : 'Request'}
                </button>
              </div>
              {sent && (
                <p className="mt-3 text-xs font-light tracking-luxe text-stone">
                  Thank you. The maison will be in touch.
                </p>
              )}
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow text-stone">{col.heading}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="link-draw text-sm font-light tracking-luxe text-bone/70 transition-colors hover:text-bone"
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

        {/* Bottom line */}
        <div className="mt-20 flex flex-col gap-6 border-t border-sand/10 pt-8 text-stone sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-light tracking-luxe">
            © {new Date().getFullYear()} EKTIFA — United Arab Emirates
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Journal', 'WhatsApp'].map((s) => (
              <a
                key={s}
                href="#"
                className="eyebrow link-draw text-stone transition-colors hover:text-bone"
              >
                {s}
              </a>
            ))}
          </div>
          <p className="text-xs font-light tracking-luxe">
            A maison of chocolate &amp; honey
          </p>
        </div>
      </div>
    </footer>
  );
}
