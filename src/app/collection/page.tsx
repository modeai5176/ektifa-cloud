import type { Metadata } from 'next';
import { qand, alFaya } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Shop — EKTIFA',
  description:
    'Shop EKTIFA — QAND artisanal chocolate and AL FAYA raw honey, crafted in the Emirates.',
};

function Group({
  id,
  line,
  arabic,
  title,
  products,
}: {
  id: string;
  line: string;
  arabic: string;
  title: string;
  products: typeof qand;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        <div className="flex items-end justify-between border-b border-line pb-6">
          <div>
            <p className="eyebrow text-sage">
              {line} · {arabic}
            </p>
            <h2 className="mt-3 font-display text-3xl font-light text-ink md:text-4xl">
              {title}
            </h2>
          </div>
          <p className="text-sm font-light tracking-luxe text-muted">
            {products.length} products
          </p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.06}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function ShopPage() {
  return (
    <div className="px-6 pb-28 pt-32 md:px-10 md:pt-40 lg:px-14">
      <div className="mx-auto max-w-maison">
        <Reveal>
          <header className="mb-16 max-w-2xl">
            <p className="eyebrow text-sage">Shop</p>
            <h1 className="mt-4 font-display text-5xl font-light leading-none text-ink md:text-6xl">
              Chocolate &amp; honey
            </h1>
          </header>
        </Reveal>

        <div className="space-y-24">
          <Group id="qand" line="QAND" arabic="قَنْد" title="Chocolate" products={qand} />
          <Group
            id="al-faya"
            line="AL FAYA"
            arabic="الفاية"
            title="Honey"
            products={alFaya}
          />
        </div>
      </div>
    </div>
  );
}
