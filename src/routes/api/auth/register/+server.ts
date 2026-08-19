import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cookieName, hashPassword, sessionCookie, signSession } from '$lib/server/auth';
import { createAccount, findAccount, hasDatabase } from '$lib/server/db';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!hasDatabase()) {
		return json(
			{ error: 'Cloud save is not connected yet. Device save on this browser still works.' },
			{ status: 503 }
		);
	}
	const { email, password } = await request.json();
	if (typeof email !== 'string' || typeof password !== 'string' || password.length < 8) {
		return json({ error: 'Email and an 8+ character password.' }, { status: 400 });
	}
	if (await findAccount(email)) {
		return json({ error: 'That email is already registered.' }, { status: 409 });
	}
	const account = await createAccount(email, await hashPassword(password));
	cookies.set(cookieName, signSession(account.id, account.email), sessionCookie);
	return json({ session: { email: account.email, mode: 'cloud' } });
};
