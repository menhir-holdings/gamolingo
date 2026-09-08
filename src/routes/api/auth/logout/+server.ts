import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cookieName } from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete(cookieName, { path: '/' });
	return json({ ok: true });
};
