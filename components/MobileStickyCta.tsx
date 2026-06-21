import { hotelInfo } from "@/data/site";

export default function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-moss/10 bg-white/95 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-16px_38px_rgba(40,61,49,0.14)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          href={`tel:${hotelInfo.hotline}`}
          className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-full border border-moss/15 bg-white px-2 text-[12px] font-bold text-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Gọi
        </a>
        <a
          href={hotelInfo.zaloLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-full border border-moss/15 bg-white px-2 text-[12px] font-bold text-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Zalo
        </a>
        <a
          href="#booking"
          className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-full bg-moss px-2 text-[12px] font-bold text-white shadow-[0_10px_22px_rgba(37,77,58,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          Đặt phòng
        </a>
      </div>
    </div>
  );
}
