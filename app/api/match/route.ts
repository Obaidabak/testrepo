import { NextRequest, NextResponse } from 'next/server';
import { buildOutfits } from '@/lib/matching';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const outfits = buildOutfits(body.analysis, body.userStyles || ['casual']);
  return NextResponse.json({ outfits: outfits.slice(0, 8) });
}
