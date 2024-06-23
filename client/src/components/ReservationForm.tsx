import React from 'react';
import { useForm } from 'react-hook-form';
import { trpc } from '../utils/trpc';
import { CreateReservationInput } from '../types/reservation';

export const ReservationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateReservationInput>();
  const createReservation = trpc.createReservation.useMutation();

  const onSubmit = async (data: CreateReservationInput) => {
    try {
      const result = await createReservation.mutateAsync(data);
      console.log('Reservation created:', result);
      // Handle successful reservation (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} placeholder="Name" />
      {errors.name && <span>This field is required</span>}
      
      <input {...register('phoneNumber', { required: true })} placeholder="Phone Number" />
      {errors.phoneNumber && <span>This field is required</span>}
      
      <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
      {errors.email && <span>Please enter a valid email</span>}
      
      <input type="date" {...register('checkIn', { required: true })} />
      {errors.checkIn && <span>This field is required</span>}
      
      <input type="date" {...register('checkOut', { required: true })} />
      {errors.checkOut && <span>This field is required</span>}
      
      <select {...register('roomType', { required: true })}>
        <option value="">Select Room Type</option>
        <option value="Single">Single</option>
        <option value="Double">Double</option>
        <option value="Suite">Suite</option>
      </select>
      {errors.roomType && <span>This field is required</span>}
      
      <input {...register('resortCode', { required: true })} placeholder="Resort Code" />
      {errors.resortCode && <span>This field is required</span>}
      
      <input type="number" {...register('adults', { required: true, min: 1 })} placeholder="Number of Adults" />
      {errors.adults && <span>Please enter a valid number of adults</span>}
      
      <input type="number" {...register('children', { required: true, min: 0 })} placeholder="Number of Children" />
      {errors.children && <span>Please enter a valid number of children</span>}
      
      <input type="number" {...register('totalPrice', { required: true, min: 0 })} placeholder="Total Price" />
      {errors.totalPrice && <span>Please enter a valid total price</span>}
      
      <input type="number" {...register('pricePerDay', { required: true, min: 0 })} placeholder="Price Per Day" />
      {errors.pricePerDay && <span>Please enter a valid price per day</span>}
      
      <button type="submit">Create Reservation</button>
    </form>
  );
};