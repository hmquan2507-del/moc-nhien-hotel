import { heroData, hotelInfo } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-champagne/15 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-softbeige blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[0.92fr_1.08fr] md:px-8 md:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-champagne/50 bg-white px-4 py-2 text-sm font-black text-navy shadow-sm">
            <span className="h-2 w-2 rounded-full bg-champagne" />
            {heroData.badge}
          </div>

          <h1 className="font-luxury text-[3.05rem] font-black leading-[0.95] tracking-[-0.035em] text-transparent bg-gradient-to-br from-[#0E2F28] via-[#17473B] to-[#2F6F4E] bg-clip-text sm:text-[4rem] md:text-[4.85rem]">
            {heroData.title}
          </h1>

          <h2 className="mt-4 max-w-2xl text-[1.75rem] font-extrabold leading-[1.18] tracking-[-0.02em] text-[#173D33] sm:text-[2rem] md:text-[2.25rem]">
            {heroData.subtitle}
          </h2>

          <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-[#5F6F69] md:text-lg">
            {heroData.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#rooms"
              className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full bg-navy px-7 text-base font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95"
            >
              {heroData.primaryCta}
            </a>

            <a
              href={hotelInfo.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 cursor-pointer items-center justify-center rounded-full border border-navy/10 bg-white px-7 text-base font-black text-[#173D33] shadow-sm transition hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 active:scale-95"
            >
              {heroData.secondaryCta}
            </a>
          </div>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            {heroData.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.25rem] border border-navy/10 bg-white px-3 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft md:px-4 md:py-5"
              >
                <p className="font-luxury text-[1.55rem] font-black leading-none text-[#12332B] sm:text-[1.75rem] md:text-[1.95rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-bold leading-4 text-[#7A8782] md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-3 shadow-soft">
            <div
              className="min-h-[320px] rounded-[1.5rem] bg-cover bg-center sm:min-h-[420px] md:min-h-[560px]"
              style={{
                backgroundImage: `url('${heroData.image}')`,
              }}
            />

            <div className="mt-3 rounded-[1.75rem] border border-navy/10 bg-white px-4 py-4 shadow-sm md:px-6 md:py-5">
              <div className="grid grid-cols-3 divide-x divide-navy/10 text-center">
                <div className="px-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A938F]">
                    Liên hệ
                  </p>
                  <p className="mt-2 text-[0.95rem] font-extrabold leading-5 text-[#173D33] md:text-lg">
                    {hotelInfo.zaloDisplay}
                  </p>
                </div>

                <div className="px-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A938F]">
                    Vị trí
                  </p>
                  <p className="mt-2 text-[0.95rem] font-extrabold leading-5 text-[#173D33] md:text-lg">
                    Liên Chiểu
                  </p>
                </div>

                <div className="px-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A938F]">
                    Hỗ trợ
                  </p>
                  <p className="mt-2 text-[0.95rem] font-extrabold leading-5 text-[#173D33] md:text-lg">
                    24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}