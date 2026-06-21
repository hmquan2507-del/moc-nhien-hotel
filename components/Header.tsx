"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hotelInfo, navItems } from "@/data/site";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const headerClass = isScrolled
    ? "border-moss/10 bg-ivory/95 shadow-[0_14px_38px_rgba(40,61,49,0.1)] backdrop-blur-xl"
    : "border-transparent bg-ivory/88 backdrop-blur-md";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          aria-label="Về trang chủ Mộc Nhiên Hotel"
          className="flex min-w-0 items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-moss/10 bg-white shadow-sm sm:h-12 sm:w-12">
            <Image
              src={hotelInfo.logo.src}
              alt={hotelInfo.logo.alt}
              fill
              sizes="48px"
              className="object-contain p-1"
              priority
            />
          </span>

          <span className="hidden min-w-0 min-[390px]:block">
            <span className="block truncate font-luxury text-[1.08rem] font-semibold leading-none text-moss min-[390px]:text-[1.18rem] sm:text-[1.45rem]">
              <span className="sm:hidden">{hotelInfo.shortName}</span>
              <span className="hidden sm:inline">{hotelInfo.brandName}</span>
            </span>
            <span className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-olive sm:block">
              {hotelInfo.slogan}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Menu chính">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm font-semibold text-forest transition-colors hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${hotelInfo.hotline}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-moss/15 bg-white px-0 text-sm font-bold text-moss shadow-sm transition-colors hover:border-gold hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-12 sm:w-auto sm:px-5"
          >
            <span className="sm:hidden">Gọi</span>
            <span className="hidden sm:inline">Gọi ngay</span>
          </a>

          <Link
            href="#booking"
            className="hidden h-12 items-center justify-center rounded-full bg-moss px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,77,58,0.22)] transition-colors hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:inline-flex"
          >
            Đặt phòng
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-moss/15 bg-white text-moss shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:hidden"
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-opacity ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-current transition-transform ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-ivory px-4 pb-8 pt-5 shadow-2xl sm:top-20 lg:hidden">
          <nav
            aria-label="Menu mobile"
            className="mx-auto flex h-full max-w-md flex-col"
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-14 items-center justify-between rounded-md border border-moss/10 bg-white px-5 text-lg font-semibold text-moss shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-gold">
                    /
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-auto grid gap-3 border-t border-moss/10 pt-5">
              <Link
                href="#booking"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-moss px-6 text-base font-bold text-white shadow-[0_12px_28px_rgba(37,77,58,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Đặt phòng ngay
              </Link>
              <a
                href={hotelInfo.zaloLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-moss/15 bg-white px-6 text-base font-bold text-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                Nhắn Zalo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
