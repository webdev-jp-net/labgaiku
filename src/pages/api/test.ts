import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: 'API is working',
    env: {
      hasAuthSecret: !!import.meta.env.AUTH_SECRET,
      hasGoogleClientId: !!import.meta.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!import.meta.env.GOOGLE_CLIENT_SECRET,
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
