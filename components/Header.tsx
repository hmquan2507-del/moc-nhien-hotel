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
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition hover:opacity-90"
        >
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
            <Image
              src="/images/moc-nhien-logo.png"
              alt="Mộc Nhiên Hotel"
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="font-luxury text-xl font-black leading-none text-navy md:text-2xl">
              {hotelInfo.brandName}
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
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

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <a
            href={hotelInfo.zaloLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-navy/10 bg-white px-4 text-sm font-black text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 active:scale-95 md:h-12 md:px-6"
          >
            Chat Zalo
          </a>

          <a
            href={`tel:${hotelInfo.hotline}`}
            className="hidden h-11 cursor-pointer items-center justify-center rounded-full bg-navy px-4 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95 sm:inline-flex md:h-12 md:px-6"
          >
            Gọi lễ tân
          </a>
        </div>
      </div>
    </header>
  );
}