import { z } from 'zod';
import { ReservationStatus } from '../../domain/entities/Reservation';

export const CreateReservationDto = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  checkIn: z.string().or(z.date()),
  checkOut: z.string().or(z.date()),
  roomType: z.string(),
  resortCode: z.string(),
  adults: z.number().int().positive(),
  children: z.number().int().nonnegative(),
  totalPrice: z.number().positive(),
  pricePerDay: z.number().positive(),
  reservationStatus: z.enum(['REQUEST', 'CONFIRMED', 'CANCELLED'] as const)
});

export type CreateReservationDtoType = z.infer<typeof CreateReservationDto>;

export const ReservationResponseDto = CreateReservationDto.extend({
  id: z.number().int().positive(),
  reservationNumber: z.string()
});

export type ReservationResponseDtoType = z.infer<typeof ReservationResponseDto>;