import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {

        return NextResponse.redirect(new URL('/login', request.url))
    }
}



export const config = {
    matcher: [
        '/dashboard',
        '/cheackOut',
        '/dashboard/:role',
        '/dashboard/:role/addProduct',
        '/dashboard/:role/myProducts',
        '/dashboard/:role/my-orders',
        '/dashboard/:role/wishlist',
        '/dashboard/:role/manage-users',
        '/dashboard/:role/profile',
    ]
}