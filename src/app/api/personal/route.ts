import { db } from '../../../db';
import { sql } from 'drizzle-orm';
import { personal } from '../../../db/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includePrivate = searchParams.get('includePrivate') === 'true';

    const data = await db
      .select({
        id: personal.id,
        key: personal.key,
        value: sql<string>`CASE 
          WHEN ${personal.private} = true AND ${includePrivate} = false THEN ''
          ELSE ${personal.value}
        END`,
        private: personal.private,
      })
      .from(personal)
      .orderBy(personal.id);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch personal data' }, { status: 500 });
  }
}
