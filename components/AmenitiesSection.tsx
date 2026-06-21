import Image from "next/image";
import { amenities, hotelImages } from "@/data/site";

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="bg-softbeige py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-[0_22px_55px_rgba(40,61,49,0.13)] sm:aspect-[16/11] lg:aspect-[4/5]">
              <Image
                src={hotelImages.lobby.src}
                alt={hotelImages.lobby.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-md border border-white/40 bg-white/90 p-5 shadow-lg backdrop-blur-md sm:right-auto sm:w-80">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold">
                Trải nghiệm lưu trú
              </p>
              <p className="mt-2 text-sm leading-6 text-olive">
                Tập trung vào những điều khách thật sự cần: sạch, thuận tiện,
                dễ liên hệ và thoải mái khi nghỉ ngơi.
              </p>
            </div>
          </div>

          <div>
            <p className="section-eyebrow">Tiện nghi</p>
            <h2 className="section-title mt-3">
              Những chi tiết giúp kỳ lưu trú nhẹ nhàng hơn
            </h2>
            <p className="mt-5 text-base leading-8 text-olive sm:text-lg">
              Mộc Nhiên không phô trương quá mức. Khách sạn giữ trải nghiệm rõ
              ràng, sạch sẽ và thuận tiện để khách dễ nghỉ ngơi, dễ đặt phòng và
              dễ di chuyển.
            </p>

            <div className="mt-8 grid gap-3">
              {amenities.map((item, index) => (
                <article
                  key={item.title}
                  className="grid grid-cols-[68px_1fr] items-center gap-4 rounded-md border border-moss/10 bg-white p-3 shadow-sm sm:grid-cols-[92px_1fr]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="92px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-moss">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-olive">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
