import { Trip } from '@prisma/client';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

type TripDetailsHeader = {
  trip: Trip;
};

export default function TripDetailsHeader({ trip }: TripDetailsHeader) {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full'>
        <Image
          src={trip.coverImage}
          alt={`${trip.name} Image`}
          fill
          className='object-cover'
        />
      </div>

      <div className='flex flex-col p-5'>
        <h1 className='font-semibold text-xl text-primary-dark'>{trip.name}</h1>

        <div className='flex-items-center gap-1 my-1'>
          <ReactCountryFlag
            countryCode={trip.countryCode}
            svg
          />
          <p className='text-xs text-gray-primary underline'>{trip.location}</p>
        </div>

        <p className='text-xs text-gray-primary'>
          <span className='text-primary font-medium'>
            R${String(trip.pricePerDay)}
          </span>{' '}
          por dia
        </p>
      </div>
    </div>
  );
}
