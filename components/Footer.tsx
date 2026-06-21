import Image from "next/image";
import { hotelInfo, navItems } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-wood text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-14 w-14 overflow-hidden rounded-md border border-white/12 bg-white">
                <Image
                  src={hotelInfo.logo.src}
                  alt={hotelInfo.logo.alt}
                  fill
                  sizes="56px"
                  className="object-contain p-1.5"
                />
              </span>
              <div>
                <p className="font-luxury text-3xl font-semibold leading-none">
                  {hotelInfo.brandName}
                </p>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ivory/58">
                  Khách sạn tiện nghi tại Đà Nẵng
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-ivory/70">
              Không gian lưu trú sạch sẽ, vị trí thuận tiện, hỗ trợ đặt phòng
              nhanh qua điện thoại và Zalo.
            </p>
          </div>

          <div>
            <p className="footer-title">Menu nhanh</p>
            <nav className="mt-4 grid gap-3" aria-label="Menu footer">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-ivory/70 transition-colors hover:text-softgold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-softgold"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="footer-title">Liên hệ</p>
            <address className="mt-4 grid gap-3 text-sm not-italic leading-7 text-ivory/70">
              <p>{hotelInfo.address}</p>
              <a
                href={`tel:${hotelInfo.hotline}`}
                className="transition-colors hover:text-softgold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-softgold"
              >
                Hotline: {hotelInfo.hotlineDisplay}
              </a>
              <a
                href={hotelInfo.zaloLink}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-softgold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-softgold"
              >
                Zalo: {hotelInfo.zaloDisplay}
              </a>
              <a
                href={hotelInfo.facebookLink}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-softgold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-softgold"
              >
                Facebook
              </a>
              <a
                href={hotelInfo.googleMapLink}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-softgold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-softgold"
              >
                Google Map
              </a>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/12 pt-6 text-sm text-ivory/48 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Mộc Nhiên Hotel.</p>
          <p>Đặt phòng trực tiếp để được hỗ trợ nhanh nhất.</p>
        </div>
      </div>
    </footer>
  );
}
