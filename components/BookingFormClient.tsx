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
  rooms,
} from "@/data/site";

function toDateInputValue(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  return date.toISOString().slice(0, 10);
}

const checkinTimeOptions = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

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

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) ?? rooms[0];
  }, [selectedRoomId]);

  const currentPrice = selectedRoom.prices[selectedDuration];
  const durationLabel = getDurationLabel(selectedDuration);

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
                Đặt phòng trực tiếp
              </span>
            </span>
          </Link>

          <Link
            href="/#rooms"
            className="hidden min-h-11 items-center justify-center rounded-full border border-moss/15 bg-white px-5 text-sm font-bold text-moss transition-colors hover:border-gold sm:inline-flex"
          >
            Quay lại
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-7">
          <p className="section-eyebrow">Xác nhận đặt phòng</p>
          <h1 className="section-title mt-3 max-w-4xl">
            Gửi thông tin để lễ tân kiểm tra phòng còn trống
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-olive">
            Vui lòng chọn phòng, thời gian lưu trú và để lại số điện thoại.
            Mộc Nhiên Hotel sẽ liên hệ lại để xác nhận giá và thời gian nhận
            phòng.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-lg border border-moss/10 bg-white p-3 shadow-[0_20px_55px_rgba(40,61,49,0.12)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={selectedRoom.image}
                  alt={selectedRoom.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4">
                <p className="section-eyebrow">Phòng đang chọn</p>
                <h2 className="mt-2 font-luxury text-3xl font-semibold leading-tight text-moss">
                  {selectedRoom.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-olive">
                  {selectedRoom.description}
                </p>
                <div className="mt-5 rounded-md bg-ivory p-4">
                  <p className="text-sm font-bold text-olive">Giá tham khảo</p>
                  <p className="mt-1 text-3xl font-bold text-moss">
                    {formatPrice(currentPrice)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-olive">
                    {durationLabel}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <section className="rounded-lg border border-moss/10 bg-white p-5 shadow-[0_20px_55px_rgba(40,61,49,0.1)] sm:p-7">
            <form className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput label="Họ và tên" placeholder="Ví dụ: Nguyễn Minh Anh" />
                <FormInput
                  label="Số điện thoại"
                  placeholder="Ví dụ: 0789 564 888"
                  type="tel"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect
                  label="Loại phòng"
                  value={selectedRoomId}
                  onChange={(value) => setSelectedRoomId(value)}
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </FormSelect>

                <FormSelect
                  label="Thời lượng"
                  value={selectedDuration}
                  onChange={(value) => setSelectedDuration(value as DurationKey)}
                >
                  {durationOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormDate label="Ngày nhận" defaultValue={toDateInputValue(0)} />
                <FormDate label="Ngày trả" defaultValue={toDateInputValue(1)} />
                <FormSelect label="Giờ nhận" defaultValue="14:00">
                  {checkinTimeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-moss">
                  Yêu cầu thêm
                </label>
                <textarea
                  rows={4}
                  placeholder="Ví dụ: Cần phòng yên tĩnh, nhận phòng muộn..."
                  className="w-full resize-none rounded-md border border-moss/10 bg-ivory px-4 py-4 text-base font-medium text-moss outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
                />
              </div>

              <div className="rounded-md bg-ivory p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-olive">
                      Giá tham khảo
                    </p>
                    <p className="mt-1 text-lg font-bold text-moss">
                      {selectedRoom.name} / {durationLabel}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-moss">
                    {formatPrice(currentPrice)}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/booking-success?room=${selectedRoom.id}&duration=${selectedDuration}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-moss px-6 text-base font-bold text-white shadow-[0_14px_30px_rgba(37,77,58,0.22)] transition-colors hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  Xác nhận đặt phòng
                </Link>
                <a
                  href={hotelInfo.zaloLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-moss/15 bg-white px-6 text-base font-bold text-moss transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  Nhắn Zalo hỗ trợ
                </a>
              </div>

              <p className="text-center text-sm leading-6 text-olive">
                Khách sạn sẽ liên hệ lại để xác nhận phòng trống và giá chính
                xác trước khi giữ phòng.
              </p>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

function FormInput({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-moss">{label}</label>
      <input
        type={type}
        inputMode={type === "tel" ? "tel" : undefined}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-md border border-moss/10 bg-ivory px-4 text-base font-medium text-moss outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
      />
    </div>
  );
}

function FormDate({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-moss">{label}</label>
      <input
        type="date"
        defaultValue={defaultValue}
        className="min-h-12 w-full rounded-md border border-moss/10 bg-ivory px-4 text-base font-bold text-moss outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
      />
    </div>
  );
}

function FormSelect({
  label,
  children,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-moss">{label}</label>
      <select
        {...(value !== undefined ? { value } : { defaultValue })}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-h-12 w-full rounded-md border border-moss/10 bg-ivory px-4 text-base font-bold text-moss outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15"
      >
        {children}
      </select>
    </div>
  );
}
