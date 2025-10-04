import { Auth, type AuthConfig } from '@auth/core';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import type { Session } from '@auth/core/types';

export type AuthProvider = 'google' | 'github';

export interface AuthUser {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
  provider: AuthProvider;
}

export type AuthSession = Session & {
  user: AuthUser;
};

const resolveEnv = (key: string, defaultValue = ''): string => {
  const fromImportMeta = (import.meta.env as Record<string, string | undefined>)[key];
  if (fromImportMeta) {
    return fromImportMeta;
  }

  const fromProcess = process.env[key];
  if (fromProcess) {
    return fromProcess;
  }

  return defaultValue;
};

const config = {
  secret: resolveEnv('AUTH_SECRET'),
  trustHost: resolveEnv('AUTH_TRUST_HOST', 'true') !== 'false',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  providers: [
    Google({
      clientId: resolveEnv('GOOGLE_CLIENT_ID'),
      clientSecret: resolveEnv('GOOGLE_CLIENT_SECRET'),
    }),
    GitHub({
      clientId: resolveEnv('GITHUB_CLIENT_ID'),
      clientSecret: resolveEnv('GITHUB_CLIENT_SECRET'),
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider) {
        token.provider = account.provider;
      }

      if (user?.id) {
        token.sub = user.id;
      }

      if (profile) {
        if (account?.provider === 'github') {
          const githubProfile = profile as Record<string, unknown>;
          token.name =
            (githubProfile.name as string | undefined) ??
            (githubProfile.login as string | undefined) ??
            token.name;
          token.email =
            (githubProfile.email as string | undefined) ??
            token.email;
          token.picture =
            (githubProfile.avatar_url as string | undefined) ?? token.picture;
        }

        if (account?.provider === 'google') {
          const googleProfile = profile as Record<string, unknown>;
          token.name =
            (googleProfile.name as string | undefined) ?? token.name ?? undefined;
          token.email =
            (googleProfile.email as string | undefined) ?? token.email ?? undefined;
          token.picture =
            (googleProfile.picture as string | undefined) ?? token.picture ?? undefined;
        }
      }

      return token;
    },
    async session({ session, token }) {
      const authUser: AuthUser = {
        id: (token.sub as string | undefined) ?? '',
        name:
          session.user?.name ??
          (token.name as string | undefined) ??
          'ゲストユーザー',
        email:
          session.user?.email ??
          (token.email as string | undefined) ??
          null,
        image:
          session.user?.image ??
          (token.picture as string | undefined) ??
          null,
        provider: (token.provider as AuthProvider | undefined) ?? 'google',
      };

      (session.user as AuthUser) = authUser;

      return session as AuthSession;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }

      try {
        const parsedUrl = new URL(url);
        if (parsedUrl.origin === baseUrl) {
          return url;
        }
      } catch (error) {
        console.warn('Invalid redirect URL detected', error);
      }

      return baseUrl;
    },
  },
} satisfies AuthConfig;

// Astro用のAuth.js設定をエクスポート
export const authConfig = config;

// Auth.jsハンドラーをエクスポート
export const handlers = Auth(config);
