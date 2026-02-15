import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証不要のパス
const publicPaths = ['/', '/api/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 認証不要のパスの場合は次のミドルウェアを実行
  if (publicPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })

  // 認証が必要なパスの場合は認証を確認してリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
