"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DurationKey,
  durationOptions,
  formatPrice,
  getDurationLabel,
  hotelInfo,
  rooms,
} from "@/data/site";

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

function getTodayDisplayValue() {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
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

  const today = getTodayDisplayValue();

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) ?? rooms[0];
  }, [selectedRoomId]);

  const currentPrice = selectedRoom.prices[selectedDuration];
  const oldPrice = selectedRoom.oldPrices[selectedDuration];
  const durationLabel = getDurationLabel(selectedDuration);

  return (
    <main className="min-h-screen bg-cream pb-24 text-navy md:pb-0">
      <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy text-base font-black text-white">
              M
            </div>

            <div>
              <p className="font-luxury text-xl font-bold leading-none">
                {hotelInfo.brandName}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">
                Đặt phòng trực tuyến
              </p>
            </div>
          </Link>

          <Link
            href="/#rooms"
            className="cursor-pointer rounded-full border border-navy/15 bg-white px-4 py-3 text-sm font-black text-navy transition hover:border-champagne hover:bg-champagne/10"
          >
            Quay lại
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
        <div className="mb-7">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne md:tracking-[0.25em]">
            Xác nhận đặt phòng
          </p>

          <h1 className="mt-3 font-luxury text-4xl font-black leading-tight text-navy md:text-5xl">
            Hoàn tất thông tin để lễ tân xác nhận phòng.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
            Khách chọn phòng, thời lượng lưu trú và để lại số điện thoại. Lễ tân
            sẽ gọi hoặc nhắn Zalo để xác nhận phòng trống và giá cuối cùng.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="order-2 lg:order-1">
            <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-navy/10 bg-white p-3 shadow-soft">
              <div
                className="h-64 rounded-[1.5rem] bg-cover bg-center sm:h-80"
                style={{
                  backgroundImage: `url('${selectedRoom.image}')`,
                }}
              />

              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                      Phòng đang đặt
                    </p>

                    <h2 className="mt-2 font-luxury text-3xl font-black leading-tight">
                      {selectedRoom.name}
                    </h2>
                  </div>

                  <div className="shrink-0 rounded-2xl bg-cream px-4 py-3 text-right">
                    <p className="text-xs font-bold text-muted line-through">
                      {formatPrice(oldPrice)}
                    </p>
                    <p className="text-xl font-black text-navy">
                      {formatPrice(currentPrice)}
                    </p>
                    <p className="text-xs font-bold text-muted">
                      {durationLabel}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {selectedRoom.description}
                </p>

                <div className="mt-5 grid gap-2">
                  {selectedRoom.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm font-semibold text-navy"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-cream p-4">
                    <p className="text-xs font-bold text-muted">Tình trạng</p>
                    <p className="mt-1 text-lg font-black">
                      Còn {selectedRoom.available} phòng
                    </p>
                  </div>

                  <div className="rounded-2xl bg-cream p-4">
                    <p className="text-xs font-bold text-muted">Tạm tính</p>
                    <p className="mt-1 text-lg font-black">
                      {formatPrice(currentPrice)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-softbeige p-4">
                  <p className="text-sm font-black">Chi tiết đặt phòng</p>

                  <div className="mt-3 space-y-2 text-sm leading-6 text-muted">
                    <p>
                      Loại phòng:{" "}
                      <span className="font-black text-navy">
                        {selectedRoom.name}
                      </span>
                    </p>

                    <p>
                      Thời lượng:{" "}
                      <span className="font-black text-navy">
                        {durationLabel}
                      </span>
                    </p>

                    <p>
                      Giá tạm tính:{" "}
                      <span className="font-black text-navy">
                        {formatPrice(currentPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="order-1 rounded-[2rem] bg-white p-5 shadow-soft md:p-8 lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne md:tracking-[0.22em]">
              Thông tin khách hàng
            </p>

            <h2 className="mt-3 font-luxury text-3xl font-black leading-tight md:text-4xl">
              Nhập thông tin lưu trú
            </h2>

            <form className="mt-7 grid gap-4">
              <FormInput
                label="Họ và tên"
                placeholder="Ví dụ: Nguyễn Minh Anh"
              />

              <FormInput
                label="Số điện thoại"
                placeholder="Ví dụ: 0789 564 888"
                type="tel"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-black text-navy">
                    Ngày nhận
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    defaultValue={today}
                    placeholder="dd/mm/yyyy"
                    className="h-14 w-full rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition placeholder:text-muted focus:border-champagne"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-navy">
                    Giờ nhận
                  </label>

                  <select className="h-14 w-full cursor-pointer rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition focus:border-champagne">
                    {checkinTimeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-black text-navy">
                    Thời lượng
                  </label>

                  <select
                    value={selectedDuration}
                    onChange={(event) =>
                      setSelectedDuration(event.target.value as DurationKey)
                    }
                    className="h-14 w-full cursor-pointer rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition focus:border-champagne"
                  >
                    {durationOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-navy">
                    Loại phòng
                  </label>

                  <select
                    value={selectedRoomId}
                    onChange={(event) => setSelectedRoomId(event.target.value)}
                    className="h-14 w-full cursor-pointer rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition focus:border-champagne"
                  >
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-[2rem] border border-navy/10 bg-cream p-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-navy">
                      Giá tạm tính
                    </p>
                    <p className="mt-1 text-xs leading-6 text-muted">
                      {selectedRoom.name} • {durationLabel}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-muted line-through">
                      {formatPrice(oldPrice)}
                    </p>
                    <p className="text-2xl font-black text-navy">
                      {formatPrice(currentPrice)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-navy">
                  Yêu cầu đặc biệt
                </label>

                <textarea
                  rows={4}
                  placeholder="Ví dụ: Tôi muốn nhận phòng lúc 20:00, cần phòng yên tĩnh..."
                  className="w-full resize-none rounded-2xl border border-navy/10 bg-cream px-4 py-4 text-base font-medium text-navy outline-none transition placeholder:text-muted focus:border-champagne"
                />
              </div>

              <div className="rounded-[2rem] border border-navy/10 bg-cream p-4">
                <p className="text-sm font-black text-navy">
                  Phương thức thanh toán
                </p>

                <div className="mt-3 grid gap-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-navy transition hover:bg-champagne/10">
                    <input type="radio" name="payment" defaultChecked />
                    Thanh toán khi nhận phòng
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-navy transition hover:bg-champagne/10">
                    <input type="radio" name="payment" />
                    Quét mã QR trên ứng dụng ngân hàng
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="h-14 cursor-pointer rounded-full bg-navy px-6 text-base font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95"
              >
                Xác nhận đặt phòng
              </button>

              <a
                href={hotelInfo.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-navy/15 bg-white px-6 py-4 text-center text-base font-black text-navy transition hover:border-champagne hover:bg-champagne/10"
              >
                Chat Zalo nếu cần hỗ trợ
              </a>

              <p className="text-center text-xs leading-6 text-muted">
                Sau khi gửi form, khách sạn sẽ liên hệ lại để xác nhận phòng
                trống, giá và thời gian nhận phòng.
              </p>
            </form>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-navy/10 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(18,51,43,0.12)] backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`tel:${hotelInfo.hotline}`}
            className="rounded-full border border-navy/15 bg-white px-4 py-3 text-center text-sm font-black text-navy"
          >
            Gọi lễ tân
          </a>

          <a
            href={hotelInfo.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-champagne px-4 py-3 text-center text-sm font-black text-navy shadow-sm"
          >
            Chat Zalo
          </a>
        </div>
      </div>
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
      <label className="mb-2 block text-sm font-black text-navy">{label}</label>

      <input
        type={type}
        inputMode={type === "tel" ? "tel" : undefined}
        placeholder={placeholder}
        className="h-14 w-full rounded-2xl border border-navy/10 bg-cream px-4 text-base font-medium text-navy outline-none transition placeholder:text-muted focus:border-champagne"
      />
    </div>
  );
}