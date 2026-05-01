import { NextResponse, type NextRequest } from 'next/server';

export const proxy = (request: NextRequest) => {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;
  const user = request.cookies.get('user')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (pathname.includes('/auth/')) {
    if (refreshToken && user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return response;
  }

  if (!refreshToken || !user) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return response;
};

export const config = {
  matcher: [
    '/teams/:path*',
    '/teammates/:path*',
    '/documents/:path*',
    '/',
    '/auth/sign-in',
    '/auth/sign-up',
  ],
};
