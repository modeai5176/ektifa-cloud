import { qand } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export default function QandSection() {
  return (
    <section id="qand" className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-maison">
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-sage">QAND · قَنْد</p>
              <h2 className="mt-4 font-display text-4xl font-light text-ink md:text-5xl">
                Chocolate
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light leading-relaxed text-ink-soft">
              Artisanal chocolate and confectionery from Sharjah, in three
              colourways with a gold-foiled lid.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {qand.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
