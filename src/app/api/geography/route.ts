import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lgaId = searchParams.get('lgaId');

    // If specific LGA requested, return its wards
    if (lgaId) {
      const wards = await prisma.ward.findMany({
        where: { lgaId: parseInt(lgaId, 10), isActive: true },
        orderBy: { name: 'asc' },
      });
      return NextResponse.json({ wards });
    }

    // Default: Return Kwara State data with districts and LGAs
    const kwara = await prisma.state.findFirst({
      where: { code: 'KW' },
      include: {
        senatorialDistricts: true,
        lgas: {
          where: { isActive: true },
          include: { senatorialDistrict: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    return NextResponse.json({ state: kwara });
  } catch (error) {
    console.error('Geography fetch failed:', error);
    return NextResponse.json({ error: 'Failed to fetch geography data' }, { status: 500 });
  }
}
