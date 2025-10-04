import type { APIRoute } from 'astro';
import { Auth } from '@auth/core';
import { authConfig } from '../../../lib/auth';

export const ALL: APIRoute = async (context) => {
  return Auth(context.request, authConfig);
};
