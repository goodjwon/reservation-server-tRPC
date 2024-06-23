import { ReservationRepository } from '../../domain/port/ReservationRepository';
import { Reservation } from '../../domain/entity/Reservation';
import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';

export class TypeORMReservationRepository implements ReservationRepository {
  private repository: Repository<Reservation>;

  constructor() {
    this.repository = AppDataSource.getRepository(Reservation);
  }

  async save(reservation: Reservation): Promise<Reservation> {
    return this.repository.save(reservation);
  }

  async findById(id: number): Promise<Reservation | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Reservation[]> {
    return this.repository.find();
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.repository.update(id, { status });
  }
}
