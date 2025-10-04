import type { MiddlewareHandler } from 'astro';
import {
  SESSION_EXPIRED_ERROR_CODE,
  createLoginRedirectUrl,
  hasAuthSessionCookie,
  isProtectedPath,
  loadSession,
  shouldBypassAuth,
} from '../lib/auth-utils';
import { createFlashMessageFromParams } from '../lib/error-handler';

const DEFAULT_AUTHENTICATED_REDIRECT_PATH = '/articles';

const sanitizeCallbackUrl = (callbackUrl: string | null, base: URL): string => {
  if (!callbackUrl) {
    return DEFAULT_AUTHENTICATED_REDIRECT_PATH;
  }

  try {
    const parsed = new URL(callbackUrl, base.origin);
    if (parsed.origin !== base.origin) {
      return DEFAULT_AUTHENTICATED_REDIRECT_PATH;
    }

    return parsed.pathname + parsed.search;
  } catch (error) {
    console.warn('Invalid callback URL detected', error);
    return DEFAULT_AUTHENTICATED_REDIRECT_PATH;
  }
};

export const authenticationMiddleware: MiddlewareHandler = async (context, next) => {
  const { url, request, locals } = context;
  const pathname = url.pathname;

  locals.flash = createFlashMessageFromParams(url.searchParams);

  const session = await loadSession(context);

  if (session?.user) {
    if (pathname === '/login') {
      const targetPath = sanitizeCallbackUrl(url.searchParams.get('callbackUrl'), url);
      const redirectUrl = new URL(targetPath, url.origin);
      return Response.redirect(redirectUrl, 303);
    }

    return next();
  }

  if (shouldBypassAuth(pathname)) {
    return next();
  }

  if (isProtectedPath(pathname)) {
    const cookieHeader = request.headers.get('cookie');
    const errorCode = hasAuthSessionCookie(cookieHeader) ? SESSION_EXPIRED_ERROR_CODE : undefined;
    const loginUrl = createLoginRedirectUrl(url, errorCode);
    return Response.redirect(loginUrl, 303);
  }

  return next();
};
