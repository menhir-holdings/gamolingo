import type { LessonModule, ModuleId, Profile } from '$lib/types';

export const modules: LessonModule[] = [
	{
		id: 'survival',
		title: 'Survive chat',
		titleTw: '先活下來',
		blurb: 'Ten lines that cover 80% of soloQ. Wait, don’t, sorry, thanks.',
		minutes: 6,
		tags: ['survival', 'social']
	},
	{
		id: 'role',
		title: 'Your role',
		titleTw: '位置',
		blurb: '上路中路下路打野輔助 — typed, not translated from English.',
		minutes: 4,
		tags: ['role']
	},
	{
		id: 'champs',
		title: 'Your pool',
		titleTw: '你的英雄',
		blurb: 'EN → 台服 names for the champs you actually hover.',
		minutes: 8,
		tags: []
	},
	{
		id: 'lane',
		title: 'Lane calls',
		titleTw: '對線',
		blurb: 'Missing, gank, freeze, shove. The 2-character pings.',
		minutes: 6,
		tags: ['lane']
	},
	{
		id: 'objectives',
		title: 'Dragons and Baron',
		titleTw: '目標',
		blurb: '小龍 and 巴龍 — not 大龍. When to start, when to give.',
		minutes: 5,
		tags: ['objectives']
	},
	{
		id: 'fights',
		title: 'Fight calls',
		titleTw: '團戰',
		blurb: '開戰, 別亂開, 集火, 撤退. Shotcalling without a paragraph.',
		minutes: 6,
		tags: ['fight', 'shotcall']
	},
	{
		id: 'select',
		title: 'Champ select',
		titleTw: '選角',
		blurb: '我補, 換換, 我不會. Get out of the lobby.',
		minutes: 3,
		tags: ['select']
	},
	{
		id: 'traps',
		title: 'CN name traps',
		titleTw: '陸服陷阱',
		blurb: '寒冰 is Ashe. 盲僧 is Lee Sin. 台服 will not know what you mean — or will know you typed CN.',
		minutes: 7,
		tags: []
	},
	{
		id: 'sim',
		title: 'Chat sim',
		titleTw: '實戰',
		blurb: 'Timed scenarios. Eight seconds. What you would actually type.',
		minutes: 6,
		tags: []
	}
];

const CORE: ModuleId[] = ['survival', 'role', 'champs', 'lane', 'objectives', 'fights', 'select', 'traps', 'sim'];

export function buildPath(profile: Profile): LessonModule[] {
	const ordered = modules.filter((mod) => CORE.includes(mod.id));
	if (profile.goal === 'survive') {
		return ordered.filter((mod) =>
			['survival', 'role', 'champs', 'lane', 'objectives', 'sim'].includes(mod.id)
		);
	}
	if (profile.goal === 'shotcall') {
		return ordered.filter((mod) => mod.id !== 'traps' || profile.hsk !== '3-4');
	}
	return ordered;
}

export function roleLabel(role: Profile['role']): { tw: string; en: string } {
	switch (role) {
		case 'top':
			return { tw: '上路', en: 'Top' };
		case 'jungle':
			return { tw: '打野', en: 'Jungle' };
		case 'mid':
			return { tw: '中路', en: 'Mid' };
		case 'adc':
			return { tw: 'ADC', en: 'ADC' };
		case 'support':
			return { tw: '輔助', en: 'Support' };
		default:
			return { tw: '補位', en: 'Fill' };
	}
}
