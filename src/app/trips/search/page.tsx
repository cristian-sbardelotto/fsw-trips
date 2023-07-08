'use client';

import TripItem from '@/components/TripItem';
import { Trip } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function TripSearchResult() {
  const [trips, setTrips] = useState<Trip[]>();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchTrips() {
      const searchUrl = `http://localhost:3000/api/trips/search?text=${
        searchParams.get('text') ?? ''
      }&startDate=${searchParams.get('startDate')}&budget=${searchParams.get(
        'budget'
      )}`;

      const response = await fetch(searchUrl).then(response => response.json());
      console.log(response);

      setTrips(response);
    }

    fetchTrips();
  }, [searchParams]);

  return (
    <div className='container mx-auto flex flex-col items-center p-5'>
      <div className='border-b border-gray-light text-center mb-6'>
        <h1 className='text-primary-dark font-semibold text-xl'>
          Hospedagens encontradas
        </h1>

        <h2 className='text-gray-primary fonte-medium mb-6'>
          Listamos as melhores viagens pra você!
        </h2>
      </div>

      {trips && trips?.length > 0 ? (
        <div className='flex flex-col gap-4'>
          {trips?.map(trip => (
            <TripItem
              key={trip.id}
              trip={trip}
            />
          ))}
        </div>
      ) : (
        <h2 className='text-xl font-semibold text-primary-dark text-center'>
          Desculpe, não encontramos nenhuma viagem 😥
        </h2>
      )}
    </div>
  );
}
