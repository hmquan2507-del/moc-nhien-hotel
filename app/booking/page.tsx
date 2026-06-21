import BookingFormClient from "@/components/BookingFormClient";
import { getValidDuration, rooms } from "@/data/site";

type BookingPageProps = {
  searchParams: Promise<{
    room?: string;
    duration?: string;
  }>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const query = await searchParams;
  const room = rooms.find((item) => item.id === query.room) ?? rooms[0];
  const duration = getValidDuration(query.duration);

  return <BookingFormClient initialRoomId={room.id} initialDuration={duration} />;
}
