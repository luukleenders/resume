import { NextResponse } from 'next/server';
import { db } from '@db';
import { whitelist } from '@db/schema';
import { eq } from 'drizzle-orm';

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
        hasAccess: true,
      });

      result = await db.select().from(whitelist).where(eq(whitelist.email, email)).limit(1);
    }

    const isWhitelisted = result[0]?.hasAccess ?? false;
    const response = NextResponse.json({ isWhitelisted });

    if (isWhitelisted) {
      response.cookies.set('session', email, {
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
