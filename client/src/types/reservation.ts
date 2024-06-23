export interface Reservation {
	id: string;
	reservationNumber: string;
	name: string;
	phoneNumber: string;
	email: string;
	checkIn: string;
	checkOut: string;
	roomType: string;
	resortCode: string;
	adults: number;
	children: number;
	totalPrice: number;
	pricePerDay: number;
	reservationStatus: 'REQUEST' | 'CONFIRMED' | 'CANCELLED';
  }
  
  export type CreateReservationInput = Omit<Reservation, 'id' | 'reservationNumber'>;