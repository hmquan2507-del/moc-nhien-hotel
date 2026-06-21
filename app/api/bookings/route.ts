import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const successMessage =
  "Cảm ơn anh/chị. Mộc Nhiên Hotel đã nhận yêu cầu đặt phòng và sẽ liên hệ xác nhận sớm.";

type BookingRequestBody = {
  guestName?: unknown;
  guestPhone?: unknown;
  guestEmail?: unknown;
  roomTypeCode?: unknown;
  roomTypeName?: unknown;
  checkIn?: unknown;
  checkOut?: unknown;
  checkinTime?: unknown;
  guests?: unknown;
  duration?: unknown;
  customerNote?: unknown;
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

function readNullableString(value: unknown) {
  const text = readString(value);
  return text ? text : null;
}

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "").trim();
}

function isValidDateValue(value: string) {
  return value !== "" && !Number.isNaN(new Date(value).getTime());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingRequestBody;

    const guestName = readString(body.guestName);
    const guestPhone = normalizePhone(readString(body.guestPhone));
    const guestEmail = readNullableString(body.guestEmail);
    const roomTypeCode = readString(body.roomTypeCode);
    const roomTypeName = readNullableString(body.roomTypeName);
    const checkIn = readString(body.checkIn);
    const checkOut = readString(body.checkOut);
    const checkinTime = readNullableString(body.checkinTime);
    const guests = Number(body.guests ?? 0);
    const duration = readNullableString(body.duration);
    const customerNote = readNullableString(body.customerNote);

    if (!guestName) {
      return NextResponse.json(
        { message: "Vui lòng nhập họ tên." },
        { status: 400 },
      );
    }

    if (!guestPhone) {
      return NextResponse.json(
        { message: "Vui lòng nhập số điện thoại." },
        { status: 400 },
      );
    }

    if (!isValidDateValue(checkIn) || !isValidDateValue(checkOut)) {
      return NextResponse.json(
        { message: "Vui lòng chọn ngày nhận và ngày trả phòng." },
        { status: 400 },
      );
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return NextResponse.json(
        { message: "Ngày trả phòng phải sau ngày nhận phòng." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(guests) || guests < 1) {
      return NextResponse.json(
        { message: "Số khách không hợp lệ." },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    let roomTypeId: string | null = null;
    let resolvedRoomTypeName = roomTypeName;

    if (roomTypeCode) {
      const { data: roomType, error: roomTypeError } = await supabase
        .from("room_types")
        .select("id, name, code")
        .eq("code", roomTypeCode)
        .maybeSingle();

      if (roomTypeError) {
        console.error("Could not resolve room type code", roomTypeError);
      }

      if (roomType) {
        roomTypeId = typeof roomType.id === "string" ? roomType.id : null;
        resolvedRoomTypeName =
          typeof roomType.name === "string" && roomType.name.trim()
            ? roomType.name
            : roomTypeName;
      }
    }

    const { error } = await supabase.from("bookings").insert({
      guest_name: guestName,
      guest_phone: guestPhone,
      guest_email: guestEmail,
      room_type_id: roomTypeId,
      room_type_name: resolvedRoomTypeName,
      check_in: checkIn,
      check_out: checkOut,
      checkin_time: checkinTime,
      guests,
      duration,
      customer_note: customerNote,
      status: "new",
      source: "website",
    });

    if (error) {
      console.error("Could not create booking", error);

      return NextResponse.json(
        {
          message:
            "Chưa gửi được yêu cầu đặt phòng. Vui lòng thử lại hoặc nhắn Zalo để được hỗ trợ.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: successMessage });
  } catch (error) {
    console.error("Unexpected booking API error", error);

    return NextResponse.json(
      { message: "Có lỗi xảy ra. Vui lòng thử lại hoặc nhắn Zalo để được hỗ trợ." },
      { status: 500 },
    );
  }
}
