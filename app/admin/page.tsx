import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminPage() {
  const { supabase } = await requireAdmin();

  const [newResult, contactedResult, confirmedResult] = await Promise.all([
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "contacted"),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed"),
  ]);

  if (newResult.error) {
    console.error("Could not load new bookings count", newResult.error);
  }

  if (contactedResult.error) {
    console.error(
      "Could not load contacted bookings count",
      contactedResult.error,
    );
  }

  if (confirmedResult.error) {
    console.error(
      "Could not load confirmed bookings count",
      confirmedResult.error,
    );
  }

  const errorMessages = [
    newResult.error?.message,
    contactedResult.error?.message,
    confirmedResult.error?.message,
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-ivory p-4 text-moss sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow">Admin</p>
            <h1 className="mt-2 text-3xl font-bold">
              Quản lý Mộc Nhiên Hotel
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/bookings"
              className="rounded-full bg-moss px-5 py-3 text-sm font-bold text-white"
            >
              Xem đặt phòng
            </Link>
            <Link
              href="/admin/availability"
              className="rounded-full border border-moss/10 bg-white px-5 py-3 text-sm font-bold text-moss"
            >
              Còn/hết phòng
            </Link>
          </div>
        </div>

        {errorMessages.length > 0 && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Không tải được thống kê: {errorMessages.join(" | ")}
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Booking mới" value={newResult.count ?? 0} />
          <StatCard label="Đã liên hệ" value={contactedResult.count ?? 0} />
          <StatCard label="Đã xác nhận" value={confirmedResult.count ?? 0} />
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-moss/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-olive">{label}</p>
      <p className="mt-3 text-4xl font-extrabold text-moss">{value}</p>
    </div>
  );
}
