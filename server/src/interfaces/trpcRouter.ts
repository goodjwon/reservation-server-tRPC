import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { ReservationHandler } from './reservationHandler';
import { CreateReservationDto } from '../application/dto/reservationDto';

const t = initTRPC.create();

export const appRouter = (reservationHandler: ReservationHandler) => t.router({
  createReservation: t.procedure
    .input(CreateReservationDto)
    .mutation(async ({ input }) => {
      return reservationHandler.handleCreateReservation(input);
    }),
  getReservation: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return reservationHandler.handleGetReservation(input.id);
    }),
});

export type AppRouter = ReturnType<typeof appRouter>;