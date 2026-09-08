import { phrases } from '$lib/content/phrases';
import { scenarios } from '$lib/content/scenarios';
import { championById, champsForRole, champions } from '$lib/content/champs';
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

function phraseMcq(id: string, tw: string, pinyin: string, prompt: string, meaning: string, pool: string[]): Drill {
	const labels = shuffle([tw, ...pickDistractors(pool, tw)]);
	return {
		id,
		kind: 'phrase-mcq',
		prompt,
		pinyin,
		meaning,
		answer: tw,
		choices: labels.map((label) => {
			const phrase = phrases.find((item) => item.tw === label);
			return {
				label,
				pinyin: phrase?.pinyin,
				en: phrase?.en,
				value: label
			};
		})
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
					phrase.when,
					phrase.en,
					twPool
				);
				const pinyinDrill: Drill = {
					id: `${phrase.id}-py`,
					kind: 'type-pinyin',
					prompt: phrase.tw,
					hint: phrase.en,
					pinyin: phrase.pinyin,
					meaning: phrase.en,
					answer: foldPinyin(phrase.pinyin),
					accept: [foldPinyin(phrase.pinyin)]
				};
				return index % 2 === 0 ? [mcq, pinyinDrill] : [mcq];
			})
			.slice(0, 10);
	}

	if (moduleId === 'role') {
		return phrasePool(['role'], profile.role).map((phrase) =>
			phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, phrase.en, twPool)
		);
	}

	if (moduleId === 'lane') {
		return phrasePool(['lane'], profile.role)
			.slice(0, 8)
			.map((phrase) =>
				phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, phrase.en, twPool)
			);
	}

	if (moduleId === 'objectives') {
		return phrasePool(['objectives'], profile.role).map((phrase) =>
			phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, phrase.en, twPool)
		);
	}

	if (moduleId === 'fights') {
		return phrasePool(['fight', 'shotcall'], profile.role)
			.slice(0, 8)
			.map((phrase) =>
				phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, phrase.en, twPool)
			);
	}

	if (moduleId === 'select') {
		return phrasePool(['select'], profile.role).map((phrase) =>
			phraseMcq(`${phrase.id}-mcq`, phrase.tw, phrase.pinyin, phrase.when, phrase.en, twPool)
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
			const choices = shuffle([row.tw, ...pickDistractors(names, row.tw)]).map((label) => {
				const match = champions.find((item) => item.tw === label);
				return {
					label,
					pinyin: match?.pinyin,
					en: match?.en,
					value: label
				};
			});
			return {
				id: `champ-${row.id}`,
				kind: 'champ-name' as const,
				prompt: row.en,
				pinyin: row.pinyin,
				meaning: row.tw,
				icon: row.icon,
				answer: row.tw,
				choices
			};
		});
	}

	if (moduleId === 'sim') {
		return scenarios
			.filter(
				(scenario) => !scenario.roles || scenario.roles.includes(profile.role) || profile.role === 'fill'
			)
			.map((scenario) => {
				const correct = scenario.options.find((option) => option.correct)!;
				return {
					id: `sim-${scenario.id}`,
					kind: 'scenario' as const,
					prompt: `${scenario.setup}\n${scenario.prompt}`,
					pinyin: correct.pinyin,
					meaning: correct.en,
					answer: correct.tw,
					choices: scenario.options.map((option) => ({
						label: option.tw,
						pinyin: option.pinyin,
						en: option.en,
						value: option.tw
					}))
				};
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
		...drillsFor('champs', profile).slice(0, 2),
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
