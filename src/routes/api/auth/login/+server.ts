import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cookieName, sessionCookie, signSession, verifyPassword } from '$lib/server/auth';
import { findAccount, hasDatabase } from '$lib/server/db';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!hasDatabase()) {
		return json(
			{ error: 'Cloud save is not connected yet. Device save on this browser still works.' },
			{ status: 503 }
		);
	}
	const { email, password } = await request.json();
	if (typeof email !== 'string' || typeof password !== 'string') {
		return json({ error: 'Email and password required.' }, { status: 400 });
	}
	const account = await findAccount(email);
	if (!account || !(await verifyPassword(password, account.password_hash))) {
		return json({ error: 'Wrong email or password.' }, { status: 401 });
	}
	cookies.set(cookieName, signSession(account.id, account.email), sessionCookie);
	return json({ session: { email: account.email, mode: 'cloud' } });
};
