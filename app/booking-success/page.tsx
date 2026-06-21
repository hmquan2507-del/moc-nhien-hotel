import Image from "next/image";
import Link from "next/link";
import {
  DurationKey,
  formatPrice,
  getDurationLabel,
  getValidDuration,
  hotelInfo,
  rooms,
} from "@/data/site";

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    room?: string;
    duration?: string;
  }>;
}) {
  const params = await searchParams;
  const selectedRoom =
    rooms.find((room) => room.id === params?.room) ?? rooms[0];
  const selectedDuration = getValidDuration(params?.duration) as DurationKey;
  const durationLabel = getDurationLabel(selectedDuration);
  const price = selectedRoom.prices[selectedDuration];

  return (
    <main className="min-h-screen bg-ivory pb-24 text-moss md:pb-0">
      <header className="sticky top-0 z-50 border-b border-moss/10 bg-ivory/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label="Về trang chủ Mộc Nhiên Hotel"
          >
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-moss/10 bg-white shadow-sm">
              <Image
                src={hotelInfo.logo.src}
                alt={hotelInfo.logo.alt}
                fill
                sizes="48px"
                className="object-contain p-1"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-luxury text-xl font-semibold leading-none text-moss sm:text-2xl">
                {hotelInfo.brandName}
              </span>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-olive">
                Đã ghi nhận yêu cầu
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="hidden min-h-11 items-center justify-center rounded-full border border-moss/15 bg-white px-5 text-sm font-bold text-moss transition-colors hover:border-gold sm:inline-flex"
          >
            Về trang chủ
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-lg border border-moss/10 bg-white shadow-[0_22px_70px_rgba(40,61,49,0.14)]">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-moss p-6 text-white sm:p-8 lg:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-3xl font-bold text-moss">
                ✓
              </div>
              <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.14em] text-softgold">
                Đặt phòng thành công
              </p>
              <h1 className="mt-3 font-luxury text-4xl font-semibold leading-tight sm:text-5xl">
                Cảm ơn quý khách đã gửi yêu cầu đặt phòng.
              </h1>
              <p className="mt-5 text-base leading-8 text-white/78">
                Mộc Nhiên Hotel đã ghi nhận thông tin. Lễ tân sẽ kiểm tra phòng
                trống và liên hệ lại qua điện thoại hoặc Zalo để xác nhận giá
                chính xác.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${hotelInfo.hotline}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-base font-bold text-moss transition-colors hover:bg-linen"
                >
                  Gọi khách sạn
                </a>
                <a
                  href={hotelInfo.zaloLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-5 text-base font-bold text-moss transition-colors hover:bg-softgold"
                >
                  Nhắn Zalo
                </a>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={selectedRoom.image}
                  alt={selectedRoom.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-5">
                <p className="section-eyebrow">Thông tin đặt phòng</p>
                <h2 className="mt-2 font-luxury text-3xl font-semibold leading-tight text-moss">
                  {selectedRoom.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-olive">
                  {selectedRoom.description}
                </p>

                <div className="mt-5 grid gap-3">
                  <InfoRow label="Loại phòng" value={selectedRoom.name} />
                  <InfoRow label="Thời lượng" value={durationLabel} />
                  <InfoRow label="Giá tham khảo" value={formatPrice(price)} />
                  <InfoRow label="Hotline" value={hotelInfo.hotlineDisplay} />
                  <InfoRow label="Zalo" value={hotelInfo.zaloDisplay} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/#rooms"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/15 bg-white px-5 text-base font-bold text-moss transition-colors hover:border-gold"
                  >
                    Xem phòng khác
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-moss px-5 text-base font-bold text-white transition-colors hover:bg-forest"
                  >
                    Về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-ivory px-4 py-3">
      <p className="text-sm font-semibold text-olive">{label}</p>
      <p className="text-right text-sm font-bold text-moss">{value}</p>
    </div>
  );
}
