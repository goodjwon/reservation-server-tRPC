import { Reservation } from '../entities/Reservation';

export interface IReservationRepository {
    save(reservation: Reservation): Promise<Reservation>;
    findById(id: number): Promise<Reservation | null>;
    findByReservationNumber(reservationNumber: string): Promise<Reservation | null>;
}