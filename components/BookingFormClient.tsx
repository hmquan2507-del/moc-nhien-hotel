"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  DurationKey,
  durationOptions,
  formatPrice,
  getDurationLabel,
  hotelInfo,
  paymentInfo,
  rooms,
} from "@/data/site";

type PaymentMethod = "arrival" | "online";

const guestOptions = ["1 khách", "2 khách", "3 khách", "4 khách", "Gia đình / nhóm"];

function toDateInputValue(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  return date.toISOString().slice(0, 10);
}

export default function BookingFormClient({
  initialRoomId,
  initialDuration,
}: {
  initialRoomId: string;
  initialDuration: DurationKey;
}) {
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [selectedDuration, setSelectedDuration] =
    useState<DurationKey>(initialDuration);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("arrival");

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) ?? rooms[0];
  }, [selectedRoomId]);

  const price = selectedRoom.prices[selectedDuration];
  const durationLabel = getDurationLabel(selectedDuration);
  const isAvailable = selectedRoom.available > 0;
  const successHref = `/booking-success?room=${selectedRoom.id}&duration=${selectedDuration}&payment=${paymentMethod}`;

  return (
    <main className="min-h-screen bg-ivory pb-12 text-moss">
      <header className="sticky top-0 z-50 border-b border-moss/10 bg-ivory/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            aria-label="Về trang chủ Mộc Nhiên Hotel"
          >
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-moss/10 bg-white shadow-sm">
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
                Đặt phòng
              </span>
            </span>
          </Link>

          <Link
            href="/#rooms"
            className="hidden min-h-11 items-center justify-center rounded-full border border-moss/15 bg-white px-5 text-sm font-bold text-moss transition-colors hover:border-gold sm:inline-flex"
          >
            Xem phòng
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6">
          <p className="section-eyebrow">Đặt phòng trực tiếp</p>
          <h1 className="mt-3 max-w-2xl font-luxury text-3xl font-semibold leading-tight text-moss sm:text-4xl lg:text-5xl">
            Chọn phòng và gửi thông tin đặt phòng
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-olive">
            Không cần chọn giờ nhận. Lễ tân sẽ xác nhận phòng trống và hướng dẫn
            bước thanh toán tiếp theo.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
          <aside className="overflow-hidden rounded-lg border border-moss/10 bg-white p-3 shadow-[0_18px_48px_rgba(40,61,49,0.1)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-softbeige lg:aspect-[4/3]">
              <Image
                src={selectedRoom.image}
                alt={selectedRoom.imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                priority
              />
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] shadow-sm ${
                  isAvailable
                    ? "bg-white text-moss"
                    : "bg-[#7b2d26] text-white"
                }`}
              >
                {isAvailable ? `Còn ${selectedRoom.available} phòng` : "Hết phòng"}
              </span>
            </div>

            <div className="p-3 sm:p-4">
              <h2 className="font-luxury text-2xl font-semibold leading-tight text-moss sm:text-3xl">
                {selectedRoom.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-olive">
                {selectedRoom.description}
              </p>

              <div className="mt-5 rounded-md bg-ivory p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-olive">
                      Giá tham khảo
                    </p>
                    <p className="mt-1 text-sm font-semibold text-olive">
                      {durationLabel}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-moss sm:text-3xl">
                    {formatPrice(price)}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-lg border border-moss/10 bg-white p-5 shadow-[0_18px_48px_rgba(40,61,49,0.1)] sm:p-6">
            <form className="grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Họ và tên">
                  <input
                    placeholder="Nguyễn Minh Anh"
                    className="booking-input"
                  />
                </Field>
                <Field label="Số điện thoại">
                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="0789 564 888"
                    className="booking-input"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Loại phòng">
                  <select
                    value={selectedRoomId}
                    onChange={(event) => setSelectedRoomId(event.target.value)}
                    className="booking-input"
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Gói lưu trú">
                  <select
                    value={selectedDuration}
                    onChange={(event) =>
                      setSelectedDuration(event.target.value as DurationKey)
                    }
                    className="booking-input"
                  >
                    {durationOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Ngày nhận">
                  <input
                    type="date"
                    defaultValue={toDateInputValue(0)}
                    className="booking-input"
                  />
                </Field>
                <Field label="Ngày trả">
                  <input
                    type="date"
                    defaultValue={toDateInputValue(1)}
                    className="booking-input"
                  />
                </Field>
                <Field label="Số khách">
                  <select defaultValue="2 khách" className="booking-input">
                    {guestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-moss">
                  Phương thức thanh toán
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <PaymentButton
                    active={paymentMethod === "arrival"}
                    title="Thanh toán khi nhận phòng"
                    onClick={() => setPaymentMethod("arrival")}
                  />
                  <PaymentButton
                    active={paymentMethod === "online"}
                    title="Thanh toán online"
                    onClick={() => setPaymentMethod("online")}
                  />
                </div>
              </div>

              {paymentMethod === "online" && (
                <PaymentQrPanel
                  amount={formatPrice(price)}
                  roomName={selectedRoom.name}
                  durationLabel={durationLabel}
                />
              )}

              <Field label="Ghi chú">
                <textarea
                  rows={3}
                  placeholder="Yêu cầu thêm nếu có..."
                  className="booking-input resize-none py-3"
                />
              </Field>

              <div className="rounded-md bg-ivory p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-olive">Tạm tính</p>
                    <p className="mt-1 text-base font-bold text-moss">
                      {selectedRoom.name} / {durationLabel}
                    </p>
                    <p className="mt-1 text-sm text-olive">
                      {paymentMethod === "online"
                        ? "Thanh toán online bằng mã QR khách sạn"
                        : "Thanh toán khi nhận phòng"}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-moss sm:text-3xl">
                    {formatPrice(price)}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_0.75fr]">
                <Link
                  href={successHref}
                  aria-disabled={!isAvailable}
                  className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-base font-bold shadow-[0_14px_30px_rgba(37,77,58,0.22)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                    isAvailable
                      ? "bg-moss text-white hover:bg-forest"
                      : "pointer-events-none bg-moss/35 text-white"
                  }`}
                >
                  Đặt phòng ngay
                </Link>
                <a
                  href={hotelInfo.zaloLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/15 bg-white px-6 text-base font-bold text-moss transition-colors hover:border-gold"
                >
                  Nhắn Zalo
                </a>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

function PaymentQrPanel({
  amount,
  roomName,
  durationLabel,
}: {
  amount: string;
  roomName: string;
  durationLabel: string;
}) {
  return (
    <div className="rounded-xl border border-gold/35 bg-[#fff8ea] p-4">
      <div className="grid gap-4 sm:grid-cols-[136px_1fr] sm:items-center">
        <div className="mx-auto w-full max-w-[160px] rounded-lg border border-moss/10 bg-white p-2 shadow-sm sm:max-w-none">
          <Image
            src={paymentInfo.qrImage.src}
            alt={paymentInfo.qrImage.alt}
            width={160}
            height={160}
            unoptimized
            className="h-auto w-full rounded-md"
          />
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-gold">
            Thanh toán qua QR
          </p>
          <h3 className="mt-2 text-xl font-bold leading-tight text-moss">
            Quét mã QR của khách sạn
          </h3>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-olive">
            <p>
              <span className="font-bold text-moss">Số tiền:</span> {amount}
            </p>
            <p>
              <span className="font-bold text-moss">Nội dung:</span>{" "}
              {paymentInfo.transferNote}
            </p>
            <p>
              <span className="font-bold text-moss">Phòng:</span> {roomName} /{" "}
              {durationLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-moss">{label}</span>
      {children}
    </label>
  );
}

function PaymentButton({
  active,
  title,
  onClick,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-12 rounded-md border px-4 text-left text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
        active
          ? "border-gold bg-[#fff7e7] text-moss"
          : "border-moss/10 bg-white text-olive hover:border-gold/50 hover:text-moss"
      }`}
    >
      {title}
    </button>
  );
}
