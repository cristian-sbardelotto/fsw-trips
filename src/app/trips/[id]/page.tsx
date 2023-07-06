import TripDetailsHeader from '@/components/TripDetailsHeader';
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
    <div className='container mx-auto'>
      <TripDetailsHeader trip={trip} />
      <TripReservation trip={trip} />
    </div>
  );
}
