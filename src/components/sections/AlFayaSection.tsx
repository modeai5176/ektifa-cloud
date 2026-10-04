import Link from 'next/link';
import { alFaya } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export default function AlFayaSection() {
  const varieties = alFaya.filter((p) => p.slug !== 'al-faya-trio');
  const trio = alFaya.find((p) => p.slug === 'al-faya-trio');

  return (
    <section
      id="al-faya"
      className="scroll-mt-24 bg-paper-deep px-6 py-20 md:px-10 md:py-28 lg:px-14"
    >
      <div className="mx-auto max-w-maison">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-sage">AL FAYA · الفاية</p>
              <h2 className="mt-4 font-display text-4xl font-light text-ink md:text-5xl">
                Honey
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink-soft">
              Raw honey from native trees — Ghaf, Samar and Sidr — bottled in
              glass and wrapped in hand-stitched leather.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {varieties.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {trio && (
          <Reveal>
            <div className="mt-8 grid items-center gap-8 bg-paper md:grid-cols-2 md:gap-12">
              <div className="aspect-[5/4] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trio.cover}
                  alt="AL FAYA honey trio gift set"
                  loading="lazy"
                  className="h-full w-full object-contain p-8"
                />
              </div>
              <div className="px-6 pb-10 md:px-4 md:pb-0 md:pr-12">
                <p className="eyebrow text-sage">Gift set</p>
                <h3 className="mt-4 font-display text-3xl font-light text-ink md:text-4xl">
                  {trio.name}
                </h3>
                <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-ink-soft">
                  {trio.description}
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <Link
                    href={`/collection/${trio.slug}`}
                    className="eyebrow bg-ink px-7 py-3.5 text-paper transition-colors duration-300 hover:bg-sage"
                  >
                    View set
                  </Link>
                  <span className="text-sm font-light tracking-luxe text-ink-soft">
                    {trio.price}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
