import { ReservationAdapter } from './reservationAdapter';
import { CreateReservationDto, ReservationResponseDto } from '../application/dto/reservationDto';

export class ReservationHandler {
  constructor(private reservationAdapter: ReservationAdapter) {}

  async handleCreateReservation(dto: CreateReservationDto): Promise<ReservationResponseDto> {
    return this.reservationAdapter.createReservation(dto);
  }
}