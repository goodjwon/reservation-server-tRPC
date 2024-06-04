import { Reservation } from '../entity/Reservation';

export interface ReservationRepository {
  save(reservation: Reservation): Promise<Reservation>;
  findById(id: number): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
  updateStatus(id: number, status: string): Promise<void>;
}
