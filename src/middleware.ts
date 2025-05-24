import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (
    session ||
    !request.nextUrl.pathname.startsWith('/api/') ||
    !request.nextUrl.searchParams.has('includeEmail=true') ||
    !request.nextUrl.searchParams.has('includePhone=true')
  ) {
    return NextResponse.next();
  }

  if (!session) {
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
