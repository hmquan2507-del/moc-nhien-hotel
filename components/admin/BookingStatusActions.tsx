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
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function updateStatus(status: string) {
    if (status === currentStatus) {
      return;
    }

    setLoading(status);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as {
          message?: string;
        };

        setErrorMessage(
          result.message ?? "Không cập nhật được trạng thái. Vui lòng thử lại.",
        );
        return;
      }

      router.refresh();
    } catch {
      setErrorMessage("Có lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {statuses.map((item) => {
          const isCurrent = item.value === currentStatus;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => updateStatus(item.value)}
              disabled={Boolean(loading) || isCurrent}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isCurrent
                  ? "border-moss bg-moss text-white"
                  : "border-moss/10 bg-white text-moss hover:border-gold"
              }`}
            >
              {loading === item.value ? "Đang lưu..." : item.label}
            </button>
          );
        })}
      </div>

      {errorMessage && (
        <p className="text-sm font-semibold text-red-700">{errorMessage}</p>
      )}
    </div>
  );
}
