export type Role = 'top' | 'jungle' | 'mid' | 'adc' | 'support' | 'fill';
export type Goal = 'survive' | 'shotcall' | 'full';
export type HskBand = '3-4' | '5-6' | 'fluent';

export type Champion = {
	id: string;
	key: string;
	en: string;
	tw: string;
	twTitle: string;
	pinyin: string;
	tags: string[];
	lanes: string[];
	icon: string;
};

export type Phrase = {
	id: string;
	tw: string;
	pinyin: string;
	en: string;
	when: string;
	tags: string[];
	roles?: Role[];
};

export type Scenario = {
	id: string;
	setup: string;
	roles?: Role[];
	prompt: string;
	options: { id: string; tw: string; pinyin: string; en: string; correct: boolean }[];
};

export type ModuleId =
	| 'survival'
	| 'role'
	| 'champs'
	| 'lane'
	| 'objectives'
	| 'fights'
	| 'select'
	| 'sim';

export type LessonModule = {
	id: ModuleId;
	titleTw: string;
	pinyin: string;
	en: string;
	blurb: string;
	minutes: number;
	tags: string[];
};

export type Profile = {
	role: Role;
	champs: string[];
	goal: Goal;
	hsk: HskBand;
	placementScore: number | null;
	createdAt: string;
};

export type CardState = {
	due: number;
	ease: number;
	interval: number;
	reps: number;
};

export type Progress = {
	completed: ModuleId[];
	moduleScores: Partial<Record<ModuleId, number>>;
	srs: Record<string, CardState>;
	currentModule: ModuleId | null;
};

export type DrillKind = 'phrase-mcq' | 'type-pinyin' | 'champ-name' | 'scenario';

export type Drill = {
	id: string;
	kind: DrillKind;
	prompt: string;
	hint?: string;
	pinyin?: string;
	meaning?: string;
	icon?: string;
	answer: string;
	accept?: string[];
	choices?: { label: string; pinyin?: string; en?: string; value: string }[];
};
