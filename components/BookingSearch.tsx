import { DurationKey, durationOptions } from "@/data/site";

function getTodayDisplayValue() {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}

export default function BookingSearch({ duration }: { duration: DurationKey }) {
  const today = getTodayDisplayValue();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 md:px-8">
      <form
        action="/#rooms"
        className="rounded-[1.5rem] border border-navy/10 bg-white p-4 shadow-soft md:rounded-[2rem] md:p-5"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_0.8fr_0.9fr_auto]">
          <div>
            <label className="mb-2 block text-sm font-black text-navy">
              Ngày nhận
            </label>

            <input
              type="text"
              name="checkinDate"
              inputMode="numeric"
              defaultValue={today}
              placeholder="dd/mm/yyyy"
              className="h-14 w-full rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition placeholder:text-muted focus:border-champagne"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black text-navy">
              Thời lượng
            </label>

            <select
              name="duration"
              defaultValue={duration}
              className="h-14 w-full cursor-pointer rounded-2xl border border-navy/10 bg-cream px-4 text-base font-bold text-navy outline-none transition focus:border-champagne"
            >
              {durationOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="h-14 w-full cursor-pointer rounded-2xl bg-navy px-6 text-center text-base font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-leaf active:scale-95 md:w-auto"
            >
              Tìm phòng
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-cream px-4 py-3">
          <p className="text-sm leading-6 text-muted">
            Chọn ngày, giờ nhận phòng và thời lượng lưu trú để xem giá phòng phù
            hợp. Giá và tình trạng phòng có thể thay đổi theo thời điểm.
          </p>
        </div>
      </form>
    </section>
  );
}
