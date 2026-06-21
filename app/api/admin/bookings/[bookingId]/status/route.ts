import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

const allowedStatuses = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
  "checked_in",
  "checked_out",
  "no_show",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  try {
    const admin = await requireAdmin({ redirectTo: false });

    if (!admin.isAdmin) {
      return NextResponse.json(
        { message: admin.message },
        { status: admin.status },
      );
    }

    const { bookingId } = await params;
    const body = await request.json();
    const status = String(body.status ?? "");

    if (!bookingId) {
      return NextResponse.json(
        { message: "Thiếu mã đặt phòng." },
        { status: 400 },
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Trạng thái không hợp lệ." },
        { status: 400 },
      );
    }

    const { error } = await admin.supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      console.error("Could not update booking status", error);

      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Đã cập nhật trạng thái." });
  } catch (error) {
    console.error("Unexpected booking status API error", error);

    return NextResponse.json(
      { message: "Có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
