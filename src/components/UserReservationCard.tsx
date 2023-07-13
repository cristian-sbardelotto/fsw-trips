'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactCountryFlag from 'react-country-flag';

import Button from '@/components/Button';
import { useFormattedNumber } from '@/hooks/useFormattedNumber';
import { toast } from 'react-toastify';
import TripCancellationModal from './TripCancellationModal';

type UserReservationCardProps = {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  fetchReservations: () => void;
};

export default function UserReservationCard({
  reservation,
  fetchReservations,
}: UserReservationCardProps) {
  const { trip } = reservation;

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDeleteReservation() {
    setIsModalOpen(previous => !previous);

    const response = await fetch(
      `http://localhost:3000/api/trips/reservation/${reservation.id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao excluir a reserva!');
    }

    toast.success('Reserva cancelada com sucesso!', { position: 'top-right' });
    fetchReservations();
  }

  const formattedTotalPaid = useFormattedNumber({
    number: +reservation.totalPaid,
    currency: 'BRL',
    locale: 'pt-BR',
  });

  return (
    <div className='flex flex-col p-5 mt-5 border border-gray-light shadow-lg rounded-lg'>
      {isModalOpen && (
        <TripCancellationModal
          onDelete={handleDeleteReservation}
          onCancel={() => setIsModalOpen(false)}
          tripName={trip.name}
        />
      )}

      <div className='flex items-center gap-3 pb-5 border-b border-gray-light'>
        <div className='relative h-[106px] w-[124px]'>
          <Image
            src={trip.coverImage}
            className='rounded-lg object-cover'
            alt={`${trip.name} Image`}
            fill
          />
        </div>

        <div className='flex flex-col'>
          <h2 className='text-xl text-primary-dark font-semibold'>
            {trip.name}
          </h2>
          <div className='flex items-center gap-1'>
            <ReactCountryFlag
              countryCode={trip.countryCode}
              svg
            />
            <p className='text-xs text-gray-primary underline'>
              {trip.location}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-5 text-primary-dark'>
        <h3 className='text-sm font-semibold'>Data</h3>

        <div className='flex items-center gap-1'>
          <p className='text-sm'>
            {format(new Date(reservation.startDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
          {' - '}
          <p className='text-sm'>
            {format(new Date(reservation.endDate), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <h3 className='mt-5 text-sm font-semibold'>Hóspedes</h3>

        <p className='text-sm pb-5'>{reservation.guests} hóspedes</p>

        <h3 className='font-semibold text-primary-dark mt-3 pt-5 border-t  border-gray-light'>
          Informações sobre o preço
        </h3>

        <div className='flex items-center justify-between mt-1'>
          <p className='text-primary-dark text-sm mt-2'>Total:</p>
          <p className='font-medium text-sm'>{formattedTotalPaid}</p>
        </div>

        <Button
          variant='danger'
          className='mt-5'
          onClick={() => setIsModalOpen(true)}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
}
