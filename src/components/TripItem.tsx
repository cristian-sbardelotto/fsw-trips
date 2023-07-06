import { Trip } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import ReactCountryFlag from 'react-country-flag';

type TripItemProps = {
  trip: Trip;
};

export default function TripItem({ trip }: TripItemProps) {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className='flex flex-col'>
        <div className='relative h-[280px] w-[280px]'>
          <Image
            src={trip.coverImage}
            alt={trip.name}
            className='rounded-lg shadow-md object-cover'
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
    </Link>
  );
}
