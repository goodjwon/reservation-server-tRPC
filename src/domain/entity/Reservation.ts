import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guestName: string;

  @Column()
  roomType: string;

  @Column()
  checkIn: string;

  @Column()
  checkOut: string;

  @Column()
  status: string;  // 'PENDING', 'CONFIRMED', 'CANCELLED'
}
