/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { AuthSession, AuthUser } from './lib/auth';
import type { FlashMessage } from './lib/error-handler';

declare namespace App {
  interface Locals {
    session: AuthSession | null;
    user: AuthUser | null;
    flash: FlashMessage | null;
  }
}

interface ImportMetaEnv {
  readonly AUTH_SECRET: string;
  readonly AUTH_TRUST_HOST?: string;
  readonly NEXTAUTH_URL?: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GITHUB_CLIENT_ID: string;
  readonly GITHUB_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
