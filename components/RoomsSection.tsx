import Image from "next/image";
import Link from "next/link";
import { DurationKey, formatPrice, getDurationLabel, rooms } from "@/data/site";

export default function RoomsSection({ duration }: { duration: DurationKey }) {
  return (
    <section id="rooms" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 border-b border-moss/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="section-eyebrow">Phòng nghỉ</p>
            <h2 className="section-title mt-3 max-w-3xl">
              Lựa chọn phòng gọn gàng cho từng nhu cầu lưu trú
            </h2>
          </div>
          <p className="max-w-md rounded-md bg-ivory px-4 py-3 text-sm leading-6 text-olive">
            Giá đang hiển thị theo gói{" "}
            <span className="font-bold text-moss">{getDurationLabel(duration)}</span>.
            Vui lòng liên hệ lễ tân để xác nhận phòng trống.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {rooms.map((room) => {
            const price = room.prices[duration];

            return (
              <article
                key={room.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-moss/10 bg-ivory shadow-sm transition-shadow hover:shadow-[0_20px_45px_rgba(40,61,49,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-luxury text-2xl font-semibold leading-tight text-moss">
                      {room.name}
                    </h3>
                    <p className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-gold">
                      Từ {formatPrice(price)}
                    </p>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-olive">
                    {room.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-moss/10 bg-white px-3 py-1.5 text-sm font-semibold text-forest"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/booking/${room.id}?duration=${duration}`}
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-moss px-5 text-base font-bold text-white shadow-[0_14px_30px_rgba(37,77,58,0.2)] transition-colors hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      Hỏi giá phòng
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
