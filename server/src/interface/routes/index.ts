import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { ReservationService } from '../../application/services/ReservationService';
import { ReservationRepository } from '../../infrastructure/persistence/ReservationRepository';
import { CreateReservationDto } from '../../application/dto/ReservationDto';

const t = initTRPC.create();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);

export const appRouter = t.router({
  createReservation: t.procedure
    .input(CreateReservationDto)
    .mutation(async ({ input }) => {
      return await reservationService.createReservation(input);
    }),
  
  // 여기에 다른 라우트들을 추가할 수 있습니다.
});

export type AppRouter = typeof appRouter;