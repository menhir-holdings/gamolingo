import type { LessonModule, ModuleId, Profile } from '$lib/types';

export const modules: LessonModule[] = [
	{
		id: 'survival',
		titleTw: '先活下來',
		pinyin: 'xiān huó xià lái',
		en: 'Survive chat',
		blurb: 'The ten lines you send before anyone cares about your mechanics.',
		minutes: 6,
		tags: ['survival', 'social']
	},
	{
		id: 'role',
		titleTw: '位置',
		pinyin: 'wèi zhì',
		en: 'Your role',
		blurb: 'What you hover in champ select, said the 台服 way.',
		minutes: 4,
		tags: ['role']
	},
	{
		id: 'champs',
		titleTw: '你的英雄',
		pinyin: 'nǐ de yīng xióng',
		en: 'Your pool',
		blurb: 'English splash names → the Traditional names on this server.',
		minutes: 8,
		tags: []
	},
	{
		id: 'lane',
		titleTw: '對線',
		pinyin: 'duì xiàn',
		en: 'Lane calls',
		blurb: 'Missing, gank, freeze, shove — two characters, not a paragraph.',
		minutes: 6,
		tags: ['lane']
	},
	{
		id: 'objectives',
		titleTw: '目標',
		pinyin: 'mù biāo',
		en: 'Objectives',
		blurb: '小龍, 巴龍, 先鋒. When to start, when to give.',
		minutes: 5,
		tags: ['objectives']
	},
	{
		id: 'fights',
		titleTw: '團戰',
		pinyin: 'tuán zhàn',
		en: 'Fight calls',
		blurb: '開戰, 別亂開, 集火, 撤退. Shotcall without English.',
		minutes: 6,
		tags: ['fight', 'shotcall']
	},
	{
		id: 'select',
		titleTw: '選角',
		pinyin: 'xuǎn jiǎo',
		en: 'Champ select',
		blurb: '我補, 換換, 我不會. Get out of the lobby.',
		minutes: 3,
		tags: ['select']
	},
	{
		id: 'sim',
		titleTw: '實戰',
		pinyin: 'shí zhàn',
		en: 'Live chat',
		blurb: 'Eight seconds. Type what you would send.',
		minutes: 6,
		tags: []
	}
];

const CORE: ModuleId[] = ['survival', 'role', 'champs', 'lane', 'objectives', 'fights', 'select', 'sim'];

export function buildPath(profile: Profile): LessonModule[] {
	const ordered = modules.filter((mod) => CORE.includes(mod.id));
	if (profile.goal === 'survive') {
		return ordered.filter((mod) =>
			['survival', 'role', 'champs', 'lane', 'objectives', 'sim'].includes(mod.id)
		);
	}
	if (profile.goal === 'shotcall') {
		return ordered.filter((mod) =>
			['survival', 'role', 'champs', 'lane', 'objectives', 'fights', 'sim'].includes(mod.id)
		);
	}
	return ordered;
}

export function roleLabel(role: Profile['role']): { tw: string; pinyin: string; en: string } {
	switch (role) {
		case 'top':
			return { tw: '上路', pinyin: 'shàng lù', en: 'Top' };
		case 'jungle':
			return { tw: '打野', pinyin: 'dǎ yě', en: 'Jungle' };
		case 'mid':
			return { tw: '中路', pinyin: 'zhōng lù', en: 'Mid' };
		case 'adc':
			return { tw: 'ADC', pinyin: 'ADC', en: 'ADC' };
		case 'support':
			return { tw: '輔助', pinyin: 'fǔ zhù', en: 'Support' };
		default:
			return { tw: '補', pinyin: 'bǔ', en: 'Fill' };
	}
}
