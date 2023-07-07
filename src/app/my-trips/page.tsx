'use client';

import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import UserReservationCard from '@/components/UserReservationCard';

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }

    async function getUserReservations() {
      const reservations = await fetch(
        `http://localhost:3000/api/user/${data?.user?.id!}/reservations`
      ).then(response => response.json());

      setReservations(reservations);
    }

    getUserReservations();
  }, [router, status]);

  return (
    <div className='container mx-auto p-5'>
      <h1 className='font-semibold text-primary-dark text-xl'>
        Minhas Viagens
      </h1>

      {reservations.map(reservation => (
        <UserReservationCard
          key={reservation.id}
          reservation={reservation}
        />
      ))}
    </div>
  );
}
