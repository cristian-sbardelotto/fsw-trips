'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Trip } from '@prisma/client';
import ReactCountryFlag from 'react-country-flag';

type TripConfirmationProps = {
  params: {
    id: string;
  };
};

export default function TripConfirmation({ params }: TripConfirmationProps) {
  const [trip, setTrip] = useState<Trip>();
  const [totalPrice, setTotalPrice] = useState(0);

  const searchParams = useSearchParams();

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
    <div className='container mx-auto'>
      <h1 className='font-semibold text-xl text-primary-dark'>Sua viagem</h1>

      <div className='flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg'>
        <div className='flex items-center gap-3 pb-5 border-b border-grayLighter border-solid'>
          <div className='relative h-[106px] w-[124px]'>
            <Image
              src={trip.coverImage}
              fill
              className='rounded-lg object-cover'
              alt={trip.name}
            />
          </div>

          <div className='flex flex-col'>
            <h2 className='text-xl text-primaryDarker font-semibold'>
              {trip.name}
            </h2>
            <div className='flex items-center gap-1'>
              <ReactCountryFlag
                countryCode={trip.countryCode}
                svg
              />
              <p className='text-xs text-grayPrimary underline'>
                {trip.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
