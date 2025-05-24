import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = JSON.parse(request.cookies.get('session')?.value || '{}');

  if (request.nextUrl.searchParams.has('includeEmail=true') && !session.email) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (request.nextUrl.searchParams.has('includePhone=true') && !session.fullAccess) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
