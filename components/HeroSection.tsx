import Image from "next/image";
import Link from "next/link";
import { heroData, hotelImages, trustBadges } from "@/data/site";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[680px] overflow-hidden bg-moss pt-18 text-white sm:pt-20 lg:min-h-[720px]"
    >
      <Image
        src={hotelImages.hero.src}
        alt={hotelImages.hero.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[55%_42%] md:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(29,45,37,0.72)_0%,rgba(29,45,37,0.46)_44%,rgba(29,45,37,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(0deg,rgba(29,45,37,0.62),rgba(29,45,37,0))]" />

      <div className="relative mx-auto flex min-h-[calc(680px-72px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:min-h-[680px] lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-white/28 bg-white/12 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {heroData.badge}
          </p>

          <h1 className="max-w-[9ch] font-luxury text-[2.5rem] font-semibold leading-[1.05] text-white sm:max-w-none sm:text-6xl lg:text-7xl">
            {heroData.title}
          </h1>

          <h2 className="mt-5 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            {heroData.subtitle}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">
            {heroData.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/booking"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-7 text-base font-bold text-moss shadow-[0_18px_42px_rgba(0,0,0,0.22)] transition-colors hover:bg-softgold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {heroData.primaryCta}
            </Link>
            <a
              href="#rooms"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {heroData.secondaryCta}
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="min-h-11 rounded-full border border-white/22 bg-white/12 px-3 py-2 text-center text-sm font-semibold text-white backdrop-blur-md"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
