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
  const { bookingId } = await params;
  const body = await request.json();
  const status = String(body.status ?? "");

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { message: "Trạng thái không hợp lệ." },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId);

  if (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Không cập nhật được trạng thái." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Đã cập nhật trạng thái." });
}
