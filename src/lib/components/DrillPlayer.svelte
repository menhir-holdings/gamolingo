<script lang="ts">
	import { checkAnswer } from '$lib/drills';
	import { reviewCard } from '$lib/progress';
	import type { Drill } from '$lib/types';

	let {
		drills,
		timed = false,
		onDone
	}: {
		drills: Drill[];
		timed?: boolean;
		onDone: (score: number) => void;
	} = $props();

	let index = $state(0);
	let picked = $state<string | null>(null);
	let typed = $state('');
	let correctCount = $state(0);
	let locked = $state(false);
	let seconds = $state(8);

	const drill = $derived(drills[index]);
	const isTimed = $derived(timed || drill?.kind === 'scenario');
	const ok = $derived(picked !== null && drill ? checkAnswer(drill, picked) : false);

	$effect(() => {
		if (!isTimed || locked || !drill) return;
		seconds = 8;
		const id = setInterval(() => {
			seconds -= 1;
			if (seconds <= 0) {
				clearInterval(id);
				if (!locked) grade(picked ?? '');
			}
		}, 1000);
		return () => clearInterval(id);
	});

	function grade(value: string) {
		if (locked || !drill) return;
		locked = true;
		const given = drill.kind === 'type-pinyin' ? typed : value;
		picked = given;
		const passed = checkAnswer(drill, given);
		if (passed) correctCount += 1;
		reviewCard(drill.id, passed ? 'good' : 'again');
	}

	function next() {
		if (index + 1 >= drills.length) {
			onDone(Math.round((correctCount / drills.length) * 100));
			return;
		}
		index += 1;
		picked = null;
		typed = '';
		locked = false;
		seconds = 8;
	}
</script>

{#if drill}
	<div class="drill">
		<div class="meta">
			<span>{index + 1} / {drills.length}</span>
			{#if isTimed}
				<span class:panic={seconds <= 3}>:{seconds.toString().padStart(2, '0')}</span>
			{/if}
		</div>
		<div class="bar"><i style:width={`${((index + (locked ? 1 : 0)) / drills.length) * 100}%`}></i></div>

		{#if drill.icon}
			<img src={drill.icon} alt="" width="72" height="72" />
		{/if}

		<p class="prompt">{drill.prompt}</p>
		{#if drill.hint && locked}
			<p class="hint">{drill.hint}</p>
		{/if}

		{#if drill.kind === 'type-pinyin'}
			<form
				onsubmit={(event) => {
					event.preventDefault();
					grade(typed);
				}}
			>
				<input
					bind:value={typed}
					placeholder="pinyin — tones optional"
					autocomplete="off"
					disabled={locked}
				/>
			</form>
		{:else if drill.choices}
			<div class="choices">
				{#each drill.choices as choice (choice.value)}
					<button
						type="button"
						class:picked={picked === choice.value}
						class:right={locked && choice.value === drill.answer}
						class:wrong={locked && picked === choice.value && choice.value !== drill.answer}
						disabled={locked}
						onclick={() => grade(choice.value)}
					>
						<span class="tw">{choice.label}</span>
						{#if choice.pinyin}
							<small>{choice.pinyin}</small>
						{/if}
					</button>
				{/each}
			</div>
		{/if}

		{#if locked}
			<div class="verdict" class:ok>
				{#if ok}
					對 · {drill.answer}{drill.pinyin ? ` · ${drill.pinyin}` : ''}
				{:else}
					是 {drill.answer}{drill.pinyin ? ` · ${drill.pinyin}` : ''}
				{/if}
			</div>
			<button class="next" type="button" onclick={next}>
				{index + 1 >= drills.length ? '結算' : '下一題'}
			</button>
		{/if}
	</div>
{/if}

<style>
	.drill {
		display: grid;
		gap: 1rem;
	}
	.meta {
		display: flex;
		justify-content: space-between;
		color: var(--color-mist);
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.panic {
		color: var(--color-blood);
	}
	.bar {
		height: 3px;
		background: #1e2622;
	}
	.bar i {
		display: block;
		height: 100%;
		background: var(--color-gold);
	}
	img {
		border: 1px solid #2a332e;
	}
	.prompt {
		font-family: var(--font-serif);
		font-size: 1.35rem;
		line-height: 1.45;
		white-space: pre-line;
	}
	.hint {
		color: var(--color-mist);
	}
	input {
		width: 100%;
		background: var(--color-panel);
		border: 1px solid #2a332e;
		color: var(--color-cream);
		padding: 0.85rem 1rem;
		font-size: 1.1rem;
	}
	.choices {
		display: grid;
		gap: 0.6rem;
	}
	.choices button {
		text-align: left;
		background: var(--color-panel);
		border: 1px solid #2a332e;
		color: var(--color-cream);
		padding: 0.85rem 1rem;
		display: grid;
		gap: 0.2rem;
	}
	.choices button:hover:not(:disabled) {
		border-color: var(--color-gold);
	}
	.choices .tw {
		font-family: var(--font-serif);
		font-size: 1.25rem;
	}
	.choices small {
		color: var(--color-mist);
	}
	.right {
		border-color: var(--color-jade) !important;
	}
	.wrong {
		border-color: var(--color-blood) !important;
	}
	.verdict {
		color: var(--color-blood);
		font-family: var(--font-serif);
	}
	.verdict.ok {
		color: var(--color-jade);
	}
	.next {
		justify-self: start;
		background: var(--color-gold);
		color: #1a1406;
		border: 0;
		padding: 0.7rem 1.2rem;
		font-weight: 600;
		letter-spacing: 0.04em;
	}
</style>
