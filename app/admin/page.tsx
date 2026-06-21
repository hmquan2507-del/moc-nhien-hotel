"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice, rooms } from "@/data/site";

type BookingStatus = "new" | "contacted" | "confirmed" | "cancelled";

type Booking = {
  id: string;
  customerName: string;
  phone: string;
  roomName: string;
  duration: string;
  checkin: string;
  price: number;
  status: BookingStatus;
  note: string;
  createdAt: string;
};

const statusLabels: Record<BookingStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
};

const statusStyles: Record<BookingStatus, string> = {
  new: "bg-amber-50 text-amber-700 ring-amber-200",
  contacted: "bg-sky-50 text-sky-700 ring-sky-200",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

const initialBookings: Booking[] = [
  {
    id: "MN-2401",
    customerName: "Nguyễn Minh Anh",
    phone: "0768414111",
    roomName: "Phòng Tiêu Chuẩn",
    duration: "2 giờ",
    checkin: "Hôm nay • 15:30",
    price: 129000,
    status: "new",
    note: "Khách cần phòng yên tĩnh, nhận phòng sớm.",
    createdAt: "15 phút trước",
  },
  {
    id: "MN-2402",
    customerName: "Trần Quốc Huy",
    phone: "0905123456",
    roomName: "Phòng Đôi Tiện Nghi",
    duration: "Qua đêm",
    checkin: "Hôm nay • 21:00",
    price: 260000,
    status: "contacted",
    note: "Khách hỏi còn phòng và chỗ đậu xe.",
    createdAt: "38 phút trước",
  },
  {
    id: "MN-2403",
    customerName: "Lê Phương Thảo",
    phone: "0912345678",
    roomName: "Phòng Gia Đình",
    duration: "Ngày đêm",
    checkin: "Ngày mai • 14:00",
    price: 450000,
    status: "confirmed",
    note: "Gia đình 3 người, cần phòng rộng.",
    createdAt: "1 giờ trước",
  },
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeStatus, setActiveStatus] = useState<"all" | BookingStatus>(
    "all",
  );

  const filteredBookings = useMemo(() => {
    if (activeStatus === "all") return bookings;
    return bookings.filter((booking) => booking.status === activeStatus);
  }, [bookings, activeStatus]);

  const totalRevenue = bookings
    .filter((booking) => booking.status === "confirmed")
    .reduce((total, booking) => total + booking.price, 0);

  const newBookingCount = bookings.filter(
    (booking) => booking.status === "new",
  ).length;

  const confirmedBookingCount = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  const totalAvailableRooms = rooms.reduce(
    (total, room) => total + room.available,
    0,
  );

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.trim() === "admin123") {
      setIsLoggedIn(true);
      return;
    }

    alert("Mật khẩu demo là: admin123");
  }

  function updateBookingStatus(bookingId: string, status: BookingStatus) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking,
      ),
    );
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#0D2F28]">
      <div className="grid min-h-screen xl:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <section className="min-w-0">
          <AdminTopbar onLogout={() => setIsLoggedIn(false)} />

          <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-[#0D2F28]/10 bg-[#0D2F28] p-6 text-white shadow-sm md:p-8">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4A24C]">
                    Hotel Management
                  </p>

                  <h1 className="mt-3 font-luxury text-4xl font-black leading-tight md:text-5xl">
                    Dashboard quản lý đặt phòng
                  </h1>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
                    Theo dõi yêu cầu đặt phòng, gọi lại cho khách, đổi trạng
                    thái xử lý và kiểm tra tình trạng phòng trong một giao diện
                    quản lý tập trung.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 text-sm font-black text-white backdrop-blur transition hover:bg-white/15"
                  >
                    Xem website
                  </Link>

                  <button className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4A24C] px-5 text-sm font-black text-[#0D2F28] transition hover:bg-[#E1B865]">
                    + Thêm booking
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Yêu cầu mới"
                value={String(newBookingCount)}
                desc="Cần lễ tân gọi lại"
                trend="Cần xử lý"
              />
              <MetricCard
                label="Đã xác nhận"
                value={String(confirmedBookingCount)}
                desc="Booking đã chốt"
                trend="Ổn định"
              />
              <MetricCard
                label="Doanh thu tạm tính"
                value={formatPrice(totalRevenue)}
                desc="Từ booking đã xác nhận"
                trend="Hôm nay"
              />
              <MetricCard
                label="Phòng còn trống"
                value={String(totalAvailableRooms)}
                desc="Theo dữ liệu hiện tại"
                trend={`${rooms.length} loại phòng`}
              />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
              <section className="min-w-0 rounded-[2rem] border border-[#0D2F28]/10 bg-white p-4 shadow-sm md:p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D4A24C]">
                      Booking requests
                    </p>

                    <h2 className="mt-2 font-luxury text-3xl font-black">
                      Yêu cầu đặt phòng
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#6C7B75]">
                      Danh sách khách vừa gửi yêu cầu từ website. Lễ tân có thể
                      gọi lại, nhắn Zalo và cập nhật trạng thái.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <FilterButton
                      label="Tất cả"
                      active={activeStatus === "all"}
                      onClick={() => setActiveStatus("all")}
                    />
                    <FilterButton
                      label="Mới"
                      active={activeStatus === "new"}
                      onClick={() => setActiveStatus("new")}
                    />
                    <FilterButton
                      label="Đã liên hệ"
                      active={activeStatus === "contacted"}
                      onClick={() => setActiveStatus("contacted")}
                    />
                    <FilterButton
                      label="Đã xác nhận"
                      active={activeStatus === "confirmed"}
                      onClick={() => setActiveStatus("confirmed")}
                    />
                  </div>
                </div>

                <div className="mt-6 hidden overflow-hidden rounded-3xl border border-[#0D2F28]/10 lg:block">
                  <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr_0.7fr_0.85fr] bg-[#F7F3EA] px-5 py-4 text-xs font-black uppercase tracking-[0.12em] text-[#6C7B75]">
                    <div>Khách hàng</div>
                    <div>Thông tin phòng</div>
                    <div>Nhận phòng</div>
                    <div>Giá</div>
                    <div className="text-right">Thao tác</div>
                  </div>

                  <div className="divide-y divide-[#0D2F28]/10">
                    {filteredBookings.map((booking) => (
                      <BookingRow
                        key={booking.id}
                        booking={booking}
                        onChangeStatus={updateBookingStatus}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:hidden">
                  {filteredBookings.map((booking) => (
                    <BookingMobileCard
                      key={booking.id}
                      booking={booking}
                      onChangeStatus={updateBookingStatus}
                    />
                  ))}
                </div>
              </section>

              <aside className="grid gap-5">
                <section className="rounded-[2rem] border border-[#0D2F28]/10 bg-white p-4 shadow-sm md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D4A24C]">
                        Rooms
                      </p>

                      <h2 className="mt-2 font-luxury text-3xl font-black">
                        Tình trạng phòng
                      </h2>
                    </div>

                    <button className="rounded-full border border-[#0D2F28]/10 bg-white px-4 py-2 text-xs font-black transition hover:border-[#D4A24C] hover:bg-[#FFF8E8]">
                      Cập nhật
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4">
                    {rooms.map((room) => (
                      <RoomStatusCard key={room.id} room={room} />
                    ))}
                  </div>
                </section>

                <section className="overflow-hidden rounded-[2rem] border border-[#0D2F28]/10 bg-white shadow-sm">
                  <div className="bg-[#0D2F28] p-5 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D4A24C]">
                      Next step
                    </p>
                    <h2 className="mt-2 font-luxury text-3xl font-black">
                      Bản chính thức
                    </h2>
                  </div>

                  <div className="grid gap-3 p-5 text-sm leading-7 text-[#6C7B75]">
                    <p>• Lưu booking thật vào Supabase.</p>
                    <p>• Thêm/sửa/xóa phòng, ảnh và bảng giá.</p>
                    <p>• Đổi trạng thái booking theo quy trình lễ tân.</p>
                    <p>• Lọc booking theo ngày, loại phòng và trạng thái.</p>
                    <p>• Báo cáo doanh thu cơ bản cho khách sạn.</p>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function LoginScreen({
  password,
  setPassword,
  onSubmit,
}: {
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-10 text-[#0D2F28]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2rem] border border-[#0D2F28]/10 bg-white shadow-sm">
          <div className="bg-[#0D2F28] px-6 py-9 text-center text-white">
            <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white">
              <img
                src="/images/hotel/logo.png"
                alt="Mộc Nhiên Hotel"
                className="h-full w-full object-contain p-2"
              />
            </div>

            <h1 className="mt-5 font-luxury text-3xl font-black">
              Admin Mộc Nhiên Hotel
            </h1>

            <p className="mt-3 text-sm leading-7 text-white/70">
              Đăng nhập để quản lý booking, phòng và dữ liệu vận hành.
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-4 p-6 md:p-8">
            <div>
              <label className="mb-2 block text-sm font-black">
                Mật khẩu admin
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Nhập: admin123"
                className="h-14 w-full rounded-2xl border border-[#0D2F28]/10 bg-[#F7F3EA] px-4 text-base font-bold outline-none transition placeholder:text-[#7C8A84] focus:border-[#D4A24C]"
              />
            </div>

            <button
              type="submit"
              className="h-14 rounded-full bg-[#0D2F28] px-6 text-base font-black text-white shadow-sm transition hover:bg-[#1B5A49]"
            >
              Đăng nhập admin
            </button>

            <Link
              href="/"
              className="rounded-full border border-[#0D2F28]/10 bg-white px-6 py-4 text-center text-sm font-black transition hover:border-[#D4A24C] hover:bg-[#FFF8E8]"
            >
              Quay về website
            </Link>

            <p className="text-center text-xs leading-6 text-[#6C7B75]">
              Mật khẩu demo: <span className="font-black">admin123</span>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

function AdminSidebar() {
  const items = ["Tổng quan", "Booking", "Phòng", "Khách hàng", "Báo cáo"];

  return (
    <aside className="hidden bg-[#0D2F28] text-white xl:block">
      <div className="sticky top-0 flex h-screen flex-col px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white">
            <img
              src="/images/hotel/logo.png"
              alt="Mộc Nhiên Hotel"
              className="h-full w-full object-contain p-1.5"
            />
          </div>

          <div>
            <p className="font-luxury text-xl font-black leading-none">
              Mộc Nhiên
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
              Hotel Admin
            </p>
          </div>
        </div>

        <nav className="mt-8 grid gap-2">
          {items.map((item, index) => (
            <button
              key={item}
              className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                index === 0
                  ? "bg-white text-[#0D2F28]"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
          <p className="text-sm font-black">Admin demo</p>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Bản chính thức sẽ có đăng nhập thật, dữ liệu thật và phân quyền cho
            lễ tân/quản lý.
          </p>
        </div>
      </div>
    </aside>
  );
}

function AdminTopbar({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#0D2F28]/10 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 xl:hidden">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#0D2F28]/10 bg-white shadow-sm">
            <img
              src="/images/hotel/logo.png"
              alt="Mộc Nhiên Hotel"
              className="h-full w-full object-contain p-1.5"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate font-luxury text-xl font-black">
              Admin Hotel
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C7B75]">
              Quản lý booking
            </p>
          </div>
        </div>

        <div className="hidden xl:block">
          <p className="text-sm font-bold text-[#6C7B75]">
            Xin chào, quản lý Mộc Nhiên Hotel
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-full border border-[#0D2F28]/10 bg-white px-5 py-3 text-sm font-black transition hover:border-[#D4A24C] hover:bg-[#FFF8E8] sm:inline-flex"
          >
            Xem website
          </Link>

          <button
            onClick={onLogout}
            className="rounded-full bg-[#0D2F28] px-5 py-3 text-sm font-black text-white transition hover:bg-[#1B5A49]"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}

function MetricCard({
  label,
  value,
  desc,
  trend,
}: {
  label: string;
  value: string;
  desc: string;
  trend: string;
}) {
  return (
    <article className="rounded-[1.75rem] border border-[#0D2F28]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[#6C7B75]">{label}</p>
          <p className="mt-3 font-luxury text-3xl font-black leading-none text-[#0D2F28]">
            {value}
          </p>
        </div>

        <span className="rounded-full bg-[#FFF3D8] px-3 py-1 text-xs font-black text-[#946A1D]">
          {trend}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#6C7B75]">{desc}</p>
    </article>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-10 rounded-full px-4 text-sm font-black transition ${
        active
          ? "bg-[#0D2F28] text-white"
          : "border border-[#0D2F28]/10 bg-white text-[#0D2F28] hover:bg-[#FFF8E8]"
      }`}
    >
      {label}
    </button>
  );
}

function BookingRow({
  booking,
  onChangeStatus,
}: {
  booking: Booking;
  onChangeStatus: (bookingId: string, status: BookingStatus) => void;
}) {
  return (
    <div className="grid grid-cols-[1.1fr_0.9fr_0.8fr_0.7fr_0.85fr] items-center gap-4 bg-white px-5 py-5 transition hover:bg-[#FFFCF5]">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-black text-[#6C7B75]">{booking.id}</p>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${
              statusStyles[booking.status]
            }`}
          >
            {statusLabels[booking.status]}
          </span>
        </div>

        <p className="mt-2 truncate text-base font-black text-[#0D2F28]">
          {booking.customerName}
        </p>

        <p className="mt-1 text-sm text-[#6C7B75]">{booking.phone}</p>
      </div>

      <div className="text-sm leading-6">
        <p className="font-black text-[#0D2F28]">{booking.roomName}</p>
        <p className="text-[#6C7B75]">{booking.duration}</p>
      </div>

      <div className="text-sm leading-6">
        <p className="font-black text-[#0D2F28]">{booking.checkin}</p>
        <p className="text-[#6C7B75]">{booking.createdAt}</p>
      </div>

      <div className="text-sm font-black text-[#0D2F28]">
        {formatPrice(booking.price)}
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <a
            href={`tel:${booking.phone}`}
            className="rounded-full bg-[#0D2F28] px-4 py-2 text-xs font-black text-white transition hover:bg-[#1B5A49]"
          >
            Gọi
          </a>

          <a
            href={`https://zalo.me/${booking.phone}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#0D2F28]/10 bg-white px-4 py-2 text-xs font-black text-[#0D2F28] transition hover:bg-[#FFF8E8]"
          >
            Zalo
          </a>
        </div>

        <select
          value={booking.status}
          onChange={(event) =>
            onChangeStatus(booking.id, event.target.value as BookingStatus)
          }
          className="h-9 w-36 cursor-pointer rounded-full border border-[#0D2F28]/10 bg-white px-3 text-xs font-black outline-none"
        >
          <option value="new">Mới</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>
    </div>
  );
}

function BookingMobileCard({
  booking,
  onChangeStatus,
}: {
  booking: Booking;
  onChangeStatus: (bookingId: string, status: BookingStatus) => void;
}) {
  return (
    <article className="rounded-[1.5rem] border border-[#0D2F28]/10 bg-[#FFFCF5] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-black text-[#6C7B75]">{booking.id}</p>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-black ring-1 ${
            statusStyles[booking.status]
          }`}
        >
          {statusLabels[booking.status]}
        </span>
      </div>

      <h3 className="mt-2 text-xl font-black">{booking.customerName}</h3>

      <div className="mt-4 grid gap-2 text-sm leading-6 text-[#6C7B75]">
        <InfoLine label="SĐT" value={booking.phone} />
        <InfoLine label="Phòng" value={booking.roomName} />
        <InfoLine label="Thời lượng" value={booking.duration} />
        <InfoLine label="Nhận phòng" value={booking.checkin} />
        <InfoLine label="Giá" value={formatPrice(booking.price)} />
      </div>

      <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-[#6C7B75]">
        {booking.note}
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <a
          href={`tel:${booking.phone}`}
          className="rounded-full bg-[#0D2F28] px-4 py-3 text-center text-sm font-black text-white"
        >
          Gọi khách
        </a>

        <a
          href={`https://zalo.me/${booking.phone}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#0D2F28]/10 bg-white px-4 py-3 text-center text-sm font-black"
        >
          Nhắn Zalo
        </a>

        <select
          value={booking.status}
          onChange={(event) =>
            onChangeStatus(booking.id, event.target.value as BookingStatus)
          }
          className="h-12 rounded-full border border-[#0D2F28]/10 bg-white px-4 text-sm font-black outline-none"
        >
          <option value="new">Mới</option>
          <option value="contacted">Đã liên hệ</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>
    </article>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="font-black text-[#0D2F28]">{label}:</span> {value}
    </p>
  );
}

function RoomStatusCard({ room }: { room: (typeof rooms)[number] }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#0D2F28]/10 bg-[#FFFCF5]">
      <div className="flex gap-4 p-3">
        <div
          className="h-28 w-32 shrink-0 rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url('${room.image}')` }}
        />

        <div className="min-w-0 flex-1 py-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-black text-[#0D2F28]">
                {room.name}
              </h3>

              <p className="mt-1 text-sm text-[#6C7B75]">
                Còn {room.available} phòng
              </p>
            </div>

            <p className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#0D2F28]">
              {formatPrice(room.prices["2h"])}
            </p>
          </div>

          <button className="mt-4 h-10 w-full rounded-full bg-white text-sm font-black transition hover:bg-[#FFF8E8]">
            Cập nhật phòng
          </button>
        </div>
      </div>
    </article>
  );
}
