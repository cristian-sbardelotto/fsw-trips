'use client';

import { TripReservation } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MyTrips() {
  const [reservations, setReservations] = useState<TripReservation[]>();
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

  console.log({ reservations });

  return <div>My trips</div>;
}
