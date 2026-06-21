import Link from "next/link";
import BookingStatusActions from "@/components/admin/BookingStatusActions";
import { requireAdmin } from "@/lib/admin";

type Booking = {
  id: string;
  created_at: string | null;
  guest_name: string | null;
  guest_phone: string | null;
  guest_email: string | null;
  room_type_name: string | null;
  room_types:
    | {
        name: string | null;
        code: string | null;
      }
    | {
        name: string | null;
        code: string | null;
      }[]
    | null;
  check_in: string | null;
  check_out: string | null;
  checkin_time: string | null;
  guests: number | null;
  duration: string | null;
  customer_note: string | null;
  status: string | null;
  source: string | null;
};

const statusLabels: Record<string, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
  checked_in: "Đã nhận phòng",
  checked_out: "Đã trả phòng",
  no_show: "Không đến",
};

const durationLabels: Record<string, string> = {
  "2h": "2 giờ",
  "3h": "3 giờ",
  overnight: "Qua đêm",
  day: "Ngày đêm",
};

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("vi-VN").format(new Date(value));
}

function formatCreatedAt(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function getRoomTypeName(booking: Booking) {
  const roomType = Array.isArray(booking.room_types)
    ? booking.room_types[0]
    : booking.room_types;

  return (
    booking.room_type_name ||
    roomType?.name ||
    roomType?.code ||
    "-"
  );
}

export default async function AdminBookingsPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, guest_name, guest_phone, guest_email, room_type_name, room_types(name, code), check_in, check_out, checkin_time, guests, duration, customer_note, status, source",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Could not load bookings", error);
  }

  const bookings = (data ?? []) as Booking[];

  return (
    <main className="min-h-screen bg-ivory p-4 text-moss sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow">Admin</p>
            <h1 className="mt-2 text-3xl font-bold">Danh sách đặt phòng</h1>
            <p className="mt-2 text-sm leading-6 text-olive">
              Theo dõi yêu cầu mới từ website và cập nhật trạng thái xử lý.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="inline-flex min-h-11 items-center rounded-full border border-moss/10 bg-white px-5 text-sm font-bold text-moss"
            >
              Tổng quan
            </Link>
            <Link
              href="/admin/availability"
              className="inline-flex min-h-11 items-center rounded-full bg-moss px-5 text-sm font-bold text-white"
            >
              Còn/hết phòng
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Không tải được danh sách đặt phòng: {error.message}
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {bookings.length === 0 && !error && (
            <div className="rounded-2xl border border-moss/10 bg-white p-6 text-sm font-semibold text-olive shadow-sm">
              Chưa có yêu cầu đặt phòng nào.
            </div>
          )}

          {bookings.map((booking) => {
            const status = booking.status ?? "new";
            const duration = booking.duration
              ? durationLabels[booking.duration] ?? booking.duration
              : "-";

            return (
              <article
                key={booking.id}
                className="rounded-2xl border border-moss/10 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-moss">
                        {booking.guest_name ?? "Khách đặt phòng"}
                      </h2>
                      <span className="rounded-full bg-ivory px-3 py-1 text-xs font-bold text-moss">
                        {statusLabels[status] ?? status}
                      </span>
                      <span className="rounded-full bg-softbeige px-3 py-1 text-xs font-bold text-olive">
                        {booking.source ?? "website"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-olive">
                      Gửi lúc {formatCreatedAt(booking.created_at)}
                    </p>
                  </div>

                  <BookingStatusActions
                    bookingId={booking.id}
                    currentStatus={status}
                    guestPhone={booking.guest_phone}
                  />
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  <Info label="Số điện thoại" value={booking.guest_phone} />
                  <Info label="Email" value={booking.guest_email} />
                  <Info label="Loại phòng" value={getRoomTypeName(booking)} />
                  <Info label="Số khách" value={String(booking.guests ?? "-")} />
                  <Info label="Ngày nhận" value={formatDate(booking.check_in)} />
                  <Info label="Ngày trả" value={formatDate(booking.check_out)} />
                  <Info label="Giờ nhận" value={booking.checkin_time} />
                  <Info label="Gói lưu trú" value={duration} />
                </div>

                {booking.customer_note && (
                  <div className="mt-4 rounded-xl bg-ivory p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-gold">
                      Ghi chú khách
                    </p>
                    <p className="mt-2 text-sm leading-6 text-olive">
                      {booking.customer_note}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-xl bg-ivory px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-moss">
        {value || "-"}
      </p>
    </div>
  );
}
