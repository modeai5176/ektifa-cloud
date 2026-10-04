import Link from 'next/link';
import type { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/collection/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-paper-deep">
        <div className="aspect-[4/5] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.cover}
            alt={`${product.line} ${product.name}`}
            loading="lazy"
            className="h-full w-full object-contain p-6 transition-transform duration-700 ease-luxe group-hover:scale-[1.03]"
          />
        </div>
        <span
          className="absolute left-0 top-0 h-full w-1 opacity-70"
          style={{ backgroundColor: product.tone }}
          aria-hidden
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">{product.line}</p>
          <h3 className="mt-1.5 font-display text-2xl font-light leading-none text-ink">
            {product.name}
          </h3>
          <p className="mt-2 text-sm font-light text-ink-soft">{product.kind}</p>
        </div>
        <p className="shrink-0 pt-6 text-sm font-light tracking-luxe text-ink-soft">
          {product.price}
        </p>
      </div>
    </Link>
  );
}
