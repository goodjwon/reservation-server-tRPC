import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

export default function ReservationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: reservation, isLoading, error } = trpc.getReservation.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!reservation) return <div>Reservation not found</div>;

  return (
    <div>
      <h1>Reservation Details</h1>
      <p>Reservation Number: {reservation.reservationNumber}</p>
      <p>Name: {reservation.name}</p>
      <p>Check-in: {reservation.checkIn}</p>
      <p>Check-out: {reservation.checkOut}</p>
      {/* Add more reservation details here */}
    </div>
  );
}