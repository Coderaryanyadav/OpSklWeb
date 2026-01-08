import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Content Security Policy
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://razorpay.com;"
    );

    // HSTS (Strict-Transport-Security)
    if (request.nextUrl.protocol === 'https:') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains'
        );
    }

    // Route Protection: Check authentication for protected routes
    const protectedRoutes = ['/dashboard', '/wallet', '/messages', '/post-gig', '/verify', '/profile'];
    const clientOnlyRoutes = ['/post-gig'];
    const authRoutes = ['/login', '/signup'];
    const pathname = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    const isClientOnlyRoute = clientOnlyRoutes.some(route => pathname.startsWith(route));

    // Get auth token and role from cookies
    const token = request.cookies.get('sb-access-token')?.value ||
        request.cookies.get('sb-localhost-auth-token')?.value;
    const userRole = request.cookies.get('user-role')?.value;

    // 1. Unauthenticated user accessing protected route
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Authenticated user accessing auth routes
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 3. Role-based protection: Client-only routes
    if (isClientOnlyRoute && userRole === 'provider') {
        const errorUrl = new URL('/dashboard', request.url);
        errorUrl.searchParams.set('error', 'unauthorized_role');
        return NextResponse.redirect(errorUrl);
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except static files and images
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
