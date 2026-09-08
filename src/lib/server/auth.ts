import { scrypt, randomBytes, timingSafeEqual, createHmac } from 'node:crypto';
import { promisify } from 'node:util';
import { env } from '$env/dynamic/private';

const scryptAsync = promisify(scrypt);

function secret(): string {
	const value = env.AUTH_SECRET;
	if (!value) throw new Error('AUTH_SECRET missing');
	return value;
}

export const cookieName = 'gamolingo_session';

export const sessionCookie = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax' as const,
	secure: true,
	maxAge: 60 * 60 * 24 * 30
};

export async function hashPassword(password: string): Promise<string> {
	const salt = randomBytes(16).toString('hex');
	const buf = (await scryptAsync(password, salt, 32)) as Buffer;
	return `${salt}:${buf.toString('hex')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
	const [salt, hex] = stored.split(':');
	if (!salt || !hex) return false;
	const buf = (await scryptAsync(password, salt, 32)) as Buffer;
	const expected = Buffer.from(hex, 'hex');
	if (buf.length !== expected.length) return false;
	return timingSafeEqual(buf, expected);
}

export function signSession(accountId: string, email: string): string {
	const payload = Buffer.from(JSON.stringify({ accountId, email })).toString('base64url');
	const mac = createHmac('sha256', secret()).update(payload).digest('base64url');
	return `${payload}.${mac}`;
}

export function readSession(token: string | undefined): { accountId: string; email: string } | null {
	if (!token) return null;
	const [payload, mac] = token.split('.');
	if (!payload || !mac) return null;
	const expected = createHmac('sha256', secret()).update(payload).digest('base64url');
	const a = Buffer.from(mac);
	const b = Buffer.from(expected);
	if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
	try {
		return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
	} catch {
		return null;
	}
}

export function readSessionSafe(token: string | undefined): { accountId: string; email: string } | null {
	if (!env.AUTH_SECRET) return null;
	return readSession(token);
}
