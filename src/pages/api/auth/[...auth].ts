import type { APIRoute } from 'astro';
import { Auth } from '@auth/core';
import { authConfig } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  return Auth(request, authConfig);
};

export const POST: APIRoute = async ({ request }) => {
  return Auth(request, authConfig);
};
