import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// ログインを許可するドメイン
const allowedDomains = ['tam-tam.co.jp']

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const requestedDomain = user.email?.split('@')[1]

      if (requestedDomain && allowedDomains.includes(requestedDomain)) {
        return true
      }
      // ログインできない場合
      return '/?error=unauthorized'
    },
    async jwt({ token, account, profile }) {
      // 初回ログイン時
      if (account && profile) {
        token.email = profile.email
        token.name = profile.name
        token.image = (profile as { picture?: string }).picture
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
