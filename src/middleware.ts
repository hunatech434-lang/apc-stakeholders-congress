import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'apc-stakeholders-congress-jwt-secret-kwara-2026-prod-secure-key'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Never intercept or loop on /admin/login
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next();
  }

  // 2. Base /admin redirect to dashboard or login
  if (pathname === '/admin' || pathname === '/admin/') {
    const token = request.cookies.get('apc_congress_session')?.value;
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (e) {
        const res = NextResponse.redirect(new URL('/admin/login', request.url));
        res.cookies.delete('apc_congress_session');
        return res;
      }
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 3. Protect all other /admin routes (/admin/dashboard, /admin/forums, etc.)
  if (pathname.startsWith('/admin/')) {
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
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete('apc_congress_session');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
