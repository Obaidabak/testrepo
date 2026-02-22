import { NextRequest, NextResponse } from 'next/server';
import { rankPalettes } from '@/lib/color';

export async function POST(req: NextRequest) {
  const { hex } = await req.json();
  return NextResponse.json({ palettes: rankPalettes(hex || '#111827') });
}
