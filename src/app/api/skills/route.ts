import { db } from '../../../db';
import { skills } from '../../../db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await db.select().from(skills);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills data' }, { status: 500 });
  }
}
