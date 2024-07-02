// src/application/dto/reservationDto.ts

import { z } from 'zod';
import { ReservationStatus } from '../../domain/reservation';

export const CreateReservationDto = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  checkIn: z.string(),
  checkOut: z.string(),
  roomType: z.string(),
  resortCode: z.string(),
  adults: z.number().int().positive(),
  children: z.number().int().nonnegative(),
  totalPrice: z.number().positive(),
  pricePerDay: z.number().positive(),
  reservationStatus: z.nativeEnum(ReservationStatus)
});

export type CreateReservationDto = z.infer<typeof CreateReservationDto>;

export const ReservationResponseDto = z.object({
  id: z.number(),
  reservationNumber: z.string(),
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  checkIn: z.string(),
  checkOut: z.string(),
  roomType: z.string(),
  resortCode: z.string(),
  adults: z.number().int().positive(),
  children: z.number().int().nonnegative(),
  totalPrice: z.number().positive(),
  pricePerDay: z.number().positive(),
  reservationStatus: z.nativeEnum(ReservationStatus)
});

export type ReservationResponseDto = z.infer<typeof ReservationResponseDto>;

export const UpdateReservationStatusDto = z.object({
  id: z.number(),
  reservationStatus: z.nativeEnum(ReservationStatus)
});

<<<<<<< HEAD:server/src/application/dto/reservationDto.ts
export type UpdateReservationStatusDto = z.infer<typeof UpdateReservationStatusDto>;
=======
export type CreateReservationDtoType = z.infer<typeof CreateReservationDto>;

export const ReservationResponseDto = CreateReservationDto.extend({
  id: z.number(),
  reservationNumber: z.string()
});

export type ReservationResponseDtoType = z.infer<typeof ReservationResponseDto>;
>>>>>>> c11cfd4fd638bffe7571d43e9152d38b1483fabd:server/src/application/dto/ReservationDto.ts
