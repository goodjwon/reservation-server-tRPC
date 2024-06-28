import { ReservationRepository } from '../infrastructure/reservationRepository';
import { Reservation, ReservationStatus } from '@domain/reservation';
import { CreateReservationDto, ReservationResponseDto } from './dto/reservationDto';

export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async createReservation(dto: CreateReservationDto): Promise<ReservationResponseDto> {
    const reservation = Reservation.create({
      ...dto,
      reservationNumber: this.generateReservationNumber(),
      checkIn: new Date(dto.checkIn),
      checkOut: new Date(dto.checkOut),
      reservationStatus: ReservationStatus.CONFIRMED
    });
  
    const savedReservation = await this.reservationRepository.createReservation(reservation);
  
    const { checkIn, checkOut, ...rest } = savedReservation;
    return {
      ...rest,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString()
    } as ReservationResponseDto;
  }

  private generateReservationNumber(): string {
    // Implementation for generating unique reservation number
    return `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${Math.floor(1000 + Math.random() * 9000)}`;
  }

  async getReservation(id: number): Promise<ReservationResponseDto | null> {
    const reservation = await this.reservationRepository.findReservationById(id);
    if (!reservation) return null;
    
    const { checkIn, checkOut, ...rest } = reservation;
    return {
      ...rest,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString()
    } as ReservationResponseDto;
  }
}