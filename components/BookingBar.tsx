import type { ReactNode } from "react";
import { bookingDefaults, rooms } from "@/data/site";

function toDateInputValue(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  return date.toISOString().slice(0, 10);
}

export default function BookingBar() {
  return (
    <section
      id="booking"
      className="relative z-20 bg-ivory px-4 pb-12 pt-6 sm:px-6 md:-mt-16 md:bg-transparent md:pb-16 md:pt-0 lg:px-8"
    >
      <form
        action="#contact"
        className="mx-auto max-w-6xl rounded-lg border border-moss/10 bg-white p-4 shadow-[0_22px_70px_rgba(40,61,49,0.16)] md:p-5"
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.85fr_1fr_auto]">
          <BookingField label="Ngày nhận phòng">
            <input
              type="date"
              name="checkin"
              defaultValue={toDateInputValue(0)}
              className="booking-control"
            />
          </BookingField>

          <BookingField label="Ngày trả phòng">
            <input
              type="date"
              name="checkout"
              defaultValue={toDateInputValue(1)}
              className="booking-control"
            />
          </BookingField>

          <BookingField label="Số khách">
            <select name="guests" defaultValue="2 khách" className="booking-control">
              {bookingDefaults.guests.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </BookingField>

          <BookingField label="Loại phòng">
            <select
              name="roomType"
              defaultValue={rooms[0].name}
              className="booking-control"
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
              {bookingDefaults.roomTypes.slice(3).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </BookingField>

          <div className="flex items-end">
            <button
              type="submit"
              className="min-h-12 w-full rounded-full bg-moss px-7 text-base font-bold text-white shadow-[0_14px_30px_rgba(37,77,58,0.22)] transition-colors hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:min-h-14 lg:w-auto"
            >
              Kiểm tra phòng
            </button>
          </div>
        </div>

        <p className="mt-4 rounded-md bg-ivory px-4 py-3 text-sm leading-6 text-olive">
          Đây là form kiểm tra nhanh. Khách sạn sẽ xác nhận phòng trống và giá
          chính xác qua điện thoại hoặc Zalo.
        </p>
      </form>
    </section>
  );
}

function BookingField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-bold uppercase tracking-[0.12em] text-gold">
        {label}
      </span>
      {children}
    </label>
  );
}
