import Link from "next/link";
import { redirect } from "next/navigation";
import AvailabilityEditor from "@/components/admin/AvailabilityEditor";
import { createClient } from "@/lib/supabase/server";

type RoomType = {
  id: string;
  name: string;
  code: string | null;
};

export default async function AdminAvailabilityPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("room_types")
    .select("id, name, code")
    .order("name", { ascending: true });

  const roomTypes = (data ?? []) as RoomType[];

  return (
    <main className="min-h-screen bg-ivory p-4 text-moss sm:p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow">Admin</p>
            <h1 className="mt-2 text-3xl font-bold">Còn/hết phòng</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-olive">
              Cập nhật số phòng còn theo ngày để lễ tân dễ theo dõi và xử lý
              booking mới.
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
              href="/admin/bookings"
              className="inline-flex min-h-11 items-center rounded-full bg-moss px-5 text-sm font-bold text-white"
            >
              Đặt phòng
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            Không tải được danh sách loại phòng. Vui lòng thử lại sau.
          </div>
        )}

        <div className="mt-8">
          <AvailabilityEditor roomTypes={roomTypes} />
        </div>
      </div>
    </main>
  );
}
