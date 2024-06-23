import { Repository, EntityRepository } from 'typeorm';
import { Reservation, ReservationStatus } from '../domain';


@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async createReservation(reservation: Reservation): Promise<Reservation> {
    return this.save(reservation);
  }

  async findReservationById(id: string): Promise<Reservation | null> {
    // return this.findOne({ where: { id } });
    // 또는 TypeORM 0.3.x 버전을 사용하는 경우:
    return this.findOneBy({ id });
  }
}