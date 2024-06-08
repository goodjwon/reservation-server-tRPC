import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './app/trpc';

const API_URL = 'https://<your-api-id>.execute-api.<region>.amazonaws.com/dev/trpc';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_URL,
    }),
  ],
});

async function main() {
  // 예약 생성
  const bookingResponse = await trpc.bookRoom.mutate({
    guestName: 'John Doe',
    roomType: 'Deluxe',
    checkIn: '2024-07-01',
    checkOut: '2024-07-10',
  });

  console.log('Booking Response:', bookingResponse);
  // 예상 출력: Booking Response: { success: true, reservationId: 1 }

  // 예약 목록 조회
  const reservations = await trpc.getReservations.query();
  console.log('Reservations:', reservations);
  // 예상 출력: Reservations: [{ id: 1, guestName: 'John Doe', roomType: 'Deluxe', checkIn: '2024-07-01', checkOut: '2024-07-10', status: 'PENDING' }]

  // 예약 상태 업데이트
  const updateStatusResponse = await trpc.updateReservationStatus.mutate({
    id: bookingResponse.reservationId,
    status: 'CONFIRMED',
  });

  console.log('Update Status Response:', updateStatusResponse);
  // 예상 출력: Update Status Response: { success: true }

  // 예약 목록 다시 조회
  const updatedReservations = await trpc.getReservations.query();
  console.log('Updated Reservations:', updatedReservations);
  // 예상 출력: Updated Reservations: [{ id: 1, guestName: 'John Doe', roomType: 'Deluxe', checkIn: '2024-07-01', checkOut: '2024-07-10', status: 'CONFIRMED' }]
}

main();
