import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@db';
import { whitelist } from '@db/schema';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let result = await db.select().from(whitelist).where(eq(whitelist.email, email)).limit(1);
    if (result.length === 0) {
      await db.insert(whitelist).values({
        email,
        hasAccess: false,
      });

      result = await db.select().from(whitelist).where(eq(whitelist.email, email)).limit(1);
    }

    const isWhitelisted = result.length > 0;
    const fullAccess = result[0]?.hasAccess ?? false;
    const response = NextResponse.json({ isWhitelisted, fullAccess });

    if (isWhitelisted) {
      response.cookies.set('session', JSON.stringify({ email, fullAccess }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      });
    } else {
      response.cookies.delete('session');
    }

    return response;
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
