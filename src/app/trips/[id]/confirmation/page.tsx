'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import TripConfirmationCard from '@/components/TripConfirmationCard';
import { Trip } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type TripConfirmationProps = {
  params: {
    id: string;
  };
};

export default function TripConfirmation({ params }: TripConfirmationProps) {
  const [trip, setTrip] = useState<Trip>();
  const [totalPrice, setTotalPrice] = useState(0);

  const searchParams = useSearchParams();

  const startDate = new Date(searchParams.get('startDate') as string);
  const endDate = new Date(searchParams.get('endDate') as string);
  const guests = searchParams.get('guests');

  useEffect(() => {
    async function fetchTrip() {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: 'POST',
        body: JSON.stringify({
          tripId: params.id,
          startDate: searchParams.get('startDate'),
          endDate: searchParams.get('endDate'),
        }),
      });

      const { trip, totalPrice } = await response.json();

      setTrip(trip);
      setTotalPrice(totalPrice);
    }

    fetchTrip();
  }, [params.id, searchParams]);

  if (!trip) return null;

  return (
    <div className='container mx-auto p-5'>
      <h1 className='font-semibold text-xl text-primary-dark'>Sua viagem</h1>

      <TripConfirmationCard
        trip={trip}
        totalPrice={totalPrice}
      />

      <div className='flex flex-col mt-5 text-primary-dark'>
        <h3 className='font-semibold'>Data</h3>

        <div className='flex items-center gap-1 mt-1'>
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {' - '}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
        </div>

        <h3 className='font-semibold mt-5'>Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className='mt-5'>Finalizar Compra</Button>
      </div>
    </div>
  );
}
