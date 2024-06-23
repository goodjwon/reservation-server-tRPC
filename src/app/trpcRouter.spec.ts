import { initTRPC } from '@trpc/server';
import { httpBatchLink } from '@trpc/client';
import fetch from 'node-fetch';
import { z } from 'zod';
import { TypeORMReservationRepository } from '../infra/adapter/TypeORMReservationRepository';
import { ReservationService } from '../domain/service/ReservationService';
import { initializeMockDataSource, MockDataSource } from '../infra/data-source.mock';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import * as http from 'http';

globalThis.fetch = fetch;

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

let server: http.Server;

beforeAll(async () => {
  await initializeMockDataSource();
  const handler = createHTTPHandler({
    router: appRouter,
    createContext: () => null,
  });

  server = http.createServer((req, res) => {
    handler(req, res);
  });

  server.listen(4001);
});

afterAll(async () => {
  server.close();
  await MockDataSource.destroy();
});

describe('TRPC Router', () => {
  const API_URL = 'http://localhost:4001';

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: API_URL,
      }),
    ],
  });

  it('should book a room', async () => {
    const response = await client.bookRoom.mutate({
      guestName: 'John Doe',
      roomType: 'Deluxe',
      checkIn: '2024-07-01',
      checkOut: '2024-07-10',
    });

    expect(response.id).toBeDefined();
    expect(response.guestName).toBe('John Doe');
  });

  it('should get all reservations', async () => {
    const reservations = await client.getReservations.query();
    expect(reservations.length).toBeGreaterThan(0);
  });

  it('should update reservation status', async () => {
    const reservations = await client.getReservations.query();
    const reservationId = reservations[0].id;

    await client.updateReservationStatus.mutate({
      id: reservationId,
      status: 'CONFIRMED',
    });

    const updatedReservations = await client.getReservations.query();
    const updatedReservation = updatedReservations.find(r => r.id === reservationId);

    expect(updatedReservation?.status).toBe('CONFIRMED');
  });
});
