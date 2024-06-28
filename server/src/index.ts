// src/index.ts

import { createServer } from 'http';
import { appRouter } from './interfaces/trpcRouter';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { DataSource } from 'typeorm';
import { Reservation } from './domain/reservation';

import { ReservationHandler } from './interfaces/reservationHandler';
import { ReservationAdapter } from './interfaces/reservationAdapter';
import { ReservationService } from './application/reservationService';
import { ReservationRepository } from './infrastructure/reservationRepository';

// DataSource 초기화 (MySQL 용)
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "asdf****",
  database: "reservation_api_system_db",
  entities: [Reservation],
  synchronize: true, // 개발 환경에서만 사용, 프로덕션에서는 false로 설정
  logging: true
});

AppDataSource.initialize().then(() => {
  const repository = new ReservationRepository(AppDataSource);
  const service = new ReservationService(repository);
  const adapter = new ReservationAdapter(service);
  const handler = new ReservationHandler(adapter);

  const router = appRouter(handler);

  const trpcHandler = createHTTPHandler({
    router,
    createContext: () => ({})
  });

  const server = createServer((req, res) => {
    if (req.url?.startsWith('/trpc')) {
      trpcHandler(req, res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => console.log("Error during Data Source initialization", error));