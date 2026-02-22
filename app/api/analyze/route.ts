import { NextRequest, NextResponse } from 'next/server';
import { hashBuffer } from '@/lib/hash';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const imageHash = hashBuffer(buf);

  if (!process.env.VISION_API_KEY) {
    return NextResponse.json({
      imageHash,
      source: 'fallback-manual',
      analysis: {
        category: data.get('category') || 'top',
        dominantHex: data.get('dominantHex') || '#111827',
        secondaryHex: data.get('secondaryHex') || null,
        pattern: data.get('pattern') || 'solid',
        styleTags: (data.get('styleTags')?.toString().split(',') || ['casual'])
      }
    });
  }

  return NextResponse.json({
    imageHash,
    source: 'vision-api-placeholder',
    analysis: { category: 'top', dominantHex: '#111827', secondaryHex: '#D1D5DB', pattern: 'solid', styleTags: ['minimal'] }
  });
}
