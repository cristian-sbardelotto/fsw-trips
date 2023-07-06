import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

type TripDetailsProps = {
  params: { id: string };
};

async function getTripDetails(id: string) {
  const trip = await prisma.trip.findUnique({
    where: { id },
  });

  return trip;
}

export default async function TripDetails({ params }: TripDetailsProps) {
  const trip = await getTripDetails(params.id);

  if (!trip) return null;

  return (
    <div className='container mx-auto'>
      <div className='relative h-[300px] w-full'>
        <Image
          src={trip.coverImage}
          alt={`${trip.name} Image`}
          fill
          className='object-cover'
        />
      </div>

      <div className='flex flex-col p-5'>
        <h1 className='font-semibol text-xl text-primary-dark'></h1>

        <div className='flex items-center'>
          <div className='flex-items-center gap-1 my-1'>
            <ReactCountryFlag
              countryCode={trip.countryCode}
              svg
            />
            <p className='text-xs text-gray-primary underline'>
              {trip.location}
            </p>
          </div>

          <p className='text-xs text-gray-primary'>
            <span className='text-primary font-medium'>
              R${String(trip.pricePerDay)}
            </span>{' '}
            por dia
          </p>
        </div>
      </div>
    </div>
  );
}
