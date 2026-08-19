<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import DrillPlayer from '$lib/components/DrillPlayer.svelte';
	import { drillsFor } from '$lib/drills';
	import { modules } from '$lib/path';
	import { loadProfile, markModule } from '$lib/progress';
	import type { ModuleId } from '$lib/types';

	const id = $derived(page.params.id as ModuleId);
	const mod = $derived(modules.find((item) => item.id === id));
	const profile = $derived(browser ? loadProfile() : null);
	let drills = $state<ReturnType<typeof drillsFor>>([]);
	let score = $state<number | null>(null);
	let round = $state(0);

	$effect(() => {
		const current = id;
		const person = profile;
		void round;
		if (person && current) drills = drillsFor(current, person);
	});

	function finish(next: number) {
		score = next;
		markModule(id, next);
	}
</script>

{#if !profile}
	<p>先配課。</p>
	<a href="/onboard">開始</a>
{:else if !mod}
	<p>沒有這一課。</p>
{:else if score !== null}
	<h1>{mod.titleTw}</h1>
	<p class="score">{score}%</p>
	<p class="lede">{score >= 70 ? '夠用了。進下一課。' : '再打一輪。台服不會等你想拼音。'}</p>
	<div class="row">
		<button
			type="button"
			onclick={() => {
				score = null;
				round += 1;
			}}>再來</button
		>
		<button class="ghost" type="button" onclick={() => goto('/path')}>課表</button>
	</div>
{:else}
	<p class="kicker">{mod.title} · {mod.minutes}m</p>
	<h1>{mod.titleTw}</h1>
	<p class="lede">{mod.blurb}</p>
	{#if drills.length}
		<DrillPlayer drills={drills} timed={id === 'sim'} onDone={finish} />
	{:else}
		<p>這課沒有題。回課表。</p>
	{/if}
{/if}

<style>
	h1 {
		margin: 0.2rem 0 0.8rem;
		font-size: 2rem;
	}
	.kicker {
		color: var(--color-gold);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}
	.lede {
		color: var(--color-mist);
		margin-bottom: 1.2rem;
	}
	.score {
		font-family: var(--font-serif);
		font-size: 3rem;
		color: var(--color-gold);
		margin: 0;
	}
	.row {
		display: flex;
		gap: 0.6rem;
	}
	button {
		background: var(--color-gold);
		border: 0;
		padding: 0.7rem 1.1rem;
		font-weight: 700;
		color: #1a1406;
	}
	.ghost {
		background: transparent;
		color: var(--color-cream);
		border: 1px solid #2a332e;
	}
</style>
