import type { Scenario } from '$lib/types';

export const scenarios: Scenario[] = [
	{
		id: 'mia-mid',
		setup: 'You are bot. Minimap: mid is gone, your ward on river expired.',
		prompt: 'What do you type?',
		options: [
			{
				id: 'a',
				tw: '中路不見',
				pinyin: 'zhōng lù bú jiàn',
				en: 'Mid missing',
				correct: true
			},
			{
				id: 'b',
				tw: '先打小龍',
				pinyin: 'xiān dǎ xiǎo lóng',
				en: 'Dragon first',
				correct: false
			},
			{
				id: 'c',
				tw: '隨便',
				pinyin: 'suí biàn',
				en: 'Whatever',
				correct: false
			}
		]
	},
	{
		id: 'wait-engage',
		setup: 'Your jungler is 8 seconds from the fight. Support already flashed in.',
		prompt: 'Stop the coin flip.',
		roles: ['adc', 'mid', 'top', 'jungle'],
		options: [
			{
				id: 'a',
				tw: '等我',
				pinyin: 'děng wǒ',
				en: 'Wait for me',
				correct: true
			},
			{
				id: 'b',
				tw: '開巴龍',
				pinyin: 'kāi bā lóng',
				en: 'Start Baron',
				correct: false
			},
			{
				id: 'c',
				tw: '我不會',
				pinyin: 'wǒ bú huì',
				en: 'I can’t play that',
				correct: false
			}
		]
	},
	{
		id: 'won-fight',
		setup: 'You ace four of them at dragon pit. One of yours is already walking to their jungle.',
		prompt: 'The TW shotcall is:',
		options: [
			{
				id: 'a',
				tw: '先打龍',
				pinyin: 'xiān dǎ lóng',
				en: 'Dragon first',
				correct: true
			},
			{
				id: 'b',
				tw: '別送',
				pinyin: 'bié sòng',
				en: 'Don’t feed',
				correct: false
			},
			{
				id: 'c',
				tw: '換換',
				pinyin: 'huàn huan',
				en: 'Swap picks',
				correct: false
			}
		]
	},
	{
		id: 'baron-not-free',
		setup: 'They have Elder, you have no vision in pit, three of you are mid.',
		prompt: 'Your jungler types 開巴龍. You reply:',
		options: [
			{
				id: 'a',
				tw: '不行',
				pinyin: 'bù xíng',
				en: 'No / we can’t',
				correct: true
			},
			{
				id: 'b',
				tw: '好局',
				pinyin: 'hǎo jú',
				en: 'Good game',
				correct: false
			},
			{
				id: 'c',
				tw: '我打野',
				pinyin: 'wǒ dǎ yě',
				en: 'I’ll jungle',
				correct: false
			}
		]
	},
	{
		id: 'gank-top',
		setup: 'You are jungle. Top has a fat wave frozen on their side. Enemy top used flash.',
		roles: ['jungle'],
		prompt: 'Tell them you’re coming.',
		options: [
			{
				id: 'a',
				tw: '我來抓',
				pinyin: 'wǒ lái zhuā',
				en: 'I’m coming to gank',
				correct: true
			},
			{
				id: 'b',
				tw: '我鍋',
				pinyin: 'wǒ guō',
				en: 'My fault',
				correct: false
			},
			{
				id: 'c',
				tw: '讓了',
				pinyin: 'ràng le',
				en: 'Give it up',
				correct: false
			}
		]
	},
	{
		id: 'my-bad',
		setup: 'You flashed into their entire team and donated shutdown. Chat is heating.',
		prompt: 'One line, then mute if needed.',
		options: [
			{
				id: 'a',
				tw: '我鍋',
				pinyin: 'wǒ guō',
				en: 'My fault',
				correct: true
			},
			{
				id: 'b',
				tw: '集火',
				pinyin: 'jí huǒ',
				en: 'Focus',
				correct: false
			},
			{
				id: 'c',
				tw: '先鋒',
				pinyin: 'xiān fēng',
				en: 'Herald',
				correct: false
			}
		]
	},
	{
		id: 'dont-engage',
		setup: 'Your Malphite ult is 40 seconds. They want to walk into mid fog.',
		prompt: 'Stop the engage.',
		options: [
			{
				id: 'a',
				tw: '別亂開',
				pinyin: 'bié luàn kāi',
				en: 'Don’t randomly engage',
				correct: true
			},
			{
				id: 'b',
				tw: '插眼',
				pinyin: 'chā yǎn',
				en: 'Ward',
				correct: false
			},
			{
				id: 'c',
				tw: '補兵',
				pinyin: 'bǔ bīng',
				en: 'Last-hit',
				correct: false
			}
		]
	},
	{
		id: 'fill-select',
		setup: 'Champ select. Two people hovered mid. You can play anything poorly.',
		prompt: 'Keep the queue.',
		options: [
			{
				id: 'a',
				tw: '我補',
				pinyin: 'wǒ bǔ',
				en: 'I’ll fill',
				correct: true
			},
			{
				id: 'b',
				tw: '開戰',
				pinyin: 'kāi zhàn',
				en: 'Engage',
				correct: false
			},
			{
				id: 'c',
				tw: '沒閃',
				pinyin: 'méi shǎn',
				en: 'No flash',
				correct: false
			}
		]
	},
	{
		id: 'give-dragon',
		setup: 'You just died bot. They started dragon with 5. Your team has 2 on the map.',
		prompt: 'Don’t donate more.',
		options: [
			{
				id: 'a',
				tw: '讓了',
				pinyin: 'ràng le',
				en: 'Give it',
				correct: true
			},
			{
				id: 'b',
				tw: '開大',
				pinyin: 'kāi dà',
				en: 'Ult now',
				correct: false
			},
			{
				id: 'c',
				tw: '換換',
				pinyin: 'huàn huan',
				en: 'Swap',
				correct: false
			}
		]
	},
	{
		id: 'thanks-gank',
		setup: 'Jungler actually ganked. You got a kill. They are walking out.',
		prompt: 'Be a person.',
		options: [
			{
				id: 'a',
				tw: '謝謝',
				pinyin: 'xiè xie',
				en: 'Thanks',
				correct: true
			},
			{
				id: 'b',
				tw: '別追太深',
				pinyin: 'bié zhuī tài shēn',
				en: 'Don’t chase',
				correct: false
			},
			{
				id: 'c',
				tw: '我盡力了',
				pinyin: 'wǒ jìn lì le',
				en: 'I tried',
				correct: false
			}
		]
	}
];
