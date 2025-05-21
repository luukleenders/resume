import { db } from '../../../db';
import { eq } from 'drizzle-orm';
import { personal } from '../../../db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await db.select().from(personal).where(eq(personal.private, false));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch personal data' }, { status: 500 });
  }
}
