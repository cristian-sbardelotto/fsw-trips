import Image from 'next/image';
import Link from 'next/link';

import { useFormattedNumber } from '@/hooks/useFormattedNumber';

import { Trip } from '@prisma/client';
import ReactCountryFlag from 'react-country-flag';

type TripItemProps = {
  trip: Trip;
};

export default function TripItem({ trip }: TripItemProps) {
  const formattedPricePerDay = useFormattedNumber({
    number: +trip.pricePerDay,
    currency: 'BRL',
    locale: 'pt-BR',
  });

  return (
    <Link href={`/trips/${trip.id}`}>
      <div className='group flex flex-col'>
        <div className='relative h-[280px] w-[280px] rounded-lg overflow-hidden'>
          <Image
            src={trip.coverImage}
            alt={trip.name}
            className='shadow-md object-cover transition-all duration-300 group-hover:scale-110 group-hover:grayscale'
            fill
          />
        </div>

        <h3 className='text-primary-dark font-medium text-sm mt-2'>
          {trip.name}
        </h3>

        <div className='flex items-center gap-1 my-1'>
          <ReactCountryFlag
            countryCode={trip.countryCode}
            svg
          />
          <p className='text-xs text-gray-primary'>{trip.location}</p>
        </div>

        <p className='text-xs text-gray-primary'>
          <span className='text-primary font-medium'>
            {formattedPricePerDay}
          </span>{' '}
          por dia
        </p>
      </div>
    </Link>
  );
}
