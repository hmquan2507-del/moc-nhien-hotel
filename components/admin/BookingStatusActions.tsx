"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = [
  { value: "contacted", label: "Đã liên hệ" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "cancelled", label: "Đã hủy" },
];

export default function BookingStatusActions({
  bookingId,
}: {
  bookingId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState("");

  async function updateStatus(status: string) {
    setLoading(status);

    await fetch(`/api/admin/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setLoading("");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => updateStatus(item.value)}
          disabled={Boolean(loading)}
          className="rounded-full border border-moss/10 bg-white px-4 py-2 text-sm font-bold text-moss disabled:opacity-60"
        >
          {loading === item.value ? "Đang lưu..." : item.label}
        </button>
      ))}
    </div>
  );
}
