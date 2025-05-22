import { NextResponse } from 'next/server';
import { db } from '@db';
import { whitelist } from '@db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const result = await db
      .select()
      .from(whitelist)
      .where(and(eq(whitelist.email, email), eq(whitelist.hasAccess, true)))
      .limit(1);
    const isWhitelisted = result.length > 0;

    const response = NextResponse.json({ isWhitelisted });

    if (isWhitelisted) {
      console.log('Setting session cookie');
      response.cookies.set('session', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
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
