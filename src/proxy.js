import { NextResponse } from 'next/server'
import { auth } from './lib/auth' 

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers 
    })

    const { pathname } = request.nextUrl
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    const userRole = session.user?.role 
    if (pathname.startsWith('/dashboard/')) {
        const pathSegments = pathname.split('/')
        const requiredRole = pathSegments[2] 
        if (userRole !== requiredRole) {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard',
        '/cheackOut', 
        '/dashboard/:role/:path*', 
    ]
}