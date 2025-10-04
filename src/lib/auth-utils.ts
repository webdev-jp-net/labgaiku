import { getSession, type AuthSession } from './auth';

const PROTECTED_ROUTE_PATTERN = /^\/articles(\/.*)?$/;

const AUTH_FREE_PREFIXES = [
  '/api/auth',
  '/login',
  '/error',
  '/favicon',
  '/_image',
  '/assets',
  '/_astro',
  '/robots',
  '/.well-known',
];

export const SESSION_EXPIRED_ERROR_CODE = 'session_expired';

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PATTERN.test(pathname);
}

export function shouldBypassAuth(pathname: string): boolean {
  return AUTH_FREE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function createLoginRedirectUrl(currentUrl: URL, errorCode?: string): URL {
  const loginUrl = new URL('/login', currentUrl.origin);
  loginUrl.searchParams.set('callbackUrl', currentUrl.pathname + currentUrl.search);

  if (errorCode) {
    loginUrl.searchParams.set('error', errorCode);
  }

  return loginUrl;
}

export function hasAuthSessionCookie(cookieHeader: string | null): boolean {
  if (!cookieHeader) {
    return false;
  }

  return cookieHeader.includes('authjs.session-token');
}

type SessionContext = Parameters<typeof getSession>[0] & {
  locals: App.Locals;
};

export async function loadSession(context: SessionContext): Promise<AuthSession | null> {
  const session = (await getSession(context)) as AuthSession | null;

  if (session?.user) {
    context.locals.session = session;
    context.locals.user = session.user;
    return session;
  }

  context.locals.session = null;
  context.locals.user = null;
  return null;
}
