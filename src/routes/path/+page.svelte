<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Gloss from '$lib/components/Gloss.svelte';
	import { ui } from '$lib/copy';
	import { buildPath, roleLabel } from '$lib/path';
	import { loadProfile, loadProgress } from '$lib/progress';

	const profile = $derived(browser ? loadProfile() : null);
	const progress = $derived(browser ? loadProgress() : null);
	const path = $derived(profile ? buildPath(profile) : []);
	const totalMin = $derived(path.reduce((sum, mod) => sum + mod.minutes, 0));
	const role = $derived(profile ? roleLabel(profile.role) : null);
</script>

{#if !profile || !role}
	<p><Gloss {...ui.setup} /></p>
	<button type="button" onclick={() => goto('/onboard')}><Gloss {...ui.start} /></button>
{:else}
	<p class="kicker">~{totalMin} min</p>
	<h1><Gloss tw="你的課表" pinyin="nǐ de kè biǎo" en="Your path" /></h1>
	<p class="lede">
		<Gloss tw={role.tw} pinyin={role.pinyin} en={role.en} />
		· HSK {profile.hsk}
		{#if profile.placementScore !== null}
			· 摸底 {profile.placementScore}%
		{/if}
	</p>
	<ol>
		{#each path as mod, index (mod.id)}
			{@const done = progress?.completed.includes(mod.id)}
			<li class:done>
				<a href={`/lesson/${mod.id}`}>
					<span class="n">{String(index + 1).padStart(2, '0')}</span>
					<div>
						<Gloss tw={mod.titleTw} pinyin={mod.pinyin} en={mod.en} />
						<em>{mod.minutes}m</em>
						<p>{mod.blurb}</p>
					</div>
					<span class="st"
						>{#if done}<Gloss tw="過了" pinyin="guò le" en="Done" />{:else}<Gloss
								tw="開始"
								pinyin="kāi shǐ"
								en="Start"
							/>{/if}</span
					>
				</a>
			</li>
		{/each}
	</ol>
{/if}

<style>
	h1 {
		margin: 0.3rem 0 0.6rem;
		font-size: 2.1rem;
	}
	.kicker {
		color: var(--color-gold);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}
	.lede {
		color: var(--color-mist);
		display: flex;
		gap: 0.4rem;
		align-items: flex-end;
		flex-wrap: wrap;
	}
	ol {
		list-style: none;
		padding: 0;
		margin: 1.4rem 0;
		display: grid;
		gap: 0.55rem;
	}
	a {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.9rem;
		align-items: start;
		background: var(--color-panel);
		border: 1px solid #2a332e;
		padding: 0.9rem;
	}
	.n {
		color: var(--color-gold);
		font-variant-numeric: tabular-nums;
	}
	em {
		color: var(--color-mist);
		font-style: normal;
		font-size: 0.82rem;
		display: block;
		margin-top: 0.2rem;
	}
	li p {
		margin: 0.35rem 0 0;
		color: var(--color-mist);
		font-size: 0.92rem;
	}
	.st {
		color: var(--color-gold);
		font-size: 0.8rem;
	}
	.done a {
		opacity: 0.7;
	}
	button {
		background: var(--color-gold);
		border: 0;
		padding: 0.7rem 1.1rem;
		font-weight: 700;
	}
</style>
