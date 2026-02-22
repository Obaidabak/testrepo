import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ ok: true, message: 'Implement hard-delete rows + storage objects with supabaseAdmin in production.' });
}
