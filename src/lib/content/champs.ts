import championsPayload from '$lib/content/champions.json';
import type { Champion } from '$lib/types';

export const patchVersion = championsPayload.version;
export const champions = championsPayload.champions as Champion[];

export function championById(id: string): Champion | undefined {
	return champions.find((champ) => champ.id === id);
}

export function champsForRole(role: string): Champion[] {
	if (role === 'fill') return champions;
	return champions.filter((champ) => champ.lanes.includes(role));
}
