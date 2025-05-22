import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';

import { db } from '@db';
import { skills } from '@db/schema';

export async function GET() {
  try {
    const data = await db.select().from(skills).orderBy(asc(skills.id));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills data' }, { status: 500 });
  }
}
