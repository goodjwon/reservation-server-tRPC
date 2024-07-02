import { ReservationRepository } from '../infrastructure/reservationRepository';
import { Reservation, ReservationStatus } from '@domain/reservation';
import { CreateReservationDto, ReservationResponseDto } from './dto/reservationDto';

export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async createReservation(dto: CreateReservationDto): Promise<ReservationResponseDto> {
    const reservation = new Reservation(
      this.generateReservationNumber(),
      dto.name,
      dto.phoneNumber,
      dto.email,
      new Date(dto.checkIn),
      new Date(dto.checkOut),
      dto.roomType,
      dto.resortCode,
      dto.adults,
      dto.children,
      dto.totalPrice,
      dto.pricePerDay,
      ReservationStatus.CONFIRMED
    );
  
    const savedReservation = await this.reservationRepository.createReservation(reservation);
  
    return {
      id: savedReservation.id,
      reservationNumber: savedReservation.reservationNumber,
      ...dto,
      checkIn: savedReservation.checkIn.toISOString(),
      checkOut: savedReservation.checkOut.toISOString(),
      reservationStatus: ReservationStatus.CONFIRMED
    };
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