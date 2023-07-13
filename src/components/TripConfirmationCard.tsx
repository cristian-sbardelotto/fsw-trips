import Image from 'next/image';

import { useFormattedNumber } from '@/hooks/useFormattedNumber';

import { Trip } from '@prisma/client';
import ReactCountryFlag from 'react-country-flag';

type TripConfirmationCardProps = {
  trip: Trip;
  totalPrice: number;
};

export default function TripConfirmationCard({
  trip,
  totalPrice,
}: TripConfirmationCardProps) {
  const formattedTotalPrice = useFormattedNumber({
    number: totalPrice,
    currency: 'BRL',
    locale: 'pt-BR',
  });

  return (
    <div className='flex flex-col p-5 mt-5 border-gray-light border shadow-lg rounded-lg'>
      <div className='flex items-center gap-3 pb-5 border-b border-gray-light'>
        <div className='relative h-[106px] w-[124px]'>
          <Image
            src={trip.coverImage}
            fill
            className='rounded-lg object-cover'
            alt={trip.name}
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

      <h3 className='font-semibold text-lg text-primary-dark mt-3'>
        Informações sobre o preço
      </h3>

      <div className='flex justify-between mt-2'>
        <p className='text-primary-dark'>Total:</p>
        <p className='font-medium'>{formattedTotalPrice}</p>
      </div>
    </div>
  );
}
