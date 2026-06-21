import BookingFormClient from "@/components/BookingFormClient";
import { getRoomById, getValidDuration } from "@/data/site";
import { notFound } from "next/navigation";

type BookingPageProps = {
  params: Promise<{
    roomId: string;
  }>;
  searchParams: Promise<{
    duration?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
  }>;
};

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const { roomId } = await params;
  const query = await searchParams;

  const room = getRoomById(roomId);
  const duration = getValidDuration(query.duration);

  if (!room) {
    notFound();
  }

  return (
    <BookingFormClient
      initialRoomId={room.id}
      initialDuration={duration}
      initialCheckIn={query.checkin}
      initialCheckOut={query.checkout}
      initialGuests={query.guests}
    />
  );
}
