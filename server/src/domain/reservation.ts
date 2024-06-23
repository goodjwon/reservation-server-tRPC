export class Reservation {
	constructor(
	  public id: string,
	  public reservationNumber: string,
	  public name: string,
	  public phoneNumber: string,
	  public email: string,
	  public checkIn: Date,
	  public checkOut: Date,
	  public roomType: string,
	  public resortCode: string,
	  public adults: number,
	  public children: number,
	  public totalPrice: number,
	  public pricePerDay: number,
	  public reservationStatus: ReservationStatus
	) {}
  }
  
  export enum ReservationStatus {
	REQUEST = 'REQUEST',
	CONFIRMED = 'CONFIRMED',
	CANCELLED = 'CANCELLED'
  }