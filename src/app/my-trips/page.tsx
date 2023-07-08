'use client';

import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import UserReservationCard from '@/components/UserReservationCard';
import Link from 'next/link';

export default function MyTrips() {
  const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);

  const { data, status } = useSession();
  const router = useRouter();

  async function fetchReservations() {
    const response = await fetch(
      `${process.env.HOST_URL}api/user/${(data?.user as any)?.id}/reservations`
    ).then(response => response.json());

    setReservations(response);
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      return router.push('/');
    }

    fetchReservations();
  }, [status]);

  return (
    <div className='container mx-auto p-5'>
      <h1 className='font-semibold text-primary-dark text-xl'>
        Minhas Viagens
      </h1>

      {reservations.length > 0 ? (
        reservations?.map(reservation => (
          <UserReservationCard
            key={reservation.id}
            reservation={reservation}
            fetchReservations={fetchReservations}
          />
        ))
      ) : (
        <div className='flex flex-col'>
          <p className='mt-2 font-medium text-primary-dark'>
            Você ainda não tem nenhuma reserva! =(
          </p>

          <Link href='/'>
            <Button className='w-full mt-2'>Fazer reserva</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
