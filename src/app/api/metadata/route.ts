import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';

import { db } from '@db';
import { metadata } from '@db/schema';

export async function GET() {
  try {
    const data = await db.select().from(metadata).orderBy(asc(metadata.id));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch metadata data' }, { status: 500 });
  }
}
