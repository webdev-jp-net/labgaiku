import { defineMiddleware } from 'astro:middleware';
import { authenticationMiddleware } from './middleware/auth';

export const onRequest = defineMiddleware((context, next) =>
  authenticationMiddleware(context, next),
);
