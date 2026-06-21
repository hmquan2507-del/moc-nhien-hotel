import type { ReactNode } from "react";
import { bookingDefaults } from "@/data/site";

const guestOptions = [
  { value: "1", label: bookingDefaults.guests[0] ?? "1 khách" },
  { value: "2", label: bookingDefaults.guests[1] ?? "2 khách" },
  { value: "3", label: bookingDefaults.guests[2] ?? "3 khách" },
  { value: "4", label: bookingDefaults.guests[3] ?? "4 khách" },
  { value: "5", label: bookingDefaults.guests[4] ?? "Gia đình / nhóm" },
];

function toDateInputValue(offsetDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);

  return date.toISOString().slice(0, 10);
}

export default function BookingBar() {
  const controlClass =
    "h-13 w-full rounded-xl border border-moss/15 bg-ivory/60 px-4 text-[15px] font-semibold text-moss shadow-sm outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 sm:text-base lg:h-14";

  return (
    <section
      id="booking"
      className="relative z-20 bg-ivory px-4 pb-10 pt-5 sm:px-6 md:-mt-14 md:bg-transparent md:pb-16 md:pt-0 lg:px-8"
    >
      <form
        action="/booking"
        className="mx-auto max-w-5xl rounded-2xl border border-moss/10 bg-white/95 p-4 shadow-[0_24px_70px_rgba(40,61,49,0.14)] backdrop-blur md:p-5 lg:rounded-[26px]"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.85fr_auto] lg:items-end">
          <BookingField label="Ngày nhận phòng">
            <input
              type="date"
              name="checkin"
              defaultValue={toDateInputValue(0)}
              className={controlClass}
            />
          </BookingField>

          <BookingField label="Ngày trả phòng">
            <input
              type="date"
              name="checkout"
              defaultValue={toDateInputValue(1)}
              className={controlClass}
            />
          </BookingField>

          <BookingField label="Số khách">
            <select name="guests" defaultValue="2" className={controlClass}>
              {guestOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </BookingField>

          <button
            type="submit"
            className="h-13 w-full rounded-xl bg-moss px-8 text-[15px] font-bold text-white shadow-[0_16px_32px_rgba(37,77,58,0.22)] transition hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:h-14 lg:min-w-[168px] lg:rounded-full"
          >
            Kiểm tra phòng
          </button>
        </div>
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
