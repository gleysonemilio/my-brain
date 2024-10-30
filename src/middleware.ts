import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
    const protectedRoute = ['/']
    const cookieStore = cookies()
    const uid = cookieStore.get('uid')?.value

    const isProtectedRoute = protectedRoute.includes(request.nextUrl.pathname)

    if (isProtectedRoute && !uid) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*', '/login/:path*'],
}