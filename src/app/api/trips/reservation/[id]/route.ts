import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

type ReservationDeleteRouteProps = {
  params: {
    id: string;
  };
};

export async function DELETE(
  _request: Request,
  { params: { id } }: ReservationDeleteRouteProps
) {
  if (id) {
    const reservation = await prisma.tripReservation.delete({
      where: {
        id,
      },
    });

    return new NextResponse(JSON.stringify(reservation), { status: 200 });
  }

  return {
    status: 400,
    body: {
      message: 'Missing reservationId',
    },
  };
}
