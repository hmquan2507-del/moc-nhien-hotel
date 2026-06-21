import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "Vui lòng đăng nhập admin." },
        { status: 401 },
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

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      console.error("Could not update booking status", error);

      return NextResponse.json(
        { message: "Không cập nhật được trạng thái." },
        { status: 500 },
      );
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
