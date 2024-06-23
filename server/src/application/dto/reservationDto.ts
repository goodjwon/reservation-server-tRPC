import { z } from 'zod';

export const CreateReservationDto = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  checkIn: z.string(),
  checkOut: z.string(),
  roomType: z.string(),
  resortCode: z.string(),
  adults: z.number(),
  children: z.number(),
  totalPrice: z.number(),
  pricePerDay: z.number(),
  reservationStatus: z.enum(['REQUEST', 'CONFIRMED', 'CANCELLED'])
});

export type CreateReservationDto = z.infer<typeof CreateReservationDto>;