import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { Session } from '@db/types';

export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname.startsWith('/api/verify-email')) {
      return NextResponse.next();
    }

    let session: Session = { email: '', fullAccess: false };
    if (request.cookies.has('session')) {
      session = JSON.parse(request.cookies.get('session')?.value || '{}');
    }

    if (request.headers.get('X-Include-Email') === 'true' && !session.email) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (request.headers.get('X-Include-Phone') === 'true' && !session.fullAccess) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-Include-Email', `${!!session.email}`);
    requestHeaders.set('X-Include-Phone', `${!!session.fullAccess}`);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    const response = new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });

    response.cookies.delete('session');

    return response;
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
