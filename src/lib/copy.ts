export type Gloss = {
	tw: string;
	pinyin: string;
	en: string;
};

export const ui = {
	brand: { tw: '語', pinyin: 'yǔ', en: 'Language' },
	path: { tw: '課表', pinyin: 'kè biǎo', en: 'Lesson path' },
	dex: { tw: '英雄', pinyin: 'yīng xióng', en: 'Champions' },
	sim: { tw: '實戰', pinyin: 'shí zhàn', en: 'Live chat drill' },
	setup: { tw: '配課', pinyin: 'pèi kè', en: 'Build your path' },
	reset: { tw: '重配', pinyin: 'chóng pèi', en: 'Rebuild your path' },
	account: { tw: '進度', pinyin: 'jìn dù', en: 'Saved progress' },
	start: { tw: '開始配課', pinyin: 'kāi shǐ pèi kè', en: 'Start setup' },
	continue: { tw: '繼續', pinyin: 'jì xù', en: 'Continue' },
	next: { tw: '下一題', pinyin: 'xià yī tí', en: 'Next' },
	back: { tw: '上一步', pinyin: 'shàng yī bù', en: 'Back' },
	forward: { tw: '下一步', pinyin: 'xià yī bù', en: 'Next step' },
	results: { tw: '結算', pinyin: 'jié suàn', en: 'Results' },
	correct: { tw: '對', pinyin: 'duì', en: 'Correct' },
	answer: { tw: '是', pinyin: 'shì', en: 'The answer is' },
	skip: { tw: '跳過', pinyin: 'tiào guò', en: 'Skip' },
	place: { tw: '摸底', pinyin: 'mō dǐ', en: 'Placement check' },
	intoPath: { tw: '直接進課表', pinyin: 'zhí jiē jìn kè biǎo', en: 'Skip to path' },
	again: { tw: '再來', pinyin: 'zài lái', en: 'Try again' },
	againGame: { tw: '再來一局', pinyin: 'zài lái yī jú', en: 'Another round' },
	login: { tw: '登入', pinyin: 'dēng rù', en: 'Log in' },
	register: { tw: '註冊', pinyin: 'zhù cè', en: 'Create account' },
	logout: { tw: '登出', pinyin: 'dēng chū', en: 'Log out' },
	save: { tw: '雲端存檔', pinyin: 'yún duān cún dàng', en: 'Cloud save' },
	pass: { tw: '夠用了', pinyin: 'gòu yòng le', en: 'Good enough — next lesson' },
	retry: { tw: '再打一輪', pinyin: 'zài dǎ yī lún', en: 'Run it again. TW chat will not wait for pinyin.' },
	missing: { tw: '沒有這一課', pinyin: 'méi yǒu zhè yī kè', en: 'No lesson with that id' },
	empty: { tw: '這課沒有題', pinyin: 'zhè kè méi yǒu tí', en: 'No drills in this lesson' },
	fluent: { tw: '讀得順', pinyin: 'dú de shùn', en: 'You already read this register' }
} as const satisfies Record<string, Gloss>;

export const roles: { id: 'top' | 'jungle' | 'mid' | 'adc' | 'support' | 'fill'; tw: string; pinyin: string; en: string }[] =
	[
		{ id: 'top', tw: '上路', pinyin: 'shàng lù', en: 'Top' },
		{ id: 'jungle', tw: '打野', pinyin: 'dǎ yě', en: 'Jungle' },
		{ id: 'mid', tw: '中路', pinyin: 'zhōng lù', en: 'Mid' },
		{ id: 'adc', tw: 'ADC', pinyin: 'ADC', en: 'Bot carry' },
		{ id: 'support', tw: '輔助', pinyin: 'fǔ zhù', en: 'Support' },
		{ id: 'fill', tw: '補', pinyin: 'bǔ', en: 'Fill' }
	];
