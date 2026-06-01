import Image from "next/image";
import { hotelInfo } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="relative h-16 w-[190px]">
              <Image
                src="/images/moc-nhien-logo.png"
                alt="Mộc Nhiên Hotel"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              Website hỗ trợ khách xem phòng, tham khảo giá theo thời lượng lưu
              trú và liên hệ đặt phòng nhanh qua điện thoại hoặc Zalo.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-champagne">
              Liên hệ
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <p>
                <span className="font-black text-navy">Lễ tân:</span>{" "}
                {hotelInfo.hotlineDisplay}
              </p>
              <p>
                <span className="font-black text-navy">Zalo:</span>{" "}
                {hotelInfo.zaloDisplay}
              </p>
              <p>
                <span className="font-black text-navy">Địa chỉ:</span>{" "}
                {hotelInfo.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-champagne">
              Kết nối nhanh
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={hotelInfo.zaloLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-navy/10 bg-white px-4 text-sm font-black text-navy transition hover:border-champagne hover:text-leaf"
              >
                Chat Zalo
              </a>

              <a
                href={hotelInfo.facebookLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-navy/10 bg-white px-4 text-sm font-black text-navy transition hover:border-champagne hover:text-leaf"
              >
                Xem Fanpage
              </a>

              <a
                href={hotelInfo.googleMapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-navy/10 bg-white px-4 text-sm font-black text-navy transition hover:border-champagne hover:text-leaf"
              >
                Xem Google Map
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-navy/10 pt-6 text-center text-sm text-muted">
          © {new Date().getFullYear()} Mộc Nhiên Hotel. Demo website đặt phòng.
        </div>
      </div>
    </footer>
  );
}