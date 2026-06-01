import Image from "next/image";
import Link from "next/link";
import { hotelInfo } from "@/data/site";

const navItems = [
  { label: "Phòng", href: "#rooms" },
  { label: "Ưu đãi", href: "#offers" },
  { label: "FAQ", href: "#faq" },
  { label: "Liên hệ", href: "#contact" },
];

export default function Header() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[999] border-b border-navy/10 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-4 md:h-[82px] md:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 transition hover:opacity-90"
            aria-label="Mộc Nhiên Hotel"
          >
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm md:h-14 md:w-14">
              <Image
                src="/images/moc-nhien-logo.png"
                alt="Mộc Nhiên Hotel"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-luxury text-xl font-black leading-none text-navy md:text-2xl">
                {hotelInfo.brandName}
              </p>

              <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
                {hotelInfo.slogan}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-bold text-muted transition hover:text-navy"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={hotelInfo.zaloLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-navy/10 bg-white px-5 text-sm font-black text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 active:scale-95 md:h-12 md:px-6"
            >
              Chat Zalo
            </a>

            <a
              href={`tel:${hotelInfo.hotline}`}
              className="hidden h-12 cursor-pointer items-center justify-center rounded-full bg-navy px-6 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95 md:inline-flex"
            >
              Gọi lễ tân
            </a>
          </div>
        </div>
      </header>

      <div className="h-[74px] md:h-[82px]" />
    </>
  );
}