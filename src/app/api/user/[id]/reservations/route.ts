import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type UserReservationsRouteProps = {
  params: {
    id: string;
  };
};

export async function GET(
  request: Request,
  { params: { id } }: UserReservationsRouteProps
) {
  if (!id) {
    return {
      status: 400,
      body: {
        message: 'Missing userId',
      },
    };
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: id,
    },
    include: {
      trip: true,
    },
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
