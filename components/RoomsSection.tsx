import Image from "next/image";
import Link from "next/link";
import { DurationKey, formatPrice, getDurationLabel, rooms } from "@/data/site";

export default function RoomsSection({ duration }: { duration: DurationKey }) {
  return (
    <section id="rooms" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-moss/10 pb-8 lg:grid-cols-[1fr_448px] lg:items-end">
          <div>
            <p className="section-eyebrow">Phòng nghỉ</p>
            <h2 className="section-title mt-3 max-w-3xl">
              Chọn phòng phù hợp và đặt trực tiếp với lễ tân
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-olive">
              Xem nhanh tình trạng phòng, giá tham khảo theo gói{" "}
              <span className="font-bold text-moss">
                {getDurationLabel(duration)}
              </span>{" "}
              và gửi yêu cầu đặt phòng ngay khi còn chỗ.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {rooms.map((room) => {
            const price = room.prices[duration];
            const isAvailable = room.available > 0;

            return (
              <article
                key={room.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-moss/10 bg-ivory shadow-sm transition-shadow hover:shadow-[0_22px_50px_rgba(40,61,49,0.14)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-softbeige">
                  <Image
                    src={room.image}
                    alt={room.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                  <div
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] shadow-sm ${
                      isAvailable
                        ? "bg-white text-moss"
                        : "bg-[#7b2d26] text-white"
                    }`}
                  >
                    {isAvailable ? `Còn ${room.available} phòng` : "Hết phòng"}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <p className="rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-moss shadow-sm">
                      Từ {formatPrice(price)}
                    </p>
                    <p className="hidden rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-moss shadow-sm sm:block">
                      {getDurationLabel(duration)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-luxury text-2xl font-semibold leading-tight text-moss">
                    {room.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-olive">
                    {room.description}
                  </p>

                  <div className="mt-5 rounded-md border border-moss/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold">
                          Tình trạng phòng
                        </p>
                        <p className="mt-2 text-lg font-bold text-moss">
                          {isAvailable
                            ? `Còn ${room.available} phòng`
                            : "Tạm hết phòng"}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${
                          isAvailable
                            ? "bg-[#e8f4ed] text-moss"
                            : "bg-[#f8e4df] text-[#7b2d26]"
                        }`}
                      >
                        {isAvailable ? "Có thể đặt" : "Liên hệ lại"}
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-softbeige">
                      <div
                        className={`h-full rounded-full ${
                          isAvailable ? "bg-moss" : "bg-[#b46558]"
                        }`}
                        style={{
                          width: isAvailable
                            ? `${Math.min(100, 34 + room.available * 22)}%`
                            : "100%",
                        }}
                      />
                    </div>
                  </div>

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
                      aria-disabled={!isAvailable}
                      className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 text-base font-bold shadow-[0_14px_30px_rgba(37,77,58,0.2)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                        isAvailable
                          ? "bg-moss text-white hover:bg-forest"
                          : "pointer-events-none bg-moss/35 text-white"
                      }`}
                    >
                      {isAvailable ? "Đặt phòng ngay" : "Tạm hết phòng"}
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
