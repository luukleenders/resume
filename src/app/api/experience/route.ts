import { db } from '../../../db';
import { experiences } from '../../../db/schema';
import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db.select().from(experiences).orderBy(asc(experiences.id));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch experience data' }, { status: 500 });
  }
}
