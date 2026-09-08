import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { cookieName, readSessionSafe } from '$lib/server/auth';
import { hasDatabase, readSave, writeSave } from '$lib/server/db';

export const GET: RequestHandler = async ({ cookies }) => {
	if (!hasDatabase()) return json({ error: 'no-db' }, { status: 503 });
	const session = readSessionSafe(cookies.get(cookieName));
	if (!session) return json({ error: 'auth' }, { status: 401 });
	const row = await readSave(session.accountId);
	return json({
		profile: row?.profile ?? null,
		progress: row?.progress ?? null
	});
};

export const PUT: RequestHandler = async ({ request, cookies }) => {
	if (!hasDatabase()) return json({ error: 'no-db' }, { status: 503 });
	const session = readSessionSafe(cookies.get(cookieName));
	if (!session) return json({ error: 'auth' }, { status: 401 });
	const { profile, progress } = await request.json();
	await writeSave(session.accountId, profile ?? null, progress ?? null);
	return json({ ok: true });
};
