import type { Phrase } from '$lib/types';

export const phrases: Phrase[] = [
	{
		id: 'deng-wo',
		tw: '等我',
		pinyin: 'děng wǒ',
		en: 'Wait for me',
		when: 'You are recalling, walking, or not in range. The most useful line in soloQ.',
		tags: ['survival', 'fight']
	},
	{
		id: 'bu-yao-da',
		tw: '不要打',
		pinyin: 'bú yào dǎ',
		en: 'Don’t fight',
		when: 'They are walking up for a bad 2v2 or 4v5.',
		tags: ['survival', 'fight']
	},
	{
		id: 'xiao-xin',
		tw: '小心',
		pinyin: 'xiǎo xīn',
		en: 'Careful',
		when: 'Missing laner, ward expired, or you saw the jungler.',
		tags: ['survival', 'lane']
	},
	{
		id: 'xie-xie',
		tw: '謝謝',
		pinyin: 'xiè xie',
		en: 'Thanks',
		when: 'After a gank, peel, or they cover your wave. TW chat uses this more than English gg.',
		tags: ['survival', 'social']
	},
	{
		id: 'bu-hao-yi-si',
		tw: '不好意思',
		pinyin: 'bù hǎo yì si',
		en: 'Sorry / my bad (polite)',
		when: 'You inted a spell or stole a camp. More Taiwan than 對不起 in this register.',
		tags: ['survival', 'social']
	},
	{
		id: 'wo-guo',
		tw: '我鍋',
		pinyin: 'wǒ guō',
		en: 'My fault (literally: my wok / the blame)',
		when: 'You threw the fight. Faster and more native than a paragraph of English.',
		tags: ['survival', 'social']
	},
	{
		id: 'bie-song',
		tw: '別送',
		pinyin: 'bié sòng',
		en: 'Don’t feed / don’t die',
		when: 'Teammate is walking into fog for the third time.',
		tags: ['survival', 'fight']
	},
	{
		id: 'wo-lai',
		tw: '我來',
		pinyin: 'wǒ lái',
		en: 'I got it / I’ll do it',
		when: 'Smite, wave, baron take, or you will engage.',
		tags: ['survival', 'objectives', 'fight']
	},
	{
		id: 'deng-deng',
		tw: '等等',
		pinyin: 'děng děng',
		en: 'Hold on / one sec',
		when: 'You need two seconds to finish the wave or buy.',
		tags: ['survival']
	},
	{
		id: 'zou',
		tw: '走',
		pinyin: 'zǒu',
		en: 'Go / leave / reset',
		when: 'The fight is over. Walk out.',
		tags: ['survival', 'fight']
	},
	{
		id: 'hui',
		tw: '回',
		pinyin: 'huí',
		en: 'Back / recall',
		when: 'You or they should base. Also: 我回.',
		tags: ['survival', 'lane']
	},
	{
		id: 'mei-shan',
		tw: '沒閃',
		pinyin: 'méi shǎn',
		en: 'No flash',
		when: 'You burned it or you saw theirs. 閃 = flash.',
		tags: ['survival', 'lane', 'fight']
	},
	{
		id: 'you-shan',
		tw: '有閃',
		pinyin: 'yǒu shǎn',
		en: 'Has flash',
		when: 'Do not all-in unless you account for it.',
		tags: ['lane', 'fight']
	},
	{
		id: 'ke-yi',
		tw: '可以',
		pinyin: 'kě yǐ',
		en: 'Yes / we can',
		when: 'Agreeing to dragon, a dive, or a swap.',
		tags: ['survival', 'objectives']
	},
	{
		id: 'bu-xing',
		tw: '不行',
		pinyin: 'bù xíng',
		en: 'No / we can’t',
		when: 'Baron is not free. Say this instead of a novel.',
		tags: ['survival', 'objectives']
	},
	{
		id: 'shang-lu',
		tw: '上路',
		pinyin: 'shàng lù',
		en: 'Top lane',
		when: 'Pings and missing calls. 路 = lane.',
		tags: ['role'],
		roles: ['top', 'jungle', 'fill']
	},
	{
		id: 'zhong-lu',
		tw: '中路',
		pinyin: 'zhōng lù',
		en: 'Mid lane',
		when: 'SS mid is 中路不見. English SS is also native.',
		tags: ['role'],
		roles: ['mid', 'jungle', 'fill']
	},
	{
		id: 'xia-lu',
		tw: '下路',
		pinyin: 'xià lù',
		en: 'Bot lane',
		when: 'ADC + support side. Not 底部.',
		tags: ['role'],
		roles: ['adc', 'support', 'jungle', 'fill']
	},
	{
		id: 'da-ye',
		tw: '打野',
		pinyin: 'dǎ yě',
		en: 'Jungle / jungler',
		when: 'The role and the person. JG is fine too.',
		tags: ['role'],
		roles: ['jungle', 'fill']
	},
	{
		id: 'fu-zhu',
		tw: '輔助',
		pinyin: 'fǔ zhù',
		en: 'Support',
		when: 'The role. SUP is also used.',
		tags: ['role'],
		roles: ['support', 'adc', 'fill']
	},
	{
		id: 'bu',
		tw: '補',
		pinyin: 'bǔ',
		en: 'Fill (also: last-hit, as in 補兵)',
		when: 'Champ select: 我補. In lane 補兵 is CS.',
		tags: ['role', 'select', 'lane']
	},
	{
		id: 'bu-bing',
		tw: '補兵',
		pinyin: 'bǔ bīng',
		en: 'Last-hit minions',
		when: 'Farm, don’t randomly auto the wave.',
		tags: ['lane']
	},
	{
		id: 'tui-xian',
		tw: '推線',
		pinyin: 'tuī xiàn',
		en: 'Push the wave',
		when: 'Shove before you roam or before dragon.',
		tags: ['lane']
	},
	{
		id: 'kong-xian',
		tw: '控線',
		pinyin: 'kòng xiàn',
		en: 'Control / freeze the wave',
		when: 'You want them to overextend for a gank.',
		tags: ['lane']
	},
	{
		id: 'bu-jian',
		tw: '不見',
		pinyin: 'bú jiàn',
		en: 'Missing',
		when: '中路不見 = mid MIA. Same job as SS.',
		tags: ['lane', 'survival']
	},
	{
		id: 'lai-le',
		tw: '來了',
		pinyin: 'lái le',
		en: 'Incoming / they’re coming',
		when: 'You see the gank. Type it or ping. Both.',
		tags: ['lane', 'survival']
	},
	{
		id: 'zhua',
		tw: '抓',
		pinyin: 'zhuā',
		en: 'Gank',
		when: '打野來抓上路. 抓 = grab / catch.',
		tags: ['lane'],
		roles: ['jungle', 'mid']
	},
	{
		id: 'huan-xue',
		tw: '換血',
		pinyin: 'huàn xuè',
		en: 'Trade (HP)',
		when: 'Short all-in in lane, not a full fight.',
		tags: ['lane']
	},
	{
		id: 'xiao-hao',
		tw: '消耗',
		pinyin: 'xiāo hào',
		en: 'Poke / chip',
		when: 'Whittle them, don’t commit.',
		tags: ['lane']
	},
	{
		id: 'you-zou',
		tw: '遊走',
		pinyin: 'yóu zǒu',
		en: 'Roam',
		when: 'Leaving lane to make a play. 支援 is “come help”.',
		tags: ['lane'],
		roles: ['mid', 'support', 'jungle']
	},
	{
		id: 'zhi-yuan',
		tw: '支援',
		pinyin: 'zhī yuán',
		en: 'Come help / rotate',
		when: 'Ask for the roam. 打野來支援.',
		tags: ['lane', 'fight']
	},
	{
		id: 'fan-da',
		tw: '反打',
		pinyin: 'fǎn dǎ',
		en: 'Turn / fight back',
		when: 'They overcommit. Now you take the fight.',
		tags: ['lane', 'fight']
	},
	{
		id: 'xiao-long',
		tw: '小龍',
		pinyin: 'xiǎo lóng',
		en: 'Dragon',
		when: 'Not 元素龍 in chat. 先打小龍.',
		tags: ['objectives']
	},
	{
		id: 'ba-long',
		tw: '巴龍',
		pinyin: 'bā lóng',
		en: 'Baron',
		when: 'Baron. 開巴龍 to start it, 讓了 if it is not free.',
		tags: ['objectives']
	},
	{
		id: 'xian-feng',
		tw: '先鋒',
		pinyin: 'xiān fēng',
		en: 'Herald',
		when: '河道先鋒, shortened. Take it when dragon is not up.',
		tags: ['objectives']
	},
	{
		id: 'xian-da-long',
		tw: '先打龍',
		pinyin: 'xiān dǎ lóng',
		en: 'Dragon first',
		when: 'After a won fight, stop chasing, hit the objective.',
		tags: ['objectives', 'shotcall']
	},
	{
		id: 'xian-tui-ta',
		tw: '先推塔',
		pinyin: 'xiān tuī tǎ',
		en: 'Tower first',
		when: 'Plates / inhib matter more than a 20-second chase.',
		tags: ['objectives', 'shotcall']
	},
	{
		id: 'kai-ba-long',
		tw: '開巴龍',
		pinyin: 'kāi bā lóng',
		en: 'Start Baron',
		when: 'You have vision and numbers. 開 = start it.',
		tags: ['objectives', 'shotcall']
	},
	{
		id: 'rang-le',
		tw: '讓了',
		pinyin: 'ràng le',
		en: 'Give it up / let them have it',
		when: 'Contested dragon you will lose. Reset.',
		tags: ['objectives']
	},
	{
		id: 'cha-yan',
		tw: '插眼',
		pinyin: 'chā yǎn',
		en: 'Ward',
		when: 'Ask support or yourself to drop vision. 幫插眼.',
		tags: ['objectives', 'lane'],
		roles: ['support', 'jungle']
	},
	{
		id: 'pai-yan',
		tw: '排眼',
		pinyin: 'pái yǎn',
		en: 'Sweep / clear wards',
		when: 'Before Baron or a dive.',
		tags: ['objectives'],
		roles: ['support', 'jungle']
	},
	{
		id: 'shi-ye',
		tw: '視野',
		pinyin: 'shì yě',
		en: 'Vision',
		when: '沒視野 = we are blind. Don’t start Baron.',
		tags: ['objectives']
	},
	{
		id: 'kai-zhan',
		tw: '開戰',
		pinyin: 'kāi zhàn',
		en: 'Engage / start the fight',
		when: '等我開戰. 別亂開 = don’t randomly engage.',
		tags: ['fight', 'shotcall']
	},
	{
		id: 'bie-luan-kai',
		tw: '別亂開',
		pinyin: 'bié luàn kāi',
		en: 'Don’t randomly engage',
		when: 'Flash-in from a mile away energy.',
		tags: ['fight', 'shotcall']
	},
	{
		id: 'tuan-zhan',
		tw: '團戰',
		pinyin: 'tuán zhàn',
		en: 'Teamfight',
		when: 'Also 會戰 on some TW streams. 團戰 is understood everywhere.',
		tags: ['fight']
	},
	{
		id: 'ji-he',
		tw: '集合',
		pinyin: 'jí hé',
		en: 'Group up',
		when: 'Mid for the next objective. Stop split-pushing into fog.',
		tags: ['fight', 'shotcall']
	},
	{
		id: 'che-tui',
		tw: '撤退',
		pinyin: 'chè tuì',
		en: 'Retreat',
		when: 'More formal than 走; use either.',
		tags: ['fight']
	},
	{
		id: 'bie-zhui',
		tw: '別追太深',
		pinyin: 'bié zhuī tài shēn',
		en: 'Don’t chase too deep',
		when: 'They are running into their jungle. You will donate shutdowns.',
		tags: ['fight', 'shotcall']
	},
	{
		id: 'kai-da',
		tw: '開大',
		pinyin: 'kāi dà',
		en: 'Ult (now)',
		when: 'Your Malphite / Amumu is waiting for a written invitation.',
		tags: ['fight']
	},
	{
		id: 'ji-huo',
		tw: '集火',
		pinyin: 'jí huǒ',
		en: 'Focus (this target)',
		when: 'Plus a ping on the carry.',
		tags: ['fight', 'shotcall']
	},
	{
		id: 'bao-hu',
		tw: '保護',
		pinyin: 'bǎo hù',
		en: 'Peel / protect',
		when: 'Peel the ADC instead of running at theirs.',
		tags: ['fight'],
		roles: ['support', 'top']
	},
	{
		id: 'wo-da-ye',
		tw: '我打野',
		pinyin: 'wǒ dǎ yě',
		en: 'I’ll jungle',
		when: 'Champ select claim. Swap the role, not a paragraph.',
		tags: ['select'],
		roles: ['jungle']
	},
	{
		id: 'wo-bu',
		tw: '我補',
		pinyin: 'wǒ bǔ',
		en: 'I’ll fill',
		when: 'Last pick, keep the queue.',
		tags: ['select']
	},
	{
		id: 'huan-huan',
		tw: '換換',
		pinyin: 'huàn huan',
		en: 'Swap (picks)',
		when: 'Hover the champ they need, type 換換, trade.',
		tags: ['select']
	},
	{
		id: 'sui-bian',
		tw: '隨便',
		pinyin: 'suí biàn',
		en: 'Whatever / you pick',
		when: 'You truly do not care. Dangerous if you then dodge.',
		tags: ['select']
	},
	{
		id: 'wo-bu-hui',
		tw: '我不會',
		pinyin: 'wǒ bú huì',
		en: 'I can’t play that',
		when: 'They hovered you a champ you will int. Honest.',
		tags: ['select']
	},
	{
		id: 'wen',
		tw: '穩',
		pinyin: 'wěn',
		en: 'Play safe / stable',
		when: 'Behind, or they want a coin-flip fight. 打穩一點.',
		tags: ['select', 'fight', 'shotcall']
	},
	{
		id: 'hao-ju',
		tw: '好局',
		pinyin: 'hǎo jú',
		en: 'Good game (loading / start)',
		when: 'Optional. Not required. Don’t spam it after a loss.',
		tags: ['social', 'select']
	},
	{
		id: 'wo-jin-li',
		tw: '我盡力了',
		pinyin: 'wǒ jìn lì le',
		en: 'I tried my best',
		when: 'After a loss, instead of English copium.',
		tags: ['social']
	}
];
