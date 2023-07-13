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

  const textParam = searchParams.get('text');

  return (
    <div className='container mx-auto flex flex-col items-center p-5 lg:items-start lg:pt-10'>
      <div className='border-b border-gray-light text-center mb-6'>
        <h1 className='text-primary-dark font-semibold text-xl lg:w-full lg:text-left lg:text-[2.5rem]'>
          Hospedagens encontradas
        </h1>

        <h2 className='text-primary-dark font-semibold text-lg lg:w-full lg:text-left lg:text-[2rem] lg:mt-6'>
          Resultados para "{textParam}"
        </h2>

        <h3 className='text-gray-primary fonte-medium mb-6 lg:mt-6 lg:w-full lg:text-left'>
          Listamos as melhores viagens pra você!
        </h3>
      </div>

      {trips && trips?.length > 0 ? (
        <div className='flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-10 lg:mt-6 lg:pb-16'>
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
