import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    token: 'mock-token',
    requiresMfa: true,
    user: { id: 'U001', username: 'dokter.andi', role: 'dokter', unit: 'IGD' }
  });
}
