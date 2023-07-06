'use client';

import { Trip } from '@prisma/client';
import Button from './Button';
import DatePicker from './DatePicker';
import Input from './Input';

type TripReservationProps = {
  trip: Trip;
};

export default function TripReservation({ trip }: TripReservationProps) {
  return (
    <div className='flex flex-col px-5'>
      <div className='flex gap-4'>
        <DatePicker
          placeholderText='Data de Início'
          onChange={() => {}}
          className='w-full'
        />
        <DatePicker
          placeholderText='Data Final'
          onChange={() => {}}
          className='w-full'
        />
      </div>

      <Input
        placeholder={`Número de hóspedes (max: ${trip.maxGuests})`}
        className='mt-4'
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primary-dark'>Total: </p>
        <p className='font-medium text-sm text-primary-dark'>R$2500,00</p>
      </div>

      <div className='pb-10 border-b border-b-gray-light w-full'>
        <Button className='mt-3'>Reservar agora</Button>
      </div>
    </div>
  );
}
