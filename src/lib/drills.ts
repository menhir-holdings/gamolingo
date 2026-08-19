import { phrases } from '$lib/content/phrases';
import { scenarios } from '$lib/content/scenarios';
import { championById, champsForRole, champions } from '$lib/content/champs';
import { trapIds } from '$lib/content/traps';
import type { Drill, ModuleId, Profile, Role } from '$lib/types';

function shuffle<T>(items: T[]): T[] {
	const copy = [...items];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

export function foldPinyin(value: string): string {
	return value
		.normalize('NFD')
		.replace(/\p{M}/gu, '')
		.replace(/\d/g, '')
		.replace(/['’\s-]/g, '')
		.toLowerCase();
}

function pickDistractors(pool: string[], answer: string, n = 3): string[] {
	return shuffle(pool.filter((item) => item !== answer)).slice(0, n);
}

function phrasePool(tags: string[], role: Role) {
	return phrases.filter((phrase) => {
		const tagOk = phrase.tags.some((tag) => tags.includes(tag));
		const roleOk = !phrase.roles || phrase.roles.includes(role) || role === 'fill';
		return tagOk && roleOk;
	});
}

function phraseMcq(id: string, tw: string, pinyin: string, prompt: string, pool: string[]): Drill {
	const labels = shuffle([tw, ...pickDistractors(pool, tw)]);
	return {
		id,
		kind: 'phrase-mcq',
		prompt,
		pinyin,
		answer: tw,
		choices: labels.map((label) => ({
			label,
			pinyin: phrases.find((phrase) => phrase.tw === label)?.pinyin,
			value: label
		}))
	};
}

export function drillsFor(moduleId: ModuleId, profile: Profile): Drill[] {
	const twPool = phrases.map((phrase) => phrase.tw);
	if (moduleId === 'survival') {
		return phrasePool(['survival', 'social'], profile.role)
			.slice(0, 8)
			.flatMap((phrase, index) => {
				const mcq = phraseMcq(
					`${phrase.id}-mcq`,
					phrase.tw,
					phrase.pinyin,
					`${phrase.en} — ${phrase.when}`,
					twPool
				);
				const pinyinDrill: Drill = {
					id: `${phrase.id}-py`,
					kind: 'type-pinyin',
					prompt: `Type pinyin for ${phrase.tw}`,
					hint: phrase.en,
					answer: foldPinyin(phrase.pinyin),
					accept: [foldPinyin(phrase.pinyin), foldPinyin(phrase.tw)]
				};
				return index % 2 === 0 ? [mcq, pinyinDrill] : [mcq];
			})
			.slice(0, 10);
	}

	if (moduleId === 'role') {
		return phrasePool(['role'], profile.role).map((phrase) =>
			phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, `${phrase.en}. ${phrase.when}`, twPool)
		);
	}

	if (moduleId === 'lane') {
		return phrasePool(['lane'], profile.role)
			.slice(0, 8)
			.map((phrase) =>
				phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, twPool)
			);
	}

	if (moduleId === 'objectives') {
		return phrasePool(['objectives'], profile.role).map((phrase) =>
			phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, `${phrase.en}. ${phrase.when}`, twPool)
		);
	}

	if (moduleId === 'fights') {
		return phrasePool(['fight', 'shotcall'], profile.role)
			.slice(0, 8)
			.map((phrase) =>
				phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, twPool)
			);
	}

	if (moduleId === 'select') {
		return phrasePool(['select'], profile.role).map((phrase) =>
			phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, twPool)
		);
	}

	if (moduleId === 'champs') {
		const pool =
			profile.champs.length > 0
				? profile.champs.map((id) => championById(id)).filter((champ) => Boolean(champ))
				: champsForRole(profile.role).slice(0, 12);
		const names = champions.map((champ) => champ.tw);
		return pool.filter((champ) => Boolean(champ)).map((champ) => {
			const row = champ!;
			const choices = shuffle([row.tw, ...pickDistractors(names, row.tw)]).map((label) => ({
				label,
				pinyin: champions.find((item) => item.tw === label)?.pinyin,
				value: label
			}));
			return {
				id: `champ-${row.id}`,
				kind: 'champ-name',
				prompt: `台服 name for ${row.en}?`,
				pinyin: row.pinyin,
				icon: row.icon,
				answer: row.tw,
				choices
			} satisfies Drill;
		});
	}

	if (moduleId === 'traps') {
		const names = champions.map((champ) => champ.tw);
		return trapIds
			.map((id) => championById(id))
			.filter((champ) => Boolean(champ))
			.map((champ) => {
				const row = champ!;
				const choices = shuffle([row.tw, ...pickDistractors(names, row.tw, 3)]).map((label) => ({
					label,
					value: label
				}));
				return {
					id: `trap-${row.id}`,
					kind: 'champ-trap',
					prompt: `CN client calls this「${row.cnName}」. 台服 name?`,
					hint: `${row.en} · ${row.pinyin}`,
					icon: row.icon,
					answer: row.tw,
					choices
				} satisfies Drill;
			});
	}

	if (moduleId === 'sim') {
		return scenarios
			.filter((scenario) => !scenario.roles || scenario.roles.includes(profile.role) || profile.role === 'fill')
			.map((scenario) => {
				const correct = scenario.options.find((option) => option.correct)!;
				return {
					id: `sim-${scenario.id}`,
					kind: 'scenario',
					prompt: `${scenario.setup}\n${scenario.prompt}`,
					pinyin: correct.pinyin,
					answer: correct.tw,
					choices: scenario.options.map((option) => ({
						label: option.tw,
						pinyin: option.pinyin,
						value: option.tw
					}))
				} satisfies Drill;
			});
	}

	return [];
}

export function placementDrills(): Drill[] {
	const profile: Profile = {
		role: 'fill',
		champs: ['Jinx', 'Yasuo', 'LeeSin', 'Ahri', 'Thresh'],
		goal: 'survive',
		hsk: '5-6',
		placementScore: null,
		createdAt: new Date().toISOString()
	};
	return [
		...drillsFor('survival', profile).slice(0, 2),
		...drillsFor('objectives', profile).slice(0, 1),
		...drillsFor('traps', profile).slice(0, 2),
		...drillsFor('sim', profile).slice(0, 1)
	];
}

export function checkAnswer(drill: Drill, given: string): boolean {
	const folded = foldPinyin(given);
	if (drill.kind === 'type-pinyin') {
		return folded === drill.answer || (drill.accept ?? []).includes(folded);
	}
	return given === drill.answer || foldPinyin(given) === foldPinyin(drill.answer);
}
