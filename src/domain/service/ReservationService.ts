import { ReservationRepository } from '../port/ReservationRepository';
import { Reservation } from '../entity/Reservation';

export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async createReservation(data: { guestName: string, roomType: string, checkIn: string, checkOut: string }): Promise<Reservation> {
    const reservation = new Reservation();
    reservation.guestName = data.guestName;
    reservation.roomType = data.roomType;
    reservation.checkIn = data.checkIn;
    reservation.checkOut = data.checkOut;
    reservation.status = 'PENDING';

    return this.reservationRepository.save(reservation);
  }

  async getReservation(id: number): Promise<Reservation | null> {
    return this.reservationRepository.findById(id);
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }

  async updateReservationStatus(id: number, status: string): Promise<void> {
    return this.reservationRepository.updateStatus(id, status);
  }
}
