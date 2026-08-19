<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import DrillPlayer from '$lib/components/DrillPlayer.svelte';
	import { drillsFor } from '$lib/drills';
	import { loadProfile, markModule } from '$lib/progress';

	const profile = $derived(browser ? loadProfile() : null);
	let drills = $state<ReturnType<typeof drillsFor>>([]);
	let done = $state(false);
	let score = $state(0);
	let round = $state(0);

	$effect(() => {
		const person = profile;
		void round;
		if (person) drills = drillsFor('sim', person);
	});
</script>

<p class="kicker">8 seconds</p>
<h1>實戰</h1>
<p class="lede">No English. Pick the line you would type in all-chat or team chat.</p>

{#if !profile}
	<button type="button" onclick={() => goto('/onboard')}>先配課</button>
{:else if done}
	<p class="score">{score}%</p>
	<button
		type="button"
		onclick={() => {
			done = false;
			round += 1;
		}}>再來一局</button
	>
{:else}
	<DrillPlayer
		drills={drills}
		timed
		onDone={(next) => {
			score = next;
			done = true;
			markModule('sim', next);
		}}
	/>
{/if}

<style>
	h1 {
		margin: 0.2rem 0 0.6rem;
		font-size: 2.2rem;
	}
	.kicker {
		color: var(--color-gold);
		letter-spacing: 0.14em;
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
	}
	button {
		background: var(--color-gold);
		border: 0;
		padding: 0.7rem 1.1rem;
		font-weight: 700;
	}
</style>
