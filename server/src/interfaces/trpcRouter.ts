import { initTRPC } from '@trpc/server';
import { ReservationHandler } from './reservationHandler';
import { CreateReservationDto } from '../application/dto/reservationDto';

const t = initTRPC.create();

export const appRouter = (reservationHandler: ReservationHandler) => t.router({
  createReservation: t.procedure
    .input(CreateReservationDto)
    .mutation(async ({ input }) => {
      return reservationHandler.handleCreateReservation(input);
    }),
});

export type AppRouter = ReturnType<typeof appRouter>;