// src/domain/reservation.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;  // '!'를 사용하여 초기화 문제 해결

  @Column()
  reservationNumber: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  roomType: string;

  @Column()
  resortCode: string;

  @Column()
  adults: number;

  @Column()
  children: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerDay: number;

  @Column()
  reservationStatus: string;

  constructor(
    reservationNumber: string,
    name: string,
    phoneNumber: string,
    email: string,
    checkIn: Date,
    checkOut: Date,
    roomType: string,
    resortCode: string,
    adults: number,
    children: number,
    totalPrice: number,
    pricePerDay: number,
    reservationStatus: string
  ) {
    this.reservationNumber = reservationNumber;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.roomType = roomType;
    this.resortCode = resortCode;
    this.adults = adults;
    this.children = children;
    this.totalPrice = totalPrice;
    this.pricePerDay = pricePerDay;
    this.reservationStatus = reservationStatus;
  }

  // 팩토리 메서드 추가
  static create(props: Omit<Reservation, 'id'>): Reservation {
    return new Reservation(
      props.reservationNumber,
      props.name,
      props.phoneNumber,
      props.email,
      props.checkIn,
      props.checkOut,
      props.roomType,
      props.resortCode,
      props.adults,
      props.children,
      props.totalPrice,
      props.pricePerDay,
      props.reservationStatus
    );
  }
}