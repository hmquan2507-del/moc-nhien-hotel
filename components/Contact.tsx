"use client";

import { useMemo, useState } from "react";
import {
  DurationKey,
  durationOptions,
  formatPrice,
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

function getTodayInputValue() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date());
}

export default function Contact() {
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("2h");

  const today = getTodayInputValue();

  const selectedRoom = useMemo(() => {
    return rooms.find((room) => room.id === selectedRoomId) ?? rooms[0];
  }, [selectedRoomId]);

  const currentPrice = selectedRoom.prices[selectedDuration];
  const oldPrice = selectedRoom.oldPrices[selectedDuration];

  const durationLabel =
    durationOptions.find((item) => item.value === selectedDuration)?.label ??
    "2 giờ";

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-24"
    >
      <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-softbeige p-5 md:p-10 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne md:tracking-[0.22em]">
              Đặt phòng nhanh
            </p>

            <h2 className="mt-3 max-w-xl font-luxury text-3xl font-black leading-tight text-navy md:text-5xl">
              Chọn phòng, xem giá và gửi yêu cầu cho lễ tân.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base md:leading-8">
              Khách chỉ cần chọn ngày, giờ, thời lượng và loại phòng. Giá tạm
              tính sẽ hiện ngay để dễ quyết định trước khi gửi yêu cầu.
            </p>

            <div className="mt-7 overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-sm">
              <div
                className="h-56 bg-cover bg-center sm:h-72"
                style={{
                  backgroundImage: `url('${selectedRoom.image}')`,
                }}
              />

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-champagne">
                      Phòng đang chọn
                    </p>

                    <h3 className="mt-2 font-luxury text-2xl font-black leading-tight text-navy">
                      {selectedRoom.name}
                    </h3>
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
                  {selectedRoom.features.slice(0, 4).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm font-semibold text-navy"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-cream px-4 py-3 text-sm">
                  <span className="font-bold text-muted">Tình trạng:</span>{" "}
                  <span className="font-black text-navy">
                    Còn {selectedRoom.available} phòng
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href={hotelInfo.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] cursor-pointer rounded-full bg-navy px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95"
              >
                Chat Zalo đặt phòng
              </a>

              <a
                href={`tel:${hotelInfo.hotline}`}
                className="min-h-[52px] cursor-pointer rounded-full border border-navy/15 bg-white px-6 py-4 text-center text-sm font-black text-navy transition hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 active:scale-95"
              >
                Gọi lễ tân
              </a>
            </div>
          </div>

          <div className="p-5 md:p-10 lg:p-14">
            <div className="mx-auto max-w-xl">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne md:tracking-[0.22em]">
                Form đặt phòng
              </p>

              <h3 className="mt-3 font-luxury text-3xl font-black leading-tight text-navy md:text-4xl">
                Nhập thông tin lưu trú
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                Form được tối ưu để khách đặt phòng trên điện thoại nhanh hơn.
              </p>

              <form className="mt-7 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-black text-navy">
                    Họ và tên
                  </label>

                  <input
                    placeholder="Ví dụ: Nguyễn Minh Anh"
                    className="h-14 w-full rounded-2xl border border-navy/10 bg-cream px-4 text-base font-medium text-navy outline-none transition placeholder:text-muted focus:border-champagne"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-navy">
                    Số điện thoại
                  </label>

                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="Ví dụ: 0789 564 888"
                    className="h-14 w-full rounded-2xl border border-navy/10 bg-cream px-4 text-base font-medium text-navy outline-none transition placeholder:text-muted focus:border-champagne"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-black text-navy">
                      Ngày nhận
                    </label>

                    <input
                      type="date"
                      defaultValue={today}
                      min={today}
                      className="h-14 w-full cursor-pointer rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition focus:border-champagne"
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
                    Ghi chú / yêu cầu đặc biệt
                  </label>

                  <textarea
                    placeholder="Ví dụ: Tôi muốn nhận phòng lúc 20:00, cần phòng yên tĩnh..."
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-navy/10 bg-cream px-4 py-4 text-base font-medium text-navy outline-none transition placeholder:text-muted focus:border-champagne"
                  />
                </div>

                <button
                  type="button"
                  className="h-14 cursor-pointer rounded-full bg-navy px-6 text-base font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95"
                >
                  Gửi yêu cầu đặt phòng
                </button>

                <p className="text-center text-xs leading-6 text-muted">
                  Sau khi gửi form, khách sạn sẽ liên hệ lại để xác nhận phòng
                  trống, giá và thời gian nhận phòng.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}