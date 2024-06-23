import { ReservationService } from '../application/reservationService';
import { CreateReservationDto, ReservationResponseDto } from '../application/dto/reservationDto';

export class ReservationAdapter {
  constructor(private reservationService: ReservationService) {}

  async createReservation(dto: CreateReservationDto): Promise<ReservationResponseDto> {
    return this.reservationService.createReservation(dto);
  }
}