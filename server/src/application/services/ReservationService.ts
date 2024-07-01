import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { Reservation, ReservationStatus } from '../../domain/entities/Reservation';
import { CreateReservationDtoType, ReservationResponseDtoType } from '../dto/ReservationDto';

export class ReservationService {
    constructor(private reservationRepository: IReservationRepository) {}

    async createReservation(dto: CreateReservationDtoType): Promise<ReservationResponseDtoType> {
        const reservation = new Reservation(
            0,
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

        const savedReservation = await this.reservationRepository.save(reservation);

        return {
            id: savedReservation.id,
            reservationNumber: savedReservation.reservationNumber,
            name: savedReservation.name,
            phoneNumber: savedReservation.phoneNumber,
            email: savedReservation.email,
            checkIn: savedReservation.checkIn.toISOString(),
            checkOut: savedReservation.checkOut.toISOString(),
            roomType: savedReservation.roomType,
            resortCode: savedReservation.resortCode,
            adults: savedReservation.adults,
            children: savedReservation.children,
            totalPrice: savedReservation.totalPrice,
            pricePerDay: savedReservation.pricePerDay,
            reservationStatus: savedReservation.reservationStatus
        };
    }

    private generateReservationNumber(): string {
        // 실제 구현에서는 더 복잡한 로직을 사용해야 합니다.
        return `RES${Date.now()}`;
    }
}