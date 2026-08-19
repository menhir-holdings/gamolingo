<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { loadProfile, loadProgress } from '$lib/progress';
	import { buildPath } from '$lib/path';
	import { patchVersion } from '$lib/content/champs';

	const profile = $derived(browser ? loadProfile() : null);
	const progress = $derived(browser ? loadProgress() : null);
	const next = $derived.by(() => {
		if (!profile || !progress) return null;
		return buildPath(profile).find((mod) => !progress.completed.includes(mod.id)) ?? null;
	});
</script>

<section class="hero">
	<p class="kicker">台服 · patch {patchVersion}</p>
	<h1>HSK 不是 soloQ。<br />這是。</h1>
	<p class="lede">
		Pinyin in, Traditional out — the words Taiwan League actually types. Champ names, 巴龍 not 大龍,
		and eight-second chat calls.
	</p>
	{#if profile && next}
		<button type="button" onclick={() => goto(`/lesson/${next.id}`)}>
			繼續 · {next.titleTw}
		</button>
		<p class="ghost"><a href="/path">看完整課表</a></p>
	{:else}
		<button type="button" onclick={() => goto('/onboard')}>開始配課</button>
	{/if}
</section>

<style>
	.hero {
		padding-top: 1.5rem;
		display: grid;
		gap: 1rem;
	}
	.kicker {
		color: var(--color-gold);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-size: 0.75rem;
	}
	h1 {
		font-size: clamp(2.2rem, 6vw, 3.4rem);
		line-height: 1.15;
		margin: 0;
	}
	.lede {
		color: var(--color-mist);
		max-width: 38rem;
		line-height: 1.55;
	}
	button {
		justify-self: start;
		background: var(--color-gold);
		color: #1a1406;
		border: 0;
		padding: 0.85rem 1.3rem;
		font-weight: 700;
	}
	.ghost {
		color: var(--color-mist);
		font-size: 0.9rem;
	}
	.ghost a {
		border-bottom: 1px solid #3a3320;
	}
</style>
