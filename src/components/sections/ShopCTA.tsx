import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export default function ShopCTA() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <Reveal>
        <div className="mx-auto max-w-maison border-y border-line py-16 text-center md:py-24">
          <p className="eyebrow text-sage">Chocolate &amp; honey</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-light leading-tight text-ink md:text-6xl">
            Find the gift
          </h2>
          <Link
            href="/collection"
            className="eyebrow mt-10 inline-block bg-ink px-8 py-4 text-paper transition-colors duration-300 hover:bg-sage"
          >
            Shop all
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
