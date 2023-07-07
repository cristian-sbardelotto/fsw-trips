import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();

  const { userId, tripId, totalPaid, guests, startDate, endDate } = req;

  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (trip) {
    await prisma.tripReservation.create({
      data: {
        userId,
        tripId,
        totalPaid,
        guests,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
      }),
      {
        status: 201,
      }
    );
  }

  return new NextResponse(
    JSON.stringify({
      error: {
        code: 'TRIP_NOT_FOUND',
      },
    }),
    { status: 400 }
  );
}
