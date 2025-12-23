import { NextResponse } from 'next/server';
import { mockSnapshot } from '@/lib/mockSnapshot';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ domain: string }> }
) {
  const { domain } = await params;
  
  // In production, fetch from database based on domain
  // For now, return mock data
  const snapshot = {
    ...mockSnapshot,
    client: {
      ...mockSnapshot.client,
      domain: domain || mockSnapshot.client.domain,
    },
  };

  return NextResponse.json(snapshot);
}




