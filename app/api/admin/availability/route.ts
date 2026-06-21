import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();

  const roomTypeId = String(body.roomTypeId ?? "");
  const date = String(body.date ?? "");
  const availableRooms = Number(body.availableRooms ?? 0);

  if (!roomTypeId || !date) {
    return NextResponse.json(
      { message: "Thiếu thông tin phòng hoặc ngày." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(availableRooms) || availableRooms < 0) {
    return NextResponse.json(
      { message: "Số phòng còn không hợp lệ." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.from("availability_overrides").upsert(
    {
      room_type_id: roomTypeId,
      date,
      available_rooms: availableRooms,
    },
    {
      onConflict: "room_type_id,date",
    }
  );

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Không lưu được tình trạng phòng." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Đã lưu tình trạng phòng." });
}