import {NextRequest, NextResponse} from 'next/server'
import {createServerClient} from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function middleware(request: NextRequest) {
    // prepare a mutable response so we can set cookies if Supabase needs to
    const response = NextResponse.next()

    const supabase = createServerClient(
        supabaseUrl!,
        supabaseKey!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    // reflect cookies set by Supabase onto our response
                    cookiesToSet.forEach(({name, value, options}) => {
                        try {
                            response.cookies.set(name, value, options)
                        } catch {
                            // ignore failures to set cookies in middleware runtime
                        }
                    })
                },
            },
        }
    )

    const {data} = await supabase.auth.getSession()
    const session = data?.session ?? null

    const pathname = request.nextUrl.pathname
    const protectedPrefixes = ['/dashboard', '/account', '/settings']
    const authPages = ['/auth/login', '/auth/sign-up', '/auth/forgot-password', '/auth/update-password']

    if (protectedPrefixes.some((p) => pathname.startsWith(p)) && !session) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (authPages.some((p) => pathname.startsWith(p)) && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response
}

export const config = {
    matcher: ['/dashboard/:path*', '/account/:path*', '/settings/:path*', '/auth/:path*'],
}
