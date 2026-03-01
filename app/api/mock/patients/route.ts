import { NextResponse } from 'next/server';
import { mockPatients } from '@/services/mock-services';

export async function GET() {
  return NextResponse.json(mockPatients);
}
