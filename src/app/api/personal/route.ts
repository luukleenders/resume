import { NextResponse } from 'next/server';
import { asc, sql } from 'drizzle-orm';

import { db } from '@db';
import { personal } from '@db/schema';
import type { Personal } from '@db/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeEmail = searchParams.get('includeEmail') === 'true';
    const includePhone = searchParams.get('includePhone') === 'true';

    const data: Personal[] = await db
      .select({
        id: personal.id,
        key: personal.key,
        value: sql<string>`CASE 
          WHEN ${personal.key} = 'E-mail' AND ${includeEmail} = false THEN 'access@denied.com'
          WHEN ${personal.key} = 'Phone' AND ${includePhone} = false THEN '+00 0 00 00 00 00'
          ELSE ${personal.value}
        END`,
        private: personal.private,
      })
      .from(personal)
      .orderBy(asc(personal.id));

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch personal data' }, { status: 500 });
  }
}
