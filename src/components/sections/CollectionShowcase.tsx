'use client';

import { collections } from '@/data/collections';
import CollectionObject from './CollectionObject';
import { RevealText, Reveal } from '@/components/ui/Reveal';

export default function CollectionShowcase() {
  return (
    <section id="collection" aria-label="Collection" className="relative bg-obsidian">
      <div className="mx-auto w-full max-w-maison px-6 pb-10 pt-32 md:px-10 lg:px-14">
        <Reveal>
          <p className="eyebrow text-sand/70">06 — Collection</p>
        </Reveal>
        <RevealText
          as="h2"
          className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-light leading-[0.98] tracking-tightest text-pearl"
          lines={['Three houses within', 'the maison.']}
        />
        <Reveal delay={0.15} className="mt-8 max-w-xl">
          <p className="text-base font-light leading-relaxed tracking-luxe text-bone/70 md:text-lg">
            Each collection is an object before it is a gift. Presented in
            isolation, as it deserves to be seen.
          </p>
        </Reveal>
      </div>

      <div>
        {collections.map((c, i) => (
          <CollectionObject key={c.slug} collection={c} i={i} />
        ))}
      </div>
    </section>
  );
}
