<script lang="ts">
	import { goto } from '$app/navigation';
	import DrillPlayer from '$lib/components/DrillPlayer.svelte';
	import { champsForRole, champions } from '$lib/content/champs';
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

	const roles: { id: Role; tw: string; en: string }[] = [
		{ id: 'top', tw: '上路', en: 'Top' },
		{ id: 'jungle', tw: '打野', en: 'Jungle' },
		{ id: 'mid', tw: '中路', en: 'Mid' },
		{ id: 'adc', tw: 'ADC', en: 'Bot' },
		{ id: 'support', tw: '輔助', en: 'Support' },
		{ id: 'fill', tw: '補', en: 'Fill' }
	];

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
	<h1>摸底</h1>
	<p class="lede">Six questions. Wrong answers just weight the path — they don’t lock you out.</p>
	{#if placement.length}
		<DrillPlayer drills={placement} onDone={(score) => persist(score)} />
	{/if}
	<p><button class="text" type="button" onclick={() => persist(null)}>跳過</button></p>
{:else}
	<p class="kicker">step {step + 1} / 4</p>
	{#if step === 0}
		<h1>你打什麼位置？</h1>
		<div class="grid">
			{#each roles as item (item.id)}
				<button class:on={role === item.id} type="button" onclick={() => (role = item.id)}>
					<strong>{item.tw}</strong>
					<span>{item.en}</span>
				</button>
			{/each}
		</div>
	{:else if step === 1}
		<h1>常用英雄</h1>
		<p class="lede">Pick the pool you hover. We’ll drill 台服 names first. Search works in EN or 中文.</p>
		<input bind:value={query} placeholder="Yasuo / 犽宿 / ya su" />
		<div class="pool">
			{#each visible as champ (champ.id)}
				<button class:on={champs.includes(champ.id)} type="button" onclick={() => toggle(champ.id)}>
					<img src={champ.icon} alt="" width="36" height="36" />
					<span>{champ.tw}</span>
					<small>{champ.en}</small>
				</button>
			{/each}
		</div>
	{:else if step === 2}
		<h1>這季你要什麼？</h1>
		<div class="grid">
			<button class:on={goal === 'survive'} type="button" onclick={() => (goal = 'survive')}>
				<strong>先活下來</strong>
				<span>Don’t die in chat. Survival + lane + 巴龍.</span>
			</button>
			<button class:on={goal === 'shotcall'} type="button" onclick={() => (goal = 'shotcall')}>
				<strong>能喊</strong>
				<span>Engage, give, group. Still short sentences.</span>
			</button>
			<button class:on={goal === 'local'} type="button" onclick={() => (goal = 'local')}>
				<strong>像台服</strong>
				<span>Full path including CN name traps.</span>
			</button>
		</div>
	{:else}
		<h1>中文程度</h1>
		<div class="grid">
			<button class:on={hsk === '3-4'} type="button" onclick={() => (hsk = '3-4')}>HSK 3–4</button>
			<button class:on={hsk === '5-6'} type="button" onclick={() => (hsk = '5-6')}>HSK 5–6</button>
			<button class:on={hsk === 'fluent'} type="button" onclick={() => (hsk = 'fluent')}>讀得順</button>
		</div>
		<p class="lede">Pinyin stays on screen either way. This only changes how hard we skip.</p>
	{/if}

	<div class="row">
		{#if step > 0}
			<button class="ghost" type="button" onclick={() => (step -= 1)}>上一步</button>
		{/if}
		{#if step < 3}
			<button type="button" onclick={() => (step += 1)}>下一步</button>
		{:else}
			<button type="button" onclick={() => (placing = true)}>摸底</button>
			<button class="ghost" type="button" onclick={() => persist(null)}>直接進課表</button>
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
	.pool button span {
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
