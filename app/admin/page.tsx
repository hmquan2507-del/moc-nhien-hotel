import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { count: newCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  const { count: contactedCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "contacted");

  const { count: confirmedCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "confirmed");

  return (
    <main className="min-h-screen bg-ivory p-4 text-moss sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow">Admin</p>
            <h1 className="mt-2 text-3xl font-bold">Quản lý Mộc Nhiên Hotel</h1>
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

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Booking mới" value={newCount ?? 0} />
          <StatCard label="Đã liên hệ" value={contactedCount ?? 0} />
          <StatCard label="Đã xác nhận" value={confirmedCount ?? 0} />
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
