import type { CardState, Profile, Progress } from '$lib/types';

const PROFILE_KEY = 'gamolingo:profile:v1';
const PROGRESS_KEY = 'gamolingo:progress:v1';

const emptyProgress = (): Progress => ({
	completed: [],
	moduleScores: {},
	srs: {},
	currentModule: null
});

function read<T>(key: string): T | null {
	if (typeof localStorage === 'undefined') return null;
	const raw = localStorage.getItem(key);
	if (!raw) return null;
	try {
		return JSON.parse(raw) as T;
	} catch {
		return null;
	}
}

export function loadProfile(): Profile | null {
	return read<Profile>(PROFILE_KEY);
}

export function saveProfile(profile: Profile): void {
	localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
	if (!loadProgress()) saveProgress(emptyProgress());
}

export function clearAll(): void {
	localStorage.removeItem(PROFILE_KEY);
	localStorage.removeItem(PROGRESS_KEY);
}

export function loadProgress(): Progress {
	return read<Progress>(PROGRESS_KEY) ?? emptyProgress();
}

export function saveProgress(progress: Progress): void {
	localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function markModule(id: Progress['currentModule'], score: number): Progress {
	const progress = loadProgress();
	if (!id) return progress;
	if (!progress.completed.includes(id)) progress.completed = [...progress.completed, id];
	progress.moduleScores[id] = Math.max(progress.moduleScores[id] ?? 0, score);
	progress.currentModule = id;
	saveProgress(progress);
	return progress;
}

export function reviewCard(id: string, grade: 'again' | 'good' | 'easy'): CardState {
	const now = Date.now();
	const progress = loadProgress();
	const prev = progress.srs[id] ?? { due: now, ease: 2.5, interval: 0, reps: 0 };
	let { ease, interval, reps } = prev;
	if (grade === 'again') {
		reps = 0;
		interval = 0;
		ease = Math.max(1.3, ease - 0.2);
	} else {
		reps += 1;
		ease = grade === 'easy' ? ease + 0.15 : ease;
		interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ease);
	}
	const next: CardState = {
		due: now + interval * 24 * 60 * 60 * 1000,
		ease,
		interval,
		reps
	};
	progress.srs[id] = next;
	saveProgress(progress);
	return next;
}
