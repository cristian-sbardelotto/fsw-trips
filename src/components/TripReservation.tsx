'use client';

import { Trip } from '@prisma/client';
import { differenceInDays } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import Button from './Button';
import DatePicker from './DatePicker';
import Input from './Input';

type TripReservationProps = {
  trip: Trip;
};

type FormProps = {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
};

export default function TripReservation({ trip }: TripReservationProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<FormProps>();

  async function onSubmit(data: FormProps) {
    const response = await fetch('http://localhost:3000/api/trips/check', {
      method: 'POST',
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId: trip.id,
        })
      ),
    });

    const res = await response.json();

    function setFormError(
      inputName: 'startDate' | 'endDate' | 'guests',
      message: string
    ) {
      return setError(inputName, {
        type: 'manual',
        message,
      });
    }

    if (res?.error?.code === 'TRIP_ALREADY_RESERVED') {
      setFormError('startDate', 'Esta data já está reservada.');
      return setFormError('endDate', 'Esta data já está reservada.');
    }

    if (res?.error?.code === 'INVALID_START_DATE')
      return setFormError('startDate', 'Data inválida');
    if (res?.error?.code === 'INVALID_END_DATE')
      return setFormError('endDate', 'Data inválida');
  }

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  function calculateTotalReservationAmount() {
    return (
      differenceInDays(Number(endDate), Number(startDate)) * +trip.pricePerDay
    );
  }

  return (
    <div className='flex flex-col px-5'>
      <div className='flex gap-4'>
        <Controller
          name='startDate'
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória.',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              placeholderText='Data de Início'
              className='w-full'
              minDate={trip.startDate}
              maxDate={endDate ?? trip.endDate}
            />
          )}
        />

        <Controller
          name='endDate'
          rules={{
            required: {
              value: true,
              message: 'Data final é obrigatória.',
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              onChange={field.onChange}
              selected={field.value}
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              placeholderText='Data Final'
              className='w-full'
              minDate={startDate ?? trip.startDate}
              maxDate={trip.endDate}
            />
          )}
        />
      </div>

      <Input
        {...register('guests', {
          required: {
            value: true,
            message: 'O número de hóspedes é obrigatório.',
          },
        })}
        error={!!errors.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (max: ${trip.maxGuests})`}
        className='mt-4'
      />

      <div className='flex justify-between mt-3'>
        <p className='font-medium text-sm text-primary-dark'>Total: </p>
        <p className='font-medium text-sm text-primary-dark'>
          R$
          {startDate && endDate ? calculateTotalReservationAmount() : '0'}
        </p>
      </div>

      <div className='pb-10 border-b border-b-gray-light w-full'>
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className='mt-3'
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}
