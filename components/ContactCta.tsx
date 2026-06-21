import Image from "next/image";
import { hotelImages, quickContactLinks } from "@/data/site";

export default function ContactCta() {
  return (
    <section id="contact" className="bg-ivory px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-moss text-white shadow-[0_22px_70px_rgba(40,61,49,0.18)]">
        <Image
          src={hotelImages.garden.src}
          alt={hotelImages.garden.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-moss/72" />

        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-14">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-softgold">
              Đặt phòng trực tiếp
            </p>
            <h2 className="mt-3 font-luxury text-4xl font-semibold leading-tight sm:text-5xl">
              Bạn cần đặt phòng tại Mộc Nhiên Hotel?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              Liên hệ trực tiếp để được hỗ trợ nhanh và báo phòng còn trống.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {quickContactLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                  index === 0
                    ? "bg-gold text-moss hover:bg-softgold"
                    : "border border-white/24 bg-white/10 text-white hover:bg-white/16"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
