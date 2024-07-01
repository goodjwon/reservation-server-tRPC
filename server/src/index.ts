import { sequelize } from './infrastructure/persistence/database';
import { ReservationModel } from './infrastructure/persistence/models/ReservationModel';
import { createServer } from './interface/server';

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await ReservationModel.sync();
    console.log('Reservation model synchronized with the database.');

    const server = createServer();
    server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();