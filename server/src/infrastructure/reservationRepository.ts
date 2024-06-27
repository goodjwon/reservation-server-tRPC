// src/infrastructure/reservationRepository.ts

import { Repository, DataSource } from 'typeorm';
import { Reservation } from '../domain/reservation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepository {
  private repository: Repository<Reservation>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Reservation);
  }

  async createReservation(reservation: Reservation): Promise<Reservation> {
    return this.repository.save(reservation);
  }

  async findReservationById(id: string): Promise<Reservation | null> {
    return this.repository.findOneBy({ id });
  }
}