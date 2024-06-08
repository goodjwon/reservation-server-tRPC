import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { TypeORMReservationRepository } from '../infra/adapter/TypeORMReservationRepository';
import { ReservationService } from '../domain/service/ReservationService';

const t = initTRPC.create();
const reservationRepository = new TypeORMReservationRepository();
const reservationService = new ReservationService(reservationRepository);

const appRouter = t.router({
  bookRoom: t.procedure
    .input(z.object({
      guestName: z.string(),
      roomType: z.string(),
      checkIn: z.string(),
      checkOut: z.string(),
    }))
    .mutation(async ({ input }) => {
      return reservationService.createReservation(input);
    }),
  getReservations: t.procedure.query(async () => {
    return reservationService.getAllReservations();
  }),
  updateReservationStatus: t.procedure
    .input(z.object({
      id: z.number(),
      status: z.string(),
    }))
    .mutation(async ({ input }) => {
      await reservationService.updateReservationStatus(input.id, input.status);
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;

export default appRouter;
