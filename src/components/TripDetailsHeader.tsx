import Image from 'next/image';

import { useFormattedNumber } from '@/hooks/useFormattedNumber';

import { Trip } from '@prisma/client';
import ReactCountryFlag from 'react-country-flag';

type TripDetailsHeader = {
  trip: Trip;
};

export default function TripDetailsHeader({ trip }: TripDetailsHeader) {
  const formattedPricePerDay = useFormattedNumber({
    number: +trip.pricePerDay,
    currency: 'BRL',
    locale: 'pt-BR',
  });

  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full lg:hidden'>
        <Image
          src={trip.coverImage}
          alt={`${trip.name} Image`}
          fill
          className='object-cover'
        />
      </div>

      <div className='hidden lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 lg:order-2'>
        <div className='relative row-span-2'>
          <Image
            src={trip.coverImage}
            fill
            alt={trip.name}
            className='object-cover rounded-tl-lg rounded-bl-lg shadow-md'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.imagesUrl[0]}
            fill
            alt={trip.name}
            className='object-cover shadow-md'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.imagesUrl[1]}
            fill
            alt={trip.name}
            className='object-cover shadow-md rounded-tr-lg'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.imagesUrl[2]}
            fill
            alt={trip.name}
            className='object-cover shadow-md'
          />
        </div>

        <div className='relative h-[200px] w-full'>
          <Image
            src={trip.coverImage}
            fill
            alt={trip.name}
            className='object-cover shadow-md rounded-br-lg'
          />
        </div>
      </div>

      <div className='flex flex-col p-5 lg:order-1 lg:p-0 lg:mb-10'>
        <h1 className='font-semibold text-xl text-primary-dark lg:text-3xl'>
          {trip.name}
        </h1>

        <div className='flex items-center gap-1 my-1'>
          <ReactCountryFlag
            countryCode={trip.countryCode}
            svg
          />
          <p className='text-xs text-gray-primary underline lg:text-base'>
            {trip.location}
          </p>
        </div>

        <p className='text-xs text-gray-primary lg:hidden'>
          <span className='text-primary font-medium'>
            {formattedPricePerDay}
          </span>{' '}
          por dia
        </p>
      </div>
    </div>
  );
}
