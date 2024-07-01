import { IReservationRepository } from '../../domain/repositories/IReservationRepository';
import { Reservation, ReservationStatus } from '../../domain/entities/Reservation';
import { ReservationModel } from './models/ReservationModel';

export class ReservationRepository implements IReservationRepository {
    async save(reservation: Reservation): Promise<Reservation> {
        const reservationData = this.mapToModel(reservation);
        const savedReservation = await ReservationModel.create(reservationData);
        return this.mapToEntity(savedReservation);
    }

    async findById(id: number): Promise<Reservation | null> {
        const reservation = await ReservationModel.findByPk(id);
        return reservation ? this.mapToEntity(reservation) : null;
    }

    async findByReservationNumber(reservationNumber: string): Promise<Reservation | null> {
        const reservation = await ReservationModel.findOne({ where: { reservationNumber } });
        return reservation ? this.mapToEntity(reservation) : null;
    }

    private mapToModel(entity: Reservation): Partial<ReservationModel> {
        return {
            reservationNumber: entity.reservationNumber,
            name: entity.name,
            phoneNumber: entity.phoneNumber,
            email: entity.email,
            checkIn: entity.checkIn,
            checkOut: entity.checkOut,
            roomType: entity.roomType,
            resortCode: entity.resortCode,
            adults: entity.adults,
            children: entity.children,
            totalPrice: entity.totalPrice,
            pricePerDay: entity.pricePerDay,
            reservationStatus: entity.reservationStatus,
        };
    }

    private mapToEntity(model: ReservationModel): Reservation {
        return new Reservation(
            model.id,
            model.reservationNumber,
            model.name,
            model.phoneNumber,
            model.email,
            model.checkIn,
            model.checkOut,
            model.roomType,
            model.resortCode,
            model.adults,
            model.children,
            model.totalPrice,
            model.pricePerDay,
            model.reservationStatus as ReservationStatus
        );
    }
}