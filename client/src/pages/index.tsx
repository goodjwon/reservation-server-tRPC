import { trpc } from '../utils/trpc';
import { ReservationForm } from '../components/ReservationForm';

export default function Home() {
  // You can add more functionality here, like listing recent reservations
  return (
    <div>
      <h1>Create a New Reservation</h1>
      <ReservationForm />
    </div>
  );
}