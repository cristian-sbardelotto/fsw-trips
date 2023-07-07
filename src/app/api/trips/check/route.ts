import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { differenceInDays, isBefore } from 'date-fns';

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where: {
      id: req.tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_NOT_FOUND',
        },
      })
    );
  }

  if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_START_DATE',
        },
      }),
      {
        status: 400,
      }
    );
  }

  // Data de fim recebida precisa ser menor ou igual a data de fim da viagem
  if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'INVALID_END_DATE',
        },
      }),
      {
        status: 400,
      }
    );
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      // VERIFICA SE EXISTE RESERVA ENTRE AS DATAS
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  });

  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: 'TRIP_ALREADY_RESERVED',
        },
      })
    );
  }

  function calculateTotalPrice() {
    return (
      differenceInDays(new Date(req.endDate), new Date(req.startDate)) *
      +trip?.pricePerDay!
    );
  }

  return new NextResponse(
    JSON.stringify({
      success: true,
      trip,
      totalPrice: calculateTotalPrice(),
    })
  );
}
