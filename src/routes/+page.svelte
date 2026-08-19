<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { loadProfile, loadProgress } from '$lib/progress';
	import { buildPath } from '$lib/path';
	import { patchVersion } from '$lib/content/champs';
	import { ui } from '$lib/copy';
	import Gloss from '$lib/components/Gloss.svelte';

	const profile = $derived(browser ? loadProfile() : null);
	const progress = $derived(browser ? loadProgress() : null);
	const next = $derived.by(() => {
		if (!profile || !progress) return null;
		return buildPath(profile).find((mod) => !progress.completed.includes(mod.id)) ?? null;
	});
</script>

<section class="hero">
	<p class="kicker">台服 soloQ · patch {patchVersion}</p>
	<h1>
		<span class="line"><Gloss tw="等我" pinyin="děng wǒ" en="Wait for me" /></span>
		<span class="line"><Gloss tw="不要打" pinyin="bú yào dǎ" en="Don’t fight" /></span>
	</h1>
	<p class="lede">
		You queued Taiwan. Flash is down. Someone typed two characters. You have eight seconds to type
		two back — not an English sentence. This path drills that: your role, your pool, the lines you
		actually send in 台服 soloQ.
	</p>
	{#if profile && next}
		<button type="button" onclick={() => goto(`/lesson/${next.id}`)}>
			<Gloss {...ui.continue} />
			<span class="sep">·</span>
			<Gloss tw={next.titleTw} pinyin={next.pinyin} en={next.en} />
		</button>
		<p class="ghost"><a href="/path"><Gloss {...ui.path} /></a></p>
	{:else}
		<button type="button" onclick={() => goto('/onboard')}>
			<Gloss {...ui.start} />
		</button>
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
		line-height: 1.25;
		margin: 0;
		display: grid;
		gap: 0.45rem;
	}
	.lede {
		color: var(--color-mist);
		max-width: 40rem;
		line-height: 1.55;
	}
	button {
		justify-self: start;
		background: var(--color-gold);
		color: #1a1406;
		border: 0;
		padding: 0.85rem 1.3rem;
		display: inline-flex;
		gap: 0.45rem;
		align-items: flex-end;
	}
	.sep {
		opacity: 0.5;
	}
	.ghost {
		color: var(--color-mist);
		font-size: 0.9rem;
	}
</style>
