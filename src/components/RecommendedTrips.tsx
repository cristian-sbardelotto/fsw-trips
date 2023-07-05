import { Trip } from '@prisma/client';
import TripItem from './TripItem';

export default async function RecommendedTrips() {
  const trips: Trip[] = await fetch('http://localhost:3000/api/hello').then(
    response => response.json()
  );

  return (
    <div className='container mx-auto p-5'>
      <div className='flex items-center'>
        <div className='w-full h-[1px] bg-gray-light' />

        <h2 className='px-5 font-medium text-gray-primary whitespace-nowrap'>
          Destinos recomendados
        </h2>

        <div className='w-full h-[1px] bg-gray-light' />
      </div>

      <div className='flex flex-col items-center mt-5 gap-5'>
        {trips.map(item => (
          <TripItem
            trip={item}
            key={item.name}
          />
        ))}
      </div>
    </div>
  );
}
