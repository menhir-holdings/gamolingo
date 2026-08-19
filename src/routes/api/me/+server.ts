import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cookieName, readSessionSafe } from '$lib/server/auth';

export const GET: RequestHandler = async ({ cookies }) => {
	const session = readSessionSafe(cookies.get(cookieName));
	if (!session) return json({ session: null });
	return json({ session: { email: session.email, mode: 'cloud' } });
};
