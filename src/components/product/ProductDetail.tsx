'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/data/products';

export default function ProductDetail({ product }: { product: Product }) {
  const [active, setActive] = useState(product.gallery[0] ?? product.cover);
  const [option, setOption] = useState(product.options.values[0]);

  return (
    <div className="px-6 pb-28 pt-28 md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-maison">
        <nav className="eyebrow mb-10 flex items-center gap-2 text-muted">
          <Link href="/collection" className="transition-colors hover:text-sage">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink-soft">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square w-full overflow-hidden bg-paper-deep">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active}
                alt={`${product.line} ${product.name}`}
                className="h-full w-full object-contain p-8"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="mt-4 flex gap-4">
                {product.gallery.map((src) => (
                  <button
                    key={src}
                    onClick={() => setActive(src)}
                    aria-label="View image"
                    className={`aspect-square w-20 overflow-hidden bg-paper-deep transition-opacity ${
                      active === src
                        ? 'ring-1 ring-sage'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:pt-6">
            <p className="eyebrow text-sage">{product.line}</p>
            <div className="mt-4 flex items-baseline justify-between gap-6">
              <h1 className="font-display text-4xl font-light leading-none text-ink md:text-5xl">
                {product.name}
              </h1>
              <p className="font-arabic text-2xl text-ink-soft">{product.arabic}</p>
            </div>
            <p className="mt-5 text-sm font-light tracking-luxe text-ink-soft">
              {product.price}
            </p>

            <p className="mt-8 max-w-md text-base font-light leading-relaxed text-ink-soft">
              {product.description}
            </p>

            {/* Options */}
            <div className="mt-10">
              <p className="eyebrow text-muted">{product.options.label}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.options.values.map((value) => (
                  <button
                    key={value}
                    onClick={() => setOption(value)}
                    className={`eyebrow border px-5 py-3 transition-colors ${
                      option === value
                        ? 'border-sage bg-sage text-paper'
                        : 'border-ink/20 text-ink hover:border-sage'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <button className="eyebrow mt-10 w-full bg-ink px-8 py-4 text-paper transition-colors duration-300 hover:bg-sage sm:w-auto">
              Add to bag
            </button>

            {/* Details */}
            <dl className="mt-12 space-y-3 border-t border-line pt-8">
              {product.details.map((d) => (
                <div key={d.label} className="flex justify-between gap-6 text-sm">
                  <dt className="font-light tracking-luxe text-muted">{d.label}</dt>
                  <dd className="font-light text-ink-soft">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
