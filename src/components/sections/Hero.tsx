import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40 lg:px-14">
      <div className="mx-auto grid max-w-maison items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-sage">Artisanal chocolate &amp; honey</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl">
              Crafted in the
              <br />
              Emirates.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-md text-base font-light leading-relaxed text-ink-soft">
              EKTIFA brings together QAND chocolate and AL FAYA honey — made by
              hand with native ingredients.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/collection"
                className="eyebrow bg-ink px-7 py-3.5 text-paper transition-colors duration-300 hover:bg-sage"
              >
                Shop all
              </Link>
              <Link
                href="/#qand"
                className="eyebrow link-draw py-3.5 text-ink"
              >
                Explore the house
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-first lg:order-last">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/qand/large/Oasis_Olive_L_1.webp"
              alt="QAND Oasis Olive chocolate box"
              className="h-full w-full object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
