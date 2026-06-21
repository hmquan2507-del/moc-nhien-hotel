import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type AvailabilityRequestBody = {
  roomTypeId?: unknown;
  date?: unknown;
  availableRooms?: unknown;
};

function readString(value: unknown) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function isValidDateValue(value: string) {
  return value !== "" && !Number.isNaN(new Date(value).getTime());
}

export async function POST(request: Request) {
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

    const body = (await request.json()) as AvailabilityRequestBody;
    const roomTypeId = readString(body.roomTypeId);
    const date = readString(body.date);
    const availableRooms = Number(body.availableRooms ?? 0);

    if (!roomTypeId || !isValidDateValue(date)) {
      return NextResponse.json(
        { message: "Thiếu thông tin phòng hoặc ngày." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(availableRooms) || availableRooms < 0) {
      return NextResponse.json(
        { message: "Số phòng còn không hợp lệ." },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("availability_overrides").upsert(
      {
        room_type_id: roomTypeId,
        date,
        available_rooms: availableRooms,
      },
      {
        onConflict: "room_type_id,date",
      },
    );

    if (error) {
      console.error("Could not update availability", error);
      return NextResponse.json(
        { message: "Không lưu được tình trạng phòng." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Đã lưu tình trạng phòng." });
  } catch (error) {
    console.error("Unexpected availability API error", error);
    return NextResponse.json(
      { message: "Có lỗi xảy ra. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
