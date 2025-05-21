import { db } from '../../../db';
import { experiences } from '../../../db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await db.select().from(experiences);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch experience data' }, { status: 500 });
  }
}
