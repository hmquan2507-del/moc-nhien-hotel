"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { hotelInfo, navItems } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/90 shadow-[0_18px_50px_rgba(18,43,34,0.14)] backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:h-[72px] sm:px-5 lg:px-7">
          <Link
            href="/#home"
            onClick={() => setOpen(false)}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-moss/10 bg-white shadow-sm sm:h-11 sm:w-11">
              <Image
                src={hotelInfo.logo.src}
                alt={hotelInfo.logo.alt}
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[18px] font-extrabold leading-tight text-moss sm:text-[22px]">
                {hotelInfo.brandName}
              </p>
              <p className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-moss/60 sm:block">
                {hotelInfo.slogan}
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-bold text-moss/85 transition hover:bg-ivory hover:text-moss focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href={`tel:${hotelInfo.hotline}`}
              className="rounded-full border border-moss/10 bg-white px-5 py-3 text-sm font-extrabold text-moss shadow-sm transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Gọi ngay
            </Link>

            <Link
              href="/booking"
              className="rounded-full bg-moss px-6 py-3 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(37,77,58,0.24)] transition hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Đặt phòng
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-moss/10 bg-white text-moss shadow-sm lg:hidden"
            aria-label="Mở menu"
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {open && (
          <div className="border-t border-moss/10 px-4 pb-4 pt-2 lg:hidden">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-bold text-moss transition active:bg-ivory"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href={`tel:${hotelInfo.hotline}`}
                className="rounded-xl border border-moss/10 bg-white px-4 py-3 text-center text-sm font-extrabold text-moss shadow-sm"
              >
                Gọi ngay
              </Link>
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-moss px-4 py-3 text-center text-sm font-extrabold text-white shadow-sm"
              >
                Đặt phòng
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
