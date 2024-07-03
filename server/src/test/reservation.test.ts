import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../interface/routes';
import { CreateReservationDtoType } from '../application/dto/ReservationDto';
import {transformer} from '../utils/transformer'

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
  transformer: transformer
});

describe('Reservation API', () => {
  it('should create a reservation', async () => {
    const reservationData: CreateReservationDtoType = {
      name: '홍길동',
      phoneNumber: '010-1234-5678',
      email: 'example@abc.com',
      checkIn: '2023-07-01',
      checkOut: '2023-07-03',
      roomType: 'Single',
      resortCode: '0010A',
      adults: 2,
      children: 1,
      totalPrice: 100000,
      pricePerDay: 50000,
      reservationStatus: 'REQUEST'
    };

    const result = await client.createReservation.mutate(reservationData);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('reservationNumber');
    expect(result.name).toBe(reservationData.name);
    // 추가적인 assertion들...
  });
});