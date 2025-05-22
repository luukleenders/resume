import { NextResponse } from 'next/server';
import { asc, sql } from 'drizzle-orm';

import { db } from '@db';
import { personal } from '@db/schema';
import { Personal } from '@db/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includePrivate = searchParams.get('includePrivate') === 'true';

    const data: Personal[] = await db
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
      .orderBy(asc(personal.id));

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch skills data' }, { status: 500 });
  }
}
