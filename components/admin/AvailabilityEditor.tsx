"use client";

import { useState } from "react";

type RoomTypeOption = {
  id: string;
  name: string;
  code: string | null;
};

function getTodayValue() {
  return new Date().toISOString().slice(0, 10);
}

export default function AvailabilityEditor({
  roomTypes,
}: {
  roomTypes: RoomTypeOption[];
}) {
  const [roomTypeId, setRoomTypeId] = useState(roomTypes[0]?.id ?? "");
  const [date, setDate] = useState(getTodayValue());
  const [availableRooms, setAvailableRooms] = useState("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!roomTypeId || !date) {
      setErrorMessage("Vui lòng chọn loại phòng và ngày.");
      return;
    }

    const parsedAvailableRooms = Number(availableRooms);

    if (!Number.isFinite(parsedAvailableRooms) || parsedAvailableRooms < 0) {
      setErrorMessage("Số phòng còn phải là số lớn hơn hoặc bằng 0.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomTypeId,
          date,
          availableRooms: parsedAvailableRooms,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok) {
        setErrorMessage(
          result.message ?? "Không lưu được tình trạng phòng. Vui lòng thử lại.",
        );
        return;
      }

      setMessage(result.message ?? "Đã lưu tình trạng phòng.");
    } catch {
      setErrorMessage("Có lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  if (roomTypes.length === 0) {
    return (
      <div className="rounded-2xl border border-moss/10 bg-white p-6 text-sm font-semibold text-olive shadow-sm">
        Chưa có loại phòng trong Supabase.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-moss/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_0.7fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-moss">
            Loại phòng
          </span>
          <select
            value={roomTypeId}
            onChange={(event) => setRoomTypeId(event.target.value)}
            className="booking-input"
          >
            {roomTypes.map((roomType) => (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name}
                {roomType.code ? ` (${roomType.code})` : ""}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-moss">Ngày</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="booking-input"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold text-moss">
            Số phòng còn
          </span>
          <input
            type="number"
            min={0}
            value={availableRooms}
            onChange={(event) => setAvailableRooms(event.target.value)}
            className="booking-input"
          />
        </label>
      </div>

      {message && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {message}
        </p>
      )}

      {errorMessage && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-moss px-6 text-base font-bold text-white shadow-sm transition hover:bg-forest disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {loading ? "Đang lưu..." : "Lưu tình trạng phòng"}
      </button>
    </form>
  );
}
