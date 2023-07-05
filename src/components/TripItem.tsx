import { Trip } from '@prisma/client';
import Image from 'next/image';

import ReactCountryFlag from 'react-country-flag';

type TripItemProps = {
  trip: Trip;
};

export default function TripItem({ trip }: TripItemProps) {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[280px] w-[280px]'>
        <Image
          src={trip.coverImage}
          alt={trip.name}
          width={280}
          height={280}
          style={{
            objectFit: 'cover',
          }}
          className='rounded-lg shadow-md'
          fill
        />
      </div>

      <h3 className='text-primary-dark font-medium text-sm mt-2'>
        {trip.name}
      </h3>
      <div className='flex-items-center gap-1 my-1'>
        <ReactCountryFlag
          countryCode={trip.countryCode}
          svg
        />
        <p className='text-xs text-gray-primary'>{trip.location}</p>
      </div>

      <p className='text-xs text-gray-primary'>
        <span className='text-primary font-medium'>
          R${String(trip.pricePerDay)}
        </span>{' '}
        por dia
      </p>
    </div>
  );
}
