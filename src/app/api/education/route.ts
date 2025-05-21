import { db } from '../../../db';
import { education } from '../../../db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await db.select().from(education);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch education data' }, { status: 500 });
  }
}
