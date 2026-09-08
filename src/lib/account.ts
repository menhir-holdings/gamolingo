import type { Profile, Progress } from '$lib/types';

export type Session = { email: string; mode: 'cloud' | 'device' };

async function parse(res: Response): Promise<{ ok: boolean; session?: Session; error?: string; mode?: string }> {
	const body = await res.json().catch(() => ({}));
	return body;
}

export async function me(): Promise<Session | null> {
	try {
		const res = await fetch('/api/me');
		const body = await parse(res);
		return body.session ?? null;
	} catch {
		return null;
	}
}

export async function register(email: string, password: string): Promise<{ session?: Session; error?: string }> {
	const res = await fetch('/api/auth/register', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ email, password })
	});
	return parse(res);
}

export async function login(email: string, password: string): Promise<{ session?: Session; error?: string }> {
	const res = await fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ email, password })
	});
	return parse(res);
}

export async function logout(): Promise<void> {
	await fetch('/api/auth/logout', { method: 'POST' });
}

export async function pullSave(): Promise<{ profile: Profile | null; progress: Progress | null } | null> {
	const res = await fetch('/api/save');
	if (res.status === 401 || res.status === 503) return null;
	if (!res.ok) return null;
	return res.json();
}

export async function pushSave(profile: Profile | null, progress: Progress): Promise<boolean> {
	const res = await fetch('/api/save', {
		method: 'PUT',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ profile, progress })
	});
	return res.ok;
}
