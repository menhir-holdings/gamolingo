import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';

let ready = false;

export function hasDatabase(): boolean {
	return Boolean(env.DATABASE_URL);
}

function sql() {
	const url = env.DATABASE_URL;
	if (!url) throw new Error('DATABASE_URL missing');
	return neon(url);
}

export async function ensureSchema(): Promise<void> {
	if (!hasDatabase() || ready) return;
	const db = sql();
	await db`CREATE TABLE IF NOT EXISTS accounts (
		id TEXT PRIMARY KEY,
		email TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		created_at TIMESTAMPTZ DEFAULT now()
	)`;
	await db`CREATE TABLE IF NOT EXISTS saves (
		account_id TEXT PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
		profile JSONB,
		progress JSONB,
		updated_at TIMESTAMPTZ DEFAULT now()
	)`;
	ready = true;
}

export async function createAccount(email: string, passwordHash: string): Promise<{ id: string; email: string }> {
	await ensureSchema();
	const id = crypto.randomUUID();
	const db = sql();
	await db`INSERT INTO accounts (id, email, password_hash) VALUES (${id}, ${email.toLowerCase()}, ${passwordHash})`;
	return { id, email: email.toLowerCase() };
}

export async function findAccount(email: string): Promise<{ id: string; email: string; password_hash: string } | null> {
	await ensureSchema();
	const db = sql();
	const rows = await db`SELECT id, email, password_hash FROM accounts WHERE email = ${email.toLowerCase()} LIMIT 1`;
	return (rows[0] as { id: string; email: string; password_hash: string } | undefined) ?? null;
}

export async function readSave(accountId: string) {
	await ensureSchema();
	const db = sql();
	const rows = await db`SELECT profile, progress FROM saves WHERE account_id = ${accountId} LIMIT 1`;
	return (rows[0] as { profile: unknown; progress: unknown } | undefined) ?? null;
}

export async function writeSave(accountId: string, profile: unknown, progress: unknown) {
	await ensureSchema();
	const db = sql();
	await db`INSERT INTO saves (account_id, profile, progress, updated_at)
		VALUES (${accountId}, ${profile}, ${progress}, now())
		ON CONFLICT (account_id) DO UPDATE SET
			profile = excluded.profile,
			progress = excluded.progress,
			updated_at = now()`;
}
