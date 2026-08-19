<script lang="ts">
	import { goto } from '$app/navigation';
	import DrillPlayer from '$lib/components/DrillPlayer.svelte';
	import Gloss from '$lib/components/Gloss.svelte';
	import { champsForRole, champions } from '$lib/content/champs';
	import { roles, ui } from '$lib/copy';
	import { placementDrills } from '$lib/drills';
	import { saveProfile } from '$lib/progress';
	import type { Goal, HskBand, Role } from '$lib/types';

	let step = $state(0);
	let role = $state<Role>('fill');
	let champs = $state<string[]>([]);
	let goal = $state<Goal>('survive');
	let hsk = $state<HskBand>('5-6');
	let query = $state('');
	let placing = $state(false);
	let placement = $state<ReturnType<typeof placementDrills>>([]);

	$effect(() => {
		if (placing && placement.length === 0) placement = placementDrills();
	});

	const visible = $derived.by(() => {
		const base = role === 'fill' ? champions : champsForRole(role);
		const q = query.trim().toLowerCase();
		const filtered = q
			? champions.filter(
					(champ) =>
						champ.en.toLowerCase().includes(q) ||
						champ.tw.includes(q) ||
						champ.pinyin.toLowerCase().includes(q)
				)
			: base;
		return filtered.slice(0, 48);
	});

	function toggle(id: string) {
		champs = champs.includes(id) ? champs.filter((item) => item !== id) : [...champs, id];
	}

	function persist(score: number | null) {
		saveProfile({
			role,
			champs,
			goal,
			hsk,
			placementScore: score,
			createdAt: new Date().toISOString()
		});
		goto('/path');
	}
</script>

{#if placing}
	<h1><Gloss {...ui.place} /></h1>
	<p class="lede">Six calls. Wrong answers only change weighting — you still get a path.</p>
	{#if placement.length}
		<DrillPlayer drills={placement} onDone={(score) => persist(score)} />
	{/if}
	<p><button class="text" type="button" onclick={() => persist(null)}><Gloss {...ui.skip} /></button></p>
{:else}
	<p class="kicker">{step + 1} / 4</p>
	{#if step === 0}
		<h1><Gloss tw="你打什麼位置？" pinyin="nǐ dǎ shén me wèi zhì" en="What role do you queue?" /></h1>
		<p class="lede">Lane first. Missing calls, ganks, and champ names follow the role you queue.</p>
		<div class="grid">
			{#each roles as item (item.id)}
				<button class:on={role === item.id} type="button" onclick={() => (role = item.id)}>
					<Gloss tw={item.tw} pinyin={item.pinyin} en={item.en} />
				</button>
			{/each}
		</div>
	{:else if step === 1}
		<h1><Gloss tw="常用英雄" pinyin="cháng yòng yīng xióng" en="Champs you actually hover" /></h1>
		<p class="lede">We’ll drill the 台服 names for this pool. Search English splash, Traditional, or pinyin.</p>
		<input bind:value={query} placeholder="Yasuo / 犽宿 / ya su" />
		<div class="pool">
			{#each visible as champ (champ.id)}
				<button class:on={champs.includes(champ.id)} type="button" onclick={() => toggle(champ.id)}>
					<img src={champ.icon} alt="" width="36" height="36" />
					<Gloss tw={champ.tw} pinyin={champ.pinyin} en={champ.en} />
					<small>{champ.en}</small>
				</button>
			{/each}
		</div>
	{:else if step === 2}
		<h1><Gloss tw="這週要什麼" pinyin="zhè zhōu yào shén me" en="What do you need this week?" /></h1>
		<div class="grid">
			<button class:on={goal === 'survive'} type="button" onclick={() => (goal = 'survive')}>
				<Gloss tw="先活下來" pinyin="xiān huó xià lái" en="Don’t die in chat" />
			</button>
			<button class:on={goal === 'shotcall'} type="button" onclick={() => (goal = 'shotcall')}>
				<Gloss tw="能喊" pinyin="néng hǎn" en="Call the fight / the objective" />
			</button>
			<button class:on={goal === 'full'} type="button" onclick={() => (goal = 'full')}>
				<Gloss tw="整條課表" pinyin="zhěng tiáo kè biǎo" en="The full lobby path" />
			</button>
		</div>
	{:else}
		<h1><Gloss tw="中文程度" pinyin="zhōng wén chéng dù" en="How much Chinese you already have" /></h1>
		<div class="grid">
			<button class:on={hsk === '3-4'} type="button" onclick={() => (hsk = '3-4')}>HSK 3–4</button>
			<button class:on={hsk === '5-6'} type="button" onclick={() => (hsk = '5-6')}>HSK 5–6</button>
			<button class:on={hsk === 'fluent'} type="button" onclick={() => (hsk = 'fluent')}>
				<Gloss {...ui.fluent} />
			</button>
		</div>
		<p class="lede">Chrome always has pinyin under it. Hover for English. Lesson answers stay bare until you pick, then every option reveals pinyin and meaning.</p>
	{/if}

	<div class="row">
		{#if step > 0}
			<button class="ghost" type="button" onclick={() => (step -= 1)}><Gloss {...ui.back} /></button>
		{/if}
		{#if step < 3}
			<button type="button" onclick={() => (step += 1)}><Gloss {...ui.forward} /></button>
		{:else}
			<button type="button" onclick={() => (placing = true)}><Gloss {...ui.place} /></button>
			<button class="ghost" type="button" onclick={() => persist(null)}><Gloss {...ui.intoPath} /></button>
		{/if}
	</div>
{/if}

<style>
	h1 {
		margin: 0 0 1rem;
		font-size: 2rem;
	}
	.kicker {
		color: var(--color-gold);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}
	.lede {
		color: var(--color-mist);
		line-height: 1.5;
	}
	.grid,
	.pool {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.6rem;
		margin: 1rem 0;
	}
	.grid button,
	.pool button {
		background: var(--color-panel);
		border: 1px solid #2a332e;
		color: inherit;
		padding: 0.8rem;
		display: grid;
		gap: 0.25rem;
		text-align: left;
	}
	.pool button {
		grid-template-columns: 36px 1fr;
		align-items: center;
		column-gap: 0.55rem;
	}
	.pool button :global(.gloss) {
		grid-column: 2;
	}
	.pool button :global(.tw) {
		font-family: var(--font-serif);
	}
	.pool small {
		grid-column: 2;
		color: var(--color-mist);
	}
	.on {
		border-color: var(--color-gold) !important;
	}
	input {
		width: 100%;
		background: var(--color-panel);
		border: 1px solid #2a332e;
		color: inherit;
		padding: 0.7rem 0.8rem;
	}
	.row {
		display: flex;
		gap: 0.7rem;
		flex-wrap: wrap;
		margin-top: 1.2rem;
	}
	.row button {
		background: var(--color-gold);
		color: #1a1406;
		border: 0;
		padding: 0.7rem 1.1rem;
		font-weight: 700;
	}
	.ghost,
	.text {
		background: transparent !important;
		color: var(--color-mist) !important;
		border: 1px solid #2a332e !important;
	}
</style>
