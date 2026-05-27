import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const apartments = await prisma.apartment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(apartments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch apartments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apartment = await prisma.apartment.create({
      data: body,
    });
    return NextResponse.json(apartment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create apartment' }, { status: 500 });
  }
}
