import { Reveal } from '@/components/ui/Reveal';

const items = [
  { label: 'Dates', src: '/images/ingredients/Rustic%20Dates%20in%20Warm%20Light.png' },
  { label: 'Raw honey', src: '/images/ingredients/Golden%20Honey%20Drip%20in%20Glass%20Bowl.png' },
  { label: 'Dark cacao', src: '/images/ingredients/Broken%20Dark%20Chocolate%20with%20Sea%20Salt.png' },
  { label: 'Saffron', src: '/images/ingredients/Crimson%20Saffron%20on%20Earthy%20Textures.png' },
];

export default function Ingredients() {
  return (
    <section id="ingredients" className="scroll-mt-24 px-6 py-20 md:px-10 md:py-28 lg:px-14">
      <div className="mx-auto max-w-maison">
        <Reveal>
          <div className="max-w-xl">
            <p className="eyebrow text-sage">Ingredients</p>
            <h2 className="mt-4 font-display text-4xl font-light text-ink md:text-5xl">
              Native to the region
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <figure>
                <div className="aspect-square w-full overflow-hidden bg-paper-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-4 text-ink-soft">
                  {item.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
