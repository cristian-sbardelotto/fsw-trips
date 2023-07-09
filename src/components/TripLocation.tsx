import Image from 'next/image';
import Button from './Button';

type TripLocationProps = {
  tripLocation: string;
  tripLocationDescription: string;
};

export default function TripLocation({
  tripLocation,
  tripLocationDescription,
}: TripLocationProps) {
  return (
    <div className='p-5'>
      <h2 className='font-semibold text-primary-dark mb-5'>Localização</h2>

      <div className='relative h-[280px] w-full'>
        <Image
          src='/map-mobile.png'
          alt={`${tripLocation} Image`}
          fill
          className='object-cover rounded-lg shadow-md'
        />
      </div>

      <div className='relative h-[480px] w-full hidden lg:block'>
        <Image
          src='/map-desktop.png'
          alt={tripLocation}
          fill
          className='rounded-lg shadow-md object-cover'
        />
      </div>

      <h3 className='text-primary-dark text-sm font-semibold mt-3 lg:text-base lg:mt-5'>
        {tripLocation}
      </h3>

      <p className='text-xs text-primary-dark mt-3 leading-5 lg:text-sm lg:mt-4'>
        {tripLocationDescription}
      </p>

      <Button
        variant='outline'
        className='w-full mt-5 lg:max-w-[300px]'
      >
        Ver no Google Maps
      </Button>
    </div>
  );
}
