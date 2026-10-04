import { Reveal } from '@/components/ui/Reveal';

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-paper-deep px-6 py-20 md:px-10 md:py-28 lg:px-14"
    >
      <div className="mx-auto grid max-w-maison items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="aspect-[4/3] w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/environment/Sunlit%20Desert%20Majlis%20Interior.png"
              alt="A sunlit majlis interior"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-md">
            <p className="eyebrow text-sage">The house</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-ink md:text-5xl">
              A taste of Emirati hospitality
            </h2>
            <p className="mt-6 text-base font-light leading-relaxed text-ink-soft">
              EKTIFA is built on native ingredients and the ritual of welcome —
              chocolate under QAND, honey under AL FAYA — each made by hand and
              presented as a gift.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
