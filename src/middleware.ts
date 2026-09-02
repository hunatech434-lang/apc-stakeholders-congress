import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'apc-stakeholders-congress-jwt-secret-kwara-2026-prod-secure-key'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Base /admin redirect to dashboard or login
  if (pathname === '/admin' || pathname === '/admin/') {
    const token = request.cookies.get('apc_congress_session')?.value;
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (e) {}
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 2. If user already logged in and visits /admin/login, redirect to dashboard
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    const token = request.cookies.get('apc_congress_session')?.value;
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (e) {}
    }
    return NextResponse.next();
  }

  // 3. Protect all other /admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('apc_congress_session')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
