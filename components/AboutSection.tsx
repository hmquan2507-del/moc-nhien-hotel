import Image from "next/image";
import { aboutStats, hotelImages } from "@/data/site";

export default function AboutSection() {
  return (
    <section id="about" className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-[0_22px_55px_rgba(40,61,49,0.12)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={hotelImages.exteriorFront.src}
              alt={hotelImages.exteriorFront.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/50 bg-white/88 p-4 shadow-lg backdrop-blur-md sm:left-auto sm:right-5 sm:w-72">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold">
              Boutique hotel
            </p>
            <p className="mt-2 text-sm leading-6 text-olive">
              Một điểm dừng chân gọn gàng, ấm áp và dễ liên hệ khi bạn cần phòng
              tại Đà Nẵng.
            </p>
          </div>
        </div>

        <div>
          <p className="section-eyebrow">Giới thiệu</p>
          <h2 className="section-title mt-3">
            Chào mừng đến với Mộc Nhiên Hotel
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-olive sm:text-lg">
            Mộc Nhiên Hotel mang đến không gian lưu trú sạch sẽ, riêng tư và dễ
            chịu cho khách du lịch, công tác hoặc nghỉ ngắn ngày tại Đà Nẵng.
            Khách sạn tập trung vào sự thuận tiện, thông tin rõ ràng và hỗ trợ
            nhanh qua điện thoại hoặc Zalo.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {aboutStats.map((stat) => (
              <article
                key={stat.value}
                className="rounded-md border border-moss/10 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-moss">{stat.value}</h3>
                <p className="mt-2 text-sm leading-6 text-olive">{stat.label}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#rooms"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-moss px-6 text-base font-bold text-white shadow-[0_14px_30px_rgba(37,77,58,0.22)] transition-colors hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Xem phòng nghỉ
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/15 bg-white px-6 text-base font-bold text-moss transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Liên hệ lễ tân
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
