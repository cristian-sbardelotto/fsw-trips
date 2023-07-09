import TripDescription from '@/components/TripDescription';
import TripDetailsHeader from '@/components/TripDetailsHeader';
import TripHighlights from '@/components/TripHighlights';
import TripLocation from '@/components/TripLocation';
import TripReservation from '@/components/TripReservation';
import { prisma } from '@/lib/prisma';

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
    <div className='container mx-auto lg:px-40 lg:pt-10'>
      <TripDetailsHeader trip={trip} />

      <div className='flex flex-col lg:flex-row lg:mt-12 lg:gap-20'>
        <div className='lg:order-2'>
          <TripReservation trip={trip} />
        </div>

        <div className='lg:order-1'>
          <TripDescription tripDescription={trip.description} />
          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>

      <TripLocation
        tripLocation={trip.location}
        tripLocationDescription={trip.locationDescription}
      />
    </div>
  );
}
