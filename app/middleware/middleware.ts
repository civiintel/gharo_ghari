import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token'); // Replace with your token mechanism

  if (!token) {
    // Redirect to login if no token
    if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/authForm', req.url));
    }
    return NextResponse.next();
  }

  const userRole = verifyToken(token.value); // Decode and verify your token to get the user role

  if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
    // Redirect non-admins trying to access admin routes
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

function verifyToken(token: string): string {
  // Replace with your token verification logic
  const decoded = JSON.parse(atob(token.split('.')[1])); // Example of decoding a JWT
  return decoded.role;
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'], // Protect these routes
};
